"use client";

import { useCallback, useMemo, useState } from "react";
import { computeBriefCoverSrc, nextBriefCoverAttempt } from "@/lib/briefCoverImage";
import { sanitizeBriefImageUrl } from "@/lib/briefs";

export function useBriefCoverImage(rawUrl: string | null | undefined) {
  const sanitized = useMemo(() => sanitizeBriefImageUrl(rawUrl) ?? "", [rawUrl]);
  const isExternalHttp =
    sanitized.startsWith("https://") || sanitized.startsWith("http://");

  const [attempt, setAttempt] = useState(0);
  const [loadFailed, setLoadFailed] = useState(false);

  const { src, reactKey } = useMemo(() => {
    if (!sanitized) {
      return { src: null as string | null, reactKey: "empty" };
    }
    return computeBriefCoverSrc(attempt, sanitized, isExternalHttp);
  }, [attempt, sanitized, isExternalHttp]);

  const onError = useCallback(() => {
    const next = nextBriefCoverAttempt(attempt, sanitized, isExternalHttp);
    if (next !== null) {
      setAttempt(next);
      return;
    }
    if (process.env.NODE_ENV === "development") {
      console.warn("[brief-cover] image load failed after all attempts", sanitized.slice(0, 160));
    }
    setLoadFailed(true);
  }, [attempt, sanitized, isExternalHttp]);

  return {
    sanitized,
    src,
    reactKey: `${reactKey}-${attempt}`,
    loadFailed,
    onError,
    isExternalHttp,
  };
}
