import type { Metadata } from "next";
import Link from "next/link";
import { generateMetadata as genMeta, SITE_URL } from "@/lib/seo/metadata";
import { fetchCustomArticlesList } from "@/lib/customArticles";
import CustomArticleGridCard from "@/components/articles/CustomArticleGridCard";

export const metadata: Metadata = genMeta({
  title: "Halal Finance Hub | Zakat, Investing, Mortgages & Islamic Banking",
  description: "Muslim finance guidance for zakat calculation, halal investing, Islamic banking and home financing. Clear routes for real financial decisions.",
  path: "/finance",
  keywords: [
    "halal finance",
    "Islamic finance",
    "zakat calculator",
    "halal investing",
    "Islamic banking",
    "halal mortgage",
  ]
});

const financeSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/finance#webpage`,
      url: `${SITE_URL}/finance`,
      name: "Halal Finance Hub",
      description:
        "Finance hub for zakat, halal investing, Islamic banking and halal mortgage guidance.",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      inLanguage: "en",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: `${SITE_URL}`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Finance",
          item: `${SITE_URL}/finance`,
        },
      ],
    },
  ],
};

export const revalidate = 3600; // Cache for 1 hour (static hub)

export default async function FinanceHub() {
  // Fetch articles with category "finance"
  const articlesList = await fetchCustomArticlesList({ page: 1, limit: 50 });
  const financeArticles = articlesList.articles.filter(
    (article) => article.category === "finance"
  );

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#f7f2e7] via-[#f9f6f1] to-[#f2f1e8]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(financeSchema) }}
      />

      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute right-[-8rem] top-[8rem] h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,rgba(42,92,88,0.06),transparent_65%)] blur-3xl" />
        <div className="absolute left-[-12rem] top-[28rem] h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(circle,rgba(75,122,136,0.08),transparent_68%)] blur-3xl" />
        <div className="absolute right-[-10rem] bottom-[8rem] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(107,74,55,0.07),transparent_62%)] blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto max-w-6xl px-6 py-32">
        {/* Hero Section */}
        <div className="mb-16">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[rgba(42,92,88,0.08)] px-4 py-1.5">
            <svg
              className="h-4 w-4 text-[#2A5C58]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-xs font-bold uppercase tracking-wider text-[#2A5C58]">
              Halal Finance
            </span>
          </div>

          <h1 className="mb-6 text-[clamp(2.5rem,7vw,4.5rem)] font-black font-display leading-[0.95] tracking-tight text-text-primary">
            Muslim money decisions, structured around real choices
          </h1>

          <p className="mb-8 max-w-3xl text-lg leading-relaxed text-text-secondary">
            Zakat, halal investing, Islamic banking and home finance in one clear place.
            Calculate obligations, understand options and compare paths.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/finance/zakat-calculator"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-gold px-6 py-3 font-bold text-[#4A3319] shadow-[0_8px_24px_rgba(176,144,98,0.25)] transition-transform hover:-translate-y-0.5"
            >
              Calculate zakat
            </Link>
            <Link
              href="/finance/investing"
              className="inline-flex items-center gap-2 rounded-full border border-[rgba(47,37,30,0.15)] bg-white/80 px-6 py-3 font-semibold text-text-primary backdrop-blur-sm transition-colors hover:bg-white"
            >
              Start halal investing
            </Link>
            <Link
              href="/finance/mortgages"
              className="inline-flex items-center gap-2 rounded-full border border-[rgba(47,37,30,0.15)] bg-white/80 px-6 py-3 font-semibold text-text-primary backdrop-blur-sm transition-colors hover:bg-white"
            >
              Compare mortgage paths
            </Link>
          </div>
        </div>

        {/* Finance Articles Section */}
        {financeArticles.length > 0 && (
          <section className="mb-12">
            <div className="mb-8">
              <p className="mb-2 text-xs font-bold uppercase tracking-wider text-primary">
                In-depth guides
              </p>
              <h2 className="text-3xl font-black font-display text-text-primary">
                Finance articles
              </h2>
              <p className="mt-2 text-text-secondary">
                Deep dives into Islamic finance topics, halal investing strategies and financial planning.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {financeArticles.map((article, index) => (
                <CustomArticleGridCard
                  key={article.id}
                  article={article}
                  locale="en"
                  priority={index < 3}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
