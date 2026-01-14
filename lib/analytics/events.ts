/**
 * Analytics Event Helpers
 * Type-safe event tracking functions
 */

import { analytics } from './index';
import type { AnalyticsEvent } from '@/data/types';

/**
 * Search Events
 */
export function trackSearchOpen(): void {
  analytics.track({ type: 'search_open' });
}

export function trackSearchQuery(query: string, resultsCount: number): void {
  analytics.track({
    type: 'search_query',
    query,
    resultsCount
  });
}

export function trackSearchResultClick(resultType: string, resultSlug: string): void {
  analytics.track({
    type: 'search_result_click',
    resultType,
    resultSlug
  });
}

/**
 * Navigation Events
 */
export function trackRelatedContentClick(from: string, to: string): void {
  analytics.track({
    type: 'click_related_content',
    from,
    to
  });
}

/**
 * Newsletter Events
 */
export function trackNewsletterSignup(location: string): void {
  analytics.track({
    type: 'newsletter_signup',
    location // e.g., "article-bottom", "sidebar", "modal"
  });
}

/**
 * Ad Events
 */
export function trackAdImpression(slotId: string, position: string): void {
  analytics.track({
    type: 'ad_impression',
    slotId,
    position // e.g., "in-article", "sidebar", "footer"
  });
}

export function trackAdClick(slotId: string, position: string): void {
  analytics.track({
    type: 'ad_click',
    slotId,
    position
  });
}

/**
 * Outbound Link Events
 */
export function trackOutboundClick(url: string, from: string): void {
  analytics.track({
    type: 'outbound_click',
    url,
    from // page where click happened
  });
}

/**
 * Feedback Events
 */
export function trackHelpfulFeedback(page: string, helpful: boolean): void {
  analytics.track({
    type: 'helpful_feedback',
    page,
    helpful
  });
}

/**
 * Tool Interaction Events
 */
export function trackToolInteraction(tool: string, action: string): void {
  analytics.track({
    type: 'tool_interaction',
    tool, // e.g., "ingredient-checker", "travel-checklist"
    action // e.g., "search", "check", "toggle"
  });
}

/**
 * Page View Events (automatic, called in layout)
 */
export function trackPageView(path: string, title: string): void {
  // Most analytics providers track page views automatically
  // This is a manual fallback if needed
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: path,
      page_title: title
    });
  }
}

/**
 * Custom Event (for one-off tracking)
 */
export function trackCustomEvent(
  type: string,
  properties?: Record<string, any>
): void {
  analytics.track({
    type: type as any,
    ...properties
  });
}
