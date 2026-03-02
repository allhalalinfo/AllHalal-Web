import { Metadata } from 'next';
import Link from 'next/link';
import ZakatCalculatorClient from './ZakatCalculatorClient';

export const metadata: Metadata = {
  title: 'Zakat Calculator & Live Nisab 2026 | AllHalal',
  description: 'Calculate your Zakat accurately using live gold and silver prices. Understand the current Nisab threshold in USD.',
};

export default async function ZakatCalculatorPage(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  return (
    <div className="container py-32 max-w-5xl mx-auto min-h-screen">
      <Link href={`/${params.locale}/finance`} className="text-primary hover:underline mb-8 inline-block">&larr; Back to Finance</Link>
      
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">Zakat & Nisab Calculator</h1>
        <p className="text-xl text-text-secondary max-w-2xl">
          We fetch live global gold and silver prices to give you the most accurate Nisab threshold today.
        </p>
      </div>

      <ZakatCalculatorClient />
    </div>
  );
}