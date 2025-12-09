'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

/**
 * ScreenshotsGallery Component
 * 
 * Horizontal scrolling gallery of app screenshots
 * with infinite scroll animation (like a carousel).
 */

const screenshots = [
  { src: '/app-screens/hero-woman.png', alt: 'AllHalal - Your Complete Halal Companion' },
  { src: '/app-screens/product-verified.png', alt: 'Over 2 Million Products Verified' },
  { src: '/app-screens/ingredient-scan.png', alt: 'AI Ingredient Scan' },
  { src: '/app-screens/madhhab.png', alt: 'Fiqh-Based Rulings' },
  { src: '/app-screens/prayer-times.png', alt: 'Prayer Times & Qibla' },
  { src: '/app-screens/statistics.png', alt: 'History & Statistics' },
  { src: '/app-screens/smartwatch.png', alt: 'Smartwatch Integration' },
  { src: '/app-screens/cosmetics.png', alt: 'Halal Cosmetics' },
];

export default function ScreenshotsGallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  // Double the screenshots for seamless loop
  const doubledScreenshots = [...screenshots, ...screenshots];

  return (
    <section className="py-20 md:py-24 bg-bg-secondary overflow-hidden">
      <div className="container mb-12">
        <motion.div
          ref={ref}
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
            Everything in One Beautiful App
          </h2>
          <p className="text-white/50">
            Designed with care for the Muslim ummah
          </p>
        </motion.div>
      </div>

      {/* Carousel */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-r from-bg-secondary to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-l from-bg-secondary to-transparent z-10 pointer-events-none" />
        
        {/* Scrolling container */}
        <div className="flex gap-6 md:gap-8 animate-scroll-gallery hover:pause-animation">
          {doubledScreenshots.map((screenshot, index) => (
            <div
              key={`${screenshot.src}-${index}`}
              className="flex-shrink-0 w-[220px] md:w-[280px] group"
            >
              <div className="relative aspect-[9/16] bg-surface rounded-2xl border border-white/5 p-2 overflow-hidden transition-all duration-300 group-hover:border-primary/30 group-hover:shadow-lg">
                <Image
                  src={screenshot.src}
                  alt={screenshot.alt}
                  fill
                  className="object-cover rounded-xl transition-transform duration-300 group-hover:scale-[1.02]"
                  sizes="280px"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Custom animation */}
      <style jsx>{`
        @keyframes scroll-gallery {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll-gallery {
          animation: scroll-gallery 40s linear infinite;
        }
        
        .hover\\:pause-animation:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
