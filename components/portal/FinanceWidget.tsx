"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import { TriangleAlert } from "lucide-react";

type CurrencyCode = "EUR" | "GBP" | "SAR" | "AED" | "TRY" | "MYR";

type RateCard = {
  code: CurrencyCode;
  pair: string;
  label: string;
  symbol: string;
  rate: number;
  symbolClass: string;
  tintClass: string;
};

type PreciousMetalCard = {
  key: "gold" | "silver";
  pair: string;
  label: string;
  symbol: string;
  value: number;
  symbolClass: string;
  tintClass: string;
};

type FinanceApiResponse = {
  success?: boolean;
  base?: string;
  rates?: Partial<Record<CurrencyCode, number>>;
  timestamp?: number;
};

type NisabApiResponse = {
  updated_at?: string;
  prices?: {
    gold_per_gram_usd?: number;
    silver_per_gram_usd?: number;
  };
};

type FinanceBoardItem =
  | ({ kind: "rate" } & RateCard)
  | ({ kind: "metal" } & PreciousMetalCard);

const REFRESH_INTERVAL_MS = 1000 * 60 * 5;
const RATE_ORDER: CurrencyCode[] = ["SAR", "AED", "EUR", "GBP", "TRY", "MYR"];

const CURRENCY_META: Record<
  CurrencyCode,
  { label: string; symbol: string; symbolClass: string; tintClass: string }
> = {
  SAR: {
    label: "Saudi Riyal",
    symbol: "﷼",
    symbolClass: "text-[#a67921]",
    tintClass: "before:bg-[radial-gradient(circle_at_top_left,rgba(240,197,110,0.14),transparent_52%)]",
  },
  AED: {
    label: "UAE Dirham",
    symbol: "DH",
    symbolClass: "text-[#2f7d76]",
    tintClass: "before:bg-[radial-gradient(circle_at_top_left,rgba(130,214,203,0.16),transparent_52%)]",
  },
  EUR: {
    label: "Euro",
    symbol: "€",
    symbolClass: "text-[#4963b4]",
    tintClass: "before:bg-[radial-gradient(circle_at_top_left,rgba(154,181,255,0.15),transparent_52%)]",
  },
  GBP: {
    label: "British Pound",
    symbol: "£",
    symbolClass: "text-[#7c5aac]",
    tintClass: "before:bg-[radial-gradient(circle_at_top_left,rgba(201,166,255,0.14),transparent_52%)]",
  },
  TRY: {
    label: "Turkish Lira",
    symbol: "₺",
    symbolClass: "text-[#bb6249]",
    tintClass: "before:bg-[radial-gradient(circle_at_top_left,rgba(242,169,143,0.16),transparent_52%)]",
  },
  MYR: {
    label: "Malaysian Ringgit",
    symbol: "RM",
    symbolClass: "text-[#3f8756]",
    tintClass: "before:bg-[radial-gradient(circle_at_top_left,rgba(159,216,164,0.15),transparent_52%)]",
  },
};

const METAL_META = {
  gold: {
    pair: "USD / G",
    label: "Gold",
    symbol: "Au",
    symbolClass: "text-[#9a7520]",
    tintClass: "before:bg-[radial-gradient(circle_at_top_left,rgba(241,207,119,0.16),transparent_52%)]",
  },
  silver: {
    pair: "USD / G",
    label: "Silver",
    symbol: "Ag",
    symbolClass: "text-[#5f6f84]",
    tintClass: "before:bg-[radial-gradient(circle_at_top_left,rgba(207,215,225,0.18),transparent_52%)]",
  },
} as const;

function formatTimestamp(value?: string | number) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
  }).format(date);
}

async function parseJsonResponse<T>(response: Response, errorMessage: string): Promise<T> {
  const raw = await response.text();

  try {
    return JSON.parse(raw) as T;
  } catch {
    throw new Error(`${errorMessage}: expected JSON but received a different response.`);
  }
}

function buildRateCards(payload: FinanceApiResponse | null): RateCard[] {
  if (!payload?.rates) return [];

  return RATE_ORDER.flatMap((code) => {
    const rate = payload.rates?.[code];
    if (typeof rate !== "number") return [];

    const meta = CURRENCY_META[code];

    return [
      {
        code,
        pair: `USD / ${code}`,
        label: meta.label,
        symbol: meta.symbol,
        rate,
        symbolClass: meta.symbolClass,
        tintClass: meta.tintClass,
      },
    ];
  });
}

function buildPreciousMetals(payload: NisabApiResponse | null): PreciousMetalCard[] {
  const gold = payload?.prices?.gold_per_gram_usd;
  const silver = payload?.prices?.silver_per_gram_usd;

  return ([
    typeof gold === "number"
      ? {
          key: "gold" as const,
          pair: METAL_META.gold.pair,
          label: METAL_META.gold.label,
          symbol: METAL_META.gold.symbol,
          value: gold,
          symbolClass: METAL_META.gold.symbolClass,
          tintClass: METAL_META.gold.tintClass,
        }
      : null,
    typeof silver === "number"
      ? {
          key: "silver" as const,
          pair: METAL_META.silver.pair,
          label: METAL_META.silver.label,
          symbol: METAL_META.silver.symbol,
          value: silver,
          symbolClass: METAL_META.silver.symbolClass,
          tintClass: METAL_META.silver.tintClass,
        }
      : null,
  ].filter(Boolean) as PreciousMetalCard[]);
}

function buildBoardItems(
  cards: RateCard[],
  metals: PreciousMetalCard[]
): FinanceBoardItem[] {
  const leadingRates = cards.slice(0, 2).map((card) => ({ kind: "rate" as const, ...card }));
  const metalItems = metals.map((metal) => ({ kind: "metal" as const, ...metal }));
  const trailingRates = cards.slice(2).map((card) => ({ kind: "rate" as const, ...card }));

  return [...leadingRates, ...metalItems, ...trailingRates];
}

function FinanceWidgetSkeleton() {
  return (
    <section className="rounded-[1.9rem] border border-[#d9d1c3] bg-[linear-gradient(135deg,#f8f3e8_0%,#f5f1eb_52%,#edf3f4_100%)] p-4 shadow-[0_18px_48px_rgba(45,38,28,0.08)] sm:p-5">
      <div className="mb-3 h-4 w-32 animate-pulse rounded-full bg-[#d9d2c6]" />
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="h-[3.5rem] animate-pulse rounded-[0.9rem] border border-[#e9decf] bg-white/80"
          />
        ))}
      </div>
    </section>
  );
}

export default function FinanceWidget() {
  const [cards, setCards] = useState<RateCard[]>([]);
  const [metals, setMetals] = useState<PreciousMetalCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatedLabel, setUpdatedLabel] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function fetchFinanceData() {
      try {
        const [ratesResult, nisabResult] = await Promise.allSettled([
          fetch("/api/v1/finance/rates?base=USD&symbols=SAR,AED,EUR,GBP,TRY,MYR", {
            headers: { Accept: "application/json" },
            cache: "no-store",
          }),
          fetch("/api/nisab", {
            headers: { Accept: "application/json" },
            cache: "no-store",
          }),
        ]);

        const nextRates =
          ratesResult.status === "fulfilled" && ratesResult.value.ok
            ? await parseJsonResponse<FinanceApiResponse>(
                ratesResult.value,
                "Finance data unavailable"
              )
            : null;

        const nextNisab =
          nisabResult.status === "fulfilled" && nisabResult.value.ok
            ? await parseJsonResponse<NisabApiResponse>(
                nisabResult.value,
                "Islamic finance data unavailable"
              )
            : null;

        if (!active) return;

        const nextCards = buildRateCards(nextRates);
        const nextMetals = buildPreciousMetals(nextNisab);

        if (!nextCards.length) {
          throw new Error("Finance data unavailable");
        }

        setCards(nextCards);
        setMetals(nextMetals);
        setUpdatedLabel(
          formatTimestamp(nextNisab?.updated_at || nextRates?.timestamp) || null
        );
        setError(null);
      } catch (nextError) {
        if (!active) return;

        const message =
          nextError instanceof Error ? nextError.message : "Finance data unavailable";
        setError(message);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    fetchFinanceData();
    const interval = window.setInterval(fetchFinanceData, REFRESH_INTERVAL_MS);

    return () => {
      active = false;
      window.clearInterval(interval);
    };
  }, []);

  if (loading) {
    return <FinanceWidgetSkeleton />;
  }

  if (error && !cards.length) {
    return (
      <section className="rounded-[2.4rem] border border-[#dfd4c2] bg-[linear-gradient(135deg,#faf5ea_0%,#f7f3ec_54%,#eff4f5_100%)] p-6 shadow-[0_18px_48px_rgba(45,38,28,0.08)] sm:p-7">
        <div className="flex items-start gap-3 rounded-[1.5rem] border border-amber-200/80 bg-amber-50/80 p-4 text-[#5f4830]">
          <TriangleAlert className="mt-0.5 h-5 w-5 flex-none" />
          <div>
            <p className="text-sm font-semibold tracking-[0.18em] text-[#9d7441] uppercase">
              Exchange Rates
            </p>
            <p className="mt-1 text-sm leading-6">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  const boardItems = buildBoardItems(cards, metals);

  return (
    <section className="relative overflow-hidden rounded-[1.9rem] border border-[#ddd2c3] bg-[linear-gradient(135deg,#f9f4e9_0%,#f5f2eb_48%,#eef4f4_100%)] p-4 shadow-[0_18px_42px_rgba(47,39,28,0.08)] sm:p-5">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_8%_18%,rgba(224,186,92,0.14),transparent_26%),radial-gradient(circle_at_88%_10%,rgba(87,140,145,0.12),transparent_22%)]" />
      <div className="relative">
        <div className="mb-2 flex items-end justify-between gap-4">
          <div>
            <p className="text-[0.74rem] font-semibold uppercase tracking-[0.32em] text-[#7c6a52]">
              Exchange Rates
            </p>
          </div>
          {updatedLabel ? (
            <p className="hidden text-[0.68rem] font-medium tracking-[0.18em] text-[#90979a] uppercase sm:block">
              Updated {updatedLabel}
            </p>
          ) : null}
        </div>

        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {boardItems.map((item, index) => (
            <motion.article
              key={item.kind === "rate" ? item.code : item.key}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.04 }}
              whileHover={{ y: -2, scale: 1.01 }}
              className={`group relative overflow-hidden rounded-[0.9rem] border border-[#e4d8c8] bg-white/88 px-2.5 py-2 shadow-[0_8px_18px_rgba(63,50,30,0.05)] transition-all duration-200 before:pointer-events-none before:absolute before:inset-0 before:opacity-100 after:pointer-events-none after:absolute after:inset-x-0 after:top-0 after:h-px after:bg-[linear-gradient(90deg,rgba(255,255,255,0.7),rgba(255,255,255,0.12),rgba(255,255,255,0.6))] hover:border-[#d8c4a4] hover:bg-white ${item.tintClass}`}
            >
              <div className="relative flex min-h-[3.2rem] items-center justify-between gap-2.5">
                <div className="flex items-center justify-between gap-2">
                  <span className={`inline-flex min-w-6 items-center justify-center text-[1.05rem] font-semibold ${item.symbolClass}`}>
                    {item.symbol}
                  </span>
                  <div>
                    <p className="text-[0.7rem] font-medium tracking-[0.16em] text-[#677076] uppercase">
                      {item.pair}
                    </p>
                    <p className="mt-0.5 text-[0.8rem] font-medium leading-snug text-[#4b555b]">
                      {item.label}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[1.48rem] font-semibold leading-none tracking-[-0.05em] text-[#1e272d]">
                    {item.kind === "metal" ? "$" : null}
                    <CountUp
                      end={item.kind === "rate" ? item.rate : item.value}
                      decimals={2}
                      duration={1.1}
                      preserveValue
                    />
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
