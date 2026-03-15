"use client";

import { useState } from "react";
import Image from "next/image";
import { hasValidBriefImage } from "@/lib/briefs";
import type { Brief } from "@/types/brief";

export default function BriefMedia({
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

  if (hasValidBriefImage(brief) && brief.image_url && !hasImageError) {
    return (
      <Image
        src={brief.image_url}
        alt={brief.title}
        fill
        unoptimized
        priority={priority}
        sizes={sizes}
        className={className}
        onError={() => {
          setHasImageError(true);
        }}
      />
    );
  }

  return (
    <div
      className="absolute inset-0"
      style={{
        background:
          "linear-gradient(145deg, rgba(241,235,226,0.96), rgba(255,255,255,0.98) 58%, rgba(228,221,211,0.92))",
      }}
      aria-hidden="true"
    />
  );
}
