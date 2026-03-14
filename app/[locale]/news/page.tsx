import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpenText,
  Clock3,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import AdSlot from "@/components/ads/AdSlot";
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

type DestinationIcon = "shield" | "trend" | "book" | "sparkles";

function DestinationCardIcon({
  icon,
  className,
}: {
  icon: DestinationIcon;
  className?: string;
}) {
  switch (icon) {
    case "shield":
      return <ShieldCheck className={className} />;
    case "trend":
      return <TrendingUp className={className} />;
    case "book":
      return <BookOpenText className={className} />;
    case "sparkles":
      return <Sparkles className={className} />;
    default:
      return <Sparkles className={className} />;
  }
}

export default async function BlogIndex(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  const initialNews = await getAggregatedNews({ limit: 24 });
  const sortedPosts = [...blogPosts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
  const featuredPost = sortedPosts[0];
  const recentPosts = sortedPosts.slice(1, 5);

  const destinationCards = [
    {
      eyebrow: "Halal decisions",
      title: "Halal food, ingredients and everyday choices",
      description:
        "Read ingredient explainers, snack and fast-food breakdowns, E-number guides and practical halal living articles.",
      href: `/${locale}/is-it-halal`,
      accent:
        "from-[rgba(244,185,66,0.22)] via-[rgba(244,185,66,0.06)] to-transparent",
      icon: "shield" as const,
    },
    {
      eyebrow: "Money with clarity",
      title: "Islamic finance for real life decisions",
      description:
        "Move from headlines to actionable guidance on halal investing, zakat, mortgages and banking.",
      href: `/${locale}/finance`,
      accent:
        "from-[rgba(75,110,112,0.22)] via-[rgba(75,110,112,0.06)] to-transparent",
      icon: "trend" as const,
    },
    {
      eyebrow: "Read and reflect",
      title: "Islamic learning and devotional reading",
      description:
        "Pair current updates with duas, Ramadan resources, 99 Names of Allah and foundational Islamic learning.",
      href: `/${locale}/learn`,
      accent:
        "from-[rgba(106,130,88,0.18)] via-[rgba(106,130,88,0.05)] to-transparent",
      icon: "book" as const,
    },
    {
      eyebrow: "Trust layer",
      title: "Methodology and trust",
      description:
        "See how AllHalal thinks about verification, classification and practical guidance behind the content.",
      href: `/${locale}/methodology`,
      accent:
        "from-[rgba(166,129,79,0.16)] via-[rgba(166,129,79,0.05)] to-transparent",
      icon: "sparkles" as const,
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
    <main className="relative min-h-screen overflow-hidden bg-bg-primary pb-24 pt-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <FAQSchema faqs={faqs} />

      <div className="pointer-events-none absolute inset-x-0 top-0 h-[38rem] bg-[radial-gradient(circle_at_14%_14%,rgba(244,185,66,0.18),transparent_26%),radial-gradient(circle_at_82%_18%,rgba(75,110,112,0.16),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.24),transparent_80%)]" />
      <div className="pointer-events-none absolute left-[-10rem] top-[30rem] h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle,rgba(143,95,70,0.14),transparent_72%)] blur-3xl" />
      <div className="pointer-events-none absolute right-[-10rem] top-[75rem] h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,rgba(78,109,120,0.16),transparent_72%)] blur-3xl" />

      <div className="container relative z-10">
        <section className="grid gap-8 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] xl:gap-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(47,37,30,0.08)] bg-white/78 px-4 py-2 text-[0.72rem] font-bold uppercase tracking-[0.24em] text-primary shadow-[0_14px_34px_rgba(43,34,24,0.06)] backdrop-blur-xl">
              <Sparkles className="h-3.5 w-3.5" />
              Live News Signal
            </div>

            <h1 className="mt-6 max-w-5xl text-[clamp(3rem,7vw,5.9rem)] font-black font-display leading-[0.95] tracking-[-0.05em] text-text-primary">
              Muslim news with
              <span className="block bg-[linear-gradient(135deg,#9f7b47_0%,#2f5458_38%,#5d714b_72%,#c7a167_100%)] bg-clip-text text-transparent">
                motion, depth and signal.
              </span>
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-text-secondary md:text-xl">
              Faith, finance, halal living and wider Ummah coverage in a single magazine-style hub,
              refreshed from trusted sources every 30 minutes.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <div className="rounded-full border border-[rgba(47,37,30,0.08)] bg-white/72 px-4 py-2 text-sm font-medium text-text-secondary backdrop-blur-md">
                {initialNews.length} live stories loaded
              </div>
              <div className="rounded-full border border-[rgba(47,37,30,0.08)] bg-white/72 px-4 py-2 text-sm font-medium text-text-secondary backdrop-blur-md">
                22+ Muslim sources
              </div>
              <div className="rounded-full border border-[rgba(47,37,30,0.08)] bg-white/72 px-4 py-2 text-sm font-medium text-text-secondary backdrop-blur-md">
                Faith • Finance • Family • Ummah
              </div>
            </div>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a
                href="#live-news"
                className="group inline-flex items-center justify-center gap-2 rounded-[1.3rem] bg-gradient-gold px-6 py-4 text-base font-bold text-[var(--color-text-on-gradient)] shadow-[0_20px_50px_rgba(176,144,98,0.24)]"
              >
                Open live feed
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <Link
                href={`/${locale}/news/${featuredPost.slug}`}
                className="inline-flex items-center justify-center gap-2 rounded-[1.3rem] border border-[rgba(47,37,30,0.1)] bg-white/78 px-6 py-4 text-base font-semibold text-text-primary shadow-[0_14px_36px_rgba(43,34,24,0.06)] backdrop-blur-md"
              >
                Read editor's guide
              </Link>
            </div>
          </div>

          <div className="grid gap-4">
            <Link
              href={`/${locale}/news/${featuredPost.slug}`}
              className="group relative overflow-hidden rounded-[2rem] border border-[rgba(47,37,30,0.08)] bg-[linear-gradient(180deg,#1d2b31,#11181d)] p-6 text-white shadow-[0_28px_80px_rgba(22,26,31,0.24)]"
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(244,185,66,0.2),transparent_24%),radial-gradient(circle_at_82%_16%,rgba(77,123,120,0.18),transparent_26%)]" />
              <div className="relative">
                <div className="flex items-center justify-between gap-4">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.22em] text-white/70">
                    <BookOpenText className="h-3.5 w-3.5 text-[#F4B942]" />
                    Editor's pick
                  </span>
                  <span className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-white/45">
                    Guide
                  </span>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {featuredPost.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-white/10 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-white/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h2 className="mt-6 text-3xl font-bold font-display leading-tight text-white transition-colors duration-300 group-hover:text-[#F4B942]">
                  {featuredPost.title}
                </h2>

                <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/72">
                  {featuredPost.summary}
                </p>

                <div className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#F4B942]">
                  Open featured guide
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </Link>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-[1.65rem] border border-[rgba(47,37,30,0.08)] bg-white/82 p-5 shadow-[0_18px_44px_rgba(43,34,24,0.06)] backdrop-blur-md">
                <div className="inline-flex items-center gap-2 rounded-full bg-[rgba(176,144,98,0.1)] px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.22em] text-primary">
                  <Clock3 className="h-3.5 w-3.5" />
                  Fresh guides
                </div>

                <div className="mt-4 space-y-3">
                  {recentPosts.slice(0, 2).map((post) => (
                    <Link
                      key={post.slug}
                      href={`/${locale}/news/${post.slug}`}
                      className="block rounded-[1.2rem] border border-[rgba(47,37,30,0.08)] bg-[rgba(247,243,236,0.86)] p-4 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white"
                    >
                      <div className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-text-muted">
                        {post.tags[0] || "Guide"}
                      </div>
                      <h3 className="mt-2 text-lg font-bold font-display leading-snug text-text-primary">
                        {post.title}
                      </h3>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="rounded-[1.65rem] border border-[rgba(47,37,30,0.08)] bg-[linear-gradient(180deg,rgba(255,255,255,0.84),rgba(241,238,231,0.9))] p-5 shadow-[0_18px_44px_rgba(43,34,24,0.06)]">
                <div className="text-[0.68rem] font-bold uppercase tracking-[0.22em] text-primary">
                  Why this page now feels alive
                </div>
                <div className="mt-4 space-y-3 text-sm leading-relaxed text-text-secondary">
                  <div className="rounded-[1.15rem] border border-[rgba(47,37,30,0.08)] bg-white/72 p-4">
                    Different card sizes create rhythm instead of repetition.
                  </div>
                  <div className="rounded-[1.15rem] border border-[rgba(47,37,30,0.08)] bg-white/72 p-4">
                    Stories without images get category-led visual fallbacks instead of empty shells.
                  </div>
                  <div className="rounded-[1.15rem] border border-[rgba(47,37,30,0.08)] bg-white/72 p-4">
                    Ad slots are already wired into the layout for future monetization.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8">
          <AdSlot id="news-top-banner" size="banner" label="Header Sponsorship" />
        </section>

        <section id="live-news" className="mt-8">
          <NewsHubClient initialNews={initialNews} />
        </section>

        <section className="mt-8">
          <AdSlot id="news-bottom-banner" size="banner" label="Footer Campaign Placement" />
        </section>

        <section className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {destinationCards.map((card) => {
            return (
              <Link
                key={card.title}
                href={card.href}
                className="group relative overflow-hidden rounded-[1.75rem] border border-[rgba(47,37,30,0.08)] bg-white/84 p-5 shadow-[0_18px_46px_rgba(43,34,24,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_58px_rgba(43,34,24,0.1)]"
              >
                <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${card.accent}`} />
                <div className="relative">
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-[0.68rem] font-bold uppercase tracking-[0.22em] text-primary">
                      {card.eyebrow}
                    </div>
                    <div className="rounded-full bg-white/72 p-2 text-primary shadow-[0_8px_20px_rgba(43,34,24,0.06)]">
                      <DestinationCardIcon icon={card.icon} className="h-4 w-4" />
                    </div>
                  </div>

                  <h3 className="mt-4 text-xl font-bold font-display leading-snug text-text-primary">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-text-secondary">{card.description}</p>

                  <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                    Explore destination
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            );
          })}
        </section>
      </div>
    </main>
  );
}
