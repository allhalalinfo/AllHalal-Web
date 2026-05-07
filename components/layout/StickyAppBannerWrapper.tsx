'use client';

import { useState, useEffect } from 'react';
import StickyAppBanner from '../ui/StickyAppBanner';

/**
 * Hydration-safe Sticky App Banner wrapper
 * Prevents hydration mismatch by rendering only on client side
 */
export default function StickyAppBannerWrapper() {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setShouldRender(params.get('app') !== 'true');
  }, []);

  if (!shouldRender) {
    return null;
  }

  return <StickyAppBanner />;
}
