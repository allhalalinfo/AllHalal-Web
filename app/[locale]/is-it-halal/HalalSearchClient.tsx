"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { HalalItem } from "@/data/halalItems";

export default function HalalSearchClient({ items, locale }: { items: HalalItem[], locale: string }) {
  const [query, setQuery] = useState("");

  const filteredItems = useMemo(() => {
    if (!query.trim()) return items;
    const lowerQuery = query.toLowerCase();
    return items.filter(item => {
      const matchName = item.name.toLowerCase().includes(lowerQuery);
      const matchAlias = item.aliases?.some(alias => alias.toLowerCase().includes(lowerQuery));
      return matchName || matchAlias;
    });
  }, [items, query]);

  return (
    <>
      <div className="relative mb-8">
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

      <div className="grid lg:grid-cols-2 gap-6 mb-16">
        {filteredItems.map(item => (
          <Link 
            key={item.slug} 
            href={`/${locale}/is-it-halal/${item.slug}`}
            className="block bg-bg-card border border-border p-6 rounded-2xl hover:border-primary transition-colors shadow-sm"
          >
            <div className="flex items-start justify-between gap-4 mb-3">
              <h2 className="text-xl font-bold text-text-primary leading-tight">{item.name}</h2>
              <span className={`shrink-0 inline-block px-3 py-1 rounded-full text-xs font-bold ${
                item.verdict === 'halal' ? 'bg-green-500/10 text-green-700 dark:text-green-400' :
                item.verdict === 'haram' ? 'bg-red-500/10 text-red-700 dark:text-red-400' :
                'bg-amber-500/10 text-amber-700 dark:text-amber-400'
              }`}>
                {item.verdict.toUpperCase()}
              </span>
            </div>
            <p className="text-text-secondary text-sm">{item.shortReason}</p>
          </Link>
        ))}
        {filteredItems.length === 0 && (
          <div className="col-span-1 lg:col-span-2 text-center py-16 px-6 bg-primary/5 border border-primary/20 rounded-3xl">
            <h3 className="text-2xl font-bold text-text-primary mb-3">Didn't find what you're looking for?</h3>
            <p className="text-text-secondary max-w-lg mx-auto mb-8">
              Our web directory is just a small curated list. To check the halal status of <strong className="text-text-primary">over 2 million products</strong> instantly, download our mobile app.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="https://apps.apple.com/us/app/allhalal-info-food-scanner/id6756242265" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-primary text-bg-elevated px-8 py-3 rounded-full font-semibold hover:bg-primary-dark transition-colors shadow-glow-sm w-full sm:w-auto"
              >
                Get the Free App
              </a>
              <a 
                href={`mailto:app@allhalal.info?subject=Suggest a product for Halal Checker: ${query}`}
                className="bg-bg-card text-text-primary border border-border px-8 py-3 rounded-full font-medium hover:border-primary transition-colors w-full sm:w-auto"
              >
                Suggest Product
              </a>
            </div>
          </div>
        )}
      </div>
    </>
  );
}