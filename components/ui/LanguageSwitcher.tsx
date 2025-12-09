"use client";

/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * LANGUAGE SWITCHER COMPONENT
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * Mobile-optimized dropdown for language switching.
 * - Touch-friendly with larger tap targets
 * - Proper z-index for mobile menu
 * - Click outside and escape to close
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { useState, useRef, useEffect, useCallback } from "react";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { locales, localeNames, localeFlags, type Locale } from "@/i18n/config";

export default function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
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
    // Remove current locale prefix from pathname and add new one
    const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, "") || "/";
    const newPath = newLocale === "en" ? pathWithoutLocale : `/${newLocale}${pathWithoutLocale}`;
    router.push(newPath);
    setIsOpen(false);
  };

  const toggleDropdown = () => setIsOpen(prev => !prev);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button - larger touch target */}
      <button
        onClick={toggleDropdown}
        type="button"
        className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-bg-tertiary border border-border hover:border-primary/30 active:scale-95 transition-all text-sm min-h-[44px]"
        aria-label="Select language"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className="text-lg">{localeFlags[locale]}</span>
        <span className="hidden sm:inline text-text-secondary">{localeNames[locale]}</span>
        <ChevronIcon className={`w-4 h-4 text-text-muted transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-52 py-2 bg-bg-card border border-border rounded-xl shadow-2xl z-[200]"
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
                className={`w-full flex items-center gap-3 px-4 py-3 text-left text-sm transition-colors min-h-[48px] ${
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
