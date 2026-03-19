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
  const [standard, setStandard] = useState<"silver" | "gold">("silver");
  const [hawl, setHawl] = useState(true);
  
  // Assets
  const [cash, setCash] = useState("");
  const [gold, setGold] = useState("");
  const [silver, setSilver] = useState("");
  const [investments, setInvestments] = useState("");
  const [otherAssets, setOtherAssets] = useState("");
  
  // Debts
  const [debts, setDebts] = useState("");
  
  // Calculation
  const totalAssets = 
    (parseFloat(cash) || 0) + 
    (parseFloat(gold) || 0) + 
    (parseFloat(silver) || 0) + 
    (parseFloat(investments) || 0) + 
    (parseFloat(otherAssets) || 0);
    
  const totalDebts = parseFloat(debts) || 0;
  const netWealth = totalAssets - totalDebts;
  
  const nisabThreshold = nisabData 
    ? (standard === "gold" ? nisabData.nisab.gold_usd : nisabData.nisab.silver_usd) 
    : 0;
    
  const isEligible = hawl && netWealth >= nisabThreshold;
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
    return (
      <div className="flex flex-col items-center justify-center py-32 space-y-4">
        <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        <div className="text-text-secondary font-medium">Loading live market prices...</div>
      </div>
    );
  }

  if (error || !nisabData) {
    return (
      <div className="text-center py-20 text-red-600 bg-red-50/80 rounded-3xl border border-red-100">
        <p className="font-semibold text-lg mb-2">Unable to load current Nisab values.</p>
        <p className="text-sm opacity-80">Please check your connection and try again later.</p>
      </div>
    );
  }

  const formatCurrency = (val: number) => 
    val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      
      {/* Header / Intro */}
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold text-text-primary mb-3">Calculate your annual Zakat obligation</h2>
        <p className="text-text-secondary">Based on your wealth and debts over one lunar year.</p>
      </div>

      {/* Nisab Threshold Selector */}
      <div className="bg-bg-card border border-border rounded-3xl p-6 md:p-8 shadow-sm">
        <h3 className="text-lg font-bold text-text-primary mb-5">Nisab Threshold</h3>
        
        <div className="flex p-1 bg-bg-primary border border-border rounded-2xl mb-6">
          <button
            onClick={() => setStandard("gold")}
            className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all ${
              standard === "gold" 
                ? "bg-gradient-gold text-[#4A3319] shadow-sm" 
                : "text-text-secondary hover:text-text-primary"
            }`}
          >
            Gold Standard
          </button>
          <button
            onClick={() => setStandard("silver")}
            className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all ${
              standard === "silver" 
                ? "bg-white border border-border text-text-primary shadow-sm" 
                : "text-text-secondary hover:text-text-primary"
            }`}
          >
            Silver Standard
          </button>
        </div>

        <div className="flex items-center justify-between bg-bg-primary border border-border rounded-2xl p-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-sm font-bold text-text-secondary">Today's Nisab:</span>
              <span className="text-xl font-black text-text-primary">
                ${formatCurrency(standard === "gold" ? nisabData.nisab.gold_usd : nisabData.nisab.silver_usd)}
              </span>
            </div>
            <p className="text-xs text-text-muted mt-2">
              {standard === "gold" 
                ? `Based on 85g of gold at $${nisabData.prices.gold_per_gram_usd}/g` 
                : `Based on 595g of silver at $${nisabData.prices.silver_per_gram_usd}/g`}
            </p>
          </div>
          <div className="text-xs text-text-muted text-right hidden sm:block">
            {new Date(nisabData.updated_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
          </div>
        </div>
        
        <p className="text-sm text-text-secondary mt-5 leading-relaxed">
          {standard === "gold" 
            ? "Higher threshold; many scholars recommend this for modern zakat if living costs are high."
            : "Lower threshold; ensures more people give charity, which is the preferred scholarly opinion in modern times."}
        </p>
      </div>

      {/* Assets & Debts Form */}
      <div className="space-y-6">
        
        {/* Assets */}
        <div>
          <h3 className="text-lg font-bold text-text-primary mb-4 px-2">Your Assets (USD)</h3>
          <div className="bg-bg-card border border-border rounded-3xl p-4 md:p-6 shadow-sm space-y-4">
            
            <InputField 
              label="Cash & Savings" 
              value={cash} 
              onChange={setCash} 
              icon={<div className="w-6 h-6 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 font-bold text-xs">$</div>}
            />
            
            <InputField 
              label="Gold (market value)" 
              value={gold} 
              onChange={setGold} 
              icon={<div className="w-6 h-6 rounded-full bg-yellow-400 border-2 border-yellow-200"></div>}
            />
            
            <InputField 
              label="Silver (market value)" 
              value={silver} 
              onChange={setSilver} 
              icon={<div className="w-6 h-6 rounded-full bg-gray-300 border-2 border-gray-100"></div>}
            />
            
            <InputField 
              label="Investments & Stocks" 
              value={investments} 
              onChange={setInvestments} 
              icon={
                <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              }
            />
            
            <InputField 
              label="Other Assets" 
              value={otherAssets} 
              onChange={setOtherAssets} 
              icon={
                <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              }
            />

          </div>
        </div>

        {/* Debts */}
        <div>
          <h3 className="text-lg font-bold text-text-primary mb-4 px-2">Your Debts (USD)</h3>
          <div className="bg-bg-card border border-border rounded-3xl p-4 md:p-6 shadow-sm">
            <InputField 
              label="Total Debts" 
              value={debts} 
              onChange={setDebts} 
              isDebt
              icon={
                <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              }
            />
            <p className="text-xs text-text-muted mt-4 px-2">
              Include only debts and bills due within the next year, not the full value of a long-term mortgage.
            </p>
          </div>
        </div>

        {/* Hawl Checkbox */}
        <div className="bg-bg-card border border-border rounded-3xl p-5 shadow-sm flex items-start gap-4 cursor-pointer" onClick={() => setHawl(!hawl)}>
          <div className={`mt-1 w-6 h-6 rounded border flex items-center justify-center transition-colors ${hawl ? 'bg-primary border-primary' : 'bg-white border-border'}`}>
            {hawl && (
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>
          <div>
            <div className="font-bold text-text-primary">One lunar year (Hawl)</div>
            <div className="text-sm text-text-secondary">I have owned this wealth for at least one full lunar year.</div>
          </div>
        </div>

      </div>

      {/* Results Card */}
      <div className="bg-[#2E4B59] text-white rounded-3xl p-8 md:p-10 shadow-xl relative overflow-hidden mt-12">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-black/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/10 pb-8 mb-8">
            <div>
              <div className="text-white/70 text-sm font-medium mb-1">Net Wealth</div>
              <div className="text-3xl font-bold">${formatCurrency(netWealth)}</div>
            </div>
            
            <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm border border-white/5 max-w-xs">
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-2.5 h-2.5 rounded-full ${isEligible ? 'bg-green-400' : 'bg-amber-400'}`} />
                <span className="font-bold text-sm">
                  {isEligible ? 'Nisab Reached' : 'Below Nisab'}
                </span>
              </div>
              <p className="text-xs text-white/70 leading-relaxed">
                {!hawl 
                  ? "Zakat is not due because the wealth has not been held for a full lunar year."
                  : isEligible 
                    ? `Your wealth is above the ${standard} threshold. Zakat is obligatory.` 
                    : `Your wealth is below the ${standard} threshold. Zakat is not currently obligatory.`}
              </p>
            </div>
          </div>

          <div>
            <div className="text-white/70 font-bold uppercase tracking-widest text-xs mb-2">Total Zakat Due (2.5%)</div>
            <div className="text-5xl md:text-7xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">
              ${formatCurrency(zakatDue)}
            </div>
          </div>
        </div>
      </div>

      <p className="text-xs text-text-muted text-center px-4 leading-relaxed">
        This calculator gives an estimate based on general guidelines. For complex assets (businesses, pensions, retirement funds, crypto), consult a qualified scholar or Islamic finance expert.
      </p>
      
      <div className="pt-8">
        <AppPromoMini />
      </div>
    </div>
  );
}

// Helper component for input fields
function InputField({ 
  label, 
  value, 
  onChange, 
  icon,
  isDebt = false
}: { 
  label: string; 
  value: string; 
  onChange: (val: string) => void;
  icon: React.ReactNode;
  isDebt?: boolean;
}) {
  return (
    <div className="flex items-center gap-4 group">
      <div className="w-10 h-10 rounded-xl bg-bg-primary border border-border flex items-center justify-center shrink-0 shadow-sm group-hover:border-primary/30 transition-colors">
        {icon}
      </div>
      <div className="flex-1 flex items-center justify-between border-b border-border pb-2 group-hover:border-primary/30 transition-colors">
        <label className="text-sm font-medium text-text-primary">{label}</label>
        <div className="relative w-32 md:w-40">
          <span className={`absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium ${isDebt ? 'text-red-400' : 'text-text-muted'}`}>
            $
          </span>
          <input 
            type="number" 
            min="0"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={`w-full bg-transparent text-right pr-8 py-1 outline-none font-bold text-lg ${isDebt ? 'text-red-500' : 'text-text-primary'} placeholder:text-border`}
            placeholder="0"
          />
        </div>
      </div>
    </div>
  );
}
