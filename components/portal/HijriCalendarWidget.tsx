"use client";

import Link from "next/link";

export default function HijriCalendarWidget({ locale }: { locale: string }) {
  // Placeholder data
  const hijriDate = "15 Ramadan 1447";
  const gregorianDate = "Wednesday, March 4, 2026";
  
  return (
    <Link href={`/learn/islamic-calendar`} className="block h-full group">
      <div className="bg-bg-dark text-text-inverse rounded-[2rem] p-8 h-full relative overflow-hidden shadow-card hover:shadow-card-hover transition-all border border-transparent hover:border-white/20">
        
        {/* Layer 1: Ambient Radial Glows (Spotlight effect) */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[100%] h-[140%] bg-accent-yellow/10 rounded-full blur-[80px] pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity duration-1000" />
        </div>

        <div className="relative z-10 h-full flex flex-col justify-between">
          <div>
            <div className="text-white/60 text-sm font-medium uppercase tracking-wider mb-2 flex items-center justify-between">
              Islamic Calendar
              <svg className="w-4 h-4 opacity-50 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <div className="text-3xl font-bold font-display leading-tight text-accent-yellow mb-2">
              {hijriDate}
            </div>
            <div className="text-white/80">
              {gregorianDate}
            </div>
          </div>

          <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10 flex items-start gap-4">
             <div className="text-2xl mt-1">🌙</div>
             <div>
               <div className="font-bold mb-1">Ramadan Status</div>
               <div className="text-sm text-white/70">Fasting ends at 18:45 tonight. May Allah accept your fast.</div>
             </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
