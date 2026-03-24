"use client";

import React, { useMemo, useState } from "react";
import NewsGridCard from "@/components/briefs/NewsGridCard";
import { consecutiveBriefImageCropVariant } from "@/lib/briefCoverImage";
import { briefHasEditorialImage, type HomepageBriefLayout } from "@/lib/briefs";

export default function BriefsHomeSection({
  locale,
  layout,
}: {
  locale: string;
  layout: HomepageBriefLayout;
}) {
  const { hero, featured, compact } = layout;

  const gridStories = useMemo(() => {
    if (!hero) {
      return [];
    }
    const allStories = [hero, ...featured, ...compact].filter(
      (brief, index, stories) => stories.findIndex((story) => story.id === brief.id) === index,
    );
    return allStories.sort((a, b) => {
      const imgA = briefHasEditorialImage(a) ? 1 : 0;
      const imgB = briefHasEditorialImage(b) ? 1 : 0;
      if (imgB !== imgA) {
        return imgB - imgA;
      }
      const dateA = new Date(a.published_at || 0).getTime();
      const dateB = new Date(b.published_at || 0).getTime();
      return dateB - dateA;
    });
  }, [hero, featured, compact]);

  const categoryOptions = useMemo(() => {
    const names = new Set(gridStories.map((b) => b.category));
    return Array.from(names).sort();
  }, [gridStories]);

  const [activeCategory, setActiveCategory] = useState<string | "all">("all");
  const visibleStories =
    activeCategory === "all"
      ? gridStories
      : gridStories.filter((b) => b.category === activeCategory);

  if (!hero) {
    return null;
  }

  const newsPageUrl = `/news`;

  return (
    <section className="rounded-[1.8rem] border border-[rgba(47,37,30,0.08)] bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(249,246,241,0.94))] p-3 shadow-[0_20px_56px_rgba(43,34,24,0.06)] sm:p-5 md:rounded-[2.4rem] md:p-8 md:shadow-[0_26px_72px_rgba(43,34,24,0.06)]">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-[clamp(2rem,8vw,4rem)] font-black font-display leading-[0.96] tracking-[-0.04em] text-text-primary">
            Curated reads
          </h2>
          <p className="mt-2 max-w-3xl text-[0.98rem] leading-relaxed text-text-secondary md:mt-3 md:text-lg">
            Stories we highlight for faith, family and community — not the live wire feed. For breaking
            news from global desks, use the news desk.
          </p>
        </div>

        <a
          href={newsPageUrl}
          className="inline-flex w-full items-center justify-center rounded-full bg-[#173640] px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_44px_rgba(23,54,64,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#13303a] sm:w-auto"
        >
          Open news desk
        </a>
      </div>

      {categoryOptions.length > 0 ? (
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveCategory("all")}
            className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors ${
              activeCategory === "all"
                ? "border-[rgba(47,37,30,0.14)] bg-[#173640] text-white"
                : "border-[rgba(47,37,30,0.1)] bg-white/80 text-text-secondary hover:bg-white"
            }`}
          >
            All
          </button>
          {categoryOptions.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                activeCategory === cat
                  ? "border-[rgba(47,37,30,0.14)] bg-[#173640] text-white"
                  : "border-[rgba(47,37,30,0.1)] bg-white/80 text-text-secondary hover:bg-white"
              }`}
            >
              {cat}
            </button>
          ))}
          <a
            href={newsPageUrl}
            className="ml-1 text-xs font-semibold text-primary underline-offset-2 hover:underline"
          >
            Full desk
          </a>
        </div>
      ) : null}

      {visibleStories.length ? (
        <div className="mt-6 grid gap-3 sm:mt-8 sm:gap-4 md:grid-cols-2 xl:grid-cols-4">
          {visibleStories.map((brief, index) => (
            <NewsGridCard
              key={brief.id}
              brief={brief}
              locale="en"
              priority={index < 4}
              visualCropVariant={consecutiveBriefImageCropVariant(visibleStories, index)}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
}
