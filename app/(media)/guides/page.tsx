/**
 * Guides Hub Page
 * Lists all evergreen guides
 */

import { Metadata } from 'next';
import Link from 'next/link';
import { getAllGuides } from '@/lib/content/mdx';
import { ArticleCard } from '@/components/media/cards/ArticleCard';
import { generateMetadata as genMeta } from '@/lib/seo/metadata';

export const metadata: Metadata = genMeta({
  title: 'Guides - AllHalal',
  description: 'Comprehensive guides on halal lifestyle, ingredients, travel, finance, and more. Updated regularly with the latest information.',
  path: '/guides',
  type: 'website'
});

export default async function GuidesPage() {
  const guides = getAllGuides();
  const featuredGuides = guides.filter(g => g.featured).slice(0, 3);
  const allGuides = guides.slice(0, 12);
  
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-900 dark:to-neutral-900">
        <div className="container max-w-6xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Halal Lifestyle Guides
          </h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mb-8">
            Comprehensive, regularly updated guides to help you navigate halal living with confidence.
          </p>
          <div className="flex gap-4">
            <Link href="#all-guides" className="btn btn-primary">
              Browse All Guides
            </Link>
            <Link href="/blog" className="btn btn-secondary">
              Read Blog
            </Link>
          </div>
        </div>
      </section>
      
      {/* Featured Guides */}
      {featuredGuides.length > 0 && (
        <section className="py-12 border-b border-neutral-200 dark:border-neutral-800">
          <div className="container max-w-6xl">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">Featured Guides</h2>
              <span className="text-sm text-neutral-500 dark:text-neutral-400">
                ⭐ Most Popular
              </span>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {featuredGuides.map(guide => (
                <ArticleCard
                  key={guide.slug}
                  title={guide.title}
                  description={guide.description}
                  slug={guide.slug} basePath="/guides"
                  category={guide.category}
                  datePublished={guide.dateUpdated || guide.datePublished}
                  size="medium"
                />
              ))}
            </div>
          </div>
        </section>
      )}
      
      {/* All Guides */}
      <section id="all-guides" className="py-16">
        <div className="container max-w-6xl">
          <h2 className="text-2xl font-bold mb-8">All Guides</h2>
          
          {allGuides.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-neutral-600 dark:text-neutral-400">
                Guides coming soon. Check back later!
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {allGuides.map(guide => (
                <ArticleCard
                  key={guide.slug}
                  title={guide.title}
                  description={guide.description}
                  slug={guide.slug} basePath="/guides"
                  category={guide.category}
                  datePublished={guide.dateUpdated || guide.datePublished}
                  size="small"
                />
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* Categories */}
      <section className="py-16 bg-neutral-50 dark:bg-neutral-900/50">
        <div className="container max-w-6xl">
          <h2 className="text-2xl font-bold mb-8">Explore by Topic</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { name: 'Ingredients', href: '/ingredients/gelatin', icon: '🧪' },
              { name: 'Travel', href: '/travel/country/uae', icon: '✈️' },
              { name: 'Restaurants', href: '/restaurants/dubai', icon: '🍽️' },
              { name: 'Finance', href: '/finance', icon: '🏦' },
              { name: 'Real Estate', href: '/real-estate/dubai', icon: '🏡' },
              { name: 'Certification', href: '/certification', icon: '✓' },
            ].map(category => (
              <Link
                key={category.name}
                href={category.href}
                className="flex items-center gap-3 p-4 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:border-primary dark:hover:border-primary transition-colors"
              >
                <span className="text-2xl">{category.icon}</span>
                <span className="font-medium">{category.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
