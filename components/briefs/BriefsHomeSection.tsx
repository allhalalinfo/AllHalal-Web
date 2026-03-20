import React from "react";
import {
  formatTimeAgo,
  getBriefDisplayTimestamp,
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
  const [useProxy, setUseProxy] = React.useState(false);

  // Determine image URL (direct or through proxy)
  const isPexels = brief.image_url?.includes("pexels.com");
  const shouldUseProxy = useProxy && isPexels && brief.image_url;
  const imageSrc = shouldUseProxy
    ? `/api/image-proxy?url=${encodeURIComponent(brief.image_url!)}`
    : brief.image_url;

  return (
    <a
      href={sourceUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full flex-col rounded-[1.55rem] border border-[rgba(47,37,30,0.08)] bg-white/88 p-3 shadow-[0_12px_30px_rgba(43,34,24,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_18px_46px_rgba(43,34,24,0.06)] sm:p-4"
    >
      <div className="relative aspect-[1.7/1] overflow-hidden rounded-[1.2rem] border border-[rgba(47,37,30,0.08)] bg-[rgba(242,237,228,0.65)]">
        {brief.image_url && sanitizeBriefImageUrl(brief.image_url) && !imageError && imageSrc ? (
          <img
            src={imageSrc}
            alt={brief.title}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            fetchPriority={priority ? "high" : "auto"}
            className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
            onError={() => {
              if (!useProxy && isPexels) {
                // Retry with proxy for Pexels
                setUseProxy(true);
              } else {
                setImageError(true);
              }
            }}
          />
        ) : (
          <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(241,235,226,0.96),rgba(255,255,255,0.98)_58%,rgba(228,221,211,0.92))]" />
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

        <p className="mt-2 line-clamp-4 text-[0.9rem] leading-relaxed text-text-secondary">
          {brief.summary || brief.dek}
        </p>
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

  if (!hero) {
    return null;
  }

  // Combine all stories and sort by date (newest first)
  const allStories = [hero, ...featured, ...compact].filter(
    (brief, index, stories) => stories.findIndex((story) => story.id === brief.id) === index,
  );

  // Sort by published_at date (newest first)
  const gridStories = allStories.sort((a, b) => {
    const dateA = new Date(a.published_at || 0).getTime();
    const dateB = new Date(b.published_at || 0).getTime();
    return dateB - dateA; // Descending (newest first)
  });

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

      {gridStories.length ? (
        <div className="mt-6 grid gap-3 sm:mt-8 sm:gap-4 md:grid-cols-2 xl:grid-cols-4">
          {gridStories.map((brief, index) => (
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
