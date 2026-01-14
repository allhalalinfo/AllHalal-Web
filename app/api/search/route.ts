/**
 * Search API Route
 * Returns search index for client-side search
 */

import { NextResponse } from 'next/server';
import { getSearchIndex } from '@/lib/search';

export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour

export async function GET() {
  try {
    const index = getSearchIndex();
    
    return NextResponse.json(index, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400'
      }
    });
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json(
      { error: 'Failed to load search index' },
      { status: 500 }
    );
  }
}
