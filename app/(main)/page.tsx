import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import BriefsHomeSection from "@/components/briefs/BriefsHomeSection";
import CustomArticlesHomeSection from "@/components/articles/CustomArticlesHomeSection";
import FinanceWidget from "@/components/portal/FinanceWidget";
import TodayForYouServer from "@/components/portal/TodayForYouServer";
import { fetchCustomArticlesList } from "@/lib/customArticles";
import { getHomepageBriefLayout } from "@/lib/briefs";
import { SITE_URL } from "@/lib/seo/metadata";

/** Fresher portal home when custom articles or briefs change (reduces stale HTML vs curl). */
export const revalidate = 120;

export const metadata: Metadata = {
  title: "allhalal.info Muslim Portal | Prayer Times, Halal Guides, Finance & News",
  description:
    "allhalal.info is a Muslim portal built around prayer times, Islamic calendar, live finance signals, Muslim news, halal guides and daily Islamic utilities.",
  keywords: [
    "muslim portal",
    "prayer times",
    "halal guides",
    "islamic calendar",
    "muslim news",
    "islamic finance",
    "zakat calculator",
    "duas",
    "99 names of Allah",
  ],
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "allhalal.info Muslim Portal | Prayer Times, Finance Signals, Muslim News & Islamic Learning",
    description:
      "allhalal.info is a Muslim portal built around prayer times, Islamic calendar, live finance signals, Muslim news, halal guides and daily Islamic utilities.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "allhalal.info Muslim Portal | Prayer Times, Finance Signals, Muslim News & Islamic Learning",
    description:
      "allhalal.info is a Muslim portal built around prayer times, Islamic calendar, live finance signals, Muslim news, halal guides and daily Islamic utilities.",
  },
};

export default async function PortalHomePage(props: { params: Promise<{}> }) {
  const [customList, homepageBriefLayout] = await Promise.all([
    fetchCustomArticlesList({ page: 1, limit: 12 }),
    getHomepageBriefLayout(),
  ]);
  const useCustomArticles = customList.articles.length > 0;
  const newsPageUrl = `/news`;

  const homeSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: "allhalal.info",
        url: SITE_URL,
        description:
          "Muslim portal for prayer times, Islamic calendar, halal guides, finance signals and Muslim news.",
        potentialAction: {
          "@type": "SearchAction",
          target: `${SITE_URL}/is-it-halal?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}#webpage`,
        url: `${SITE_URL}`,
        name: "allhalal.info Muslim Portal",
        description:
          "Daily Muslim portal for prayer times, Islamic calendar, live finance signals, Muslim news and Islamic learning.",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        inLanguage: "en",
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

        <section id="portal-home" className="relative overflow-hidden pb-20 pt-32 home-ambient-grid">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[30rem] bg-[radial-gradient(circle_at_top_left,rgba(244,185,66,0.16),transparent_34%),radial-gradient(circle_at_80%_12%,rgba(75,122,136,0.14),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.2),transparent_82%)]" />
          <div className="pointer-events-none absolute left-[-10rem] top-[20rem] h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle,rgba(143,95,70,0.14),transparent_72%)] blur-3xl" />
          <div className="pointer-events-none absolute right-[-12rem] top-[66rem] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(78,109,120,0.16),transparent_70%)] blur-3xl" />

          <div className="container relative z-10 mx-auto max-w-7xl">
            {/* Visually hidden H1 for SEO (main page already has visual hierarchy) */}
            <h1 className="sr-only">
              allhalal.info - Muslim Portal for Prayer Times, Halal Guides, Finance and News
            </h1>

            <section id="prayer-dashboard" className="mb-8">
              <TodayForYouServer locale="en" />
            </section>

            <section className="mt-8">
              <FinanceWidget />
            </section>

            <section className="mt-8">
              {useCustomArticles ? (
                <CustomArticlesHomeSection
                  locale="en"
                  articles={customList.articles}
                  newsPageUrl={newsPageUrl}
                />
              ) : (
                <BriefsHomeSection locale="en" layout={homepageBriefLayout} />
              )}
            </section>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
