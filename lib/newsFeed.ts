import Parser from "rss-parser";
import { HOMEPAGE_QUOTAS, newsSources, type NewsCategory, type NewsSource } from "@/lib/newsSources";

export interface NewsItem {
  id: string;
  title: string;
  url: string;
  sourceName: string;
  sourceId: string;
  publishedAt: string;
  excerpt: string;
  imageUrl: string | null;
  categories: NewsCategory[];
  fallbackGradient?: string;
}

interface CachedNews {
  items: NewsItem[];
  timestamp: number;
}

interface GetAggregatedNewsOptions {
  category?: NewsCategory;
  safeOnly?: boolean;
  limit?: number;
  bypassCache?: boolean;
}

const parser = new Parser({
  customFields: {
    item: [
      ["media:content", "mediaContent"],
      ["content:encoded", "contentEncoded"],
      ["enclosure", "enclosure"],
    ],
  },
});

const cache: Record<string, CachedNews> = {};
const CACHE_TTL = 1000 * 60 * 30;
const FEED_SOURCE_CAP = 3;
const HOMEPAGE_SOURCE_CAP = 2;
const HOMEPAGE_MAX_AGE_HOURS = 24 * 120;
const FEED_MAX_AGE_HOURS = 24 * 365;
const EXCLUDED_TITLE_PATTERNS = [
  /\bpodcast\b/i,
  /\broundup\b/i,
  /\bnewsletter\b/i,
  /\bphoto\b/i,
  /\bvideo\b/i,
];
const HEAVY_HEADLINE_PATTERNS = [
  /\bassassinat/i,
  /\battack/i,
  /\bwar\b/i,
  /\bbomb/i,
  /\bmissile/i,
  /\bairstrike/i,
  /\bkilled?\b/i,
  /\bdeaths?\b/i,
];

function extractImageFromItem(item: Record<string, unknown>): string | null {
  const mediaContent = item.mediaContent as { $?: { url?: string } } | undefined;
  const enclosure = item.enclosure as { url?: string } | undefined;

  if (mediaContent?.$?.url) {
    return mediaContent.$.url;
  }

  if (enclosure?.url) {
    return enclosure.url;
  }

  const content = String(item.contentEncoded || item.content || item.description || "");
  const imgMatch = content.match(/<img[^>]+src="([^">]+)"/i);
  return imgMatch?.[1] || null;
}

function cleanExcerpt(html: string): string {
  if (!html) {
    return "";
  }

  let text = html.replace(/<[^>]*>?/gm, "");
  text = text
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"');

  const trimmed = text.replace(/\s+/g, " ").trim();
  return trimmed.slice(0, 180) + (trimmed.length > 180 ? "..." : "");
}

function getCacheKey({ category, safeOnly }: { category?: NewsCategory; safeOnly: boolean }) {
  return `news_${category || "all"}_${safeOnly ? "safe" : "all"}`;
}

function filterSources({ category, safeOnly }: { category?: NewsCategory; safeOnly: boolean }) {
  let activeSources = [...newsSources];

  if (safeOnly) {
    activeSources = activeSources.filter((source) => source.safe);
  }

  if (category) {
    activeSources = activeSources.filter((source) => source.categories.includes(category));
  }

  return activeSources.sort((a, b) => a.priority - b.priority);
}

function normalizeText(value: string) {
  return value.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, " ").trim();
}

function normalizeUrl(value: string) {
  return value.replace(/^https?:\/\//, "").replace(/\/$/, "").toLowerCase();
}

function getSourceById(sourceId: string) {
  return newsSources.find((source) => source.id === sourceId);
}

function getHoursSincePublished(item: NewsItem) {
  const publishedAt = new Date(item.publishedAt).getTime();
  if (Number.isNaN(publishedAt)) {
    return 72;
  }

  return Math.max(0, (Date.now() - publishedAt) / 1000 / 60 / 60);
}

function getItemScore(item: NewsItem) {
  const source = getSourceById(item.sourceId);
  const priority = source?.priority || 5;
  const priorityWeight = (6 - priority) * 14;
  const freshnessPenalty = Math.min(getHoursSincePublished(item), 120) * 0.18;
  const excerptBoost = item.excerpt.length > 90 ? 4 : item.excerpt.length > 45 ? 2 : -2;
  const imageBoost = item.imageUrl ? 2 : 0;
  return priorityWeight + excerptBoost + imageBoost - freshnessPenalty;
}

function isLowQualityItem(item: NewsItem) {
  const combined = `${item.title} ${item.excerpt}`;

  if (item.title.trim().length < 24) {
    return true;
  }

  if (item.excerpt.trim().length < 40) {
    return true;
  }

  return EXCLUDED_TITLE_PATTERNS.some((pattern) => pattern.test(combined));
}

function isHeavyHeadline(item: NewsItem) {
  const combined = `${item.title} ${item.excerpt}`;
  return HEAVY_HEADLINE_PATTERNS.some((pattern) => pattern.test(combined));
}

function isStaleItem(item: NewsItem, maxAgeHours: number) {
  return getHoursSincePublished(item) > maxAgeHours;
}

async function fetchSourceItems(source: NewsSource): Promise<NewsItem[]> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch(source.rssUrl, {
      signal: controller.signal,
      headers: {
        Accept: "application/rss+xml, application/xml, text/xml",
      },
      next: { revalidate: 1800 },
    });

    if (!response.ok) {
      throw new Error(`RSS feed responded with status ${response.status}`);
    }

    const feed = await parser.parseString(await response.text());

    return feed.items.map((item) => ({
      id: item.guid || (item as { id?: string }).id || item.link || crypto.randomUUID(),
      title: item.title || "Untitled",
      url: item.link || source.rssUrl,
      sourceName: source.name,
      sourceId: source.id,
      publishedAt: item.isoDate || item.pubDate || new Date().toISOString(),
      excerpt: cleanExcerpt((item as { description?: string }).description || item.contentSnippet || ""),
      imageUrl: extractImageFromItem(item as unknown as Record<string, unknown>),
      categories: source.categories,
      fallbackGradient: source.fallbackGradient,
    }));
  } catch (error) {
    console.error(`Failed to fetch RSS for ${source.name}:`, error);
    return [];
  } finally {
    clearTimeout(timeoutId);
  }
}

function dedupeAndRank(items: NewsItem[]) {
  const bestByKey = new Map<string, NewsItem>();

  for (const item of items) {
    if (isLowQualityItem(item)) {
      continue;
    }

    const keys = [
      `title:${normalizeText(item.title)}`,
      `url:${normalizeUrl(item.url)}`,
    ];

    for (const key of keys) {
      const existing = bestByKey.get(key);
      if (!existing || getItemScore(item) > getItemScore(existing)) {
        bestByKey.set(key, item);
      }
    }
  }

  const uniqueItems = Array.from(
    new Map(bestByKey.values().map((item) => [item.id, item])).values()
  );

  return uniqueItems.sort((a, b) => getItemScore(b) - getItemScore(a));
}

function buildBalancedFeed(items: NewsItem[], limit: number, maxPerSource: number) {
  const buckets = new Map<string, NewsItem[]>();
  const orderedSources: string[] = [];

  for (const item of items) {
    if (!buckets.has(item.sourceId)) {
      buckets.set(item.sourceId, []);
      orderedSources.push(item.sourceId);
    }
    buckets.get(item.sourceId)?.push(item);
  }

  for (const [sourceId, sourceItems] of buckets.entries()) {
    sourceItems.sort((a, b) => getItemScore(b) - getItemScore(a));
    buckets.set(sourceId, sourceItems);
  }

  orderedSources.sort((a, b) => {
    const sourceA = getSourceById(a);
    const sourceB = getSourceById(b);
    const bestA = buckets.get(a)?.[0];
    const bestB = buckets.get(b)?.[0];
    const priorityA = sourceA?.priority || 5;
    const priorityB = sourceB?.priority || 5;

    if (priorityA !== priorityB) {
      return priorityA - priorityB;
    }

    return (bestB ? getItemScore(bestB) : 0) - (bestA ? getItemScore(bestA) : 0);
  });

  const result: NewsItem[] = [];
  const counts: Record<string, number> = {};

  while (result.length < limit) {
    let addedInRound = false;

    for (const sourceId of orderedSources) {
      if (result.length >= limit) {
        break;
      }

      if ((counts[sourceId] || 0) >= maxPerSource) {
        continue;
      }

      const bucket = buckets.get(sourceId);
      if (!bucket || bucket.length === 0) {
        continue;
      }

      const nextItem = bucket.shift();
      if (!nextItem) {
        continue;
      }

      result.push(nextItem);
      counts[sourceId] = (counts[sourceId] || 0) + 1;
      addedInRound = true;
    }

    if (!addedInRound) {
      break;
    }
  }

  return result;
}

function curateHomepageItems(items: NewsItem[], limit: number) {
  const counts: Record<NewsCategory, number> = {
    "Faith & Practice": 0,
    "Family & Education": 0,
    "Halal Living": 0,
    "Islamic Finance": 0,
    "Health & Wellness": 0,
    "Ummah & World": 0,
  };

  const safeCandidates = items.filter((item) => {
    const source = getSourceById(item.sourceId);
    return source?.safe && !isHeavyHeadline(item) && !isStaleItem(item, HOMEPAGE_MAX_AGE_HOURS);
  });

  const balancedCandidates = buildBalancedFeed(safeCandidates, Math.max(limit * 2, 12), HOMEPAGE_SOURCE_CAP);
  const curatedItems: NewsItem[] = [];

  for (const item of balancedCandidates) {
    if (curatedItems.length >= limit) {
      break;
    }

    const primaryCategory = item.categories.find((category) =>
      Object.hasOwn(HOMEPAGE_QUOTAS, category)
    );

    if (!primaryCategory) {
      continue;
    }

    if (counts[primaryCategory] >= HOMEPAGE_QUOTAS[primaryCategory]) {
      continue;
    }

    curatedItems.push(item);
    counts[primaryCategory]++;
  }

  if (curatedItems.length < limit) {
    for (const item of balancedCandidates) {
      if (curatedItems.length >= limit) {
        break;
      }

      if (!curatedItems.some((curatedItem) => curatedItem.id === item.id)) {
        curatedItems.push(item);
      }
    }
  }

  return curatedItems.sort((a, b) => getItemScore(b) - getItemScore(a));
}

function curateFeedItems(items: NewsItem[], limit: number) {
  const freshItems = items.filter((item) => !isStaleItem(item, FEED_MAX_AGE_HOURS));

  return buildBalancedFeed(freshItems, limit, FEED_SOURCE_CAP).sort(
    (a, b) => getItemScore(b) - getItemScore(a)
  );
}

export async function getAggregatedNews({
  category,
  safeOnly = false,
  limit = 20,
  bypassCache = false,
}: GetAggregatedNewsOptions = {}) {
  const normalizedLimit = Number.isFinite(limit) ? Math.min(Math.max(limit, 1), 50) : 20;
  const cacheKey = getCacheKey({ category, safeOnly });

  if (!bypassCache && cache[cacheKey] && Date.now() - cache[cacheKey].timestamp < CACHE_TTL) {
    return cache[cacheKey].items.slice(0, normalizedLimit);
  }

  const activeSources = filterSources({ category, safeOnly });
  const fetchedItems = await Promise.all(activeSources.map(fetchSourceItems));

  const rankedItems = dedupeAndRank(fetchedItems.flat());
  const curatedItems = safeOnly
    ? curateHomepageItems(rankedItems, normalizedLimit)
    : curateFeedItems(rankedItems, normalizedLimit);

  cache[cacheKey] = {
    items: curatedItems,
    timestamp: Date.now(),
  };

  return curatedItems.slice(0, normalizedLimit);
}
