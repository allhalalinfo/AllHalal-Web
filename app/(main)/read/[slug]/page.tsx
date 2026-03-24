import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/layout/Footer";
import { fetchCustomArticleById } from "@/lib/customArticles";
import { sanitizeArticleHtml } from "@/lib/sanitizeArticleHtml";
import { SITE_URL } from "@/lib/seo/metadata";

export const revalidate = 120;

export async function generateMetadata(props: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await props.params;
  const article = await fetchCustomArticleById(decodeURIComponent(slug));
  if (!article) {
    return { title: "Article | allhalal.info" };
  }
  const canonical = `${SITE_URL}/${locale}/read/${encodeURIComponent(article.id)}`;
  return {
    title: `${article.title} | allhalal.info`,
    description: article.dek || article.title,
    alternates: { canonical },
    openGraph: {
      title: article.title,
      description: article.dek || undefined,
      type: "article",
      url: canonical,
      publishedTime: article.published_at,
      modifiedTime: article.updated_at ?? undefined,
      images: article.image_url ? [{ url: article.image_url }] : undefined,
    },
    twitter: {
      card: article.image_url ? "summary_large_image" : "summary",
      title: article.title,
      description: article.dek || undefined,
      images: article.image_url ? [article.image_url] : undefined,
    },
  };
}

export default async function CustomArticlePage(props: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await props.params;
  const id = decodeURIComponent(slug);
  const article = await fetchCustomArticleById(id);

  if (!article) {
    notFound();
  }

  const safeHtml = article.content ? sanitizeArticleHtml(article.content) : "";
  const portalHome = `/${locale}`;
  const newsUrl = `/${locale}/news`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.dek || undefined,
    datePublished: article.published_at,
    dateModified: article.updated_at ?? article.published_at,
    author: article.author
      ? { "@type": "Person", name: article.author }
      : { "@type": "Organization", name: "allhalal.info" },
    publisher: {
      "@type": "Organization",
      name: "allhalal.info",
      url: SITE_URL,
    },
    image: article.image_url ? [article.image_url] : undefined,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/${locale}/read/${encodeURIComponent(article.id)}`,
    },
  };

  return (
    <>
      <main className="relative min-h-screen overflow-hidden bg-bg-primary pb-24 pt-32">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <article className="container relative z-10 mx-auto max-w-3xl px-4">
          <nav className="mb-8 text-sm text-text-muted">
            <Link href={portalHome} className="font-medium text-primary hover:underline">
              Home
            </Link>
            <span className="mx-2" aria-hidden>
              /
            </span>
            <Link href={newsUrl} className="hover:text-text-primary hover:underline">
              News desk
            </Link>
            <span className="mx-2" aria-hidden>
              /
            </span>
            <span className="text-text-secondary">Read</span>
          </nav>

          <header className="rounded-[1.5rem] border border-[rgba(47,37,30,0.08)] bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(249,246,241,0.92))] p-6 shadow-[0_20px_56px_rgba(43,34,24,0.06)] md:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary/90">
              {article.category}
            </p>
            <h1 className="mt-3 font-display text-[clamp(1.75rem,4vw,2.75rem)] font-black leading-tight tracking-[-0.03em] text-text-primary">
              {article.title}
            </h1>
            {article.dek ? (
              <p className="mt-4 text-lg font-medium leading-relaxed text-text-secondary">
                {article.dek}
              </p>
            ) : null}
            <div className="mt-5 flex flex-wrap gap-x-3 gap-y-1 text-sm text-text-muted">
              <time dateTime={article.published_at}>{article.published_at}</time>
              {article.author ? (
                <>
                  <span aria-hidden>•</span>
                  <span>{article.author}</span>
                </>
              ) : null}
            </div>
          </header>

          {safeHtml ? (
            <div
              className="prose mt-10 max-w-none pb-8 text-text-primary"
              dangerouslySetInnerHTML={{ __html: safeHtml }}
            />
          ) : (
            <p className="mt-10 text-text-secondary">
              Full text is not available yet. Try again later or open another article.
            </p>
          )}

          <div className="mt-12 border-t border-[rgba(47,37,30,0.08)] pt-8">
            <Link
              href={newsUrl}
              className="inline-flex rounded-full bg-[#173640] px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_44px_rgba(23,54,64,0.18)] transition-transform hover:-translate-y-0.5"
            >
              More on the news desk
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
