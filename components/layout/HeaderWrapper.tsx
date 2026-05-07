'use client';

import { useState, useEffect } from 'react';
import Header from './Header';

/**
 * Hydration-safe Header wrapper
 * Prevents hydration mismatch by rendering only on client side
 */
export default function HeaderWrapper() {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setShouldRender(params.get('app') !== 'true');
  }, []);

  if (!shouldRender) {
    return null;
  }

  return <Header />;
}
