"use client";

/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * ABOUT SECTION - NO FLICKERING
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * Static render - no opacity animations that cause flickering
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { useRef, useEffect, useState } from "react";
import { useTranslations } from "@/lib/mockTranslations";

// Animated counter component
function AnimatedCounter({ value, suffix, duration = 2 }: { value: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (hasAnimated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasAnimated(true);
    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * value));
            if (progress < 1) requestAnimationFrame(animate);
          };
        requestAnimationFrame(animate);
          observer.disconnect();
      }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, duration, hasAnimated]);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(0)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
    return num.toString();
  };

  return <span ref={ref}>{formatNumber(count)}{suffix}</span>;
}

export default function AboutSection() {
  const t = useTranslations("about");

  const stats = [
    { value: 2000000, suffix: "+", label: t("stats.products") },
    { value: 11, suffix: "", label: t("stats.languages") },
    { value: 70, suffix: "+", label: t("stats.madhhab") },
    { value: 1, suffix: "", label: t("stats.accuracy") },
  ];

  return (
    <section id="about" className="section bg-bg-primary relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg-secondary/50 to-transparent pointer-events-none" />

      <div className="container relative z-10">
        {/* Two column layout: Text + Stats */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-16 md:mb-24">
          {/* Section Header */}
          <div>
            <span className="inline-block text-primary text-sm font-semibold uppercase tracking-widest mb-4">
              {t("subtitle")}
            </span>
          
            <h2 className="text-display-1 font-bold font-display text-text-primary mb-6">
              {t("title")}
            </h2>
            
            <p className="text-xl text-text-secondary leading-relaxed">
              {t("description")}
            </p>
          </div>

          {/* Statistics Grid */}
          <div className="grid grid-cols-2 gap-6 lg:gap-10">
            {stats.map((stat) => (
              <div key={stat.label} className="text-left border-l-2 border-primary/30 pl-5">
                <div className="text-4xl md:text-5xl lg:text-6xl font-black text-primary mb-2">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-text-secondary font-medium text-sm md:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mission Statement */}
        <div className="relative p-8 md:p-12 lg:p-16 rounded-t-full bg-bg-dark border border-white/10 shadow-lg text-text-inverse overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-accent-yellow/5 to-transparent -z-10" />
          
          <div className="text-center max-w-4xl mx-auto">
            <svg className="w-12 h-12 text-accent-yellow mx-auto mb-6" fill="currentColor" viewBox="0 0 32 32">
              <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H8c0-1.1.9-2 2-2V8zm16 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-1.1.9-2 2-2V8z" />
            </svg>
            <blockquote className="text-2xl md:text-3xl lg:text-4xl font-light text-text-inverse leading-relaxed">
              {t("mission")}
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
