import Link from "next/link";
import type { CustomArticle } from "@/types/customArticle";
import type { HalalItem } from "@/data/halalItems";

/** "is-gelatin-halal" and "are-marshmallows-halal" collapse to the same key. */
function topicKey(slug: string): string {
  return slug
    .toLowerCase()
    .replace(/^(is|are|does|do|can|what)-/, "")
    .replace(/-halal.*$/, "")
    .replace(/[^a-z0-9]/g, "");
}

function nameTokens(item: HalalItem): string[] {
  return [item.name, ...(item.aliases || [])]
    .join(" ")
    .toLowerCase()
    .replace(/\([^)]*\)/g, " ")
    .split(/[^a-z0-9]+/)
    .filter((token) => token.length > 3);
}

/** Terms that pull in the right corner of the archive when the name matches nothing. */
const CATEGORY_TERMS: Record<HalalItem["category"], string[]> = {
  snack: ["candy", "sweets", "chocolate", "gummies", "gelatin", "ingredient", "label"],
  drink: ["drink", "energy", "alcohol", "kombucha", "vinegar", "caffeine"],
  "fast-food": ["restaurant", "eat", "eating out", "travel", "chicken", "meat"],
  ingredient: ["ingredient", "label", "e number", "additive", "gelatin", "enzyme"],
  additive: ["e number", "additive", "e4", "e1", "colour", "color", "emulsifier"],
  cosmetics: ["skincare", "cosmetic", "perfume", "toothpaste", "collagen"],
  other: ["halal", "label", "ingredient"],
};

/** Stable per-slug offset so neighbouring checks do not all surface the same posts. */
function slugOffset(slug: string, length: number): number {
  if (length === 0) return 0;
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = (hash * 31 + slug.charCodeAt(i)) % 100000;
  }
  return hash % length;
}

export function findRelatedReading(item: HalalItem, articles: CustomArticle[]) {
  const key = topicKey(item.slug);
  const tokens = nameTokens(item);

  const deepDive = articles.find((article) => topicKey(article.id) === key) || null;
  const pool = articles.filter((article) => article.id !== deepDive?.id);

  const haystackOf = (article: CustomArticle) =>
    `${article.title} ${article.dek || ""}`.toLowerCase();

  const byName = pool
    .map((article) => ({
      article,
      score: tokens.filter((token) => haystackOf(article).includes(token)).length,
    }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((entry) => entry.article);

  const related = [...byName];

  if (related.length < 3) {
    const terms = CATEGORY_TERMS[item.category];
    const byCategory = pool.filter(
      (article) =>
        !related.includes(article) && terms.some((term) => haystackOf(article).includes(term)),
    );
    const start = slugOffset(item.slug, byCategory.length);
    for (let i = 0; i < byCategory.length && related.length < 3; i++) {
      related.push(byCategory[(start + i) % byCategory.length]);
    }
  }

  if (related.length < 3) {
    const evergreen = pool.filter(
      (article) => !related.includes(article) && article.category === "halal-living",
    );
    const start = slugOffset(item.slug, evergreen.length);
    for (let i = 0; i < evergreen.length && related.length < 3; i++) {
      related.push(evergreen[(start + i) % evergreen.length]);
    }
  }

  return { deepDive, related: related.slice(0, 3) };
}

export default function RelatedReading({
  item,
  articles,
}: {
  item: HalalItem;
  articles: CustomArticle[];
}) {
  const { deepDive, related } = findRelatedReading(item, articles);

  if (!deepDive && related.length === 0) {
    return null;
  }

  return (
    <section className="mb-16">
      {deepDive && (
        <Link
          href={`/read/${encodeURIComponent(deepDive.id)}`}
          className="group mb-8 block rounded-2xl border-2 border-primary/25 bg-primary/5 p-6 transition-colors hover:border-primary"
        >
          <div className="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-primary">
            Full guide
          </div>
          <div className="font-display text-xl font-bold text-text-primary group-hover:text-primary">
            {deepDive.title}
          </div>
          {deepDive.dek && (
            <p className="mt-2 text-text-secondary line-clamp-2">{deepDive.dek}</p>
          )}
          <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
            Read the full explanation
            <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </Link>
      )}

      {related.length > 0 && (
        <>
          <h2 className="mb-6 font-display text-2xl font-bold text-text-primary">
            Keep reading
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {related.map((article) => (
              <Link
                key={article.id}
                href={`/read/${encodeURIComponent(article.id)}`}
                className="group rounded-xl border border-border bg-bg-card p-4 transition-colors hover:border-primary"
              >
                <div className="font-semibold text-text-primary group-hover:text-primary line-clamp-2">
                  {article.title}
                </div>
                {article.dek && (
                  <p className="mt-2 text-sm text-text-secondary line-clamp-2">{article.dek}</p>
                )}
              </Link>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
