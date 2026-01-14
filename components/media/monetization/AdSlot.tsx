'use client';

/**
 * Ad Slot Component
 * Lazy-loaded, performance-conscious ad container
 */

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { trackAdImpression } from '@/lib/analytics/events';

interface AdSlotProps {
  /**
   * Unique slot ID
   */
  slotId: string;
  
  /**
   * Ad position
   */
  position: 'in-article' | 'sidebar' | 'in-feed' | 'sticky-bottom' | 'footer';
  
  /**
   * Ad size
   */
  size?: {
    width: number;
    height: number;
  };
  
  /**
   * Enable lazy loading (default: true)
   */
  lazyLoad?: boolean;
  
  /**
   * Minimum viewport width to show ad (responsive)
   */
  minViewportWidth?: number;
  
  /**
   * Custom class names
   */
  className?: string;
}

export function AdSlot({
  slotId,
  position,
  size = { width: 728, height: 90 },
  lazyLoad = true,
  minViewportWidth,
  className = ''
}: AdSlotProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const adRef = useRef<HTMLDivElement>(null);
  
  // Intersection Observer for lazy loading
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
    skip: !lazyLoad
  });
  
  // Check if ads are enabled via env
  const adsEnabled = process.env.NEXT_PUBLIC_ADS_ENABLED === 'true';
  
  // Check viewport width
  useEffect(() => {
    if (!minViewportWidth) {
      setIsVisible(true);
      return;
    }
    
    const checkViewport = () => {
      setIsVisible(window.innerWidth >= minViewportWidth);
    };
    
    checkViewport();
    window.addEventListener('resize', checkViewport);
    
    return () => window.removeEventListener('resize', checkViewport);
  }, [minViewportWidth]);
  
  // Load ad when in view
  useEffect(() => {
    if (!adsEnabled) return;
    if (!isVisible) return;
    if (lazyLoad && !inView) return;
    if (isLoaded) return;
    
    // Placeholder for actual ad loading logic
    // In production, you would integrate with Google AdSense, Ad Manager, etc.
    const loadAd = async () => {
      try {
        // Simulate ad loading
        // In real implementation, call your ad provider's API
        // Example: window.googletag?.pubads()?.display(slotId);
        
        // Track impression
        trackAdImpression(slotId, position);
        
        setIsLoaded(true);
      } catch (error) {
        console.error(`[AdSlot] Failed to load ad ${slotId}:`, error);
      }
    };
    
    // Small delay to ensure layout stability
    const timer = setTimeout(() => {
      loadAd();
    }, 100);
    
    return () => clearTimeout(timer);
  }, [adsEnabled, isVisible, inView, lazyLoad, isLoaded, slotId, position]);
  
  // Don't render if ads disabled
  if (!adsEnabled) {
    return null;
  }
  
  // Don't render if viewport too small
  if (!isVisible) {
    return null;
  }
  
  // Position-specific styles
  const positionStyles = {
    'in-article': 'my-8 mx-auto',
    'sidebar': 'sticky top-4',
    'in-feed': 'my-6',
    'sticky-bottom': 'fixed bottom-0 left-0 right-0 z-40 shadow-lg',
    'footer': 'mt-8'
  };
  
  return (
    <div
      ref={inViewRef}
      className={`ad-container ${positionStyles[position]} ${className}`}
      data-ad-slot={slotId}
      data-ad-position={position}
    >
      {/* Ad Label */}
      <div className="text-xs text-gray-400 text-center mb-2">
        Advertisement
      </div>
      
      {/* Ad Content */}
      <div
        ref={adRef}
        className="ad-content flex items-center justify-center bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded"
        style={{
          minWidth: size.width,
          minHeight: size.height,
          maxWidth: '100%'
        }}
      >
        {!isLoaded ? (
          // Loading placeholder
          <div className="flex items-center justify-center w-full h-full">
            <div className="text-gray-400 text-sm">Loading ad...</div>
          </div>
        ) : (
          // Ad will be rendered here by the ad provider
          <div id={`ad-${slotId}`} className="w-full h-full" />
        )}
      </div>
      
      {/* Sticky bottom close button */}
      {position === 'sticky-bottom' && isLoaded && (
        <button
          onClick={() => {
            if (adRef.current?.parentElement) {
              adRef.current.parentElement.style.display = 'none';
            }
          }}
          className="absolute top-2 right-2 p-1 bg-white dark:bg-gray-800 rounded-full shadow hover:bg-gray-100 dark:hover:bg-gray-700"
          aria-label="Close ad"
        >
          <svg
            className="w-4 h-4 text-gray-600 dark:text-gray-400"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}

/**
 * Ad-Free Zone Wrapper
 * Prevents ads from rendering within this component
 */
interface AdFreeZoneProps {
  children: React.ReactNode;
}

export function AdFreeZone({ children }: AdFreeZoneProps) {
  return (
    <div data-ad-free-zone="true">
      {children}
    </div>
  );
}
