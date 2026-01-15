/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * LOCALE LAYOUT - AllHalal Marketing Website
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * This layout wraps all localized pages.
 * It includes:
 * - NextIntlClientProvider for translations
 * - Global fonts (Inter)
 * - Smooth scroll provider (Lenis)
 * - Noise overlay
 * - Speed Insights for performance monitoring
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { locales, type Locale } from "@/i18n/config";
import "../globals.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { SpeedInsightsProvider } from "@/components/providers/SpeedInsightsProvider";
import { SearchProvider } from "@/components/media/search";
import { getSearchIndex } from "@/lib/search";
import Noise from "@/components/ui/Noise";
import Header from "@/components/layout/Header";

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

// Generate static params for all locales
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;
  
  // Validate locale
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  // Get messages for the locale
  const messages = await getMessages();
  
  // Get search index
  const searchIndex = getSearchIndex();

  return (
    <html lang={locale} className={inter.variable}>
      <body className="bg-bg-primary text-text-primary antialiased">
        <NextIntlClientProvider messages={messages}>
          <SearchProvider searchIndex={searchIndex.items}>
            <Noise />
            <Header />
            <SmoothScrollProvider>
              {children}
            </SmoothScrollProvider>
          </SearchProvider>
        </NextIntlClientProvider>
        <SpeedInsightsProvider />
      </body>
    </html>
  );
}
