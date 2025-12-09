"use client";

/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * SMOOTH SCROLL PROVIDER - Lenis Integration
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * This provider initializes Lenis for smooth scrolling experience.
 * It also integrates with GSAP ScrollTrigger for scroll-based animations.
 * 
 * To disable smooth scroll: comment out the useEffect contents
 * To adjust smoothness: modify the 'lerp' and 'duration' values
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
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,           // Scroll animation duration
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing function
      orientation: "vertical", // Scroll orientation
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Add Lenis to GSAP ticker for smooth animation frame sync
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // Disable GSAP's default lag smoothing for better Lenis integration
    gsap.ticker.lagSmoothing(0);

    // Cleanup on unmount
    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return <>{children}</>;
}

// Export hook to access Lenis instance from other components
export function useLenis() {
  return useRef<Lenis | null>(null);
}

