import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import AdSlot from "@/components/ads/AdSlot";
import BriefMediaClient from "@/components/briefs/BriefMediaClient";
import { type Brief } from "@/types/brief";
import {
  filterFreshBriefs,
  formatTimeAgo,
  getBriefCategories,
  getBriefDisplayTimestamp,
  getFeedBriefs,
} from "@/lib/briefs";

const NEWS_FRESHNESS_DAYS = 30;
const NEWS_TOP_AD_SLOT = process.env.NEXT_PUBLIC_ADSENSE_SLOT_NEWS_TOP;
const NEWS_INLINE_AD_SLOT = process.env.NEXT_PUBLIC_ADSENSE_SLOT_NEWS_INLINE;
const NEWS_BOTTOM_AD_SLOT = process.env.NEXT_PUBLIC_ADSENSE_SLOT_NEWS_BOTTOM;

function balanceNewsDeskBriefs(briefs: Brief[], limit = 20) {
  const result: Brief[] = [];
  const sourceCounts = new Map<string, number>();

  for (const brief of briefs) {
    if (result.length >= limit) {
      break;
    }

    const sourceName = brief.sources[0]?.name || brief.primary_source || "Unknown source";
    const sourceCount = sourceCounts.get(sourceName) ?? 0;

    if (sourceCount >= 3) {
      continue;
    }

    result.push(brief);
    sourceCounts.set(sourceName, sourceCount + 1);
  }

  if (result.length < limit) {
    for (const brief of briefs) {
      if (result.length >= limit) {
        break;
      }

      if (!result.some((entry) => entry.id === brief.id)) {
        result.push(brief);
      }
    }
  }

  return result;
}

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

function NewsMeta({
  brief,
  small = false,
}: {
  brief: Brief;
  small?: boolean;
}) {
  const displayTimestamp = getBriefDisplayTimestamp(brief);

  return (
    <div
      className={`flex flex-wrap items-center gap-x-3 gap-y-1 text-text-muted ${
        small ? "text-[0.78rem]" : "text-sm"
      }`}
    >
      <span className="font-medium text-text-secondary">{brief.sources[0]?.name}</span>
      {displayTimestamp ? (
        <>
          <span aria-hidden="true">•</span>
          <time dateTime={displayTimestamp}>{formatTimeAgo(displayTimestamp)}</time>
        </>
      ) : null}
      {brief.source_count > 1 ? (
        <>
          <span aria-hidden="true">•</span>
          <span>{brief.source_count} sources</span>
        </>
      ) : null}
    </div>
  );
}

function LeadStory({
  brief,
  locale,
}: {
  brief: Brief;
  locale: string;
}) {
  const href = `/${locale}/news/${brief.slug}`;

  return (
    <Link
      href={href}
      className="group grid overflow-hidden rounded-[2rem] border border-[rgba(47,37,30,0.08)] bg-white/90 shadow-[0_20px_60px_rgba(43,34,24,0.06)] transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_26px_72px_rgba(43,34,24,0.08)] lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]"
    >
      <div className="relative aspect-[1.4/1] overflow-hidden bg-[rgba(243,238,230,0.72)] lg:aspect-auto">
        <BriefMediaClient
          brief={brief}
          priority
          sizes="(min-width: 1280px) 560px, (min-width: 1024px) 46vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />
      </div>

      <div className="flex flex-col p-6 md:p-7">
        <div>
          <NewsMeta brief={brief} />
        </div>

        <h2 className="mt-4 text-[clamp(2rem,3.5vw,3.6rem)] font-black font-display leading-[0.96] tracking-[-0.04em] text-text-primary transition-colors duration-300 group-hover:text-primary">
          {brief.title}
        </h2>

        <p className="mt-4 text-base leading-relaxed text-text-secondary md:text-lg">
          {brief.dek}
        </p>

        <p className="mt-4 line-clamp-4 text-[0.98rem] leading-7 text-text-secondary">
          {brief.summary.split("\n\n")[0]}
        </p>

        <div className="mt-auto pt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">
          Open brief
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
        </div>
      </div>
    </Link>
  );
}

function HeadlineCard({
  brief,
  locale,
}: {
  brief: Brief;
  locale: string;
}) {
  const href = `/${locale}/news/${brief.slug}`;

  return (
    <Link
      href={href}
      className="group grid grid-cols-[1fr_auto] items-center gap-4 rounded-[1.45rem] border border-[rgba(47,37,30,0.08)] bg-white/86 p-4 shadow-[0_14px_34px_rgba(43,34,24,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_18px_42px_rgba(43,34,24,0.06)]"
    >
      <div className="min-w-0">
        <NewsMeta brief={brief} small />
        <h3 className="mt-2 line-clamp-3 text-[1.18rem] font-bold leading-snug text-text-primary transition-colors duration-300 group-hover:text-primary">
          {brief.title}
        </h3>
      </div>

      <div className="relative hidden h-24 w-24 overflow-hidden rounded-[1.1rem] border border-[rgba(47,37,30,0.08)] bg-[rgba(243,238,230,0.68)] md:block">
        <BriefMediaClient
          brief={brief}
          sizes="96px"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
    </Link>
  );
}

function StreamCard({
  brief,
  locale,
}: {
  brief: Brief;
  locale: string;
}) {
  const href = `/${locale}/news/${brief.slug}`;

  return (
    <Link
      href={href}
      className="group flex h-full flex-col rounded-[1.55rem] border border-[rgba(47,37,30,0.08)] bg-white/86 p-4 shadow-[0_14px_36px_rgba(43,34,24,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_18px_46px_rgba(43,34,24,0.06)]"
    >
      <div className="relative aspect-[1.8/1] overflow-hidden rounded-[1.15rem] border border-[rgba(47,37,30,0.08)] bg-[rgba(243,238,230,0.68)]">
        <BriefMediaClient
          brief={brief}
          sizes="(min-width: 1280px) 360px, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />
      </div>

      <div className="mt-4">
        <NewsMeta brief={brief} small />
        <h3 className="mt-2 line-clamp-3 text-[1.16rem] font-bold leading-snug text-text-primary transition-colors duration-300 group-hover:text-primary">
          {brief.title}
        </h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-text-secondary">{brief.dek}</p>
      </div>
    </Link>
  );
}

export default async function NewsDeskPage(props: {
  params: Promise<{ locale: string }>;
  searchParams?: Promise<{ category?: string }>;
}) {
  const { locale } = await props.params;
  const searchParams = await props.searchParams;
  const categories = await getBriefCategories();
  const activeCategorySlug = searchParams?.category;
  const activeCategory = categories.find((category) => category.slug === activeCategorySlug);
  const { items: briefs, total } = await getFeedBriefs({
    category: activeCategorySlug,
    limit: 50,
    offset: 0,
  });
  const freshBriefs = balanceNewsDeskBriefs(filterFreshBriefs(briefs, NEWS_FRESHNESS_DAYS), 20);

  const [lead, ...rest] = freshBriefs;
  const headlines = rest.slice(0, 4);
  const stream = rest.slice(4);

  return (
    <main className="relative min-h-screen overflow-hidden bg-bg-primary pb-24 pt-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[34rem] bg-[radial-gradient(circle_at_14%_14%,rgba(244,185,66,0.16),transparent_24%),radial-gradient(circle_at_82%_18%,rgba(75,110,112,0.12),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.22),transparent_82%)]" />

      <div className="container relative z-10">
        <section className="rounded-[2.4rem] border border-[rgba(47,37,30,0.08)] bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(249,246,241,0.94))] p-6 shadow-[0_26px_72px_rgba(43,34,24,0.06)] md:p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="mt-2 text-[clamp(2.5rem,4.2vw,4.3rem)] font-black font-display leading-[0.95] tracking-[-0.04em] text-text-primary">
                Fresh Muslim news, easier to follow
              </h1>
              <p className="mt-3 max-w-3xl text-base leading-relaxed text-text-secondary md:text-lg">
                Current briefs from trusted Muslim sources, with clear attribution.
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <Link
              href={`/${locale}/news`}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300 ${
                !activeCategory
                  ? "border-[rgba(47,37,30,0.12)] bg-[#173640] text-white"
                  : "border-[rgba(47,37,30,0.08)] bg-white/72 text-text-secondary hover:bg-white"
              }`}
            >
              All
            </Link>
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/${locale}/news?category=${encodeURIComponent(category.slug)}`}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300 ${
                  activeCategory?.slug === category.slug
                    ? "border-[rgba(47,37,30,0.12)] bg-white text-text-primary shadow-[0_12px_34px_rgba(43,34,24,0.05)]"
                    : "border-[rgba(47,37,30,0.08)] bg-white/72 text-text-secondary hover:bg-white"
                }`}
              >
                {category.name}
              </Link>
            ))}
          </div>

          <AdSlot
            id="news-top-banner"
            slot={NEWS_TOP_AD_SLOT}
            size="banner"
            className="mt-8"
          />

          {lead ? (
            <div className="mt-8 grid gap-5 xl:grid-cols-[minmax(0,1.08fr)_minmax(20rem,0.92fr)]">
              <LeadStory brief={lead} locale={locale} />

              <div className="grid gap-4">
                {headlines.map((brief) => (
                  <HeadlineCard key={brief.id} brief={brief} locale={locale} />
                ))}
              </div>
            </div>
          ) : null}

          {stream.length ? (
            <section className="mt-8">
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {stream.map((brief, index) => (
                  <div key={brief.id} className="contents">
                    <StreamCard brief={brief} locale={locale} />
                    {index === 5 ? (
                      <div className="md:col-span-2 xl:col-span-3">
                        <AdSlot
                          id="news-inline-break"
                          slot={NEWS_INLINE_AD_SLOT}
                          size="banner"
                        />
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {!lead && !headlines.length && !stream.length ? (
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

          {total > freshBriefs.length && freshBriefs.length > 0 ? (
            <p className="mt-6 text-sm leading-7 text-text-muted">
              Older items from the backend feed are currently excluded here so the main news desk
              stays focused on recent reporting.
            </p>
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
