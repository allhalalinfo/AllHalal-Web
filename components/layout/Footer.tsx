"use client";

/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * FOOTER COMPONENT - Hatchet-style Multi-column Footer
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * Features:
 * - Multi-column layout with navigation links
 * - Contact information
 * - Social media links
 * - Legal links and copyright
 * - Smooth hover effects
 * 
 * Based on hatchet.com.au footer design
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const socialLinks = [
  { label: "Instagram", href: "https://instagram.com/allhalal.info", icon: InstagramIcon },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] as const },
  },
};

export default function Footer() {
  const t = useTranslations("footer");
  
  // Footer navigation structure with translations
  const footerNav = {
    product: {
      title: t("product"),
      links: [
        { label: t("links.features"), href: "/#features" },
        { label: t("links.howItWorks"), href: "/#about" },
        { label: t("links.madhhabSupport"), href: "/#madhhab" },
        { label: t("links.downloadApp"), href: "https://apps.apple.com/app/allhalal/id6504640498" },
      ],
    },
    company: {
      title: t("company"),
      links: [
        { label: t("links.aboutUs"), href: "/#about" },
        { label: t("links.contact"), href: "/contact" },
        { label: t("links.support"), href: "/support" },
      ],
    },
    legal: {
      title: t("legal"),
      links: [
        { label: t("links.privacyPolicy"), href: "/legal/privacy-policy" },
        { label: t("links.termsOfService"), href: "/legal/terms-of-service" },
        { label: t("links.disclaimer"), href: "/legal/disclaimer" },
      ],
    },
  };

  return (
    <footer className="bg-bg-secondary border-t border-border">
      {/* Main Footer Content */}
      <div className="container py-16 md:py-24">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Brand Column */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-bold text-text-primary">allhalal.info</span>
            </Link>
            <p className="mt-4 text-text-secondary max-w-sm leading-relaxed">
              {t("description")}
            </p>
            <div className="mt-6">
              <a
                href="mailto:app@allhalal.info"
                className="text-primary hover:text-primary-light transition-colors"
              >
                app@allhalal.info
              </a>
            </div>
            
            {/* Social Links */}
            <div className="flex gap-4 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-bg-tertiary border border-border hover:border-primary hover:text-primary transition-all"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Navigation Columns */}
          {Object.values(footerNav).map((section) => (
            <motion.div key={section.title} variants={itemVariants}>
              <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-text-secondary hover:text-text-primary transition-colors inline-block relative group"
                    >
                      {link.label}
                      <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-text-muted text-sm">
              © {new Date().getFullYear()} allhalal.info. {t("copyright")}
            </p>
            <p className="text-text-muted text-sm">
              {t("developedBy")}{" "}
              <a
                href="https://gezellix.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-tertiary hover:text-primary transition-colors"
              >
                Gezellix
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Icon Components
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}


