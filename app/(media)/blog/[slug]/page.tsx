/**
 * Blog Post Page
 * Individual blog post with MDX rendering
 */

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getContentBySlug, getAllContent, getRelatedPosts, renderMDX } from '@/lib/content/mdx';
import { Breadcrumbs } from '@/components/media/layout/Breadcrumbs';
import { ArticleCard } from '@/components/media/cards/ArticleCard';
import { generateMetadata as genMeta } from '@/lib/seo/metadata';
import { generateArticleSchema } from '@/lib/seo/structured-data';
import type { Post } from '@/data/types';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getContentBySlug<Post>('blog', slug);
  
  if (!post) {
    return { title: 'Post Not Found' };
  }
  
  return genMeta({
    title: post.title,
    description: post.description,
    path: `/blog/${slug}`,
    type: 'article',
    image: post.coverImage,
    publishedTime: post.datePublished,
    modifiedTime: post.dateUpdated,
    author: post.author,
    tags: post.tags
  });
}

export async function generateStaticParams() {
  const posts = getAllContent<Post>('blog');
  return posts.map(post => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getContentBySlug<Post>('blog', slug);
  
  if (!post) {
    notFound();
  }
  
  const relatedPosts = getRelatedPosts(slug, post.tags, 3);
  const articleSchema = generateArticleSchema({
    title: post.title,
    description: post.description,
    datePublished: post.datePublished,
    dateModified: post.dateUpdated,
    author: post.author,
    authorUrl: post.authorUrl,
    image: post.coverImage,
    tags: post.tags
  });
  
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
            { label: 'Blog', href: '/blog' },
            { label: post.title, href: `/blog/${slug}` }
          ]}
        />
      </div>
      
      {/* Article Header */}
      <article className="container max-w-4xl py-12">
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full">
              {post.category}
            </span>
            <span className="text-sm text-neutral-500 dark:text-neutral-400">
              {post.readingTime}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {post.title}
          </h1>
          
          <p className="text-xl text-neutral-600 dark:text-neutral-400 mb-6">
            {post.description}
          </p>
          
          <div className="flex items-center gap-4 text-sm text-neutral-500 dark:text-neutral-400">
            <span>By {post.author}</span>
            <span>•</span>
            <time dateTime={post.datePublished}>
              {new Date(post.datePublished).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
            {post.dateUpdated && post.dateUpdated !== post.datePublished && (
              <>
                <span>•</span>
                <span>Updated {new Date(post.dateUpdated).toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric',
                  year: 'numeric'
                })}</span>
              </>
            )}
          </div>
        </header>
        
        {/* Article Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          {await renderMDX(post.content)}
        </div>
        
        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-800">
            <h3 className="text-sm font-semibold text-neutral-500 dark:text-neutral-400 mb-3">
              Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map(tag => (
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
      
      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-neutral-50 dark:bg-neutral-900/50">
          <div className="container max-w-6xl">
            <h2 className="text-2xl font-bold mb-8">Related Posts</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map(related => (
                <ArticleCard
                  key={related.slug}
                  title={related.title}
                  description={related.description}
                  url={`/blog/${related.slug}`}
                  category={related.category}
                  date={related.datePublished}
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
            Explore More Guides
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8">
            Dive deeper into halal lifestyle topics
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/guides" className="btn btn-primary">
              Browse Guides
            </Link>
            <Link href="/blog" className="btn btn-secondary">
              More Posts
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
