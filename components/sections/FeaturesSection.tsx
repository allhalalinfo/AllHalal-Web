"use client";

/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * FEATURES SECTION - NO FLICKERING
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { useTranslations } from "next-intl";
import Image from "next/image";

const featureKeys = ["scan", "verified", "cosmetics", "prayer", "watch"] as const;

const featureConfig: Record<string, { image: string; color: string; premium?: boolean }> = {
  scan: { image: "/app-screens/ingredient-scan.png", color: "from-emerald-500/20" },
  verified: { image: "/app-screens/product-verified.png", color: "from-blue-500/20" },
  cosmetics: { image: "/app-screens/cosmetics.png", color: "from-pink-500/20", premium: true },
  prayer: { image: "/app-screens/prayer-times.png", color: "from-purple-500/20" },
  watch: { image: "/app-screens/smartwatch.png", color: "from-cyan-500/20", premium: true },
};

export default function FeaturesSection() {
  const t = useTranslations("features");

  return (
    <section id="features" className="section-lg bg-bg-primary relative overflow-hidden">
      <div className="container relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-24">
          <span className="inline-block text-primary text-sm font-semibold uppercase tracking-widest mb-4">
            {t("subtitle")}
          </span>
          
          <h2 className="text-display-1 font-bold text-text-primary mb-6">
            {t("title")}
          </h2>
          
          <p className="text-xl text-text-secondary">
            {t("description")}
          </p>
        </div>

        {/* Features List */}
        <div className="space-y-32">
          {featureKeys.map((key, index) => {
            const config = featureConfig[key];
            const isReversed = index % 2 !== 0;

  return (
              <div
                key={key}
      className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
        isReversed ? "lg:flex-row-reverse" : ""
      }`}
    >
      {/* Content */}
                <div className={isReversed ? "lg:order-2" : ""}>
                  {config.premium && (
                    <span className="inline-block px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-semibold mb-4">
                      {t("premium")}
              </span>
                  )}

                  <h3 className="text-display-3 font-bold text-text-primary mb-6">
                    {t(`items.${key}.title`)}
                  </h3>

                  <p className="text-lg text-text-secondary leading-relaxed">
                    {t(`items.${key}.description`)}
                  </p>
      </div>

      {/* Image */}
                <div className={`relative ${isReversed ? "lg:order-1" : ""}`}>
        <div className="relative mx-auto max-w-[320px]">
                    <div className={`absolute inset-0 bg-gradient-radial ${config.color} to-transparent blur-3xl scale-150 opacity-50`} />
          
          <div className="relative bg-bg-card rounded-[3rem] p-3 border border-border shadow-2xl">
            <div className="relative aspect-[9/19] rounded-[2.5rem] overflow-hidden bg-bg-tertiary">
              <Image
                          src={config.image}
                          alt={t(`items.${key}.title`)}
                fill
                className="object-cover"
                sizes="320px"
              />
            </div>
            <div className="absolute top-5 left-1/2 -translate-x-1/2 w-24 h-6 bg-bg-card rounded-full" />
          </div>
        </div>
                </div>
              </div>
  );
          })}
        </div>
      </div>
    </section>
  );
}
