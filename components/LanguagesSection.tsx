'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * LanguagesSection Component
 * 
 * Horizontal scrolling carousel of supported languages.
 */

const languages = [
  'English',
  'Français',
  'Deutsch',
  'Español',
  'Italiano',
  'Nederlands',
  'Русский',
  'العربية',
  'اردو',
  'Türkçe',
  'Bahasa',
  'हिन्दी',
];

export default function LanguagesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  // Double the languages for seamless loop
  const doubledLanguages = [...languages, ...languages];

  return (
    <section className="py-16 md:py-20 bg-bg-primary overflow-hidden">
      <div className="container mb-10">
        <motion.div
          ref={ref}
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl md:text-3xl font-semibold text-white">
            Use AllHalal in the language you feel at home with.
          </h2>
        </motion.div>
      </div>

      {/* Carousel */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-bg-primary to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-bg-primary to-transparent z-10 pointer-events-none" />
        
        {/* Scrolling container */}
        <div className="flex gap-4 md:gap-6 animate-scroll-languages py-4">
          {doubledLanguages.map((language, index) => (
            <motion.div
              key={`${language}-${index}`}
              className="flex-shrink-0 px-6 py-3 rounded-full border border-primary/30 text-primary text-sm md:text-base font-medium hover:bg-primary hover:text-bg-primary transition-all duration-300 cursor-default"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: (index % languages.length) * 0.05 }}
            >
              {language}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Custom animation */}
      <style jsx>{`
        @keyframes scroll-languages {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll-languages {
          animation: scroll-languages 30s linear infinite;
        }
        
        .animate-scroll-languages:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
