import { getArticles } from '@/lib/posts';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const articles = getArticles();
    return NextResponse.json(articles);
  } catch (error) {
    console.error('Error fetching articles:', error);
    return NextResponse.json(
      { error: 'Failed to fetch articles' },
      { status: 500 }
    );
  }
}
