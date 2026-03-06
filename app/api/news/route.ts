import { NextResponse } from 'next/server';
import Parser from 'rss-parser';
import { newsSources, NewsSource, HOMEPAGE_QUOTAS, NewsCategory } from '@/lib/newsSources';

// Initialize RSS Parser
const parser = new Parser({
  customFields: {
    item: [
      ['media:content', 'mediaContent'],
      ['content:encoded', 'contentEncoded'],
      ['enclosure', 'enclosure'],
    ],
  }
});

// Simple in-memory cache
interface CachedNews {
  items: any[];
  timestamp: number;
}
const cache: Record<string, CachedNews> = {};
const CACHE_TTL = 1000 * 60 * 30; // 30 minutes

function extractImageFromItem(item: any): string | null {
  // Try media:content
  if (item.mediaContent && item.mediaContent['$'] && item.mediaContent['$'].url) {
    return item.mediaContent['$'].url;
  }
  // Try enclosure
  if (item.enclosure && item.enclosure.url) {
    return item.enclosure.url;
  }
  // Try parsing HTML content for an img tag
  const content = item.contentEncoded || item.content || item.description || '';
  const imgMatch = content.match(/<img[^>]+src="([^">]+)"/i);
  if (imgMatch && imgMatch[1]) {
    return imgMatch[1];
  }
  return null;
}

function cleanExcerpt(html: string): string {
  if (!html) return '';
  // Remove HTML tags
  let text = html.replace(/<[^>]*>?/gm, '');
  // Decode HTML entities
  text = text.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#8217;/g, "'").replace(/&#8220;/g, '"').replace(/&#8221;/g, '"');
  // Trim and limit length
  return text.trim().substring(0, 150) + (text.length > 150 ? '...' : '');
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const safeOnly = searchParams.get('safeOnly') === 'true';
  const limit = parseInt(searchParams.get('limit') || '20', 10);

  // Filter sources based on parameters
  let activeSources = newsSources;
  if (safeOnly) {
    activeSources = activeSources.filter(s => s.safe);
  }
  if (category) {
    activeSources = activeSources.filter(s => s.categories.includes(category as any));
  }

  // Generate cache key
  const cacheKey = `news_${category || 'all'}_${safeOnly ? 'safe' : 'all'}`;

  // Force cache bypass if timestamp is passed (like ?_t=123)
  const bypassCache = searchParams.get('_t') !== null;

  // Return cached data if valid
  if (!bypassCache && cache[cacheKey] && (Date.now() - cache[cacheKey].timestamp < CACHE_TTL)) {
    return NextResponse.json({
      status: 'success',
      data: cache[cacheKey].items.slice(0, limit),
      cached: true
    });
  }

  try {
    let allItems: any[] = [];

    // Fetch RSS feeds in parallel (with timeout to prevent hanging)
    const fetchPromises = activeSources.map(async (source) => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout per feed
        
        const feed = await parser.parseURL(source.rssUrl);
        clearTimeout(timeoutId);

        // Map feed items to our normalized format
        return feed.items.map(item => ({
          id: item.guid || (item as any).id || item.link,
          title: item.title,
          url: item.link,
          sourceName: source.name,
          sourceId: source.id,
          publishedAt: item.isoDate || item.pubDate || new Date().toISOString(),
          excerpt: cleanExcerpt((item as any).description || item.contentSnippet || ''),
          imageUrl: extractImageFromItem(item),
          categories: source.categories,
          fallbackGradient: source.fallbackGradient
        }));
      } catch (err) {
        console.error(`Failed to fetch RSS for ${source.name}:`, err);
        return []; // Return empty array for failed sources so Promise.all doesn't crash
      }
    });

    const results = await Promise.all(fetchPromises);
    
    // Flatten and sort by date (newest first)
    allItems = results.flat().sort((a, b) => {
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    });

    // --- Complex Curation Logic ---
    let curatedItems: any[] = [];
    
    // 1. Deduplication (by exact title or URL)
    const seenTitles = new Set<string>();
    const seenUrls = new Set<string>();
    allItems = allItems.filter(item => {
      const isDup = seenTitles.has(item.title) || seenUrls.has(item.url);
      seenTitles.add(item.title);
      seenUrls.add(item.url);
      return !isDup;
    });

    // 2. Apply Homepage Quotas (if safeOnly is true, we assume it's for homepage)
    if (safeOnly) {
      const counts: Record<NewsCategory, number> = {
        'Faith & Practice': 0,
        'Family & Education': 0,
        'Halal Living': 0,
        'Islamic Finance': 0,
        'Health & Wellness': 0,
        'Ummah & World': 0
      };

      const sourceCounts: Record<string, number> = {};
      const MAX_PER_SOURCE_CONSECUTIVE = 2; // Try to limit same source spam

      for (const item of allItems) {
        if (curatedItems.length >= limit) break;

        // Determine item's primary category (just pick the first matching one we care about)
        const primaryCat = item.categories.find((c: NewsCategory) => Object.keys(HOMEPAGE_QUOTAS).includes(c)) as NewsCategory | undefined;
        if (!primaryCat) continue; // Skip if no valid category

        // Check if we hit quota for this category
        if (counts[primaryCat] >= HOMEPAGE_QUOTAS[primaryCat]) {
          continue; 
        }

        // Check source diversity (don't have 3+ from same source back-to-back if we can help it)
        // Simplified check: just count overall, or keep track of last source. Let's do a strict overall limit for the small widget.
        sourceCounts[item.sourceId] = (sourceCounts[item.sourceId] || 0) + 1;
        if (sourceCounts[item.sourceId] > 3) {
          continue; // No more than 3 from any single source in the top widget
        }

        curatedItems.push(item);
        counts[primaryCat]++;
      }

      // If we didn't fill the widget, backfill with whatever is newest and safe
      if (curatedItems.length < limit) {
        for (const item of allItems) {
          if (curatedItems.length >= limit) break;
          if (!curatedItems.some(c => c.id === item.id)) {
            curatedItems.push(item);
          }
        }
      }

      // Re-sort curated items by date to ensure the "Featured" is actually the newest among selected
      curatedItems.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
      
      allItems = curatedItems;
    }

    // Update cache
    cache[cacheKey] = {
      items: allItems,
      timestamp: Date.now()
    };

    return NextResponse.json({
      status: 'success',
      data: allItems.slice(0, limit),
      cached: false
    });

  } catch (error) {
    console.error('RSS Feed Aggregation Error:', error);
    return NextResponse.json(
      { status: 'error', message: 'Failed to aggregate news' },
      { status: 500 }
    );
  }
}
