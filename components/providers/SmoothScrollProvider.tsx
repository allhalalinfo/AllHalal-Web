"use client";

/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * SMOOTH SCROLL PROVIDER - Lenis Integration (Mobile Optimized)
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * Optimizations for mobile:
 * - Disable smooth scroll on mobile/touch devices
 * - Reduced touchMultiplier
 * - Better performance settings
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { useEffect, useRef, ReactNode } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface SmoothScrollProviderProps {
  children: ReactNode;
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Check if device is touch-only (mobile/tablet)
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    const isMobile = window.innerWidth < 768;
    
    // Disable smooth scroll on mobile for better performance
    if (isTouchDevice || isMobile) {
      // Just update ScrollTrigger on native scroll
      ScrollTrigger.defaults({
        scroller: window,
      });
      ScrollTrigger.refresh();
      return;
    }

    // Initialize Lenis smooth scroll (desktop only)
    const lenis = new Lenis({
      duration: 1.0,              // Slightly faster
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.8,       // Reduced for less aggressive scroll
      touchMultiplier: 1,         // Reduced from 2
    });

    lenisRef.current = lenis;

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Add Lenis to GSAP ticker
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Handle resize - disable smooth scroll if window becomes mobile
    const handleResize = () => {
      if (window.innerWidth < 768) {
        lenis.destroy();
        lenisRef.current = null;
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return <>{children}</>;
}

// Export hook to access Lenis instance
export function useLenis() {
  return useRef<Lenis | null>(null);
}
