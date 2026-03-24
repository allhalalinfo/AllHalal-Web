"use client";

import { useTranslations, useLocale } from "@/lib/mockTranslations";
import Link from "next/link";
import SpotlightCard from "../ui/SpotlightCard";

export default function ExploreSection() {
  const t = useTranslations("explore");
  const locale = useLocale();

  const resources = [
    {
      id: "checker",
      href: `/${locale}/is-it-halal`,
      icon: (
        <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      )
    },
    {
      id: "finance",
      href: `/${locale}/finance`,
      icon: (
        <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      id: "learn",
      href: `/${locale}/learn`,
      icon: (
        <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
    {
      id: "blog",
      href: `/${locale}/news`,
      icon: (
        <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
      )
    }
  ];

  return (
    <section className="section bg-bg-primary relative overflow-hidden border-t border-border">
      <div className="container relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-primary text-sm font-semibold uppercase tracking-widest mb-4">
            {t("subtitle")}
          </span>
          <h2 className="text-display-2 font-bold font-display text-text-primary mb-6">
            {t("title")}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* Halal Checker - Green */}
          <Link href={resources[0].href} className="group block">
            <SpotlightCard className="h-full bg-accent-green text-text-inverse border-transparent hover:border-accent-green/50 transition-all">
              {/* Background Image Layer */}
              <div 
                className="absolute inset-0 opacity-20 bg-cover bg-bottom bg-no-repeat mix-blend-overlay group-hover:scale-105 transition-transform duration-700 pointer-events-none"
                style={{ backgroundImage: "url('/assets/card-bg.png')" }}
              />
              <div className="relative z-10 flex flex-col sm:flex-row gap-6 items-start p-8 h-full">
                <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 group-hover:bg-white/20 transition-colors">
                  <div className="text-white">{resources[0].icon}</div>
                </div>
                <div>
                  <h3 className="text-xl font-bold font-display text-text-inverse mb-2 flex items-center gap-2 group-hover:text-white transition-colors">
                    {t(`${resources[0].id}.title`)}
                    <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                      &rarr;
                    </span>
                  </h3>
                  <p className="text-text-inverse-secondary leading-relaxed">
                    {t(`${resources[0].id}.desc`)}
                  </p>
                </div>
              </div>
            </SpotlightCard>
          </Link>

          {/* Finance - Dark Chocolate */}
          <Link href={resources[1].href} className="group block">
            <SpotlightCard className="h-full bg-bg-dark text-text-inverse border-transparent hover:border-white/10 transition-all">
              {/* Background Image Layer */}
              <div 
                className="absolute inset-0 opacity-20 bg-cover bg-bottom bg-no-repeat mix-blend-overlay group-hover:scale-105 transition-transform duration-700 pointer-events-none"
                style={{ backgroundImage: "url('/assets/card-bg.png')" }}
              />
              <div className="relative z-10 flex flex-col sm:flex-row gap-6 items-start p-8 h-full">
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-white/10 transition-colors">
                  <div className="text-accent-yellow">{resources[1].icon}</div>
                </div>
                <div>
                  <h3 className="text-xl font-bold font-display text-text-inverse mb-2 flex items-center gap-2 group-hover:text-accent-yellow transition-colors">
                    {t(`${resources[1].id}.title`)}
                    <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-accent-yellow">
                      &rarr;
                    </span>
                  </h3>
                  <p className="text-text-inverse-secondary leading-relaxed">
                    {t(`${resources[1].id}.desc`)}
                  </p>
                </div>
              </div>
            </SpotlightCard>
          </Link>

          {/* Learn - Navy */}
          <Link href={resources[2].href} className="group block">
            <SpotlightCard className="h-full bg-accent-navy text-text-inverse border-transparent hover:border-accent-navy/50 transition-all">
              {/* Background Image Layer */}
              <div 
                className="absolute inset-0 opacity-20 bg-cover bg-bottom bg-no-repeat mix-blend-overlay group-hover:scale-105 transition-transform duration-700 pointer-events-none"
                style={{ backgroundImage: "url('/assets/card-bg.png')" }}
              />
              <div className="relative z-10 flex flex-col sm:flex-row gap-6 items-start p-8 h-full">
                <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 group-hover:bg-white/20 transition-colors">
                  <div className="text-white">{resources[2].icon}</div>
                </div>
                <div>
                  <h3 className="text-xl font-bold font-display text-text-inverse mb-2 flex items-center gap-2 group-hover:text-white transition-colors">
                    {t(`${resources[2].id}.title`)}
                    <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                      &rarr;
                    </span>
                  </h3>
                  <p className="text-text-inverse-secondary leading-relaxed">
                    {t(`${resources[2].id}.desc`)}
                  </p>
                </div>
              </div>
            </SpotlightCard>
          </Link>

          {/* Blog - Olive */}
          <Link href={resources[3].href} className="group block">
            <SpotlightCard className="h-full bg-accent-olive text-text-inverse border-transparent hover:border-accent-olive/50 transition-all">
              {/* Background Image Layer */}
              <div 
                className="absolute inset-0 opacity-20 bg-cover bg-bottom bg-no-repeat mix-blend-overlay group-hover:scale-105 transition-transform duration-700 pointer-events-none"
                style={{ backgroundImage: "url('/assets/card-bg.png')" }}
              />
              <div className="relative z-10 flex flex-col sm:flex-row gap-6 items-start p-8 h-full">
                <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 group-hover:bg-white/20 transition-colors">
                  <div className="text-white">{resources[3].icon}</div>
                </div>
                <div>
                  <h3 className="text-xl font-bold font-display text-text-inverse mb-2 flex items-center gap-2 group-hover:text-white transition-colors">
                    {t(`${resources[3].id}.title`)}
                    <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                      &rarr;
                    </span>
                  </h3>
                  <p className="text-text-inverse-secondary leading-relaxed">
                    {t(`${resources[3].id}.desc`)}
                  </p>
                </div>
              </div>
            </SpotlightCard>
          </Link>

        </div>
      </div>
    </section>
  );
}