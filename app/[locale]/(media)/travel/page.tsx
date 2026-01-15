/**
 * Travel Hub Page (Coming Soon)
 */

import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Muslim-Friendly Travel - AllHalal',
  description: 'Discover halal travel destinations, prayer-friendly hotels, and Muslim-friendly vacation spots worldwide.',
};

export default function TravelPage() {
  return (
    <div className="min-h-screen bg-bg-primary text-text-primary">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-b from-bg-secondary to-bg-primary">
        <div className="container max-w-4xl text-center">
          <div className="inline-block px-4 py-2 mb-6 text-sm font-semibold bg-primary/10 text-primary rounded-full border border-primary/20">
            Coming Soon
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-text-primary">
            Muslim-Friendly Travel
          </h1>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto mb-8">
            Explore the world with confidence. Find halal-friendly destinations, prayer facilities, and Muslim-welcoming accommodations.
          </p>
        </div>
      </section>
      
      {/* Coming Soon Content */}
      <section className="py-16">
        <div className="container max-w-4xl">
          <div className="bg-bg-card rounded-2xl p-8 md:p-12 border border-border">
            <h2 className="text-3xl font-bold mb-6 text-text-primary">What's Coming</h2>
            <div className="space-y-4 text-lg text-text-primary">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🌍</span>
                <div>
                  <strong className="text-text-primary">Destination Guides</strong>
                  <p className="text-text-secondary">Muslim-friendly countries and cities</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">🏨</span>
                <div>
                  <strong className="text-text-primary">Halal Hotels</strong>
                  <p className="text-text-secondary">Prayer-friendly accommodations</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">🕌</span>
                <div>
                  <strong className="text-text-primary">Mosque Finder</strong>
                  <p className="text-text-secondary">Find mosques near you</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">✈️</span>
                <div>
                  <strong className="text-text-primary">Travel Tips</strong>
                  <p className="text-text-secondary">Advice for Muslim travelers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Explore More */}
      <section className="py-16 border-t border-border">
        <div className="container max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4 text-text-primary">
            Explore AllHalal
          </h2>
          <p className="text-lg text-text-secondary mb-8">
            While we're building the Travel section, check out what's already available
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/restaurants/dubai" className="btn btn-primary">
              Find Restaurants
            </Link>
            <Link href="/blog" className="btn btn-secondary">
              Read Blog
            </Link>
            <Link href="/guides" className="btn btn-secondary">
              Browse Guides
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
