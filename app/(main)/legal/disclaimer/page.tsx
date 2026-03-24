"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import ReactMarkdown from 'react-markdown';

export default function DisclaimerPage(props: { params: Promise<{}> }) {
  const locale = "en";
  const [content, setContent] = useState<string>('');

  useEffect(() => {
    async function loadContent() {
      const params = await props.params;
      try {
        const res = await fetch(`/api/legal?doc=disclaimer&locale=${locale}`);
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
          Last updated: March 15, 2025
        </p>
        <h1>Disclaimer</h1>
        <p className="text-xl text-text-secondary leading-relaxed">
          Important information about our services and limitations
        </p>
      </div>

      <div className="markdown-content">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>

      <div className="mt-16 pt-8 border-t border-border">
        <p className="text-sm text-text-muted">
          May Allah guide us all to what is best and accept our efforts to live 
          according to His guidance. والله أعلم (And Allah knows best).
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
