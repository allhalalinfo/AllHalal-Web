"use client";

import { useTranslations } from "next-intl";
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
      {/* Background styling */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay group-hover:scale-105 transition-all duration-[2s] ease-out pointer-events-none"
          style={{ backgroundImage: "url('/assets/hero-bg.png')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-bg-dark via-bg-dark/80 to-bg-dark/40" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-bold font-display mb-6">
          What are you looking for?
        </h2>
        <p className="text-text-inverse-secondary mb-8 text-lg">
          Search products, E-codes, ingredients, or explore Muslim names.
        </p>

        <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="Type a product, E-code, or name..."
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
          <span className="text-sm text-white/50 mt-1">Popular:</span>
          {["E120", "Red Bull", "Doritos", "Muhammad", "Aisha"].map(tag => (
            <button 
              key={tag}
              onClick={() => { setQuery(tag); router.push(`/${locale}/is-it-halal?q=${encodeURIComponent(tag)}`); }}
              className="text-xs bg-white/5 hover:bg-white/10 border border-white/10 rounded-full px-3 py-1 transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
