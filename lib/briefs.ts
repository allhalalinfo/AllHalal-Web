import type { NewsCategory } from "@/lib/newsSources";
import { getAggregatedNews, type NewsItem } from "@/lib/newsFeed";
import { BRIEF_CATEGORIES, type Brief, type BriefCategory, type BriefsResponse } from "@/types/brief";

const BRIEFS_API_BASE = "https://api.allhalal.info/api/v1/briefs";
const DEFAULT_FRESHNESS_DAYS = 30;
const BAD_BRIEF_IMAGE_PATTERNS = [
  /s\.w\.org\/images\/core\/emoji/i,
  /gravatar\.com/i,
  /\/emoji\//i,
  /\/avatar\//i,
  /\/icon\//i,
  /\/logo\//i,
  /\/logos\//i,
  /\/plugins\//i,
  /islamic-graphics/i,
  /swt\.png/i,
  /pixel\./i,
  /placeholder/i,
];

export type HomepageBriefLayout = {
  hero: Brief | null;
  featured: Brief[];
  compact: Brief[];
};

type FeedResponse = BriefsResponse & {
  total?: number;
  has_more?: boolean;
  offset?: number;
  limit?: number;
};

type HomeResponse = {
  success: boolean;
  hero?: Brief | null;
  featured?: Brief[];
  compact?: Brief[];
};

type DetailResponse = {
  success: boolean;
  brief?: Brief;
  related?: Brief[];
};

type CategoriesResponse = {
  success: boolean;
  categories?: Array<{
    name: string;
    count: number;
    slug: string;
  }>;
};

const HOMEPAGE_CATEGORY_QUOTAS: Partial<Record<BriefCategory, number>> = {
  "Faith & Practice": 2,
  "Family & Education": 1,
  "Halal Living": 1,
  "Islamic Finance": 1,
  "Health & Wellness": 1,
  "Ummah & World": 1,
};

const LIVE_NEWS_CATEGORIES: NewsCategory[] = [
  "Faith & Practice",
  "Family & Education",
  "Halal Living",
  "Islamic Finance",
  "Health & Wellness",
  "Ummah & World",
];

export function slugifyBriefCategory(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function hashString(value: string) {
  let hash = 0;

  for (let index = 0; index < value.length; index += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(index);
    hash |= 0;
  }

  return Math.abs(hash);
}

function resolveBriefCategorySlug(slug?: string): NewsCategory | undefined {
  if (!slug) {
    return undefined;
  }

  return LIVE_NEWS_CATEGORIES.find((category) => slugifyBriefCategory(category) === slug);
}

function getFallbackBriefCategory(item: NewsItem): BriefCategory {
  const matchedCategory = item.categories.find((category) =>
    BRIEF_CATEGORIES.includes(category as BriefCategory)
  );

  return (matchedCategory as BriefCategory | undefined) ?? "Faith & Practice";
}

function buildFallbackBriefSlug(item: NewsItem) {
  return slugifyBriefCategory(item.title).slice(0, 72) || "story";
}

function buildLegacyFallbackBriefSlug(item: NewsItem) {
  const normalizedTitle = slugifyBriefCategory(item.title).slice(0, 72) || "story";
  return `${item.sourceId}-${normalizedTitle}`;
}

function mapNewsItemToBrief(item: NewsItem): Brief {
  const category = getFallbackBriefCategory(item);
  const excerpt = item.excerpt.trim() || `Current reporting from ${item.sourceName}.`;
  const sourcePublishedAt = item.publishedAt || new Date().toISOString();
  const sanitizedImageUrl = sanitizeBriefImageUrl(item.imageUrl);

  return {
    id: hashString(`${item.sourceId}:${item.url}:${item.title}`),
    slug: buildFallbackBriefSlug(item),
    title: item.title,
    dek: excerpt,
    summary: `${excerpt}\n\nRead the original article from ${item.sourceName} for the full report and any follow-up updates.`,
    why_it_matters: `This story is part of the live AllHalal news feed and reflects current reporting from ${item.sourceName}.`,
    category,
    image_url: sanitizedImageUrl,
    published_at: sourcePublishedAt,
    source_published_at: sourcePublishedAt,
    generated_at: sourcePublishedAt,
    brief_type: "news",
    image_strategy: sanitizedImageUrl ? "real" : "none",
    sources: [
      {
        name: item.sourceName,
        url: item.url,
      },
    ],
    source_count: 1,
    primary_source: item.sourceName,
    kind: "live_news_fallback",
    hero_candidate: false,
  };
}

function sanitizeBrief(brief: Brief): Brief {
  const sanitizedImageUrl = sanitizeBriefImageUrl(brief.image_url);

  if (sanitizedImageUrl === brief.image_url) {
    return brief;
  }

  return {
    ...brief,
    image_url: sanitizedImageUrl,
    image_strategy: sanitizedImageUrl ? brief.image_strategy ?? "real" : "none",
  };
}

async function getFallbackFeedBriefs({
  category,
  limit,
  offset,
}: {
  category?: string;
  limit: number;
  offset: number;
}) {
  const resolvedCategory = resolveBriefCategorySlug(category);

  if (category && !resolvedCategory) {
    return {
      items: [],
      count: 0,
      total: 0,
      hasMore: false,
      offset,
      limit,
    };
  }

  const requestedLimit = Math.min(Math.max(offset + limit, 20), 50);
  const items = await getAggregatedNews({
    category: resolvedCategory,
    limit: requestedLimit,
  });
  const briefs = sortBriefsByDate(items.map(mapNewsItemToBrief));
  const paginatedItems = briefs.slice(offset, offset + limit);

  return {
    items: paginatedItems,
    count: paginatedItems.length,
    total: briefs.length,
    hasMore: offset + limit < briefs.length,
    offset,
    limit,
  };
}

async function getFallbackBriefBySlug(slug: string) {
  const items = await getAggregatedNews({ limit: 50 });
  const mappedItems = items.map((item: NewsItem) => ({
    item,
    brief: mapNewsItemToBrief(item),
  }));
  const briefs = sortBriefsByDate(mappedItems.map((entry: { item: NewsItem; brief: Brief }) => entry.brief));
  const matchedItem = mappedItems.find(({ item, brief }: { item: NewsItem; brief: Brief }) =>
    brief.slug === slug || buildLegacyFallbackBriefSlug(item) === slug
  );
  const brief = matchedItem?.brief;

  if (!brief) {
    return null;
  }

  return {
    brief,
    related: briefs
      .filter((entry) => entry.slug !== slug && entry.category === brief.category)
      .slice(0, 3),
  };
}

async function getFallbackHomepageLayout() {
  const items = await getAggregatedNews({
    safeOnly: true,
    limit: 12,
  });
  const freshItems = filterFreshBriefs(
    sortBriefsByDate(items.map(mapNewsItemToBrief)),
    DEFAULT_FRESHNESS_DAYS,
  );

  return {
    hero: freshItems[0] ?? null,
    featured: freshItems.slice(1, 4),
    compact: freshItems.slice(4, 12),
  };
}

export const briefCategoryTheme: Record<
  BriefCategory,
  {
    badgeClassName: string;
    chipClassName: string;
  }
> = {
  "Faith & Practice": {
    badgeClassName:
      "border-[rgba(16,185,129,0.18)] bg-[rgba(16,185,129,0.1)] text-[#065F46]",
    chipClassName: "bg-[rgba(16,185,129,0.08)] text-[#065F46]",
  },
  "Ummah & World": {
    badgeClassName:
      "border-[rgba(59,130,246,0.18)] bg-[rgba(59,130,246,0.1)] text-[#1D4ED8]",
    chipClassName: "bg-[rgba(59,130,246,0.08)] text-[#1D4ED8]",
  },
  "Family & Education": {
    badgeClassName:
      "border-[rgba(245,158,11,0.18)] bg-[rgba(245,158,11,0.1)] text-[#92400E]",
    chipClassName: "bg-[rgba(245,158,11,0.08)] text-[#92400E]",
  },
  "Islamic Finance": {
    badgeClassName:
      "border-[rgba(139,92,246,0.18)] bg-[rgba(139,92,246,0.1)] text-[#5B21B6]",
    chipClassName: "bg-[rgba(139,92,246,0.08)] text-[#5B21B6]",
  },
  "Halal Lifestyle": {
    badgeClassName:
      "border-[rgba(236,72,153,0.18)] bg-[rgba(236,72,153,0.1)] text-[#9D174D]",
    chipClassName: "bg-[rgba(236,72,153,0.08)] text-[#9D174D]",
  },
  "Tech & Innovation": {
    badgeClassName:
      "border-[rgba(99,102,241,0.18)] bg-[rgba(99,102,241,0.1)] text-[#4338CA]",
    chipClassName: "bg-[rgba(99,102,241,0.08)] text-[#4338CA]",
  },
  "Travel & Wellness": {
    badgeClassName:
      "border-[rgba(6,182,212,0.18)] bg-[rgba(6,182,212,0.1)] text-[#0F766E]",
    chipClassName: "bg-[rgba(6,182,212,0.08)] text-[#0F766E]",
  },
  "Travel & Lifestyle": {
    badgeClassName:
      "border-[rgba(6,182,212,0.18)] bg-[rgba(6,182,212,0.1)] text-[#0F766E]",
    chipClassName: "bg-[rgba(6,182,212,0.08)] text-[#0F766E]",
  },
  "Halal Living": {
    badgeClassName:
      "border-[rgba(236,72,153,0.18)] bg-[rgba(236,72,153,0.1)] text-[#9D174D]",
    chipClassName: "bg-[rgba(236,72,153,0.08)] text-[#9D174D]",
  },
  "Health & Wellness": {
    badgeClassName:
      "border-[rgba(124,58,237,0.18)] bg-[rgba(124,58,237,0.1)] text-[#6D28D9]",
    chipClassName: "bg-[rgba(124,58,237,0.08)] text-[#6D28D9]",
  },
};

async function parseJsonSafe<T>(response: Response): Promise<T | null> {
  const text = await response.text();
  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text) as T;
  } catch {
    return null;
  }
}

async function fetchBriefsJson<T>(url: string, revalidate: number) {
  try {
    const response = await fetch(url, {
      next: { revalidate },
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      return null;
    }

    return await parseJsonSafe<T>(response);
  } catch {
    return null;
  }
}

function sortBriefsByDate(items: Brief[]) {
  return [...items].sort(
    (a, b) => getBriefSortTimestamp(b) - getBriefSortTimestamp(a)
  );
}

function getBriefPrimarySourceName(brief: Brief) {
  return brief.sources[0]?.name || brief.primary_source || "Unknown source";
}

function buildBalancedBriefs(items: Brief[], limit: number, maxPerSource: number) {
  const result: Brief[] = [];
  const sourceCounts = new Map<string, number>();

  for (const brief of items) {
    if (result.length >= limit) {
      break;
    }

    const sourceName = getBriefPrimarySourceName(brief);
    const sourceCount = sourceCounts.get(sourceName) ?? 0;

    if (sourceCount >= maxPerSource) {
      continue;
    }

    result.push(brief);
    sourceCounts.set(sourceName, sourceCount + 1);
  }

  return result;
}

function buildHomepageLayoutFromBriefs(items: Brief[]): HomepageBriefLayout {
  const freshItems = filterFreshBriefs(sortBriefsByDate(items), DEFAULT_FRESHNESS_DAYS);
  const categoryCounts = new Map<BriefCategory, number>();
  const sourceCounts = new Map<string, number>();
  const curated: Brief[] = [];

  for (const brief of freshItems) {
    const sourceName = getBriefPrimarySourceName(brief);
    const sourceCount = sourceCounts.get(sourceName) ?? 0;

    if (sourceCount >= 2) {
      continue;
    }

    const quota = HOMEPAGE_CATEGORY_QUOTAS[brief.category] ?? 1;
    const categoryCount = categoryCounts.get(brief.category) ?? 0;

    if (categoryCount >= quota) {
      continue;
    }

    curated.push(brief);
    sourceCounts.set(sourceName, sourceCount + 1);
    categoryCounts.set(brief.category, categoryCount + 1);

    if (curated.length >= 18) {
      break;
    }
  }

  if (curated.length < 12) {
    const fallbackBalanced = buildBalancedBriefs(
      freshItems.filter((brief) => !curated.some((item) => item.id === brief.id)),
      Math.max(0, 18 - curated.length),
      2,
    );

    curated.push(...fallbackBalanced);
  }

  return {
    hero: curated[0] ?? null,
    featured: curated.slice(1, 4),
    compact: curated.slice(4, 18),
  };
}

function hasHealthyHomepageDiversity(layout: HomepageBriefLayout) {
  const items = [layout.hero, ...layout.featured, ...layout.compact].filter(Boolean) as Brief[];

  if (items.length < 6) {
    return false;
  }

  const uniqueSources = new Set(items.map(getBriefPrimarySourceName));

  // Only check sources (≥3), not categories
  // Islamic Finance/Halal Living RSS feeds don't exist, so 3+ categories is impossible
  return uniqueSources.size >= 3;
}

export async function getHomepageBriefs(limit = 12) {
  const { items } = await getFeedBriefs({
    limit: Math.max(limit, 36),
    offset: 0,
  });

  return buildBalancedBriefs(
    filterFreshBriefs(items, DEFAULT_FRESHNESS_DAYS),
    limit,
    2,
  );
}

export async function getHomepageBriefLayout() {
  const data = await fetchBriefsJson<HomeResponse>(
    `${BRIEFS_API_BASE}/home?limit=24`,
    900
  );

  const hasLiveBriefs =
    Boolean(data?.hero) ||
    Boolean(data?.featured?.length) ||
    Boolean(data?.compact?.length);

  if (data?.success && hasLiveBriefs) {
    const layout = {
      hero:
        data.hero && isBriefFresh(sanitizeBrief(data.hero), DEFAULT_FRESHNESS_DAYS)
          ? sanitizeBrief(data.hero)
          : null,
      featured: filterFreshBriefs((data.featured ?? []).map(sanitizeBrief), DEFAULT_FRESHNESS_DAYS),
      compact: filterFreshBriefs((data.compact ?? []).map(sanitizeBrief), DEFAULT_FRESHNESS_DAYS),
    };

    if (hasHealthyHomepageDiversity(layout)) {
      return layout;
    }
  }

  const { items } = await getFeedBriefs({
    limit: 50,
    offset: 0,
  });

  return buildHomepageLayoutFromBriefs(items);
}

export async function getFeedBriefs({
  category,
  limit = 20,
  offset = 0,
}: {
  category?: string;
  limit?: number;
  offset?: number;
}) {
  const params = new URLSearchParams({
    limit: String(limit),
    offset: String(offset),
  });

  if (category) {
    params.set("category", category);
  }

  const data = await fetchBriefsJson<FeedResponse>(
    `${BRIEFS_API_BASE}/feed?${params.toString()}`,
    900
  );

  if (data?.success && Array.isArray(data.items) && data.items.length > 0) {
    const sanitizedItems = data.items.map(sanitizeBrief);

    return {
      items: sortBriefsByDate(sanitizedItems),
      count: data.count ?? sanitizedItems.length,
      total: data.total ?? sanitizedItems.length,
      hasMore: Boolean(data.has_more),
      offset: data.offset ?? offset,
      limit: data.limit ?? limit,
    };
  }

  return getFallbackFeedBriefs({ category, limit, offset });
}

export async function getBriefCategories() {
  const data = await fetchBriefsJson<CategoriesResponse>(`${BRIEFS_API_BASE}/categories`, 1800);

  if (data?.success && Array.isArray(data.categories) && data.categories.length > 0) {
    return data.categories.filter((category) =>
      BRIEF_CATEGORIES.includes(category.name as BriefCategory)
    );
  }

  const fallbackItems = await getAggregatedNews({ limit: 50 });
  const counts = new Map<BriefCategory, number>();

  for (const item of fallbackItems) {
    const category = getFallbackBriefCategory(item);
    counts.set(category, (counts.get(category) ?? 0) + 1);
  }

  return BRIEF_CATEGORIES
    .map((category) => ({
      name: category,
      count: counts.get(category) ?? 0,
      slug: slugifyBriefCategory(category),
    }))
    .filter((category) => category.count > 0);
}

export async function getBriefDetail(slug: string) {
  const data = await fetchBriefsJson<DetailResponse>(`${BRIEFS_API_BASE}/${slug}`, 3600);

  if (data?.success && data.brief) {
    return {
      brief: sanitizeBrief(data.brief),
      related:
        Array.isArray(data.related) && data.related.length > 0
          ? sortBriefsByDate(data.related.map(sanitizeBrief))
          : [],
    };
  }

  return getFallbackBriefBySlug(slug);
}

export function getRelatedBriefs(_brief: Brief, _limit = 3) {
  return [];
}

function parseBriefTimestamp(value: string) {
  const timestamp = new Date(value).getTime();
  return Number.isNaN(timestamp) ? null : timestamp;
}

export function getBriefSourcePublishedAt(brief: Brief) {
  return brief.source_published_at || brief.published_at || brief.generated_at || "";
}

export function getBriefSortTimestamp(brief: Brief) {
  return (
    parseBriefTimestamp(brief.generated_at || "") ??
    parseBriefTimestamp(getBriefSourcePublishedAt(brief)) ??
    parseBriefTimestamp(brief.published_at) ??
    0
  );
}

export function getBriefDisplayTimestamp(brief: Brief) {
  return getBriefSourcePublishedAt(brief);
}

/**
 * Strip WordPress / RSS footer junk so card text does not end on "The post … appeared first on".
 */
export function cleanBriefCardExcerpt(text: string | null | undefined): string {
  if (!text?.trim()) {
    return "";
  }
  let t = text.replace(/\s+/g, " ").trim();
  const wpFooter = /\b(?:The|This) post\s+.+\s+appeared first on\b/i;
  const cut = t.search(wpFooter);
  if (cut > 0) {
    t = t.slice(0, cut).trimEnd();
  } else if (/^(?:The|This) post\s+.+\s+appeared first on\b/i.test(t)) {
    t = "";
  }
  t = t.replace(/\bContinue reading\b[\s\S]*$/i, "").trimEnd();
  t = t.replace(/\bRead the full (article|post)\b[\s\S]*$/i, "").trimEnd();
  t = t.replace(/\s*\.{3,}\s*$/g, "").trim();
  return t;
}

function firstSummaryParagraph(summary: string | null | undefined): string {
  if (!summary?.trim()) {
    return "";
  }
  return summary.split(/\n\n/)[0]?.trim() ?? "";
}

/**
 * Copy for list/hero cards: prefer validated AI summary, then any ai_summary, else cleaned dek/summary.
 */
export function getBriefCardBlurb(brief: Brief): string {
  const ai = brief.ai_summary?.trim();
  if (brief.used_ai_summary === true && ai) {
    return ai;
  }
  if (brief.used_ai_summary === false) {
    return (
      cleanBriefCardExcerpt(brief.dek) ||
      cleanBriefCardExcerpt(firstSummaryParagraph(brief.summary))
    );
  }
  if (ai) {
    return ai;
  }
  return (
    cleanBriefCardExcerpt(brief.dek) ||
    cleanBriefCardExcerpt(firstSummaryParagraph(brief.summary))
  );
}

export function sanitizeBriefImageUrl(imageUrl: string | null | undefined) {
  if (!imageUrl) {
    return null;
  }

  const normalizedImageUrl = imageUrl.trim();

  if (!normalizedImageUrl) {
    return null;
  }

  const lowercaseImageUrl = normalizedImageUrl.toLowerCase();

  if (!lowercaseImageUrl.startsWith("http://") && !lowercaseImageUrl.startsWith("https://")) {
    return null;
  }

  if (lowercaseImageUrl.includes("youtube.com/embed") || lowercaseImageUrl.includes("youtu.be/")) {
    return null;
  }

  if (BAD_BRIEF_IMAGE_PATTERNS.some((pattern) => pattern.test(lowercaseImageUrl))) {
    return null;
  }

  return normalizedImageUrl;
}

/** True when we should not load remote art (show branded placeholder instead). */
export function isStockLikeBrief(brief: Brief): boolean {
  const t = (brief.image_type || "").toLowerCase();
  if (t === "stock" || t.includes("pexels")) {
    return true;
  }
  if (brief.image_strategy === "category_fallback") {
    return true;
  }
  return false;
}

/** Prefer cards that likely show a real editorial image (sort helper). */
export function briefHasEditorialImage(brief: Brief): boolean {
  return Boolean(sanitizeBriefImageUrl(brief.image_url)) && !isStockLikeBrief(brief);
}

/** True when the primary card blurb is the short AI line (not a long dek). */
export function isBriefPrimaryBlurbFromAi(brief: Brief): boolean {
  const ai = brief.ai_summary?.trim();
  return Boolean(
    (brief.used_ai_summary === true && ai) || (brief.used_ai_summary !== false && ai),
  );
}

export type BriefBlurbClampVariant = "grid" | "headline" | "lead" | "stream";

/**
 * Line clamps: AI stays short; long excerpts use little or no clamp so WordPress tails are not confused with mid-word cuts.
 */
export function getBriefBlurbClampClasses(
  brief: Brief,
  variant: BriefBlurbClampVariant = "grid",
): string {
  if (isBriefPrimaryBlurbFromAi(brief)) {
    if (variant === "headline") {
      return "line-clamp-none sm:line-clamp-2";
    }
    if (variant === "lead") {
      return "line-clamp-none sm:line-clamp-4";
    }
    return "line-clamp-none sm:line-clamp-3";
  }
  if (variant === "headline") {
    return "line-clamp-none sm:line-clamp-5";
  }
  if (variant === "lead") {
    return "line-clamp-none sm:line-clamp-7";
  }
  if (variant === "stream") {
    return "line-clamp-none sm:line-clamp-[9]";
  }
  return "line-clamp-none sm:line-clamp-[8]";
}

/** Default grid card blurb (spacing + typography + clamp). */
export function getBriefCardBlurbClassName(brief: Brief): string {
  return `mt-2 text-[0.9rem] font-medium leading-relaxed text-text-secondary ${getBriefBlurbClampClasses(brief, "grid")}`;
}

export function hasValidBriefImage(brief: Brief) {
  return Boolean(sanitizeBriefImageUrl(brief.image_url));
}

export function isBriefFresh(brief: Brief, maxAgeDays = 30) {
  const timestamp = parseBriefTimestamp(getBriefSourcePublishedAt(brief));
  if (!timestamp) {
    return false;
  }

  const maxAgeMs = maxAgeDays * 24 * 60 * 60 * 1000;
  return Date.now() - timestamp <= maxAgeMs;
}

export function filterFreshBriefs(briefs: Brief[], maxAgeDays = 30) {
  return briefs.filter((brief) => isBriefFresh(brief, maxAgeDays));
}

export function formatTimeAgo(value: string) {
  const timestamp = parseBriefTimestamp(value);
  if (!timestamp) {
    return "";
  }

  const diffHours = Math.max(0, Math.floor((Date.now() - timestamp) / 1000 / 60 / 60));

  if (diffHours < 1) {
    return "Just now";
  }

  if (diffHours < 24) {
    return `${diffHours}h ago`;
  }

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) {
    return `${diffDays}d ago`;
  }

  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
