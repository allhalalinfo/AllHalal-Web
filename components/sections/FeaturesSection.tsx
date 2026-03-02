"use client";

/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * FEATURES SECTION - NO FLICKERING
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { useTranslations } from "next-intl";
import Image from "next/image";

const featureKeys = [
  "lifestyle", "scan", "ingredients", "cosmetics", 
  "ecodes", "restaurants", "prayer", "authorities", 
  "journey", "status"
] as const;

const featureConfig: Record<string, { image: string; color: string; premium?: boolean }> = {
  lifestyle: { image: "/app-screens/1.png", color: "from-primary/20" },
  scan: { image: "/app-screens/2.png", color: "from-amber-600/20" },
  ingredients: { image: "/app-screens/3.png", color: "from-orange-500/20" },
  cosmetics: { image: "/app-screens/4.png", color: "from-stone-500/20" },
  ecodes: { image: "/app-screens/5.png", color: "from-yellow-600/20" },
  restaurants: { image: "/app-screens/6.png", color: "from-primary/20" },
  prayer: { image: "/app-screens/7.png", color: "from-amber-600/20" },
  authorities: { image: "/app-screens/8.png", color: "from-orange-500/20" },
  journey: { image: "/app-screens/9.png", color: "from-stone-500/20" },
  status: { image: "/app-screens/10.png", color: "from-yellow-600/20" },
};

export default function FeaturesSection() {
  const t = useTranslations("features");

  return (
    <section id="features" className="section-lg bg-bg-primary relative overflow-hidden">
      <div className="relative z-10">
        {/* Section Header */}
        <div className="container relative z-10 text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <span className="inline-block text-primary text-sm font-semibold uppercase tracking-widest mb-4">
            {t("subtitle")}
          </span>
          
          <h2 className="text-display-1 font-bold font-display text-text-primary mb-6">
            {t("title")}
          </h2>
          
          <p className="text-xl text-text-secondary">
            {t("description")}
          </p>
        </div>

        {/* Features Carousel - Full Width */}
        <div className="relative z-10 w-full">
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 md:gap-10 pb-16 pt-8 px-6 md:px-12 xl:px-24 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {featureKeys.map((key) => {
              const config = featureConfig[key];

              return (
                <div
                  key={key}
                  className="flex-none w-[260px] md:w-[300px] snap-center flex flex-col gap-6"
                >
                  {/* Image */}
                  <div className="relative mx-auto w-full">
                    <div className={`absolute inset-0 bg-gradient-radial ${config.color} to-transparent blur-3xl scale-125 opacity-40`} />
                    
                    <div className="relative bg-bg-card rounded-[2.5rem] p-2 border border-border shadow-xl">
                      <div className="relative aspect-[9/19] rounded-[2rem] overflow-hidden bg-bg-tertiary">
                        <Image
                          src={config.image}
                          alt={t(`items.${key}.title`)}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 280px, 320px"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="text-center px-2">
                    {config.premium && (
                      <span className="inline-block px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-semibold mb-3">
                        {t("premium")}
                      </span>
                    )}
                    <h3 className="text-xl font-bold font-display text-text-primary mb-3">
                      {t(`items.${key}.title`)}
                    </h3>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {t(`items.${key}.description`)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
