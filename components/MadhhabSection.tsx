'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * MadhhabSection Component
 * 
 * Displays the four schools of Islamic jurisprudence
 * with interactive hover effects and Arabic calligraphy.
 */

const madhahib = [
  {
    name: 'Hanafi',
    arabic: 'حنفي',
    description: 'The most widely followed school',
    followers: 'South Asia, Turkey, Central Asia',
  },
  {
    name: "Shafi'i",
    arabic: 'شافعي',
    description: 'Prevalent in Southeast Asia',
    followers: 'Indonesia, Malaysia, East Africa',
  },
  {
    name: 'Maliki',
    arabic: 'مالكي',
    description: 'Dominant in North and West Africa',
    followers: 'Morocco, Algeria, Libya',
  },
  {
    name: 'Hanbali',
    arabic: 'حنبلي',
    description: 'Followed in the Arabian Peninsula',
    followers: 'Saudi Arabia, Qatar, UAE',
  },
];

export default function MadhhabSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-24 md:py-32 bg-bg-secondary">
      <div className="container">
        <motion.div
          ref={ref}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Authentic Jurisprudence</span>
          <h2 className="section-title">Your Practice. Your Madhhab.</h2>
          <p className="section-description">
            We respect the diversity of Islamic scholarship. Select your School of Thought 
            to receive rulings perfectly aligned with your practice.
          </p>
        </motion.div>

        {/* Madhahib grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
          {madhahib.map((madhhab, index) => (
            <motion.div
              key={madhhab.name}
              className={`relative overflow-hidden bg-surface border rounded-2xl p-6 md:p-8 text-center cursor-default transition-all duration-500 ${
                hoveredIndex !== null && hoveredIndex !== index
                  ? 'opacity-40 scale-98'
                  : 'opacity-100 scale-100'
              } ${
                hoveredIndex === index
                  ? 'border-primary/50 bg-gradient-to-br from-secondary/30 to-secondary-dark/30 shadow-glow'
                  : 'border-white/5'
              }`}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Arabic watermark */}
              <div 
                className={`absolute -bottom-4 -right-2 text-6xl md:text-7xl font-arabic text-primary pointer-events-none transition-all duration-500 ${
                  hoveredIndex === index ? 'opacity-20 scale-110' : 'opacity-5'
                }`}
                style={{ fontFamily: "'Amiri', serif" }}
              >
                {madhhab.arabic}
              </div>

              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-lg md:text-xl font-semibold text-white mb-2">
                  {madhhab.name}
                </h3>
                <p className="text-sm text-white/60 mb-2">{madhhab.description}</p>
                <p className="text-xs text-white/40">{madhhab.followers}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
