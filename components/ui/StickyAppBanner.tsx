"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function StickyAppBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check if user previously dismissed it
    const dismissed = localStorage.getItem("appBannerDismissed");
    if (dismissed) {
      setIsDismissed(true);
      return;
    }

    // Show banner after a short delay so it doesn't block immediate initial render
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible || isDismissed) return null;

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    localStorage.setItem("appBannerDismissed", "true");
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[999] p-4 md:hidden">
      <div className="bg-bg-elevated/95 backdrop-blur-md border border-border shadow-card-hover rounded-2xl p-3 flex items-center justify-between gap-3 animate-slide-in-up">
        
        {/* Close Button */}
        <button 
          onClick={handleDismiss}
          className="p-1.5 text-text-muted hover:text-text-primary transition-colors shrink-0"
          aria-label="Close"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Icon & Text */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
            <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm14 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
            </svg>
          </div>
          <div className="truncate">
            <p className="text-sm font-bold text-text-primary truncate">AllHalal - Food Scanner</p>
            <p className="text-xs text-text-secondary truncate">Scan 2M+ products</p>
          </div>
        </div>

        {/* Action Button */}
        <a 
          href="https://apps.apple.com/us/app/allhalal-info-food-scanner/id6756242265" 
          target="_blank" 
          rel="noopener noreferrer"
          className="shrink-0 bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-primary-dark transition-colors"
        >
          OPEN
        </a>
      </div>
    </div>
  );
}