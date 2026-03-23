"use client";

import React, { useMemo, useState } from "react";
import CustomArticleGridCard from "@/components/articles/CustomArticleGridCard";
import type { CustomArticle } from "@/types/customArticle";

export default function CustomArticlesHomeSection({
  locale,
  articles,
  newsPageUrl,
}: {
  locale: string;
  articles: CustomArticle[];
  newsPageUrl: string;
}) {
  const categoryOptions = useMemo(() => {
    const names = new Set(articles.map((a) => a.category).filter(Boolean));
    return Array.from(names).sort();
  }, [articles]);

  const [activeCategory, setActiveCategory] = useState<string | "all">("all");
  const visible =
    activeCategory === "all"
      ? articles
      : articles.filter((a) => a.category === activeCategory);

  if (!articles.length) {
    return null;
  }

  return (
    <section className="rounded-[1.8rem] border border-[rgba(47,37,30,0.08)] bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(249,246,241,0.94))] p-3 shadow-[0_20px_56px_rgba(43,34,24,0.06)] sm:p-5 md:rounded-[2.4rem] md:p-8 md:shadow-[0_26px_72px_rgba(43,34,24,0.06)]">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-[clamp(2rem,8vw,4rem)] font-black font-display leading-[0.96] tracking-[-0.04em] text-text-primary">
            Curated reads
          </h2>
          <p className="mt-2 max-w-3xl text-[0.98rem] leading-relaxed text-text-secondary md:mt-3 md:text-lg">
            Original articles and guides from the allhalal.info team. For live wire headlines from
            many desks, open the news desk.
          </p>
        </div>

        <a
          href={newsPageUrl}
          className="inline-flex w-full items-center justify-center rounded-full bg-[#173640] px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_44px_rgba(23,54,64,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#13303a] sm:w-auto"
        >
          Open news desk
        </a>
      </div>

      {categoryOptions.length > 1 ? (
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
      ) : (
        <div className="mt-5">
          <a
            href={newsPageUrl}
            className="text-xs font-semibold text-primary underline-offset-2 hover:underline"
          >
            Full news desk
          </a>
        </div>
      )}

      <div className="mt-6 grid gap-3 sm:mt-8 sm:gap-4 md:grid-cols-2 xl:grid-cols-4">
        {visible.map((article, index) => (
          <CustomArticleGridCard
            key={article.id}
            article={article}
            locale={locale}
            priority={index < 4}
          />
        ))}
      </div>
    </section>
  );
}
