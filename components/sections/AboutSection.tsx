"use client";

/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * ABOUT SECTION - Your Trusted Halal Companion
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";

// Animated counter component
function AnimatedCounter({ value, suffix, duration = 2 }: { value: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * value));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, value, duration]);

  // Format large numbers
  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(0)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
    return num.toString();
  };

  return (
    <span ref={ref}>
      {formatNumber(count)}{suffix}
    </span>
  );
}

export default function AboutSection() {
  const t = useTranslations("about");
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  // Statistics with translations
  const stats = [
    { value: 2000000, suffix: "+", label: t("stats.products") },
    { value: 9, suffix: "", label: t("stats.languages") },
    { value: 5, suffix: "", label: t("stats.madhhab") },
    { value: 99, suffix: "%", label: t("stats.accuracy") },
  ];

  return (
    <section
      ref={containerRef}
      id="about"
      className="section bg-bg-primary relative overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg-secondary/50 to-transparent pointer-events-none" />

      <div className="container relative z-10">
        {/* Two column layout: Text + Image */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
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
              className="text-xl text-text-secondary leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {t("description")}
            </motion.p>
          </motion.div>

          {/* Hero Woman Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative mx-auto max-w-[300px]">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-radial from-primary/20 to-transparent blur-3xl scale-150" />
              
              {/* Phone frame */}
              <div className="relative bg-bg-card rounded-[3rem] p-3 border border-border shadow-2xl">
                <div className="relative aspect-[9/19] rounded-[2.5rem] overflow-hidden bg-bg-tertiary">
                  <Image
                    src="/app-screens/hero-woman.png"
                    alt="AllHalal App"
                    fill
                    className="object-cover"
                    sizes="300px"
                  />
                </div>
                <div className="absolute top-5 left-1/2 -translate-x-1/2 w-24 h-6 bg-bg-card rounded-full" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Statistics: Numbers + Screenshot */}
        <div className="grid lg:grid-cols-5 gap-8 mb-20 items-center">
          {/* Stats Grid */}
          <div className="lg:col-span-3 grid grid-cols-2 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              >
                <div className="text-4xl md:text-5xl lg:text-6xl font-black text-primary mb-2">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-text-secondary text-sm md:text-base">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Statistics Screenshot */}
          <motion.div
            className="lg:col-span-2 relative"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="relative mx-auto max-w-[240px]">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-radial from-primary/20 to-transparent blur-3xl scale-150" />
              
              {/* Phone frame */}
              <div className="relative bg-bg-card rounded-[2.5rem] p-2 border border-border shadow-2xl">
                <div className="relative aspect-[9/19] rounded-[2rem] overflow-hidden bg-bg-tertiary">
                  <Image
                    src="/app-screens/statistics.png"
                    alt="AllHalal Statistics"
                    fill
                    className="object-cover"
                    sizes="240px"
                  />
                </div>
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-5 bg-bg-card rounded-full" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Mission Statement */}
        <motion.div
          className="relative p-8 md:p-12 rounded-2xl bg-bg-card border border-border"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {/* Decorative corner */}
          <div className="absolute top-0 left-0 w-20 h-20 border-l-2 border-t-2 border-primary rounded-tl-2xl" />
          <div className="absolute bottom-0 right-0 w-20 h-20 border-r-2 border-b-2 border-primary rounded-br-2xl" />
          
          <div className="text-center max-w-3xl mx-auto">
            <motion.blockquote
              className="text-2xl md:text-3xl font-light text-text-primary leading-relaxed mb-6"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              &ldquo;{t("mission")}&rdquo;
            </motion.blockquote>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

