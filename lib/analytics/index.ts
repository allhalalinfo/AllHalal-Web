/**
 * Analytics Module
 * Provider-agnostic analytics tracking
 */

import type { AnalyticsEvent } from '@/data/types';

// Analytics provider type
type AnalyticsProvider = 'google' | 'plausible' | 'mixpanel' | 'custom';

interface AnalyticsConfig {
  provider: AnalyticsProvider;
  enabled: boolean;
  debug?: boolean;
}

class Analytics {
  private config: AnalyticsConfig;
  private queue: AnalyticsEvent[] = [];

  constructor(config: AnalyticsConfig) {
    this.config = config;
  }

  /**
   * Track an event
   */
  track(event: AnalyticsEvent): void {
    if (!this.config.enabled) {
      if (this.config.debug) {
        console.log('[Analytics] Disabled, event not sent:', event);
      }
      return;
    }

    if (this.config.debug) {
      console.log('[Analytics] Track event:', event);
    }

    // Queue event if provider not ready
    if (!this.isReady()) {
      this.queue.push(event);
      return;
    }

    // Send to provider
    this.sendToProvider(event);
  }

  /**
   * Check if analytics provider is ready
   */
  private isReady(): boolean {
    if (typeof window === 'undefined') return false;

    switch (this.config.provider) {
      case 'google':
        return typeof window.gtag !== 'undefined';
      case 'plausible':
        return typeof window.plausible !== 'undefined';
      case 'mixpanel':
        return typeof window.mixpanel !== 'undefined';
      default:
        return true;
    }
  }

  /**
   * Send event to analytics provider
   */
  private sendToProvider(event: AnalyticsEvent): void {
    try {
      switch (this.config.provider) {
        case 'google':
          this.sendToGoogle(event);
          break;
        case 'plausible':
          this.sendToPlausible(event);
          break;
        case 'mixpanel':
          this.sendToMixpanel(event);
          break;
        default:
          if (this.config.debug) {
            console.log('[Analytics] Custom provider, implement sendToProvider');
          }
      }
    } catch (error) {
      console.error('[Analytics] Error sending event:', error);
    }
  }

  /**
   * Send to Google Analytics (gtag)
   */
  private sendToGoogle(event: AnalyticsEvent): void {
    if (typeof window.gtag === 'undefined') return;

    const eventName = event.type;
    const eventParams: Record<string, any> = { ...event };
    delete eventParams.type;

    window.gtag('event', eventName, eventParams);
  }

  /**
   * Send to Plausible Analytics
   */
  private sendToPlausible(event: AnalyticsEvent): void {
    if (typeof window.plausible === 'undefined') return;

    const eventName = event.type;
    const props: Record<string, any> = { ...event };
    delete props.type;

    window.plausible(eventName, { props });
  }

  /**
   * Send to Mixpanel
   */
  private sendToMixpanel(event: AnalyticsEvent): void {
    if (typeof window.mixpanel === 'undefined') return;

    const eventName = event.type;
    const properties: Record<string, any> = { ...event };
    delete properties.type;

    window.mixpanel.track(eventName, properties);
  }

  /**
   * Flush queued events
   */
  flush(): void {
    if (!this.isReady()) return;

    while (this.queue.length > 0) {
      const event = this.queue.shift();
      if (event) {
        this.sendToProvider(event);
      }
    }
  }

  /**
   * Initialize analytics (call after provider script loads)
   */
  init(): void {
    if (this.config.debug) {
      console.log('[Analytics] Initialized with provider:', this.config.provider);
    }
    this.flush();
  }
}

// Default configuration
const defaultConfig: AnalyticsConfig = {
  provider: (process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER as AnalyticsProvider) || 'google',
  enabled: process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === 'true',
  debug: process.env.NODE_ENV === 'development'
};

// Singleton instance
export const analytics = new Analytics(defaultConfig);

// Helper functions
export function initAnalytics() {
  analytics.init();
}

export function trackPageView(path: string, title: string): void {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: path,
      page_title: title
    });
  }
}

export function trackEvent(type: string, properties?: Record<string, any>): void {
  analytics.track({
    type: type as any,
    ...properties
  });
}

// Type augmentation for window
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    plausible?: (eventName: string, options?: { props?: Record<string, any> }) => void;
    mixpanel?: {
      track: (eventName: string, properties?: Record<string, any>) => void;
    };
  }
}

// Export for testing
export { Analytics };
export type { AnalyticsEvent };