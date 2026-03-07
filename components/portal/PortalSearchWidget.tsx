"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PortalSearchWidget({ locale }: { locale: string }) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/${locale}/is-it-halal?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="bg-bg-dark text-text-inverse rounded-[2rem] p-8 md:p-12 relative overflow-hidden shadow-2xl border border-white/10 group">
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay group-hover:scale-105 transition-all duration-[2s] ease-out pointer-events-none"
          style={{ backgroundImage: "url('/assets/hero-bg.png')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-bg-dark via-bg-dark/80 to-bg-dark/40" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(244,185,66,0.18),transparent_22%)]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/8 border border-white/10 text-[11px] font-bold uppercase tracking-[0.22em] text-white/75 mb-5">
          Halal Search
        </div>

        <h2 className="text-3xl md:text-5xl font-bold font-display mb-5">
          Check a product, ingredient or E-code right now.
        </h2>
        <p className="text-text-inverse-secondary mb-8 text-lg">
          Search the highest-intent part of AllHalal first: packaged foods, ingredients, additives, snacks, drinks and brand questions.
        </p>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {["Brands", "Ingredients", "E-codes", "Snacks & drinks"].map((item) => (
            <span
              key={item}
              className="px-3 py-2 rounded-full border border-white/10 bg-white/5 text-xs font-semibold text-white/75"
            >
              {item}
            </span>
          ))}
        </div>

        <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="Type a product, ingredient, E-code or brand..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-white/10 border border-white/20 rounded-2xl px-6 py-5 pl-14 text-white placeholder-white/50 focus:outline-none focus:bg-white/20 focus:border-accent-yellow transition-all text-lg shadow-lg backdrop-blur-md"
          />
          <svg className="w-6 h-6 absolute left-5 top-1/2 -translate-y-1/2 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <button
            type="submit"
            className="absolute right-2 top-2 bottom-2 bg-gradient-gold text-[#4A3319] hover:bg-gradient-gold-hover px-8 rounded-xl font-bold shadow-glow-sm transition-all"
          >
            Search
          </button>
        </form>

        <div className="flex flex-wrap justify-center gap-3 mt-6">
          <span className="text-sm text-white/50 mt-1">Fast examples:</span>
          {["E120", "Gelatin", "Doritos", "Takis", "Red Bull"].map((tag) => (
            <button
              key={tag}
              onClick={() => {
                setQuery(tag);
                router.push(`/${locale}/is-it-halal?q=${encodeURIComponent(tag)}`);
              }}
              className="text-xs bg-white/5 hover:bg-white/10 border border-white/10 rounded-full px-3 py-1.5 transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
