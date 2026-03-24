"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function PrayerTimesWidget({ locale }: { locale: string }) {
  const [city, setCity] = useState("Detecting location...");
  const [nextPrayer, setNextPrayer] = useState({ name: "Maghrib", time: "18:45", in: "2 hrs 15 mins" });
  const [loading, setLoading] = useState(true);

  // Here we will copy the actual fetch logic later. 
  // For now, it's a visually impressive placeholder.
  useEffect(() => {
    // Simulate geo API
    setTimeout(() => {
      setCity("London, UK");
      setLoading(false);
    }, 1500);
  }, []);

  return (
    <Link href={`/prayer-times`} className="block h-full group">
      <div className="bg-accent-teal text-text-inverse rounded-[2rem] p-8 h-full relative overflow-hidden shadow-card hover:shadow-card-hover transition-all border border-transparent hover:border-white/20">
        {/* Background */}
        <div 
          className="absolute inset-0 opacity-20 bg-cover bg-bottom bg-no-repeat mix-blend-overlay group-hover:scale-105 transition-transform duration-700 pointer-events-none"
          style={{ backgroundImage: "url('/assets/card-bg.png')" }}
        />
        
        <div className="relative z-10 h-full flex flex-col justify-between">
          <div className="flex justify-between items-start mb-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 mb-3 text-xs font-bold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Live
              </div>
              <h3 className="text-2xl font-bold font-display flex items-center gap-2">
                <svg className="w-5 h-5 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {city}
              </h3>
            </div>
          </div>

          <div className="flex items-end justify-between">
            <div>
              <p className="text-white/60 text-sm font-medium uppercase tracking-wider mb-1">Next Prayer</p>
              <div className="text-5xl font-black font-display tracking-tight mb-1">{nextPrayer.name}</div>
              <p className="text-accent-yellow font-bold">{nextPrayer.time} • in {nextPrayer.in}</p>
            </div>
            <div className="text-6xl opacity-20 group-hover:opacity-40 transition-opacity transform group-hover:rotate-12 duration-500">
              🕌
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
