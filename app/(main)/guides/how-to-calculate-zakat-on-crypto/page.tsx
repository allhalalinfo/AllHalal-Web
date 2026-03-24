import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Zakat on Cryptocurrency: Complete Guide | allhalal.info",
  description:
    "How to value Bitcoin and altcoins for Zakat, when to use spot USD prices, and why staking or DeFi needs a scholar.",
  keywords: ["zakat crypto", "zakat bitcoin", "cryptocurrency zakat calculation", "nisab crypto"],
};

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  const calc = `/${locale}/finance/zakat-calculator#zakat-calculator-top`;

  return (
    <article className="container mx-auto max-w-3xl py-28 md:py-32">
      <nav className="mb-10 text-sm text-text-secondary">
        <Link href={`/finance`} className="text-primary hover:underline">
          Finance
        </Link>
        <span className="mx-2 opacity-50">/</span>
        <Link href={`/guides`} className="text-primary hover:underline">
          Guides
        </Link>
        <span className="mx-2 opacity-50">/</span>
        <span>Crypto</span>
      </nav>

      <h1 className="font-display text-4xl font-bold text-text-primary md:text-5xl">
        Zakat on cryptocurrency: a complete guide
      </h1>
      <p className="mt-4 text-lg text-text-secondary">
        Most contemporary fatawa treat liquid crypto you own as <strong className="text-text-primary">wealth</strong>
        : it enters your Zakat base like cash or trade goods. You still need Nisab, hawl, and a clear valuation date.
      </p>

      <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">Practical steps</h2>
      <ol className="mt-4 list-decimal space-y-3 pl-6 text-text-secondary">
        <li>List every wallet and exchange balance on your Zakat night.</li>
        <li>Convert each asset to USD using a reputable spot price at that time.</li>
        <li>Add crypto to cash, gold, stocks, and other zakatable assets.</li>
        <li>Subtract short-term debts due within the year.</li>
        <li>If net wealth ≥ Nisab and hawl is complete, pay 2.5% on the net figure.</li>
      </ol>

      <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">Staking, lending, and NFTs</h2>
      <p className="mt-4 text-text-secondary">
        Locked staking rewards, liquidity pools, and NFTs held for investment can change whether wealth is truly
        “yours” yet. Do not guess—ask a scholar familiar with DeFi structures.
      </p>

      <div className="mt-8 rounded-2xl border border-border bg-bg-card p-6">
        <h3 className="font-bold text-text-primary">Example</h3>
        <p className="mt-2 text-sm text-text-secondary">
          You hold 1 ETH valued at $3,000 on your Zakat date, plus $2,000 cash, no debts. Total zakatable pool $5,000.
          If above Nisab with hawl, Zakat ≈ $125. Volatility means next year’s number will differ—always use the day
          you calculate.
        </p>
      </div>

      <p className="mt-10">
        <Link
          href={calc}
          className="inline-flex rounded-2xl bg-gradient-to-r from-[#b89665] to-[#e5d0a6] px-6 py-3 font-bold text-[#4a3319] shadow-md"
        >
          Add crypto in the calculator
        </Link>
      </p>

      <p className="mt-8 text-sm text-text-muted">
        Related:{" "}
        <Link href={`/guides/zakat-on-stocks`} className="text-primary hover:underline">
          Stocks
        </Link>
        ,{" "}
        <Link href={`/guides/zakat-on-business-assets`} className="text-primary hover:underline">
          Business
        </Link>
        .
      </p>
    </article>
  );
}
