import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/layout/Footer";
import { fetchCustomArticleById } from "@/lib/customArticles";
import { sanitizeArticleHtml } from "@/lib/sanitizeArticleHtml";
import { SITE_URL } from "@/lib/seo/metadata";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

export const revalidate = 120;

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const article = await fetchCustomArticleById(decodeURIComponent(slug));
  if (!article) {
    return { title: "Article | allhalal.info" };
  }
  const canonical = `${SITE_URL}/read/${encodeURIComponent(article.id)}`;
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
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const id = decodeURIComponent(slug);
  const article = await fetchCustomArticleById(id);

  if (!article) {
    notFound();
  }

  const portalHome = "/";
  const newsUrl = `/news`;

  // Detect if content is Markdown or HTML
  const isMarkdown = article.content?.includes("##") || article.content?.startsWith("#");
  const safeHtml = !isMarkdown && article.content ? sanitizeArticleHtml(article.content) : "";

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
      "@id": `${SITE_URL}/read/${encodeURIComponent(article.id)}`,
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

          <header className="mb-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
              {article.category}
            </div>
            
            <h1 className="mt-6 font-display text-[clamp(2rem,5vw,3.5rem)] font-black leading-[1.1] tracking-[-0.04em] text-text-primary">
              {article.title}
            </h1>
            
            {article.dek ? (
              <p className="mt-6 text-xl font-medium leading-relaxed text-text-secondary">
                {article.dek}
              </p>
            ) : null}
            
            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-text-muted">
              {article.author ? (
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                    {article.author.charAt(0)}
                  </div>
                  <span className="font-medium text-text-secondary">{article.author}</span>
                </div>
              ) : null}
              <span aria-hidden>•</span>
              <time dateTime={article.published_at} className="font-medium">
                {new Date(article.published_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              {article.tags && article.tags.length > 0 ? (
                <>
                  <span aria-hidden>•</span>
                  <div className="flex flex-wrap gap-2">
                    {article.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-bg-card px-2.5 py-0.5 text-xs font-medium text-text-secondary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </>
              ) : null}
            </div>
          </header>

          {article.image_url ? (
            <div className="relative mb-12 aspect-[16/9] overflow-hidden rounded-2xl border border-[rgba(47,37,30,0.08)] bg-[rgba(242,237,228,0.5)] shadow-[0_20px_56px_rgba(43,34,24,0.08)]">
              <img
                src={article.image_url}
                alt={article.title}
                className="h-full w-full object-cover"
              />
            </div>
          ) : null}

          {article.content ? (
            isMarkdown ? (
              <div className="prose prose-lg prose-custom max-w-none pb-8">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                  components={{
                    h1: ({ children }) => (
                      <h2 className="text-3xl font-bold font-display text-text-primary mt-12 mb-6 scroll-mt-24">
                        {children}
                      </h2>
                    ),
                    h2: ({ children }) => (
                      <h2 className="text-2xl font-bold font-display text-text-primary mt-10 mb-5 scroll-mt-24">
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-xl font-semibold font-display text-text-primary mt-8 mb-4 scroll-mt-24">
                        {children}
                      </h3>
                    ),
                    p: ({ children }) => (
                      <p className="mb-5 leading-relaxed text-text-secondary">
                        {children}
                      </p>
                    ),
                    a: ({ href, children }) => (
                      <a
                        href={href}
                        className="text-primary font-medium underline decoration-primary/30 underline-offset-2 hover:decoration-primary transition-colors"
                        target={href?.startsWith("http") ? "_blank" : undefined}
                        rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
                      >
                        {children}
                      </a>
                    ),
                    strong: ({ children }) => (
                      <strong className="font-semibold text-text-primary">{children}</strong>
                    ),
                    ul: ({ children }) => (
                      <ul className="mb-5 space-y-2 list-disc pl-6 text-text-secondary">
                        {children}
                      </ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="mb-5 space-y-2 list-decimal pl-6 text-text-secondary">
                        {children}
                      </ol>
                    ),
                    li: ({ children }) => (
                      <li className="leading-relaxed">
                        {children}
                      </li>
                    ),
                    blockquote: ({ children }) => (
                      <blockquote className="relative border-l-4 border-primary pl-6 py-4 my-8 bg-primary/5 rounded-r-lg italic text-text-secondary">
                        <div className="absolute left-4 top-0 text-5xl text-primary/20 leading-none font-serif">
                          "
                        </div>
                        {children}
                      </blockquote>
                    ),
                    code: ({ className, children }) => {
                      const isInline = !className;
                      if (isInline) {
                        return (
                          <code className="bg-[rgba(44,31,28,0.06)] text-accent-navy px-1.5 py-0.5 rounded text-[0.9em] font-semibold">
                            {children}
                          </code>
                        );
                      }
                      return (
                        <code className={className}>
                          {children}
                        </code>
                      );
                    },
                    pre: ({ children }) => (
                      <pre className="bg-[rgba(44,31,28,0.04)] border border-[rgba(44,31,28,0.1)] rounded-xl p-4 my-6 overflow-x-auto">
                        {children}
                      </pre>
                    ),
                    table: ({ children }) => (
                      <div className="my-8 overflow-x-auto">
                        <table className="w-full border-collapse rounded-lg overflow-hidden border border-[rgba(47,37,30,0.1)]">
                          {children}
                        </table>
                      </div>
                    ),
                    thead: ({ children }) => (
                      <thead className="bg-gradient-to-b from-[rgba(151,124,88,0.08)] to-[rgba(151,124,88,0.04)]">
                        {children}
                      </thead>
                    ),
                    th: ({ children }) => (
                      <th className="px-4 py-3 text-left font-semibold text-text-primary text-sm border-b-2 border-[rgba(47,37,30,0.12)]">
                        {children}
                      </th>
                    ),
                    td: ({ children }) => (
                      <td className="px-4 py-3 text-text-secondary text-sm border-b border-[rgba(47,37,30,0.06)]">
                        {children}
                      </td>
                    ),
                    hr: () => (
                      <hr className="my-12 border-t border-[rgba(47,37,30,0.1)]" />
                    ),
                  }}
                >
                  {article.content}
                </ReactMarkdown>
              </div>
            ) : (
              <div
                className="prose prose-lg prose-custom max-w-none pb-8"
                dangerouslySetInnerHTML={{ __html: safeHtml }}
              />
            )
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
