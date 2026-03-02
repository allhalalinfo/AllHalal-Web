import { Metadata } from 'next';
import Link from 'next/link';
import BoycottCheckerClient from './BoycottCheckerClient';

export const metadata: Metadata = {
  title: 'BDS Boycott Checker | AllHalal',
  description: 'Check if a brand or product is on the BDS boycott list. Instantly verify companies with ties to the occupation economy.',
};

export default async function BoycottCheckerPage(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  return (
    <div className="container py-32 max-w-4xl mx-auto min-h-screen">
      <Link href={`/${params.locale}/is-it-halal`} className="text-primary hover:underline mb-8 inline-block">&larr; Back to Halal Checker</Link>
      
      <div className="mb-12 text-center max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">Boycott Checker</h1>
        <p className="text-xl text-text-secondary">
          Search for a brand to see if it's on the boycott list based on its corporate ties and investments.
        </p>
      </div>

      <BoycottCheckerClient />
    </div>
  );
}