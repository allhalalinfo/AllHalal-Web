import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Footer from "@/components/layout/Footer";
import FinanceWidget from "@/components/portal/FinanceWidget";
import TodayForYouServer from "@/components/portal/TodayForYouServer";
import HeroSection from "@/components/sections/HeroSection";
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
      <main className="relative min-h-screen overflow-hidden bg-bg-primary">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema) }}
        />

        <HeroSection />

        <section
          id="portal-home"
          className="relative overflow-hidden pb-20 pt-12 home-ambient-grid"
        >
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[42rem] bg-[radial-gradient(circle_at_top_left,rgba(244,185,66,0.18),transparent_34%),radial-gradient(circle_at_78%_12%,rgba(75,122,136,0.18),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.25),transparent_82%)]" />
          <div className="pointer-events-none absolute left-[-10rem] top-[28rem] h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle,rgba(143,95,70,0.16),transparent_72%)] blur-3xl" />
          <div className="pointer-events-none absolute right-[-12rem] top-[70rem] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(78,109,120,0.18),transparent_70%)] blur-3xl" />

          <div className="container relative z-10 mx-auto max-w-7xl">
            <section className="mb-8">
              <TodayForYouServer locale={locale} />
            </section>

            <section className="mt-10">
              <FinanceWidget locale={locale} />
            </section>

            <section className="mt-10">
              <NewsFeedWidget locale={locale} initialNews={initialNews} />
            </section>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
