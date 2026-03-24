import type { Metadata } from "next";
import Link from "next/link";
import ZakatFaqSection from "@/components/zakat/ZakatFaqSection";
import ZakatJsonLd from "@/components/zakat/ZakatJsonLd";
import ZakatCalculatorClient from "./ZakatCalculatorClient";

export const metadata: Metadata = {
  title: "Zakat Calculator & Live Nisab 2026 | allhalal.info",
  description:
    "Calculate your Zakat accurately using live gold and silver prices. Understand the current Nisab threshold in USD and read scholar-backed FAQs.",
};

export default async function ZakatCalculatorPage() {
  return (
    <>
      <ZakatJsonLd />
      <main className="relative min-h-screen overflow-hidden bg-bg-primary pb-24 pt-24 md:pt-28">
        <div className="pointer-events-none absolute inset-0 min-h-full" aria-hidden>
          <div className="absolute inset-x-0 top-0 h-[min(44rem,75vh)] bg-[radial-gradient(ellipse_95%_55%_at_50%_-8%,rgba(244,185,66,0.16),transparent_58%)]" />
          <div className="absolute inset-y-0 left-0 w-[min(100%,32rem)] bg-[radial-gradient(ellipse_90%_55%_at_0%_35%,rgba(46,75,89,0.1),transparent_62%)]" />
          <div className="absolute inset-y-0 right-0 w-[min(100%,28rem)] bg-[radial-gradient(ellipse_75%_50%_at_100%_65%,rgba(244,185,66,0.11),transparent_58%)]" />
          {/* Soft light pools only — no tiled ornament (dense stars read as unsettling at a glance). */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_40%_at_70%_20%,rgba(255,255,255,0.35),transparent_55%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_35%_at_20%_85%,rgba(255,255,255,0.22),transparent_50%)]" />
          <div className="absolute inset-x-0 bottom-0 h-48 bg-[linear-gradient(180deg,transparent,rgba(249,246,241,0.85))]" />
        </div>

        <div className="container relative z-10 mx-auto max-w-6xl">
          <Link
            href={`/finance`}
            className="mb-5 inline-block text-sm font-medium text-primary hover:underline"
          >
            &larr; Back to Finance
          </Link>

          <div className="mb-8 md:mb-10">
            <p className="mb-3 inline-flex rounded-full border border-[rgba(244,185,66,0.35)] bg-white/60 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-[#5c4a32] shadow-sm backdrop-blur-sm">
              Finance tools
            </p>
            <h1 className="font-display text-4xl font-bold tracking-tight text-text-primary md:text-5xl lg:text-[3.25rem]">
              Zakat & Nisab Calculator
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-text-secondary md:text-xl">
              We fetch live global gold and silver prices to give you the most accurate Nisab threshold today.
            </p>
          </div>

          <div className="xl:grid xl:grid-cols-[minmax(0,1fr)_min(18rem,28%)] xl:items-start xl:gap-12">
            <div className="min-w-0">
              <div id="zakat-calculator-top">
                <ZakatCalculatorClient />
              </div>
              <ZakatFaqSection />
            </div>

            <aside
              className="mt-10 hidden xl:block xl:mt-0"
              aria-label="On this page and quick context"
            >
              <div className="sticky top-28 space-y-5">
                <nav className="rounded-3xl border border-[rgba(47,37,30,0.1)] bg-white/75 p-5 shadow-[0_16px_40px_rgba(43,34,24,0.06)] backdrop-blur-md">
                  <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-primary">On this page</p>
                  <ul className="mt-4 space-y-2.5 text-sm font-medium text-text-secondary">
                    <li>
                      <a href="#zakat-calculator-top" className="transition-colors hover:text-text-primary">
                        Calculator
                      </a>
                    </li>
                    <li>
                      <a href="#zakat-faq" className="transition-colors hover:text-text-primary">
                        FAQ
                      </a>
                    </li>
                    <li>
                      <a href="#zakat-partners-heading" className="transition-colors hover:text-text-primary">
                        Where to pay Zakat
                      </a>
                    </li>
                  </ul>
                </nav>
                <div className="relative overflow-hidden rounded-3xl border border-[rgba(244,185,66,0.28)] bg-[linear-gradient(145deg,rgba(253,248,238,0.95),rgba(255,255,255,0.92)_45%,rgba(232,244,242,0.5))] p-5 shadow-[0_12px_32px_rgba(43,34,24,0.05)]">
                  <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-[rgba(244,185,66,0.2)] blur-2xl" />
                  <div className="pointer-events-none absolute -bottom-4 -left-4 h-20 w-20 rounded-full bg-[rgba(46,75,89,0.12)] blur-2xl" />
                  <p className="relative font-display text-lg font-bold text-text-primary">Purify your wealth</p>
                  <p className="relative mt-2 text-sm leading-relaxed text-text-secondary">
                    Zakat is a pillar of Islam. This tool uses today&apos;s metal prices so your Nisab reflects the
                    market — then consult your scholar for complex cases.
                  </p>
                  <Link
                    href={`/guides`}
                    className="relative mt-4 inline-block text-sm font-semibold text-primary underline-offset-2 hover:underline"
                  >
                    Zakat guides →
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  );
}
