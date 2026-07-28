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

export function findRelatedReading(item: HalalItem, articles: CustomArticle[]) {
  const key = topicKey(item.slug);
  const tokens = nameTokens(item);

  const deepDive = articles.find((article) => topicKey(article.id) === key) || null;

  const scored = articles
    .filter((article) => article.id !== deepDive?.id)
    .map((article) => {
      const haystack = `${article.title} ${article.dek || ""}`.toLowerCase();
      const score = tokens.reduce(
        (total, token) => total + (haystack.includes(token) ? 2 : 0),
        0,
      );
      return { article, score };
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((entry) => entry.article);

  return { deepDive, related: scored.slice(0, 3) };
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
