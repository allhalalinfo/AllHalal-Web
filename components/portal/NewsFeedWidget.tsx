"use client";

import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import type { NewsItem } from "@/lib/newsFeed";
import type { NewsCategory } from "@/lib/newsSources";

type DashboardLaneId =
  | "faith"
  | "ummah"
  | "finance"
  | "health"
  | "living"
  | "learning";

type DashboardLaneConfig = {
  id: DashboardLaneId;
  title: string;
  description: string;
  accentClass: string;
  primaryCategories: NewsCategory[];
  secondaryCategories?: NewsCategory[];
};

type DashboardLane = DashboardLaneConfig & {
  items: NewsItem[];
};

type DashboardLaneDraft = DashboardLane & {
  candidateItems: NewsItem[];
};

type DashboardView = {
  leadStory: NewsItem | null;
  radar: NewsItem[];
  lanes: DashboardLane[];
};

const DASHBOARD_LANES: DashboardLaneConfig[] = [
  {
    id: "faith",
    title: "Faith",
    description: "Quran, hadith, worship and practical religious guidance.",
    accentClass: "bg-[#F6E8C7] text-[#654418] border-[#E7D3A3]",
    primaryCategories: ["Faith & Practice"],
    secondaryCategories: ["Family & Education"],
  },
  {
    id: "ummah",
    title: "Ummah",
    description: "Signals from Muslim communities, institutions and society.",
    accentClass: "bg-[#F7E2DB] text-[#7B3F34] border-[#E8C0B4]",
    primaryCategories: ["Ummah & World"],
  },
  {
    id: "finance",
    title: "Finance",
    description: "Islamic banking, halal investing, zakat and market shifts.",
    accentClass: "bg-[#E3ECFB] text-[#244A7A] border-[#C5D7F3]",
    primaryCategories: ["Islamic Finance"],
  },
  {
    id: "health",
    title: "Health",
    description: "Mental wellbeing, healthy routines and Muslim lifestyle care.",
    accentClass: "bg-[#DDF2EE] text-[#13594C] border-[#B8E2D9]",
    primaryCategories: ["Health & Wellness"],
  },
  {
    id: "living",
    title: "Halal Living",
    description: "Everyday halal choices across food, products and routines.",
    accentClass: "bg-[#EAF1D8] text-[#476226] border-[#D3E1B3]",
    primaryCategories: ["Halal Living"],
  },
  {
    id: "learning",
    title: "Learning",
    description: "Books, education, family life and long-form Muslim learning.",
    accentClass: "bg-[#ECE7F8] text-[#4A3576] border-[#D7CDF2]",
    primaryCategories: ["Family & Education"],
    secondaryCategories: ["Faith & Practice"],
  },
];

const HEAVY_HEADLINE_KEYWORDS = [
  "assassination",
  "attack",
  "attacked",
  "killed",
  "killing",
  "dead",
  "missile",
  "bomb",
  "bombing",
  "war",
  "airstrike",
];

const FAST_SOURCE_IDS = new Set(["aljazeera_me", "islamicrelief"]);
const DEEP_READ_SOURCE_IDS = new Set(["muslimheritage"]);
const HOMEPAGE_PRIORITY_MAX_AGE_HOURS = 72;
const HOMEPAGE_FALLBACK_MAX_AGE_HOURS = 24 * 7;
const BAD_IMAGE_URL_PATTERNS = [
  /s\.w\.org\/images\/core\/emoji/i,
  /gravatar\.com/i,
  /\/emoji\//i,
  /\/avatar\//i,
  /\/icon\//i,
  /\/logo\//i,
  /\/logos\//i,
  /plugins\/islamic-graphics/i,
];
const CATEGORY_FALLBACK_STYLES: Record<string, CSSProperties> = {
  "Faith & Practice": {
    background:
      "linear-gradient(135deg, rgba(198,151,60,0.95), rgba(102,65,24,0.96))",
  },
  "Ummah & World": {
    background:
      "linear-gradient(135deg, rgba(171,88,63,0.95), rgba(101,44,34,0.96))",
  },
  "Islamic Finance": {
    background:
      "linear-gradient(135deg, rgba(67,115,187,0.95), rgba(24,58,109,0.96))",
  },
  "Health & Wellness": {
    background:
      "linear-gradient(135deg, rgba(39,146,127,0.95), rgba(14,78,72,0.96))",
  },
  "Halal Living": {
    background:
      "linear-gradient(135deg, rgba(120,157,55,0.95), rgba(67,96,23,0.96))",
  },
  "Family & Education": {
    background:
      "linear-gradient(135deg, rgba(122,89,184,0.95), rgba(68,46,122,0.96))",
  },
};

function timeAgo(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.max(0, Math.floor((now.getTime() - date.getTime()) / 1000));

  if (diffInSeconds < 3600) {
    return `${Math.max(1, Math.floor(diffInSeconds / 60))}m ago`;
  }

  if (diffInSeconds < 86400) {
    return `${Math.floor(diffInSeconds / 3600)}h ago`;
  }

  return `${Math.floor(diffInSeconds / 86400)}d ago`;
}

function getHoursSincePublished(item: NewsItem) {
  const publishedAt = new Date(item.publishedAt).getTime();
  if (Number.isNaN(publishedAt)) {
    return HOMEPAGE_FALLBACK_MAX_AGE_HOURS + 1;
  }

  return Math.max(0, (Date.now() - publishedAt) / 1000 / 60 / 60);
}

function hasUsableImage(item: NewsItem) {
  const imageUrl = item.imageUrl;

  if (!imageUrl) {
    return false;
  }

  return !BAD_IMAGE_URL_PATTERNS.some((pattern) => pattern.test(imageUrl));
}

function matchesCategories(item: NewsItem, categories: NewsCategory[]) {
  return categories.some((category) => item.categories.includes(category));
}

function isHeavyHeadline(item: NewsItem) {
  const combined = `${item.title} ${item.excerpt}`.toLowerCase();
  return HEAVY_HEADLINE_KEYWORDS.some((keyword) => combined.includes(keyword));
}

function getHomeScore(item: NewsItem) {
  const hours = getHoursSincePublished(item);
  let score = 0;

  if (hours <= 24) {
    score += 40;
  } else if (hours <= HOMEPAGE_PRIORITY_MAX_AGE_HOURS) {
    score += 24;
  } else if (hours <= HOMEPAGE_FALLBACK_MAX_AGE_HOURS) {
    score += 8;
  } else {
    score -= 1000;
  }

  if (FAST_SOURCE_IDS.has(item.sourceId)) {
    score += 18;
  }

  if (DEEP_READ_SOURCE_IDS.has(item.sourceId)) {
    score -= 8;
  }

  if (item.categories.includes("Ummah & World")) {
    score += 10;
  }

  if (item.categories.includes("Islamic Finance")) {
    score += 8;
  }

  if (hasUsableImage(item)) {
    score += 6;
  }

  return score;
}

function sortForHomepage(news: NewsItem[]) {
  return [...news].sort((a, b) => getHomeScore(b) - getHomeScore(a));
}

function pickLeadStory(news: NewsItem[]) {
  return news.find((item) => hasUsableImage(item)) || news[0] || null;
}

function pickDistinctSourceItems(
  candidates: NewsItem[],
  usedIds: Set<string>,
  count: number,
  preferredSourceId?: string
) {
  const picks: NewsItem[] = [];

  for (const item of candidates) {
    if (usedIds.has(item.id)) {
      continue;
    }

    if (preferredSourceId && item.sourceId === preferredSourceId && candidates.length > count) {
      continue;
    }

    if (picks.some((pick) => pick.sourceId === item.sourceId) && candidates.length > count) {
      continue;
    }

    picks.push(item);
    usedIds.add(item.id);

    if (picks.length === count) {
      return picks;
    }
  }

  for (const item of candidates) {
    if (usedIds.has(item.id)) {
      continue;
    }

    picks.push(item);
    usedIds.add(item.id);

    if (picks.length === count) {
      break;
    }
  }

  return picks;
}

function buildDashboard(news: NewsItem[]): DashboardView {
  if (news.length === 0) {
    return {
      leadStory: null,
      radar: [],
      lanes: DASHBOARD_LANES.map((lane) => ({ ...lane, items: [] })),
    };
  }

  const homepageCandidates = news.filter((item) => {
    return !isHeavyHeadline(item) && getHoursSincePublished(item) <= HOMEPAGE_FALLBACK_MAX_AGE_HOURS;
  });
  const freshCandidates = homepageCandidates.filter(
    (item) => getHoursSincePublished(item) <= HOMEPAGE_PRIORITY_MAX_AGE_HOURS
  );
  const feed = sortForHomepage(
    freshCandidates.length >= 8 ? freshCandidates : homepageCandidates
  );

  if (feed.length === 0) {
    return {
      leadStory: null,
      radar: [],
      lanes: DASHBOARD_LANES.map((lane) => ({ ...lane, items: [] })),
    };
  }

  const leadStory = pickLeadStory(feed);
  const usedIds = new Set<string>(leadStory ? [leadStory.id] : []);
  const laneCandidates: DashboardLaneDraft[] = DASHBOARD_LANES.map((lane) => {
    const candidateGroups = [
      lane.primaryCategories,
      ...(lane.secondaryCategories ? [lane.secondaryCategories] : []),
    ];
    const matchedCandidates: NewsItem[] = [];

    for (const categories of candidateGroups) {
      for (const item of feed) {
        if (
          !usedIds.has(item.id) &&
          matchesCategories(item, categories) &&
          !matchedCandidates.some((candidate) => candidate.id === item.id)
        ) {
          matchedCandidates.push(item);
        }
      }
    }

    return {
      ...lane,
      items: [],
      candidateItems: matchedCandidates,
    };
  });

  for (const lane of laneCandidates) {
    const firstItem = pickDistinctSourceItems(lane.candidateItems, usedIds, 1, leadStory?.sourceId);
    lane.items.push(...firstItem);
  }

  const radar = pickDistinctSourceItems(feed, usedIds, 3, leadStory?.sourceId);

  for (const lane of laneCandidates) {
    if (lane.items.length >= 2) {
      continue;
    }

    const additionalItems = pickDistinctSourceItems(
      lane.candidateItems,
      usedIds,
      2 - lane.items.length,
      leadStory?.sourceId
    );
    lane.items.push(...additionalItems);
  }

  const lanes = laneCandidates
    .map(({ candidateItems: _candidateItems, ...lane }) => lane)
    .filter((lane) => lane.items.length > 0);

  return { leadStory, radar, lanes };
}

async function readJsonResponse(response: Response) {
  const contentType = response.headers.get("content-type") || "";
  const bodyText = await response.text();

  if (!response.ok || !contentType.includes("application/json")) {
    throw new Error(
      `Expected JSON, got ${response.status} ${
        contentType || "unknown content type"
      }: ${bodyText.slice(0, 120)}`
    );
  }

  return JSON.parse(bodyText);
}

function StoryImage({
  item,
  label,
  sizes,
  className,
  onImageUnavailable,
}: {
  item: NewsItem;
  label: string;
  sizes: string;
  className: string;
  onImageUnavailable?: () => void;
}) {
  const [hasImageError, setHasImageError] = useState(false);
  const imageUrl = hasUsableImage(item) ? item.imageUrl : null;
  const fallbackStyle =
    CATEGORY_FALLBACK_STYLES[item.categories[0]] || {
      background:
        "linear-gradient(135deg, rgba(67,94,110,0.95), rgba(24,43,56,0.96))",
      backgroundColor: "rgb(24,43,56)",
    };

  if (imageUrl && !hasImageError) {
    return (
      <Image
        src={imageUrl}
        alt={item.title}
        fill
        unoptimized
        sizes={sizes}
        className={className}
        onError={() => {
          setHasImageError(true);
          onImageUnavailable?.();
        }}
      />
    );
  }

  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{ backgroundColor: "rgb(24,43,56)", ...fallbackStyle }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(0,0,0,0.12),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))]" />
    </div>
  );
}

function RadarStoryCard({ item }: { item: NewsItem }) {
  const [showImage, setShowImage] = useState(hasUsableImage(item));

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group rounded-[1.35rem] border border-border bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(246,241,234,0.92))] p-3.5 transition-all duration-300 hover:border-primary/25 hover:bg-white hover:shadow-lg hover:-translate-y-0.5 ${
        showImage ? "grid grid-cols-[88px_1fr] gap-4" : "block"
      }`}
    >
      {showImage ? (
        <div className="relative h-[88px] overflow-hidden rounded-[1rem] border border-border bg-white/60">
          <StoryImage
            item={item}
            label={item.categories[0] || "Update"}
            sizes="88px"
            className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
            onImageUnavailable={() => setShowImage(false)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      ) : null}
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-2 text-[11px] text-text-muted">
          <span className="font-bold uppercase tracking-[0.16em] text-primary transition-colors group-hover:text-primary/80">
            {item.categories[0]}
          </span>
          <span className="transition-opacity group-hover:opacity-60">{item.sourceName}</span>
          <span className="transition-opacity group-hover:opacity-60">&bull;</span>
          <span className="transition-opacity group-hover:opacity-60">{timeAgo(item.publishedAt)}</span>
        </div>
        <h4 className="text-lg font-bold text-text-primary leading-snug line-clamp-2 group-hover:text-primary transition-colors duration-300 mb-1.5">
          {item.title}
        </h4>
        <p className="text-sm text-text-secondary leading-relaxed line-clamp-2 group-hover:text-text-primary transition-colors duration-300">
          {item.excerpt}
        </p>
      </div>
    </a>
  );
}

function LaneStoryCard({
  item,
  laneTitle,
}: {
  item: NewsItem;
  laneTitle: string;
}) {
  const [showImage, setShowImage] = useState(hasUsableImage(item));

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group rounded-[1.25rem] border border-border bg-white/72 p-3 transition-all duration-300 hover:border-primary/25 hover:bg-white hover:shadow-md hover:-translate-y-0.5 ${
        showImage ? "grid grid-cols-[72px_1fr] gap-4" : "block"
      }`}
    >
      {showImage ? (
        <div className="relative h-[72px] overflow-hidden rounded-[0.95rem] border border-border bg-white/60">
          <StoryImage
            item={item}
            label={laneTitle}
            sizes="72px"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            onImageUnavailable={() => setShowImage(false)}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      ) : null}
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-1.5 text-[11px] text-text-muted">
          <span className="font-bold text-text-secondary group-hover:text-primary transition-colors">{item.sourceName}</span>
          <span className="transition-opacity group-hover:opacity-60">&bull;</span>
          <span className="transition-opacity group-hover:opacity-60">{timeAgo(item.publishedAt)}</span>
        </div>
        <h4 className="text-base font-bold leading-snug text-text-primary line-clamp-2 group-hover:text-primary transition-colors duration-300 mb-1">
          {item.title}
        </h4>
        <p className="text-sm text-text-secondary leading-relaxed line-clamp-2 group-hover:text-text-primary transition-colors duration-300">
          {item.excerpt}
        </p>
      </div>
    </a>
  );
}

export default function NewsFeedWidget({
  locale,
  initialNews,
}: {
  locale: string;
  initialNews?: NewsItem[];
}) {
  const seedNews = initialNews || [];
  const [news, setNews] = useState<NewsItem[]>(seedNews);
  const [loading, setLoading] = useState(seedNews.length === 0);

  useEffect(() => {
    let ignore = false;

    const fetchNews = async () => {
      try {
        const res = await fetch(`/api/news?limit=24&_t=${Date.now()}`);
        const json = await readJsonResponse(res);

        if (!ignore && json.status === "success") {
          setNews(json.data || []);
        }
      } catch (error) {
        if (!ignore) {
          console.error("Failed to fetch news:", error);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    fetchNews();

    return () => {
      ignore = true;
    };
  }, []);

  const { leadStory, radar, lanes } = buildDashboard(news);
  const activeLanes = lanes.filter((lane) => lane.items.length > 0);

  return (
    <section className="relative overflow-hidden rounded-[2.5rem] border border-border bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(243,239,232,0.94))] p-6 md:p-8 shadow-[0_20px_60px_rgba(48,40,29,0.12)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(244,185,66,0.16),transparent_26%),radial-gradient(circle_at_88%_12%,rgba(75,122,136,0.14),transparent_26%),linear-gradient(180deg,rgba(255,255,255,0.16),transparent_70%)]" />

      <div className="relative">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between mb-8">
          <div className="max-w-3xl">
            <h2 className="text-4xl md:text-5xl font-bold font-display text-text-primary mb-3 leading-tight">
              Muslim World Today
            </h2>
            <p className="text-base md:text-lg text-text-secondary leading-relaxed">
              Latest updates from the Muslim world: faith, society, finance, health,
              halal living and learning.
            </p>
          </div>

          <Link
            href={`/${locale}/blog`}
            className="inline-flex items-center justify-center rounded-full bg-[#17323E] px-5 py-3 text-sm font-bold text-white shadow-[0_14px_30px_rgba(23,50,62,0.24)] transition-transform hover:-translate-y-0.5 shrink-0"
          >
            Explore more &rarr;
          </Link>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {activeLanes.map((lane, index) => (
            <div
              key={lane.id}
              className={`inline-flex rounded-full border px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] transition-all duration-300 hover:scale-105 hover:shadow-md animate-in fade-in zoom-in-95 ${lane.accentClass}`}
              style={{
                animationDelay: `${index * 80}ms`,
                animationFillMode: 'backwards'
              }}
            >
              <span>{lane.title}</span>
            </div>
          ))}
        </div>

        {loading ? (
          <div className="animate-pulse space-y-5">
            <div className="grid gap-5 xl:grid-cols-[1.55fr_0.95fr]">
              <div className="h-[25rem] rounded-[2rem] bg-gray-200" />
              <div className="h-[25rem] rounded-[2rem] bg-gray-200" />
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="rounded-[1.75rem] border border-border bg-white/70 p-5">
                  <div className="h-4 w-24 rounded bg-gray-200 mb-3" />
                  <div className="h-4 w-full rounded bg-gray-200 mb-2" />
                  <div className="h-4 w-3/4 rounded bg-gray-200 mb-5" />
                  <div className="space-y-3">
                    <div className="h-20 rounded-[1rem] bg-gray-200" />
                    <div className="h-20 rounded-[1rem] bg-gray-200" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : leadStory ? (
          <div className="space-y-5">
            <div className="grid gap-5 xl:grid-cols-[1.55fr_0.95fr]">
              <a
                href={leadStory.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-[2rem] border border-border bg-[#102432] text-white shadow-[0_24px_52px_rgba(17,27,36,0.24)] transition-all duration-500 hover:shadow-[0_32px_64px_rgba(17,27,36,0.32)] hover:-translate-y-1"
              >
                <div className="relative aspect-[1.35/1] min-h-[26rem] w-full">
                  <StoryImage
                    item={leadStory}
                    label={leadStory.categories[0] || "Top story"}
                    sizes="(max-width: 1280px) 100vw, 70vw"
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,14,20,0.08),rgba(7,14,20,0.72)_62%,rgba(7,14,20,0.92))] transition-opacity duration-500 group-hover:opacity-90" />
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                  <div className="flex flex-wrap items-center gap-2 mb-4 transform transition-transform duration-300 group-hover:translate-x-1">
                    {leadStory.categories.slice(0, 2).map((category) => (
                      <span
                        key={category}
                        className="rounded-full bg-white/12 backdrop-blur-sm px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-white transition-all duration-300 group-hover:bg-white/20 group-hover:scale-105"
                      >
                        {category}
                      </span>
                    ))}
                  </div>

                  <div className="mb-4 flex flex-wrap items-center gap-2 text-sm text-white/72 transition-all duration-300 group-hover:text-white/90">
                    <span className="font-bold text-white/92">{leadStory.sourceName}</span>
                    <span>&bull;</span>
                    <span>{timeAgo(leadStory.publishedAt)}</span>
                  </div>

                  <h3 className="max-w-3xl text-3xl md:text-[2.7rem] font-bold font-display leading-tight mb-3 text-white group-hover:text-accent-yellow transition-all duration-500 transform group-hover:translate-x-1">
                    {leadStory.title}
                  </h3>
                  <p className="max-w-2xl text-base md:text-lg leading-relaxed text-white/78 line-clamp-3 transition-all duration-300 group-hover:text-white/90">
                    {leadStory.excerpt}
                  </p>
                  
                  <div className="mt-4 flex items-center gap-2 text-sm font-bold text-accent-yellow opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                    <span>Read full story</span>
                    <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </a>

              <div className="rounded-[2rem] border border-border bg-white/82 p-5 md:p-6 shadow-[0_16px_40px_rgba(48,40,29,0.08)]">
                <div className="flex items-center justify-between gap-3 mb-5">
                    <div>
                    <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary mb-2">
                      Fresh reads
                    </div>
                    <h3 className="text-2xl font-bold font-display text-text-primary">
                      What to open next.
                    </h3>
                  </div>
                </div>

                <div className="space-y-3">
                  {radar.map((item) => (
                    <RadarStoryCard key={item.id} item={item} />
                  ))}

                  {radar.length === 0 && (
                    <div className="rounded-[1.35rem] border border-dashed border-border bg-bg-secondary/50 p-5 text-sm text-text-secondary">
                      More live headlines will appear here as the feed refreshes.
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {activeLanes.map((lane, laneIndex) => (
                <div
                  key={lane.id}
                  className="rounded-[1.8rem] border border-border bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(245,240,232,0.92))] p-5 shadow-[0_12px_30px_rgba(48,40,29,0.06)] transition-all duration-500 hover:shadow-[0_20px_40px_rgba(48,40,29,0.12)] hover:-translate-y-1 animate-in fade-in slide-in-from-bottom-4"
                  style={{ 
                    animationDelay: `${laneIndex * 100}ms`,
                    animationFillMode: 'backwards'
                  }}
                >
                  <div className="flex items-start justify-between gap-3 mb-5">
                    <div>
                      <span
                        className={`inline-flex rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] transition-all duration-300 hover:scale-105 ${lane.accentClass}`}
                      >
                        {lane.title}
                      </span>
                      <p className="mt-3 text-sm text-text-secondary leading-relaxed">
                        {lane.description}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {lane.items.map((item, itemIndex) => (
                      <div
                        key={item.id}
                        className="animate-in fade-in slide-in-from-left-2"
                        style={{
                          animationDelay: `${(laneIndex * 100) + (itemIndex * 50) + 200}ms`,
                          animationFillMode: 'backwards'
                        }}
                      >
                        <LaneStoryCard item={item} laneTitle={lane.title} />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="rounded-[1.75rem] border border-border bg-white/82 p-8 text-center">
            <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary mb-3">
              Muslim World Today
            </div>
            <div className="text-text-secondary mb-5">
              No trusted-source updates are available right now.
            </div>
            <Link href={`/${locale}/blog`} className="text-sm font-bold text-primary">
              Explore Muslim World &rarr;
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
