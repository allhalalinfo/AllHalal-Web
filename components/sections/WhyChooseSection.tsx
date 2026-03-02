"use client";

/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * WHY CHOOSE SECTION - NO FLICKERING
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { useTranslations } from "next-intl";
import SpotlightCard from "../ui/SpotlightCard";

export default function WhyChooseSection() {
  const t = useTranslations("whyChoose");

  const reasons = [
    { icon: BookIcon, key: "scholarship" },
    { icon: ChipIcon, key: "ai" },
    { icon: GlobeIcon, key: "database" },
  ];

  return (
    <section className="section bg-bg-dark text-text-inverse relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-accent-yellow/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-accent-yellow text-sm font-semibold uppercase tracking-widest mb-4">
            {t("subtitle")}
          </span>
          
          <h2 className="text-display-2 font-bold font-display text-text-inverse mb-6">
            {t("title")}
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {reasons.map((reason, index) => (
            <div key={reason.key} className="group">
              <SpotlightCard className="h-full p-8 bg-white/5 border-white/10 hover:border-accent-yellow/50 transition-colors">
                <div className="relative z-10">
                  {/* Icon - Mobile: always active, Desktop: hover */}
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-colors bg-accent-yellow/10 md:group-hover:bg-accent-yellow/20">
                    <reason.icon className="w-7 h-7 text-accent-yellow" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold font-display text-text-inverse mb-4">
                    {t(`reasons.${reason.key}.title`)}
                  </h3>

                  {/* Description */}
                  <p className="text-text-inverse-secondary leading-relaxed">
                    {t(`reasons.${reason.key}.description`)}
                  </p>
                </div>

                {/* Card number */}
                <div className="absolute top-6 right-6 text-6xl font-black text-white/5 select-none transition-colors group-hover:text-accent-yellow/10">
                  {String(index + 1).padStart(2, "0")}
                </div>
              </SpotlightCard>
              </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  );
}

function ChipIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-13.5 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-14.25h10.5a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 16.5v-7.5a2.25 2.25 0 012.25-2.25z" />
    </svg>
  );
}

function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
    </svg>
  );
}
