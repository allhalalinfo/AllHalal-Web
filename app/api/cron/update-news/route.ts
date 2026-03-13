/**
 * Cron Endpoint for Background News Updates
 * 
 * Purpose:
 * - Updates news cache every 30 minutes via Hetzner cron
 * - Prevents users from waiting 8-15 seconds for RSS parsing
 * - Ensures fresh content without on-demand slowness
 * 
 * Security:
 * - Requires CRON_SECRET header for authentication
 * - Prevents unauthorized cache refreshes
 * 
 * Setup on Hetzner (NOT Vercel Cron):
 * 
 * Why Hetzner? Vercel Hobby plan limits cron to 1 execution/day.
 * Upgrading to Vercel Pro costs $20/month just for cron.
 * Hetzner cron is free and unlimited.
 * 
 * 1. SSH into your server:
 *    ssh root@your-hetzner-ip
 * 
 * 2. Edit crontab:
 *    crontab -e
 * 
 * 3. Add this line (runs every 30 minutes):
 *    *\/30 * * * * curl -H "Authorization: Bearer YOUR_CRON_SECRET" https://allhalal.info/api/cron/update-news >> /var/log/allhalal-cron.log 2>&1
 * 
 * 4. Save and check logs:
 *    tail -f /var/log/allhalal-cron.log
 * 
 * Environment Variables (add to Vercel):
 * - CRON_SECRET: Random string (e.g., openssl rand -hex 32)
 * - UPSTASH_REDIS_REST_URL: https://xxx.upstash.io (from Upstash console)
 * - UPSTASH_REDIS_REST_TOKEN: your_token (from Upstash console)
 * 
 * Architecture:
 * Hetzner Cron → HTTPS → Vercel API → HTTPS REST API → Upstash Redis
 * 
 * SECURITY: Uses Upstash REST API (TLS encrypted), NOT direct Redis TCP.
 */

import { NextResponse } from 'next/server';
import { getAggregatedNews } from '@/lib/newsFeed';
import { checkRedisHealth } from '@/lib/redis';

export const dynamic = 'force-dynamic';
export const maxDuration = 60; // Allow up to 60s for RSS fetching

export async function GET(request: Request) {
  const startTime = Date.now();

  // 1. Verify authorization
  const authHeader = request.headers.get('authorization');
  const expectedAuth = `Bearer ${process.env.CRON_SECRET}`;

  if (!process.env.CRON_SECRET) {
    return NextResponse.json(
      {
        success: false,
        error: 'CRON_SECRET not configured',
        message: 'Set CRON_SECRET environment variable in Vercel',
      },
      { status: 500 }
    );
  }

  if (authHeader !== expectedAuth) {
    console.warn('❌ Unauthorized cron attempt:', {
      ip: request.headers.get('x-forwarded-for'),
      userAgent: request.headers.get('user-agent'),
    });

    return NextResponse.json(
      {
        success: false,
        error: 'Unauthorized',
        message: 'Invalid or missing Authorization header',
      },
      { status: 401 }
    );
  }

  console.log('🔄 Cron job started:', new Date().toISOString());

  try {
    // 2. Check Redis health
    const redisHealth = await checkRedisHealth();
    console.log('📊 Redis status:', redisHealth);

    // 3. Update main news feeds
    const updates = await Promise.all([
      // Homepage feed (safe only, curated)
      getAggregatedNews({ safeOnly: true, limit: 8, bypassCache: true }),
      
      // Full news page feed (all content)
      getAggregatedNews({ safeOnly: false, limit: 20, bypassCache: true }),
      
      // Category feeds (optional, add more as needed)
      // getAggregatedNews({ category: 'Faith & Practice', limit: 10, bypassCache: true }),
      // getAggregatedNews({ category: 'Islamic Finance', limit: 10, bypassCache: true }),
    ]);

    const duration = Date.now() - startTime;

    console.log('✅ Cron job completed:', {
      duration: `${duration}ms`,
      homepageItems: updates[0].length,
      newsPageItems: updates[1].length,
      redisSource: redisHealth.source,
    });

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      duration,
      redis: redisHealth,
      updates: {
        homepage: updates[0].length,
        newsPage: updates[1].length,
      },
      message: 'News cache updated successfully',
    });
  } catch (error) {
    const duration = Date.now() - startTime;
    
    console.error('❌ Cron job failed:', error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        duration,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

/**
 * Health check endpoint (no auth required)
 * Useful for monitoring
 */
export async function HEAD() {
  try {
    const health = await checkRedisHealth();
    
    if (health.connected) {
      return new NextResponse(null, { status: 200 });
    } else {
      return new NextResponse(null, { status: 503 });
    }
  } catch {
    return new NextResponse(null, { status: 503 });
  }
}
