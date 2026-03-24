"use client";

import { useState } from "react";
import Footer from "@/components/layout/Footer";
import SpotlightCard from "@/components/ui/SpotlightCard";
import Link from "next/link";

const quickLinks = [
  {
    key: "email",
    icon: "✉️",
    link: "/contact",
    external: false,
    title: "Email support",
    desc: "Send us a message and we'll respond within 24 hours",
    linkText: "Contact us"
  },
  {
    key: "faq",
    icon: "❓",
    link: "#faq",
    external: false,
    title: "Browse FAQs",
    desc: "Find answers to commonly asked questions",
    linkText: "View FAQs"
  },
  {
    key: "checker",
    icon: "🔍",
    link: "/is-it-halal",
    external: false,
    title: "Is it halal?",
    desc: "Search ingredients and products instantly",
    linkText: "Try checker"
  },
  {
    key: "app",
    icon: "📱",
    link: "https://apps.apple.com/us/app/allhalal-info-food-scanner/id6756242265",
    external: true,
    title: "Download app",
    desc: "Get the mobile app for barcode scanning",
    linkText: "Get on App Store"
  }
];

const faqs = [
  {
    question: "How does AllHalal verify products?",
    answer: "We use a multi-layered verification process: (1) Advanced OCR and AI to extract ingredients from photos, (2) Cross-referencing with our comprehensive database of halal/haram ingredients, (3) Analysis of E-numbers and additives, and (4) Checking against certifications from trusted halal authorities worldwide."
  },
  {
    question: "Which Islamic school of thought (madhhab) does AllHalal follow?",
    answer: "AllHalal provides information based on mainstream Islamic scholarly consensus. For ingredients with differing opinions between schools of thought, we indicate this and provide additional context so you can make an informed decision based on your own madhhab and level of precaution."
  },
  {
    question: "Is AllHalal available in other languages?",
    answer: "Currently, AllHalal is available in English. We're actively working on adding more languages to serve the global Muslim community better. Stay tuned for updates!"
  },
  {
    question: "How accurate is the barcode scanner?",
    answer: "Our barcode scanner has a high accuracy rate, but we always recommend double-checking the ingredient list yourself. Product formulations can change, and manufacturers may update ingredients without changing the barcode. We continuously update our database to reflect these changes."
  },
  {
    question: "Can I use AllHalal offline?",
    answer: "The mobile app includes limited offline functionality for previously scanned items. However, for the most up-to-date information and full ingredient verification, an internet connection is required."
  },
  {
    question: "How can I report incorrect information?",
    answer: "If you find any incorrect information, please contact us through the form on this page or email us directly at app@allhalal.info. Include the product name, barcode (if available), and details about the issue. We review all reports and update our database accordingly."
  },
  {
    question: "Is my data secure?",
    answer: "Yes. We take privacy seriously. We don't sell your data to third parties. Your scans and searches are used only to improve our service. For more details, please read our Privacy Policy."
  },
  {
    question: "How do I delete my account?",
    answer: "You can delete your account at any time from the app settings or by contacting us at app@allhalal.info. Once deleted, all your personal data will be permanently removed from our servers within 30 days."
  }
];

function AccordionItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-border rounded-2xl overflow-hidden bg-bg-card">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-bg-hover transition-colors"
      >
        <span className="font-semibold text-text-primary pr-4">{question}</span>
        <span className={`text-primary text-xl transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          ↓
        </span>
      </button>
      {isOpen && (
        <div className="px-6 pb-5 text-text-secondary leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  );
}

export default function SupportPage() {
  return (
    <>
      <main className="min-h-screen bg-bg-primary pt-32 pb-20">
        <div className="container">
          
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="inline-block text-primary text-sm font-semibold uppercase tracking-widest mb-4">
              We're here to help
            </span>
            
            <h1 className="text-display-1 font-bold font-display text-text-primary mb-6">
              Support Center
            </h1>
            
            <p className="text-xl text-text-secondary">
              Get help, find answers, or reach out to our team
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
            {quickLinks.map((item) => {
              return (
                <Link key={item.key} href={item.link}>
                  <SpotlightCard className="h-full p-6 flex flex-col items-start hover:border-primary/50 transition-colors cursor-pointer group">
                    <div className="text-3xl mb-4">
                      {item.icon}
                    </div>
                    <h3 className="text-lg font-bold font-display text-text-primary mb-2">
                      {item.title}
                    </h3>
                    <p className="text-text-secondary text-sm mb-4 flex-grow">
                      {item.desc}
                    </p>
                    <div className="flex items-center text-primary text-sm font-medium mt-auto">
                      {item.linkText} <span className="ml-1">→</span>
                    </div>
                  </SpotlightCard>
                </Link>
              );
            })}
          </div>

          <div id="faq" className="max-w-3xl mx-auto mb-32 scroll-mt-32">
            <h2 className="text-3xl font-bold font-display text-text-primary mb-12 text-center">
              Frequently asked questions
            </h2>

            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <AccordionItem 
                  key={idx} 
                  question={faq.question} 
                  answer={faq.answer} 
                />
              ))}
            </div>
          </div>

          <div className="text-center bg-bg-card border border-border rounded-2xl p-12 relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
            
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-bold font-display text-text-primary mb-4">
                Still need help?
              </h2>
              
              <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
                Can't find what you're looking for? Our support team is ready to assist you.
              </p>
              
              <Link
                href="/contact"
                className="inline-block px-8 py-4 bg-primary text-white font-semibold rounded-full hover:bg-primary/90 transition-colors"
              >
                Contact support
              </Link>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
