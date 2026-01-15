/**
 * Blog Hub Page
 * Lists all blog posts
 */

import { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts } from '@/lib/content/mdx';
import { ArticleCard } from '@/components/media/cards/ArticleCard';
import { generateMetadata as genMeta } from '@/lib/seo/metadata';

export const metadata: Metadata = genMeta({
  title: 'Blog - AllHalal',
  description: 'Latest news, updates, and insights on halal lifestyle, travel, food, finance, and more.',
  path: '/blog',
  type: 'website'
});

export default async function BlogPage() {
  const posts = getAllPosts();
  const featuredPosts = posts.filter(p => p.featured).slice(0, 3);
  const recentPosts = posts.slice(0, 12);
  
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-900 dark:to-neutral-900">
        <div className="container max-w-6xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            AllHalal Blog
          </h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl">
            Latest news, guides, and insights on living a halal lifestyle with confidence.
          </p>
        </div>
      </section>
      
      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-12 border-b border-neutral-200 dark:border-neutral-800">
          <div className="container max-w-6xl">
            <h2 className="text-2xl font-bold mb-8">Featured</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {featuredPosts.map(post => (
                <ArticleCard
                  key={post.slug}
                  title={post.title}
                  description={post.description}
                  slug={post.slug} basePath="/blog"
                  category={post.category}
                  datePublished={post.datePublished}
                  size="medium"
                />
              ))}
            </div>
          </div>
        </section>
      )}
      
      {/* All Posts */}
      <section className="py-16">
        <div className="container max-w-6xl">
          <h2 className="text-2xl font-bold mb-8">All Posts</h2>
          
          {recentPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-neutral-600 dark:text-neutral-400">
                No posts yet. Check back soon!
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {recentPosts.map(post => (
                <ArticleCard
                  key={post.slug}
                  title={post.title}
                  description={post.description}
                  slug={post.slug} basePath="/blog"
                  category={post.category}
                  datePublished={post.datePublished}
                  size="small"
                />
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-16 bg-neutral-50 dark:bg-neutral-900/50">
        <div className="container max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">
            Stay Updated
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8">
            Get the latest halal lifestyle insights delivered to your inbox
          </p>
          <Link 
            href="/contact"
            className="btn btn-primary"
          >
            Subscribe to Newsletter
          </Link>
        </div>
      </section>
    </div>
  );
}
