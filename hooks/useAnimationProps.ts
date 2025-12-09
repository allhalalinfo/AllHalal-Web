"use client";

/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * useAnimationProps - DISABLE animations on mobile to prevent flickering
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * Problem: Framer Motion causes flickering on mobile because:
 * - initial={{ opacity: 0 }} makes elements invisible
 * - Then animate={{ opacity: 1 }} triggers
 * - On mobile, this can trigger multiple times causing flashes
 * 
 * Solution: On mobile, return static props (no animation)
 * On desktop, return normal animation props
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { useEffect, useState } from "react";

// Check if we're on mobile (client-side only)
function checkIsMobile(): boolean {
  if (typeof window === "undefined") return false;
  return window.innerWidth < 768 || window.matchMedia("(pointer: coarse)").matches;
}

/**
 * Hook to get mobile-safe animation props
 * Returns empty objects on mobile to disable animations completely
 */
export function useAnimationProps() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Initial check
    setIsMobile(checkIsMobile());

    // Listen for resize
    const handleResize = () => setIsMobile(checkIsMobile());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // On mobile: no animations (everything visible immediately)
  // On desktop: normal animation props
  return {
    isMobile,
    // For motion.div - returns either animation props or static
    fadeInUp: isMobile
      ? { initial: undefined, animate: undefined, transition: undefined }
      : {
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, ease: "easeOut" },
        },
    fadeIn: isMobile
      ? { initial: undefined, animate: undefined, transition: undefined }
      : {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { duration: 0.5 },
        },
    // Stagger container - on mobile, no stagger
    staggerContainer: isMobile
      ? { variants: undefined, initial: undefined, animate: undefined }
      : {
          variants: {
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1, delayChildren: 0.2 },
            },
          },
          initial: "hidden",
          animate: "visible",
        },
    // Individual stagger item
    staggerItem: isMobile
      ? { variants: undefined }
      : {
          variants: {
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
          },
        },
  };
}

/**
 * Simple hook that just returns if we're on mobile
 */
export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(checkIsMobile());
    const handleResize = () => setIsMobile(checkIsMobile());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
}
