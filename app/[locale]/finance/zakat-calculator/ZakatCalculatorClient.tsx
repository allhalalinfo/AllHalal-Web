"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";
import AppPromoMini from "@/components/ui/AppPromoMini";
import { HelpTooltip } from "@/components/zakat/HelpTooltip";
import ZakatCharityModal from "@/components/zakat/ZakatCharityModal";
import {
  ZAKAT_STORAGE_KEY,
  parseZakatSaved,
  type ZakatSavedPayload,
} from "@/lib/zakat/storage";
import { canvasToPngBlob, renderZakatShareCanvas } from "@/lib/zakat/shareImage";

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

function buildSavePayload(state: {
  standard: "silver" | "gold";
  hawl: boolean;
  cash: string;
  gold: string;
  silver: string;
  investments: string;
  otherAssets: string;
  debts: string;
}): ZakatSavedPayload {
  return {
    v: 1,
    savedAt: new Date().toISOString(),
    standard: state.standard,
    hawl: state.hawl,
    cash: state.cash,
    gold: state.gold,
    silver: state.silver,
    investments: state.investments,
    otherAssets: state.otherAssets,
    debts: state.debts,
  };
}

export default function ZakatCalculatorClient() {
  const locale = useLocale();
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

  const [restoredNotice, setRestoredNotice] = useState(false);
  const [actionMsg, setActionMsg] = useState<string | null>(null);
  const [charityOpen, setCharityOpen] = useState(false);
  const actionTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showActionMsg = useCallback((msg: string) => {
    if (actionTimer.current) clearTimeout(actionTimer.current);
    setActionMsg(msg);
    actionTimer.current = setTimeout(() => setActionMsg(null), 4000);
  }, []);

  // Restore from localStorage once (client)
  useEffect(() => {
    const raw = localStorage.getItem(ZAKAT_STORAGE_KEY);
    const data = parseZakatSaved(raw);
    if (!data) return;
    setStandard(data.standard);
    setHawl(data.hawl);
    setCash(data.cash ?? "");
    setGold(data.gold ?? "");
    setSilver(data.silver ?? "");
    setInvestments(data.investments ?? "");
    setOtherAssets(data.otherAssets ?? "");
    setDebts(data.debts ?? "");
    setRestoredNotice(true);
  }, []);

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

  const handleSave = () => {
    const payload = buildSavePayload({
      standard,
      hawl,
      cash,
      gold,
      silver,
      investments,
      otherAssets,
      debts,
    });
    try {
      localStorage.setItem(ZAKAT_STORAGE_KEY, JSON.stringify(payload));
      showActionMsg("Calculation saved on this device.");
    } catch {
      showActionMsg("Could not save (storage blocked or full).");
    }
  };

  const handleClearSaved = () => {
    try {
      localStorage.removeItem(ZAKAT_STORAGE_KEY);
      showActionMsg("Saved calculation removed.");
    } catch {
      showActionMsg("Could not clear storage.");
    }
  };

  const handleShareImage = async () => {
    try {
      const canvas = renderZakatShareCanvas({
        netWealth,
        zakatDue,
        standard,
        hawl,
        calculationDate: new Date(),
      });
      const blob = await canvasToPngBlob(canvas);
      if (!blob) {
        showActionMsg("Could not create image.");
        return;
      }
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `zakat-allhalal-${Date.now()}.png`;
      a.click();
      URL.revokeObjectURL(url);
      showActionMsg("Image downloaded.");
    } catch {
      showActionMsg("Download failed.");
    }
  };

  const handleCopyImage = async () => {
    try {
      const canvas = renderZakatShareCanvas({
        netWealth,
        zakatDue,
        standard,
        hawl,
        calculationDate: new Date(),
      });
      const blob = await canvasToPngBlob(canvas);
      if (!blob) {
        showActionMsg("Could not create image.");
        return;
      }
      if (!navigator.clipboard || !window.ClipboardItem) {
        showActionMsg("Clipboard image not supported in this browser—use Download.");
        return;
      }
      await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
      showActionMsg("Image copied to clipboard.");
    } catch {
      showActionMsg("Copy failed (permission or browser limit).");
    }
  };

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
      {restoredNotice ? (
        <div
          className="rounded-2xl border border-primary/20 bg-primary/5 px-4 py-3 text-center text-sm font-medium text-text-primary"
          role="status"
        >
          Your last calculation was restored from this device.
          <button
            type="button"
            className="ml-2 text-primary underline"
            onClick={() => setRestoredNotice(false)}
          >
            Dismiss
          </button>
        </div>
      ) : null}

      {actionMsg ? (
        <div className="rounded-2xl border border-border bg-bg-card px-4 py-2 text-center text-sm text-text-secondary">
          {actionMsg}
        </div>
      ) : null}

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

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
        <button
          type="button"
          onClick={handleSave}
          className="rounded-2xl border border-border bg-bg-card px-5 py-3 text-sm font-bold text-text-primary shadow-sm hover:bg-bg-primary"
        >
          💾 Save calculation
        </button>
        <button
          type="button"
          onClick={handleClearSaved}
          className="rounded-2xl border border-border bg-bg-card px-5 py-3 text-sm font-bold text-text-secondary shadow-sm hover:bg-bg-primary"
        >
          🗑 Clear saved
        </button>
      </div>

      {/* Results */}
      <div className="relative mt-12 overflow-hidden rounded-3xl bg-[#2E4B59] p-8 text-white shadow-xl md:p-10">
        <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-40 w-40 rounded-full bg-black/10 blur-2xl" />

        <div className="relative z-10">
          <div className="mb-8 flex flex-col justify-between gap-8 border-b border-white/10 pb-8 md:flex-row md:items-end">
            <div>
              <div className="mb-1 text-sm font-medium text-white/70">Net Wealth</div>
              <div className="text-3xl font-bold">${formatCurrency(netWealth)}</div>
            </div>

            <div className="max-w-xs rounded-2xl border border-white/5 bg-white/10 p-4 backdrop-blur-sm">
              <div className="mb-2 flex items-center gap-2">
                <div className={`h-2.5 w-2.5 rounded-full ${isEligible ? "bg-green-400" : "bg-amber-400"}`} />
                <span className="text-sm font-bold">{isEligible ? "Nisab Reached" : "Below Nisab"}</span>
              </div>
              <p className="text-xs leading-relaxed text-white/70">
                {!hawl
                  ? "Zakat is not due because the wealth has not been held for a full lunar year."
                  : isEligible
                    ? `Your wealth is above the ${standard} threshold. Zakat is obligatory.`
                    : `Your wealth is below the ${standard} threshold. Zakat is not currently obligatory.`}
              </p>
            </div>
          </div>

          <div>
            <div className="mb-2 text-xs font-bold uppercase tracking-widest text-white/70">
              Total Zakat Due (2.5%)
            </div>
            <div className="bg-gradient-to-r from-white to-white/70 bg-clip-text text-5xl font-black tracking-tight text-transparent md:text-7xl">
              ${formatCurrency(zakatDue)}
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <button
              type="button"
              onClick={() => setCharityOpen(true)}
              className="rounded-2xl bg-gradient-to-r from-[#c9a66b] to-[#e8d5a8] px-5 py-3 text-sm font-bold text-[#4a3319] shadow-lg"
            >
              💰 Pay Zakat
            </button>
            <button
              type="button"
              onClick={handleShareImage}
              className="rounded-2xl border border-white/25 bg-white/10 px-5 py-3 text-sm font-bold text-white backdrop-blur-sm hover:bg-white/15"
            >
              📤 Share result (download image)
            </button>
            <button
              type="button"
              onClick={handleCopyImage}
              className="rounded-2xl border border-white/25 bg-white/10 px-5 py-3 text-sm font-bold text-white backdrop-blur-sm hover:bg-white/15"
            >
              📋 Copy image
            </button>
          </div>
        </div>
      </div>

      <ZakatCharityModal open={charityOpen} onClose={() => setCharityOpen(false)} suggestedAmount={zakatDue} />

      <p className="px-4 text-center text-xs leading-relaxed text-text-muted">
        This calculator gives an estimate based on general guidelines. For complex assets (businesses, pensions,
        retirement funds, crypto), consult a qualified scholar or Islamic finance expert.
      </p>

      <div className="space-y-2 text-center">
        <div>
          <Link
            href="#zakat-faq"
            className="inline-flex text-sm font-semibold text-primary underline-offset-2 hover:underline"
          >
            ❓ Frequently asked questions
          </Link>
        </div>
        <div>
          <Link
            href={`/${locale}/guides`}
            className="text-sm font-medium text-text-secondary underline-offset-2 hover:text-primary hover:underline"
          >
            Zakat &amp; finance guides (stocks, crypto, Nisab, business…)
          </Link>
        </div>
      </div>

      <div className="pt-8">
        <AppPromoMini />
      </div>

      {/* Screen-reader HowTo mirror (visible focusable skip or sr-only) — complements JSON-LD */}
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
