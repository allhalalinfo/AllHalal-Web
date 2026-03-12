import type { Metadata } from "next";
import Link from "next/link";
import FAQSchema from "@/components/seo/FAQSchema";
import { blogPosts } from "@/data/blogPosts";
import { getAggregatedNews } from "@/lib/newsFeed";
import { SITE_URL } from "@/lib/seo/metadata";
import NewsHubClient from "./NewsHubClient";

export const metadata: Metadata = {
  title: "AllHalal News Hub | Muslim News, Islamic Guides & Halal Living Articles",
  description:
    "Follow Muslim news, halal living updates, Islamic finance articles, family and faith guidance, and practical editorial guides in the AllHalal news hub.",
  openGraph: {
    title: "AllHalal News Hub | Muslim News, Islamic Guides & Halal Living Articles",
    description:
      "Follow Muslim news, halal living updates, Islamic finance articles, family and faith guidance, and practical editorial guides in the AllHalal news hub.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AllHalal News Hub | Muslim News, Islamic Guides & Halal Living Articles",
    description:
      "Follow Muslim news, halal living updates, Islamic finance articles, family and faith guidance, and practical editorial guides in the AllHalal news hub.",
  },
};

const faqs = [
  {
    question: "What is the AllHalal news hub for?",
    answer:
      "The news hub brings together Muslim news, faith and family coverage, halal living updates, Islamic finance articles and AllHalal editorial guides in one destination.",
  },
  {
    question: "Does the page only show AllHalal articles?",
    answer:
      "No. The page combines AllHalal editorial guides with live article feeds from trusted Muslim publications so readers can move between original content and current updates.",
  },
  {
    question: "What topics does the news hub cover?",
    answer:
      "It covers faith and practice, family and education, halal living, Islamic finance, health and wellness, and broader Ummah and world coverage.",
  },
];

export default async function BlogIndex(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  const initialNews = await getAggregatedNews({ limit: 18 });
  const sortedPosts = [...blogPosts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
  const featuredPost = sortedPosts[0];
  const recentPosts = sortedPosts.slice(1, 5);

  const hubCards = [
    {
      title: "Halal food, ingredients and everyday choices",
      description:
        "Read ingredient explainers, snack and fast-food breakdowns, E-number guides and practical halal living articles.",
      href: `/${locale}/is-it-halal`,
    },
    {
      title: "Islamic finance for real life decisions",
      description:
        "Move from headlines to actionable guidance on halal investing, zakat, mortgages and banking.",
      href: `/${locale}/finance`,
    },
    {
      title: "Islamic learning and devotional reading",
      description:
        "Pair current updates with duas, Ramadan resources, 99 Names of Allah and foundational Islamic learning.",
      href: `/${locale}/learn`,
    },
    {
      title: "Methodology and trust",
      description:
        "See how AllHalal thinks about verification, classification and practical guidance behind the content.",
      href: `/${locale}/methodology`,
    },
  ];

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${SITE_URL}/${locale}/news#webpage`,
        url: `${SITE_URL}/${locale}/news`,
        name: "AllHalal News Hub",
        description:
          "Muslim news hub for halal living, Islamic finance, faith, family and editorial guides.",
      },
      {
        "@type": "ItemList",
        name: "Recent AllHalal articles",
        itemListElement: sortedPosts.slice(0, 6).map((post, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: `${SITE_URL}/${locale}/news/${post.slug}`,
          name: post.title,
        })),
      },
    ],
  };

  return (
    <main className="container py-32 min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Compact Hero - Less talk, more action */}
      <section className="max-w-4xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-primary mb-4">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          Live News & Guides
        </div>
        <h1 className="text-4xl md:text-5xl font-bold font-display text-text-primary mb-4 leading-tight">
          Muslim news, halal guides, finance insights.
        </h1>
        <p className="text-lg text-text-secondary leading-relaxed">
          Updated every 30 minutes from trusted sources.
        </p>
      </section>

      {/* Compact Grid - Featured + Recent */}
      <section className="grid xl:grid-cols-[1fr_1fr] gap-6 mb-12">
        {/* Featured - Smaller, More Info */}
        <Link
          href={`/${locale}/news/${featuredPost.slug}`}
          className="group rounded-[1.75rem] border border-border bg-bg-dark text-white p-6 shadow-xl hover:-translate-y-1 hover:shadow-2xl transition-all"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-accent-yellow">
              Editor's Pick
            </span>
            <span className="text-xs text-white/60">5 min read</span>
          </div>
          <div className="flex flex-wrap gap-2 mb-3">
            {featuredPost.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="px-2.5 py-1 rounded-full bg-white/10 text-[10px] font-bold uppercase tracking-[0.12em]">
                {tag}
              </span>
            ))}
          </div>
          <h2 className="text-2xl md:text-3xl font-bold font-display leading-tight mb-3 group-hover:text-accent-yellow transition-colors">
            {featuredPost.title}
          </h2>
          <p className="text-white/75 text-sm leading-relaxed line-clamp-2">{featuredPost.summary}</p>
        </Link>

        {/* Recent - Compact List */}
        <div className="rounded-[1.75rem] border border-border bg-white p-6 shadow-card">
          <div className="flex items-center justify-between mb-5">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                Latest from AllHalal
              </span>
              <h2 className="text-xl font-bold font-display text-text-primary mt-1">
                Fresh guides
              </h2>
            </div>
          </div>

          <div className="space-y-3">
            {recentPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/${locale}/news/${post.slug}`}
                className="block rounded-xl border border-border bg-bg-secondary/50 p-4 hover:bg-white hover:border-primary/30 hover:shadow-sm transition-all"
              >
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {post.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="px-2 py-0.5 bg-primary/10 text-primary text-[9px] font-bold rounded uppercase tracking-wider">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-base font-bold font-display text-text-primary leading-snug line-clamp-2">
                  {post.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Live News Feed - Main Content */}
      <NewsHubClient initialNews={initialNews} />

      {/* Quick Navigation - Keep hubCards but make them more action-oriented */}
      <section className="mt-12 grid md:grid-cols-4 gap-3">
        {hubCards.map((card) => (
          <Link
            key={card.title}
            href={card.href}
            className="rounded-xl border border-border bg-white p-4 hover:border-primary/30 hover:shadow-md hover:-translate-y-0.5 transition-all group"
          >
            <h3 className="text-sm font-bold text-text-primary mb-1 leading-snug group-hover:text-primary transition-colors">
              {card.title}
            </h3>
            <span className="text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
              Explore →
            </span>
          </Link>
        ))}
      </section>
    </main>
  );
}
