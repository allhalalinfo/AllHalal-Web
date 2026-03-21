"use client";

import { useState } from "react";
import { hasValidBriefImage } from "@/lib/briefs";
import type { Brief } from "@/types/brief";

function BriefMediaPlaceholder({ brief }: { brief: Brief }) {
  const sourceName = brief.sources[0]?.name || brief.primary_source || "Muslim Brief";
  const placeholderInitials = sourceName
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("") || "MB";

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at top left, rgba(244,185,66,0.22), transparent 34%), radial-gradient(circle at 85% 20%, rgba(46,75,89,0.18), transparent 28%), linear-gradient(145deg, rgba(241,235,226,0.96), rgba(255,255,255,0.98) 58%, rgba(228,221,211,0.92))",
        }}
      />
      <div className="absolute inset-x-0 bottom-0 h-20 bg-[linear-gradient(180deg,rgba(255,255,255,0),rgba(36,31,27,0.18))]" />
      <div className="absolute left-3 top-3 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/60 bg-white/72 text-sm font-black tracking-[0.14em] text-[#28414C] shadow-[0_10px_24px_rgba(36,31,27,0.08)]">
        {placeholderInitials}
      </div>
      <div className="absolute inset-x-3 bottom-3 rounded-2xl border border-white/55 bg-white/70 px-3 py-2 shadow-[0_10px_24px_rgba(36,31,27,0.08)]">
        <div className="text-[0.62rem] font-bold uppercase tracking-[0.22em] text-[#7B674F]">
          {brief.category}
        </div>
        <div className="mt-1 line-clamp-1 text-[0.78rem] font-semibold text-[#28414C]">
          {sourceName}
        </div>
      </div>
    </div>
  );
}

export default function BriefMediaClient({
  brief,
  sizes,
  priority = false,
  className,
}: {
  brief: Brief;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  const [hasImageError, setHasImageError] = useState(false);
  /** After proxy fails, try loading the original URL in the browser (last resort). */
  const [fallbackToDirect, setFallbackToDirect] = useState(false);

  if (hasValidBriefImage(brief) && brief.image_url && !hasImageError) {
    // Proxy first: CDNs often block hotlinking in the browser but allow server-side fetch.
    const isExternalHttp =
      brief.image_url.startsWith("https://") || brief.image_url.startsWith("http://");
    const proxiedSrc = `/api/image-proxy?url=${encodeURIComponent(brief.image_url)}`;
    const imageUrl = isExternalHttp && !fallbackToDirect ? proxiedSrc : brief.image_url;

    return (
      <>
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at top left, rgba(244,185,66,0.14), transparent 34%), linear-gradient(145deg, rgba(241,235,226,0.86), rgba(255,255,255,0.92) 58%, rgba(228,221,211,0.84))",
          }}
        />
        <img
          key={fallbackToDirect ? "direct" : "proxy"}
          src={imageUrl}
          alt={brief.title}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={priority ? "high" : "auto"}
          sizes={sizes}
          referrerPolicy="no-referrer"
          className={`absolute inset-0 block h-full w-full min-w-0 object-cover object-center ${className ?? ""}`}
          style={{
            width: "100%",
            maxWidth: "100%",
          }}
          onError={() => {
            if (isExternalHttp && !fallbackToDirect) {
              setFallbackToDirect(true);
            } else {
              setHasImageError(true);
            }
          }}
        />
      </>
    );
  }

  return <BriefMediaPlaceholder brief={brief} />;
}
