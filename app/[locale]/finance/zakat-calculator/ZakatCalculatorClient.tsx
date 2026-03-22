"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import AppPromoMini from "@/components/ui/AppPromoMini";
import { HelpTooltip } from "@/components/zakat/HelpTooltip";
import { ZAKAT_CHARITY_FUNDS } from "@/data/zakatCharityFunds";

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

/** Short educational hints next to each asset line (EN). */
const FIELD_HELP: Record<string, string> = {
  cash:
    "Money in bank accounts, cash at home, and savings held in any currency.",
  gold:
    "Market value of gold jewelry, bars, and coins you hold for saving or investment. Jewelry worn every day is often exempt in many opinions—confirm with your scholar.",
  silver: "Same approach as gold: bars, coins, and investment silver at today’s value.",
  investments:
    "Current market value of stocks, bonds, and funds. Impermissible income may need cleansing (tazkiyah)—ask a qualified Islamic finance advisor.",
  other:
    "Rental or investment property (not your personal home), crypto, business assets, large receivables, etc. See the FAQ for nuances.",
  debts:
    "Only what you must repay within the next ~12 months. A home mortgage is not fully deductible—usually just the next year’s payments.",
};

const NISAB_STANDARD_HELP =
  "Silver Nisab is lower, so more Muslims become eligible—closer to the prophetic weight in silver dirhams. Imam Abu Hanifa’s school used silver; many modern scholars (e.g. Yusuf al-Qaradawi) prefer silver so Zakat reaches more people in need. Gold is stricter if your scholar recommends it.";

export default function ZakatCalculatorClient() {
  const [nisabData, setNisabData] = useState<NisabData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [standard, setStandard] = useState<"silver" | "gold">("silver");
  const [hawl, setHawl] = useState(true);

  const [cash, setCash] = useState("");
  const [gold, setGold] = useState("");
  const [silver, setSilver] = useState("");
  const [investments, setInvestments] = useState("");
  const [otherAssets, setOtherAssets] = useState("");
  const [debts, setDebts] = useState("");

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

  const totalAssets =
    (parseFloat(cash) || 0) +
    (parseFloat(gold) || 0) +
    (parseFloat(silver) || 0) +
    (parseFloat(investments) || 0) +
    (parseFloat(otherAssets) || 0);

  const totalDebts = parseFloat(debts) || 0;
  const netWealth = totalAssets - totalDebts;

  const nisabThreshold = nisabData
    ? standard === "gold"
      ? nisabData.nisab.gold_usd
      : nisabData.nisab.silver_usd
    : 0;

  const isEligible = hawl && netWealth >= nisabThreshold;
  const zakatDue = isEligible ? netWealth * 0.025 : 0;

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 py-32">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
        <div className="font-medium text-text-secondary">Loading live market prices...</div>
      </div>
    );
  }

  if (error || !nisabData) {
    return (
      <div className="rounded-3xl border border-red-100 bg-red-50/80 py-20 text-center text-red-600">
        <p className="mb-2 text-lg font-semibold">Unable to load current Nisab values.</p>
        <p className="text-sm opacity-80">Please check your connection and try again later.</p>
      </div>
    );
  }

  const formatCurrency = (val: number) =>
    val.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div id="zakat-calculator-root" className="mx-auto max-w-3xl space-y-8">
      <div className="mb-10 text-center">
        <h2 className="mb-3 text-2xl font-bold text-text-primary">Calculate your annual Zakat obligation</h2>
        <p className="text-text-secondary">Based on your wealth and debts over one lunar year.</p>
      </div>

      {/* Nisab */}
      <div className="rounded-3xl border border-border bg-bg-card p-6 shadow-sm md:p-8">
        <div className="mb-5 flex flex-wrap items-center gap-2">
          <h3 className="text-lg font-bold text-text-primary">Nisab Threshold</h3>
          <HelpTooltip label="Nisab standard" text={NISAB_STANDARD_HELP} />
        </div>

        <div className="mb-6 flex rounded-2xl border border-border bg-bg-primary p-1">
          <button
            type="button"
            onClick={() => setStandard("gold")}
            className={`flex-1 rounded-xl px-4 py-3 text-sm font-bold transition-all ${
              standard === "gold"
                ? "bg-gradient-gold text-[#4A3319] shadow-sm"
                : "text-text-secondary hover:text-text-primary"
            }`}
          >
            Gold Standard
          </button>
          <button
            type="button"
            onClick={() => setStandard("silver")}
            className={`flex-1 rounded-xl px-4 py-3 text-sm font-bold transition-all ${
              standard === "silver"
                ? "border border-border bg-white text-text-primary shadow-sm"
                : "text-text-secondary hover:text-text-primary"
            }`}
          >
            Silver Standard
          </button>
        </div>

        <div className="flex items-center justify-between rounded-2xl border border-border bg-bg-primary p-5">
          <div>
            <div className="mb-1 flex flex-wrap items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <span className="text-sm font-bold text-text-secondary">Today&apos;s Nisab:</span>
              <span className="text-xl font-black text-text-primary">
                ${formatCurrency(standard === "gold" ? nisabData.nisab.gold_usd : nisabData.nisab.silver_usd)}
              </span>
            </div>
            <p className="mt-2 text-xs text-text-muted">
              {standard === "gold"
                ? `Based on 85g of gold at $${nisabData.prices.gold_per_gram_usd}/g`
                : `Based on 595g of silver at $${nisabData.prices.silver_per_gram_usd}/g`}
            </p>
          </div>
          <div className="hidden text-right text-xs text-text-muted sm:block">
            {new Date(nisabData.updated_at).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </div>
        </div>

        <p className="mt-5 text-sm leading-relaxed text-text-secondary">
          {standard === "gold"
            ? "Higher threshold; some scholars recommend gold when living costs are very high."
            : "Lower threshold; aligns with many contemporary scholars so more wealth is purified through Zakat."}
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="mb-4 px-2 text-lg font-bold text-text-primary">Your Assets (USD)</h3>
          <div className="space-y-4 rounded-3xl border border-border bg-bg-card p-4 shadow-sm md:p-6">
            <InputField
              label="Cash & Savings"
              helpKey="cash"
              value={cash}
              onChange={setCash}
              icon={
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-yellow-100 text-xs font-bold text-yellow-600">
                  $
                </div>
              }
            />
            <InputField
              label="Gold (market value)"
              helpKey="gold"
              value={gold}
              onChange={setGold}
              icon={<div className="h-6 w-6 rounded-full border-2 border-yellow-200 bg-yellow-400" />}
            />
            <InputField
              label="Silver (market value)"
              helpKey="silver"
              value={silver}
              onChange={setSilver}
              icon={<div className="h-6 w-6 rounded-full border-2 border-gray-100 bg-gray-300" />}
            />
            <InputField
              label="Investments & Stocks"
              helpKey="investments"
              value={investments}
              onChange={setInvestments}
              icon={
                <svg className="h-5 w-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              }
            />
            <InputField
              label="Other Assets"
              helpKey="other"
              value={otherAssets}
              onChange={setOtherAssets}
              icon={
                <svg className="h-5 w-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              }
            />
          </div>
        </div>

        <div>
          <h3 className="mb-4 px-2 text-lg font-bold text-text-primary">Your Debts (USD)</h3>
          <div className="rounded-3xl border border-border bg-bg-card p-4 shadow-sm md:p-6">
            <InputField
              label="Total Debts"
              helpKey="debts"
              value={debts}
              onChange={setDebts}
              isDebt
              icon={
                <svg className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
              }
            />
            <p className="mt-4 px-2 text-xs text-text-muted">
              Include only debts and bills due within the next lunar year, not the full long-term mortgage
              balance.
            </p>
          </div>
        </div>

        <button
          type="button"
          className="flex w-full cursor-pointer items-start gap-4 rounded-3xl border border-border bg-bg-card p-5 text-left shadow-sm"
          onClick={() => setHawl(!hawl)}
        >
          <div
            className={`mt-1 flex h-6 w-6 items-center justify-center rounded border transition-colors ${
              hawl ? "border-primary bg-primary" : "border-border bg-white"
            }`}
          >
            {hawl ? (
              <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            ) : null}
          </div>
          <div>
            <div className="font-bold text-text-primary">One lunar year (Hawl)</div>
            <div className="text-sm text-text-secondary">
              I have owned this wealth for at least one full lunar year.
            </div>
          </div>
        </button>
      </div>

      {/* Compact results — same card style as the rest of the form */}
      <div className="rounded-3xl border border-border bg-bg-card p-6 shadow-sm md:p-7">
        <div className="grid gap-6 sm:grid-cols-2 sm:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">Net wealth</p>
            <p className="mt-1 text-2xl font-bold text-text-primary md:text-3xl">${formatCurrency(netWealth)}</p>
          </div>
          <div className="rounded-2xl border border-border bg-bg-primary/80 px-4 py-3">
            <div className="flex items-center gap-2">
              <span className={`h-2 w-2 shrink-0 rounded-full ${isEligible ? "bg-green-500" : "bg-amber-500"}`} />
              <span className="text-sm font-bold text-text-primary">
                {isEligible ? "Nisab reached" : "Below Nisab"}
              </span>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-text-secondary">
              {!hawl
                ? "Zakat is not due until wealth is held for a full lunar year."
                : isEligible
                  ? `Above the ${standard} threshold — Zakat is obligatory.`
                  : `Below the ${standard} threshold — Zakat is not due now.`}
            </p>
          </div>
        </div>

        <div className="mt-6 border-t border-border pt-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">Zakat due (2.5%)</p>
          <p className="mt-1 text-3xl font-black text-[#2E4B59] md:text-4xl">${formatCurrency(zakatDue)}</p>
        </div>
      </div>

      {/* Partner organisations — horizontal scroll on small screens */}
      <section className="space-y-4" aria-labelledby="zakat-partners-heading">
        <div>
          <h3 id="zakat-partners-heading" className="text-lg font-bold text-text-primary">
            Where to pay your Zakat
          </h3>
          <p className="mt-1 text-sm text-text-secondary">
            allhalal.info does not collect donations — you complete payment on each organisation&apos;s own site.
          </p>
          {zakatDue > 0 ? (
            <p className="mt-2 text-sm text-text-primary">
              Calculated amount to enter at checkout:{" "}
              <span className="font-bold tabular-nums">${formatCurrency(zakatDue)}</span>
            </p>
          ) : null}
        </div>

        <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 pt-1 [scrollbar-width:thin] md:mx-0 md:flex-wrap md:overflow-visible md:px-0">
          {ZAKAT_CHARITY_FUNDS.map((fund) => (
            <article
              key={fund.id}
              className="w-[min(100%,280px)] shrink-0 snap-center rounded-2xl border border-border bg-bg-primary/90 p-4 shadow-sm md:w-[calc(50%-0.5rem)] md:max-w-none lg:w-[calc(33.333%-0.67rem)]"
            >
              <h4 className="font-bold text-text-primary">{fund.name}</h4>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">{fund.description}</p>
              <a
                href={fund.donateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-sm font-semibold text-primary hover:underline"
              >
                Donate →
              </a>
            </article>
          ))}
        </div>
      </section>

      <p className="px-1 text-center text-xs leading-relaxed text-text-muted">
        This calculator gives an estimate based on general guidelines. For complex assets (businesses, pensions,
        retirement funds, crypto), consult a qualified scholar or Islamic finance expert.
      </p>

      <div className="text-center">
        <Link
          href="#zakat-faq"
          className="inline-flex text-sm font-semibold text-primary underline-offset-2 hover:underline"
        >
          ❓ Frequently asked questions
        </Link>
      </div>

      <div className="pt-8">
        <AppPromoMini />
      </div>

      <section className="sr-only" aria-label="How to use this calculator">
        <ol>
          <li>Enter your assets and debts in US dollars.</li>
          <li>Choose gold or silver Nisab.</li>
          <li>Confirm one lunar year of ownership if it applies.</li>
          <li>Read net wealth and Zakat at 2.5 percent when above Nisab.</li>
        </ol>
      </section>
    </div>
  );
}

function InputField({
  label,
  helpKey,
  value,
  onChange,
  icon,
  isDebt = false,
}: {
  label: string;
  helpKey: keyof typeof FIELD_HELP;
  value: string;
  onChange: (val: string) => void;
  icon: React.ReactNode;
  isDebt?: boolean;
}) {
  const help = FIELD_HELP[helpKey];
  return (
    <div className="group flex items-center gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-bg-primary shadow-sm transition-colors group-hover:border-primary/30">
        {icon}
      </div>
      <div className="flex flex-1 items-center justify-between gap-2 border-b border-border pb-2 transition-colors group-hover:border-primary/30">
        <div className="flex min-w-0 items-center gap-1.5">
          <label className="text-sm font-medium text-text-primary">{label}</label>
          <HelpTooltip label={label} text={help} />
        </div>
        <div className="relative w-32 shrink-0 md:w-40">
          <span
            className={`absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium ${
              isDebt ? "text-red-400" : "text-text-muted"
            }`}
          >
            $
          </span>
          <input
            type="number"
            min={0}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={`w-full bg-transparent py-1 pr-8 text-right text-lg font-bold outline-none placeholder:text-border ${
              isDebt ? "text-red-500" : "text-text-primary"
            }`}
            placeholder="0"
          />
        </div>
      </div>
    </div>
  );
}
