"use client";

/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * PRIVACY POLICY PAGE
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * Clean, readable privacy policy with proper typography.
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { motion } from "framer-motion";
import Link from "next/link";

export default function PrivacyPolicyPage() {
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
        <h1>Privacy Policy</h1>
        <p className="text-xl text-text-secondary leading-relaxed">
          Your privacy is important to us. This policy explains how AllHalal collects, 
          uses, and protects your personal information.
        </p>
      </div>

      {/* Content */}
      <h2>1. Information We Collect</h2>
      <p>
        AllHalal collects information to provide and improve our services. 
        The types of information we collect include:
      </p>
      <ul>
        <li>
          <strong>Account Information:</strong> When you create an account, we collect 
          your email address and any profile information you choose to provide.
        </li>
        <li>
          <strong>Usage Data:</strong> We collect information about how you use our app, 
          including products scanned, features used, and preferences set.
        </li>
        <li>
          <strong>Device Information:</strong> We collect device identifiers, operating 
          system version, and app version for troubleshooting and improvement purposes.
        </li>
        <li>
          <strong>Location Data:</strong> With your permission, we collect location data 
          to provide accurate prayer times and Qibla direction.
        </li>
      </ul>

      <h2>2. How We Use Your Information</h2>
      <p>We use the collected information to:</p>
      <ul>
        <li>Provide and maintain our halal verification services</li>
        <li>Personalize your experience based on your madhhab preference</li>
        <li>Calculate accurate prayer times for your location</li>
        <li>Improve and develop new features</li>
        <li>Send important updates about the app (with your consent)</li>
        <li>Respond to your inquiries and support requests</li>
      </ul>

      <h2>3. Data Storage and Security</h2>
      <p>
        We implement industry-standard security measures to protect your personal 
        information. Your data is stored securely using encryption and access controls. 
        We regularly review and update our security practices.
      </p>

      <h2>4. Third-Party Services</h2>
      <p>
        AllHalal may use third-party services for analytics, crash reporting, and 
        payment processing. These services have their own privacy policies governing 
        the use of your information.
      </p>

      <h2>5. Your Rights</h2>
      <p>You have the right to:</p>
      <ul>
        <li>Access your personal data</li>
        <li>Request correction of inaccurate data</li>
        <li>Request deletion of your account and data</li>
        <li>Opt out of marketing communications</li>
        <li>Export your data in a portable format</li>
      </ul>

      <h2>6. Data Retention</h2>
      <p>
        We retain your personal information for as long as your account is active or 
        as needed to provide you services. You can request deletion of your data at 
        any time by contacting us.
      </p>

      <h2>7. Children's Privacy</h2>
      <p>
        AllHalal is not intended for children under 13 years of age. We do not 
        knowingly collect personal information from children under 13.
      </p>

      <h2>8. Changes to This Policy</h2>
      <p>
        We may update this privacy policy from time to time. We will notify you of 
        any changes by posting the new policy on this page and updating the 
        "Last Updated" date.
      </p>

      <h2>9. Contact Us</h2>
      <p>
        If you have any questions about this Privacy Policy, please contact us at{" "}
        <a href="mailto:app@allhalal.info">app@allhalal.info</a>.
      </p>

      {/* Footer note */}
      <div className="mt-16 pt-8 border-t border-border">
        <p className="text-sm text-text-muted">
          This privacy policy is effective as of December 2025 and will remain in
          effect except with respect to any changes in its provisions in the future.
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
