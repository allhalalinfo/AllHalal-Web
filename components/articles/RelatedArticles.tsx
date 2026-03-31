import Link from "next/link";
import { fetchCustomArticlesList } from "@/lib/customArticles";
import type { CustomArticle } from "@/types/customArticle";

interface RelatedArticlesProps {
  currentArticleId: string;
  currentCategory: string;
}

/**
 * Server Component: fetches and displays related articles from the database
 * - Prioritizes articles from the same category
 * - Excludes the current article
 * - Randomizes order to avoid repetition
 * - Fallback to other categories if needed
 */
export default async function RelatedArticles({
  currentArticleId,
  currentCategory,
}: RelatedArticlesProps) {
  // Fetch articles from the same category
  const sameCategory = await fetchCustomArticlesList({
    page: 1,
    limit: 50,
    category: currentCategory,
  });

  // Filter out current article
  let candidates = sameCategory.articles.filter(
    (article) => article.id !== currentArticleId
  );

  // If not enough articles in same category, fetch from all categories
  if (candidates.length < 4) {
    const allArticles = await fetchCustomArticlesList({
      page: 1,
      limit: 50,
    });
    const otherCategoryArticles = allArticles.articles.filter(
      (article) =>
        article.id !== currentArticleId && article.category !== currentCategory
    );
    candidates = [...candidates, ...otherCategoryArticles];
  }

  // Randomize order to avoid repetition across page loads
  const shuffled = candidates.sort(() => Math.random() - 0.5);

  // Take 4-6 articles
  const relatedArticles = shuffled.slice(0, 5);

  if (relatedArticles.length === 0) {
    return null;
  }

  return (
    <section className="mt-16 rounded-3xl border border-[rgba(47,37,30,0.08)] bg-white/60 p-8 shadow-[0_8px_32px_rgba(43,34,24,0.04)] backdrop-blur-sm">
      <h2 className="mb-6 font-display text-2xl font-bold text-text-primary">
        Keep learning
      </h2>
      <p className="mb-6 text-sm text-text-secondary">
        If this guide helped, you may also want to read:
      </p>
      <ul className="space-y-3">
        {relatedArticles.map((article) => (
          <li key={article.id}>
            <Link
              href={`/read/${encodeURIComponent(article.id)}`}
              className="group flex items-start gap-3 rounded-xl border border-[rgba(47,37,30,0.06)] bg-white/80 p-4 transition-all hover:border-primary hover:bg-[rgba(244,185,66,0.04)] hover:shadow-sm"
            >
              <span
                className="mt-1 text-primary opacity-60 transition-opacity group-hover:opacity-100"
                aria-hidden="true"
              >
                →
              </span>
              <div className="flex-1">
                <p className="font-semibold text-text-primary group-hover:text-primary">
                  {article.title}
                </p>
                {article.dek && (
                  <p className="mt-1 text-sm text-text-secondary line-clamp-2">
                    {article.dek}
                  </p>
                )}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
