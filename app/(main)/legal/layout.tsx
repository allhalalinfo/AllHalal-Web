/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * LEGAL PAGES LAYOUT
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * Shared layout for all legal documents.
 * Features:
 * - Clean, readable typography
 * - Consistent header/footer
 * - Proper max-width for readability
 * - Good vertical rhythm
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import { generateMetadata as genMeta } from "@/lib/seo/metadata";

export const metadata: Metadata = genMeta({
  title: "Legal Centre",
  description:
    "Privacy policy, terms of service and disclaimer for allhalal.info — how we handle your data and the limits of our halal guidance.",
  path: "/legal",
  keywords: ["allhalal legal", "privacy policy", "terms of service", "disclaimer"],
});

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="min-h-screen bg-bg-primary">
        {/* Spacer for fixed header */}
        <div className="h-20" />
        
        {/* Legal content container */}
        <div className="section">
          <div className="container">
            <div className="max-w-prose mx-auto">
              {children}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
