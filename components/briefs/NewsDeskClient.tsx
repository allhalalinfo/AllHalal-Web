"use client";

import { useMemo } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import AdSlot from "@/components/ads/AdSlot";
import NewsGridCard from "@/components/briefs/NewsGridCard";
import { filterBriefsByCategorySlug } from "@/lib/briefs";
import type { Brief } from "@/types/brief";

type Category = { slug: string; name: string };

export default function NewsDeskClient({
  briefs,
  categories,
  topAdSlot,
  inlineAdSlot,
  bottomAdSlot,
}: {
  briefs: Brief[];
  categories: Category[];
  topAdSlot?: string;
  inlineAdSlot?: string;
  bottomAdSlot?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeCategorySlug = searchParams.get("category") || undefined;
  const activeCategory = categories.find((c) => c.slug === activeCategorySlug);

  const freshBriefs = useMemo(
    () => filterBriefsByCategorySlug(briefs, activeCategorySlug).slice(0, 20),
    [briefs, activeCategorySlug],
  );

  function setCategory(slug?: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (slug) params.set("category", slug);
    else params.delete("category");
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }

  return (
    <>
      <div className="mt-5 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setCategory(undefined)}
          className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors ${
            !activeCategory
              ? "border-[rgba(47,37,30,0.14)] bg-[#173640] text-white"
              : "border-[rgba(47,37,30,0.1)] bg-white/80 text-text-secondary hover:bg-white"
          }`}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category.slug}
            type="button"
            onClick={() => setCategory(category.slug)}
            className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors ${
              activeCategory?.slug === category.slug
                ? "border-[rgba(47,37,30,0.14)] bg-[#173640] text-white"
                : "border-[rgba(47,37,30,0.1)] bg-white/80 text-text-secondary hover:bg-white"
            }`}
          >
            {category.name}
          </button>
        ))}
        <Link
          href="/"
          className="ml-1 text-xs font-semibold text-primary underline-offset-2 hover:underline"
        >
          Home
        </Link>
      </div>

      <AdSlot id="news-top-banner" slot={topAdSlot} size="banner" className="mt-8" />

      {freshBriefs.length ? (
        <div className="mt-6 grid gap-3 sm:mt-8 sm:gap-4 md:grid-cols-2 xl:grid-cols-4">
          {freshBriefs.flatMap((brief, index) => {
            const nodes = [
              <NewsGridCard key={brief.id} brief={brief} locale="en" priority={index < 8} />,
            ];
            if (index === 7) {
              nodes.push(
                <div key="news-inline-break" className="md:col-span-2 xl:col-span-4">
                  <AdSlot id="news-inline-break" slot={inlineAdSlot} size="banner" />
                </div>,
              );
            }
            return nodes;
          })}
        </div>
      ) : (
        <div className="mt-8 rounded-[1.8rem] border border-[rgba(47,37,30,0.08)] bg-white/72 p-8 text-center shadow-[0_18px_44px_rgba(43,34,24,0.04)]">
          <h2 className="mt-3 text-2xl font-bold font-display text-text-primary">
            No recent briefs available right now
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-text-secondary md:text-base">
            This page shows fresh live briefs from the backend. If it is empty, the current feed
            either has no recent stories in this category or has not updated yet.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/is-it-halal"
              className="rounded-full bg-[#173640] px-5 py-2.5 text-sm font-semibold text-white"
            >
              Halal checks
            </Link>
            <Link
              href="/learn"
              className="rounded-full border border-[rgba(47,37,30,0.12)] bg-white px-5 py-2.5 text-sm font-semibold text-text-primary"
            >
              Learn hub
            </Link>
          </div>
        </div>
      )}

      {freshBriefs.length ? (
        <div className="mt-10 flex flex-wrap items-center justify-between gap-3 rounded-[1.4rem] border border-[rgba(47,37,30,0.08)] bg-white/70 px-5 py-4">
          <p className="text-sm text-text-secondary">
            Checking ingredients? Browse verified product and additive guides.
          </p>
          <Link
            href="/is-it-halal"
            className="text-sm font-semibold text-primary underline-offset-2 hover:underline"
          >
            Open Is it Halal?
          </Link>
        </div>
      ) : null}

      <AdSlot
        id="news-bottom-rail"
        slot={bottomAdSlot}
        size="medium"
        className="mt-8"
      />
    </>
  );
}
