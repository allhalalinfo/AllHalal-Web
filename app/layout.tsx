/**
 * Root layout - Required by Next.js
 * Must have <html> and <body> tags
 */

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AllHalal - The Most Advanced Halal Scanner in the World",
  description: "Scan, verify, and live according to your values with confidence. AI-powered halal verification for over 2 million products worldwide.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
