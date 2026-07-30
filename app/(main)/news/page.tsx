import type { Metadata } from "next";
import { Suspense } from "react";
import NewsDeskClient from "@/components/briefs/NewsDeskClient";
import { generateMetadata as genMeta, generateItemListJSONLD, SITE_URL } from "@/lib/seo/metadata";
import {
  filterFreshBriefs,
  flattenHomepageBriefLayout,
  getBriefCategories,
  getFeedBriefs,
  getHomepageBriefLayout,
  mergeHomepageBriefsWithFeed,
} from "@/lib/briefs";

const NEWS_FRESHNESS_DAYS = 30;
const NEWS_TOP_AD_SLOT = process.env.NEXT_PUBLIC_ADSENSE_SLOT_NEWS_TOP;
const NEWS_INLINE_AD_SLOT = process.env.NEXT_PUBLIC_ADSENSE_SLOT_NEWS_INLINE;
const NEWS_BOTTOM_AD_SLOT = process.env.NEXT_PUBLIC_ADSENSE_SLOT_NEWS_BOTTOM;

/**
 * Category chips use `?category=` on the client only.
 * Reading searchParams here would opt the whole route out of ISR and force
 * a cold origin render (and feed API calls) on every request/crawl.
 */
export const revalidate = 600;

export const metadata: Metadata = genMeta({
  title: "allhalal.info News | Original Muslim Briefs, Finance, Faith and Family",
  description:
    "Read allhalal.info briefs across faith, Islamic finance, family, halal living, wellness and Ummah coverage, built from trusted sources with clear attribution.",
  path: "/news",
  keywords: [
    "Muslim news",
    "Islamic news",
    "Muslim world news",
    "Islamic finance news",
    "halal living news",
    "Muslim family news",
  ],
});

export default async function NewsDeskPage() {
  const categories = await getBriefCategories();

  // Fetch the unfiltered desk once; category tabs filter client-side so ISR stays intact.
  const [homepageLayout, feedResult] = await Promise.all([
    getHomepageBriefLayout(),
    getFeedBriefs({
      limit: 48,
      offset: 0,
    }),
  ]);

  const homeFresh = filterFreshBriefs(
    flattenHomepageBriefLayout(homepageLayout),
    NEWS_FRESHNESS_DAYS,
  );
  const feedFresh = filterFreshBriefs(feedResult.items, NEWS_FRESHNESS_DAYS);
  const mergedBriefs = mergeHomepageBriefsWithFeed(homeFresh, feedFresh).slice(0, 48);

  const itemListSchema = generateItemListJSONLD({
    name: "Muslim World News",
    description: "Original Muslim briefs, finance, faith and family news",
    url: `${SITE_URL}/news`,
    items: mergedBriefs.slice(0, 15).map((brief) => ({
      name: brief.title,
      url: brief.sources[0]?.url || `${SITE_URL}/news`,
      description: brief.summary || brief.dek || brief.title,
      image: brief.image_url || undefined,
    })),
  });

  return (
    <main className="relative min-h-screen overflow-hidden bg-bg-primary pb-24 pt-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: itemListSchema }}
      />

      <div className="pointer-events-none absolute inset-x-0 top-0 h-[34rem] bg-[radial-gradient(circle_at_14%_14%,rgba(244,185,66,0.16),transparent_24%),radial-gradient(circle_at_82%_18%,rgba(75,110,112,0.12),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.22),transparent_82%)]" />

      <div className="container relative z-10">
        <section className="rounded-[1.8rem] border border-[rgba(47,37,30,0.08)] bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(249,246,241,0.94))] p-3 shadow-[0_20px_56px_rgba(43,34,24,0.06)] sm:p-5 md:rounded-[2.4rem] md:p-8 md:shadow-[0_26px_72px_rgba(43,34,24,0.06)]">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-[clamp(2rem,8vw,4rem)] font-black font-display leading-[0.96] tracking-[-0.04em] text-text-primary">
                Muslim World Today
              </h1>
            </div>
          </div>

          <Suspense
            fallback={
              <div className="mt-8 h-40 animate-pulse rounded-[1.4rem] bg-white/50" />
            }
          >
            <NewsDeskClient
              briefs={mergedBriefs}
              categories={categories}
              topAdSlot={NEWS_TOP_AD_SLOT}
              inlineAdSlot={NEWS_INLINE_AD_SLOT}
              bottomAdSlot={NEWS_BOTTOM_AD_SLOT}
            />
          </Suspense>
        </section>
      </div>
    </main>
  );
}
