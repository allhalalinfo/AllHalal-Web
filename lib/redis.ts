/**
 * Redis Client Configuration
 * 
 * Priority:
 * 1. Hetzner Redis (your existing server) - primary, $0
 * 2. Upstash Redis (managed) - fallback, free tier
 * 
 * Usage:
 * - News feed caching (TTL: 30 minutes)
 * - Future: session storage, rate limiting
 */

import { Redis } from '@upstash/redis';

// Type for cached news data
export interface CachedNewsData {
  items: any[];
  timestamp: number;
  source: 'hetzner' | 'upstash' | 'memory';
}

// Memory fallback (same as current implementation)
const memoryCache = new Map<string, CachedNewsData>();

/**
 * Get Redis client
 * Tries Hetzner first, falls back to Upstash, then memory
 */
function getRedisClient(): Redis | null {
  // Option 1: Hetzner Redis (preferred)
  if (process.env.HETZNER_REDIS_URL) {
    try {
      return new Redis({
        url: process.env.HETZNER_REDIS_URL,
        token: process.env.HETZNER_REDIS_PASSWORD || '',
      });
    } catch (error) {
      console.warn('Hetzner Redis connection failed, trying Upstash...', error);
    }
  }

  // Option 2: Upstash Redis (fallback)
  if (process.env.UPSTASH_REDIS_URL && process.env.UPSTASH_REDIS_TOKEN) {
    try {
      return new Redis({
        url: process.env.UPSTASH_REDIS_URL,
        token: process.env.UPSTASH_REDIS_TOKEN,
      });
    } catch (error) {
      console.warn('Upstash Redis connection failed, using memory cache', error);
    }
  }

  console.warn('No Redis configured, using in-memory cache (will not persist across deploys)');
  return null;
}

// Singleton client
let redisClient: Redis | null = null;

/**
 * Get or set cached news data
 */
export async function getCachedNews(key: string): Promise<CachedNewsData | null> {
  try {
    if (!redisClient) {
      redisClient = getRedisClient();
    }

    if (redisClient) {
      const data = await redisClient.get<CachedNewsData>(key);
      if (data) {
        return { ...data, source: process.env.HETZNER_REDIS_URL ? 'hetzner' : 'upstash' };
      }
    }

    // Memory fallback
    const memData = memoryCache.get(key);
    if (memData) {
      return { ...memData, source: 'memory' };
    }

    return null;
  } catch (error) {
    console.error('Redis GET error:', error);
    // Try memory fallback
    const memData = memoryCache.get(key);
    return memData ? { ...memData, source: 'memory' } : null;
  }
}

/**
 * Set cached news data with TTL
 */
export async function setCachedNews(
  key: string,
  data: any[],
  ttlSeconds: number = 1800 // 30 minutes
): Promise<void> {
  try {
    if (!redisClient) {
      redisClient = getRedisClient();
    }

    const cacheData: CachedNewsData = {
      items: data,
      timestamp: Date.now(),
      source: 'memory', // Will be overwritten by Redis if successful
    };

    if (redisClient) {
      await redisClient.set(key, cacheData, { ex: ttlSeconds });
      console.log(`✅ Cached to Redis (${process.env.HETZNER_REDIS_URL ? 'Hetzner' : 'Upstash'}): ${key}`);
    } else {
      // Memory fallback
      memoryCache.set(key, cacheData);
      console.log(`⚠️ Cached to memory (no persistence): ${key}`);
      
      // Auto-expire from memory
      setTimeout(() => {
        memoryCache.delete(key);
      }, ttlSeconds * 1000);
    }
  } catch (error) {
    console.error('Redis SET error:', error);
    // Always save to memory as last resort
    memoryCache.set(key, {
      items: data,
      timestamp: Date.now(),
      source: 'memory',
    });
  }
}

/**
 * Delete cached data
 */
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

/**
 * Health check for Redis connection
 */
export async function checkRedisHealth(): Promise<{
  connected: boolean;
  source: 'hetzner' | 'upstash' | 'memory' | 'none';
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
      source: process.env.HETZNER_REDIS_URL ? 'hetzner' : 'upstash',
      latency,
    };
  } catch (error) {
    return { connected: false, source: 'none' };
  }
}
