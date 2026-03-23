"use client";

import { useState } from "react";
import BriefImagePlaceholder from "@/components/briefs/BriefImagePlaceholder";
import { hasValidBriefImage, isStockLikeBrief } from "@/lib/briefs";
import { proxiedImageSrc } from "@/lib/proxiedImageUrl";
import type { Brief } from "@/types/brief";

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

  const skipRemoteImage =
    !hasValidBriefImage(brief) || isStockLikeBrief(brief) || hasImageError;

  if (skipRemoteImage) {
    return <BriefImagePlaceholder brief={brief} />;
  }

  const isExternalHttp =
    brief.image_url!.startsWith("https://") || brief.image_url!.startsWith("http://");
  const proxiedSrc = proxiedImageSrc(brief.image_url!);
  const imageUrl = isExternalHttp && !fallbackToDirect ? proxiedSrc : brief.image_url!;

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
