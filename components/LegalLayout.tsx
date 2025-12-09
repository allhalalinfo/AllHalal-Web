'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Header from './Header';
import Footer from './Footer';

/**
 * LegalLayout Component
 * 
 * Shared layout for legal document pages (Privacy Policy, Terms, Disclaimer).
 * Clean, readable typography with proper spacing.
 */

interface LegalLayoutProps {
  children: ReactNode;
  title: string;
  effectiveDate: string;
  lastUpdated: string;
}

export default function LegalLayout({ 
  children, 
  title, 
  effectiveDate, 
  lastUpdated 
}: LegalLayoutProps) {
  return (
    <main className="min-h-screen bg-bg-primary">
      <Header />
      
      {/* Hero */}
      <section className="pt-32 pb-12 md:pt-40 md:pb-16 border-b border-white/5">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Back link */}
            <Link 
              href="/legal"
              className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-primary transition-colors mb-8"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Back to Legal
            </Link>
            
            <h1 className="text-display-2 mb-4">{title}</h1>
            
            <div className="flex flex-wrap gap-6 text-sm text-white/50">
              <p>
                <span className="text-white/70">Effective Date:</span> {effectiveDate}
              </p>
              <p>
                <span className="text-white/70">Last Updated:</span> {lastUpdated}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16">
        <div className="container">
          <motion.div
            className="prose prose-invert prose-lg max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {children}
          </motion.div>
        </div>
      </section>

      <Footer />

      {/* Custom styles for legal content */}
      <style jsx global>{`
        .prose {
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.8;
        }
        
        .prose h2 {
          color: white;
          font-size: 1.5rem;
          font-weight: 600;
          margin-top: 3rem;
          margin-bottom: 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .prose h3 {
          color: white;
          font-size: 1.25rem;
          font-weight: 600;
          margin-top: 2rem;
          margin-bottom: 0.75rem;
        }
        
        .prose p {
          margin-bottom: 1.25rem;
        }
        
        .prose strong {
          color: white;
          font-weight: 600;
        }
        
        .prose ul, .prose ol {
          margin: 1rem 0;
          padding-left: 1.5rem;
        }
        
        .prose li {
          margin-bottom: 0.5rem;
        }
        
        .prose a {
          color: var(--primary);
          text-decoration: none;
          transition: opacity 0.2s;
        }
        
        .prose a:hover {
          opacity: 0.8;
        }
        
        .prose table {
          width: 100%;
          border-collapse: collapse;
          margin: 1.5rem 0;
          font-size: 0.875rem;
        }
        
        .prose th, .prose td {
          padding: 0.75rem 1rem;
          text-align: left;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .prose th {
          color: white;
          font-weight: 600;
          background: rgba(255, 255, 255, 0.03);
        }
        
        .prose hr {
          border: none;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          margin: 2rem 0;
        }
        
        .prose em {
          font-style: italic;
          color: rgba(255, 255, 255, 0.5);
        }
      `}</style>
    </main>
  );
}
