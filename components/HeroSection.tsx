'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import HeroParticles from './HeroParticles';

/**
 * HeroSection Component
 * 
 * Full-screen hero section with:
 * - Animated particle/barcode background
 * - Main headline about AllHalal
 * - Product counter with animation
 * - Primary CTA buttons
 * 
 * Inspired by hatchet.com.au but with AllHalal branding and green colors.
 */

export default function HeroSection() {
  const [count, setCount] = useState(0);
  const targetCount = 2000000;

  // Animated counter
  useEffect(() => {
    const duration = 3000; // 3 seconds
    const startTime = Date.now();
    const isMobile = window.innerWidth <= 768;
    
    // On mobile, just show the number without animation
    if (isMobile) {
      setCount(targetCount);
      return;
    }

    const easeOutQuint = (t: number) => 1 - Math.pow(1 - t, 5);

    const updateCounter = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuint(progress);
      
      setCount(Math.floor(targetCount * easedProgress));
      
      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    };

    const timer = setTimeout(() => {
      requestAnimationFrame(updateCounter);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-bg-primary">
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/3 to-transparent" />
      
      {/* Particle animation */}
      <HeroParticles />
      
      {/* Content */}
      <div className="relative z-10 container text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Label */}
          <span className="inline-block px-4 py-2 mb-8 text-xs font-medium tracking-wider uppercase text-primary bg-primary-soft border border-primary/30 rounded-full">
            World&apos;s #1 Halal Verification Platform
          </span>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          className="mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <span className="block text-3xl md:text-4xl lg:text-5xl font-light text-white/70 mb-4">
            The Most Advanced
          </span>
          <span className="block text-5xl md:text-7xl lg:text-8xl font-black gradient-text mb-4">
            Halal Scanner
          </span>
          <span className="block text-2xl md:text-3xl lg:text-4xl font-light text-white/50">
            in the World
          </span>
        </motion.h1>

        {/* Counter */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="flex items-baseline justify-center gap-3 mb-3">
            <span className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white tabular-nums">
              {count > 0 ? count.toLocaleString() : '2,000,000'}+
            </span>
            <span className="text-lg md:text-xl text-white/50">products</span>
          </div>
          <p className="text-sm font-medium tracking-wider uppercase text-white/60 mb-1">
            Verified. Accurate. Trusted globally.
          </p>
          <p className="text-sm text-white/40">
            Real-time halal verification powered by global datasets
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <a
            href="https://apps.apple.com/us/app/allhalal-info-food-scanner/id6756242265"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-lg group"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
            Download on App Store
          </a>
          <a
            href="#features"
            className="btn btn-secondary btn-lg"
          >
            Explore Features
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-white/40 uppercase tracking-wider">Scroll</span>
          <motion.div
            className="w-6 h-10 rounded-full border border-white/20 flex items-start justify-center p-2"
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <div className="w-1 h-2 bg-primary rounded-full" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
