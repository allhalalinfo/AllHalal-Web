import { proxiedImageSrc } from "@/lib/proxiedImageUrl";

/** Remove query string — some CDNs reject or vary on `?itok=` etc. */
export function stripImageUrlQuery(url: string): string {
  try {
    const u = new URL(url);
    u.search = "";
    return u.toString();
  } catch {
    const i = url.indexOf("?");
    return i > 0 ? url.slice(0, i) : url;
  }
}

/**
 * Load attempts: 0 = same-origin proxy, 1 = direct, 2 = proxy without query, 3 = direct without query.
 * Caller passes already-sanitized absolute URL (see `sanitizeBriefImageUrl`).
 */
export function computeBriefCoverSrc(
  attempt: number,
  sanitizedUrl: string,
  isExternalHttp: boolean,
): { src: string | null; reactKey: string } {
  const stripped = stripImageUrlQuery(sanitizedUrl);
  const strippedDiffers = stripped !== sanitizedUrl;

  switch (attempt) {
    case 0:
      return {
        src: isExternalHttp ? proxiedImageSrc(sanitizedUrl) : sanitizedUrl,
        reactKey: `a0:${sanitizedUrl.length}`,
      };
    case 1:
      return {
        src: isExternalHttp ? sanitizedUrl : null,
        reactKey: `a1:${sanitizedUrl.length}`,
      };
    case 2:
      if (!isExternalHttp || !strippedDiffers) {
        return { src: null, reactKey: "a2skip" };
      }
      return {
        src: proxiedImageSrc(stripped),
        reactKey: `a2:${stripped.length}`,
      };
    case 3:
      if (!strippedDiffers) {
        return { src: null, reactKey: "a3skip" };
      }
      return { src: stripped, reactKey: `a3:${stripped.length}` };
    default:
      return { src: null, reactKey: "fail" };
  }
}

/** Next attempt index that yields a non-null src, or null if exhausted. */
export function nextBriefCoverAttempt(
  attempt: number,
  sanitizedUrl: string,
  isExternalHttp: boolean,
): number | null {
  let next = attempt + 1;
  while (next <= 3) {
    if (computeBriefCoverSrc(next, sanitizedUrl, isExternalHttp).src) {
      return next;
    }
    next += 1;
  }
  return null;
}

export const BRIEF_COVER_OBJECT_POSITIONS = [
  "object-center",
  "object-top",
  "object-bottom",
  "object-left",
] as const;

export function briefCoverObjectPositionClass(variant: number): string {
  return BRIEF_COVER_OBJECT_POSITIONS[variant % BRIEF_COVER_OBJECT_POSITIONS.length];
}

/** Slight crop variation when the same `image_url` repeats in a row (visual de-dup). */
export function consecutiveBriefImageCropVariant(
  briefs: Array<{ image_url: string | null | undefined }>,
  index: number,
): number {
  const url = briefs[index]?.image_url ?? "";
  if (!url) {
    return 0;
  }
  let runStart = index;
  while (runStart > 0 && briefs[runStart - 1]?.image_url === url) {
    runStart -= 1;
  }
  const positionInRun = index - runStart;
  return positionInRun % BRIEF_COVER_OBJECT_POSITIONS.length;
}
