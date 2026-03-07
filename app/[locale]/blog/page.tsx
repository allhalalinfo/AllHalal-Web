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
        "@id": `${SITE_URL}/${locale}/blog#webpage`,
        url: `${SITE_URL}/${locale}/blog`,
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
          url: `${SITE_URL}/${locale}/blog/${post.slug}`,
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
      <FAQSchema faqs={faqs} />

      <section className="max-w-5xl mx-auto text-center mb-14">
        <p className="text-sm font-bold uppercase tracking-[0.22em] text-primary mb-4">
          News & Editorial
        </p>
        <h1 className="text-5xl md:text-6xl font-bold font-display text-text-primary mb-6 leading-tight">
          Muslim news, halal living and Islamic guidance in one hub.
        </h1>
        <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
          Follow current Muslim headlines, read practical halal and finance guides, and move directly into the parts of AllHalal that help you act on what you learn.
        </p>
      </section>

      <section className="grid xl:grid-cols-[1.15fr_0.85fr] gap-6 mb-16">
        <Link
          href={`/${locale}/blog/${featuredPost.slug}`}
          className="rounded-[2rem] border border-border bg-bg-dark text-white p-8 shadow-2xl hover:-translate-y-1 transition-transform"
        >
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-accent-yellow mb-4">
            Featured Guide
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {featuredPost.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 rounded-full bg-white/10 text-xs font-bold uppercase tracking-[0.12em]">
                {tag}
              </span>
            ))}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-display leading-tight mb-4">
            {featuredPost.title}
          </h2>
          <p className="text-white/75 text-base leading-relaxed mb-6">{featuredPost.summary}</p>
          <span className="text-sm font-bold text-accent-yellow">Read featured article →</span>
        </Link>

        <div className="rounded-[2rem] border border-border bg-white p-8 shadow-card">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-primary mb-2">
                Recent Editorial
              </p>
              <h2 className="text-3xl font-bold font-display text-text-primary">
                Fresh reads from AllHalal.
              </h2>
            </div>
          </div>

          <div className="space-y-4">
            {recentPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/${locale}/blog/${post.slug}`}
                className="block rounded-[1.5rem] border border-border bg-bg-secondary/50 p-5 hover:bg-white hover:border-primary/30 transition-colors"
              >
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="px-2.5 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded-full uppercase tracking-[0.14em]">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-xl font-bold font-display text-text-primary mb-2 leading-snug">
                  {post.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">{post.summary}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <NewsHubClient initialNews={initialNews} />

      <section className="mt-16 grid md:grid-cols-2 xl:grid-cols-4 gap-4">
        {hubCards.map((card) => (
          <Link
            key={card.title}
            href={card.href}
            className="rounded-[1.75rem] border border-border bg-white p-6 shadow-card hover:-translate-y-1 transition-transform"
          >
            <h2 className="text-xl font-bold font-display text-text-primary mb-3 leading-snug">
              {card.title}
            </h2>
            <p className="text-sm text-text-secondary leading-relaxed mb-4">
              {card.description}
            </p>
            <span className="text-sm font-bold text-primary">Explore section →</span>
          </Link>
        ))}
      </section>

      <section className="mt-16 grid xl:grid-cols-[0.9fr_1.1fr] gap-6">
        <div className="rounded-[2rem] border border-border bg-white p-8 shadow-card">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-primary mb-3">
            Why This Hub Matters
          </p>
          <h2 className="text-3xl md:text-4xl font-bold font-display text-text-primary mb-4">
            News should lead into useful Muslim action, not just passive scrolling.
          </h2>
          <div className="space-y-4 text-text-secondary leading-relaxed">
            <p>
              A stronger Muslim portal does not separate current updates from useful next steps. People reading about halal living should be able to continue into the halal checker. People reading about finance should move naturally into zakat, investing or mortgages. People reading about family and faith should discover learning resources they can return to daily.
            </p>
            <p>
              That is the role of this hub. It combines timely Muslim coverage with editorial guidance and then routes readers deeper into the wider AllHalal ecosystem.
            </p>
          </div>
        </div>

        <div className="rounded-[2rem] border border-border bg-white p-8 shadow-card">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-primary mb-3">
            Quick Answers
          </p>
          <h2 className="text-3xl md:text-4xl font-bold font-display text-text-primary mb-6">
            What readers should understand immediately.
          </h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details key={faq.question} className="rounded-[1.5rem] border border-border bg-bg-secondary/50 p-5 group">
                <summary className="list-none cursor-pointer flex items-center justify-between gap-4">
                  <span className="font-bold text-text-primary">{faq.question}</span>
                  <span className="text-primary font-bold transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-4 text-sm text-text-secondary leading-relaxed">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
