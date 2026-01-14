/**
 * Guide Page
 * Individual guide with MDX rendering and evergreen updates
 */

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getContentBySlug, getAllContent, getRelatedPosts, renderMDX } from '@/lib/content/mdx';
import { Breadcrumbs } from '@/components/media/layout/Breadcrumbs';
import { ArticleCard } from '@/components/media/cards/ArticleCard';
import { generateMetadata as genMeta } from '@/lib/seo/metadata';
import { generateArticleSchema } from '@/lib/seo/structured-data';
import type { Guide } from '@/data/types';

interface GuidePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getContentBySlug<Guide>('guides', slug);
  
  if (!guide) {
    return { title: 'Guide Not Found' };
  }
  
  return genMeta({
    title: guide.title,
    description: guide.description,
    path: `/guides/${slug}`,
    type: 'article',
    image: guide.coverImage,
    publishedTime: guide.datePublished,
    modifiedTime: guide.dateUpdated,
    author: guide.author,
    tags: guide.tags
  });
}

export async function generateStaticParams() {
  const guides = getAllContent<Guide>('guides');
  return guides.map(guide => ({ slug: guide.slug }));
}

export default async function GuidePage({ params }: GuidePageProps) {
  const { slug } = await params;
  const guide = getContentBySlug<Guide>('guides', slug);
  
  if (!guide) {
    notFound();
  }
  
  const relatedGuides = getRelatedPosts(slug, guide.tags, 3);
  const articleSchema = generateArticleSchema({
    title: guide.title,
    description: guide.description,
    datePublished: guide.datePublished,
    dateModified: guide.dateUpdated,
    author: guide.author,
    authorUrl: guide.authorUrl,
    image: guide.coverImage,
    tags: guide.tags
  });
  
  const daysSinceUpdate = guide.dateUpdated 
    ? Math.floor((Date.now() - new Date(guide.dateUpdated).getTime()) / (1000 * 60 * 60 * 24))
    : 0;
  
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      
      {/* Breadcrumbs */}
      <div className="container max-w-4xl pt-8">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Guides', href: '/guides' },
            { label: guide.title, href: `/guides/${slug}` }
          ]}
        />
      </div>
      
      {/* Article Header */}
      <article className="container max-w-4xl py-12">
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full">
              {guide.category}
            </span>
            {guide.evergreen && (
              <span className="px-3 py-1 text-sm font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full">
                ⭐ Evergreen
              </span>
            )}
            <span className="text-sm text-neutral-500 dark:text-neutral-400">
              {guide.readingTime}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {guide.title}
          </h1>
          
          <p className="text-xl text-neutral-600 dark:text-neutral-400 mb-6">
            {guide.description}
          </p>
          
          <div className="flex flex-col gap-2 text-sm text-neutral-500 dark:text-neutral-400">
            <div className="flex items-center gap-4">
              <span>By {guide.author}</span>
              {guide.authorRole && (
                <>
                  <span>•</span>
                  <span>{guide.authorRole}</span>
                </>
              )}
            </div>
            <div className="flex items-center gap-4">
              <span>Published {new Date(guide.datePublished).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</span>
              {guide.dateUpdated && guide.dateUpdated !== guide.datePublished && (
                <>
                  <span>•</span>
                  <span className={daysSinceUpdate < 90 ? 'text-green-600 dark:text-green-400 font-medium' : ''}>
                    Last updated {new Date(guide.dateUpdated).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                </>
              )}
            </div>
          </div>
          
          {/* Freshness Indicator */}
          {guide.evergreen && daysSinceUpdate < 90 && (
            <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 rounded-lg">
              <p className="text-sm text-green-800 dark:text-green-300">
                ✓ This guide was recently updated and reflects the latest information.
              </p>
            </div>
          )}
        </header>
        
        {/* Article Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          {await renderMDX(guide.content)}
        </div>
        
        {/* Tags */}
        {guide.tags && guide.tags.length > 0 && (
          <div className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-800">
            <h3 className="text-sm font-semibold text-neutral-500 dark:text-neutral-400 mb-3">
              Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {guide.tags.map(tag => (
                <span
                  key={tag}
                  className="px-3 py-1 text-sm bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </article>
      
      {/* Related Guides */}
      {relatedGuides.length > 0 && (
        <section className="py-16 bg-neutral-50 dark:bg-neutral-900/50">
          <div className="container max-w-6xl">
            <h2 className="text-2xl font-bold mb-8">Related Guides</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedGuides.map(related => (
                <ArticleCard
                  key={related.slug}
                  title={related.title}
                  description={related.description}
                  url={`/guides/${related.slug}`}
                  category={related.category}
                  date={related.dateUpdated || related.datePublished}
                  readingTime={related.readingTime}
                  size="S"
                />
              ))}
            </div>
          </div>
        </section>
      )}
      
      {/* CTA */}
      <section className="py-16 border-t border-neutral-200 dark:border-neutral-800">
        <div className="container max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">
            Use AllHalal App
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8">
            Scan products, check ingredients, and find halal options on the go
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/app" className="btn btn-primary">
              Download App
            </Link>
            <Link href="/guides" className="btn btn-secondary">
              More Guides
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
