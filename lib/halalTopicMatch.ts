import type { HalalItem } from "@/data/halalItems";

/**
 * Collapse "is-gelatin-halal" / "are-marshmallows-halal" / "what-is-halal-…"
 * to one comparable key so checks and long-form articles on the same topic
 * can be paired for canonicalisation and related-reading links.
 */
export function topicKey(slug: string): string {
  return slug
    .toLowerCase()
    .replace(/^(is|are|does|do|can|what)-/, "")
    .replace(/-halal.*$/, "")
    .replace(/[^a-z0-9]/g, "");
}

/**
 * If a custom article covers the same topic as this check, return its id.
 * That article is the preferred indexable URL (longer, unique content).
 */
export function findDeepDiveArticleId(
  item: HalalItem,
  articleIds: string[],
): string | null {
  const key = topicKey(item.slug);
  const match = articleIds.find((id) => topicKey(id) === key);
  return match ?? null;
}
