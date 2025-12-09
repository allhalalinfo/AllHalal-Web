"use client";

/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * HEADER COMPONENT - Mobile-First Navigation
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * Best practices implemented:
 * - useRef for scroll tracking (avoids re-renders)
 * - Proper z-index layering
 * - Touch-friendly interactions
 * - Backdrop click to close
 * - Auto-close on resize to desktop
 * - Don't hide header when menu is open
 * - Accessibility: aria-expanded, aria-label
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";

export default function Header() {
  const t = useTranslations("nav");
  
  const navItems = [
    { label: t("features"), href: "/#features" },
    { label: t("legal"), href: "/legal" },
    { label: t("contact"), href: "/contact" },
    { label: t("support"), href: "/support" },
  ];

  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Use ref to track scroll position (avoids re-renders)
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  // Optimized scroll handler with requestAnimationFrame
  const updateScrollState = useCallback(() => {
    const currentScrollY = window.scrollY;
    
    // Update background state
    setIsScrolled(currentScrollY > 50);
    
    // Don't hide header when mobile menu is open
    if (!isMobileMenuOpen) {
      if (currentScrollY > 100) {
        // Only hide when scrolling down significantly
        if (currentScrollY > lastScrollY.current + 10 && currentScrollY > 200) {
          setIsHidden(true);
        } else if (currentScrollY < lastScrollY.current - 10) {
          setIsHidden(false);
        }
      } else {
        setIsHidden(false);
      }
    }
    
    lastScrollY.current = currentScrollY;
    ticking.current = false;
  }, [isMobileMenuOpen]);

  const handleScroll = useCallback(() => {
    if (!ticking.current) {
      requestAnimationFrame(updateScrollState);
      ticking.current = true;
    }
  }, [updateScrollState]);

  // Scroll listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Body scroll lock when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      // Save current scroll position
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.overflow = "hidden";
      
      // Show header when menu is open
      setIsHidden(false);
    } else {
      // Restore scroll position
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflow = "";
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      }
    }
    
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Close menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobileMenuOpen]);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isMobileMenuOpen]);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen(prev => !prev);

  return (
    <>
      {/* Main Header - always above mobile menu */}
      <motion.header
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          isScrolled || isMobileMenuOpen ? "bg-bg-primary/95 backdrop-blur-xl shadow-sm" : "bg-transparent"
        }`}
        initial={false}
        animate={{ y: isHidden && !isMobileMenuOpen ? -100 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="container">
          <nav className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link 
              href="/"
              onClick={closeMobileMenu}
              className="text-xl font-bold tracking-tight text-text-primary hover:text-primary transition-colors z-10"
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

            {/* Desktop CTA + Language */}
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

            {/* Mobile Menu Button - high z-index to stay clickable */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden relative w-12 h-12 flex items-center justify-center z-10 -mr-2"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              type="button"
            >
              <div className="relative w-6 h-5">
                <span
                  className={`absolute left-0 w-full h-0.5 bg-text-primary rounded-full transition-all duration-300 origin-center ${
                    isMobileMenuOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-text-primary rounded-full transition-all duration-300 ${
                    isMobileMenuOpen ? "opacity-0 scale-x-0" : "opacity-100 scale-x-100"
                  }`}
                />
                <span
                  className={`absolute left-0 w-full h-0.5 bg-text-primary rounded-full transition-all duration-300 origin-center ${
                    isMobileMenuOpen ? "bottom-1/2 translate-y-1/2 -rotate-45" : "bottom-0"
                  }`}
                />
              </div>
            </button>
          </nav>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay - compact layout */}
      <AnimatePresence mode="wait">
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-[90] bg-bg-primary md:hidden overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Menu Content - compact, top-aligned */}
            <motion.nav
              className="flex flex-col items-start px-6 pt-24 pb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, delay: 0.05 }}
            >
              {/* Navigation Links */}
              <div className="w-full space-y-1 mb-8">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2, delay: 0.05 + index * 0.03 }}
                  >
                    <Link
                      href={item.href}
                      onClick={closeMobileMenu}
                      className="text-xl font-semibold text-text-primary hover:text-primary active:text-primary transition-colors block py-3 border-b border-border/50"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
              
              {/* Bottom section */}
              <div className="w-full space-y-4">
                {/* Language Switcher - opens upward */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  transition={{ duration: 0.2, delay: 0.2 }}
                >
                  <LanguageSwitcher openUpward />
                </motion.div>
                
                {/* Download Button */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  transition={{ duration: 0.2, delay: 0.25 }}
                >
                  <Link
                    href="https://apps.apple.com/app/allhalal/id6504640498"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeMobileMenu}
                    className="btn btn-primary w-full justify-center"
                  >
                    {t("downloadApp")}
                  </Link>
                </motion.div>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
