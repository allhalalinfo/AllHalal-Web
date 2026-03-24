import type { NewsCategory } from "@/lib/newsSources";
import { getAggregatedNews, type NewsItem } from "@/lib/newsFeed";
import { BRIEF_CATEGORIES, type Brief, type BriefCategory, type BriefsResponse } from "@/types/brief";

const DEFAULT_FRESHNESS_DAYS = 30;

/**
 * Briefs JSON base — must match the API instance whose Redis you maintain.
 * Override in Vercel if prod ever pointed at a stale/stage host:
 * - `NEXT_PUBLIC_BRIEFS_API_BASE` = full prefix e.g. `https://api.allhalal.info/api/v1/briefs`
 * - or `NEXT_PUBLIC_API_URL` = origin only; paths become `{origin}/api/v1/briefs/...`
 */
export function getBriefsApiBase(): string {
  const explicit =
    process.env.NEXT_PUBLIC_BRIEFS_API_BASE?.trim() ||
    process.env.BRIEFS_API_BASE?.trim();
  if (explicit) {
    return explicit.replace(/\/$/, "");
  }
  const origin = (process.env.NEXT_PUBLIC_API_URL || "https://api.allhalal.info").replace(/\/$/, "");
  return `${origin}/api/v1/briefs`;
}

/** Home/feed JSON ISR — fresher `image_url` after Redis updates (was 900s). */
export const BRIEFS_LIST_FETCH_REVALIDATE_SECONDS = 300;
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

/**
 * Thematic slugs from backend `news_curation` / Redis → legacy `BriefCategory` for UI.
 * Keep in sync with backend `THEMATIC_SLUG_TO_DISPLAY_CATEGORY` when possible.
 */
export const THEMATIC_SLUG_TO_BRIEF_CATEGORY: Record<string, BriefCategory> = {
  islam: "Faith & Practice",
  spirituality: "Faith & Practice",
  family: "Family & Education",
  education: "Family & Education",
  finance: "Islamic Finance",
  zakat: "Islamic Finance",
  halal: "Halal Living",
  lifestyle: "Halal Living",
  ummah: "Ummah & World",
  world: "Ummah & World",
  tech: "Tech & Innovation",
  health: "Health & Wellness",
  travel: "Travel & Wellness",
};

function pickCategoryFromCategoriesArray(cats: string[] | undefined): BriefCategory | undefined {
  if (!cats?.length) {
    return undefined;
  }

  const legacyHit = cats.find((c) => BRIEF_CATEGORIES.includes(c as BriefCategory));
  if (legacyHit) {
    return legacyHit as BriefCategory;
  }

  const lowered = cats.map((c) => c.toLowerCase().trim());
  // Backend balancing: when two slugs exist and no legacy strings, prefer the second for display mapping.
  const tryOrder =
    cats.length >= 2 ? [cats[1], cats[0], ...cats.slice(2)] : [...cats];

  for (const raw of tryOrder) {
    const k = raw.toLowerCase().trim();
    const mapped = THEMATIC_SLUG_TO_BRIEF_CATEGORY[k];
    if (mapped) {
      return mapped;
    }
  }

  for (const raw of cats) {
    const k = raw.toLowerCase().trim();
    const mapped = THEMATIC_SLUG_TO_BRIEF_CATEGORY[k];
    if (mapped) {
      return mapped;
    }
  }

  return undefined;
}

/**
 * Resolve stable legacy category for cards, filters, and stock placeholders.
 * API normally sends `category` already mapped; this handles slugs + mixed `categories[]` during cache transition.
 */
export function normalizeBriefDisplayCategory(brief: {
  category?: string;
  categories?: string[];
}): BriefCategory {
  const c = brief.category?.trim();
  if (c && BRIEF_CATEGORIES.includes(c as BriefCategory)) {
    return c as BriefCategory;
  }
  if (c) {
    const fromPrimarySlug = THEMATIC_SLUG_TO_BRIEF_CATEGORY[c.toLowerCase()];
    if (fromPrimarySlug) {
      return fromPrimarySlug;
    }
  }

  const fromArr = pickCategoryFromCategoriesArray(brief.categories);
  return fromArr ?? "Faith & Practice";
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

function buildFallbackBriefSlug(item: NewsItem) {
  return slugifyBriefCategory(item.title).slice(0, 72) || "story";
}

function buildLegacyFallbackBriefSlug(item: NewsItem) {
  const normalizedTitle = slugifyBriefCategory(item.title).slice(0, 72) || "story";
  return `${item.sourceId}-${normalizedTitle}`;
}

function mapNewsItemToBrief(item: NewsItem): Brief {
  const category = normalizeBriefDisplayCategory({
    categories: item.categories as string[],
  });
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
  const legacyCamel = (brief as Brief & { imageUrl?: string | null }).imageUrl;
  const rawImage = brief.image_url ?? legacyCamel ?? null;
  const sanitizedImageUrl = sanitizeBriefImageUrl(rawImage);
  const category = normalizeBriefDisplayCategory(brief);

  if (sanitizedImageUrl === brief.image_url && category === brief.category) {
    return brief;
  }

  return {
    ...brief,
    category,
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
  const briefs = filterBlockedSourceBriefs(sortBriefsByDate(items.map(mapNewsItemToBrief)));
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

  if (!brief || isBlockedBriefSource(brief)) {
    return null;
  }

  const related = filterBlockedSourceBriefs(
    briefs.filter((entry) => entry.slug !== slug && entry.category === brief.category),
  ).slice(0, 3);

  return {
    brief,
    related,
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

/**
 * Wire sources we never surface in UI (policy / no usable art in RSS). Backend may still
 * send them until Redis is aligned — this keeps prod consistent with editorial intent.
 */
const BRIEF_SOURCE_BLOCKLIST_SUBSTRINGS = ["al jazeera", "aljazeera"];

export function isBlockedBriefSource(brief: Brief): boolean {
  const name = getBriefPrimarySourceName(brief).toLowerCase();
  return BRIEF_SOURCE_BLOCKLIST_SUBSTRINGS.some((frag) => name.includes(frag));
}

export function filterBlockedSourceBriefs(briefs: Brief[]): Brief[] {
  return briefs.filter((b) => !isBlockedBriefSource(b));
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

/**
 * Homepage briefs: **only** `/briefs/home` (backend curated / custom mix).
 * Wire-style RSS (Al Jazeera, MEE, etc.) stays on `/news` via `getFeedBriefs` — never substitute feed here.
 */
export async function getHomepageBriefLayout() {
  const data = await fetchBriefsJson<HomeResponse>(
    `${getBriefsApiBase()}/home?limit=20`,
    BRIEFS_LIST_FETCH_REVALIDATE_SECONDS,
  );

  const hasLiveBriefs =
    Boolean(data?.hero) ||
    Boolean(data?.featured?.length) ||
    Boolean(data?.compact?.length);

  if (data?.success && hasLiveBriefs) {
    const heroCandidate =
      data.hero && isBriefFresh(sanitizeBrief(data.hero), DEFAULT_FRESHNESS_DAYS)
        ? sanitizeBrief(data.hero)
        : null;
    const featured = filterBlockedSourceBriefs(
      filterFreshBriefs((data.featured ?? []).map(sanitizeBrief), DEFAULT_FRESHNESS_DAYS),
    );
    const compact = filterBlockedSourceBriefs(
      filterFreshBriefs((data.compact ?? []).map(sanitizeBrief), DEFAULT_FRESHNESS_DAYS),
    );
    const hero =
      heroCandidate && !isBlockedBriefSource(heroCandidate) ? heroCandidate : null;

    return {
      hero,
      featured,
      compact,
    };
  }

  return {
    hero: null,
    featured: [],
    compact: [],
  };
}

/** Flatten `/briefs/home` layout to one list: hero → featured → compact. */
export function flattenHomepageBriefLayout(layout: HomepageBriefLayout): Brief[] {
  const { hero, featured, compact } = layout;
  const out: Brief[] = [];
  if (hero) {
    out.push(hero);
  }
  out.push(...featured, ...compact);
  return out;
}

function briefDedupeKey(brief: Brief): string {
  const url = brief.sources[0]?.url?.trim();
  if (url) {
    return `u:${url}`;
  }
  return `i:${String(brief.id)}`;
}

/**
 * News desk: curated `/briefs/home` items first (portal order), then `/briefs/feed` extras
 * not already present (same story = same primary source URL or same `id`).
 */
export function mergeHomepageBriefsWithFeed(homeOrdered: Brief[], feedItems: Brief[]): Brief[] {
  const seen = new Set<string>();
  const merged: Brief[] = [];
  for (const b of homeOrdered) {
    const k = briefDedupeKey(b);
    if (!seen.has(k)) {
      seen.add(k);
      merged.push(b);
    }
  }
  const extraSorted = sortBriefsByDate(
    feedItems.filter((b) => !seen.has(briefDedupeKey(b))),
  );
  merged.push(...extraSorted);
  return merged;
}

/** Filter by category slug from chips (`slugifyBriefCategory` of `Brief.category`). */
export function filterBriefsByCategorySlug(
  briefs: Brief[],
  categorySlug: string | undefined,
): Brief[] {
  if (!categorySlug?.trim()) {
    return briefs;
  }
  return briefs.filter((b) => slugifyBriefCategory(b.category) === categorySlug);
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
    `${getBriefsApiBase()}/feed?${params.toString()}`,
    BRIEFS_LIST_FETCH_REVALIDATE_SECONDS,
  );

  if (data?.success && Array.isArray(data.items) && data.items.length > 0) {
    const sanitizedItems = filterBlockedSourceBriefs(data.items.map(sanitizeBrief));

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
  const data = await fetchBriefsJson<CategoriesResponse>(`${getBriefsApiBase()}/categories`, 1800);

  if (data?.success && Array.isArray(data.categories) && data.categories.length > 0) {
    return data.categories.filter((category) =>
      BRIEF_CATEGORIES.includes(category.name as BriefCategory)
    );
  }

  const fallbackItems = await getAggregatedNews({ limit: 50 });
  const counts = new Map<BriefCategory, number>();

  for (const item of fallbackItems) {
    const category = normalizeBriefDisplayCategory({
      categories: item.categories as string[],
    });
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
  const data = await fetchBriefsJson<DetailResponse>(`${getBriefsApiBase()}/${slug}`, 3600);

  if (data?.success && data.brief) {
    const brief = sanitizeBrief(data.brief);
    if (isBlockedBriefSource(brief)) {
      return null;
    }
    const relatedRaw =
      Array.isArray(data.related) && data.related.length > 0
        ? sortBriefsByDate(data.related.map(sanitizeBrief))
        : [];
    return {
      brief,
      related: filterBlockedSourceBriefs(relatedRaw),
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
    return !sanitizeBriefImageUrl(brief.image_url);
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
