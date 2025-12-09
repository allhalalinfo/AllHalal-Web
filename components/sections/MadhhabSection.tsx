"use client";

/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * MADHHAB SECTION - Four Schools of Islamic Jurisprudence
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";

// Madhhab keys for translations
const madhhabKeys = ["general", "hanafi", "shafii", "maliki", "hanbali"] as const;

// Madhhab config (non-translatable data)
const madhhabConfig = {
  general: { arabicName: "عام", color: "from-primary" },
  hanafi: { arabicName: "حنفي", color: "from-emerald-500" },
  shafii: { arabicName: "شافعي", color: "from-blue-500" },
  maliki: { arabicName: "مالكي", color: "from-amber-500" },
  hanbali: { arabicName: "حنبلي", color: "from-rose-500" },
};

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] as const },
  },
};

export default function MadhhabSection() {
  const t = useTranslations("madhhab");
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={containerRef}
      id="madhhab"
      className="section bg-bg-secondary relative overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container relative z-10">
        {/* Two column: Header + Screenshot */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
          {/* Section Header */}
          <motion.div
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
              className="text-display-2 font-bold text-text-primary mb-6"
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

          {/* Madhhab Screenshot */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative mx-auto max-w-[280px]">
              <div className="absolute inset-0 bg-gradient-radial from-amber-500/20 to-transparent blur-3xl scale-150" />
              <div className="relative bg-bg-card rounded-[3rem] p-3 border border-border shadow-2xl">
                <div className="relative aspect-[9/19] rounded-[2.5rem] overflow-hidden bg-bg-tertiary">
                  <Image
                    src="/app-screens/madhhab.png"
                    alt={t("title")}
                    fill
                    className="object-cover"
                    sizes="280px"
                  />
                </div>
                <div className="absolute top-5 left-1/2 -translate-x-1/2 w-24 h-6 bg-bg-card rounded-full" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Madhhab Cards Grid - 5 options */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {madhhabKeys.map((key) => {
            const config = madhhabConfig[key];
            return (
              <motion.div
                key={key}
                variants={cardVariants}
                className="group relative"
              >
                <div className="relative h-full p-6 rounded-2xl bg-bg-card border border-border overflow-hidden transition-all duration-500 hover:border-primary/30 hover:shadow-glow-sm">
                  {/* Arabic calligraphy watermark */}
                  <div className="absolute -right-4 -top-4 text-8xl font-bold text-white/5 select-none transition-all duration-500 group-hover:text-primary/10 group-hover:scale-110">
                    {config.arabicName}
                  </div>

                  {/* Gradient accent */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${config.color} to-transparent opacity-0 group-hover:opacity-100 transition-opacity`} />

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-text-primary mb-1">
                      {t(`schools.${key}.name`)}
                    </h3>
                    <p className="text-sm text-primary mb-4">
                      {t(`schools.${key}.founder`)}
                    </p>
                    <p className="text-text-secondary text-sm mb-6 leading-relaxed">
                      {t(`schools.${key}.description`)}
                    </p>
                    <div>
                      <p className="text-xs text-text-muted uppercase tracking-wider mb-2">
                        {t("regions")}
                      </p>
                      <p className="text-xs text-text-tertiary">
                        {t(`schools.${key}.regions`)}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom note */}
        <motion.p
          className="text-center text-text-muted mt-12 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          {t("note")}
        </motion.p>
      </div>
    </section>
  );
}
