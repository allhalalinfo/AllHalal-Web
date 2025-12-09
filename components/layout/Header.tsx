"use client";

/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * HEADER COMPONENT - Simplified for Mobile Performance
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * NO Framer Motion - uses CSS transitions only for better mobile performance
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
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
  
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  const updateScrollState = useCallback(() => {
    const currentScrollY = window.scrollY;
    setIsScrolled(currentScrollY > 50);
    
    if (!isMobileMenuOpen) {
    if (currentScrollY > 100) {
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

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Simple body scroll lock
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
      setIsHidden(false);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobileMenuOpen]);

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
      {/* Main Header - CSS only, no Framer Motion */}
      <header
        className={`fixed top-0 left-0 right-0 z-[100] transition-transform duration-300 ${
          isScrolled || isMobileMenuOpen ? "bg-bg-primary/95 backdrop-blur-xl shadow-sm" : "bg-transparent"
        }`}
        style={{ transform: isHidden && !isMobileMenuOpen ? "translateY(-100%)" : "translateY(0)" }}
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
                  className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
                >
                  {item.label}
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

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden relative w-12 h-12 flex items-center justify-center z-10 -mr-2"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              type="button"
            >
              <div className="relative w-6 h-5">
                <span
                  className={`absolute left-0 w-full h-0.5 bg-text-primary rounded-full transition-all duration-200 ${
                    isMobileMenuOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-text-primary rounded-full transition-all duration-200 ${
                    isMobileMenuOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute left-0 w-full h-0.5 bg-text-primary rounded-full transition-all duration-200 ${
                    isMobileMenuOpen ? "bottom-1/2 translate-y-1/2 -rotate-45" : "bottom-0"
                  }`}
                />
              </div>
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile Menu - CSS transitions only, no Framer Motion */}
      <div
        className={`fixed inset-0 z-[90] bg-bg-primary md:hidden transition-opacity duration-200 ${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
          >
        <nav className="flex flex-col items-start px-6 pt-24 pb-8">
          {/* Navigation Links */}
          <div className="w-full space-y-1 mb-8">
            {navItems.map((item) => (
              <Link
                  key={item.label}
                    href={item.href}
                onClick={closeMobileMenu}
                className="text-xl font-semibold text-text-primary hover:text-primary block py-3 border-b border-border/50"
                  >
                    {item.label}
                  </Link>
            ))}
          </div>
          
          {/* Bottom section */}
          <div className="w-full space-y-4">
            <LanguageSwitcher openUpward />
                <Link
                  href="https://apps.apple.com/app/allhalal/id6504640498"
                  target="_blank"
                  rel="noopener noreferrer"
              onClick={closeMobileMenu}
              className="btn btn-primary w-full justify-center"
                >
              {t("downloadApp")}
                </Link>
          </div>
        </nav>
      </div>
    </>
  );
}
