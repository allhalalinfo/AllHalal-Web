"use client";

/**
 * LANGUAGE SWITCHER - Fixed for all devices
 * - English switching works correctly
 * - Mobile scroll works smoothly
 * - No flickering
 */

import { useState, useRef, useEffect, useCallback } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { locales, localeNames, localeFlags, defaultLocale, type Locale } from "@/i18n/config";

interface LanguageSwitcherProps {
  openUpward?: boolean;
}

export default function LanguageSwitcher({ openUpward = false }: LanguageSwitcherProps) {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback((event: MouseEvent | TouchEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen, handleClickOutside]);

  const handleLocaleChange = (newLocale: Locale) => {
    setIsOpen(false);
    
    // Don't do anything if already on this locale
    if (locale === newLocale) {
      return;
    }
    
    // Remove current locale from pathname
    let pathWithoutLocale = pathname;
    
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
      newPath = pathWithoutLocale || "/";
    } else {
      newPath = `/${newLocale}${pathWithoutLocale === "/" ? "" : pathWithoutLocale}`;
    }
    
    // Force navigation (works for all locales including default)
    router.push(newPath);
    router.refresh();
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(prev => !prev)}
        type="button"
        className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-bg-tertiary border border-border hover:border-primary/30 text-sm min-h-[44px] transition-none"
        aria-label="Select language"
        aria-expanded={isOpen}
      >
        <span className="text-lg">{localeFlags[locale]}</span>
        <span className="text-text-secondary">{localeNames[locale]}</span>
        <svg 
          className={`w-4 h-4 text-text-muted ${isOpen ? "rotate-180" : ""}`}
          style={{ transition: "transform 0.15s ease" }}
          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {/* Dropdown Menu - Fixed scroll and visibility */}
      {isOpen && (
        <div
          className={`absolute left-1/2 -translate-x-1/2 w-56 py-2 bg-bg-card border border-border rounded-xl shadow-2xl z-[200] ${
            openUpward ? "bottom-full mb-2" : "top-full mt-2"
          }`}
          style={{ 
            maxHeight: "min(320px, 50vh)", 
            overflowY: "auto",
            WebkitOverflowScrolling: "touch",
            overscrollBehavior: "contain"
          }}
        >
          {locales.map((loc) => (
            <button
              key={loc}
              onClick={() => handleLocaleChange(loc)}
              type="button"
              className={`w-full flex items-center gap-3 px-4 py-3 text-left text-sm ${
                locale === loc
                  ? "bg-primary/10 text-primary"
                  : "text-text-secondary hover:bg-bg-tertiary hover:text-text-primary"
              }`}
              style={{ transition: "none" }}
            >
              <span className="text-lg">{localeFlags[loc]}</span>
              <span className="flex-1">{localeNames[loc]}</span>
              {locale === loc && (
                <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
