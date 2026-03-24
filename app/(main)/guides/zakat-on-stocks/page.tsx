import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Calculate Zakat on Stocks & Shares | allhalal.info",
  description:
    "Step-by-step Zakat on shares: use market value on your Zakat date, handle halal portfolios, and understand tazkiyah when companies earn impermissible income.",
  keywords: [
    "zakat on stocks",
    "zakat shares",
    "islamic finance zakat",
    "stock zakat calculation",
  ],
};

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  const calc = `/finance/zakat-calculator#zakat-calculator-top`;

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
        <span>Stocks</span>
      </nav>

      <h1 className="font-display text-4xl font-bold text-text-primary md:text-5xl">
        How to calculate Zakat on stocks &amp; shares
      </h1>
      <p className="mt-4 text-lg text-text-secondary">
        Listed equities are zakatable wealth for many Muslims once you pass{" "}
        <Link href={`/guides/nisab-value-today`} className="text-primary underline-offset-2 hover:underline">
          Nisab
        </Link>{" "}
        and complete a full lunar year (<em>hawl</em>). This guide explains a practical workflow; complex
        mixed-income portfolios still need a qualified advisor.
      </p>

      <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">Step-by-step</h2>
      <ol className="mt-4 list-decimal space-y-3 pl-6 text-text-secondary">
        <li>
          <strong className="text-text-primary">Pick your Zakat date</strong> — usually the same Islamic date each
          year.
        </li>
        <li>
          <strong className="text-text-primary">Value each position</strong> at the closing market price in USD (or
          convert to USD).
        </li>
        <li>
          <strong className="text-text-primary">Add cash dividends</strong> held in your brokerage on that date if
          they are part of your zakatable pool.
        </li>
        <li>
          <strong className="text-text-primary">Subtract permissible debts</strong> due within the next lunar year
          (margin loans, short-term liabilities you intend to repay).
        </li>
        <li>
          <strong className="text-text-primary">Apply 2.5%</strong> on the net figure if you remain above Nisab and
          hawl is complete.
        </li>
      </ol>

      <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">Halal screening &amp; tazkiyah</h2>
      <p className="mt-4 text-text-secondary">
        If a company earns income from impermissible activities, scholars may require{" "}
        <em>cleansing</em> (tazkiyah) of that portion of dividends or gains before Zakat is calculated on the rest.
        Percentages and methods differ by school and fund policy—use an Islamic finance specialist for your exact
        holdings.
      </p>

      <div className="mt-8 rounded-2xl border border-border bg-bg-card p-6">
        <h3 className="font-bold text-text-primary">Example (illustrative)</h3>
        <p className="mt-2 text-sm text-text-secondary">
          You own $10,000 of halal-screened shares on your Zakat night and have $1,000 of short-term liabilities due
          this year. Net zakatable wealth = $9,000. If above Nisab with hawl, Zakat ≈ $225 (2.5%).
        </p>
      </div>

      <p className="mt-10">
        <Link
          href={calc}
          className="inline-flex rounded-2xl bg-gradient-to-r from-[#b89665] to-[#e5d0a6] px-6 py-3 font-bold text-[#4a3319] shadow-md"
        >
          Calculate Zakat online
        </Link>
      </p>

      <p className="mt-8 text-sm text-text-muted">
        Related:{" "}
        <Link href={`/guides/zakat-on-business-assets`} className="text-primary hover:underline">
          Business assets
        </Link>
        ,{" "}
        <Link href={`/guides/how-to-calculate-zakat-on-crypto`} className="text-primary hover:underline">
          Crypto
        </Link>
        .
      </p>
    </article>
  );
}
