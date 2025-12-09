"use client";

/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * SMOOTH SCROLL PROVIDER - Desktop Only
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * COMPLETELY DISABLED on mobile and touch devices for performance.
 * Only activates on desktop with mouse input.
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { useEffect, ReactNode } from "react";

interface SmoothScrollProviderProps {
  children: ReactNode;
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  useEffect(() => {
    // Only initialize on desktop with mouse (not touch)
    const isDesktop = window.matchMedia("(min-width: 1024px) and (pointer: fine)").matches;
    
    if (!isDesktop) {
      // Mobile/tablet - use native scroll, no libraries
      return;
    }

    // Desktop - dynamically import Lenis only when needed
    let lenis: any = null;
    let animationId: number;

    const initLenis = async () => {
      try {
        const Lenis = (await import("lenis")).default;
        
        lenis = new Lenis({
          duration: 1.0,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: "vertical",
          smoothWheel: true,
          wheelMultiplier: 0.8,
        });

        const raf = (time: number) => {
          lenis?.raf(time);
          animationId = requestAnimationFrame(raf);
        };
        
        animationId = requestAnimationFrame(raf);
      } catch (e) {
        console.warn("Lenis not available, using native scroll");
      }
    };

    initLenis();

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
      lenis?.destroy();
    };
  }, []);

  return <>{children}</>;
}
