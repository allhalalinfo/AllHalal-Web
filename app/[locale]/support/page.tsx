"use client";

/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * SUPPORT PAGE - NO FLICKERING
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import Footer from "@/components/layout/Footer";
import SpotlightCard from "@/components/ui/SpotlightCard";
import Link from "next/link";

const faqKeys = ["howVerify", "madhhab", "languages", "scanner", "offline", "report", "security", "delete"] as const;
const quickLinkKeys = ["email", "faq", "checker", "app"] as const;

const quickLinkConfig = {
  email: { icon: "✉️", link: "/contact", external: false },
  faq: { icon: "❓", link: "#faq", external: false },
  checker: { icon: "🔍", link: "/is-it-halal", external: false },
  app: { icon: "📱", link: "https://apps.apple.com/us/app/allhalal-info-food-scanner/id6756242265", external: true },
};

export default function SupportPage() {
  const t = useTranslations("support");
  const locale = useLocale();

  return (
    <>
      <main className="min-h-screen bg-bg-primary pt-32 pb-20">
        <div className="container">
          
          {/* Header Section */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="inline-block text-primary text-sm font-semibold uppercase tracking-widest mb-4">
              {t("subtitle")}
            </span>
            
            <h1 className="text-display-1 font-bold font-display text-text-primary mb-6">
              {t("title")}
            </h1>
            
            <p className="text-xl text-text-secondary">
              {t("description")}
            </p>
          </div>

          {/* Quick Links Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
            {quickLinkKeys.map((key) => {
              const config = quickLinkConfig[key];
              const href = config.external ? config.link : `/${locale}${config.link}`;
              
              return (
                <Link key={key} href={href}>
                  <SpotlightCard className="h-full p-6 flex flex-col items-start hover:border-primary/50 transition-colors cursor-pointer group">
                    <div className="text-3xl mb-4">
                      {config.icon}
                    </div>
                    <h3 className="text-lg font-bold font-display text-text-primary mb-2">
                      {t(`quickLinks.${key}.title`)}
                    </h3>
                    <p className="text-text-secondary text-sm mb-4 flex-grow">
                      {t(`quickLinks.${key}.desc`)}
                    </p>
                    <div className="flex items-center text-primary text-sm font-medium mt-auto">
                      {t(`quickLinks.${key}.linkText`)} <span className="ml-1">→</span>
                    </div>
                  </SpotlightCard>
                </Link>
              );
            })}
          </div>

          {/* FAQ Section */}
          <div id="faq" className="max-w-3xl mx-auto mb-32 scroll-mt-32">
            <h2 className="text-3xl font-bold font-display text-text-primary mb-12 text-center">
              {t("faqTitle")}
            </h2>

            <div className="space-y-4">
              {faqKeys.map((key) => (
                <AccordionItem 
                  key={key} 
                  question={t(`faq.${key}.question`)} 
                  answer={t(`faq.${key}.answer`)} 
                />
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-bg-card border border-border rounded-2xl p-12 relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
            
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-bold font-display text-text-primary mb-4">
                {t("ctaTitle")}
              </h2>
              <p className="text-text-secondary mb-8 max-w-lg mx-auto">
                {t("ctaDescription")}
              </p>
              
              <a
                href="mailto:app@allhalal.info"
                className="btn btn-primary btn-lg inline-block"
              >
                {t("ctaButton")}
              </a>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}

function AccordionItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-border rounded-xl bg-bg-card overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-bg-secondary/50 transition-colors"
      >
        <span className="font-semibold text-text-primary pr-8">{question}</span>
        <span className={`flex-shrink-0 text-primary transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      
        {isOpen && (
            <div className="p-6 pt-0 text-text-secondary leading-relaxed border-t border-border/50">
              <div className="pt-4">{answer}</div>
            </div>
        )}
    </div>
  );
}
