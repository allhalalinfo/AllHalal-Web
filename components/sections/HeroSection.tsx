"use client";

/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * HERO SECTION - NO FLICKERING
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * MOBILE: No Framer Motion animations - content renders immediately
 * DESKTOP: Smooth animations with GSAP pin effect
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import MagneticButton from "../ui/MagneticButton";

const ParticleAnimation = dynamic(() => import("@/components/three/ParticleBarcode"), {
  ssr: false,
  loading: () => <div className="w-full h-full min-h-[200px]" />,
});

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HeroSection() {
  const t = useTranslations("hero");
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Mark as loaded to trigger CSS animations on desktop
    setIsLoaded(true);

    // Only apply GSAP pin effect on desktop
    const mm = gsap.matchMedia();
    
    mm.add("(min-width: 1024px)", () => {
      const ctx = gsap.context(() => {
        if (!sectionRef.current || !contentRef.current) return;

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: "+=50%",
          pin: true,
          pinSpacing: true,
        });

        gsap.to(contentRef.current, {
          opacity: 0,
          y: -50,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=30%",
            scrub: true,
          },
        });
      }, sectionRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-bg-primary"
    >
      <div ref={contentRef} className="container">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 lg:gap-8 min-h-screen lg:items-center pt-28 pb-8 lg:pt-0 lg:pb-0">

          {/* TEXT COLUMN - No motion.div, just CSS */}
          <div className="relative z-10 flex flex-col justify-center order-1">
            {/* Subtitle */}
            <p 
              className={`hero-subtitle mb-3 md:mb-6 ${isLoaded ? 'opacity-100' : 'opacity-100'}`}
            >
              {t("subtitle")}
            </p>

            {/* Main Title */}
            <h1 className="hero-title text-text-primary mb-4 md:mb-8">
              <span className="block">{t("title1")}</span>
              <span className="block">{t("title2")}</span>
              <span className="block">
                <span className="text-highlight">{t("title3")}</span>
              </span>
            </h1>

            {/* Description */}
            <p className="text-base md:text-lg text-text-secondary max-w-lg mb-6 md:mb-10">
              {t("description")}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3 md:gap-4">
              <MagneticButton
                href="https://apps.apple.com/app/allhalal/id6504640498"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-lg group"
                strength={0.3}
              >
                <AppleIcon className="w-5 h-5" />
                {t("ctaAppStore")}
                <ArrowIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </MagneticButton>
              <MagneticButton
                href="#features"
                className="btn btn-secondary btn-lg group"
                strength={0.3}
              >
                {t("ctaExplore")}
                <ArrowDownIcon className="w-4 h-4 transition-transform group-hover:translate-y-1" />
              </MagneticButton>
            </div>
          </div>

          {/* ANIMATION COLUMN */}
          <div className="relative order-2 w-full flex items-center justify-center pb-6 lg:py-0">
            <div className="w-full max-w-[350px] aspect-[2.5/1] sm:max-w-[450px] sm:aspect-[2.3/1] lg:max-w-[550px] lg:aspect-auto lg:h-[55vh] lg:max-h-[450px]">
              <ParticleAnimation />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AppleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

function ArrowDownIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 5v14M5 12l7 7 7-7" />
    </svg>
  );
}
