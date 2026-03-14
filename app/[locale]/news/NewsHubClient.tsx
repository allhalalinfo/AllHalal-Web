"use client";

/* eslint-disable @next/next/no-img-element */

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  CircleDollarSign,
  Globe2,
  HeartPulse,
  Landmark,
  Sparkles,
} from "lucide-react";
import AdSlot from "@/components/ads/AdSlot";
import type { NewsCategory } from "@/lib/newsSources";
import type { NewsItem } from "@/lib/newsFeed";

type CategoryIcon = "landmark" | "book" | "sparkles" | "dollar" | "heart" | "globe";

const FILTERS = [
  { id: "all", label: "Latest", eyebrow: "All signals" },
  { id: "Faith & Practice", label: "Faith", eyebrow: "Practice and worship" },
  { id: "Family & Education", label: "Family", eyebrow: "Home and learning" },
  { id: "Halal Living", label: "Halal Living", eyebrow: "Daily Muslim life" },
  { id: "Islamic Finance", label: "Finance", eyebrow: "Money and ethics" },
  { id: "Health & Wellness", label: "Wellness", eyebrow: "Mind and body" },
  { id: "Ummah & World", label: "Ummah & World", eyebrow: "Communities and current affairs" },
] as const;

const CATEGORY_META: Record<
  NewsCategory,
  {
    icon: CategoryIcon;
    fallbackIcon: string;
    accent: string;
    chip: string;
    panel: string;
  }
> = {
  "Faith & Practice": {
    icon: "landmark",
    fallbackIcon: "🕌",
    accent: "from-[#b88b47]/25 via-[#8f6a39]/8 to-transparent",
    chip: "bg-[rgba(184,139,71,0.14)] text-[#94662b]",
    panel: "from-[#f6ead8] via-[#f8f4ee] to-[#fffdf8]",
  },
  "Family & Education": {
    icon: "book",
    fallbackIcon: "📚",
    accent: "from-[#758fc4]/22 via-[#5d78a8]/6 to-transparent",
    chip: "bg-[rgba(98,122,180,0.14)] text-[#456090]",
    panel: "from-[#edf2fb] via-[#f6f8fc] to-[#fffefe]",
  },
  "Halal Living": {
    icon: "sparkles",
    fallbackIcon: "✓",
    accent: "from-[#79a35a]/22 via-[#6e9256]/6 to-transparent",
    chip: "bg-[rgba(121,163,90,0.14)] text-[#4e7432]",
    panel: "from-[#edf4e5] via-[#f7faef] to-[#fffef9]",
  },
  "Islamic Finance": {
    icon: "dollar",
    fallbackIcon: "💰",
    accent: "from-[#4f8a89]/24 via-[#355d62]/7 to-transparent",
    chip: "bg-[rgba(79,138,137,0.16)] text-[#2d6665]",
    panel: "from-[#e6f0ef] via-[#f4f8f8] to-[#fffefe]",
  },
  "Health & Wellness": {
    icon: "heart",
    fallbackIcon: "✦",
    accent: "from-[#d07d7c]/20 via-[#c5696d]/6 to-transparent",
    chip: "bg-[rgba(208,125,124,0.14)] text-[#a55057]",
    panel: "from-[#f8eaea] via-[#fcf5f5] to-[#fffefe]",
  },
  "Ummah & World": {
    icon: "globe",
    fallbackIcon: "🌍",
    accent: "from-[#4e7086]/22 via-[#355164]/6 to-transparent",
    chip: "bg-[rgba(78,112,134,0.14)] text-[#36576c]",
    panel: "from-[#e8eef3] via-[#f6f9fb] to-[#fffefe]",
  },
};

type FilterId = (typeof FILTERS)[number]["id"];

function getPrimaryCategory(item: NewsItem): NewsCategory {
  return (item.categories?.[0] || "Faith & Practice") as NewsCategory;
}

function getCategoryMeta(category: string | undefined) {
  if (category && category in CATEGORY_META) {
    return CATEGORY_META[category as NewsCategory];
  }

  return CATEGORY_META["Faith & Practice"];
}

function CategoryIconGlyph({
  icon,
  className,
}: {
  icon: CategoryIcon;
  className?: string;
}) {
  switch (icon) {
    case "landmark":
      return <Landmark className={className} />;
    case "book":
      return <BookOpen className={className} />;
    case "sparkles":
      return <Sparkles className={className} />;
    case "dollar":
      return <CircleDollarSign className={className} />;
    case "heart":
      return <HeartPulse className={className} />;
    case "globe":
      return <Globe2 className={className} />;
    default:
      return <Landmark className={className} />;
  }
}

function formatRelativeTime(dateString: string) {
  const timestamp = new Date(dateString).getTime();

  if (Number.isNaN(timestamp)) {
    return "Fresh";
  }

  const diffInSeconds = Math.max(0, Math.floor((Date.now() - timestamp) / 1000));

  if (diffInSeconds < 3600) {
    return `${Math.max(1, Math.floor(diffInSeconds / 60))}m ago`;
  }

  if (diffInSeconds < 86400) {
    return `${Math.floor(diffInSeconds / 3600)}h ago`;
  }

  return `${Math.floor(diffInSeconds / 86400)}d ago`;
}

function getCardSpan(index: number) {
  const pattern = [
    "xl:col-span-7",
    "xl:col-span-5",
    "xl:col-span-4",
    "xl:col-span-4",
    "xl:col-span-4",
    "xl:col-span-8",
    "xl:col-span-4",
  ];

  return pattern[index % pattern.length];
}

function NewsVisual({
  item,
  large = false,
}: {
  item: NewsItem;
  large?: boolean;
}) {
  const category = getPrimaryCategory(item);
  const meta = getCategoryMeta(category);

  if (item.imageUrl) {
    return (
      <div className={`relative overflow-hidden ${large ? "h-72 md:h-80" : "h-48 md:h-52"}`}>
        <img
          src={item.imageUrl}
          alt={item.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,19,24,0.06),rgba(13,19,24,0.18),rgba(13,19,24,0.62))]" />
        <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/20 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-white/88 backdrop-blur-md">
          <span>{meta.fallbackIcon}</span>
          {category}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br ${meta.panel} ${large ? "h-72 md:h-80" : "h-48 md:h-52"}`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${meta.accent}`} />
      <div className="absolute -right-10 top-4 h-32 w-32 rounded-full bg-white/40 blur-3xl" />
      <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-[rgba(47,37,30,0.08)] bg-white/78 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-text-secondary">
        <span>{meta.fallbackIcon}</span>
        {category}
      </div>
      <div className="absolute bottom-5 left-5 right-5">
          <div className="flex items-end justify-between gap-4">
            <div className="text-[2.8rem] font-black leading-none text-text-primary/90 md:text-[3.4rem]">
              {meta.fallbackIcon}
            </div>
            <div className="rounded-full bg-white/78 p-3 text-primary shadow-[0_12px_24px_rgba(43,34,24,0.06)]">
              <CategoryIconGlyph icon={meta.icon} className="h-5 w-5" />
            </div>
          </div>
        </div>
      </div>
  );
}

function StoryCard({
  item,
  variant = "standard",
}: {
  item: NewsItem;
  variant?: "feature" | "highlight" | "standard";
}) {
  const category = getPrimaryCategory(item);
  const meta = getCategoryMeta(category);
  const isFeature = variant === "feature";
  const isHighlight = variant === "highlight";

  return (
    <motion.a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
      className={`group relative overflow-hidden rounded-[1.85rem] border border-[rgba(47,37,30,0.08)] bg-white/88 shadow-[0_20px_54px_rgba(43,34,24,0.07)] transition-shadow duration-300 hover:shadow-[0_28px_72px_rgba(43,34,24,0.12)] ${
        isFeature ? "xl:col-span-7" : isHighlight ? "h-full" : ""
      }`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.18),transparent_42%,transparent_72%,rgba(255,255,255,0.14))]" />

      <NewsVisual item={item} large={isFeature} />

      <div className={`relative p-5 ${isFeature ? "md:p-6" : ""}`}>
        <div className="flex flex-wrap items-center gap-2 text-[0.72rem] font-semibold text-text-muted">
          <span className={`rounded-full px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.18em] ${meta.chip}`}>
            {category}
          </span>
          <span>{item.sourceName}</span>
          <span className="h-1 w-1 rounded-full bg-text-muted/50" />
          <span>{formatRelativeTime(item.publishedAt)}</span>
        </div>

        <h3
          className={`mt-4 font-bold leading-tight text-text-primary transition-colors duration-300 group-hover:text-primary ${
            isFeature ? "text-[1.95rem] font-display md:text-[2.35rem]" : "text-[1.45rem] font-display"
          }`}
        >
          {item.title}
        </h3>

        <p
          className={`mt-3 text-text-secondary ${
            isFeature ? "max-w-3xl text-base leading-relaxed md:text-lg" : "text-sm leading-relaxed"
          } ${isFeature ? "line-clamp-3" : "line-clamp-4"}`}
        >
          {item.excerpt}
        </p>

        <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
          Read source
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>
    </motion.a>
  );
}

function StreamCard({
  item,
  index,
}: {
  item: NewsItem;
  index: number;
}) {
  const category = getPrimaryCategory(item);
  const meta = getCategoryMeta(category);
  const spanClass = getCardSpan(index);
  const hasImage = Boolean(item.imageUrl);

  return (
    <motion.a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.16 }}
      className={`group relative overflow-hidden rounded-[1.75rem] border border-[rgba(47,37,30,0.08)] bg-white/84 shadow-[0_18px_46px_rgba(43,34,24,0.06)] transition-shadow duration-300 hover:shadow-[0_24px_60px_rgba(43,34,24,0.1)] ${spanClass}`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(140deg,rgba(255,255,255,0.16),transparent_45%,transparent_72%,rgba(255,255,255,0.14))]" />

      {hasImage ? (
        <div className="relative h-44 overflow-hidden">
          <img
            src={item.imageUrl || ""}
            alt={item.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,19,24,0.06),rgba(13,19,24,0.24),rgba(13,19,24,0.56))]" />
          <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/20 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-white/88 backdrop-blur-md">
            <span>{meta.fallbackIcon}</span>
            {category}
          </div>
        </div>
      ) : (
        <div className={`relative h-36 overflow-hidden bg-gradient-to-br ${meta.panel}`}>
          <div className={`absolute inset-0 bg-gradient-to-br ${meta.accent}`} />
          <div className="absolute -right-8 top-3 h-24 w-24 rounded-full bg-white/40 blur-3xl" />
          <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-[rgba(47,37,30,0.08)] bg-white/78 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-text-secondary">
            <span>{meta.fallbackIcon}</span>
            {category}
          </div>
          <div className="absolute bottom-4 right-4 text-[2rem] font-black text-text-primary/80">
            {meta.fallbackIcon}
          </div>
        </div>
      )}

      <div className="relative p-5">
        <div className="flex flex-wrap items-center gap-2 text-[0.72rem] font-semibold text-text-muted">
          <span>{item.sourceName}</span>
          <span className="h-1 w-1 rounded-full bg-text-muted/50" />
          <span>{formatRelativeTime(item.publishedAt)}</span>
        </div>

        <h3 className="mt-3 text-[1.35rem] font-bold font-display leading-tight text-text-primary transition-colors duration-300 group-hover:text-primary">
          {item.title}
        </h3>

        <p className="mt-3 text-sm leading-relaxed text-text-secondary line-clamp-4">{item.excerpt}</p>

        <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
          Open source article
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>
    </motion.a>
  );
}

export default function NewsHubClient({ initialNews }: { initialNews: NewsItem[] }) {
  const [activeFilter, setActiveFilter] = useState<FilterId>("all");
  const [news, setNews] = useState<NewsItem[]>(initialNews);
  const [loading, setLoading] = useState(initialNews.length === 0);

  useEffect(() => {
    let ignore = false;

    if (activeFilter === "all" && initialNews.length > 0) {
      setNews(initialNews);
      setLoading(false);
      return () => {
        ignore = true;
      };
    }

    const fetchNews = async () => {
      setLoading(true);

      try {
        const params = new URLSearchParams({
          limit: "24",
          _t: String(Date.now()),
        });

        if (activeFilter !== "all") {
          params.set("category", activeFilter);
        }

        const res = await fetch(`/api/news?${params.toString()}`);
        const json = await res.json();

        if (!ignore && json.status === "success") {
          setNews(json.data || []);
        }
      } catch (error) {
        if (!ignore) {
          setNews([]);
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
  }, [activeFilter, initialNews]);

  const featuredStory = news[0];
  const highlightStories = news.slice(1, 3);
  const streamStories = news.slice(3);
  const currentFilterMeta = FILTERS.find((filter) => filter.id === activeFilter) || FILTERS[0];

  return (
    <section className="rounded-[2.15rem] border border-[rgba(47,37,30,0.08)] bg-[linear-gradient(180deg,rgba(255,255,255,0.86),rgba(247,243,236,0.92))] p-6 shadow-[0_28px_80px_rgba(43,34,24,0.08)] md:p-8">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.22em] text-primary">
            Live Muslim News
          </p>
          <h2 className="max-w-4xl text-3xl font-bold font-display text-text-primary md:text-5xl">
            Follow trusted Muslim publications through a feed that finally has shape.
          </h2>
          <p className="mt-4 max-w-3xl leading-relaxed text-text-secondary">
            Switching categories reshapes the feed with featured stories, compact reads, image-first cards
            and rich fallbacks for text-only posts.
          </p>
        </div>
        <div className="max-w-sm rounded-[1.4rem] border border-[rgba(47,37,30,0.08)] bg-white/76 p-4 text-sm text-text-secondary shadow-[0_12px_30px_rgba(43,34,24,0.05)] backdrop-blur-md">
          <div className="text-[0.68rem] font-bold uppercase tracking-[0.22em] text-primary">
            {currentFilterMeta.eyebrow}
          </div>
          <div className="mt-2 leading-relaxed">
            Curated automatically for freshness, source quality and category balance.
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        {FILTERS.map((filter) => (
          <button
            key={filter.id}
            type="button"
            onClick={() => setActiveFilter(filter.id)}
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-300 ${
              activeFilter === filter.id
                ? "border-primary/30 bg-gradient-gold text-[#4A3319] shadow-[0_10px_24px_rgba(176,144,98,0.2)]"
                : "border-[rgba(47,37,30,0.08)] bg-white/76 text-text-primary hover:border-primary/30 hover:bg-white"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="mt-8 grid gap-4 xl:grid-cols-12">
          {Array.from({ length: 7 }).map((_, index) => (
            <motion.div
              key={index}
              animate={{ opacity: [0.5, 0.85, 0.5] }}
              transition={{ duration: 1.4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              className={`rounded-[1.75rem] border border-[rgba(47,37,30,0.08)] bg-white/72 p-5 ${getCardSpan(index)}`}
            >
              <div className="mb-4 h-40 rounded-[1.2rem] bg-[rgba(47,37,30,0.08)]" />
              <div className="mb-3 h-4 w-32 rounded-full bg-[rgba(47,37,30,0.08)]" />
              <div className="mb-2 h-7 w-4/5 rounded-full bg-[rgba(47,37,30,0.1)]" />
              <div className="mb-2 h-4 w-full rounded-full bg-[rgba(47,37,30,0.08)]" />
              <div className="h-4 w-3/4 rounded-full bg-[rgba(47,37,30,0.08)]" />
            </motion.div>
          ))}
        </div>
      ) : news.length > 0 ? (
        <>
          <div className="mt-8 grid gap-4 xl:grid-cols-12">
            {featuredStory ? <StoryCard item={featuredStory} variant="feature" /> : null}

            <div className="grid gap-4 xl:col-span-5">
              {highlightStories.map((item) => (
                <StoryCard key={item.id} item={item} variant="highlight" />
              ))}
            </div>
          </div>

          <div className="mt-4 grid gap-4 xl:grid-cols-12">
            {streamStories.map((item, index) => {
              const adAfter = index === 4 || index === 10;

              return (
                <div key={item.id} className={getCardSpan(index)}>
                  <StreamCard item={item} index={index} />
                  {adAfter ? (
                    <AdSlot
                      id={`news-inline-${index}`}
                      size={index === 4 ? "medium" : "banner"}
                      label={index === 4 ? "In-feed Sponsor Block" : "Native Break Placement"}
                      className="mt-4"
                    />
                  ) : null}
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div className="mt-8 rounded-[1.75rem] border border-[rgba(47,37,30,0.08)] bg-white/76 p-6 text-text-secondary">
          No articles are available right now for this category.
        </div>
      )}
    </section>
  );
}
