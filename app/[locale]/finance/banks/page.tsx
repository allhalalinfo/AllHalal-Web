import Link from "next/link";
import { Metadata } from "next";
import AppPromoMini from "@/components/ui/AppPromoMini";
import FAQSchema from "@/components/seo/FAQSchema";

export const metadata: Metadata = {
  title: 'Islamic Banks in America | AllHalal Finance Guide',
  description: 'Discover the top Islamic banks in America, credit unions, and Sharia-compliant financial institutions operating without Riba in the USA.',
};

export default async function BanksPage(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  
  const faqs = [
    {
      question: "Can I open a checking account at a normal bank?",
      answer: "Yes, a standard checking account that does not pay interest is permissible. If you use a savings account that automatically accrues interest, you must give the interest money away to charity (without expecting reward) to purify your wealth."
    },
    {
      question: "Are credit cards halal?",
      answer: "Credit cards themselves are tools. If you pay your balance in full every month and never accrue interest, many scholars permit their use. However, revolving balances and paying interest is strictly haram."
    },
    {
      question: "Do Islamic banks charge late fees?",
      answer: "Islamic banks cannot charge late fees as a profit-making mechanism, as this resembles Riba. Some may charge a fixed administrative penalty for late payments, but this money is typically donated to charity, not kept as profit."
    },
    {
      question: "Is my money insured in an Islamic bank in the US?",
      answer: "Yes, if you use an \"Islamic Window\" at a traditional bank or a registered credit union (like Devon Bank), your deposits are typically FDIC or NCUA insured up to standard limits, just like any other American bank."
    }
  ];

  return (
    <div className="container py-32 max-w-4xl mx-auto min-h-screen">
      <FAQSchema faqs={faqs} />
      <Link href={`/${params.locale}/finance`} className="text-primary hover:underline mb-8 inline-block">&larr; Back to Finance</Link>
      <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">Halal Banking</h1>
      
      <div className="prose prose-lg dark:prose-invert max-w-none text-text-secondary">
        <p>Finding a full-service <strong>Islamic bank in America</strong> can be challenging, but the landscape is growing. Islamic banks and credit unions operate strictly without dealing in interest (Riba). Instead of lending and borrowing for interest, they use profit-sharing, asset-backing, and fee-based models for their services.</p>
        
        <h2 className="text-2xl font-bold text-text-primary mt-10 mb-6">Institutions</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-border">
                <th className="py-4 font-bold text-text-primary">Institution</th>
                <th className="py-4 font-bold text-text-primary">Region</th>
                <th className="py-4 font-bold text-text-primary">Website</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="py-4 text-text-secondary">University Islamic Financial</td>
                <td className="py-4 text-text-secondary">USA (Various States)</td>
                <td className="py-4"><a href="https://www.myuif.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">myuif.com</a></td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-4 text-text-secondary">Devon Bank</td>
                <td className="py-4 text-text-secondary">USA (Chicago area + online)</td>
                <td className="py-4"><a href="https://www.devonbank.com/islamic-finance/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">devonbank.com</a></td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-4 text-text-secondary">Ameen Housing Co-op</td>
                <td className="py-4 text-text-secondary">USA (California)</td>
                <td className="py-4"><a href="https://www.ameenhousing.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">ameenhousing.com</a></td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-4 text-text-secondary">LARIBA</td>
                <td className="py-4 text-text-secondary">USA (Nationwide)</td>
                <td className="py-4"><a href="https://www.lariba.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">lariba.com</a></td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-bold text-text-primary mt-12 mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4 mb-10">
          <details className="bg-bg-card border border-border p-4 rounded-xl cursor-pointer group">
            <summary className="font-bold text-text-primary outline-none">Can I open a checking account at a normal bank?</summary>
            <p className="mt-3 text-text-secondary">Yes, a standard checking account that does not pay interest is permissible. If you use a savings account that automatically accrues interest, you must give the interest money away to charity (without expecting reward) to purify your wealth.</p>
          </details>
          <details className="bg-bg-card border border-border p-4 rounded-xl cursor-pointer group">
            <summary className="font-bold text-text-primary outline-none">Are credit cards halal?</summary>
            <p className="mt-3 text-text-secondary">Credit cards themselves are tools. If you pay your balance in full every month and never accrue interest, many scholars permit their use. However, revolving balances and paying interest is strictly haram.</p>
          </details>
          <details className="bg-bg-card border border-border p-4 rounded-xl cursor-pointer group">
            <summary className="font-bold text-text-primary outline-none">Do Islamic banks charge late fees?</summary>
            <p className="mt-3 text-text-secondary">Islamic banks cannot charge late fees as a profit-making mechanism, as this resembles Riba. Some may charge a fixed administrative penalty for late payments, but this money is typically donated to charity, not kept as profit.</p>
          </details>
          <details className="bg-bg-card border border-border p-4 rounded-xl cursor-pointer group">
            <summary className="font-bold text-text-primary outline-none">Is my money insured in an Islamic bank in the US?</summary>
            <p className="mt-3 text-text-secondary">Yes, if you use an "Islamic Window" at a traditional bank or a registered credit union (like Devon Bank), your deposits are typically FDIC or NCUA insured up to standard limits, just like any other American bank.</p>
          </details>
        </div>

        <AppPromoMini />

        <div className="mt-16 pt-8 border-t border-border">
          <h3 className="font-bold text-lg mb-4">Continue Learning</h3>
          <div className="flex gap-4">
            <Link href={`/${params.locale}/finance/mortgages`} className="text-primary hover:underline">Halal Mortgages &rarr;</Link>
            <Link href={`/${params.locale}/finance/investing`} className="text-primary hover:underline">Halal Investing &rarr;</Link>
          </div>
        </div>
      </div>
    </div>
  );
}