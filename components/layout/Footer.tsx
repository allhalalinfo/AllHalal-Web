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
import { useTranslations, useLocale } from "next-intl";

const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/allhalal.info?igsh=OXAzbWc4dW9tMTgy&utm_source=qr", icon: InstagramIcon },
  { label: "TikTok", href: "https://www.tiktok.com/@allhalal.info?_r=1&_t=ZN-92xfO5qF7UE", icon: TikTokIcon },
  { label: "Threads", href: "https://www.threads.com/@allhalal.info?igshid=NTc4MTIwNjQ2YQ==", icon: ThreadsIcon },
  { label: "Pinterest", href: "https://pin.it/7ELmrZcrw", icon: PinterestIcon },
  { label: "Reddit", href: "https://www.reddit.com/u/allhalalinfo/s/LNKknn54za", icon: RedditIcon },
  { label: "X (Twitter)", href: "https://x.com/allhalalinfo", icon: XIcon },
  { label: "Bluesky", href: "https://bsky.app/profile/allhalalinfo.bsky.social", icon: BlueskyIcon },
  { label: "YouTube", href: "https://youtube.com/@allhalalinfo?si=h0044GYscW2jXN92", icon: YouTubeIcon },
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
  const locale = useLocale();
  
  // Footer navigation structure with translations
  const footerNav = {
    explore: {
      title: "Explore",
      links: [
        { label: "Halal Checker", href: "/is-it-halal" },
        { label: "Prayer Times", href: "/prayer-times" },
        { label: "Boycott Checker", href: "/boycott-checker" },
        { label: "Finance", href: "/finance" },
        { label: "Learn", href: "/learn" },
        { label: "Blog", href: "/blog" },
      ],
    },
    product: {
      title: t("product"),
      links: [
        { label: t("links.features"), href: "/#features" },
        { label: t("links.howItWorks"), href: "/#about" },
        { label: t("links.downloadApp"), href: "https://apps.apple.com/us/app/allhalal-info-food-scanner/id6756242265" },
      ],
    },
    company: {
      title: t("company"),
      links: [
        { label: t("links.aboutUs"), href: "/#about" },
        { label: "Our Methodology", href: "/methodology" },
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
    <footer className="bg-bg-dark text-text-inverse border-t border-border">
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
              <span className="text-2xl font-bold font-display text-text-inverse">allhalal.info</span>
            </Link>
            <p className="mt-4 text-text-inverse-secondary max-w-sm leading-relaxed">
              {t("description")}
            </p>
            <div className="mt-6">
              <a
                href="mailto:app@allhalal.info"
                className="text-primary-light hover:text-primary transition-colors"
              >
                app@allhalal.info
              </a>
            </div>
            
            {/* Social Links */}
            <div className="flex flex-wrap gap-3 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:border-primary-light hover:bg-white/10 transition-all text-text-inverse-secondary hover:text-primary-light"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Navigation Columns */}
          {Object.entries(footerNav).map(([key, section]) => (
            <motion.div key={key} variants={itemVariants}>
              <h3 className="text-sm font-semibold text-text-inverse uppercase tracking-wider mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href.startsWith('http') || link.href.startsWith('/#') ? link.href : `/${locale}${link.href}`}
                      className="text-text-inverse-secondary hover:text-text-inverse transition-colors inline-block relative group"
                    >
                      {link.label}
                      <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-primary-light transition-all duration-300 group-hover:w-full" />
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-text-inverse-secondary text-sm">
              © {new Date().getFullYear()} allhalal.info. {t("copyright")}
            </p>
            <p className="text-text-inverse-secondary text-sm">
              {t("developedBy")}{" "}
              <a
                href="https://gezellix.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-inverse hover:text-primary-light transition-colors"
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

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

function ThreadsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12.001.007C5.326.007.007 5.326.007 12.001c0 6.676 5.319 11.994 11.994 11.994s11.994-5.318 11.994-11.994S18.677.007 12.001.007zm0 1.994c5.524 0 10 4.476 10 10s-4.476 10-10 10-10-4.476-10-10 4.476-10 10-10zm-3.846 3.675a.797.797 0 0 0-.795.795v8.407a3.85 3.85 0 0 0 3.846 3.846 3.85 3.85 0 0 0 3.846-3.846v-4.893a.797.797 0 0 0-1.595 0v4.893a2.25 2.25 0 0 1-2.251 2.251 2.25 2.25 0 0 1-2.251-2.251V6.471a.797.797 0 0 0-.8-.795z" />
    </svg>
  );
}

function PinterestIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0C5.373 0 0 5.372 0 12s5.373 12 12 12c5.302 0 9.917-3.158 11.877-7.716-.163-.68-.35-2.916.074-4.15.477-1.566 3.07-10.754 3.07-10.754s-.78-.78-.78-1.936c0-1.812 1.05-3.163 2.357-3.163 1.112 0 1.65.835 1.65 1.836 0 1.118-.71 2.79-1.078 4.337-.307 1.3.652 2.364 1.93 2.364 2.317 0 3.91-2.443 3.91-5.97 0-2.52-1.812-4.28-4.4-4.28-2.998 0-4.76 2.246-4.76 4.57 0 .888.342 1.842.77 2.36a.3.3 0 0 1 .07.287l-.3 1.188c-.05.2-.16.24-.37.146-1.38-.643-2.244-2.662-2.244-4.285 0-3.5 2.545-6.715 7.34-6.715 3.855 0 6.85 2.745 6.85 6.412 0 3.828-2.415 6.9-5.767 6.9-1.127 0-2.188-.586-2.55-1.285l-.692 2.64c-.25.98-.925 2.21-1.38 2.96 1.04.32 2.14.49 3.28.49 6.627 0 12-5.372 12-12S18.627 0 12 0z" />
    </svg>
  );
}

function RedditIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-1.272a1.134 1.134 0 0 0-1.156-.14c-.408.17-.738.52-.925.94-.24.49-.37 1.02-.37 1.56v.835a1.25 1.25 0 0 1-2.498-.056V7.5a5.5 5.5 0 0 1 5.5-5.5c.28 0 .56.02.84.07a1.25 1.25 0 0 1 1.17-.826zM9.5 12a2.5 2.5 0 0 0-2.5 2.5 2.5 2.5 0 0 0 5 0 2.5 2.5 0 0 0-2.5-2.5zm7 0a2.5 2.5 0 0 0-2.5 2.5 2.5 2.5 0 0 0 5 0 2.5 2.5 0 0 0-2.5-2.5zm-7 1.5a1 1 0 0 1 1 1h4a1 1 0 0 1 0 2h-4a1 1 0 0 1-1-1z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function BlueskyIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 10.8c-1.087-2.114-4.046-6.53-6.798-8.958C3.81 1.257 2.694.01 1.2.01c-.066 0-.133.007-.2.02C.537.09.09.537.02 1c-.013.067-.02.134-.02.2C0 2.694 1.257 3.81 1.842 5.202c2.428 2.752 6.844 5.711 8.958 6.798 1.087 2.114 4.046 6.53 6.798 8.958C18.19 22.743 19.306 23.99 20.8 23.99c.066 0 .133-.007.2-.02.463-.07.91-.517.98-.98.013-.067.02-.134.02-.2 0-1.494-1.257-2.611-2.642-3.196-2.428-2.752-6.844-5.711-8.958-6.798zm-1.784 1.812C8.23 15.05 4.392 18.5 2.346 20.654c.654.654 1.692 1.192 2.854 1.192 1.494 0 2.611-1.257 3.196-2.642 1.784-2.046 5.622-5.496 7.668-7.642-1.784-2.046-5.622-5.496-7.668-7.642C7.811 1.257 6.694.01 5.2.01c-1.162 0-2.2.538-2.854 1.192 2.046 2.146 5.884 5.596 7.668 7.642z" />
    </svg>
  );
}

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}


