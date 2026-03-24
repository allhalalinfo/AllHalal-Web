"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { NewsItem } from "@/lib/newsFeed";
import type { NewsCategory } from "@/lib/newsSources";

type DashboardView = {
  leadStory: NewsItem | null;
  headlineStories: NewsItem[];
  streamStories: NewsItem[];
};

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
      headlineStories: [],
      streamStories: [],
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
      headlineStories: [],
      streamStories: [],
    };
  }

  const leadStory = pickLeadStory(feed);
  const usedIds = new Set<string>(leadStory ? [leadStory.id] : []);
  const headlineStories = pickDistinctSourceItems(feed, usedIds, 4, leadStory?.sourceId);
  const streamStories = pickDistinctSourceItems(feed, usedIds, 8, leadStory?.sourceId);
  return { leadStory, headlineStories, streamStories };
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
  sizes,
  className,
}: {
  item: NewsItem;
  sizes: string;
  className: string;
}) {
  const [hasImageError, setHasImageError] = useState(false);
  const imageUrl = hasUsableImage(item) ? item.imageUrl : null;

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
        }}
      />
    );
  }

  return (
    <div className="relative h-full w-full overflow-hidden bg-[linear-gradient(135deg,rgba(44,61,72,0.92),rgba(17,31,40,0.97))]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_22%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(0,0,0,0.24))]" />
    </div>
  );
}

function FeatureStoryCard({ item }: { item: NewsItem }) {
  const showImage = hasUsableImage(item);

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group block overflow-hidden rounded-[1.85rem] border border-border shadow-[0_22px_48px_rgba(17,27,36,0.18)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_58px_rgba(17,27,36,0.24)] ${
        showImage ? "bg-[#102432] text-white" : "bg-white text-text-primary"
      }`}
    >
      <div
        className={`${
          showImage ? "grid min-h-[20rem] md:min-h-[22rem] md:grid-cols-[1.08fr_0.92fr]" : "p-6 md:p-7"
        }`}
      >
        {showImage ? (
          <div className="relative min-h-[15rem]">
            <StoryImage
              item={item}
              sizes="(max-width: 768px) 100vw, 52vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        ) : null}

        <div className={`flex flex-col justify-between ${showImage ? "p-5 md:p-6" : ""}`}>
          <div>
            <div
              className={`mb-4 flex flex-wrap items-center gap-2 text-[0.78rem] ${
                showImage ? "text-white/72" : "text-text-muted"
              }`}
            >
              <span className={`font-semibold ${showImage ? "text-white/92" : "text-text-primary"}`}>
                {item.sourceName}
              </span>
              <span>&bull;</span>
              <span>{timeAgo(item.publishedAt)}</span>
            </div>

            <h3
              className={`font-display font-bold leading-[1.02] transition-colors duration-300 ${
                showImage
                  ? "text-[2rem] text-white group-hover:text-accent-yellow md:text-[2.7rem]"
                  : "text-[2rem] text-text-primary group-hover:text-primary md:text-[2.55rem]"
              }`}
            >
              {item.title}
            </h3>
          </div>

          <div className="mt-5">
            <p
              className={`max-w-2xl text-[0.98rem] leading-relaxed line-clamp-4 md:text-[1.02rem] ${
                showImage ? "text-white/78" : "text-text-secondary"
              }`}
            >
              {item.excerpt}
            </p>
          </div>
        </div>
      </div>
    </a>
  );
}

function HeadlineCard({ item }: { item: NewsItem }) {
  const showImage = hasUsableImage(item);

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group rounded-[1.35rem] border border-border bg-white/84 p-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/20 hover:bg-white hover:shadow-[0_14px_30px_rgba(43,34,24,0.08)] ${
        showImage ? "grid grid-cols-[88px_1fr] gap-4" : "block"
      }`}
    >
      {showImage ? (
        <div className="relative h-[88px] overflow-hidden rounded-[1rem] bg-[#f4efe7]">
          <StoryImage
            item={item}
            sizes="88px"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
      ) : null}

      <div className="min-w-0">
        <div className="mb-2 flex flex-wrap items-center gap-2 text-[11px] text-text-muted">
          <span className="font-medium">{item.sourceName}</span>
          <span>&bull;</span>
          <span>{timeAgo(item.publishedAt)}</span>
        </div>
        <h4 className="text-[1.15rem] font-bold leading-snug text-text-primary transition-colors duration-300 group-hover:text-primary line-clamp-3">
          {item.title}
        </h4>
      </div>
    </a>
  );
}

function StreamStoryCard({ item }: { item: NewsItem }) {
  const showImage = hasUsableImage(item);

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group rounded-[1.5rem] border border-border bg-white/84 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/20 hover:bg-white hover:shadow-[0_14px_28px_rgba(43,34,24,0.08)]"
    >
      <div className={`grid gap-4 ${showImage ? "grid-cols-[104px_1fr]" : "grid-cols-1"}`}>
        {showImage ? (
          <div className="relative h-[104px] overflow-hidden rounded-[1rem] bg-[#f4efe7]">
            <StoryImage
              item={item}
              sizes="104px"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        ) : null}

        <div className="min-w-0">
          <div className="mb-2 flex flex-wrap items-center gap-2 text-[11px] text-text-muted">
            <span className="font-medium">{item.sourceName}</span>
            <span>&bull;</span>
            <span>{timeAgo(item.publishedAt)}</span>
          </div>
          <h4 className="text-[1.2rem] font-bold leading-snug text-text-primary transition-colors duration-300 group-hover:text-primary line-clamp-3">
            {item.title}
          </h4>
          <p className="mt-2 text-sm leading-relaxed text-text-secondary line-clamp-3">
            {item.excerpt}
          </p>
        </div>
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

  const { leadStory, headlineStories, streamStories } = buildDashboard(news);

  return (
    <section className="relative overflow-hidden rounded-[2.15rem] border border-border bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(243,239,232,0.94))] p-5 md:p-6 shadow-[0_20px_60px_rgba(48,40,29,0.12)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(244,185,66,0.15),transparent_26%),radial-gradient(circle_at_88%_12%,rgba(75,122,136,0.12),transparent_26%),linear-gradient(180deg,rgba(255,255,255,0.12),transparent_70%)]" />

      <div className="relative">
        <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="text-3xl font-display font-bold leading-tight text-text-primary md:text-4xl">
              Muslim World Today
            </h2>
          </div>

          <Link
            href={`/news`}
            className="inline-flex items-center justify-center rounded-full bg-[#17323E] px-5 py-3 text-sm font-bold text-white shadow-[0_14px_30px_rgba(23,50,62,0.24)] transition-transform hover:-translate-y-0.5 shrink-0"
          >
            Open news desk &rarr;
          </Link>
        </div>

        {loading ? (
          <div className="animate-pulse space-y-4">
            <div className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
              <div className="h-[24rem] rounded-[1.8rem] bg-gray-200" />
              <div className="space-y-3">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="h-[7rem] rounded-[1.35rem] bg-gray-200" />
                ))}
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="h-[9rem] rounded-[1.5rem] bg-gray-200" />
              ))}
            </div>
          </div>
        ) : leadStory ? (
          <div className="space-y-4">
            <div className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
              <FeatureStoryCard item={leadStory} />

              <div className="space-y-3">
                {headlineStories.map((item) => (
                  <HeadlineCard key={item.id} item={item} />
                ))}
              </div>
            </div>

            {streamStories.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {streamStories.map((item) => (
                  <StreamStoryCard key={item.id} item={item} />
                ))}
              </div>
            ) : null}
          </div>
        ) : (
          <div className="rounded-[1.5rem] border border-border bg-white/82 p-8 text-center">
            <div className="text-text-secondary mb-5">
              No trusted-source updates are available right now.
            </div>
            <Link href={`/news`} className="text-sm font-bold text-primary">
              Open news desk &rarr;
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
