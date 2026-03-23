"use client";

import React from "react";
import BriefImagePlaceholder from "@/components/briefs/BriefImagePlaceholder";
import {
  formatTimeAgo,
  getBriefCardBlurb,
  getBriefCardBlurbClassName,
  getBriefDisplayTimestamp,
  isStockLikeBrief,
  sanitizeBriefImageUrl,
} from "@/lib/briefs";
import { proxiedImageSrc } from "@/lib/proxiedImageUrl";
import type { Brief } from "@/types/brief";

export default function NewsGridCard({
  brief,
  priority = false,
}: {
  brief: Brief;
  /** Reserved for future in-app links; same prop shape as on the home grid. */
  locale?: string;
  priority?: boolean;
}) {
  const sourceUrl = brief.sources[0]?.url || "";
  const displayTimestamp = getBriefDisplayTimestamp(brief);
  const [imageError, setImageError] = React.useState(false);
  const [fallbackToDirect, setFallbackToDirect] = React.useState(false);

  const rawUrl = brief.image_url ?? "";
  const isExternalHttp =
    rawUrl.startsWith("https://") || rawUrl.startsWith("http://");
  const proxiedSrc = proxiedImageSrc(rawUrl);
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
