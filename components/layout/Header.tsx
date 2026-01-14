"use client";

/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * HEADER COMPONENT - AllHalal Navigation
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import { useSearch } from "@/components/media/search";
import { MAIN_NAV_ITEMS } from "@/config/navigation";

export default function Header() {
  const pathname = usePathname();
  const { openSearch } = useSearch();
  
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

  // Body scroll lock
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
              {MAIN_NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Desktop CTA + Language */}
            <div className="hidden md:flex items-center gap-4">
              <button
                onClick={openSearch}
                className="p-2 text-text-secondary hover:text-text-primary transition-colors"
                aria-label="Search"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              <LanguageSwitcher />
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
            {MAIN_NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMobileMenu}
                className="text-xl font-semibold text-text-primary hover:text-primary block py-3 border-b border-border/50"
              >
                {item.label}
              </Link>
            ))}
          </div>
          
          {/* Search in mobile */}
          <button
            onClick={() => {
              openSearch();
              closeMobileMenu();
            }}
            className="w-full mb-4 px-4 py-3 text-left bg-neutral-100 dark:bg-neutral-800 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
          >
            <span className="text-sm">Search...</span>
          </button>
          
          {/* Bottom section */}
          <div className="w-full space-y-4">
            <LanguageSwitcher />
          </div>
        </nav>
      </div>
    </>
  );
}
