"use client";

/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * HEADER COMPONENT - Hatchet-style Navigation
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * Features:
 * - Sticky header that hides on scroll down, reveals on scroll up
 * - Transparent initially, gets backdrop blur when scrolled
 * - Mobile hamburger menu with smooth animation
 * - Active link highlighting
 * 
 * Based on hatchet.com.au header behavior
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";

export default function Header() {
  const t = useTranslations("nav");
  
  // Navigation items configuration
  const navItems = [
    { label: t("features"), href: "/#features" },
    { label: t("legal"), href: "/legal" },
    { label: t("contact"), href: "/contact" },
    { label: t("support"), href: "/support" },
  ];
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Handle scroll behavior - hide on scroll down, show on scroll up
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    
    // Update scrolled state for background change
    setIsScrolled(currentScrollY > 50);
    
    // Hide/show logic - only after scrolling past hero
    if (currentScrollY > 100) {
      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        // Scrolling down - hide header
        setIsHidden(true);
      } else {
        // Scrolling up - show header
        setIsHidden(false);
      }
    } else {
      setIsHidden(false);
    }
    
    setLastScrollY(currentScrollY);
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Main Header */}
      <motion.header
        className={`fixed top-0 left-0 right-0 z-fixed transition-all duration-300 ${
          isScrolled ? "bg-bg-primary/90 backdrop-blur-xl shadow-sm" : "bg-transparent"
        }`}
        initial={{ y: 0 }}
        animate={{ y: isHidden ? -100 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="container">
          <nav className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link 
              href="/" 
              className="text-xl font-bold tracking-tight text-text-primary hover:text-primary transition-colors"
            >
              allhalal.info
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </div>

            {/* CTA Button + Language Switcher - Desktop */}
            <div className="hidden md:flex items-center gap-4">
              <LanguageSwitcher />
              <Link
                href="https://apps.apple.com/app/allhalal/id6504640498"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                {t("downloadApp")}
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden relative w-10 h-10 flex items-center justify-center"
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-5">
                <motion.span
                  className="absolute left-0 w-full h-0.5 bg-text-primary rounded-full"
                  animate={{
                    top: isMobileMenuOpen ? "50%" : "0%",
                    rotate: isMobileMenuOpen ? 45 : 0,
                    translateY: isMobileMenuOpen ? "-50%" : 0,
                  }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-text-primary rounded-full"
                  animate={{
                    opacity: isMobileMenuOpen ? 0 : 1,
                    scaleX: isMobileMenuOpen ? 0 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className="absolute left-0 w-full h-0.5 bg-text-primary rounded-full"
                  animate={{
                    bottom: isMobileMenuOpen ? "50%" : "0%",
                    rotate: isMobileMenuOpen ? -45 : 0,
                    translateY: isMobileMenuOpen ? "50%" : 0,
                  }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </button>
          </nav>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-modal-backdrop bg-bg-primary md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.nav
              className="flex flex-col items-center justify-center h-full gap-8 pt-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {navItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-3xl font-bold text-text-primary hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              
              {/* Language Switcher - Mobile */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3, delay: 0.25 }}
                className="mt-4"
              >
                <LanguageSwitcher />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                className="mt-4"
              >
                <Link
                  href="https://apps.apple.com/app/allhalal/id6504640498"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="btn btn-primary btn-lg"
                >
                  {t("downloadApp")}
                </Link>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

