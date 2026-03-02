"use client";

/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * LEGAL HUB PAGE
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * Landing page for all legal documents with cards linking to each document.
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { motion } from "framer-motion";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function LegalPage() {
  const t = useTranslations("legal");
  
  const legalDocuments = [
    {
      title: t("documents.privacyPolicy.title"),
      description: t("documents.privacyPolicy.description"),
      href: "/legal/privacy-policy",
      icon: ShieldIcon,
      lastUpdated: t("documents.privacyPolicy.lastUpdated"),
    },
    {
      title: t("documents.termsOfService.title"),
      description: t("documents.termsOfService.description"),
      href: "/legal/terms-of-service",
      icon: DocumentIcon,
      lastUpdated: t("documents.termsOfService.lastUpdated"),
    },
    {
      title: t("documents.disclaimer.title"),
      description: t("documents.disclaimer.description"),
      href: "/legal/disclaimer",
      icon: AlertIcon,
      lastUpdated: t("documents.disclaimer.lastUpdated"),
    },
  ];
  return (
    <div>
      {/* Page Header */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.span
          className="inline-block text-primary text-sm font-semibold uppercase tracking-widest mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {t("subtitle")}
        </motion.span>
        
        <motion.h1
          className="text-display-2 font-bold font-display text-text-primary mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {t("title")}
        </motion.h1>
        
        <motion.p
          className="text-xl text-text-secondary max-w-lg mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {t("description")}
        </motion.p>
      </motion.div>

      {/* Document Cards */}
      <div className="space-y-4">
        {legalDocuments.map((doc, index) => (
          <motion.div
            key={doc.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
          >
            <Link href={doc.href} className="group block">
              <div className="p-6 rounded-xl bg-bg-card border border-border transition-all duration-300 hover:border-primary/30 hover:shadow-glow-sm">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <doc.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h2 className="text-lg font-semibold text-text-primary group-hover:text-primary transition-colors">
                        {doc.title}
                      </h2>
                      <ArrowIcon className="w-5 h-5 text-text-muted group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                    <p className="text-text-secondary mb-2">{doc.description}</p>
                    <p className="text-sm text-text-muted">{t("common.lastUpdated", { date: doc.lastUpdated })}</p>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Contact note */}
      <motion.div
        className="mt-12 p-6 rounded-xl bg-bg-tertiary border border-border text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <p className="text-text-secondary">
          {t("contactNote")}{" "}
          <Link href="/contact" className="text-primary hover:text-primary-light transition-colors">
            {t("contactLink")}
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

// Icon Components
function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  );
}

function DocumentIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );
}

function AlertIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  );
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 5l7 7-7 7" />
    </svg>
  );
}
