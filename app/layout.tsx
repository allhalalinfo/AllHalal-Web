/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * ROOT LAYOUT - allhalal.info
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * This is the root layout that wraps all pages.
 * It includes the Google AdSense verification meta tag in generateMetadata.
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import type { Metadata } from "next";

const ADSENSE_CLIENT_ID = "ca-pub-5317347727083675";

export const metadata: Metadata = {
  other: {
    "google-adsense-account": ADSENSE_CLIENT_ID,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
