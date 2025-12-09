'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

/**
 * FeaturesSection Component
 * 
 * Displays main app features with:
 * - Feature cards with hover effects
 * - Screenshots/images for each feature
 * - Scroll-triggered animations
 * 
 * Features:
 * - AI Ingredient Scan
 * - Boycott Guidance & Fiqh-based Rulings
 * - Prayer Times, Qibla, Islamic Calendar
 * - Madhhab Support
 */

const features = [
  {
    id: 'scan',
    title: 'AI Ingredient Scan',
    description: 'Instantly scan any product barcode or ingredient list. Our AI analyzes over 2 million products to give you accurate halal status in seconds.',
    image: '/app-screens/ingredient-scan.png',
    badge: 'Core Feature',
  },
  {
    id: 'madhhab',
    title: 'Fiqh-Based Rulings',
    description: 'Get halal rulings based on your chosen school of thought. We support Hanafi, Shafi\'i, Maliki, and Hanbali madhahib.',
    image: '/app-screens/madhhab.png',
    badge: 'Personalized',
  },
  {
    id: 'prayer',
    title: 'Prayer Times & Qibla',
    description: 'Never miss a prayer. Get accurate prayer times for your location, Qibla direction, and full Islamic calendar integration.',
    image: '/app-screens/prayer-times.png',
    badge: 'Islamic Tools',
  },
  {
    id: 'verified',
    title: '2M+ Verified Products',
    description: 'Access our comprehensive database of verified products from around the world. Real-time updates ensure accuracy.',
    image: '/app-screens/product-verified.png',
    badge: 'Database',
  },
];

const FeatureCard = ({ 
  feature, 
  index 
}: { 
  feature: typeof features[0]; 
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      className={`grid md:grid-cols-2 gap-8 md:gap-12 items-center ${
        index % 2 === 1 ? 'md:grid-flow-col-dense' : ''
      }`}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      {/* Content */}
      <div className={index % 2 === 1 ? 'md:col-start-2' : ''}>
        <span className="inline-block px-3 py-1 mb-4 text-xs font-medium tracking-wider uppercase text-primary bg-primary-soft border border-primary/20 rounded-full">
          {feature.badge}
        </span>
        <h3 className="text-display-3 mb-4">{feature.title}</h3>
        <p className="text-lg text-white/60 leading-relaxed">
          {feature.description}
        </p>
      </div>

      {/* Image */}
      <div className={`relative ${index % 2 === 1 ? 'md:col-start-1' : ''}`}>
        <div className="relative aspect-[3/4] max-w-[300px] mx-auto">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent blur-3xl" />
          
          {/* Phone mockup container */}
          <div className="relative bg-surface rounded-3xl border border-white/10 p-3 overflow-hidden group hover:border-primary/30 transition-all duration-500 hover:shadow-glow">
            <Image
              src={feature.image}
              alt={feature.title}
              fill
              className="object-contain rounded-2xl transition-transform duration-500 group-hover:scale-[1.02]"
              sizes="(max-width: 768px) 100vw, 300px"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function FeaturesSection() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  return (
    <section id="features" className="py-24 md:py-32 bg-bg-primary">
      <div className="container">
        {/* Section header */}
        <motion.div
          ref={headerRef}
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Features</span>
          <h2 className="section-title">Everything in One App</h2>
          <p className="section-description">
            AllHalal combines powerful verification technology with essential Islamic tools for your daily life.
          </p>
        </motion.div>

        {/* Features */}
        <div className="space-y-24 md:space-y-32">
          {features.map((feature, index) => (
            <FeatureCard key={feature.id} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
