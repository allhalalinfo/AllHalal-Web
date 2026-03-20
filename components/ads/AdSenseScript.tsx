"use client";

import { useEffect } from "react";

/**
 * Loads AdSense without Next.js <Script> so the tag has no data-nscript attribute.
 * Google's adsbygoogle.js warns when data-nscript is present (Next injects it).
 */
export default function AdSenseScript({ clientId }: { clientId: string }) {
  useEffect(() => {
    const src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(clientId)}`;
    if (document.querySelector(`script[src^="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]`)) {
      return;
    }
    const script = document.createElement("script");
    script.async = true;
    script.crossOrigin = "anonymous";
    script.src = src;
    document.head.appendChild(script);
  }, [clientId]);

  return null;
}
