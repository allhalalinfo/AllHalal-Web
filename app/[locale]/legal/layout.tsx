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

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
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

