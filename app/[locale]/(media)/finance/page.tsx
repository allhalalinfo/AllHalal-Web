/**
 * Finance Hub Page (Coming Soon)
 */

import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Islamic Finance - AllHalal',
  description: 'Discover Sharia-compliant banking, Murabaha financing, halal investments, and Islamic financial solutions.',
};

export default function FinancePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-900 dark:to-neutral-900">
        <div className="container max-w-4xl text-center">
          <div className="inline-block px-4 py-2 mb-6 text-sm font-semibold bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 rounded-full">
            Coming Soon
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Islamic Finance
          </h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto mb-8">
            Your comprehensive guide to Sharia-compliant banking, Murabaha financing, halal investments, and Islamic financial solutions.
          </p>
        </div>
      </section>
      
      {/* Coming Soon Content */}
      <section className="py-16">
        <div className="container max-w-4xl">
          <div className="bg-neutral-50 dark:bg-neutral-800 rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-6">What's Coming</h2>
            <div className="space-y-4 text-lg text-neutral-700 dark:text-neutral-300">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🏦</span>
                <div>
                  <strong>Islamic Banks Directory</strong>
                  <p className="text-neutral-600 dark:text-neutral-400">Find Sharia-compliant banks in your country</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">💰</span>
                <div>
                  <strong>Murabaha & Ijara Guides</strong>
                  <p className="text-neutral-600 dark:text-neutral-400">Learn about Islamic financing options</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">📊</span>
                <div>
                  <strong>Halal Investments</strong>
                  <p className="text-neutral-600 dark:text-neutral-400">Discover Sharia-compliant investment opportunities</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">🧮</span>
                <div>
                  <strong>Finance Calculators</strong>
                  <p className="text-neutral-600 dark:text-neutral-400">Estimate payments and returns</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Explore More */}
      <section className="py-16 border-t border-neutral-200 dark:border-neutral-800">
        <div className="container max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">
            Explore AllHalal
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8">
            While we're building the Finance section, check out what's already available
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/blog" className="btn btn-primary">
              Read Blog
            </Link>
            <Link href="/guides" className="btn btn-secondary">
              Browse Guides
            </Link>
            <Link href="/restaurants/dubai" className="btn btn-secondary">
              Find Restaurants
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
