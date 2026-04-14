import { NextResponse } from 'next/server';
import { fetchCustomArticlesList } from '@/lib/customArticles';

export const dynamic = 'force-dynamic';

export async function GET() {
  const startTime = Date.now();
  
  try {
    console.log('[Test] Starting fetchCustomArticlesList...');
    
    const result = await Promise.race([
      fetchCustomArticlesList({ page: 1, limit: 200 }),
      new Promise<{ articles: [] }>((_, reject) => 
        setTimeout(() => reject(new Error('Timeout')), 3500)
      )
    ]);
    
    const duration = Date.now() - startTime;
    
    return NextResponse.json({
      success: true,
      duration: `${duration}ms`,
      articlesCount: result.articles.length,
      total: result.total,
      firstThreeIds: result.articles.slice(0, 3).map(a => a.id),
    });
  } catch (error) {
    const duration = Date.now() - startTime;
    
    return NextResponse.json({
      success: false,
      duration: `${duration}ms`,
      error: error instanceof Error ? error.message : String(error),
    }, { status: 500 });
  }
}
