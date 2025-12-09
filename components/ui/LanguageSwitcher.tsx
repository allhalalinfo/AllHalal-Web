"use client";

/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * LANGUAGE SWITCHER COMPONENT
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * Fixed issues:
 * - Max height with scroll for small screens
 * - Reliable locale switching with proper path handling
 * - Bottom positioning option for mobile menu
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { useState, useRef, useEffect, useCallback } from "react";
import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { locales, localeNames, localeFlags, defaultLocale, type Locale } from "@/i18n/config";

interface LanguageSwitcherProps {
  /** Open dropdown upward (for mobile menu at bottom) */
  openUpward?: boolean;
}

export default function LanguageSwitcher({ openUpward = false }: LanguageSwitcherProps) {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  const handleClickOutside = useCallback((event: MouseEvent | TouchEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  }, []);

  // Close on escape key
  const handleEscape = useCallback((event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, handleClickOutside, handleEscape]);

  const handleLocaleChange = (newLocale: Locale) => {
    setIsOpen(false);
    
    // Get path without any locale prefix
    let pathWithoutLocale = pathname;
    
    // Remove existing locale prefix if present
    for (const loc of locales) {
      if (pathname.startsWith(`/${loc}/`)) {
        pathWithoutLocale = pathname.slice(loc.length + 1);
        break;
      } else if (pathname === `/${loc}`) {
        pathWithoutLocale = "/";
        break;
      }
    }
    
    // Build new path
    let newPath: string;
    if (newLocale === defaultLocale) {
      // Default locale doesn't need prefix
      newPath = pathWithoutLocale || "/";
    } else {
      // Add locale prefix
      newPath = `/${newLocale}${pathWithoutLocale === "/" ? "" : pathWithoutLocale}`;
    }
    
    // Use window.location for reliable navigation
    window.location.href = newPath;
  };

  const toggleDropdown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(prev => !prev);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={toggleDropdown}
        type="button"
        className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-bg-tertiary border border-border hover:border-primary/30 active:scale-95 transition-all text-sm min-h-[44px]"
        aria-label="Select language"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className="text-lg">{localeFlags[locale]}</span>
        <span className="text-text-secondary">{localeNames[locale]}</span>
        <ChevronIcon className={`w-4 h-4 text-text-muted transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: openUpward ? 8 : -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: openUpward ? 8 : -8 }}
            transition={{ duration: 0.15 }}
            className={`absolute left-1/2 -translate-x-1/2 w-56 py-2 bg-bg-card border border-border rounded-xl shadow-2xl z-[200] ${
              openUpward ? "bottom-full mb-2" : "top-full mt-2"
            }`}
            style={{ maxHeight: "min(320px, 50vh)", overflowY: "auto" }}
            role="listbox"
            aria-label="Languages"
          >
            {locales.map((loc) => (
              <button
                key={loc}
                onClick={() => handleLocaleChange(loc)}
                type="button"
                role="option"
                aria-selected={locale === loc}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left text-sm transition-colors ${
                  locale === loc
                    ? "bg-primary/10 text-primary"
                    : "text-text-secondary hover:bg-bg-tertiary active:bg-bg-secondary hover:text-text-primary"
                }`}
              >
                <span className="text-lg">{localeFlags[loc]}</span>
                <span className="flex-1">{localeNames[loc]}</span>
                {locale === loc && (
                  <CheckIcon className="w-4 h-4 text-primary flex-shrink-0" />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}
