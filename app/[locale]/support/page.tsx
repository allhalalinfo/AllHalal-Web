"use client";

/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * SUPPORT PAGE - NO FLICKERING
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { useState } from "react";
import { useTranslations } from "next-intl";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SpotlightCard from "@/components/ui/SpotlightCard";
import Link from "next/link";

const faqKeys = ["howVerify", "madhhab", "languages", "scanner", "offline", "report", "security", "delete"] as const;
const quickLinkKeys = ["email", "privacy", "terms", "disclaimer"] as const;

const quickLinkConfig = {
  email: { icon: "✉️", link: "/contact", external: false },
  privacy: { icon: "🔒", link: "/legal/privacy-policy", external: false },
  terms: { icon: "📋", link: "/legal/terms-of-service", external: false },
  disclaimer: { icon: "⚠️", link: "/legal/disclaimer", external: false },
};

export default function SupportPage() {
  const t = useTranslations("support");

  return (
    <>
      <Header />
      <main className="min-h-screen bg-bg-primary pt-32 pb-20">
        <div className="container">
          
          {/* Header Section */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="inline-block text-primary text-sm font-semibold uppercase tracking-widest mb-4">
              {t("subtitle")}
            </span>
            
            <h1 className="text-display-1 font-bold text-text-primary mb-6">
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
              
              return (
                <Link key={key} href={config.link}>
                  <SpotlightCard className="h-full p-6 flex flex-col items-start hover:border-primary/50 transition-colors cursor-pointer group">
                    <div className="text-3xl mb-4">
                      {config.icon}
                    </div>
                    <h3 className="text-lg font-bold text-text-primary mb-2">
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
          <div className="max-w-3xl mx-auto mb-32">
            <h2 className="text-3xl font-bold text-text-primary mb-12 text-center">
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
              <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-4">
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
