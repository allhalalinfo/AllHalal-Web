'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ComingSoonPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="relative min-h-screen bg-bg-primary overflow-hidden flex items-center justify-center">
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 container text-center px-4 py-20"
        initial={{ opacity: 0, y: 20 }}
        animate={mounted ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        {/* Logo */}
        <Link 
          href="/" 
          className="inline-block text-sm font-semibold tracking-[0.1em] text-text-primary hover:text-primary transition-colors mb-12"
        >
          allhalal.info
        </Link>

        {/* Ornament */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <span className="w-12 h-px bg-gradient-to-r from-transparent to-primary/20" />
          <span className="text-text-muted">◈</span>
          <span className="w-12 h-px bg-gradient-to-l from-transparent to-primary/20" />
        </div>

        {/* Main Content */}
        <div className="max-w-xl mx-auto">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-primary-soft border border-primary/30 rounded-full">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-xs font-medium text-primary uppercase tracking-wider">In Development</span>
          </div>

          {/* Title */}
          <h1 className="text-display-2 mb-6">
            <span className="block text-[0.7em] font-light text-text-secondary mb-2">Coming</span>
            <span className="block gradient-text font-black">Very Soon</span>
          </h1>

          {/* Description */}
          <p className="text-lg text-text-secondary mb-12 leading-relaxed">
            We're crafting the ultimate halal verification experience.
            <br />
            The most advanced scanner in the world is almost ready.
          </p>

          {/* Features Preview */}
          <div className="grid grid-cols-3 gap-4 mb-12">
            {[
              { icon: '✓', text: '2M+ Products' },
              { icon: '⏱', text: 'Real-time' },
              { icon: '🛡', text: 'Scholar-Verified' },
            ].map((feature) => (
              <div 
                key={feature.text}
                className="flex flex-col items-center gap-2 p-4 bg-surface border border-border rounded-xl"
              >
                <span className="text-2xl">{feature.icon}</span>
                <span className="text-xs text-text-secondary">{feature.text}</span>
              </div>
            ))}
          </div>

          {/* Progress */}
          <div className="mb-12">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-text-tertiary">Development Progress</span>
              <span className="text-primary font-medium">87%</span>
            </div>
            <div className="h-2 bg-surface rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-primary-light rounded-full"
                initial={{ width: 0 }}
                animate={{ width: '87%' }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </div>
          </div>

          {/* Email Notify */}
          <div className="mb-12">
            <p className="text-sm text-text-tertiary mb-4">Be the first to know when we launch</p>
            <form 
              className="flex gap-3 max-w-md mx-auto"
              onSubmit={(e) => e.preventDefault()}
            >
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 px-4 py-3 bg-surface border border-border rounded-lg text-text-primary placeholder-text-muted focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                required
              />
              <button
                type="submit"
                className="btn btn-primary"
              >
                Notify Me
              </button>
            </form>
          </div>
        </div>

        {/* Ornament Bottom */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <span className="w-12 h-px bg-gradient-to-r from-transparent to-primary/20" />
          <span className="text-text-muted">◈</span>
          <span className="w-12 h-px bg-gradient-to-l from-transparent to-primary/20" />
        </div>

        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-text-tertiary hover:text-primary transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Home
        </Link>
      </motion.div>
    </main>
  );
}
