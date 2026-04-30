import type { Metadata } from "next";
import Link from "next/link";
import { generateMetadata as genMeta, generateItemListJSONLD, SITE_URL } from "@/lib/seo/metadata";

export const metadata: Metadata = genMeta({
  title: "Zakat & Finance Guides",
  description: "Practical guides on Zakat for stocks, crypto, business, pensions, and today's Nisab values—with links to our free calculator.",
  path: "/guides",
  keywords: [
    "zakat guide",
    "zakat calculator",
    "zakat on stocks",
    "zakat on crypto",
    "nisab value",
    "Islamic finance",
    "zakat on business",
    "zakat on pension"
  ]
});

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

export default async function GuidesIndexPage(props: { params: Promise<{}> }) {
  const calc = `/finance/zakat-calculator#zakat-calculator-top`;

  // Generate JSON-LD schema for guides collection
  const itemListSchema = generateItemListJSONLD({
    name: "Zakat & Finance Guides",
    description: "Practical guides on Zakat calculation for different asset types",
    url: `${SITE_URL}/guides`,
    items: GUIDES.map(guide => ({
      name: guide.title,
      url: `${SITE_URL}${guide.href}`,
      description: guide.desc
    }))
  });

  return (
    <div className="container mx-auto max-w-3xl py-28 md:py-32">
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: itemListSchema }}
      />

      <nav className="mb-10 text-sm text-text-secondary">
        <Link href={`/finance`} className="text-primary hover:underline">
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

      {/* Zakat Asset Type Overview */}
      <div className="mt-12 rounded-2xl border border-border bg-bg-card p-6 md:p-8">
        <h2 className="mb-6 font-display text-2xl font-bold text-text-primary">
          Zakat calculation: Asset type overview
        </h2>
        <p className="mb-6 text-text-secondary">
          Zakat is due at 2.5% on most forms of wealth after one lunar year, but different asset types have specific considerations. This table shows the standard rate, timing, and common mistakes for each category.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-border">
                <th className="py-3 pr-4 font-bold text-text-primary">Asset type</th>
                <th className="py-3 px-4 font-bold text-text-primary">Rate</th>
                <th className="py-3 px-4 font-bold text-text-primary">When calculated</th>
                <th className="py-3 pl-4 font-bold text-text-primary">Common mistakes</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="border-b border-border">
                <td className="py-4 pr-4 font-semibold text-text-primary">Cash & savings</td>
                <td className="py-4 px-4 text-text-secondary">2.5%</td>
                <td className="py-4 px-4 text-text-secondary">Lunar year anniversary</td>
                <td className="py-4 pl-4 text-text-secondary">Not tracking the full lunar year</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-4 pr-4 font-semibold text-text-primary">Stocks & shares</td>
                <td className="py-4 px-4 text-text-secondary">2.5% on market value</td>
                <td className="py-4 px-4 text-text-secondary">Lunar year anniversary</td>
                <td className="py-4 pl-4 text-text-secondary">Not purifying dividends first, using wrong valuation date</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-4 pr-4 font-semibold text-text-primary">Cryptocurrency</td>
                <td className="py-4 px-4 text-text-secondary">2.5% (scholar dependent)</td>
                <td className="py-4 px-4 text-text-secondary">Lunar year anniversary</td>
                <td className="py-4 pl-4 text-text-secondary">Using wrong valuation date, not consulting scholar</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-4 pr-4 font-semibold text-text-primary">Business inventory</td>
                <td className="py-4 px-4 text-text-secondary">2.5%</td>
                <td className="py-4 px-4 text-text-secondary">Lunar year anniversary</td>
                <td className="py-4 pl-4 text-text-secondary">Including fixed assets (not zakatable)</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-4 pr-4 font-semibold text-text-primary">Gold & silver</td>
                <td className="py-4 px-4 text-text-secondary">2.5% above Nisab</td>
                <td className="py-4 px-4 text-text-secondary">Lunar year anniversary</td>
                <td className="py-4 pl-4 text-text-secondary">Using stale Nisab value, not updating spot prices</td>
              </tr>
              <tr>
                <td className="py-4 pr-4 font-semibold text-text-primary">Pension funds</td>
                <td className="py-4 px-4 text-text-secondary">2.5% (if accessible)</td>
                <td className="py-4 px-4 text-text-secondary">When funds become available</td>
                <td className="py-4 pl-4 text-text-secondary">Paying on locked funds (scholarly debate)</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-6 text-sm text-text-secondary">
          Note: This is general educational guidance. For specific situations (especially complex business assets, mixed portfolios, or pension funds), consult a qualified Islamic scholar.
        </p>
      </div>

      <ul className="mt-12 space-y-6">
        {GUIDES.map((g) => (
          <li key={g.href}>
            <Link
              href={`${g.href}`}
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
