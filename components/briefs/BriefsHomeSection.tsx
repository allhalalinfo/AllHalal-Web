"use client";

import React, { useMemo, useState } from "react";
import BriefImagePlaceholder from "@/components/briefs/BriefImagePlaceholder";
import {
  briefHasEditorialImage,
  formatTimeAgo,
  getBriefCardBlurb,
  getBriefCardBlurbClassName,
  getBriefDisplayTimestamp,
  isStockLikeBrief,
  sanitizeBriefImageUrl,
  type HomepageBriefLayout,
} from "@/lib/briefs";
import type { Brief } from "@/types/brief";

function NewsGridCard({
  brief,
  locale,
  priority = false,
}: {
  brief: Brief;
  locale: string;
  priority?: boolean;
}) {
  const sourceUrl = brief.sources[0]?.url || "";
  const displayTimestamp = getBriefDisplayTimestamp(brief);
  const [imageError, setImageError] = React.useState(false);
  const [fallbackToDirect, setFallbackToDirect] = React.useState(false);

  const rawUrl = brief.image_url ?? "";
  const isExternalHttp =
    rawUrl.startsWith("https://") || rawUrl.startsWith("http://");
  const proxiedSrc = `/api/image-proxy?url=${encodeURIComponent(rawUrl)}`;
  const imageSrc =
    isExternalHttp && !fallbackToDirect ? proxiedSrc : brief.image_url;

  const canTryImage =
    Boolean(brief.image_url) &&
    Boolean(sanitizeBriefImageUrl(brief.image_url)) &&
    !isStockLikeBrief(brief) &&
    !imageError &&
    Boolean(imageSrc);

  return (
    <a
      href={sourceUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full flex-col rounded-[1.55rem] border border-[rgba(47,37,30,0.08)] bg-white/88 p-3 shadow-[0_12px_30px_rgba(43,34,24,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_18px_46px_rgba(43,34,24,0.06)] sm:p-4"
    >
      <div className="relative aspect-[1.7/1] overflow-hidden rounded-[1.2rem] border border-[rgba(47,37,30,0.08)] bg-[rgba(242,237,228,0.65)]">
        {canTryImage ? (
          <img
            key={fallbackToDirect ? "direct" : "proxy"}
            src={imageSrc!}
            alt={brief.title}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            fetchPriority={priority ? "high" : "auto"}
            referrerPolicy="no-referrer"
            className="absolute inset-0 h-full w-full min-w-0 object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
            style={{
              width: "100%",
              maxWidth: "100%",
            }}
            onError={() => {
              if (isExternalHttp && !fallbackToDirect) {
                setFallbackToDirect(true);
              } else {
                setImageError(true);
              }
            }}
          />
        ) : (
          <BriefImagePlaceholder brief={brief} />
        )}
      </div>

      <div className="mt-4">
        <div className="flex flex-wrap items-center gap-2 text-[0.78rem] text-text-muted">
          <span className="font-medium text-text-secondary">{brief.sources[0]?.name}</span>
          {displayTimestamp ? (
            <>
              <span aria-hidden="true">•</span>
              <time dateTime={displayTimestamp}>{formatTimeAgo(displayTimestamp)}</time>
            </>
          ) : null}
          {brief.source_count > 1 ? (
            <>
              <span aria-hidden="true">•</span>
              <span>{brief.source_count} sources</span>
            </>
          ) : null}
        </div>

        <h3 className="mt-2 line-clamp-3 text-[1.1rem] font-bold leading-tight text-text-primary transition-colors duration-300 group-hover:text-primary">
          {brief.title}
        </h3>

        <p className={getBriefCardBlurbClassName(brief)}>{getBriefCardBlurb(brief)}</p>
      </div>
    </a>
  );
}

export default function BriefsHomeSection({
  locale,
  layout,
}: {
  locale: string;
  layout: HomepageBriefLayout;
}) {
  const { hero, featured, compact } = layout;

  const gridStories = useMemo(() => {
    if (!hero) {
      return [];
    }
    const allStories = [hero, ...featured, ...compact].filter(
      (brief, index, stories) => stories.findIndex((story) => story.id === brief.id) === index,
    );
    return allStories.sort((a, b) => {
      const imgA = briefHasEditorialImage(a) ? 1 : 0;
      const imgB = briefHasEditorialImage(b) ? 1 : 0;
      if (imgB !== imgA) {
        return imgB - imgA;
      }
      const dateA = new Date(a.published_at || 0).getTime();
      const dateB = new Date(b.published_at || 0).getTime();
      return dateB - dateA;
    });
  }, [hero, featured, compact]);

  const categoryOptions = useMemo(() => {
    const names = new Set(gridStories.map((b) => b.category));
    return Array.from(names).sort();
  }, [gridStories]);

  const [activeCategory, setActiveCategory] = useState<string | "all">("all");
  const visibleStories =
    activeCategory === "all"
      ? gridStories
      : gridStories.filter((b) => b.category === activeCategory);

  if (!hero) {
    return null;
  }

  const newsPageUrl = `/${locale}/news`;

  return (
    <section className="rounded-[1.8rem] border border-[rgba(47,37,30,0.08)] bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(249,246,241,0.94))] p-3 shadow-[0_20px_56px_rgba(43,34,24,0.06)] sm:p-5 md:rounded-[2.4rem] md:p-8 md:shadow-[0_26px_72px_rgba(43,34,24,0.06)]">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-[clamp(2rem,8vw,4rem)] font-black font-display leading-[0.96] tracking-[-0.04em] text-text-primary">
            Muslim World Today
          </h2>
          <p className="mt-2 max-w-3xl text-[0.98rem] leading-relaxed text-text-secondary md:mt-3 md:text-lg">
            Short briefs from across faith, family and the wider Ummah.
          </p>
        </div>

        <a
          href={newsPageUrl}
          className="inline-flex w-full items-center justify-center rounded-full bg-[#173640] px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_44px_rgba(23,54,64,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#13303a] sm:w-auto"
        >
          Open news desk
        </a>
      </div>

      {categoryOptions.length > 0 ? (
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveCategory("all")}
            className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors ${
              activeCategory === "all"
                ? "border-[rgba(47,37,30,0.14)] bg-[#173640] text-white"
                : "border-[rgba(47,37,30,0.1)] bg-white/80 text-text-secondary hover:bg-white"
            }`}
          >
            All
          </button>
          {categoryOptions.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                activeCategory === cat
                  ? "border-[rgba(47,37,30,0.14)] bg-[#173640] text-white"
                  : "border-[rgba(47,37,30,0.1)] bg-white/80 text-text-secondary hover:bg-white"
              }`}
            >
              {cat}
            </button>
          ))}
          <a
            href={newsPageUrl}
            className="ml-1 text-xs font-semibold text-primary underline-offset-2 hover:underline"
          >
            Full desk
          </a>
        </div>
      ) : null}

      {visibleStories.length ? (
        <div className="mt-6 grid gap-3 sm:mt-8 sm:gap-4 md:grid-cols-2 xl:grid-cols-4">
          {visibleStories.map((brief, index) => (
            <NewsGridCard
              key={brief.id}
              brief={brief}
              locale={locale}
              priority={index < 4}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
}
