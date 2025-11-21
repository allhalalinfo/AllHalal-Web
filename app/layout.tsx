import type { Metadata } from "next";
import { Inter, Amiri, Crimson_Pro } from "next/font/google";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
});

const amiri = Amiri({
  subsets: ["latin", "arabic"],
  weight: ["400", "700"],
  variable: "--font-amiri",
});

const crimsonPro = Crimson_Pro({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-crimson",
});

export const metadata: Metadata = {
  title: "AllHalal - The Most Advanced Halal Scanner in the World",
  description: "AllHalal - The most advanced halal scanner. 2,000,000+ verified products. Expert classification. Trusted globally.",
  keywords: ["halal scanner", "halal verification", "islamic app", "halal food", "halal cosmetics"],
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr" className={`${inter.variable} ${amiri.variable} ${crimsonPro.variable}`}>
      <body>
        {children}
        <Script src="/assets/js/counter.js" strategy="afterInteractive" />
        <Script src="/assets/js/languages-carousel.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}

