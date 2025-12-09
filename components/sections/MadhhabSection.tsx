"use client";

/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * MADHHAB SECTION - NO FLICKERING
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { useTranslations } from "next-intl";
import Image from "next/image";

const madhhabKeys = ["general", "hanafi", "shafii", "maliki", "hanbali"] as const;

const madhhabConfig = {
  general: { arabicName: "عام", color: "from-primary" },
  hanafi: { arabicName: "حنفي", color: "from-emerald-500" },
  shafii: { arabicName: "شافعي", color: "from-blue-500" },
  maliki: { arabicName: "مالكي", color: "from-amber-500" },
  hanbali: { arabicName: "حنبلي", color: "from-rose-500" },
};

export default function MadhhabSection() {
  const t = useTranslations("madhhab");

  return (
    <section id="madhhab" className="section bg-bg-secondary relative overflow-hidden">
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
          <div>
            <span className="inline-block text-primary text-sm font-semibold uppercase tracking-widest mb-4">
              {t("subtitle")}
            </span>
            
            <h2 className="text-display-2 font-bold text-text-primary mb-6">
              {t("title")}
            </h2>
            
            <p className="text-xl text-text-secondary">
              {t("description")}
            </p>
          </div>

          {/* Madhhab Screenshot */}
          <div className="relative">
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
          </div>
        </div>

        {/* Madhhab Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {madhhabKeys.map((key) => {
            const config = madhhabConfig[key];
            return (
              <div key={key} className="group relative">
                <div className="relative h-full p-6 rounded-2xl bg-bg-card border border-border overflow-hidden transition-colors duration-300 hover:border-primary/30">
                  {/* Arabic calligraphy watermark */}
                  <div className="absolute -right-4 -top-4 text-8xl font-bold text-white/5 select-none group-hover:text-primary/10 transition-colors duration-300">
                    {config.arabicName}
                  </div>

                  {/* Gradient accent */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${config.color} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

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
              </div>
            );
          })}
        </div>

        {/* Bottom note */}
        <p className="text-center text-text-muted mt-12 max-w-2xl mx-auto">
          {t("note")}
        </p>
      </div>
    </section>
  );
}
