import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

/**
 * On-Demand ISR Revalidation API endpoint
 * 
 * Invalidates Next.js cache for specific paths.
 * Protected by REVALIDATE_SECRET environment variable.
 * 
 * Usage:
 * POST /api/revalidate?secret=YOUR_SECRET&path=/sitemap.xml
 */
export async function POST(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const secret = searchParams.get('secret');
  const path = searchParams.get('path');

  // Verify secret
  const expectedSecret = process.env.REVALIDATE_SECRET;
  if (!expectedSecret || secret !== expectedSecret) {
    return NextResponse.json(
      { error: 'Invalid revalidation secret' },
      { status: 401 }
    );
  }

  // Validate path
  if (!path || typeof path !== 'string') {
    return NextResponse.json(
      { error: 'Missing or invalid path parameter' },
      { status: 400 }
    );
  }

  try {
    // Revalidate the specified path
    revalidatePath(path);
    
    console.log(`✓ Revalidated path: ${path}`);
    
    return NextResponse.json({
      revalidated: true,
      path,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error(`Failed to revalidate ${path}:`, error);
    
    return NextResponse.json(
      {
        error: 'Revalidation failed',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
