import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/layout/Footer";
import ArticleContentEnhancer from "@/components/articles/ArticleContentEnhancer";
import FaqAccordion from "@/components/articles/FaqAccordion";
import ArticleCitationCleaner from "@/components/articles/ArticleCitationCleaner";
import ArticleDomainCitationConverter from "@/components/articles/ArticleDomainCitationConverter";
import RelatedArticles from "@/components/articles/RelatedArticles";
import KeepLearningCleaner from "@/components/articles/KeepLearningCleaner";
import FinalThoughtCleaner from "@/components/articles/FinalThoughtCleaner";
import ArticleH1Converter from "@/components/articles/ArticleH1Converter";
import { fetchCustomArticleById } from "@/lib/customArticles";
import { SITE_URL } from "@/lib/seo/metadata";
import { remark } from "remark";
import remarkHtml from "remark-html";
import remarkGfm from "remark-gfm";
import remarkHeadingId from "remark-heading-id";
import { sanitizeArticleHtml } from "@/lib/sanitizeArticleHtml";

// Revalidate article pages every hour (increased from 2 minutes to reduce origin transfer bandwidth)
// Auto-revalidation still triggers when article is created/updated via admin panel
export const revalidate = 3600;

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
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { slug } = await props.params;
  const searchParams = await props.searchParams;
  
  // Convert searchParams to URLSearchParams for utility functions
  const urlParams = new URLSearchParams();
  Object.entries(searchParams).forEach(([key, value]) => {
    if (value) {
      const stringValue = Array.isArray(value) ? value[0] : value;
      urlParams.set(key, stringValue);
    }
  });
  
  // Check if we're in app mode (WebView)
  const isAppMode = urlParams.get('app') === 'true';
  const hideRelated = urlParams.get('hide_related') === 'true';
  const hideBackButton = urlParams.get('hide_back_btn') === 'true';
  const theme = urlParams.get('theme') || 'auto'; // light, dark, auto
  
  const id = decodeURIComponent(slug);
  const article = await fetchCustomArticleById(id);

  if (!article) {
    notFound();
  }

  const portalHome = "/";
  const newsUrl = `/news`;

  // Detect if content is Markdown or HTML
  const isMarkdown = article.content?.includes("##") || article.content?.startsWith("#");
  
  let htmlContent = "";
  if (article.content) {
    if (isMarkdown) {
      // Server-side: convert Markdown to HTML with heading ID support
      const result = await remark()
        .use(remarkGfm)
        .use(remarkHeadingId)
        .use(remarkHtml, { sanitize: false })
        .process(article.content);
      htmlContent = sanitizeArticleHtml(result.toString());
    } else {
      htmlContent = sanitizeArticleHtml(article.content);
    }
  }

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
      <main 
        className="relative min-h-screen overflow-hidden pb-24"
        style={{ 
          paddingTop: isAppMode ? '2rem' : '8rem',
          background: isAppMode 
            ? '#ffffff' // Clean white for app mode
            : 'linear-gradient(180deg,#f7f2e7 0%,#f5f1e8 18%,#eef1ec 52%,#f2f1e8 100%)'
        }}
        data-theme={theme}
        data-app-mode={isAppMode ? 'true' : 'false'}
      >
        {/* Ambient background effects - only show in web mode */}
        {!isAppMode && (
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(140,110,180,0.12),transparent_24%),radial-gradient(circle_at_78%_12%,rgba(73,110,112,0.14),transparent_26%),radial-gradient(circle_at_55%_78%,rgba(104,134,93,0.10),transparent_24%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.35),transparent_26%,transparent_72%,rgba(255,255,255,0.15))]" />
            <div className="absolute left-[-10rem] top-[8rem] h-[24rem] w-[24rem] rounded-full bg-[rgba(100,160,180,0.10)] blur-3xl" />
            <div className="absolute right-[-10rem] top-[6rem] h-[24rem] w-[24rem] rounded-full bg-[rgba(130,100,170,0.09)] blur-3xl" />
          </div>
        )}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Full-width container */}
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          {/* Editorial content wrapper - optimal reading width */}
          <article className="mx-auto max-w-[72ch]">
            {/* Breadcrumbs - hidden in app mode */}
            {!isAppMode && (
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
            )}

            <header className="mb-10">
              <h1 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-black leading-[1.1] tracking-[-0.04em] text-text-primary">
                {article.title}
              </h1>
              
              {article.dek ? (
                <p className="mt-6 text-xl font-medium leading-relaxed text-text-secondary">
                  {article.dek}
                </p>
              ) : null}
            </header>

            {/* Hero image - breakout to wider than text for visual interest */}
            {article.image_url ? (
              <div className="relative -mx-4 mb-12 aspect-[16/9] overflow-hidden rounded-2xl border border-[rgba(47,37,30,0.08)] bg-[rgba(242,237,228,0.5)] shadow-[0_20px_56px_rgba(43,34,24,0.08)] sm:-mx-8 lg:-mx-16 xl:-mx-24">
                <img
                  src={article.image_url}
                  alt={article.title}
                  className="h-full w-full object-cover"
                />
              </div>
            ) : null}

            {/* Article content */}
            {htmlContent ? (
              <div
                className="prose prose-lg prose-custom max-w-none pb-8"
                dangerouslySetInnerHTML={{ __html: htmlContent }}
              />
            ) : (
              <p className="mt-10 text-text-secondary">
                Full text is not available yet. Try again later or open another article.
              </p>
            )}

            {/* Back button - hidden in app mode or if hide_back_btn=true */}
            {!isAppMode && !hideBackButton && (
              <div className="mt-12 border-t border-[rgba(47,37,30,0.08)] pt-8">
                <Link
                  href={newsUrl}
                  className="inline-flex rounded-full bg-[#173640] px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_44px_rgba(23,54,64,0.18)] transition-transform hover:-translate-y-0.5"
                >
                  ← Back to News
                </Link>
              </div>
            )}

            {/* Related Articles - Server-side rendered with real articles from DB */}
            {!hideRelated && (
              <RelatedArticles
                currentArticleId={article.id}
                currentCategory={article.category}
              />
            )}
          </article>
          
          {/* Client-side content enhancers */}
          <ArticleH1Converter />
          <KeepLearningCleaner />
          <FinalThoughtCleaner />
          <ArticleDomainCitationConverter />
          <ArticleCitationCleaner />
          <ArticleContentEnhancer />
          <FaqAccordion />
        </div>
      </main>
      {/* Footer - hidden in app mode */}
      {!isAppMode && <Footer />}
    </>
  );
}
