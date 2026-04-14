import { NextResponse } from 'next/server';
import { fetchCustomArticlesList } from '@/lib/customArticles';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export async function GET() {
  try {
    const result = await fetchCustomArticlesList({ page: 1, limit: 5 });
    
    return NextResponse.json({
      success: true,
      articlesCount: result.articles.length,
      total: result.total,
      page: result.page,
      limit: result.limit,
      firstArticle: result.articles[0] || null,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : String(error),
    }, { status: 500 });
  }
}
