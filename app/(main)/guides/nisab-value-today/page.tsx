import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Current Nisab Value for Gold and Silver (USD) | allhalal.info",
  description:
    "Understand Islamic Nisab weights (85g gold, 595g silver), how spot prices set today’s threshold, and why calculators use live rates.",
  keywords: ["nisab value today", "gold nisab", "silver nisab", "zakat threshold usd"],
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
        <span>Nisab</span>
      </nav>

      <h1 className="font-display text-4xl font-bold text-text-primary md:text-5xl">
        Current Nisab value for gold and silver
      </h1>
      <p className="mt-4 text-lg text-text-secondary">
        Nisab is the minimum amount of wealth that makes Zakat obligatory after one lunar year. Classical fiqh fixes
        the weight in gold or silver; the <strong className="text-text-primary">dollar value moves every day</strong>{" "}
        with bullion prices.
      </p>

      <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">Standard weights</h2>
      <ul className="mt-4 list-disc space-y-2 pl-6 text-text-secondary">
        <li>
          <strong className="text-text-primary">Gold Nisab:</strong> commonly <strong>85 grams</strong> of gold.
        </li>
        <li>
          <strong className="text-text-primary">Silver Nisab:</strong> commonly <strong>595 grams</strong> of silver.
        </li>
      </ul>
      <p className="mt-4 text-text-secondary">
        Because silver is far cheaper per gram than gold, the <em>silver standard</em> produces a lower USD threshold—
        more people become liable, which many contemporary scholars prefer. You can switch standards in our
        calculator and read the in-app FAQ for scholarly context.
      </p>

      <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">How the live number is calculated</h2>
      <ol className="mt-4 list-decimal space-y-3 pl-6 text-text-secondary">
        <li>We fetch recent global spot prices for gold and silver (per gram, USD).</li>
        <li>We multiply by 85g or 595g respectively.</li>
        <li>We show you the result as “today’s Nisab” on the calculator page.</li>
      </ol>

      <p className="mt-10">
        <Link
          href={calc}
          className="inline-flex rounded-2xl bg-gradient-to-r from-[#b89665] to-[#e5d0a6] px-6 py-3 font-bold text-[#4a3319] shadow-md"
        >
          See live Nisab &amp; calculate Zakat
        </Link>
      </p>

      <p className="mt-8 text-sm text-text-muted">
        Related:{" "}
        <Link href={`/guides/zakat-on-stocks`} className="text-primary hover:underline">
          Zakat on stocks
        </Link>
        .
      </p>
    </article>
  );
}
