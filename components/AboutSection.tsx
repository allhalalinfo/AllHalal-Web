'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * AboutSection Component
 * 
 * Brief introduction to AllHalal with:
 * - Mission statement
 * - Key stats
 * - Why choose AllHalal
 */

const stats = [
  { value: '2M+', label: 'Products Verified' },
  { value: '4', label: 'Madhahib Supported' },
  { value: '10+', label: 'Languages' },
  { value: '99%', label: 'Accuracy Rate' },
];

const reasons = [
  {
    title: 'Authentic Scholarship',
    description: 'Rulings verified by qualified Islamic scholars across all major schools of thought.',
  },
  {
    title: 'Advanced AI Technology',
    description: 'Our AI instantly analyzes ingredients, E-numbers, and additives for halal compliance.',
  },
  {
    title: 'Global Database',
    description: 'Access products from around the world with real-time updates and community contributions.',
  },
];

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-24 md:py-32 bg-bg-primary border-t border-white/5">
      <div className="container">
        <motion.div
          ref={ref}
          className="grid md:grid-cols-2 gap-16 items-start"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Left: About text */}
          <div>
            <span className="section-label">About</span>
            <h2 className="text-display-2 mb-6">
              Your Trusted
              <span className="gradient-text"> Halal </span>
              Companion
            </h2>
            <p className="text-lg text-white/60 leading-relaxed mb-8">
              AllHalal was created to empower Muslims worldwide with instant, accurate halal verification. 
              We combine cutting-edge AI technology with authentic Islamic scholarship to help you make 
              informed decisions about the products you consume.
            </p>
            <p className="text-white/50 leading-relaxed">
              Whether you&apos;re shopping for food, cosmetics, or medicine, AllHalal provides 
              comprehensive halal status based on your chosen school of Islamic jurisprudence.
            </p>
          </div>

          {/* Right: Stats */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="card card-primary text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-white/50">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Why AllHalal */}
        <motion.div
          className="mt-24"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="text-center text-2xl font-semibold text-white mb-12">
            Why Choose AllHalal?
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {reasons.map((reason, index) => (
              <motion.div
                key={reason.title}
                className="card card-primary"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
              >
                <div className="w-10 h-10 rounded-lg bg-primary-soft border border-primary/20 flex items-center justify-center mb-4">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">{reason.title}</h4>
                <p className="text-sm text-white/50 leading-relaxed">{reason.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
