import type { Metadata } from "next";
import Link from "next/link";
import BoycottCheckerClient from "./BoycottCheckerClient";
import BreadcrumbsSchema from "@/components/seo/BreadcrumbsSchema";
import FAQSchema from "@/components/seo/FAQSchema";
import Footer from "@/components/layout/Footer";
import { SITE_URL } from "@/lib/seo/metadata";

export const metadata: Metadata = {
  alternates: { canonical: "/boycott-checker" },
  title: "Boycott Checker | Look Up Brands & Companies | allhalal.info",
  description:
    "Look up boycott-related guidance for brands and companies. Understand what BDS and similar campaigns cover, how our data works, and how to verify sources yourself.",
  keywords: [
    "boycott checker",
    "bds list",
    "brand boycott",
    "muslim boycott",
    "company boycott check",
  ].join(", "),
  openGraph: {
    title: "Boycott checker | allhalal.info",
    description:
      "Look up boycott-related guidance for brands and companies, with context on how to use the results.",
    url: `${SITE_URL}/boycott-checker`,
    type: "website",
  },
};

const faqs = [
  {
    question: "What does this boycott checker do?",
    answer:
      "It looks up a brand or company name against the allhalal.info boycott dataset and returns whatever guidance we have on file. Results are informational — always cross-check with lists and scholars you trust.",
  },
  {
    question: "Is a boycott the same as a haram ruling?",
    answer:
      "No. Halal and haram are fiqh categories about permissibility. A boycott is a consumer or political choice, usually about a company's conduct, ownership or links to a conflict. A product can be ingredient-halal and still appear on a boycott list, or the reverse.",
  },
  {
    question: "Why might my brand not appear?",
    answer:
      "Lists change, subsidiaries rebrand, and coverage is never complete. A missing result does not mean a brand is 'cleared' — it means we do not currently have a matching record. Check primary sources if the brand matters to you.",
  },
  {
    question: "Should I rely only on this tool?",
    answer:
      "No. Use it as a starting point. For decisions that matter to you, verify against official campaign pages, corporate ownership filings, and guidance from scholars or organisations you follow.",
  },
];

export default function BoycottCheckerPage() {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Boycott checker", url: "/boycott-checker" },
  ];

  return (
    <>
      <BreadcrumbsSchema items={breadcrumbs} />
      <FAQSchema faqs={faqs} />

      <main className="relative min-h-screen overflow-hidden bg-bg-primary">
        <section className="relative pb-10 pt-32">
          <div className="container relative z-10 mx-auto max-w-3xl">
            <nav className="mb-6 text-sm text-text-muted" aria-label="Breadcrumb">
              <Link href="/" className="text-primary hover:underline">
                Home
              </Link>
              <span className="mx-2">/</span>
              <span className="text-text-secondary">Boycott checker</span>
            </nav>

            <h1 className="font-display text-3xl font-black tracking-tight text-text-primary md:text-5xl">
              Boycott checker
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-text-secondary">
              Look up a brand or company for boycott-related guidance in our dataset.
              This is a research aid — not a fatwa, and not a substitute for checking
              primary sources yourself.
            </p>
          </div>
        </section>

        <BoycottCheckerClient embed />

        <section className="pb-20">
          <div className="container mx-auto max-w-3xl space-y-10">
            <article className="rounded-3xl border border-[rgba(73,58,42,0.08)] bg-white/70 p-6 md:p-8">
              <h2 className="font-display text-2xl font-black text-text-primary">
                Halal status vs boycott guidance
              </h2>
              <div className="mt-4 space-y-3 leading-relaxed text-text-secondary">
                <p>
                  People often mix two different questions.{" "}
                  <strong className="text-text-primary">Is this product halal?</strong>{" "}
                  asks about ingredients, slaughter and processing.{" "}
                  <strong className="text-text-primary">Should I buy from this company?</strong>{" "}
                  asks about ethics, ownership, political involvement or campaign targets.
                </p>
                <p>
                  Our{" "}
                  <Link href="/is-it-halal" className="font-semibold text-primary hover:underline">
                    Is it halal?
                  </Link>{" "}
                  pages answer the first. This checker helps with the second. A snack can
                  be free of gelatin and still sit on a boycott list; a company can be
                  boycott-clear and sell a product that needs an ingredient check.
                </p>
              </div>
            </article>

            <article className="rounded-3xl border border-[rgba(73,58,42,0.08)] bg-white/70 p-6 md:p-8">
              <h2 className="font-display text-2xl font-black text-text-primary">
                How to use a result wisely
              </h2>
              <ol className="mt-4 list-decimal space-y-3 pl-5 leading-relaxed text-text-secondary">
                <li>
                  Treat a match as a prompt to read more, not as an automatic rule for
                  every product the brand sells.
                </li>
                <li>
                  Check whether the entry refers to a parent company, a subsidiary, a
                  franchise or a specific product line — those are not always the same.
                </li>
                <li>
                  Compare with lists you already trust (campaign organisations, local
                  mosque guidance, scholars you follow).
                </li>
                <li>
                  Re-check periodically. Ownership, sponsorships and campaign targets
                  change.
                </li>
              </ol>
            </article>

            <article className="rounded-3xl border border-[rgba(73,58,42,0.08)] bg-white/70 p-6 md:p-8">
              <h2 className="font-display text-2xl font-black text-text-primary">
                What this tool cannot do
              </h2>
              <ul className="mt-4 list-disc space-y-3 pl-5 leading-relaxed text-text-secondary">
                <li>It does not issue religious rulings.</li>
                <li>
                  It does not cover every brand worldwide — absence of a result is not
                  clearance.
                </li>
                <li>
                  It does not replace reading an ingredient label for{" "}
                  <Link href="/is-it-halal" className="font-semibold text-primary hover:underline">
                    haram or doubtful ingredients
                  </Link>
                  .
                </li>
                <li>
                  It does not track every local campaign; regional lists may differ from
                  global ones.
                </li>
              </ul>
            </article>

            <article className="rounded-3xl border border-[rgba(73,58,42,0.08)] bg-white/70 p-6 md:p-8">
              <h2 className="font-display text-2xl font-black text-text-primary">
                Related tools on allhalal.info
              </h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <Link
                  href="/is-it-halal"
                  className="rounded-2xl border border-[rgba(73,58,42,0.1)] bg-[#FAFAF8] p-4 font-semibold text-text-primary transition hover:border-primary"
                >
                  Halal product checks
                </Link>
                <Link
                  href="/methodology"
                  className="rounded-2xl border border-[rgba(73,58,42,0.1)] bg-[#FAFAF8] p-4 font-semibold text-text-primary transition hover:border-primary"
                >
                  Our methodology
                </Link>
                <Link
                  href="/app"
                  className="rounded-2xl border border-[rgba(73,58,42,0.1)] bg-[#FAFAF8] p-4 font-semibold text-text-primary transition hover:border-primary"
                >
                  Scanner app
                </Link>
                <Link
                  href="/contact"
                  className="rounded-2xl border border-[rgba(73,58,42,0.1)] bg-[#FAFAF8] p-4 font-semibold text-text-primary transition hover:border-primary"
                >
                  Report a missing brand
                </Link>
              </div>
            </article>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
