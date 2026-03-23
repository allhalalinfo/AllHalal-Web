"use client";

import BriefImagePlaceholder from "@/components/briefs/BriefImagePlaceholder";
import { useBriefCoverImage } from "@/hooks/useBriefCoverImage";
import { briefCoverObjectPositionClass } from "@/lib/briefCoverImage";
import { hasValidBriefImage, isStockLikeBrief } from "@/lib/briefs";
import type { Brief } from "@/types/brief";

export default function BriefMediaClient({
  brief,
  sizes,
  priority = false,
  className,
  visualCropVariant = 0,
}: {
  brief: Brief;
  sizes: string;
  priority?: boolean;
  className?: string;
  visualCropVariant?: number;
}) {
  const { src, reactKey, loadFailed, onError } = useBriefCoverImage(brief.image_url);

  const skipRemoteImage =
    !hasValidBriefImage(brief) || isStockLikeBrief(brief) || loadFailed || !src;

  if (skipRemoteImage) {
    return <BriefImagePlaceholder brief={brief} />;
  }

  const objectPositionClass = briefCoverObjectPositionClass(visualCropVariant);

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
        key={reactKey}
        src={src}
        alt={brief.title}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
        sizes={sizes}
        referrerPolicy="no-referrer"
        className={`absolute inset-0 block h-full w-full min-w-0 object-cover ${objectPositionClass} ${className ?? ""}`}
        style={{
          width: "100%",
          maxWidth: "100%",
        }}
        onError={onError}
      />
    </>
  );
}
