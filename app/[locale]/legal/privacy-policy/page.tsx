"use client";

/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * PRIVACY POLICY PAGE
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * Clean, readable privacy policy with proper typography.
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { motion } from "framer-motion";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import ReactMarkdown from 'react-markdown';

export default function PrivacyPolicyPage(props: { params: Promise<{ locale: string }> }) {
  const t = useTranslations("legal");
  const [content, setContent] = useState<string>('');

  useEffect(() => {
    async function loadContent() {
      const params = await props.params;
      try {
        const res = await fetch(`/api/legal?doc=privacy&locale=${params.locale}`);
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
        href="/legal" 
        className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-primary transition-colors mb-8 no-underline"
      >
        <ArrowLeftIcon className="w-4 h-4" />
        {t("backToLegal")}
      </Link>

      {/* Header */}
      <div className="mb-12">
        <p className="text-sm text-primary font-medium uppercase tracking-wider mb-2">
          {t("common.lastUpdated", { date: "December 17, 2025" })}
        </p>
        <h1>{t("documents.privacyPolicy.title")}</h1>
        <p className="text-xl text-text-secondary leading-relaxed">
          {t("documents.privacyPolicy.intro")}
        </p>
        <p className="text-sm text-text-muted mt-4">
          <strong>Contact:</strong> <a href="mailto:app@allhalal.info">app@allhalal.info</a> | 
          <strong> Website:</strong> <a href="https://www.allhalal.info">allhalal.info</a>
        </p>
      </div>

      {/* Content from Markdown */}
      <div className="markdown-content">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>

      {/* Footer note */}
      <div className="mt-16 pt-8 border-t border-border">
        <p className="text-sm text-text-muted">
          This privacy policy is effective as of December 2025 and will remain in
          effect except with respect to any changes in its provisions in the future.
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
