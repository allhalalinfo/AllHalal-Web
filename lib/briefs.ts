import { BRIEF_CATEGORIES, type Brief, type BriefCategory, type BriefsResponse } from "@/types/brief";

const BRIEFS_API_BASE = "https://api.allhalal.info/api/v1/briefs";
const DEFAULT_FRESHNESS_DAYS = 30;

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

const homepageHeroCategoryWeight: Record<BriefCategory, number> = {
  "Ummah & World": 6,
  "Islamic Finance": 5,
  "Family & Education": 4,
  "Health & Wellness": 3,
  "Halal Living": 2,
  "Faith & Practice": 1,
};

export const briefCategoryTheme: Record<
  BriefCategory,
  {
    badgeClassName: string;
    chipClassName: string;
  }
> = {
  "Faith & Practice": {
    badgeClassName:
      "border-[rgba(41,91,145,0.18)] bg-[rgba(33,103,181,0.1)] text-[#1E5F9A]",
    chipClassName: "bg-[rgba(33,103,181,0.06)] text-[#1E5F9A]",
  },
  "Islamic Finance": {
    badgeClassName:
      "border-[rgba(42,117,84,0.18)] bg-[rgba(53,125,83,0.1)] text-[#2E6D49]",
    chipClassName: "bg-[rgba(53,125,83,0.06)] text-[#2E6D49]",
  },
  "Family & Education": {
    badgeClassName:
      "border-[rgba(196,122,38,0.18)] bg-[rgba(196,122,38,0.1)] text-[#A86518]",
    chipClassName: "bg-[rgba(196,122,38,0.06)] text-[#A86518]",
  },
  "Halal Living": {
    badgeClassName:
      "border-[rgba(39,126,128,0.18)] bg-[rgba(39,126,128,0.1)] text-[#1E7072]",
    chipClassName: "bg-[rgba(39,126,128,0.06)] text-[#1E7072]",
  },
  "Health & Wellness": {
    badgeClassName:
      "border-[rgba(110,88,154,0.18)] bg-[rgba(110,88,154,0.1)] text-[#6A4EA3]",
    chipClassName: "bg-[rgba(110,88,154,0.06)] text-[#6A4EA3]",
  },
  "Ummah & World": {
    badgeClassName:
      "border-[rgba(162,73,65,0.18)] bg-[rgba(162,73,65,0.1)] text-[#9F4036]",
    chipClassName: "bg-[rgba(162,73,65,0.06)] text-[#9F4036]",
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
    (a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
  );
}

function getPrimarySourceName(brief: Brief) {
  return brief.sources[0]?.name ?? "";
}

function isQuestionStyleHeadline(title: string) {
  return /^(what|how|can|does|is|are|should|who)\b/i.test(title.trim());
}

function scoreBriefForHero(brief: Brief) {
  let score = homepageHeroCategoryWeight[brief.category];

  if (brief.image_url) {
    score += 3;
  }

  score += Math.min(brief.source_count, 3) * 2;

  if (isQuestionStyleHeadline(brief.title)) {
    score -= 2.5;
  }

  if (brief.title.length >= 52 && brief.title.length <= 110) {
    score += 1.5;
  }

  if (brief.dek.length >= 70) {
    score += 1;
  }

  return score;
}

function scoreBriefForSlot(
  brief: Brief,
  usedSources: Map<string, number>,
  usedCategories: Map<BriefCategory, number>,
  position: number
) {
  let score = Math.min(brief.source_count, 3) * 2;
  score += brief.image_url ? 1.25 : 0;
  score += Math.max(0, 4 - position) * 0.35;

  const primarySource = getPrimarySourceName(brief);
  const sourceCount = primarySource ? usedSources.get(primarySource) ?? 0 : 0;
  const categoryCount = usedCategories.get(brief.category) ?? 0;

  score += sourceCount === 0 ? 2.25 : -sourceCount * 2;
  score += categoryCount === 0 ? 1.5 : -categoryCount * 1.25;

  if (position < 4 && isQuestionStyleHeadline(brief.title)) {
    score -= 1.75;
  }

  return score;
}

export function buildHomepageBriefLayout(briefs: Brief[]): HomepageBriefLayout {
  if (!briefs.length) {
    return { hero: null, featured: [], compact: [] };
  }

  const sortedCandidates = sortBriefsByDate(briefs);
  const hero = [...sortedCandidates].sort((a, b) => scoreBriefForHero(b) - scoreBriefForHero(a))[0];

  if (!hero) {
    return { hero: null, featured: [], compact: [] };
  }

  const usedSources = new Map<string, number>();
  const usedCategories = new Map<BriefCategory, number>();
  const heroSource = getPrimarySourceName(hero);

  if (heroSource) {
    usedSources.set(heroSource, 1);
  }
  usedCategories.set(hero.category, 1);

  const remaining = sortedCandidates.filter((brief) => brief.id !== hero.id);
  const selected: Brief[] = [];

  while (remaining.length > 0 && selected.length < 8) {
    let bestIndex = 0;
    let bestScore = Number.NEGATIVE_INFINITY;

    remaining.forEach((brief, index) => {
      const score = scoreBriefForSlot(brief, usedSources, usedCategories, selected.length);
      if (score > bestScore) {
        bestScore = score;
        bestIndex = index;
      }
    });

    const [chosen] = remaining.splice(bestIndex, 1);
    selected.push(chosen);

    const sourceName = getPrimarySourceName(chosen);
    if (sourceName) {
      usedSources.set(sourceName, (usedSources.get(sourceName) ?? 0) + 1);
    }
    usedCategories.set(chosen.category, (usedCategories.get(chosen.category) ?? 0) + 1);
  }

  return {
    hero,
    featured: selected.slice(0, 4),
    compact: selected.slice(4, 8),
  };
}

export async function getHomepageBriefs(limit = 12) {
  const { items } = await getFeedBriefs({
    limit: Math.max(limit, 18),
    offset: 0,
  });

  return filterFreshBriefs(items, DEFAULT_FRESHNESS_DAYS).slice(0, limit);
}

export async function getHomepageBriefLayout() {
  const { items } = await getFeedBriefs({
    limit: 18,
    offset: 0,
  });

  return buildHomepageBriefLayout(filterFreshBriefs(items, DEFAULT_FRESHNESS_DAYS));
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
    return {
      items: sortBriefsByDate(data.items),
      count: data.count ?? data.items.length,
      total: data.total ?? data.items.length,
      hasMore: Boolean(data.has_more),
      offset: data.offset ?? offset,
      limit: data.limit ?? limit,
    };
  }
  return {
    items: [],
    count: 0,
    total: 0,
    hasMore: false,
    offset,
    limit,
  };
}

export async function getBriefCategories() {
  const data = await fetchBriefsJson<CategoriesResponse>(`${BRIEFS_API_BASE}/categories`, 1800);

  if (data?.success && Array.isArray(data.categories) && data.categories.length > 0) {
    return data.categories.filter((category) =>
      BRIEF_CATEGORIES.includes(category.name as BriefCategory)
    );
  }

  return [];
}

export async function getBriefDetail(slug: string) {
  const data = await fetchBriefsJson<DetailResponse>(`${BRIEFS_API_BASE}/${slug}`, 3600);

  if (data?.success && data.brief) {
    return {
      brief: data.brief,
      related:
        Array.isArray(data.related) && data.related.length > 0
          ? sortBriefsByDate(data.related)
          : [],
    };
  }
  return null;
}

export function getRelatedBriefs(_brief: Brief, _limit = 3) {
  return [];
}

function parseBriefTimestamp(value: string) {
  const timestamp = new Date(value).getTime();
  return Number.isNaN(timestamp) ? null : timestamp;
}

export function isBriefFresh(brief: Brief, maxAgeDays = 30) {
  const timestamp = parseBriefTimestamp(brief.published_at);
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
