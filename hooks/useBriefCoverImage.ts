"use client";

import { useCallback, useMemo, useState } from "react";
import { sanitizeBriefImageUrl } from "@/lib/briefs";

/**
 * 🔧 OPTIMIZATION (Phase 2): Simplified image loading without proxy
 * - Before: Complex fallback chain (proxy -> direct -> proxy no-query -> direct no-query)
 * - After: Single direct URL attempt with placeholder fallback
 * - Saves 10-15% of Fast Origin Transfer by eliminating /api/img proxy route
 */
export function useBriefCoverImage(rawUrl: string | null | undefined) {
  const sanitized = useMemo(() => sanitizeBriefImageUrl(rawUrl) ?? "", [rawUrl]);
  const [loadFailed, setLoadFailed] = useState(false);

  const onError = useCallback(() => {
    if (process.env.NODE_ENV === "development") {
      console.warn("[brief-cover] image load failed", sanitized.slice(0, 160));
    }
    setLoadFailed(true);
  }, [sanitized]);

  return {
    sanitized,
    src: sanitized || null,
    reactKey: `direct-${sanitized.length}`,
    loadFailed,
    onError,
    isExternalHttp: sanitized.startsWith("https://") || sanitized.startsWith("http://"),
  };
}
