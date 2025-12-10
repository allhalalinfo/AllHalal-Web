"use client";

/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * DISCLAIMER PAGE
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * Clean, readable disclaimer with proper typography.
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { motion } from "framer-motion";
import Link from "next/link";

export default function DisclaimerPage() {
  return (
    <motion.article
      className="prose"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Back link */}
      <Link 
        href="/legal" 
        className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-primary transition-colors mb-8 no-underline"
      >
        <ArrowLeftIcon className="w-4 h-4" />
        Back to Legal
      </Link>

      {/* Header */}
      <div className="mb-12">
        <p className="text-sm text-primary font-medium uppercase tracking-wider mb-2">
          Last Updated: December 2025
        </p>
        <h1>Disclaimer</h1>
        <p className="text-xl text-text-secondary leading-relaxed">
          Important information regarding religious accuracy, liability, and the 
          proper use of AllHalal.
        </p>
      </div>

      {/* Content */}
      <h2>1. General Information</h2>
      <p>
        AllHalal is designed to assist Muslims in making informed decisions about 
        halal consumption. The information provided in our app is for general 
        informational purposes only and should not be considered as a substitute 
        for consultation with qualified Islamic scholars.
      </p>

      <h2>2. Religious Accuracy</h2>
      <p>
        While we strive to provide accurate halal information based on authentic 
        Islamic scholarship, we acknowledge that:
      </p>
      <ul>
        <li>
          Different schools of Islamic jurisprudence (madhahib) may have varying 
          opinions on certain ingredients or products.
        </li>
        <li>
          New ingredients or processing methods may not yet be fully evaluated 
          by scholars.
        </li>
        <li>
          Product formulations may change without notice from manufacturers.
        </li>
        <li>
          Our database, while extensive, may not cover all products or regions.
        </li>
      </ul>

      <h2>3. Not a Religious Authority</h2>
      <p>
        AllHalal is a technology tool and does not claim to be a religious authority. 
        Our team includes researchers who consult scholarly sources, but our app should 
        not replace guidance from qualified muftis, imams, or Islamic scholars for 
        matters of religious importance.
      </p>

      <blockquote>
        We strongly encourage users to consult with their local scholars, especially 
        for products with uncertain or disputed ingredients.
      </blockquote>

      <h2>4. Database Limitations</h2>
      <p>
        Our halal verification database is continuously updated, but users should be 
        aware that:
      </p>
      <ul>
        <li>Not all products in the world are included in our database</li>
        <li>Regional variations of products may have different ingredients</li>
        <li>Manufacturers may change ingredients without updating packaging</li>
        <li>Some ingredients may have multiple sources (halal and non-halal)</li>
      </ul>

      <h2>5. Boycott Information</h2>
      <p>
        Any boycott-related information provided in AllHalal is based on publicly 
        available data and various Islamic guidance sources. Users should verify 
        this information and make their own informed decisions based on their 
        personal beliefs and the guidance of their scholars.
      </p>

      <h2>6. Medical and Dietary Disclaimer</h2>
      <p>
        AllHalal is not a medical or dietary advice application. Information about 
        ingredients is provided for halal verification purposes only. Users with 
        allergies, dietary restrictions, or health conditions should consult with 
        healthcare professionals.
      </p>

      <h2>7. Limitation of Liability</h2>
      <p>
        To the fullest extent permitted by law, AllHalal and its developers, 
        employees, and affiliates shall not be liable for:
      </p>
      <ul>
        <li>Any religious consequences arising from reliance on our information</li>
        <li>Any health issues related to consumption of verified products</li>
        <li>Any financial losses related to purchasing decisions</li>
        <li>Any damages arising from app errors or database inaccuracies</li>
      </ul>

      <h2>8. User Responsibility</h2>
      <p>
        Users of AllHalal are responsible for:
      </p>
      <ul>
        <li>Verifying product information when in doubt</li>
        <li>Consulting scholars for definitive religious rulings</li>
        <li>Checking actual product labels before consumption</li>
        <li>Making their own informed decisions</li>
      </ul>

      <h2>9. Changes to Information</h2>
      <p>
        We may update our database and information at any time without prior notice. 
        We recommend users periodically re-verify products, especially those that 
        were borderline or questionable.
      </p>

      <h2>10. Contact for Corrections</h2>
      <p>
        If you believe any information in AllHalal is incorrect or needs updating, 
        please contact us at <a href="mailto:app@allhalal.info">app@allhalal.info</a>. 
        We welcome corrections and scholarly input to improve our service.
      </p>

      {/* Important Notice Box */}
      <div className="my-12 p-6 rounded-xl bg-primary/10 border border-primary/20">
        <h3 className="text-primary mt-0 mb-3">Important Notice</h3>
        <p className="mb-0 text-text-secondary">
          By using AllHalal, you acknowledge that you have read and understood this 
          disclaimer. You agree to use the app as a helpful tool while maintaining 
          your own due diligence and consulting with appropriate religious authorities 
          for matters of spiritual significance.
        </p>
      </div>

      {/* Footer note */}
      <div className="mt-16 pt-8 border-t border-border">
        <p className="text-sm text-text-muted">
          May Allah guide us all to what is best and accept our efforts to live 
          according to His guidance. والله أعلم (And Allah knows best).
        </p>
      </div>
    </motion.article>
  );
}

function ArrowLeftIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
  );
}
