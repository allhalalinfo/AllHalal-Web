import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/layout/Footer";
import ArticleContentEnhancer from "@/components/articles/ArticleContentEnhancer";
import FaqAccordion from "@/components/articles/FaqAccordion";
import ArticleCitationCleaner from "@/components/articles/ArticleCitationCleaner";
import ArticleDomainCitationConverter from "@/components/articles/ArticleDomainCitationConverter";
import RelatedArticles from "@/components/articles/RelatedArticles";
import RelatedHalalChecks from "@/components/articles/RelatedHalalChecks";
import KeepLearningCleaner from "@/components/articles/KeepLearningCleaner";
import FinalThoughtCleaner from "@/components/articles/FinalThoughtCleaner";
import DuplicateTitleCleaner from "@/components/articles/DuplicateTitleCleaner";
import ArticleH1Converter from "@/components/articles/ArticleH1Converter";
import BreadcrumbsSchema from "@/components/seo/BreadcrumbsSchema";
import { fetchCustomArticleById, fetchCustomArticlesList } from "@/lib/customArticles";
import { SITE_URL } from "@/lib/seo/metadata";
import { remark } from "remark";
import remarkHtml from "remark-html";
import remarkGfm from "remark-gfm";
import remarkHeadingId from "remark-heading-id";
import { sanitizeArticleHtml } from "@/lib/sanitizeArticleHtml";
import { enhanceArticleHTML, wrapExampleCards } from "@/lib/articleEnhancer";

// Revalidate article pages every hour (increased from 2 minutes to reduce origin transfer bandwidth)
// Auto-revalidation still triggers when article is created/updated via admin panel
export const revalidate = 3600;

export async function generateStaticParams() {
  const { articles } = await fetchCustomArticlesList({ page: 1, limit: 100 });
  return articles.map((article) => ({ slug: article.id }));
}

/**
 * WebView chrome toggles (?app, ?theme, ?hide_related, ?hide_back_btn).
 *
 * These run as an inline script rather than through `searchParams`, because
 * reading search params in the page would opt the whole route out of ISR and
 * force a fresh render — plus two API calls — on every request, including every
 * crawl. The app never needs different content, only less chrome, so the markup
 * stays identical and CSS hides what the WebView does not want.
 */
const APP_MODE_SCRIPT = `(function(){try{var p=new URLSearchParams(location.search),d=document.documentElement;
if(p.get('app')==='true')d.setAttribute('data-app-mode','true');
var t=p.get('theme');if(t==='light'||t==='dark')d.setAttribute('data-app-theme',t);
if(p.get('hide_related')==='true')d.setAttribute('data-app-hide-related','true');
if(p.get('hide_back_btn')==='true')d.setAttribute('data-app-hide-back','true');}catch(e){}})();`;

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const article = await fetchCustomArticleById(decodeURIComponent(slug));
  if (!article) {
    return { title: "Article | AllHalal" };
  }
  
  const canonical = `${SITE_URL}/read/${encodeURIComponent(article.id)}`;
  
  // Optimize title: 50-60 chars with keyword + brand
  const title = article.title.length > 50 
    ? `${article.title.substring(0, 50)}... | AllHalal`
    : `${article.title} | AllHalal`;
  
  // Optimize description: 150-160 chars with CTA
  let description = article.dek || article.title;
  if (description.length < 140) {
    description = `${description} Read our comprehensive guide with expert analysis and Islamic perspective.`;
  }
  if (description.length > 160) {
    description = description.substring(0, 157) + "...";
  }
  
  // Enhanced keywords from article content
  const keywords = [
    'halal',
    'islamic',
    'muslim',
    article.category || 'lifestyle',
    ...article.title.toLowerCase().split(' ').filter(w => w.length > 4).slice(0, 3)
  ];
  
  return {
    title,
    description,
    keywords: keywords.join(', '),
    alternates: { canonical },
    openGraph: {
      title: article.title,
      description: article.dek || description,
      type: "article",
      url: canonical,
      siteName: "AllHalal",
      locale: "en_US",
      publishedTime: article.published_at,
      modifiedTime: article.updated_at ?? undefined,
      images: article.image_url ? [{
        url: article.image_url,
        width: 1200,
        height: 630,
        alt: article.title
      }] : [{
        url: `${SITE_URL}/branding/og-image.png`,
        width: 1200,
        height: 630,
        alt: "AllHalal - Muslim Lifestyle Platform"
      }],
    },
    twitter: {
      card: "summary_large_image",
      site: "@allhalalinfo",
      creator: "@allhalalinfo",
      title: article.title,
      description: article.dek || description,
      images: article.image_url ? [article.image_url] : [`${SITE_URL}/branding/og-image.png`],
    },
  };
}

export default async function CustomArticlePage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const id = decodeURIComponent(slug);
  
  // 🔧 OPTIMIZATION (Phase 2): Fetch article + all articles in parallel
  // Before: article fetch, then RelatedArticles component fetches again (2-3 API calls)
  // After: Single parallel fetch, pass articles to component (1 API call total)
  // Saves 5-8% of Fast Origin Transfer
  const [article, allArticlesList] = await Promise.all([
    fetchCustomArticleById(id),
    fetchCustomArticlesList({ page: 1, limit: 30 }), // Fetch 30 articles for related suggestions
  ]);

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
    
    // 🔧 OPTIMIZATION (Phase 3): Server-side HTML enhancement
    // Moved from client-side ArticleContentEnhancer for better performance
    // Adds semantic classes and IDs based on heading patterns
    htmlContent = enhanceArticleHTML(htmlContent);
    htmlContent = wrapExampleCards(htmlContent);
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.dek || undefined,
    image: article.image_url ? [article.image_url] : undefined,
    datePublished: article.published_at,
    dateModified: article.updated_at ?? article.published_at,
    author: article.author
      ? { "@type": "Person", name: article.author }
      : { "@type": "Organization", name: "allhalal.info" },
    publisher: {
      "@type": "Organization",
      name: "allhalal.info",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/branding/logo.png`
      }
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/read/${encodeURIComponent(article.id)}`,
    },
    articleSection: article.category || "Muslim Lifestyle",
    wordCount: article.content ? article.content.split(/\s+/).length : undefined,
    inLanguage: "en"
  };

  // Breadcrumbs for article pages
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Articles", url: "/news" },
    { name: article.title, url: `/read/${encodeURIComponent(article.id)}` }
  ];

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: APP_MODE_SCRIPT }} />
      <main
        className="article-shell relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#f7f2e7_0%,#f5f1e8_18%,#eef1ec_52%,#f2f1e8_100%)] pb-24"
      >
        {/* Ambient background effects - fresh purple, blue, green tones (no gold) */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(140,110,180,0.12),transparent_24%),radial-gradient(circle_at_78%_12%,rgba(73,110,112,0.14),transparent_26%),radial-gradient(circle_at_55%_78%,rgba(104,134,93,0.10),transparent_24%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.35),transparent_26%,transparent_72%,rgba(255,255,255,0.15))]" />
          <div className="absolute left-[-10rem] top-[8rem] h-[24rem] w-[24rem] rounded-full bg-[rgba(100,160,180,0.10)] blur-3xl" />
          <div className="absolute right-[-10rem] top-[6rem] h-[24rem] w-[24rem] rounded-full bg-[rgba(130,100,170,0.09)] blur-3xl" />
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <BreadcrumbsSchema items={breadcrumbs} />

        {/* Full-width container */}
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          {/* Editorial content wrapper - optimal reading width */}
          <article className="mx-auto max-w-[72ch]">
            {/* Breadcrumbs - hidden in app mode */}
            <div data-app-chrome>
              <nav className="mb-8 text-sm text-text-muted" aria-label="Breadcrumb">
                <Link href={portalHome} className="font-medium text-primary hover:underline">
                  Home
                </Link>
                <span className="mx-2" aria-hidden>
                  /
                </span>
                <Link href={newsUrl} className="hover:text-text-primary hover:underline">
                  Articles
                </Link>
                <span className="mx-2" aria-hidden>
                  /
                </span>
                <span className="text-text-secondary">{article.title.substring(0, 50)}{article.title.length > 50 ? '...' : ''}</span>
              </nav>
            </div>

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
            <div data-app-back>
              <div className="mt-12 border-t border-[rgba(47,37,30,0.08)] pt-8">
                <Link
                  href={newsUrl}
                  className="inline-flex rounded-full bg-[#173640] px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_44px_rgba(23,54,64,0.18)] transition-transform hover:-translate-y-0.5"
                >
                  ← Back to News
                </Link>
              </div>
            </div>

            <div data-app-related>
              {/* Related Halal Checks - Internal linking for SEO */}
              <RelatedHalalChecks
                articleTitle={article.title}
                articleContent={article.content}
                maxItems={3}
              />

              {/* Related Articles - Server-side rendered with real articles from DB */}
              <RelatedArticles
                currentArticleId={article.id}
                currentCategory={article.category}
                allArticles={allArticlesList.articles}
              />
            </div>
          </article>
          
          {/* Client-side content enhancers */}
          <ArticleH1Converter />
          <DuplicateTitleCleaner />
          <KeepLearningCleaner />
          <FinalThoughtCleaner />
          <ArticleDomainCitationConverter />
          <ArticleCitationCleaner />
          {/* ArticleContentEnhancer moved to server-side for better performance */}
          <FaqAccordion />
        </div>
      </main>
      {/* Footer - hidden in app mode */}
      <div data-app-chrome>
        <Footer />
      </div>
    </>
  );
}
