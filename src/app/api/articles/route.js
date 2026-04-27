import { getArticles } from '@/lib/posts';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const articles = getArticles();
    return NextResponse.json(articles, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
      },
    });
  } catch (error) {
    console.error('Error fetching articles:', error);
    return NextResponse.json(
      { error: 'Failed to fetch articles' },
      { status: 500 }
    );
  }
}
