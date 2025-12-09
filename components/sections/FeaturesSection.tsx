"use client";

/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * FEATURES SECTION - Main App Features Showcase
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";

// Feature keys for translations
const featureKeys = ["scan", "verified", "cosmetics", "prayer", "watch"] as const;

// Feature images and colors
const featureConfig = {
  scan: { image: "/app-screens/ingredient-scan.png", color: "from-emerald-500/20" },
  verified: { image: "/app-screens/product-verified.png", color: "from-blue-500/20" },
  cosmetics: { image: "/app-screens/cosmetics.png", color: "from-pink-500/20", premium: true },
  prayer: { image: "/app-screens/prayer-times.png", color: "from-purple-500/20" },
  watch: { image: "/app-screens/smartwatch.png", color: "from-cyan-500/20", premium: true },
};

export default function FeaturesSection() {
  const t = useTranslations("features");
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={containerRef}
      id="features"
      className="section-lg bg-bg-primary relative overflow-hidden"
    >
      <div className="container relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-24"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            className="inline-block text-primary text-sm font-semibold uppercase tracking-widest mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {t("subtitle")}
          </motion.span>
          
          <motion.h2
            className="text-display-1 font-bold text-text-primary mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t("title")}
          </motion.h2>
          
          <motion.p
            className="text-xl text-text-secondary"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {t("description")}
          </motion.p>
        </motion.div>

        {/* Features List */}
        <div className="space-y-32">
          {featureKeys.map((key, index) => (
            <FeatureItem
              key={key}
              featureKey={key}
              config={featureConfig[key]}
              index={index}
              isReversed={index % 2 !== 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// Feature Item Component
interface FeatureItemProps {
  featureKey: typeof featureKeys[number];
  config: { image: string; color: string; premium?: boolean };
  index: number;
  isReversed: boolean;
}

function FeatureItem({ featureKey, config, index, isReversed }: FeatureItemProps) {
  const t = useTranslations("features");
  const itemRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(itemRef, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={itemRef}
      className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
        isReversed ? "lg:flex-row-reverse" : ""
      }`}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.1 }}
    >
      {/* Content */}
      <div className={`${isReversed ? "lg:order-2" : ""}`}>
        {config.premium && (
          <motion.span
            className="inline-block px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-semibold mb-4"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            {t("premium")}
          </motion.span>
        )}

        <motion.h3
          className="text-display-3 font-bold text-text-primary mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {t(`items.${featureKey}.title`)}
        </motion.h3>

        <motion.p
          className="text-lg text-text-secondary leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {t(`items.${featureKey}.description`)}
        </motion.p>
      </div>

      {/* Image */}
      <motion.div
        className={`relative ${isReversed ? "lg:order-1" : ""}`}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        {/* Phone mockup container */}
        <div className="relative mx-auto max-w-[320px]">
          {/* Glow effect */}
          <div className={`absolute inset-0 bg-gradient-radial ${config.color} to-transparent blur-3xl scale-150 opacity-50`} />
          
          {/* Phone frame */}
          <div className="relative bg-bg-card rounded-[3rem] p-3 border border-border shadow-2xl">
            {/* Screen */}
            <div className="relative aspect-[9/19] rounded-[2.5rem] overflow-hidden bg-bg-tertiary">
              <Image
                src={config.image}
                alt={t(`items.${featureKey}.title`)}
                fill
                className="object-cover"
                sizes="320px"
              />
            </div>
            
            {/* Notch */}
            <div className="absolute top-5 left-1/2 -translate-x-1/2 w-24 h-6 bg-bg-card rounded-full" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
