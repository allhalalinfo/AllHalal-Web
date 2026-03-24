import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Zakat for Business Owners: Inventory & Cash | allhalal.info",
  description:
    "How sole traders and companies estimate Zakat on inventory, receivables, and business cash—plus what usually stays outside the base.",
  keywords: ["zakat business", "zakat inventory", "company zakat", "business assets zakat"],
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
        <span>Business</span>
      </nav>

      <h1 className="font-display text-4xl font-bold text-text-primary md:text-5xl">
        Zakat calculation for business owners
      </h1>
      <p className="mt-4 text-lg text-text-secondary">
        Trading businesses typically pay Zakat on <strong className="text-text-primary">zakatable working capital</strong>
        : cash in the company bank account, sellable inventory, and strong receivables—minus short-term liabilities
        scheduled for payment soon. Exact rules vary by entity type and school.
      </p>

      <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">What often counts</h2>
      <ul className="mt-4 list-disc space-y-2 pl-6 text-text-secondary">
        <li>Cash and liquid savings held for the business.</li>
        <li>Finished goods and resale inventory at cost or market (your scholar may specify).</li>
        <li>Trade receivables you reasonably expect to collect.</li>
      </ul>

      <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">What is usually excluded</h2>
      <ul className="mt-4 list-disc space-y-2 pl-6 text-text-secondary">
        <li>Long-term fixed assets you do not intend to sell soon (machinery, company-owned premises—depending on use).</li>
        <li>Employee salaries already earmarked as an expense.</li>
      </ul>

      <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">Workflow</h2>
      <ol className="mt-4 list-decimal space-y-3 pl-6 text-text-secondary">
        <li>Prepare a simple balance sheet snapshot on your Zakat date.</li>
        <li>Identify zakatable lines with an accountant aware of Islamic guidelines.</li>
        <li>Subtract immediate liabilities.</li>
        <li>Combine with personal wealth if your scholar aggregates owner and business pools.</li>
        <li>Apply 2.5% when above Nisab and hawl is satisfied.</li>
      </ol>

      <p className="mt-10">
        <Link
          href={calc}
          className="inline-flex rounded-2xl bg-gradient-to-r from-[#b89665] to-[#e5d0a6] px-6 py-3 font-bold text-[#4a3319] shadow-md"
        >
          Estimate with the calculator
        </Link>
      </p>

      <p className="mt-8 text-sm text-text-muted">
        Related:{" "}
        <Link href={`/guides/zakat-on-stocks`} className="text-primary hover:underline">
          Stocks
        </Link>
        ,{" "}
        <Link href={`/guides/zakat-on-pension-and-retirement-funds`} className="text-primary hover:underline">
          Pensions
        </Link>
        .
      </p>
    </article>
  );
}
