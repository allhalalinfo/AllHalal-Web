"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function HijriCalendarWidget({ locale }: { locale: string }) {
  const [hijriDate, setHijriDate] = useState("Loading…");
  const [gregorianDate, setGregorianDate] = useState("");

  useEffect(() => {
    try {
      setHijriDate(
        new Intl.DateTimeFormat("en-US-u-ca-islamic", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }).format(new Date()),
      );
    } catch {
      setHijriDate("Islamic date");
    }
    setGregorianDate(
      new Intl.DateTimeFormat(locale === "ru" ? "ru-RU" : "en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(new Date()),
    );
  }, [locale]);

  return (
    <Link href="/learn/islamic-calendar" className="block h-full group">
      <div className="bg-bg-dark text-text-inverse rounded-[2rem] p-8 h-full relative overflow-hidden shadow-card hover:shadow-card-hover transition-all border border-transparent hover:border-white/20">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[100%] h-[140%] bg-accent-yellow/10 rounded-full blur-[80px] pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity duration-1000" />
        </div>

        <div className="relative z-10 h-full flex flex-col justify-between">
          <div>
            <div className="text-white/60 text-sm font-medium uppercase tracking-wider mb-2 flex items-center justify-between">
              Islamic Calendar
              <svg
                className="w-4 h-4 opacity-50 group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
            <div className="text-3xl font-bold font-display leading-tight text-accent-yellow mb-2">
              {hijriDate}
            </div>
            <div className="text-white/80">{gregorianDate || "Today"}</div>
          </div>

          <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="font-bold mb-1">Months & sacred days</div>
            <div className="text-sm text-white/70">
              See the 12 Hijri months, Ramadan, Eid and how sighting vs calculation works.
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
