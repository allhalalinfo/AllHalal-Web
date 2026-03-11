"use client";

import { useState, useEffect } from "react";
import AppPromoMini from "@/components/ui/AppPromoMini";

type NisabData = {
  updated_at: string;
  prices: {
    gold_per_gram_usd: number;
    silver_per_gram_usd: number;
  };
  nisab: {
    gold_grams: number;
    silver_grams: number;
    gold_usd: number;
    silver_usd: number;
  };
};

export default function ZakatCalculatorClient() {
  const [nisabData, setNisabData] = useState<NisabData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  
  // Calculator state
  const [cash, setCash] = useState("");
  const [investments, setInvestments] = useState("");
  const [goldSilver, setGoldSilver] = useState("");
  const [debts, setDebts] = useState("");
  
  // Calculation
  const totalAssets = (parseFloat(cash) || 0) + (parseFloat(investments) || 0) + (parseFloat(goldSilver) || 0);
  const totalDebts = parseFloat(debts) || 0;
  const netWealth = totalAssets - totalDebts;
  
  const nisabThreshold = nisabData ? nisabData.nisab.silver_usd : 0; // Silver is usually used as it's the safer/lower threshold
  const isEligible = netWealth >= nisabThreshold;
  const zakatDue = isEligible ? netWealth * 0.025 : 0;

  useEffect(() => {
    async function fetchNisab() {
      try {
        const res = await fetch("/api/nisab");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setNisabData(data);
      } catch (err) {
        console.error("Error fetching Nisab:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchNisab();
  }, []);

  if (loading) {
    return <div className="text-center py-20 text-text-secondary">Loading live gold and silver prices...</div>;
  }

  if (error || !nisabData) {
    return <div className="text-center py-20 text-red-500 bg-red-50/50 rounded-2xl border border-red-100">Unable to load current Nisab values. Please try again later.</div>;
  }

  return (
    <div className="space-y-12">
      {/* Live Nisab Values */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-bg-card border border-border rounded-2xl p-6 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/5 rounded-full blur-2xl pointer-events-none" />
          <h3 className="text-sm font-bold text-text-muted uppercase tracking-wider mb-2">Nisab by Gold</h3>
          <div className="text-3xl font-black text-text-primary mb-1">
            ${nisabData.nisab.gold_usd.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <p className="text-sm text-text-secondary">Based on 85g of gold at ${nisabData.prices.gold_per_gram_usd}/g</p>
        </div>
        
        <div className="bg-bg-card border border-border rounded-2xl p-6 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gray-400/5 rounded-full blur-2xl pointer-events-none" />
          <h3 className="text-sm font-bold text-text-muted uppercase tracking-wider mb-2">Nisab by Silver</h3>
          <div className="text-3xl font-black text-text-primary mb-1">
            ${nisabData.nisab.silver_usd.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <p className="text-sm text-text-secondary">Based on 595g of silver at ${nisabData.prices.silver_per_gram_usd}/g</p>
        </div>
      </div>
      
      <p className="text-xs text-text-muted text-center -mt-8">
        Prices updated on {new Date(nisabData.updated_at).toLocaleDateString()}
      </p>

      {/* Calculator */}
      <div className="bg-bg-card border border-border rounded-3xl p-6 md:p-10 shadow-sm">
        <h2 className="text-2xl font-bold font-display text-text-primary mb-6">Calculate Your Zakat</h2>
        <p className="text-text-secondary mb-8">
          Enter your assets and liabilities below. We use the silver Nisab standard (${nisabData.nisab.silver_usd.toLocaleString()}) by default, as it ensures more people give charity, which is the preferred scholarly opinion in modern times.
        </p>

        <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
          {/* Inputs */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Cash (Bank & on hand)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">$</span>
                <input 
                  type="number" 
                  min="0"
                  value={cash}
                  onChange={(e) => setCash(e.target.value)}
                  className="w-full pl-8 pr-4 py-3 bg-bg-primary border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                  placeholder="0.00"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Investments & Stocks</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">$</span>
                <input 
                  type="number" 
                  min="0"
                  value={investments}
                  onChange={(e) => setInvestments(e.target.value)}
                  className="w-full pl-8 pr-4 py-3 bg-bg-primary border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                  placeholder="0.00"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Gold & Silver (Value in USD)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">$</span>
                <input 
                  type="number" 
                  min="0"
                  value={goldSilver}
                  onChange={(e) => setGoldSilver(e.target.value)}
                  className="w-full pl-8 pr-4 py-3 bg-bg-primary border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                  placeholder="0.00"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <label className="block text-sm font-medium text-text-primary mb-2">Debts to be paid soon</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-red-500">-$</span>
                <input 
                  type="number" 
                  min="0"
                  value={debts}
                  onChange={(e) => setDebts(e.target.value)}
                  className="w-full pl-8 pr-4 py-3 bg-red-50/50 border border-red-100 rounded-xl focus:ring-2 focus:ring-red-400 focus:border-transparent transition-all outline-none"
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="bg-primary/5 rounded-2xl p-8 border border-primary/20 flex flex-col justify-center">
            <div className="mb-6 pb-6 border-b border-primary/20">
              <div className="text-sm text-text-secondary mb-1">Net Wealth</div>
              <div className="text-2xl font-bold font-display text-text-primary">${netWealth.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
            </div>

            {netWealth > 0 && (
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-3 h-3 rounded-full ${isEligible ? 'bg-green-500' : 'bg-amber-500'}`} />
                  <span className="font-semibold text-text-primary">
                    {isEligible ? 'You have reached Nisab' : 'Below Nisab threshold'}
                  </span>
                </div>
                <p className="text-sm text-text-secondary">
                  {isEligible 
                    ? `Your wealth is above the silver threshold of $${nisabThreshold.toLocaleString()}. Zakat is obligatory.` 
                    : `Your wealth is below the silver threshold of $${nisabThreshold.toLocaleString()}. Zakat is not currently obligatory.`}
                </p>
              </div>
            )}

            <div className="mt-auto">
              <div className="text-sm font-bold uppercase tracking-wider text-primary mb-2">Total Zakat Due (2.5%)</div>
              <div className="text-5xl font-black text-primary">
                ${zakatDue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <AppPromoMini />
    </div>
  );
}
