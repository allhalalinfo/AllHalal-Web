import Link from "next/link";
import { Metadata } from "next";
import AppPromoMini from "@/components/ui/AppPromoMini";

export const metadata: Metadata = {
  title: 'Halal Mortgage in the US: A Complete Guide | AllHalal',
  description: 'Learn how to get a halal mortgage in the US. Discover how Islamic mortgages work without Riba and explore top Sharia-compliant home financing providers.',
};

export default async function MortgagesPage(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  return (
    <div className="container py-32 max-w-4xl mx-auto min-h-screen">
      <Link href={`/${params.locale}/finance`} className="text-primary hover:underline mb-8 inline-block">&larr; Back to Finance</Link>
      <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">Guide to Halal Mortgages</h1>
      
      <div className="prose prose-lg dark:prose-invert max-w-none text-text-secondary">
        <p>Buying a home is one of the biggest financial decisions you will make. For Muslims, doing so without engaging in Riba (interest) is paramount. If you are looking for a <strong>halal mortgage in the US</strong>, Islamic home financing provides a Sharia-compliant alternative to conventional mortgages, allowing you to achieve homeownership while strictly adhering to your faith.</p>
        
        <h2 className="text-2xl font-bold text-text-primary mt-10 mb-4">How it works</h2>
        <p>Instead of lending you money and charging interest, Islamic financiers typically use models like:</p>
        <ul className="list-disc pl-6 mb-8 space-y-2">
          <li><strong>Murabaha (Cost-Plus):</strong> The financier buys the property and sells it to you at a profit margin, paid in installments.</li>
          <li><strong>Musharaka (Diminishing Partnership):</strong> You and the financier buy the property together. You gradually buy their shares over time while paying rent for the portion you do not own yet.</li>
          <li><strong>Ijara (Lease-to-own):</strong> The financier buys the home and leases it to you, with ownership transferring at the end of the term.</li>
        </ul>

        <h2 className="text-2xl font-bold text-text-primary mt-10 mb-4">Top Providers</h2>
        <div className="grid gap-6 mb-10">
          <div className="border border-border p-6 rounded-2xl bg-bg-card">
            <h3 className="text-xl font-bold text-text-primary mb-2">Manzil</h3>
            <p className="mb-4">Offers Murabaha and Musharaka financing. Certified by reputable Shariah boards.</p>
            <a href="https://www.manzil.us" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-semibold">Visit Manzil &rarr;</a>
          </div>
          <div className="border border-border p-6 rounded-2xl bg-bg-card">
            <h3 className="text-xl font-bold text-text-primary mb-2">Guidance Residential</h3>
            <p className="mb-4">One of the largest Islamic home financing providers in the US, offering Declining Balance Co-ownership programs.</p>
            <a href="https://www.guidanceresidential.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-semibold">Visit Guidance &rarr;</a>
          </div>
          <div className="border border-border p-6 rounded-2xl bg-bg-card">
            <h3 className="text-xl font-bold text-text-primary mb-2">UIF Corporation</h3>
            <p className="mb-4">Provides Murabaha and Musharaka financing options across many US states.</p>
            <a href="https://www.myuif.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-semibold">Visit UIF &rarr;</a>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-text-primary mt-10 mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4 mb-10">
          <details className="bg-bg-card border border-border p-4 rounded-xl cursor-pointer group">
            <summary className="font-bold text-text-primary outline-none">Are Islamic mortgages really interest-free?</summary>
            <p className="mt-3 text-text-secondary">Yes. Instead of lending money for interest, the institution buys the asset and sells/leases it to you. The profit they make is tied to a tangible asset (the house), which is permissible in Islam.</p>
          </details>
          <details className="bg-bg-card border border-border p-4 rounded-xl cursor-pointer group">
            <summary className="font-bold text-text-primary outline-none">Why are the rates similar to conventional banks?</summary>
            <p className="mt-3 text-text-secondary">Islamic banks must remain competitive in the same housing market. They often benchmark their profit rates against standard interest rates (like LIBOR or the Fed rate) to determine a fair market price for rent or markup. Benchmarking against an interest rate is widely accepted by Shariah boards, as long as the underlying contract mechanism is valid.</p>
          </details>
          <details className="bg-bg-card border border-border p-4 rounded-xl cursor-pointer group">
            <summary className="font-bold text-text-primary outline-none">Is a halal mortgage more expensive than a traditional one?</summary>
            <p className="mt-3 text-text-secondary">Generally, Islamic mortgages can be slightly more expensive due to higher administrative costs, legal complexities in setting up Sharia-compliant contracts, and less availability of secondary market funding compared to conventional loans. However, the gap is closing as the market grows.</p>
          </details>
          <details className="bg-bg-card border border-border p-4 rounded-xl cursor-pointer group">
            <summary className="font-bold text-text-primary outline-none">Can I refinance my conventional mortgage into an Islamic one?</summary>
            <p className="mt-3 text-text-secondary">Yes, many Islamic finance providers in the US offer refinancing options. You essentially sell your portion of the house to the Islamic financier, who then pays off your conventional interest-bearing loan, and you enter a new Sharia-compliant contract (like Musharaka or Ijara) with them.</p>
          </details>
        </div>

        <AppPromoMini />

        <div className="mt-16 pt-8 border-t border-border">
          <h3 className="font-bold text-lg mb-4">Continue Learning</h3>
          <div className="flex gap-4">
            <Link href={`/${params.locale}/finance/investing`} className="text-primary hover:underline">Halal Investing &rarr;</Link>
            <Link href={`/${params.locale}/finance/banks`} className="text-primary hover:underline">Halal Banks &rarr;</Link>
          </div>
        </div>
      </div>
    </div>
  );
}