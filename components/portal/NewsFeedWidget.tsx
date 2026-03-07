"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { NewsItem } from "@/lib/newsFeed";
import type { NewsCategory } from "@/lib/newsSources";

const CATEGORY_ACTIONS: Record<
  NewsCategory,
  { label: string; href: (locale: string) => string; accent: string }
> = {
  "Faith & Practice": {
    label: "Keep learning",
    href: (locale) => `/${locale}/learn`,
    accent: "bg-[#F5E7C2] text-[#5B3E12]",
  },
  "Family & Education": {
    label: "Open duas",
    href: (locale) => `/${locale}/learn/duas`,
    accent: "bg-[#E1F0EA] text-[#145C43]",
  },
  "Halal Living": {
    label: "Check halal answers",
    href: (locale) => `/${locale}/is-it-halal`,
    accent: "bg-[#E6F0D8] text-[#456123]",
  },
  "Islamic Finance": {
    label: "Visit finance hub",
    href: (locale) => `/${locale}/finance`,
    accent: "bg-[#E7E1F8] text-[#49317A]",
  },
  "Health & Wellness": {
    label: "Read daily guidance",
    href: (locale) => `/${locale}/learn`,
    accent: "bg-[#DDF2F1] text-[#0E5A58]",
  },
  "Ummah & World": {
    label: "Open full news hub",
    href: (locale) => `/${locale}/blog`,
    accent: "bg-[#F6E0DB] text-[#7C3E30]",
  },
};

const BRIEFING_CATEGORY_ORDER: NewsCategory[] = [
  "Faith & Practice",
  "Halal Living",
  "Islamic Finance",
  "Family & Education",
  "Health & Wellness",
  "Ummah & World",
];

const LEAD_CATEGORY_PRIORITY: NewsCategory[] = [
  "Faith & Practice",
  "Halal Living",
  "Family & Education",
  "Islamic Finance",
  "Health & Wellness",
  "Ummah & World",
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

function timeAgo(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 3600) {
    return `${Math.max(1, Math.floor(diffInSeconds / 60))} mins ago`;
  }

  if (diffInSeconds < 86400) {
    return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  }

  return `${Math.floor(diffInSeconds / 86400)} days ago`;
}

function buildBriefing(news: NewsItem[]) {
  if (news.length === 0) {
    return { leadStory: null, briefingCards: [] as NewsItem[] };
  }

  const leadStory =
    LEAD_CATEGORY_PRIORITY.flatMap((category) =>
      news.filter(
        (item) =>
          item.categories.includes(category) &&
          !HEAVY_HEADLINE_KEYWORDS.some((keyword) =>
            `${item.title} ${item.excerpt}`.toLowerCase().includes(keyword)
          )
      )
    )[0] || news[0];
  const usedIds = new Set<string>([leadStory.id]);
  const briefingCards: NewsItem[] = [];

  for (const category of BRIEFING_CATEGORY_ORDER) {
    const match = news.find(
      (item) => !usedIds.has(item.id) && item.categories.includes(category)
    );

    if (!match) {
      continue;
    }

    briefingCards.push(match);
    usedIds.add(match.id);

    if (briefingCards.length === 4) {
      break;
    }
  }

  if (briefingCards.length < 4) {
    for (const item of news) {
      if (briefingCards.length === 4) {
        break;
      }

      if (!usedIds.has(item.id)) {
        briefingCards.push(item);
        usedIds.add(item.id);
      }
    }
  }

  return { leadStory, briefingCards };
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
        const res = await fetch(`/api/news?safeOnly=true&limit=8&_t=${Date.now()}`);
        const json = await res.json();

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

  const { leadStory, briefingCards } = buildBriefing(news);

  return (
    <div className="bg-white rounded-[2rem] p-8 h-full shadow-card border border-border flex flex-col">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[11px] font-bold uppercase tracking-[0.18em] mb-3">
            Muslim Briefing
          </div>
          <h3 className="text-2xl md:text-3xl font-bold font-display text-text-primary mb-2">
            What matters today, and where to go next.
          </h3>
          <p className="text-text-secondary text-sm md:text-base max-w-2xl">
            Start with one lead story, then move into the part of AllHalal that helps you act on it.
          </p>
        </div>
        <Link
          href={`/${locale}/blog`}
          className="text-primary font-bold text-sm hover:underline shrink-0"
        >
          Open news hub &rarr;
        </Link>
      </div>

      <div className="flex-1 flex flex-col gap-6">
        {loading ? (
          <div className="animate-pulse space-y-6">
            <div className="w-full h-56 rounded-[1.75rem] bg-gray-200" />
            <div className="grid md:grid-cols-2 gap-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="rounded-[1.5rem] border border-border bg-bg-secondary/50 p-5"
                >
                  <div className="h-3 bg-gray-200 rounded w-1/4 mb-4" />
                  <div className="h-5 bg-gray-200 rounded w-4/5 mb-3" />
                  <div className="h-4 bg-gray-200 rounded w-full mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-2/3" />
                </div>
              ))}
            </div>
          </div>
        ) : leadStory ? (
          <>
            <a
              href={leadStory.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block relative rounded-[1.75rem] overflow-hidden shadow-sm"
            >
              <div className="aspect-[1.9/1] w-full bg-neutral-100 relative">
                {leadStory.imageUrl ? (
                  <Image
                    src={leadStory.imageUrl}
                    alt={leadStory.title}
                    fill
                    unoptimized
                    sizes="(max-width: 1024px) 100vw, 70vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div
                    className={`w-full h-full bg-gradient-to-br ${
                      leadStory.fallbackGradient || "from-gray-700 to-gray-900"
                    } flex items-center justify-center`}
                  >
                    <span className="text-6xl text-white/20 font-display font-black">
                      {leadStory.sourceName.charAt(0)}
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
              </div>

              <div className="absolute inset-0 p-6 flex flex-col justify-between">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.16em] bg-white/15 text-white backdrop-blur-sm border border-white/20">
                    Today&apos;s lead
                  </span>
                  {leadStory.categories?.[0] && (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.16em] bg-accent-yellow text-black">
                      {leadStory.categories[0]}
                    </span>
                  )}
                </div>

                <div className="max-w-3xl">
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <span className="text-xs font-bold text-white/90 drop-shadow-md">
                      {leadStory.sourceName}
                    </span>
                    <span className="text-xs text-white/70">• {timeAgo(leadStory.publishedAt)}</span>
                  </div>
                  <h4 className="font-bold text-white text-2xl md:text-3xl leading-tight drop-shadow-md group-hover:text-accent-yellow transition-colors line-clamp-3 mb-3">
                    {leadStory.title}
                  </h4>
                  <p className="text-sm md:text-base text-white/80 leading-relaxed max-w-2xl line-clamp-2">
                    {leadStory.excerpt}
                  </p>
                </div>
              </div>
            </a>

            <div className="grid md:grid-cols-2 gap-4">
              {briefingCards.map((item) => {
                const primaryCategory = item.categories[0] || "Faith & Practice";
                const action = CATEGORY_ACTIONS[primaryCategory];

                return (
                  <div
                    key={item.id}
                    className="rounded-[1.5rem] border border-border bg-bg-secondary/50 p-5 flex flex-col gap-4"
                  >
                    <div className="flex items-center justify-between gap-3 flex-wrap">
                      <span className="px-2.5 py-1 rounded-full bg-white text-[10px] font-bold uppercase tracking-[0.16em] text-text-secondary border border-border">
                        {primaryCategory}
                      </span>
                      <span className="text-[11px] text-text-muted">
                        {item.sourceName} • {timeAgo(item.publishedAt)}
                      </span>
                    </div>

                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group"
                    >
                      <h4 className="font-bold text-text-primary text-lg leading-snug group-hover:text-primary transition-colors line-clamp-3 mb-2">
                        {item.title}
                      </h4>
                      <p className="text-sm text-text-secondary leading-relaxed line-clamp-3">
                        {item.excerpt}
                      </p>
                    </a>

                    <div className="flex items-center justify-between gap-3 flex-wrap mt-auto">
                      <Link
                        href={action.href(locale)}
                        className={`px-3 py-2 rounded-full text-xs font-bold ${action.accent}`}
                      >
                        {action.label}
                      </Link>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-bold text-primary"
                      >
                        Read story →
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="rounded-[1.5rem] border border-border bg-gradient-to-r from-[#163847] via-[#224B5C] to-[#2C5A6E] text-white p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/70 mb-2">
                  Why this block exists
                </div>
                <p className="text-sm md:text-base text-white/85 max-w-2xl leading-relaxed">
                  AllHalal should not just tell Muslims what happened. It should help them move from headlines into halal choices, worship, learning and finance decisions.
                </p>
              </div>
              <Link
                href={`/${locale}/blog`}
                className="px-4 py-3 rounded-full bg-white text-[#183645] font-bold text-sm shrink-0"
              >
                See the full news hub
              </Link>
            </div>
          </>
        ) : (
          <div className="rounded-[1.5rem] border border-border bg-bg-secondary/50 p-8 text-center">
            <div className="text-sm font-bold uppercase tracking-[0.18em] text-primary mb-3">
              Briefing unavailable
            </div>
            <div className="text-text-muted mb-5">
              No trusted-source updates are available right now.
            </div>
            <Link href={`/${locale}/blog`} className="text-sm font-bold text-primary">
              Open the news hub →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
