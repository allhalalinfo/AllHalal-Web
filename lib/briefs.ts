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

export async function getHomepageBriefs(limit = 12) {
  const { items } = await getFeedBriefs({
    limit: Math.max(limit, 18),
    offset: 0,
  });

  return filterFreshBriefs(items, DEFAULT_FRESHNESS_DAYS).slice(0, limit);
}

export async function getHomepageBriefLayout() {
  const data = await fetchBriefsJson<HomeResponse>(
    `${BRIEFS_API_BASE}/home?limit=12`,
    900
  );

  if (data?.success) {
    return {
      hero: data.hero && isBriefFresh(data.hero, DEFAULT_FRESHNESS_DAYS) ? data.hero : null,
      featured: filterFreshBriefs(data.featured ?? [], DEFAULT_FRESHNESS_DAYS).slice(0, 3),
      compact: filterFreshBriefs(data.compact ?? [], DEFAULT_FRESHNESS_DAYS).slice(0, 8),
    };
  }

  const { items } = await getFeedBriefs({
    limit: 18,
    offset: 0,
  });

  const freshItems = filterFreshBriefs(items, DEFAULT_FRESHNESS_DAYS);
  return {
    hero: freshItems[0] ?? null,
    featured: freshItems.slice(1, 4),
    compact: freshItems.slice(4, 12),
  };
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

export function hasValidBriefImage(brief: Brief) {
  if (!brief.image_url) {
    return false;
  }

  const imageUrl = brief.image_url.trim().toLowerCase();
  if (!imageUrl.startsWith("http://") && !imageUrl.startsWith("https://")) {
    return false;
  }

  if (imageUrl.includes("youtube.com/embed") || imageUrl.includes("youtu.be/")) {
    return false;
  }

  return true;
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
