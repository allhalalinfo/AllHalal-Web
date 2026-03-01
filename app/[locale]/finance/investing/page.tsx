import Link from "next/link";
import { Metadata } from "next";
import AppPromoMini from "@/components/ui/AppPromoMini";

export const metadata: Metadata = {
  title: 'Halal Investing Guide | AllHalal',
  description: 'Grow your wealth the halal way without compromising your faith.',
};

export default async function InvestingPage(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  return (
    <div className="container py-32 max-w-4xl mx-auto min-h-screen">
      <Link href={`/${params.locale}/finance`} className="text-primary hover:underline mb-8 inline-block">&larr; Back to Finance</Link>
      <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">Halal Investing</h1>
      
      <div className="prose prose-lg dark:prose-invert max-w-none text-text-secondary">
        <p>Halal investing ensures that your money grows in ways that align with Islamic principles. It's about ethical growth, avoiding harm, and contributing to permissible businesses.</p>
        
        <h2 className="text-2xl font-bold text-text-primary mt-10 mb-4">Basic Principles</h2>
        <ul className="list-disc pl-6 mb-8 space-y-2">
          <li><strong>No Riba (Interest):</strong> Avoiding bonds, conventional savings accounts, or companies highly leveraged in debt.</li>
          <li><strong>No Haram Industries:</strong> Avoiding investments in alcohol, gambling, adult entertainment, pork products, and conventional financial services.</li>
          <li><strong>Financial Screening:</strong> Ensuring the company's debt-to-equity ratio and interest-bearing income fall below Shariah-acceptable thresholds.</li>
        </ul>

        <h2 className="text-2xl font-bold text-text-primary mt-10 mb-4">How to start?</h2>
        <p>Today, there are numerous Halal ETFs, mutual funds, and robo-advisors that automatically screen and manage your portfolio according to Shariah rules.</p>
        
        <div className="grid gap-6 mt-6 mb-10">
          <div className="border border-border p-6 rounded-2xl bg-bg-card">
            <h3 className="text-xl font-bold text-text-primary mb-2">Wahed Invest</h3>
            <p className="mb-4">A popular robo-advisor that automatically invests your money into a globally diversified, Shariah-compliant portfolio.</p>
            <a href="https://wahedinvest.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-semibold">Visit Wahed &rarr;</a>
          </div>
          <div className="border border-border p-6 rounded-2xl bg-bg-card">
            <h3 className="text-xl font-bold text-text-primary mb-2">Zoya</h3>
            <p className="mb-4">An app that helps you screen individual stocks and ETFs for Shariah compliance before you buy them on your own brokerage.</p>
            <a href="https://zoya.finance/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-semibold">Visit Zoya &rarr;</a>
          </div>
          <div className="border border-border p-6 rounded-2xl bg-bg-card">
            <h3 className="text-xl font-bold text-text-primary mb-2">Aghaz Invest</h3>
            <p className="mb-4">A goal-based investing platform for Muslims, allowing you to invest in portfolios aligned with your personal values and Islamic principles.</p>
            <a href="https://aghazinvest.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-semibold">Visit Aghaz &rarr;</a>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-text-primary mt-10 mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4 mb-10">
          <details className="bg-bg-card border border-border p-4 rounded-xl cursor-pointer group">
            <summary className="font-bold text-text-primary outline-none">Are stocks halal?</summary>
            <p className="mt-3 text-text-secondary">Yes, buying shares (ownership) in a company is permissible, provided the company's core business is halal and it passes the financial screening criteria (e.g., its debt and interest income are within acceptable limits).</p>
          </details>
          <details className="bg-bg-card border border-border p-4 rounded-xl cursor-pointer group">
            <summary className="font-bold text-text-primary outline-none">What is dividend purification?</summary>
            <p className="mt-3 text-text-secondary">Even in Shariah-compliant companies, a tiny fraction of their income might come from interest (like cash sitting in a bank). Purification involves donating that small percentage of your dividends to charity to cleanse your wealth.</p>
          </details>
        </div>

        <AppPromoMini />

        <div className="mt-16 pt-8 border-t border-border">
          <h3 className="font-bold text-lg mb-4">Continue Learning</h3>
          <div className="flex gap-4">
            <Link href={`/${params.locale}/finance/mortgages`} className="text-primary hover:underline">Halal Mortgages &rarr;</Link>
            <Link href={`/${params.locale}/finance/banks`} className="text-primary hover:underline">Halal Banks &rarr;</Link>
          </div>
        </div>
      </div>
    </div>
  );
}