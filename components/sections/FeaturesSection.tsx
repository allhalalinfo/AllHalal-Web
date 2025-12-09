"use client";

/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * FEATURES SECTION - Main App Features Showcase
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * Features:
 * - Alternating layout (image left/right)
 * - Sticky image scroll effect
 * - Feature cards with hover effects
 * - Screenshot displays
 * 
 * Based on hatchet.com.au case studies / services section
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

// Features data - using actual screenshots from /public/app-screens/
const features = [
  {
    badge: "AI Technology",
    title: "AI Ingredient Scanner",
    description:
      "Simply scan any product barcode or take a photo of the ingredient list. Our advanced AI analyzes each ingredient against our comprehensive halal database, providing instant verification with detailed explanations.",
    highlights: [
      "Instant barcode scanning",
      "Photo ingredient analysis",
      "Detailed ingredient breakdown",
      "Confidence scoring",
    ],
    image: "/app-screens/ingredient-scan.png",
    color: "from-emerald-500/20 to-transparent",
  },
  {
    badge: "Verified Products",
    title: "Product Verification & Halal Status",
    description:
      "Get instant verification for any product. Our comprehensive database covers millions of products worldwide, with detailed halal status information backed by authentic Islamic scholarship.",
    highlights: [
      "2M+ products verified",
      "Multi-madhhab support",
      "Scholarly citations",
      "Detailed explanations",
    ],
    image: "/app-screens/product-verified.png",
    color: "from-blue-500/20 to-transparent",
  },
  {
    badge: "Cosmetics & Beauty",
    title: "Halal Cosmetics Verification",
    description:
      "Not just food — AllHalal helps you verify cosmetics and beauty products too. Check ingredients for animal-derived components and ensure your skincare routine aligns with Islamic principles.",
    highlights: [
      "Cosmetics database",
      "Animal-derived detection",
      "Beauty product scanning",
      "Skincare verification",
    ],
    image: "/app-screens/cosmetics.png",
    color: "from-pink-500/20 to-transparent",
  },
  {
    badge: "Islamic Tools",
    title: "Prayer Times, Qibla & Islamic Calendar",
    description:
      "Everything you need for your daily Islamic practice in one app. Accurate prayer times based on your location, precise Qibla direction, and a complete Hijri calendar with important Islamic dates.",
    highlights: [
      "Location-based prayer times",
      "Compass Qibla finder",
      "Hijri calendar integration",
      "Prayer notifications",
    ],
    image: "/app-screens/prayer-times.png",
    color: "from-purple-500/20 to-transparent",
  },
  {
    badge: "Wearable",
    title: "Apple Watch Companion",
    description:
      "Access essential halal features right from your wrist. Quick product scans, prayer time notifications, and Qibla direction — all optimized for Apple Watch.",
    highlights: [
      "Quick scan from wrist",
      "Prayer notifications",
      "Qibla compass",
      "Seamless sync",
    ],
    image: "/app-screens/smartwatch.png",
    color: "from-cyan-500/20 to-transparent",
  },
];

export default function FeaturesSection() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={containerRef}
      id="features"
      className="section-lg bg-bg-primary relative overflow-hidden"
    >
      <div className="container relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-24"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            className="inline-block text-primary text-sm font-semibold uppercase tracking-widest mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Features
          </motion.span>
          
          <motion.h2
            className="text-display-1 font-bold text-text-primary mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Everything You Need for{" "}
            <span className="text-gradient">Halal Living</span>
          </motion.h2>
          
          <motion.p
            className="text-xl text-text-secondary"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Powerful features designed to make halal verification simple, 
            accurate, and accessible.
          </motion.p>
        </motion.div>

        {/* Features List */}
        <div className="space-y-32">
          {features.map((feature, index) => (
            <FeatureItem
              key={feature.title}
              feature={feature}
              index={index}
              isReversed={index % 2 !== 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// Feature Item Component
interface FeatureItemProps {
  feature: typeof features[0];
  index: number;
  isReversed: boolean;
}

function FeatureItem({ feature, index, isReversed }: FeatureItemProps) {
  const itemRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(itemRef, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={itemRef}
      className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
        isReversed ? "lg:flex-row-reverse" : ""
      }`}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.1 }}
    >
      {/* Content */}
      <div className={`${isReversed ? "lg:order-2" : ""}`}>
        <motion.span
          className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {feature.badge}
        </motion.span>

        <motion.h3
          className="text-display-3 font-bold text-text-primary mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {feature.title}
        </motion.h3>

        <motion.p
          className="text-lg text-text-secondary mb-8 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {feature.description}
        </motion.p>

        {/* Highlights */}
        <motion.ul
          className="grid sm:grid-cols-2 gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {feature.highlights.map((highlight, i) => (
            <motion.li
              key={highlight}
              className="flex items-center gap-3 text-text-secondary"
              initial={{ opacity: 0, x: -10 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
            >
              <span className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <CheckIcon className="w-3 h-3 text-primary" />
              </span>
              {highlight}
            </motion.li>
          ))}
        </motion.ul>
      </div>

      {/* Image */}
      <motion.div
        className={`relative ${isReversed ? "lg:order-1" : ""}`}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        {/* Phone mockup container */}
        <div className="relative mx-auto max-w-[320px]">
          {/* Glow effect */}
          <div className={`absolute inset-0 bg-gradient-radial ${feature.color} blur-3xl scale-150 opacity-50`} />
          
          {/* Phone frame */}
          <div className="relative bg-bg-card rounded-[3rem] p-3 border border-border shadow-2xl">
            {/* Screen */}
            <div className="relative aspect-[9/19] rounded-[2.5rem] overflow-hidden bg-bg-tertiary">
              <Image
                src={feature.image}
                alt={feature.title}
                fill
                className="object-cover"
                sizes="320px"
              />
            </div>
            
            {/* Notch */}
            <div className="absolute top-5 left-1/2 -translate-x-1/2 w-24 h-6 bg-bg-card rounded-full" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}

