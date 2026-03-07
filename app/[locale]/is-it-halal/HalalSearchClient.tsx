"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { HalalItem } from "@/data/halalItems";
import SuggestProductForm from "@/components/is-it-halal/SuggestProductForm";

export default function HalalSearchClient({ items, locale }: { items: HalalItem[], locale: string }) {
  const [query, setQuery] = useState("");

  const filteredItems = useMemo(() => {
    if (!query.trim()) return items;
    const lowerQuery = query.toLowerCase();
    return items.filter((item) => {
      const matchName = item.name.toLowerCase().includes(lowerQuery);
      const matchAlias = item.aliases?.some((alias) => alias.toLowerCase().includes(lowerQuery));
      return matchName || matchAlias;
    });
  }, [items, query]);

  const quickSearches = ["Gelatin", "E120", "E471", "Doritos", "Takis", "Red Bull"];

  return (
    <section className="rounded-[2rem] border border-border bg-white p-8 shadow-card">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-primary mb-3">
            Search The Directory
          </p>
          <h2 className="text-3xl md:text-4xl font-bold font-display text-text-primary mb-3">
            Search a product, ingredient or E-code without leaving the page.
          </h2>
          <p className="text-text-secondary leading-relaxed max-w-2xl">
            Start with the exact thing you are unsure about. The checker is strongest when it helps users move from one specific question into the right related answers.
          </p>
        </div>
        <div className="rounded-[1.25rem] border border-border bg-bg-secondary/60 px-4 py-3 text-sm text-text-secondary shrink-0">
          {filteredItems.length} visible answers
        </div>
      </div>

      <div className="relative mb-5">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg className="w-5 h-5 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search products, ingredients, E-codes..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-4 bg-bg-card border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-text-primary placeholder-text-muted transition-all shadow-sm"
        />
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {quickSearches.map((term) => (
          <button
            key={term}
            type="button"
            onClick={() => setQuery(term)}
            className="px-3 py-2 rounded-full border border-border bg-bg-secondary/50 text-sm font-semibold text-text-primary hover:border-primary/30 hover:bg-white transition-colors"
          >
            {term}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-16">
        {filteredItems.map((item) => (
          <Link
            key={item.slug}
            href={`/${locale}/is-it-halal/${item.slug}`}
            className="block bg-bg-card border border-border p-6 rounded-2xl hover:border-primary transition-colors shadow-sm"
          >
            <div className="flex items-start justify-between gap-4 mb-3">
              <h2 className="text-xl font-bold font-display text-text-primary leading-tight">{item.name}</h2>
              <span
                className={`shrink-0 inline-block px-3 py-1 rounded-full text-xs font-bold ${
                  item.verdict === "halal"
                    ? "bg-green-500/10 text-green-700 dark:text-green-400"
                    : item.verdict === "haram"
                      ? "bg-red-500/10 text-red-700 dark:text-red-400"
                      : "bg-amber-500/10 text-amber-700 dark:text-amber-400"
                }`}
              >
                {item.verdict.toUpperCase()}
              </span>
            </div>
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex px-2.5 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-[0.18em]">
                {item.category.replace("-", " ")}
              </span>
              {item.priority === "high" && (
                <span className="inline-flex px-2.5 py-1 rounded-full bg-[#F5E7C2] text-[#6A4A18] text-[10px] font-bold uppercase tracking-[0.18em]">
                  Popular query
                </span>
              )}
            </div>
            <p className="text-text-secondary text-sm">{item.shortReason}</p>
            <span className="inline-flex items-center gap-1 mt-4 text-sm font-bold text-primary">
              Read verdict <span aria-hidden="true">→</span>
            </span>
          </Link>
        ))}
        {filteredItems.length === 0 && (
          <div className="col-span-1 lg:col-span-2 text-center py-12 px-4 sm:px-6">
            <SuggestProductForm initialProductName={query} locale={locale} />
          </div>
        )}
      </div>

      <div className="rounded-[1.6rem] border border-border bg-bg-secondary/45 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold font-display text-text-primary mb-2">
              Need a product that is not in the web directory?
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed max-w-2xl">
              Use the app for broader live product lookup, or submit the item so the halal layer keeps expanding around real Muslim search behaviour.
            </p>
          </div>
          <a
            href="https://apps.apple.com/us/app/allhalal-info-food-scanner/id6756242265"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-gradient-gold text-[#4A3319] font-bold shrink-0"
          >
            Open app scanner
          </a>
        </div>
      </div>
    </section>
  );
}
