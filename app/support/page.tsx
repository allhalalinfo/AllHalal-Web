"use client";

/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * SUPPORT PAGE
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * Features:
 * - Hero section with search intent
 * - Quick links grid (Email, Legal docs)
 * - FAQ Accordion section
 * - Contact CTA
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SpotlightCard from "@/components/ui/SpotlightCard";
import ScrambleText from "@/components/ui/ScrambleText";
import MagneticButton from "@/components/ui/MagneticButton";
import Link from "next/link";

// FAQ Data
const faqs = [
  {
    question: "How does AllHalal verify products?",
    answer: "AllHalal uses a combination of AI-powered ingredient analysis and a comprehensive database of over 2 million verified products. Our system analyzes ingredients, E-numbers, and additives to determine halal status based on Islamic dietary guidelines."
  },
  {
    question: "Which madhhab (school of thought) does AllHalal follow?",
    answer: "AllHalal supports all four major Sunni schools of Islamic jurisprudence: Hanafi, Shafi'i, Maliki, and Hanbali, plus a General option for commonly accepted rulings. You can select your preferred madhhab in the app settings, and all rulings will be tailored accordingly."
  },
  {
    question: "Is AllHalal available in my language?",
    answer: "AllHalal is available in 9 languages: English, French, German, Spanish, Italian, Dutch, Russian, Arabic, and Urdu. The app automatically detects your device language."
  },
  {
    question: "How accurate is the barcode scanner?",
    answer: "Our barcode scanner has a 99%+ recognition rate for products in our database. If a product is not found, you can use the AI ingredient scanner to analyze the ingredients list directly from the packaging."
  },
  {
    question: "Can I use AllHalal offline?",
    answer: "Some features require an internet connection for real-time verification. However, previously scanned products and basic functionality are available offline."
  },
  {
    question: "How do I report an incorrect product listing?",
    answer: "If you find an incorrect listing, please email us at app@allhalal.info with the product name, barcode, and the issue you've identified. Our team reviews all reports within 48 hours."
  },
  {
    question: "Is my data secure?",
    answer: "Yes. We follow industry-standard security practices including encryption, secure data storage, and strict access controls. We never sell your personal data. Read our Privacy Policy for complete details."
  },
  {
    question: "How can I delete my account?",
    answer: "You can request account deletion by emailing app@allhalal.info with the subject \"Account Deletion Request\". We will process your request within 30 days as required by GDPR."
  }
];

// Quick Links Data
const quickLinks = [
  {
    icon: "✉️",
    title: "Email Support",
    desc: "Get help via email",
    link: "mailto:app@allhalal.info",
    linkText: "app@allhalal.info",
    external: true
  },
  {
    icon: "🔒",
    title: "Privacy Policy",
    desc: "How we protect your data",
    link: "/legal/privacy-policy",
    linkText: "Read policy",
    external: false
  },
  {
    icon: "📋",
    title: "Terms of Service",
    desc: "Usage guidelines",
    link: "/legal/terms-of-service",
    linkText: "Read terms",
    external: false
  },
  {
    icon: "⚠️",
    title: "Disclaimer",
    desc: "Important information",
    link: "/legal/disclaimer",
    linkText: "Read disclaimer",
    external: false
  }
];

export default function SupportPage() {
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
              Support Center
            </motion.span>
            
            <motion.h1
              className="text-display-1 font-bold text-text-primary mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              How can we <span className="text-gradient">help?</span>
            </motion.h1>
            
            <motion.p
              className="text-xl text-text-secondary"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Find answers to common questions or reach out to our team
            </motion.p>
          </div>

          {/* Quick Links Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
            {quickLinks.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                <Link href={item.link} target={item.external ? "_blank" : undefined}>
                  <SpotlightCard className="h-full p-6 flex flex-col items-start hover:border-primary/50 transition-colors cursor-pointer group">
                    <div className="text-3xl mb-4 group-transform group-hover:scale-110 transition-transform duration-300">
                      {item.icon}
                    </div>
                    <h3 className="text-lg font-bold text-text-primary mb-2">
                      <ScrambleText text={item.title} hover />
                    </h3>
                    <p className="text-text-secondary text-sm mb-4 flex-grow">
                      {item.desc}
                    </p>
                    <div className="flex items-center text-primary text-sm font-medium mt-auto group-hover:translate-x-1 transition-transform">
                      {item.linkText} <span className="ml-1">→</span>
                    </div>
                  </SpotlightCard>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* FAQ Section */}
          <div className="max-w-3xl mx-auto mb-32">
            <motion.h2 
              className="text-3xl font-bold text-text-primary mb-12 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Frequently Asked Questions
            </motion.h2>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} question={faq.question} answer={faq.answer} index={index} />
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
            {/* Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
            
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-4">
                Still need help?
              </h2>
              <p className="text-text-secondary mb-8 max-w-lg mx-auto">
                Our support team is here to assist you with any questions or issues you may have.
              </p>
              
              <MagneticButton
                href="mailto:app@allhalal.info"
                className="btn btn-primary btn-lg"
              >
                Contact Support
              </MagneticButton>
            </div>
          </motion.div>

        </div>
      </main>
      <Footer />
    </>
  );
}

// Accordion Component
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
