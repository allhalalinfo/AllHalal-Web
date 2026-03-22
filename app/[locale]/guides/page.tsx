import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Zakat & Finance Guides | allhalal.info",
  description:
    "Practical guides on Zakat for stocks, crypto, business, pensions, and today’s Nisab values—with links to our free calculator.",
};

const GUIDES = [
  {
    href: "/guides/zakat-on-stocks",
    title: "How to calculate Zakat on stocks & shares",
    desc: "Market value, halal screening, and cleansing impermissible income before paying Zakat.",
  },
  {
    href: "/guides/nisab-value-today",
    title: "Current Nisab value for gold and silver",
    desc: "What Nisab means in grams and how live spot prices set your threshold in USD.",
  },
  {
    href: "/guides/how-to-calculate-zakat-on-crypto",
    title: "Zakat on cryptocurrency: a complete guide",
    desc: "Treating crypto as liquid wealth, valuation date, and when to ask a scholar.",
  },
  {
    href: "/guides/zakat-on-business-assets",
    title: "Zakat calculation for business owners",
    desc: "Inventory, receivables, cash in the business, and what is usually excluded.",
  },
  {
    href: "/guides/zakat-on-pension-and-retirement-funds",
    title: "Is Zakat due on pension funds?",
    desc: "Accessible vs locked retirement balances and common scholarly approaches.",
  },
] as const;

export default async function GuidesIndexPage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  const calc = `/${locale}/finance/zakat-calculator#zakat-calculator-top`;

  return (
    <div className="container mx-auto max-w-3xl py-28 md:py-32">
      <nav className="mb-10 text-sm text-text-secondary">
        <Link href={`/${locale}/finance`} className="text-primary hover:underline">
          Finance
        </Link>
        <span className="mx-2 opacity-50">/</span>
        <span>Guides</span>
      </nav>

      <h1 className="font-display text-4xl font-bold text-text-primary md:text-5xl">Zakat & finance guides</h1>
      <p className="mt-4 text-lg text-text-secondary">
        Short, practical articles. When you are ready,{" "}
        <Link href={calc} className="font-semibold text-primary underline-offset-2 hover:underline">
          calculate Zakat online
        </Link>{" "}
        with live Nisab on allhalal.info.
      </p>

      <ul className="mt-12 space-y-6">
        {GUIDES.map((g) => (
          <li key={g.href}>
            <Link
              href={`/${locale}${g.href}`}
              className="block rounded-2xl border border-border bg-bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <h2 className="font-display text-xl font-bold text-text-primary">{g.title}</h2>
              <p className="mt-2 text-text-secondary">{g.desc}</p>
              <span className="mt-3 inline-block text-sm font-semibold text-primary">Read guide →</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
