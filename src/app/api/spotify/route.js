import { NextResponse } from 'next/server';

// Route segment config for caching
export const revalidate = 1800; // Revalidate every 30 minutes (1800 seconds)
export const dynamic = 'force-dynamic'; // Ensure we can use dynamic data

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const SPOTIFY_REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;

async function getAccessToken() {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64')}`,
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: SPOTIFY_REFRESH_TOKEN,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to get access token');
  }

  const data = await response.json();
  return data.access_token;
}

async function getTopArtists(accessToken) {
  const response = await fetch('https://api.spotify.com/v1/me/top/artists?limit=4&time_range=short_term', {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch top artists');
  }

  return response.json();
}

async function getTopTracks(accessToken) {
  const response = await fetch('https://api.spotify.com/v1/me/top/tracks?limit=4&time_range=short_term', {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch top tracks');
  }

  return response.json();
}

export async function GET() {
  try {
    // Check if environment variables are set
    if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET || !SPOTIFY_REFRESH_TOKEN) {
      return NextResponse.json(
        { error: 'Spotify credentials not configured' },
        { status: 500 }
      );
    }

    const accessToken = await getAccessToken();
    
    const [artistsData, tracksData] = await Promise.all([
      getTopArtists(accessToken),
      getTopTracks(accessToken),
    ]);

    // Format the data
    const topArtists = artistsData.items.map(artist => ({
      id: artist.id,
      name: artist.name,
      image: artist.images[0]?.url || null,
      external_url: artist.external_urls.spotify,
      genres: artist.genres.slice(0, 3), // Top 3 genres
    }));

    const topTracks = tracksData.items.map(track => ({
      id: track.id,
      name: track.name,
      artists: track.artists.map(artist => artist.name),
      album: track.album.name,
      image: track.album.images[0]?.url || null,
      external_url: track.external_urls.spotify,
      preview_url: track.preview_url,
    }));

    const responseData = {
      topArtists,
      topTracks,
      lastUpdated: new Date().toISOString(),
    };

    // Return response with caching headers
    // Revalidate every 30 minutes (1800 seconds)
    return NextResponse.json(responseData, {
      headers: {
        'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=3600',
        'CDN-Cache-Control': 'public, s-maxage=1800',
        'Vercel-CDN-Cache-Control': 'public, s-maxage=1800',
      },
    });

  } catch (error) {
    console.error('Spotify API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Spotify data' },
      { status: 500 }
    );
  }
}
