/**
 * 🔧 OPTIMIZATION (Phase 2): Simplified without image proxy
 * Removed proxy-related functions, keeping only crop variant logic for backwards compat
 */

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
