'use client';

import Link from 'next/link';

/**
 * Footer Component
 * 
 * Clean, minimal footer with:
 * - Logo
 * - Quick links
 * - Legal links
 * - Copyright
 * 
 * Dark theme matching the rest of the site.
 */

const quickLinks = [
  { href: '/', label: 'Home' },
  { href: '/#features', label: 'Features' },
  { href: '/contact', label: 'Contact' },
];

const legalLinks = [
  { href: '/legal/privacy-policy', label: 'Privacy Policy' },
  { href: '/legal/terms-of-service', label: 'Terms of Service' },
  { href: '/legal/disclaimer', label: 'Disclaimer' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-bg-primary">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link 
              href="/" 
              className="inline-block text-sm font-semibold tracking-[0.1em] text-white mb-4"
            >
              ALLHALAL
            </Link>
            <p className="text-sm text-white/50 max-w-xs mb-6">
              Your trusted halal companion. Scan, verify, and live according to your values with confidence.
            </p>
            <a
              href="mailto:app@allhalal.info"
              className="text-sm text-primary hover:text-primary-light transition-colors"
            >
              app@allhalal.info
            </a>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Navigation</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 hover:text-white transition-colors"
                  >
                    {link.label}
                </Link>
              </li>
              ))}
            </ul>
          </div>
          
          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 hover:text-white transition-colors"
                  >
                    {link.label}
                </Link>
              </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-white/5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/40">
              © {currentYear} AllHalal. All rights reserved.
            </p>
            <p className="text-xs text-white/40">
              Developed by Gezellix
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
