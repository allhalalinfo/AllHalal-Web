/**
 * Redis Client Configuration
 * 
 * SECURITY WARNING:
 * - NEVER expose Redis directly to internet without authentication
 * - Use SSH tunnel or Upstash (REST API with TLS)
 * - Hetzner Redis should be localhost-only or behind VPN
 * 
 * Architecture:
 * - Upstash Redis REST API (TLS encrypted, no direct TCP)
 * - Falls back to memory cache if no Redis configured
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
  source: 'upstash' | 'memory';
}

// Memory fallback (same as current implementation)
const memoryCache = new Map<string, CachedNewsData>();

/**
 * Get Redis client
 * ONLY uses Upstash (secure REST API over HTTPS)
 */
function getRedisClient(): Redis | null {
  // Upstash Redis REST API (secure, no direct TCP exposure)
  if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    try {
      return new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
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
        return { ...data, source: 'upstash' };
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
      console.log(`✅ Cached to Redis (Upstash): ${key}`);
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
