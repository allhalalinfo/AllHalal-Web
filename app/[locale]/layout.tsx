/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * LOCALE LAYOUT - allhalal.info Marketing Website
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * This layout wraps all localized pages.
 * It includes:
 * - NextIntlClientProvider for translations
 * - Global fonts (Inter)
 * - Smooth scroll provider (Lenis)
 * - Speed Insights for performance monitoring
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Analytics } from "@vercel/analytics/next";
import { locales, type Locale } from "@/i18n/config";
import "../globals.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { SpeedInsightsProvider } from "@/components/providers/SpeedInsightsProvider";
import Header from "@/components/layout/Header";
import StickyAppBanner from "@/components/ui/StickyAppBanner";
import { getOpenGraphLocale, SITE_URL } from "@/lib/seo/metadata";

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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const validLocale = locales.includes(locale as Locale) ? (locale as Locale) : locales[0];

  return {
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
      locale: getOpenGraphLocale(validLocale),
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
    alternates: {
      canonical: "./",
    },
  };
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

  return (
    <html lang={locale}>
      <body className="bg-bg-primary text-text-primary antialiased">
        <NextIntlClientProvider messages={messages}>
          <Header />
          <SmoothScrollProvider>
            {children}
            <StickyAppBanner />
          </SmoothScrollProvider>
        </NextIntlClientProvider>
        <SpeedInsightsProvider />
        <Analytics />
      </body>
    </html>
  );
}
