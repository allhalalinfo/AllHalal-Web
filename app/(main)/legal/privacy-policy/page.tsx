"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import ReactMarkdown from 'react-markdown';

export default function PrivacyPolicyPage(props: { params: Promise<{}> }) {
  const locale = "en";
  const [content, setContent] = useState<string>('');

  useEffect(() => {
    async function loadContent() {
      const params = await props.params;
      try {
        const res = await fetch(`/api/legal?doc=privacy&locale=${locale}`);
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
      <Link 
        href={`/legal`}
        className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-primary transition-colors mb-8 no-underline"
      >
        <ArrowLeftIcon className="w-4 h-4" />
        Back to legal documents
      </Link>

      <div className="mb-12">
        <p className="text-sm text-primary font-medium uppercase tracking-wider mb-2">
          Last updated: December 17, 2025
        </p>
        <h1>Privacy Policy</h1>
        <p className="text-xl text-text-secondary leading-relaxed">
          How we collect, use, and protect your personal information
        </p>
        <p className="text-sm text-text-muted mt-4">
          <strong>Contact:</strong> <a href="mailto:app@allhalal.info">app@allhalal.info</a> | 
          <strong> Website:</strong> <a href="https://www.allhalal.info">allhalal.info</a>
        </p>
      </div>

      <div className="markdown-content">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>

      <div className="mt-16 pt-8 border-t border-border">
        <p className="text-sm text-text-muted">
          This privacy policy is effective as of December 2025 and will remain in
          effect except with respect to any changes in its provisions in the future.
        </p>
      </div>
    </motion.article>
  );
}

function ArrowLeftIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
      />
    </svg>
  );
}
