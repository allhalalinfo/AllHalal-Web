/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * ROOT LAYOUT - AllHalal Marketing Website
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * This is the root layout that wraps all pages.
 * It includes:
 * - Global fonts (Inter)
 * - Smooth scroll provider (Lenis)
 * - Global styles
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import Noise from "@/components/ui/Noise";

// Inter font with all weights
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AllHalal - The Most Advanced Halal Scanner in the World",
  description: "Scan, verify, and live according to your values with confidence. AI-powered halal verification for over 2 million products worldwide.",
  keywords: ["halal", "halal scanner", "halal food", "halal verification", "muslim app", "halal products", "ingredient scanner"],
  authors: [{ name: "AllHalal" }],
  creator: "AllHalal",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://allhalal.info",
    siteName: "AllHalal",
    title: "AllHalal - The Most Advanced Halal Scanner in the World",
    description: "Scan, verify, and live according to your values with confidence. AI-powered halal verification for over 2 million products worldwide.",
  },
  twitter: {
    card: "summary_large_image",
    title: "AllHalal - The Most Advanced Halal Scanner in the World",
    description: "AI-powered halal verification for over 2 million products worldwide.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0A0A0A",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-bg-primary text-text-primary antialiased">
        <Noise />
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
