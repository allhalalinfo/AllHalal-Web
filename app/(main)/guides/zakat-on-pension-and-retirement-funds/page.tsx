import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Is Zakat Due on Pension & Retirement Funds? | allhalal.info",
  description:
    "Accessible vs locked retirement savings, defined contribution plans, and how scholars treat wealth you cannot withdraw yet.",
  keywords: ["zakat pension", "zakat 401k", "retirement zakat", "zakat IRA"],
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
        <span>Pensions</span>
      </nav>

      <h1 className="font-display text-4xl font-bold text-text-primary md:text-5xl">
        Is Zakat due on pension funds?
      </h1>
      <p className="mt-4 text-lg text-text-secondary">
        Retirement accounts split into two broad ideas in modern fatawa: money you can access today versus money
        locked until retirement age. The first group often enters Zakat calculations; the second may be deferred or
        treated differently—confirm with your scholar.
      </p>

      <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">Accessible balances</h2>
      <p className="mt-4 text-text-secondary">
        If you can withdraw or roll over funds without penalty (or you already paid penalties and the cash is yours),
        many scholars include the zakatable portion in your annual calculation once Nisab and hawl apply.
      </p>

      <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">Locked employer plans</h2>
      <p className="mt-4 text-text-secondary">
        Some opinions postpone Zakat on locked retirement pots until withdrawal; others use a discounted percentage
        each year. The diversity of plans (401k, IRA, SIPPs, workplace pensions) means you should not rely on generic
        blog posts—get a tailored ruling.
      </p>

      <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">What to bring to an advisor</h2>
      <ul className="mt-4 list-disc space-y-2 pl-6 text-text-secondary">
        <li>Plan type and jurisdiction.</li>
        <li>Current statement balance in USD.</li>
        <li>Rules for early withdrawal, loans, and vesting.</li>
        <li>Whether employer matching is fully yours yet.</li>
      </ul>

      <div className="mt-8 rounded-2xl border border-border bg-bg-card p-6">
        <h3 className="font-bold text-text-primary">Example pattern</h3>
        <p className="mt-2 text-sm text-text-secondary">
          You have $5,000 in an accessible brokerage account and $80,000 in a locked pension. Your advisor might
          instruct Zakat on the $5,000 plus a reduced rule for the pension—not automatically 2.5% on the full $80k.
        </p>
      </div>

      <p className="mt-10">
        <Link
          href={calc}
          className="inline-flex rounded-2xl bg-gradient-to-r from-[#b89665] to-[#e5d0a6] px-6 py-3 font-bold text-[#4a3319] shadow-md"
        >
          Model personal wealth in the calculator
        </Link>
      </p>

      <p className="mt-8 text-sm text-text-muted">
        Related:{" "}
        <Link href={`/guides/zakat-on-stocks`} className="text-primary hover:underline">
          Stocks inside pensions
        </Link>
        ,{" "}
        <Link href={`/guides/zakat-on-business-assets`} className="text-primary hover:underline">
          Business assets
        </Link>
        .
      </p>
    </article>
  );
}
