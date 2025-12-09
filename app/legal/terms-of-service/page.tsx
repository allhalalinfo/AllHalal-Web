"use client";

/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * TERMS OF SERVICE PAGE
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * Clean, readable terms of service with proper typography.
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { motion } from "framer-motion";
import Link from "next/link";

export default function TermsOfServicePage() {
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
          Last Updated: December 2024
        </p>
        <h1>Terms of Service</h1>
        <p className="text-xl text-text-secondary leading-relaxed">
          Please read these terms carefully before using AllHalal. By using our app, 
          you agree to be bound by these terms.
        </p>
      </div>

      {/* Content */}
      <h2>1. Acceptance of Terms</h2>
      <p>
        By accessing or using AllHalal, you agree to be bound by these Terms of Service 
        and all applicable laws and regulations. If you do not agree with any of these 
        terms, you are prohibited from using this app.
      </p>

      <h2>2. Description of Service</h2>
      <p>
        AllHalal provides halal verification services through barcode scanning and 
        ingredient analysis. Our app also offers prayer times, Qibla direction, and 
        Islamic calendar features. The service is provided "as is" and we make no 
        guarantees about the accuracy or availability of the service.
      </p>

      <h2>3. User Responsibilities</h2>
      <p>As a user of AllHalal, you agree to:</p>
      <ul>
        <li>Provide accurate information when creating an account</li>
        <li>Keep your account credentials secure</li>
        <li>Use the app in accordance with all applicable laws</li>
        <li>Not attempt to reverse engineer or modify the app</li>
        <li>Not use the app for any illegal or unauthorized purpose</li>
        <li>Not interfere with or disrupt the service</li>
      </ul>

      <h2>4. Intellectual Property</h2>
      <p>
        All content, features, and functionality of AllHalal, including but not limited 
        to text, graphics, logos, and software, are the exclusive property of AllHalal 
        and are protected by international copyright, trademark, and other intellectual 
        property laws.
      </p>

      <h2>5. Limitation of Liability</h2>
      <p>
        AllHalal provides halal verification information as a convenience and reference 
        tool. We are not liable for any decisions made based on the information provided. 
        Users should consult with qualified Islamic scholars for definitive rulings on 
        specific matters.
      </p>
      <p>
        In no event shall AllHalal be liable for any indirect, incidental, special, 
        consequential, or punitive damages arising out of or related to your use of 
        the service.
      </p>

      <h2>6. Religious Disclaimer</h2>
      <p>
        AllHalal provides information based on our research and database. Different 
        scholars and schools of thought may have varying opinions on certain ingredients 
        or products. Users are encouraged to verify information with their local scholars 
        for matters of religious importance.
      </p>

      <h2>7. Modifications to Service</h2>
      <p>
        We reserve the right to modify, suspend, or discontinue any part of the service 
        at any time without prior notice. We shall not be liable to you or any third 
        party for any modification, suspension, or discontinuation.
      </p>

      <h2>8. Account Termination</h2>
      <p>
        We may terminate or suspend your account and access to the service immediately, 
        without prior notice, for conduct that we believe violates these Terms of Service 
        or is harmful to other users, us, or third parties.
      </p>

      <h2>9. Governing Law</h2>
      <p>
        These Terms shall be governed by and construed in accordance with applicable laws, 
        without regard to conflict of law provisions. Any disputes arising from these terms 
        shall be resolved through binding arbitration.
      </p>

      <h2>10. Changes to Terms</h2>
      <p>
        We reserve the right to update these terms at any time. We will notify users of 
        any material changes by posting the new terms on this page and updating the 
        effective date.
      </p>

      <h2>11. Contact Information</h2>
      <p>
        For questions about these Terms of Service, please contact us at{" "}
        <a href="mailto:app@allhalal.info">app@allhalal.info</a>.
      </p>

      {/* Footer note */}
      <div className="mt-16 pt-8 border-t border-border">
        <p className="text-sm text-text-muted">
          By using AllHalal, you acknowledge that you have read, understood, and agree 
          to be bound by these Terms of Service.
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
