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

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setHasSearched(true);
    setResult(null);

    try {
      const res = await fetch(`https://api.allhalal.info/api/v1/boycott/check?brand=${encodeURIComponent(query)}`);
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
      <form onSubmit={handleSearch} className="relative mb-10">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter a brand name (e.g., Starbucks, Pepsi, Nestle)..."
          className="w-full px-6 py-5 bg-bg-card border-2 border-border rounded-2xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/20 text-lg transition-all shadow-sm pr-32"
        />
        <button 
          type="submit"
          disabled={loading || !query.trim()}
          className="absolute right-2 top-2 bottom-2 bg-primary text-white px-6 rounded-xl font-bold hover:bg-primary-dark transition-colors disabled:opacity-50 flex items-center justify-center min-w-[100px]"
        >
          {loading ? (
            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : "Check"}
        </button>
      </form>

      {/* Results Area */}
      {hasSearched && !loading && result && (
        <div className="animate-fade-in-up">
          {result.is_boycotted && result.brand ? (
            <div className="bg-red-50 dark:bg-red-950/20 border-2 border-red-200 dark:border-red-900/50 rounded-3xl p-8 mb-10 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-red-100 dark:bg-red-900/50 rounded-full flex items-center justify-center shrink-0">
                  <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-3xl font-black text-red-700 dark:text-red-400 leading-tight">
                    Boycotted Brand
                  </h2>
                  <p className="text-red-600/80 dark:text-red-400/80 font-medium">Please avoid supporting this company.</p>
                </div>
              </div>

              <div className="bg-white/60 dark:bg-black/20 rounded-2xl p-6 mb-6">
                <div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-b border-red-200/50 dark:border-red-900/50">
                  <div>
                    <span className="block text-xs font-bold text-red-800/50 dark:text-red-400/50 uppercase tracking-wider mb-1">Brand Name</span>
                    <span className="font-semibold text-text-primary text-lg">{result.brand.name}</span>
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-red-800/50 dark:text-red-400/50 uppercase tracking-wider mb-1">Parent Company</span>
                    <span className="font-semibold text-text-primary text-lg">{result.brand.parent_company}</span>
                  </div>
                </div>
                <div>
                  <span className="block text-xs font-bold text-red-800/50 dark:text-red-400/50 uppercase tracking-wider mb-2">Reason for Boycott</span>
                  <p className="text-text-secondary leading-relaxed">{result.brand.reason}</p>
                </div>
              </div>
            </div>
          ) : result.status === "success" && !result.is_boycotted ? (
            <div className="bg-green-50 dark:bg-green-950/20 border-2 border-green-200 dark:border-green-900/50 rounded-3xl p-8 mb-10 shadow-sm text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-3xl font-black text-green-700 dark:text-green-400 mb-2">
                Not Found on Boycott List
              </h2>
              <p className="text-green-800/70 dark:text-green-400/70 text-lg mb-6">
                We could not find <strong>"{query}"</strong> in our database of boycotted brands.
              </p>
              <div className="text-sm text-text-secondary bg-white/60 dark:bg-black/20 p-4 rounded-xl inline-block text-left">
                <strong>Note:</strong> This does not automatically mean the brand is Halal or completely ethical. Always check the ingredients and use the allhalal.info app scanner for detailed product verification.
              </div>
            </div>
          ) : (
            <div className="bg-bg-card border border-border rounded-2xl p-6 mb-10 text-center text-text-secondary">
              {result.message}
            </div>
          )}
        </div>
      )}

      <AppPromoMini />
    </div>
  );
}