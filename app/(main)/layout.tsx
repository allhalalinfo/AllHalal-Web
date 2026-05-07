import type { Metadata, Viewport } from "next";
import AdSenseScript from "@/components/ads/AdSenseScript";
import { Analytics } from "@vercel/analytics/next";
import { SITE_URL } from "@/lib/seo/metadata";
import "../css/critical.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { SpeedInsightsProvider } from "@/components/providers/SpeedInsightsProvider";
import Header from "@/components/layout/Header";
import StickyAppBanner from "@/components/ui/StickyAppBanner";
import ThemeManager from "@/components/providers/ThemeManager";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0A0A0A",
};

const ADSENSE_CLIENT_ID = "ca-pub-5317347727083675";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "allhalal.info - The Most Advanced Halal Scanner in the World",
  description:
    "Scan, verify, and live according to your values with confidence. AI-powered halal verification for over 2 million products worldwide.",
  keywords: [
    "halal",
    "halal scanner",
    "halal food",
    "halal verification",
    "muslim app",
    "halal products",
    "ingredient scanner",
  ],
  authors: [{ name: "allhalal.info" }],
  creator: "allhalal.info",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "./",
    siteName: "allhalal.info",
    title: "allhalal.info - The Most Advanced Halal Scanner in the World",
    description:
      "Scan, verify, and live according to your values with confidence. AI-powered halal verification for over 2 million products worldwide.",
  },
  twitter: {
    card: "summary_large_image",
    title: "allhalal.info - The Most Advanced Halal Scanner in the World",
    description: "AI-powered halal verification for over 2 million products worldwide.",
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    "google-adsense-account": ADSENSE_CLIENT_ID,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-bg-primary text-text-primary antialiased" suppressHydrationWarning>
        <AdSenseScript clientId={ADSENSE_CLIENT_ID} />
        <ThemeManager />
        <HeaderWrapper />
        <SmoothScrollProvider>
          {children}
          <StickyAppBannerWrapper />
        </SmoothScrollProvider>
        <SpeedInsightsProvider />
        <Analytics />
      </body>
    </html>
  );
}

// Hydration-safe client components (lazy loaded)
import dynamic from "next/dynamic";

const HeaderWrapper = dynamic(() => import("@/components/layout/HeaderWrapper"));

const StickyAppBannerWrapper = dynamic(() => import("@/components/layout/StickyAppBannerWrapper"));
