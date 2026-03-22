"use client";

/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * HEADER COMPONENT - allhalal.info Navigation
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import { MAIN_NAV_ITEMS } from "@/config/navigation";

export default function Header() {
  const pathname = usePathname();
  const locale = useLocale();
  
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

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navItems = MAIN_NAV_ITEMS.filter((item) => item.enabled);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen(prev => !prev);
  const isActive = (href: string) => {
    const localizedHref = `/${locale}${href}`;
    return pathname === localizedHref || pathname.startsWith(`${localizedHref}/`);
  };

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-[100] transition-transform duration-300"
        style={{ transform: isHidden && !isMobileMenuOpen ? "translateY(-100%)" : "translateY(0)" }}
      >
        <div className="container pt-4">
          <nav
            className={`relative flex items-center justify-between gap-3 rounded-[1.75rem] border px-4 md:px-5 transition-all duration-300 ${
              isScrolled || isMobileMenuOpen
                ? "h-[4.5rem] border-[rgba(73,58,42,0.12)] bg-[linear-gradient(180deg,rgba(255,252,247,0.95),rgba(248,243,234,0.88))] backdrop-blur-2xl shadow-[0_18px_48px_rgba(43,34,24,0.12)]"
                : "h-[4.75rem] border-[rgba(73,58,42,0.09)] bg-[linear-gradient(180deg,rgba(255,253,248,0.8),rgba(247,241,232,0.64))] backdrop-blur-xl shadow-[0_14px_36px_rgba(43,34,24,0.08)]"
            }`}
          >
            <div className="pointer-events-none absolute inset-0 rounded-[1.75rem] bg-[linear-gradient(120deg,rgba(255,255,255,0.32),transparent_32%,transparent_68%,rgba(255,255,255,0.12))]" />

            <Link 
              href={`/${locale}`}
              onClick={closeMobileMenu}
              className="relative z-10 flex items-center gap-3 rounded-full px-1 py-1 text-text-primary transition-colors hover:text-primary"
            >
              <span className="relative inline-flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-transparent shadow-none">
                <Image
                  src="/branding/publicbrandingheader-logo.png"
                  alt="allhalal.info logo"
                  fill
                  sizes="44px"
                  className="object-contain"
                  priority
                />
              </span>
              <span className="min-w-0">
                <span className="block text-[1.05rem] font-bold tracking-tight leading-none">allhalal.info</span>
                <span className="hidden md:block mt-1 text-[0.68rem] font-semibold uppercase tracking-[0.26em] text-text-secondary/80">
                  Muslim portal
                </span>
              </span>
            </Link>

            <div className="relative z-10 hidden md:flex items-center rounded-full border border-[rgba(73,58,42,0.08)] bg-white/42 px-2 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.55)]">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={`/${locale}${item.href}`}
                  className={`relative rounded-full px-4 py-2.5 text-sm font-semibold transition-all duration-200 ${
                    isActive(item.href)
                      ? "bg-[#2E4B59] text-white shadow-[0_10px_20px_rgba(46,75,89,0.26)]"
                      : "text-text-secondary hover:bg-white/70 hover:text-text-primary"
                  }`}
                >
                  {item.label}
                </Link>
              ))} 
            </div>

            <div className="relative z-10 hidden md:flex items-center gap-3">
              <Link
                href={`/${locale}/app`}
                className="inline-flex items-center justify-center rounded-full bg-gradient-gold px-4 py-2.5 text-sm font-bold text-[#4A3319] shadow-[0_10px_22px_rgba(176,144,98,0.24)] transition-transform hover:-translate-y-0.5"
              >
                Open app
              </Link>
              <div className="rounded-full border border-[rgba(73,58,42,0.1)] bg-white/46 px-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.55)]">
                <LanguageSwitcher />
              </div>
            </div>

            <button
              onClick={toggleMobileMenu}
              className={`relative z-10 flex h-11 w-11 items-center justify-center rounded-full border transition-all md:hidden ${
                isMobileMenuOpen
                  ? "border-[rgba(73,58,42,0.12)] bg-white/80 shadow-[0_10px_22px_rgba(43,34,24,0.12)]"
                  : "border-[rgba(73,58,42,0.08)] bg-white/55 shadow-[0_8px_18px_rgba(43,34,24,0.08)]"
              }`}
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

      <div
        className={`fixed inset-0 z-[90] bg-[rgba(24,19,14,0.34)] backdrop-blur-md md:hidden transition-opacity duration-200 ${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <nav className="mx-4 mt-24 rounded-[2rem] border border-[rgba(73,58,42,0.12)] bg-[linear-gradient(180deg,rgba(255,252,247,0.98),rgba(245,239,230,0.96))] p-5 shadow-[0_22px_60px_rgba(37,29,20,0.2)]">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-[0.68rem] font-bold uppercase tracking-[0.28em] text-primary/80">Navigation</p>
              <p className="mt-2 text-xl font-display font-bold text-text-primary">Move through allhalal.info</p>
            </div>
            <div className="rounded-full border border-[rgba(73,58,42,0.1)] bg-white/60 px-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]">
              <LanguageSwitcher openUpward />
            </div>
          </div>

          <div className="grid gap-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={`/${locale}${item.href}`}
                onClick={closeMobileMenu}
                className={`rounded-[1.25rem] border px-4 py-4 transition-colors ${
                  isActive(item.href)
                    ? "border-[rgba(46,75,89,0.18)] bg-[#2E4B59] text-white shadow-[0_12px_24px_rgba(46,75,89,0.24)]"
                    : "border-[rgba(73,58,42,0.08)] bg-white/58 text-text-primary hover:bg-white"
                }`}
              >
                <div className="text-[0.68rem] font-bold uppercase tracking-[0.24em] opacity-60">Open</div>
                <div className="mt-2 text-lg font-semibold">{item.label}</div>
              </Link>
            ))}
          </div>

          <div className="mt-5 grid gap-3">
            <Link
              href={`/${locale}/app`}
              onClick={closeMobileMenu}
              className="inline-flex items-center justify-center rounded-[1.25rem] bg-gradient-gold px-5 py-4 text-base font-bold text-[#4A3319] shadow-[0_14px_28px_rgba(176,144,98,0.24)]"
            >
              Open app
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}
