"use client";

/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * HEADER COMPONENT - Media Site Navigation
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * Features:
 * - Main navigation with all sections (Travel, Restaurants, Finance, etc.)
 * - Search button (opens Cmd+K modal)
 * - Language switcher
 * - Mobile menu (burger)
 * - Auto-hide on scroll down
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import { SearchButton, useSearch } from "@/components/media/search";
import { MAIN_NAV_ITEMS, SECONDARY_NAV_ITEMS } from "@/config/navigation";

export default function Header() {
  const t = useTranslations("nav");
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
      if (window.innerWidth >= 1024 && isMobileMenuOpen) {
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
  
  const isActive = (href: string) => {
    if (href === '/') return pathname === '/' || pathname === '/en';
    return pathname?.startsWith(href);
  };

  return (
    <>
      {/* Main Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-[100] transition-transform duration-300 ${
          isScrolled || isMobileMenuOpen ? "bg-bg-primary/95 backdrop-blur-xl shadow-sm border-b border-border/50" : "bg-transparent"
        }`}
        style={{ transform: isHidden && !isMobileMenuOpen ? "translateY(-100%)" : "translateY(0)" }}
      >
        <div className="container">
          <nav className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo */}
            <Link 
              href="/" 
              onClick={closeMobileMenu}
              className="text-xl font-bold tracking-tight text-text-primary hover:text-primary transition-colors z-10"
            >
              allhalal.info
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {MAIN_NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors rounded-lg ${
                    isActive(item.href)
                      ? 'text-text-primary bg-neutral-100 dark:bg-neutral-800'
                      : 'text-text-secondary hover:text-text-primary hover:bg-neutral-50 dark:hover:bg-neutral-800/50'
                  }`}
                >
                  {item.label}
                  {item.comingSoon && (
                    <span className="ml-1.5 px-1.5 py-0.5 text-[10px] font-semibold bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 rounded">
                      Soon
                    </span>
                  )}
                </Link>
              ))}
            </div>

            {/* Desktop Right Actions */}
            <div className="hidden lg:flex items-center gap-3">
              <button
                onClick={openSearch}
                className="p-2 text-text-secondary hover:text-text-primary hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
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
              className="lg:hidden relative w-10 h-10 flex items-center justify-center z-10"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              type="button"
            >
              <div className="relative w-5 h-4">
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

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-[90] bg-bg-primary lg:hidden transition-opacity duration-200 ${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <nav className="flex flex-col h-full px-6 pt-20 pb-8 overflow-y-auto">
          {/* Search in mobile */}
          <button
            onClick={() => {
              openSearch();
              closeMobileMenu();
            }}
            className="flex items-center gap-3 w-full px-4 py-3 mb-4 text-left text-text-secondary bg-neutral-100 dark:bg-neutral-800 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span>Search...</span>
            <kbd className="ml-auto px-2 py-1 text-xs bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded">
              ⌘K
            </kbd>
          </button>
          
          {/* Main Navigation */}
          <div className="space-y-1 mb-8">
            <p className="px-4 py-2 text-xs font-semibold text-text-tertiary uppercase tracking-wider">
              Sections
            </p>
            {MAIN_NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMobileMenu}
                className={`flex items-center justify-between px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                  isActive(item.href)
                    ? 'text-text-primary bg-neutral-100 dark:bg-neutral-800'
                    : 'text-text-secondary hover:text-text-primary hover:bg-neutral-50 dark:hover:bg-neutral-800/50'
                }`}
              >
                {item.label}
                {item.comingSoon && (
                  <span className="px-2 py-0.5 text-xs font-semibold bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 rounded">
                    Soon
                  </span>
                )}
              </Link>
            ))}
          </div>
          
          {/* Secondary Navigation */}
          <div className="space-y-1 mb-8">
            <p className="px-4 py-2 text-xs font-semibold text-text-tertiary uppercase tracking-wider">
              More
            </p>
            {SECONDARY_NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMobileMenu}
                className="block px-4 py-3 text-base text-text-secondary hover:text-text-primary hover:bg-neutral-50 dark:hover:bg-neutral-800/50 rounded-lg transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
          
          {/* Bottom section */}
          <div className="mt-auto pt-6 border-t border-border">
            <LanguageSwitcher />
          </div>
        </nav>
      </div>
    </>
  );
}
