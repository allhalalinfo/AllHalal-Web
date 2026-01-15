/**
 * Media Site Layout
 * Full layout for blog, guides, restaurants, real estate, etc.
 */

import { ReactNode } from 'react';
import { Inter } from "next/font/google";
import { SearchProvider } from "@/components/media/search";
import { getSearchIndex } from "@/lib/search";
import Header from "@/components/layout/Header";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  display: "swap",
});

export default function MediaLayout({ children }: { children: ReactNode }) {
  const searchIndex = getSearchIndex();
  
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-bg-primary text-text-primary antialiased">
        <SearchProvider searchIndex={searchIndex.items}>
          <Header />
          {children}
        </SearchProvider>
      </body>
    </html>
  );
}
