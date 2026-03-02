"use client";

/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * CTA SECTION - NO FLICKERING
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { useTranslations } from "next-intl";

export default function CTASection() {
  const t = useTranslations("cta");

  return (
    <section className="section-lg bg-bg-primary relative overflow-hidden">
      {/* Static background glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-30"
          style={{
            background: "radial-gradient(circle, rgba(151, 124, 88, 0.15) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-sm text-primary font-medium">{t("badge")}</span>
          </div>

          {/* Headline */}
          <h2 className="text-display-1 font-bold font-display text-text-primary mb-6">
            {t("title")}
          </h2>

          {/* Description */}
          <p className="text-xl text-text-secondary mb-10 max-w-2xl mx-auto">
            {t("description")}
          </p>

          {/* Download Button */}
          <div>
            <a
              href="https://apps.apple.com/us/app/allhalal-info-food-scanner/id6756242265"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-gold text-[#4A3319] font-bold text-lg rounded-full shadow-[0_4px_15px_rgba(176,144,98,0.3)] transition-all duration-300 hover:bg-gradient-gold-hover hover:-translate-y-1"
            >
              <AppleIcon className="w-6 h-6" />
              {t("button")}
              <span className="inline-block">→</span>
            </a>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-8 mt-12">
            <div className="flex items-center gap-2 text-text-tertiary">
              <ShieldIcon className="w-5 h-5 text-primary" />
              <span className="text-sm">{t("trust.secure")}</span>
            </div>
            <div className="flex items-center gap-2 text-text-tertiary">
              <GlobeIcon className="w-5 h-5 text-primary" />
              <span className="text-sm">{t("trust.worldwide")}</span>
            </div>
            <div className="flex items-center gap-2 text-text-tertiary">
              <StarIcon className="w-5 h-5 text-primary" />
              <span className="text-sm">{t("trust.rating")}</span>
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

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
    </svg>
  );
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}
