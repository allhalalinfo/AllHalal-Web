'use client';

import { SpeedInsights } from '@vercel/speed-insights/next';

/**
 * Speed Insights Provider
 * 
 * Wraps Vercel Speed Insights component for performance monitoring.
 * This is a client component that tracks Core Web Vitals and other performance metrics.
 */
export function SpeedInsightsProvider() {
  return <SpeedInsights />;
}
