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

  const renderFeatureCard = (key: typeof featureKeys[number], indexKey: string) => {
    const config = featureConfig[key];

    return (
      <div
        key={indexKey}
        className="flex-none w-[260px] md:w-[300px] snap-center flex flex-col gap-6 transform-gpu"
      >
        <div className="relative mx-auto w-full">
          <div className={`absolute inset-0 bg-gradient-radial ${config.color} to-transparent scale-125 opacity-40 pointer-events-none`} />

          <div className="relative bg-bg-card rounded-[2.5rem] p-2 border border-border shadow-xl">
            <div className="relative aspect-[9/19] rounded-[2rem] overflow-hidden bg-bg-tertiary">
              <Image
                src={config.image}
                alt={t(`items.${key}.title`)}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 280px, 320px"
                priority
              />
            </div>
          </div>
        </div>

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
  };

  return (
    <>
      {/* Section Header */}
      <section id="features" className="section-sm bg-bg-primary relative overflow-hidden">
        <div className="container relative z-10 mx-auto mb-10 max-w-3xl text-center md:mb-14">
          <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-widest text-primary">
            {t("subtitle")}
          </span>

          <h2 className="mb-4 font-display text-display-1 font-bold text-text-primary">
            {t("title")}
          </h2>

          <p className="text-lg text-text-secondary md:text-xl">
            {t("description")}
          </p>
        </div>
      </section>

      {/* Features Carousel - Full Width Breakout */}
      <div style={{
        position: 'relative',
        left: '50%',
        right: '50%',
        marginLeft: '-50vw',
        marginRight: '-50vw',
        width: '100vw',
        maxWidth: '100vw'
      }} className="bg-bg-primary pb-16 md:pb-20">
        <div className="flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-12 pt-2 md:gap-10 md:px-12 md:pb-14 [scrollbar-width:none] [-ms-overflow-style:none] lg:hidden [&::-webkit-scrollbar]:hidden">
          {featureKeys.map((key) => renderFeatureCard(key, key))}
        </div>

        <div className="hidden pb-12 pt-2 lg:block lg:pb-14">
          <div className="marquee-rail">
            <div className="marquee-track gap-10 xl:gap-12 pl-10 xl:pl-12 pr-10 xl:pr-12">
              {featureKeys.map((key, index) => renderFeatureCard(key, `primary-${key}-${index}`))}
              {featureKeys.map((key, index) => renderFeatureCard(key, `secondary-${key}-${index}`))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
