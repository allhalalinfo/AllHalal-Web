"use client";

import { useState } from "react";
import AppPromoMini from "@/components/ui/AppPromoMini";

type BoycottResponse = {
  status: string;
  is_boycotted: boolean;
  brand?: {
    name: string;
    parent_company: string;
    category: string;
    status: string;
    reason: string;
    confidence: number;
  };
  message: string;
};

export default function BoycottCheckerClient() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<BoycottResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setHasSearched(true);
    setResult(null);

    try {
      const res = await fetch(`/api/boycott-check?brand=${encodeURIComponent(query)}`);
      if (res.ok) {
        const data = await res.json();
        setResult(data);
      } else {
        setResult({ status: "error", is_boycotted: false, message: "Error checking brand. Please try again." });
      }
    } catch (error) {
      setResult({ status: "error", is_boycotted: false, message: "Network error. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-16">
      {/* Search Form with Enhanced Styling */}
      <form onSubmit={handleSearch} className="relative mb-10 group">
        <div className={`relative transition-all duration-500 ${
          isFocused ? 'transform scale-[1.02]' : ''
        }`}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Enter a brand name (e.g., Starbucks, Pepsi, Nestle)..."
            className="w-full px-6 py-5 bg-white border-2 border-border rounded-2xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/20 text-lg transition-all duration-300 shadow-sm hover:shadow-md pr-32 placeholder:text-text-muted/60"
          />
          
          {/* Search Icon */}
          <div className="absolute left-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-0 group-focus-within:opacity-100 transition-opacity duration-300">
            <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <button 
            type="submit"
            disabled={loading || !query.trim()}
            className="absolute right-2 top-2 bottom-2 bg-gradient-gold text-[#4A3319] hover:bg-gradient-gold-hover px-6 rounded-xl font-bold shadow-[0_4px_15px_rgba(176,144,98,0.3)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 hover:shadow-[0_6px_20px_rgba(176,144,98,0.4)] active:scale-95 flex items-center justify-center min-w-[100px]"
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <span className="flex items-center gap-2">
                Check
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            )}
          </button>
        </div>

        {/* Decorative elements */}
        <div className={`absolute -inset-1 bg-gradient-to-r from-primary/20 via-accent-yellow/20 to-primary/20 rounded-2xl blur-xl opacity-0 ${
          isFocused ? 'opacity-100' : ''
        } transition-opacity duration-500 -z-10`} />
      </form>

      {/* Loading Skeleton */}
      {loading && (
        <div className="animate-fade-in space-y-4">
          <div className="bg-white border-2 border-border rounded-3xl p-8 animate-pulse">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gray-200 rounded-full" />
              <div className="flex-1 space-y-2">
                <div className="h-8 bg-gray-200 rounded w-2/3" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
              </div>
            </div>
            <div className="bg-gray-100 rounded-2xl p-6 space-y-3">
              <div className="h-4 bg-gray-200 rounded w-full" />
              <div className="h-4 bg-gray-200 rounded w-5/6" />
            </div>
          </div>
        </div>
      )}

      {/* Results Area */}
      {hasSearched && !loading && result && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          {result.is_boycotted && result.brand ? (
            <div className="bg-gradient-to-br from-red-50 to-orange-50/50 dark:from-red-950/20 dark:to-orange-950/10 border-2 border-red-200 dark:border-red-900/50 rounded-3xl p-8 mb-10 shadow-xl hover:shadow-2xl transition-all duration-500 relative overflow-hidden group">
              {/* Animated background elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDelay: '1s' }} />
              
              {/* Alert Icon with Animation */}
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900/50 dark:to-red-800/50 rounded-full flex items-center justify-center shrink-0 shadow-lg animate-in zoom-in-95 duration-500 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-red-600 dark:text-red-400 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div className="flex-1 animate-in slide-in-from-right-4 duration-500" style={{ animationDelay: '150ms', animationFillMode: 'backwards' }}>
                  <h2 className="text-3xl font-black text-red-700 dark:text-red-400 leading-tight mb-1">
                    ⚠️ Boycotted Brand
                  </h2>
                  <p className="text-red-600/80 dark:text-red-400/80 font-semibold text-lg">Please avoid supporting this company.</p>
                </div>
              </div>

              {/* Brand Details Card */}
              <div className="bg-white/80 dark:bg-black/30 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-red-200/50 dark:border-red-900/30 shadow-inner animate-in slide-in-from-bottom-2 duration-500" style={{ animationDelay: '300ms', animationFillMode: 'backwards' }}>
                <div className="grid md:grid-cols-2 gap-6 mb-6 pb-6 border-b border-red-200/50 dark:border-red-900/50">
                  <div className="group/item">
                    <span className="block text-xs font-bold text-red-800/50 dark:text-red-400/50 uppercase tracking-wider mb-2 flex items-center gap-2">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Brand Name
                    </span>
                    <span className="font-bold text-text-primary text-xl group-hover/item:text-red-600 transition-colors">{result.brand.name}</span>
                  </div>
                  <div className="group/item">
                    <span className="block text-xs font-bold text-red-800/50 dark:text-red-400/50 uppercase tracking-wider mb-2 flex items-center gap-2">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                      </svg>
                      Parent Company
                    </span>
                    <span className="font-bold text-text-primary text-xl group-hover/item:text-red-600 transition-colors">{result.brand.parent_company}</span>
                  </div>
                </div>
                <div>
                  <span className="block text-xs font-bold text-red-800/50 dark:text-red-400/50 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    Reason for Boycott
                  </span>
                  <p className="text-text-primary leading-relaxed text-base font-medium bg-red-50/50 dark:bg-red-950/20 p-4 rounded-xl border-l-4 border-red-500">{result.brand.reason}</p>
                </div>
              </div>

              {/* CTA */}
              <div className="text-center animate-in fade-in duration-500" style={{ animationDelay: '450ms', animationFillMode: 'backwards' }}>
                <p className="text-sm text-red-800/70 dark:text-red-400/70 font-medium">
                  Consider choosing alternative brands that align with your values.
                </p>
              </div>
            </div>
          ) : result.status === "success" && !result.is_boycotted ? (
            <div className="bg-gradient-to-br from-green-50 to-emerald-50/50 dark:from-green-950/20 dark:to-emerald-950/10 border-2 border-green-200 dark:border-green-900/50 rounded-3xl p-8 mb-10 shadow-xl hover:shadow-2xl transition-all duration-500 text-center relative overflow-hidden group">
              {/* Animated background elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDelay: '1s' }} />
              
              {/* Success Icon with Animation */}
              <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/50 dark:to-green-800/50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg animate-in zoom-in-95 duration-500 group-hover:scale-110 group-hover:rotate-12 transition-all">
                <svg className="w-10 h-10 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-black text-green-700 dark:text-green-400 mb-3 animate-in slide-in-from-bottom-2 duration-500" style={{ animationDelay: '150ms', animationFillMode: 'backwards' }}>
                ✅ Not on Boycott List
              </h2>
              
              <p className="text-green-800/70 dark:text-green-400/70 text-lg mb-6 max-w-xl mx-auto animate-in fade-in duration-500" style={{ animationDelay: '300ms', animationFillMode: 'backwards' }}>
                We could not find <strong className="text-green-700 dark:text-green-400">"{query}"</strong> in our database of boycotted brands.
              </p>
              
              <div className="text-sm text-text-secondary bg-white/70 dark:bg-black/30 backdrop-blur-sm p-5 rounded-xl inline-block text-left border border-green-200/50 dark:border-green-900/30 shadow-inner max-w-lg animate-in slide-in-from-bottom-2 duration-500" style={{ animationDelay: '450ms', animationFillMode: 'backwards' }}>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <strong className="text-text-primary">Note:</strong> This does not automatically mean the brand is Halal or completely ethical. Always check the ingredients and use the allhalal.info app scanner for detailed product verification.
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white border-2 border-border rounded-2xl p-8 mb-10 text-center text-text-secondary shadow-md animate-in fade-in slide-in-from-bottom-2 duration-500">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-lg font-medium">{result.message}</p>
            </div>
          )}
        </div>
      )}

      <div className="animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: '600ms', animationFillMode: 'backwards' }}>
        <AppPromoMini />
      </div>
    </div>
  );
}
