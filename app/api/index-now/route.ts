import { NextResponse } from 'next/server';
import { submitAllHalalItemsToIndexNow } from '@/lib/indexnow';

/**
 * API endpoint to trigger IndexNow submission for all halal items
 * Call this after deploying new content or updates
 * 
 * Usage:
 * POST https://allhalal.info/api/index-now
 * 
 * Optional: Add authentication header for security
 */
export async function POST(request: Request) {
  try {
    // Optional: Check authentication
    const authHeader = request.headers.get('authorization');
    const expectedAuth = process.env.INDEXNOW_API_SECRET;
    
    if (expectedAuth && authHeader !== `Bearer ${expectedAuth}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Submit all halal items to IndexNow
    const results = await submitAllHalalItemsToIndexNow();
    
    const totalSuccess = results.filter(r => r.success).length;
    const totalFailed = results.filter(r => !r.success).length;

    return NextResponse.json({
      success: true,
      message: `Submitted to IndexNow`,
      batches: results.length,
      successful: totalSuccess,
      failed: totalFailed,
      results,
    });
  } catch (error) {
    console.error('IndexNow submission error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}

/**
 * GET endpoint for manual testing
 */
export async function GET() {
  return NextResponse.json({
    message: 'IndexNow API endpoint. Use POST to submit URLs.',
    endpoints: {
      post: '/api/index-now',
      method: 'POST',
      auth: 'Bearer token in Authorization header (if INDEXNOW_API_SECRET is set)',
    },
  });
}
