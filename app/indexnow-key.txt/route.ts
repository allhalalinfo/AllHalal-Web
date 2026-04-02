import { NextResponse } from 'next/server';

/**
 * IndexNow API Key Endpoint
 * 
 * Returns the IndexNow API key required by search engines for verification.
 * This endpoint serves the key file that must be accessible at the root domain.
 * 
 * More info: https://www.indexnow.org/documentation
 */
export async function GET() {
  const indexNowKey = process.env.INDEXNOW_KEY;
  
  if (!indexNowKey) {
    return new NextResponse('IndexNow key not configured', { 
      status: 500,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'public, max-age=86400', // Cache for 24 hours
      },
    });
  }

  return new NextResponse(indexNowKey, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400', // Cache for 24 hours
    },
  });
}
