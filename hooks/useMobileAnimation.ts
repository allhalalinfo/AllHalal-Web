"use client";

import { useEffect, useRef } from "react";

/**
 * Hook to trigger CSS animations on mobile when element enters viewport
 * Uses IntersectionObserver which is much lighter than scroll listeners
 */
export function useMobileAnimation() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    // Only run on mobile/tablet
    if (window.matchMedia("(min-width: 768px)").matches) return;

    const element = ref.current;
    if (!element) return;

    // Add initial hidden class
    element.classList.add("mobile-animate-hidden");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add animation class
            entry.target.classList.remove("mobile-animate-hidden");
            entry.target.classList.add("mobile-fade-in-up");
            // Stop observing once animated
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% visible
        rootMargin: "50px", // Start slightly before element enters view
      }
    );

    observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  return ref;
}
