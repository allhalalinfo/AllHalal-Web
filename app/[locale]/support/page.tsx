"use client";

/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * SUPPORT PAGE
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SpotlightCard from "@/components/ui/SpotlightCard";
import ScrambleText from "@/components/ui/ScrambleText";
import MagneticButton from "@/components/ui/MagneticButton";
import Link from "next/link";

// FAQ keys
const faqKeys = ["howVerify", "madhhab", "languages", "scanner", "offline", "report", "security", "delete"] as const;

// Quick Link keys
const quickLinkKeys = ["email", "privacy", "terms", "disclaimer"] as const;

const quickLinkConfig = {
  email: { icon: "✉️", link: "mailto:app@allhalal.info", external: true },
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
            <motion.span
              className="inline-block text-primary text-sm font-semibold uppercase tracking-widest mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {t("subtitle")}
            </motion.span>
            
            <motion.h1
              className="text-display-1 font-bold text-text-primary mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              {t("title")}
            </motion.h1>
            
            <motion.p
              className="text-xl text-text-secondary"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {t("description")}
            </motion.p>
          </div>

          {/* Quick Links Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
            {quickLinkKeys.map((key, index) => {
              const config = quickLinkConfig[key];
              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                >
                  <Link href={config.link} target={config.external ? "_blank" : undefined}>
                    <SpotlightCard className="h-full p-6 flex flex-col items-start hover:border-primary/50 transition-colors cursor-pointer group">
                      <div className="text-3xl mb-4 group-transform group-hover:scale-110 transition-transform duration-300">
                        {config.icon}
                      </div>
                      <h3 className="text-lg font-bold text-text-primary mb-2">
                        <ScrambleText text={t(`quickLinks.${key}.title`)} hover />
                      </h3>
                      <p className="text-text-secondary text-sm mb-4 flex-grow">
                        {t(`quickLinks.${key}.desc`)}
                      </p>
                      <div className="flex items-center text-primary text-sm font-medium mt-auto group-hover:translate-x-1 transition-transform">
                        {t(`quickLinks.${key}.linkText`)} <span className="ml-1">→</span>
                      </div>
                    </SpotlightCard>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* FAQ Section */}
          <div className="max-w-3xl mx-auto mb-32">
            <motion.h2 
              className="text-3xl font-bold text-text-primary mb-12 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              {t("faqTitle")}
            </motion.h2>

            <div className="space-y-4">
              {faqKeys.map((key, index) => (
                <AccordionItem 
                  key={key} 
                  question={t(`faq.${key}.question`)} 
                  answer={t(`faq.${key}.answer`)} 
                  index={index} 
                />
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <motion.div 
            className="text-center bg-bg-card border border-border rounded-2xl p-12 relative overflow-hidden"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
            
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-4">
                {t("ctaTitle")}
              </h2>
              <p className="text-text-secondary mb-8 max-w-lg mx-auto">
                {t("ctaDescription")}
              </p>
              
              <MagneticButton
                href="mailto:app@allhalal.info"
                className="btn btn-primary btn-lg"
              >
                {t("ctaButton")}
              </MagneticButton>
            </div>
          </motion.div>

        </div>
      </main>
      <Footer />
    </>
  );
}

function AccordionItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="border border-border rounded-xl bg-bg-card overflow-hidden"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-bg-secondary/50 transition-colors"
      >
        <span className="font-semibold text-text-primary pr-8">{question}</span>
        <span className={`flex-shrink-0 text-primary transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-6 pt-0 text-text-secondary leading-relaxed border-t border-border/50">
              <div className="pt-4">{answer}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
