"use client";

/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * TERMS OF SERVICE PAGE
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * Clean, readable terms of service with proper typography.
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { motion } from "framer-motion";
import Link from "next/link";
import { useTranslations } from "@/lib/mockTranslations";
import { useEffect, useState } from "react";
import ReactMarkdown from 'react-markdown';

export default function TermsOfServicePage(props: { params: Promise<{}> }) {
  const t = useTranslations("legal");
  const locale = "en";
  const [content, setContent] = useState<string>('');

  useEffect(() => {
    async function loadContent() {
      const params = await props.params;
      try {
        const res = await fetch(`/api/legal?doc=terms&locale=${locale}`);
        if (!res.ok) throw new Error('Failed to fetch');
        const text = await res.text();
        setContent(text);
      } catch (e) {
        console.error('Failed to load markdown content', e);
      }
    }
    loadContent();
  }, [props.params]);

  return (
    <motion.article
      className="prose"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Back link */}
      <Link 
        href={`/legal`}
        className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-primary transition-colors mb-8 no-underline"
      >
        <ArrowLeftIcon className="w-4 h-4" />
        {t("backToLegal")}
      </Link>

      {/* Header */}
      <div className="mb-12">
        <p className="text-sm text-primary font-medium uppercase tracking-wider mb-2">
          {t("common.lastUpdated", { date: t("documents.termsOfService.lastUpdated") })}
        </p>
        <h1>{t("documents.termsOfService.title")}</h1>
        <p className="text-xl text-text-secondary leading-relaxed">
          {t("documents.termsOfService.intro")}
        </p>
      </div>

      {/* Content from Markdown */}
      <div className="markdown-content">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>

      {/* Footer note */}
      <div className="mt-16 pt-8 border-t border-border">
        <p className="text-sm text-text-muted">
          By using allhalal.info, you acknowledge that you have read, understood, and agree 
          to be bound by these Terms of Service.
        </p>
      </div>
    </motion.article>
  );
}

function ArrowLeftIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
  );
}
