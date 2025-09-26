import { NextResponse } from 'next/server';
import { getArticles } from '@/lib/posts';
import RSS from 'rss';

// Route segment config for caching
export const revalidate = 3600; // Revalidate every hour
export const dynamic = 'force-dynamic'; // Ensure we can use dynamic data

// Generate RSS feed using the rss package
function generateRSSFeed(articles, requestUrl) {
  // Extract the actual domain from the request to handle www vs non-www
  const url = new URL(requestUrl);
  const baseUrl = `${url.protocol}//${url.host}`;
  const feedUrl = `${baseUrl}/api/rss`;
  const blogUrl = `${baseUrl}/blog`;
  const currentDate = new Date();
  
  // Create new RSS feed instance with enhanced metadata
  const feed = new RSS({
    title: "Ayushman Gupta's Blog",
    description: "Articles and insights on web development, design, and technology by Ayushman Gupta. Discover the latest in software engineering, case studies, and technical deep-dives.",
    site_url: blogUrl,
    feed_url: feedUrl,
    copyright: `Copyright ${currentDate.getFullYear()} Ayushman Gupta`,
    language: 'en-us',
    pubDate: currentDate,
    lastBuildDate: currentDate,
    managingEditor: 'ayushman@ayushman.dev (Ayushman Gupta)',
    webMaster: 'ayushman@ayushman.dev (Ayushman Gupta)',
    generator: 'Next.js RSS Generator',
    docs: 'https://cyber.harvard.edu/rss/rss.html',
    ttl: 60,
    image_url: `${baseUrl}/cover.jpg`,
    image_title: "Ayushman Gupta's Blog",
    image_link: blogUrl,
    image_width: 144,
    image_height: 144,
    // Add Atom namespace for better compatibility
    custom_namespaces: {
      'atom': 'http://www.w3.org/2005/Atom'
    },
    custom_elements: [
      {
        'atom:link': {
          _attr: {
            href: feedUrl,
            rel: 'self',
            type: 'application/rss+xml'
          }
        }
      }
    ]
  });

  // Filter and limit articles (RSS best practice: limit to recent posts)
  const recentArticles = articles
    .filter(article => !article.disabled && !article.hidden)
    .slice(0, 20); // Limit to 20 most recent articles

  // Add each article as a feed item
  recentArticles.forEach(article => {
    // Parse date for RSS
    const articleDate = new Date(article.date.split('-').reverse().join('-'));
    
    // Generate correct article URL structure: /blog/[type]/[slug]
    const articleType = article.type ? article.type.toLowerCase().replace(/\s+/g, '-') : 'article';
    const articleUrl = `${blogUrl}/${articleType}/${article.slug}`;
    
    // Create description from introduction or excerpt
    const description = article.introduction || 
                       article.description || 
                       `Read more about ${article.title} on Ayushman Gupta's blog.`;
    
    // Clean description (remove HTML tags and ensure proper length)
    const cleanDescription = description
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .replace(/\s+/g, ' ') // Normalize whitespace
      .trim();
    
    // Ensure description is between 100-500 characters for optimal SEO
    const finalDescription = cleanDescription.length < 100 
      ? `${cleanDescription} Read the full article for more insights.`
      : cleanDescription.length > 500 
        ? cleanDescription.substring(0, 500).replace(/\s+\S*$/, '') + '...'
        : cleanDescription;

    // Add item to feed with enhanced metadata
    feed.item({
      title: article.title,
      guid: articleUrl,
      url: articleUrl,
      date: articleDate,
      description: finalDescription,
      author: article.author || 'Ayushman Gupta',
      categories: [article.type || 'Article'],
      enclosure: article.cover_img ? {
        url: article.cover_img,
        type: article.cover_img.includes('.png') ? 'image/png' : 'image/jpeg',
        length: 0 // Length unknown, but enclosure is valid
      } : undefined,
      // Add custom elements for better SEO
      custom_elements: [
        {
          'content:encoded': {
            _cdata: finalDescription
          }
        }
      ]
    });
  });

  return feed.xml({ indent: true });
}

export async function GET(request) {
  try {
    // Get articles using the existing function
    const articles = getArticles();
    
    if (!articles || articles.length === 0) {
      return new NextResponse('No articles found', { 
        status: 404,
        headers: {
          'Content-Type': 'application/xml',
        }
      });
    }

    // Generate RSS XML with dynamic URL based on request
    const rssXml = generateRSSFeed(articles, request.url);

    // Return RSS feed with proper headers for SEO and caching
    return new NextResponse(rssXml, {
      status: 200,
      headers: {
        'Content-Type': 'application/rss+xml; charset=utf-8',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
        'CDN-Cache-Control': 'public, s-maxage=3600',
        'Vercel-CDN-Cache-Control': 'public, s-maxage=3600',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
        'X-XSS-Protection': '1; mode=block',
        // RSS-specific headers for better SEO
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type',
        // Additional SEO headers
        'X-Robots-Tag': 'index, follow',
        'Last-Modified': new Date().toUTCString(),
        'ETag': `"rss-${Date.now()}"`,
      },
    });

  } catch (error) {
    console.error('RSS Feed Generation Error:', error);
    
    // Create error feed using RSS package with dynamic URL
    const url = new URL(request.url);
    const baseUrl = `${url.protocol}//${url.host}`;
    
    const errorFeed = new RSS({
      title: 'RSS Feed Error',
      description: 'Failed to generate RSS feed',
      site_url: baseUrl,
      feed_url: `${baseUrl}/api/rss`,
    });

    errorFeed.item({
      title: 'RSS Feed Error',
      description: 'There was an error generating the RSS feed. Please try again later.',
      date: new Date(),
    });

    return new NextResponse(errorFeed.xml({ indent: true }), {
      status: 500,
      headers: {
        'Content-Type': 'application/rss+xml; charset=utf-8',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });
  }
}
