import type { Metadata } from "next";
import Link from "next/link";
import AdSlot from "@/components/ads/AdSlot";
import NewsGridCard from "@/components/briefs/NewsGridCard";
import {
  filterBriefsByCategorySlug,
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

// 🔧 OPTIMIZATION (Phase 1): Increased from 300s (5min) to 600s (10min)
// Reduces origin transfer by 50% on news page regenerations
export const revalidate = 600; // Cache for 10 minutes, regenerate in background

export const metadata: Metadata = {
  title: "allhalal.info News | Original Muslim Briefs, Finance, Faith and Family",
  description:
    "Read allhalal.info briefs across faith, Islamic finance, family, halal living, wellness and Ummah coverage, built from trusted sources with clear attribution.",
  openGraph: {
    title: "allhalal.info News | Original Muslim Briefs, Finance, Faith and Family",
    description:
      "Read allhalal.info briefs across faith, Islamic finance, family, halal living, wellness and Ummah coverage, built from trusted sources with clear attribution.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "allhalal.info News | Original Muslim Briefs, Finance, Faith and Family",
    description:
      "Read allhalal.info briefs across faith, Islamic finance, family, halal living, wellness and Ummah coverage, built from trusted sources with clear attribution.",
  },
};

export default async function NewsDeskPage(props: {
  params: Promise<{}>;
  searchParams?: Promise<{ category?: string }>;
}) {
  const searchParams = await props.searchParams;
  const categories = await getBriefCategories();
  const activeCategorySlug = searchParams?.category;
  const activeCategory = categories.find((category) => category.slug === activeCategorySlug);

  // 🔧 OPTIMIZATION (Phase 1): Reduced limit from 120 to 30
  // We only display 20 items, need ~10 buffer for freshness filtering
  // Saves 75% of API bandwidth on news page
  const [homepageLayout, feedResult] = await Promise.all([
    getHomepageBriefLayout(),
    getFeedBriefs({
      category: activeCategorySlug,
      limit: 30,
      offset: 0,
    }),
  ]);

  const homeFresh = filterFreshBriefs(
    filterBriefsByCategorySlug(
      flattenHomepageBriefLayout(homepageLayout),
      activeCategorySlug,
    ),
    NEWS_FRESHNESS_DAYS,
  );
  const feedFresh = filterFreshBriefs(feedResult.items, NEWS_FRESHNESS_DAYS);
  const mergedBriefs = mergeHomepageBriefsWithFeed(homeFresh, feedFresh);
  const freshBriefs = mergedBriefs.slice(0, 20); // Reduced to 20 for optimal performance
  const { total: feedTotal } = feedResult;

  return (
    <main className="relative min-h-screen overflow-hidden bg-bg-primary pb-24 pt-32">
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

          <div className="mt-5 flex flex-wrap items-center gap-2">
            <Link
              href={`/news`}
              className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                !activeCategory
                  ? "border-[rgba(47,37,30,0.14)] bg-[#173640] text-white"
                  : "border-[rgba(47,37,30,0.1)] bg-white/80 text-text-secondary hover:bg-white"
              }`}
            >
              All
            </Link>
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/news?category=${encodeURIComponent(category.slug)}`}
                className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                  activeCategory?.slug === category.slug
                    ? "border-[rgba(47,37,30,0.14)] bg-[#173640] text-white"
                    : "border-[rgba(47,37,30,0.1)] bg-white/80 text-text-secondary hover:bg-white"
                }`}
              >
                {category.name}
              </Link>
            ))}
            <Link
              href={``}
              className="ml-1 text-xs font-semibold text-primary underline-offset-2 hover:underline"
            >
              Home
            </Link>
          </div>

          <AdSlot
            id="news-top-banner"
            slot={NEWS_TOP_AD_SLOT}
            size="banner"
            className="mt-8"
          />

          {freshBriefs.length ? (
            <div className="mt-6 grid gap-3 sm:mt-8 sm:gap-4 md:grid-cols-2 xl:grid-cols-4">
              {freshBriefs.flatMap((brief, index) => {
                const nodes = [
                  <NewsGridCard
                    key={brief.id}
                    brief={brief}
                    locale="en"
                    priority={index < 8}
                  />,
                ];
                if (index === 7) {
                  nodes.push(
                    <div
                      key="news-inline-break"
                      className="md:col-span-2 xl:col-span-4"
                    >
                      <AdSlot
                        id="news-inline-break"
                        slot={NEWS_INLINE_AD_SLOT}
                        size="banner"
                      />
                    </div>,
                  );
                }
                return nodes;
              })}
            </div>
          ) : null}

          {!freshBriefs.length ? (
            <div className="mt-8 rounded-[1.8rem] border border-[rgba(47,37,30,0.08)] bg-white/72 p-8 text-center shadow-[0_18px_44px_rgba(43,34,24,0.04)]">
              <h2 className="mt-3 text-2xl font-bold font-display text-text-primary">
                No recent briefs available right now
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-text-secondary md:text-base">
                This page now shows only fresh live briefs from the backend. If it is empty, the
                current feed either has no recent stories or has not updated yet.
              </p>
            </div>
          ) : null}

          <AdSlot
            id="news-bottom-rail"
            slot={NEWS_BOTTOM_AD_SLOT}
            size="medium"
            className="mt-8"
          />
        </section>
      </div>
    </main>
  );
}
