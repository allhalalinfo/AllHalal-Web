import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import Footer from "@/components/layout/Footer";
import TodayForYouServer from "@/components/portal/TodayForYouServer";
import { getAggregatedNews } from "@/lib/newsFeed";
import { SITE_URL } from "@/lib/seo/metadata";

const NewsFeedWidget = dynamic(() => import("@/components/portal/NewsFeedWidget"), {
  loading: () => (
    <div className="rounded-[2rem] border border-border bg-white/80 p-8 shadow-[0_18px_54px_rgba(48,40,29,0.08)] animate-pulse">
      <div className="h-4 w-32 rounded bg-gray-200 mb-4" />
      <div className="h-10 w-3/4 rounded bg-gray-200 mb-3" />
      <div className="h-4 w-1/2 rounded bg-gray-200 mb-6" />
      <div className="h-64 rounded-[1.5rem] bg-gray-200" />
    </div>
  ),
});

export const metadata: Metadata = {
  title: "AllHalal Muslim Portal | Prayer Times, Halal Checker, Finance & Islamic Learning",
  description:
    "AllHalal is a Muslim portal for prayer times, halal food and ingredient checks, Islamic finance guides, Muslim news, duas, 99 Names of Allah, Islamic calendar and daily guidance.",
  keywords: [
    "muslim portal",
    "prayer times",
    "halal checker",
    "halal food",
    "e numbers halal",
    "islamic calendar",
    "muslim news",
    "islamic finance",
    "zakat calculator",
    "duas",
    "99 names of Allah",
  ],
  openGraph: {
    title: "AllHalal Muslim Portal | Prayer Times, Halal Checker, Finance & Islamic Learning",
    description:
      "AllHalal is a Muslim portal for prayer times, halal food and ingredient checks, Islamic finance guides, Muslim news, duas, 99 Names of Allah, Islamic calendar and daily guidance.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AllHalal Muslim Portal | Prayer Times, Halal Checker, Finance & Islamic Learning",
    description:
      "AllHalal is a Muslim portal for prayer times, halal food and ingredient checks, Islamic finance guides, Muslim news, duas, 99 Names of Allah, Islamic calendar and daily guidance.",
  },
};

export default async function PortalHomePage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  const initialNews = await getAggregatedNews({ limit: 24 });

  const popularGuides = [
    {
      title: "How Halal Certification Works",
      description: "Understand certification bodies, their standards, and what a halal logo really means across different regions.",
      href: `/${locale}/is-it-halal/halal-certification-standards`,
      tag: "Certification",
    },
    {
      title: "Complete Guide to E-Numbers",
      description: "Learn which E-codes are halal, doubtful, or haram. Understand food additives from an Islamic perspective.",
      href: `/${locale}/is-it-halal`,
      tag: "E-Codes Guide",
    },
    {
      title: "Prayer times & Qibla",
      description: "Find accurate prayer times for your location and learn how Asr calculation differs by madhhab.",
      href: `/${locale}/prayer-times`,
      tag: "Daily tool",
    },
    {
      title: "Boycott Checker",
      description: "Check if brands support oppression. Our BDS database helps you make ethical purchasing decisions.",
      href: `/${locale}/boycott-checker`,
      tag: "Ethics",
    },
  ];

  const trendingSearches = [
    {
      label: "Halal certification guide",
      href: `/${locale}/is-it-halal/halal-certification-standards`,
      tag: "Education",
    },
    {
      label: "Download iOS app",
      href: `/${locale}/app`,
      tag: "App",
    },
    {
      label: "Prayer times today",
      href: `/${locale}/prayer-times`,
      tag: "Daily use",
    },
    {
      label: "Boycott checker",
      href: `/${locale}/boycott-checker`,
      tag: "Ethics",
    },
    {
      label: "Zakat calculator",
      href: `/${locale}/finance/zakat-calculator`,
      tag: "Finance",
    },
    {
      label: "99 Names of Allah",
      href: `/${locale}/learn/99-names`,
      tag: "Learning",
    },
  ];

  const homeSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: "AllHalal",
        url: SITE_URL,
        description:
          "Muslim portal for prayer times, halal food checks, Islamic finance, Muslim news and Islamic learning.",
        potentialAction: {
          "@type": "SearchAction",
          target: `${SITE_URL}/${locale}/is-it-halal?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/${locale}#webpage`,
        url: `${SITE_URL}/${locale}`,
        name: "AllHalal Muslim Portal",
        description:
          "Daily Muslim portal for prayer times, halal checker, Islamic calendar, Islamic finance, Muslim news and Islamic learning.",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        inLanguage: locale,
      },
    ],
  };

  return (
    <>
      <main className="relative overflow-hidden pt-32 pb-20 bg-bg-primary min-h-screen home-ambient-grid">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[42rem] bg-[radial-gradient(circle_at_top_left,rgba(244,185,66,0.18),transparent_34%),radial-gradient(circle_at_78%_12%,rgba(75,122,136,0.18),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.25),transparent_82%)]" />
        <div className="pointer-events-none absolute left-[-10rem] top-[28rem] h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle,rgba(143,95,70,0.16),transparent_72%)] blur-3xl" />
        <div className="pointer-events-none absolute right-[-12rem] top-[70rem] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(78,109,120,0.18),transparent_70%)] blur-3xl" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema) }}
        />

        <div className="container relative z-10 max-w-7xl mx-auto">
          <section className="mb-8">
            <TodayForYouServer locale={locale} />
          </section>

          <section className="mt-10">
            <NewsFeedWidget locale={locale} initialNews={initialNews} />
          </section>

          <section className="mt-16 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="rounded-[2rem] border border-border bg-white p-8 shadow-card">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.22em] text-primary mb-3">
                    Useful Pages
                  </p>
                  <h2 className="text-3xl md:text-4xl font-bold font-display text-text-primary">
                    Keep the most useful pages close.
                  </h2>
                </div>
                <Link href={`/${locale}/blog`} className="text-sm font-bold text-primary hover:underline shrink-0">
                  View all guides →
                </Link>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {popularGuides.map((guide) => (
                  <Link
                    key={guide.title}
                    href={guide.href}
                    className="rounded-[1.5rem] border border-border bg-bg-secondary/60 p-5 hover:border-primary/30 hover:bg-white transition-colors"
                  >
                    <span className="inline-flex px-2.5 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-[0.18em] mb-3">
                      {guide.tag}
                    </span>
                    <h3 className="text-xl font-bold font-display text-text-primary mb-2">
                      {guide.title}
                    </h3>
                    <p className="text-sm text-text-secondary leading-relaxed">{guide.description}</p>
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-bg-dark p-8 text-text-inverse shadow-2xl">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-accent-yellow mb-3">
                Quick Links
              </p>
              <h2 className="text-3xl font-bold font-display mb-4">
                Use the homepage, then go deeper.
              </h2>
              <p className="text-text-inverse-secondary leading-relaxed mb-6">
                Prayer, halal answers, learning, finance and Muslim updates should feel connected, not scattered.
              </p>

              <div className="flex flex-wrap gap-3 mb-6">
                {trendingSearches.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <div className="flex flex-col gap-3">
                <Link
                  href={`/${locale}/methodology`}
                  className="inline-flex items-center justify-center rounded-xl bg-gradient-gold px-5 py-3 font-bold text-[#4A3319]"
                >
                  Review our methodology
                </Link>
                <Link
                  href={`/${locale}/app`}
                  className="inline-flex items-center justify-center rounded-xl border border-white/10 px-5 py-3 font-semibold text-white hover:bg-white/5 transition-colors"
                >
                  Explore app features
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
