# Production-Ready Code (No Marketing)

## lib/redis.ts

```typescript
/**
 * Redis Client for News Cache
 * 
 * Uses Upstash REST API (secure for serverless)
 * Falls back to memory if not configured
 */

import { Redis } from '@upstash/redis';

export interface CachedNewsData {
  items: any[];
  timestamp: number;
  source: 'upstash' | 'memory';
}

const memoryCache = new Map<string, CachedNewsData>();

function getRedisClient(): Redis | null {
  if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    try {
      return new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      });
    } catch (error) {
      console.warn('Upstash Redis init failed:', error);
    }
  }

  console.warn('Redis not configured, using memory cache');
  return null;
}

let redisClient: Redis | null = null;

export async function getCachedNews(key: string): Promise<CachedNewsData | null> {
  try {
    if (!redisClient) {
      redisClient = getRedisClient();
    }

    if (redisClient) {
      const data = await redisClient.get<CachedNewsData>(key);
      if (data) {
        return { ...data, source: 'upstash' };
      }
    }

    const memData = memoryCache.get(key);
    if (memData) {
      return { ...memData, source: 'memory' };
    }

    return null;
  } catch (error) {
    console.error('Redis GET error:', error);
    const memData = memoryCache.get(key);
    return memData ? { ...memData, source: 'memory' } : null;
  }
}

export async function setCachedNews(
  key: string,
  data: any[],
  ttlSeconds: number = 1800
): Promise<void> {
  try {
    if (!redisClient) {
      redisClient = getRedisClient();
    }

    const cacheData: CachedNewsData = {
      items: data,
      timestamp: Date.now(),
      source: 'memory',
    };

    if (redisClient) {
      await redisClient.set(key, cacheData, { ex: ttlSeconds });
      console.log(`Cached to Redis: ${key}`);
    } else {
      memoryCache.set(key, cacheData);
      console.log(`Cached to memory: ${key}`);
      
      setTimeout(() => {
        memoryCache.delete(key);
      }, ttlSeconds * 1000);
    }
  } catch (error) {
    console.error('Redis SET error:', error);
    memoryCache.set(key, {
      items: data,
      timestamp: Date.now(),
      source: 'memory',
    });
  }
}

export async function deleteCachedNews(key: string): Promise<void> {
  try {
    if (!redisClient) {
      redisClient = getRedisClient();
    }

    if (redisClient) {
      await redisClient.del(key);
    }
    memoryCache.delete(key);
  } catch (error) {
    console.error('Redis DEL error:', error);
  }
}

export async function checkRedisHealth(): Promise<{
  connected: boolean;
  source: 'upstash' | 'memory' | 'none';
  latency?: number;
}> {
  try {
    if (!redisClient) {
      redisClient = getRedisClient();
    }

    if (!redisClient) {
      return { connected: false, source: 'memory' };
    }

    const start = Date.now();
    await redisClient.ping();
    const latency = Date.now() - start;

    return {
      connected: true,
      source: 'upstash',
      latency,
    };
  } catch (error) {
    return { connected: false, source: 'none' };
  }
}
```

---

## lib/newsFeed.ts (changes only)

```typescript
import Parser from "rss-parser";
import { HOMEPAGE_QUOTAS, newsSources, type NewsCategory, type NewsSource } from "@/lib/newsSources";
import { getCachedNews, setCachedNews } from "@/lib/redis";

// ... (existing interfaces and constants)

const CACHE_TTL = 1000 * 60 * 30; // 30 minutes

// ... (existing helper functions)

export async function getAggregatedNews({
  category,
  safeOnly = false,
  limit = 20,
  bypassCache = false,
}: GetAggregatedNewsOptions = {}) {
  const normalizedLimit = Number.isFinite(limit) ? Math.min(Math.max(limit, 1), 50) : 20;
  const cacheKey = getCacheKey({ category, safeOnly });

  if (!bypassCache) {
    try {
      const cached = await getCachedNews(cacheKey);
      if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
        console.log(`Cache hit (${cached.source}): ${cacheKey}`);
        return cached.items.slice(0, normalizedLimit);
      }
    } catch (error) {
      console.warn('Cache read error:', error);
    }
  }

  console.log(`Fetching fresh news (bypass: ${bypassCache}): ${cacheKey}`);

  const activeSources = filterSources({ category, safeOnly });
  const fetchedItems = await Promise.all(activeSources.map(fetchSourceItems));

  const rankedItems = dedupeAndRank(fetchedItems.flat());
  const curatedItems = safeOnly
    ? curateHomepageItems(rankedItems, normalizedLimit)
    : curateFeedItems(rankedItems, normalizedLimit);

  try {
    await setCachedNews(cacheKey, curatedItems, Math.floor(CACHE_TTL / 1000));
  } catch (error) {
    console.error('Cache write error:', error);
  }

  return curatedItems.slice(0, normalizedLimit);
}
```

---

## app/api/cron/update-news/route.ts

```typescript
/**
 * Background news update endpoint
 * 
 * Triggered by: Hetzner cron (every 30 minutes)
 * Reason: Vercel Hobby cron limit is 1/day, need 48/day
 * 
 * Setup:
 * ssh root@hetzner-ip
 * crontab -e
 * Add: *\/30 * * * * curl -H "Authorization: Bearer SECRET" https://allhalal.info/api/cron/update-news >> /var/log/allhalal-cron.log 2>&1
 */

import { NextResponse } from 'next/server';
import { getAggregatedNews } from '@/lib/newsFeed';
import { checkRedisHealth } from '@/lib/redis';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

export async function GET(request: Request) {
  const startTime = Date.now();

  const authHeader = request.headers.get('authorization');
  const expectedAuth = `Bearer ${process.env.CRON_SECRET}`;

  if (!process.env.CRON_SECRET) {
    return NextResponse.json(
      {
        success: false,
        error: 'CRON_SECRET not configured',
      },
      { status: 500 }
    );
  }

  if (authHeader !== expectedAuth) {
    console.warn('Unauthorized cron attempt:', {
      ip: request.headers.get('x-forwarded-for'),
    });

    return NextResponse.json(
      {
        success: false,
        error: 'Unauthorized',
      },
      { status: 401 }
    );
  }

  console.log('Cron job started:', new Date().toISOString());

  try {
    const redisHealth = await checkRedisHealth();
    console.log('Redis status:', redisHealth);

    const updates = await Promise.all([
      getAggregatedNews({ safeOnly: true, limit: 8, bypassCache: true }),
      getAggregatedNews({ safeOnly: false, limit: 20, bypassCache: true }),
    ]);

    const duration = Date.now() - startTime;

    console.log('Cron completed:', {
      duration: `${duration}ms`,
      homepageItems: updates[0].length,
      newsPageItems: updates[1].length,
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
    });
  } catch (error) {
    const duration = Date.now() - startTime;
    
    console.error('Cron failed:', error);

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
```

---

## Environment Variables

```bash
# Generate with: openssl rand -hex 32
CRON_SECRET=your_secret_here

# From Upstash console (https://console.upstash.com)
UPSTASH_REDIS_REST_URL=https://xxx-xxxxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=AYxxxxxxxxxxxxxxxx
```

---

## Hetzner Cron Setup

```bash
# SSH into Hetzner
ssh root@your-ip

# Edit crontab
crontab -e

# Add (replace YOUR_CRON_SECRET):
*/30 * * * * curl -H "Authorization: Bearer YOUR_CRON_SECRET" https://allhalal.info/api/cron/update-news >> /var/log/allhalal-cron.log 2>&1

# Verify
crontab -l
```

---

## Testing

```bash
# Manual trigger
curl -H "Authorization: Bearer YOUR_SECRET" \
  https://allhalal.info/api/cron/update-news

# Expected response:
{
  "success": true,
  "redis": {
    "connected": true,
    "source": "upstash",
    "latency": 25
  },
  "updates": {
    "homepage": 8,
    "newsPage": 20
  },
  "duration": 12543
}

# Check logs
tail -f /var/log/allhalal-cron.log
```

---

## Notes

- All performance numbers in docs are estimates until measured
- Upstash free tier: 500K commands/month
- Estimated usage: ~30K/month (16x headroom)
- No marketing claims, just functionality
- Measure latency in production to get real numbers
