"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeDollarSign,
  RefreshCw,
  Signal,
  TriangleAlert,
} from "lucide-react";

type CurrencyCode = "EUR" | "GBP" | "SAR" | "AED" | "TRY" | "MYR";

type RateCard = {
  code: CurrencyCode;
  label: string;
  region: string;
  accent: string;
  decimals: number;
  microCopy: string;
  value: number;
};

type FinanceApiResponse = {
  success?: boolean;
  base?: string;
  rates?: Partial<Record<CurrencyCode, number>>;
  timestamp?: number;
  cached?: boolean;
  age_hours?: number;
  fallback?: boolean;
  message?: string;
};

const REFRESH_INTERVAL_MS = 1000 * 60 * 5;
const RATE_ORDER: CurrencyCode[] = ["SAR", "AED", "EUR", "GBP", "TRY", "MYR"];
const CURRENCY_META: Record<CurrencyCode, Omit<RateCard, "value">> = {
  SAR: {
    code: "SAR",
    label: "Saudi Riyal",
    region: "Makkah and Madinah travel",
    accent: "from-[#f3c86a]/35 via-[#f3c86a]/5 to-transparent",
    decimals: 2,
    microCopy: "Useful for Umrah and Hajj budgeting",
  },
  AED: {
    code: "AED",
    label: "UAE Dirham",
    region: "Gulf family finance",
    accent: "from-[#88c2b9]/35 via-[#88c2b9]/5 to-transparent",
    decimals: 2,
    microCopy: "Track GCC spending and remittance flows",
  },
  EUR: {
    code: "EUR",
    label: "Euro",
    region: "European Muslim households",
    accent: "from-[#8cb0ff]/35 via-[#8cb0ff]/5 to-transparent",
    decimals: 2,
    microCopy: "Compare halal savings and zakat in Europe",
  },
  GBP: {
    code: "GBP",
    label: "British Pound",
    region: "UK Islamic banking",
    accent: "from-[#d6a0ff]/35 via-[#d6a0ff]/5 to-transparent",
    decimals: 2,
    microCopy: "Helpful for UK mortgages and savings",
  },
  TRY: {
    code: "TRY",
    label: "Turkish Lira",
    region: "Turkey market watch",
    accent: "from-[#ff9c8a]/35 via-[#ff9c8a]/5 to-transparent",
    decimals: 2,
    microCopy: "Monitor price movement around halal travel",
  },
  MYR: {
    code: "MYR",
    label: "Malaysian Ringgit",
    region: "Southeast Asia",
    accent: "from-[#8fd58f]/35 via-[#8fd58f]/5 to-transparent",
    decimals: 2,
    microCopy: "Follow Malaysia's Islamic finance hub",
  },
};

function buildRateCards(payload: FinanceApiResponse): RateCard[] {
  return RATE_ORDER.flatMap((code) => {
    const value = payload.rates?.[code];

    if (typeof value !== "number") {
      return [];
    }

    return [
      {
        ...CURRENCY_META[code],
        value,
      },
    ];
  });
}

function formatUpdatedLabel(timestamp: number | null, nowTick: number) {
  if (!timestamp) {
    return "Awaiting first update";
  }

  const elapsedSeconds = Math.max(0, Math.floor(nowTick / 1000 - timestamp));

  if (elapsedSeconds < 60) {
    return "Updated just now";
  }

  if (elapsedSeconds < 3600) {
    return `Updated ${Math.floor(elapsedSeconds / 60)} min ago`;
  }

  if (elapsedSeconds < 86400) {
    return `Updated ${Math.floor(elapsedSeconds / 3600)} h ago`;
  }

  return `Updated ${Math.floor(elapsedSeconds / 86400)} d ago`;
}

function FinanceWidgetSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {Array.from({ length: 4 }).map((_, index) => (
        <motion.div
          key={index}
          className="rounded-[1.5rem] border border-white/10 bg-white/8 p-5 backdrop-blur-md"
          animate={{ opacity: [0.45, 0.9, 0.45] }}
          transition={{ duration: 1.4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        >
          <div className="h-3 w-20 rounded-full bg-white/15" />
          <div className="mt-4 h-6 w-28 rounded-full bg-white/20" />
          <div className="mt-8 h-10 w-24 rounded-full bg-white/25" />
          <div className="mt-3 h-3 w-32 rounded-full bg-white/15" />
        </motion.div>
      ))}
    </div>
  );
}

export default function FinanceWidget({ locale }: { locale: string }) {
  const [cards, setCards] = useState<RateCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastTimestamp, setLastTimestamp] = useState<number | null>(null);
  const [isCached, setIsCached] = useState(false);
  const [isFallback, setIsFallback] = useState(false);
  const [nowTick, setNowTick] = useState(Date.now());

  useEffect(() => {
    let active = true;

    const fetchRates = async (backgroundRefresh = false) => {
      if (backgroundRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      try {
        const response = await fetch(
          "/api/v1/finance/rates?base=USD&symbols=SAR,AED,EUR,GBP,TRY,MYR",
          {
            headers: { Accept: "application/json" },
            cache: "no-store",
          }
        );
        const payload = (await response.json()) as FinanceApiResponse;

        if (!response.ok || payload.success === false) {
          throw new Error(payload.message || "Could not load exchange rates.");
        }

        if (!active) {
          return;
        }

        setCards(buildRateCards(payload));
        setLastTimestamp(
          typeof payload.timestamp === "number" ? payload.timestamp : Math.floor(Date.now() / 1000)
        );
        setIsCached(Boolean(payload.cached));
        setIsFallback(Boolean(payload.fallback));
        setError(null);
      } catch (fetchError) {
        if (!active) {
          return;
        }

        const message =
          fetchError instanceof Error ? fetchError.message : "Could not load exchange rates.";
        setError(message);
      } finally {
        if (!active) {
          return;
        }

        setLoading(false);
        setRefreshing(false);
      }
    };

    void fetchRates(false);

    const refreshTimer = window.setInterval(() => {
      void fetchRates(true);
    }, REFRESH_INTERVAL_MS);
    const clockTimer = window.setInterval(() => {
      setNowTick(Date.now());
    }, 30000);

    return () => {
      active = false;
      window.clearInterval(refreshTimer);
      window.clearInterval(clockTimer);
    };
  }, []);

  const updateLabel = formatUpdatedLabel(lastTimestamp, nowTick);

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
      className="relative overflow-hidden rounded-[2.25rem] border border-[rgba(47,37,30,0.08)] bg-[linear-gradient(135deg,rgba(255,255,255,0.86),rgba(247,242,232,0.92))] shadow-[0_24px_90px_rgba(45,33,20,0.12)]"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_16%,rgba(244,185,66,0.16),transparent_22%),radial-gradient(circle_at_82%_18%,rgba(75,110,112,0.18),transparent_28%),radial-gradient(circle_at_72%_82%,rgba(176,144,98,0.12),transparent_30%)]" />
        <div className="absolute -left-20 top-16 h-44 w-44 rounded-full bg-[rgba(244,185,66,0.16)] blur-3xl" />
        <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-[rgba(75,110,112,0.14)] blur-3xl" />
      </div>

      <div className="relative grid gap-6 p-6 sm:p-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-8">
        <div className="flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(47,37,30,0.08)] bg-white/80 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.24em] text-text-secondary backdrop-blur-md">
              <Signal className="h-3.5 w-3.5 text-primary" />
              Live Finance Signal
            </div>

            <h2 className="mt-5 max-w-md text-[2.25rem] font-black font-display leading-[0.95] text-text-primary sm:text-[2.75rem]">
              Exchange rates that make the finance section feel alive.
            </h2>

            <p className="mt-4 max-w-xl text-base leading-relaxed text-text-secondary sm:text-lg">
              Real-time currency context for zakat planning, halal travel, remittances and Islamic
              finance reading. Built to feel fast, polished and unmistakably current.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <div className="rounded-full border border-[rgba(47,37,30,0.08)] bg-white/72 px-4 py-2 text-sm text-text-secondary backdrop-blur-md">
              6 tracked currencies
            </div>
            <div className="rounded-full border border-[rgba(47,37,30,0.08)] bg-white/72 px-4 py-2 text-sm text-text-secondary backdrop-blur-md">
              Auto refresh every 5 minutes
            </div>
            <div className="rounded-full border border-[rgba(47,37,30,0.08)] bg-white/72 px-4 py-2 text-sm text-text-secondary backdrop-blur-md">
              {isFallback ? "Graceful fallback enabled" : isCached ? "Serving cached upstream data" : "Direct live read"}
            </div>
          </div>

          <div className="mt-8">
            <Link
              href={`/${locale}/finance`}
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-gold px-5 py-3 text-sm font-semibold text-[var(--color-text-on-gradient)] shadow-[0_18px_50px_rgba(176,144,98,0.28)] transition-transform duration-300 hover:-translate-y-0.5"
            >
              Explore the Finance Hub
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[2rem] bg-[linear-gradient(180deg,#26333B,#111A1F)] p-5 text-white shadow-[0_26px_70px_rgba(17,24,31,0.35)] sm:p-6">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(244,185,66,0.22),transparent_24%),radial-gradient(circle_at_80%_20%,rgba(136,194,185,0.18),transparent_28%)]" />
          <div className="relative">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.22em] text-white/70">
                  <BadgeDollarSign className="h-3.5 w-3.5 text-[#F4B942]" />
                  USD Base
                </div>
                <h3 className="mt-4 text-2xl font-bold font-display leading-tight text-white">
                  Live Exchange Rates
                </h3>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-white/64">
                  A responsive card designed for finance momentum, not placeholder content.
                </p>
              </div>

              <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/6 px-4 py-2 text-sm text-white/72 backdrop-blur-md">
                <span className="relative inline-flex h-2.5 w-2.5">
                  <span className="absolute inset-0 animate-ping rounded-full bg-[#74e4c7] opacity-60" />
                  <span className="relative rounded-full bg-[#74e4c7] h-2.5 w-2.5" />
                </span>
                <span>{updateLabel}</span>
                <RefreshCw
                  className={`h-4 w-4 ${refreshing ? "animate-spin text-[#F4B942]" : "text-white/50"}`}
                />
              </div>
            </div>

            <div className="mt-6">
              {loading ? (
                <FinanceWidgetSkeleton />
              ) : error && cards.length === 0 ? (
                <div className="rounded-[1.5rem] border border-[rgba(255,255,255,0.09)] bg-white/7 p-6 backdrop-blur-md">
                  <div className="flex items-start gap-3">
                    <TriangleAlert className="mt-0.5 h-5 w-5 text-[#F4B942]" />
                    <div>
                      <p className="text-lg font-semibold text-white">Finance feed unavailable</p>
                      <p className="mt-2 text-sm leading-relaxed text-white/70">{error}</p>
                      <button
                        type="button"
                        onClick={() => window.location.reload()}
                        className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/8 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/12"
                      >
                        Retry widget
                        <RefreshCw className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2">
                  {cards.map((card, index) => (
                    <motion.div
                      key={`${card.code}-${card.value}`}
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.45, ease: "easeOut", delay: index * 0.06 }}
                      whileHover={{ y: -6, scale: 1.015 }}
                      className="group relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/7 p-5 backdrop-blur-md"
                    >
                      <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${card.accent} opacity-90`} />
                      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.65),transparent)]" />

                      <div className="relative">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-[0.68rem] font-bold uppercase tracking-[0.22em] text-white/50">
                              USD / {card.code}
                            </p>
                            <h4 className="mt-3 text-xl font-bold text-white">{card.label}</h4>
                          </div>
                          <span className="rounded-full border border-white/10 bg-black/15 px-2.5 py-1 text-[0.64rem] font-bold uppercase tracking-[0.18em] text-white/60">
                            Live
                          </span>
                        </div>

                        <div className="mt-7 flex items-end justify-between gap-4">
                          <div>
                            <div className="text-[2rem] font-black leading-none tracking-tight text-white tabular-nums">
                              <CountUp
                                start={Math.max(card.value - 0.18, 0)}
                                end={card.value}
                                duration={1.1}
                                decimals={card.decimals}
                                separator=","
                              />
                            </div>
                            <p className="mt-2 text-sm text-white/58">{card.region}</p>
                          </div>
                          <div className="max-w-[8rem] text-right text-[0.72rem] leading-relaxed text-white/52">
                            {card.microCopy}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-5 text-sm text-white/62">
              <div className="flex flex-wrap items-center gap-3">
                <span>{updateLabel}</span>
                <span className="h-1 w-1 rounded-full bg-white/25" />
                <span>{isFallback ? "Snapshot mode" : isCached ? "Cached upstream" : "Live endpoint"}</span>
              </div>
              <Link
                href={`/${locale}/finance`}
                className="group inline-flex items-center gap-2 font-medium text-white transition-colors hover:text-[#F4B942]"
              >
                View all finance guides
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
