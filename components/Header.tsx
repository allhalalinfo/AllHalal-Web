'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Header Component
 * 
 * Sticky header with:
 * - Logo
 * - Navigation links (Features, Legal, Contact)
 * - CTA button
 * - Mobile hamburger menu
 * - Backdrop blur effect on scroll
 * 
 * Inspired by hatchet.com.au navigation style.
 */

const navLinks = [
  { href: '/#features', label: 'Features' },
  { href: '/legal', label: 'Legal' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 ${
          isScrolled
            ? 'bg-bg-primary/90 backdrop-blur-xl border-b border-white/5'
            : 'bg-transparent'
        }`}
      >
        <div className="container-wide">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link 
              href="/" 
              className="text-sm font-semibold tracking-[0.1em] text-white hover:text-primary transition-colors"
            >
              ALLHALAL
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link, index) => (
                <div key={link.href} className="flex items-center gap-6">
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors whitespace-nowrap"
                  >
                    {link.label}
                  </Link>
                  {index < navLinks.length - 1 && (
                    <span className="w-px h-3 bg-white/10" />
                  )}
                </div>
              ))}
            </nav>
            
            {/* CTA Button */}
            <a
              href="https://apps.apple.com/us/app/allhalal-info-food-scanner/id6756242265"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-bg-primary bg-primary rounded-lg hover:bg-primary-light transition-all hover:-translate-y-0.5 hover:shadow-glow-sm"
            >
              Download iOS
            </a>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden relative w-10 h-10 flex items-center justify-center"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              <div className="flex flex-col gap-1.5 w-6">
                <motion.span
                  className="block h-0.5 bg-primary rounded-full origin-center"
                  animate={{
                    rotate: isMobileMenuOpen ? 45 : 0,
                    y: isMobileMenuOpen ? 8 : 0,
                  }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  className="block h-0.5 bg-primary rounded-full"
                  animate={{ opacity: isMobileMenuOpen ? 0 : 1 }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  className="block h-0.5 bg-primary rounded-full origin-center"
                  animate={{
                    rotate: isMobileMenuOpen ? -45 : 0,
                    y: isMobileMenuOpen ? -8 : 0,
                  }}
                  transition={{ duration: 0.2 }}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-[999] bg-black/90 backdrop-blur-xl md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Menu */}
            <motion.nav
              className="fixed top-[88px] right-4 left-4 z-[1000] bg-bg-tertiary border border-primary/30 rounded-2xl p-6 md:hidden"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              {/* Download button */}
              <a
                href="https://apps.apple.com/us/app/allhalal-info-food-scanner/id6756242265"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full px-5 py-3 mb-4 text-sm font-semibold text-bg-primary bg-primary rounded-xl hover:bg-primary-light transition-all"
                onClick={() => setIsMobileMenuOpen(false)}
              >
            Download iOS
              </a>
              
              {/* Nav links */}
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="px-4 py-3 text-lg font-medium text-white hover:text-primary hover:bg-white/5 rounded-lg transition-all"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
        </div>
            </motion.nav>
          </>
      )}
      </AnimatePresence>
    </>
  );
}
