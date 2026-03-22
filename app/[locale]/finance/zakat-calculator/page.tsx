import type { Metadata } from "next";
import Link from "next/link";
import ZakatFaqSection from "@/components/zakat/ZakatFaqSection";
import ZakatJsonLd from "@/components/zakat/ZakatJsonLd";
import ZakatCalculatorClient from "./ZakatCalculatorClient";

export const metadata: Metadata = {
  title: "Zakat Calculator & Live Nisab 2026 | allhalal.info",
  description:
    "Calculate your Zakat accurately using live gold and silver prices. Understand the current Nisab threshold in USD, save your calculation, and read scholar-backed FAQs.",
};

export default async function ZakatCalculatorPage(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  return (
    <>
      <ZakatJsonLd locale={params.locale} />
      <div className="container mx-auto min-h-screen max-w-5xl py-32">
        <Link href={`/${params.locale}/finance`} className="mb-8 inline-block text-primary hover:underline">
          &larr; Back to Finance
        </Link>

        <div className="mb-12">
          <h1 className="mb-4 font-display text-4xl font-bold text-text-primary md:text-5xl">
            Zakat & Nisab Calculator
          </h1>
          <p className="max-w-2xl text-xl text-text-secondary">
            We fetch live global gold and silver prices to give you the most accurate Nisab threshold today.
          </p>
        </div>

        <div id="zakat-calculator-top">
          <ZakatCalculatorClient />
        </div>

        <ZakatFaqSection />
      </div>
    </>
  );
}
