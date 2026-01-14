/**
 * MDX Content Loader
 * Reads and parses MDX files with frontmatter
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkGfm from 'remark-gfm';
import type { Post, Guide } from '@/data/types';

const contentDirectory = path.join(process.cwd(), 'content');

/**
 * Get all MDX files in a directory
 */
export function getContentFiles(dir: string): string[] {
  const fullPath = path.join(contentDirectory, dir);
  
  if (!fs.existsSync(fullPath)) {
    return [];
  }
  
  const files = fs.readdirSync(fullPath);
  return files.filter(file => file.endsWith('.mdx') || file.endsWith('.md'));
}

/**
 * Read and parse MDX file
 */
export function getContentBySlug<T>(dir: string, slug: string): (T & { content: string; readingTime: string }) | null {
  try {
    const fullPath = path.join(contentDirectory, dir, `${slug}.mdx`);
    
    // Try .mdx first, then .md
    const filePath = fs.existsSync(fullPath) 
      ? fullPath 
      : path.join(contentDirectory, dir, `${slug}.md`);
    
    if (!fs.existsSync(filePath)) {
      return null;
    }
    
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    const stats = readingTime(content);
    
    return {
      ...data as T,
      content,
      readingTime: stats.text,
    };
  } catch (error) {
    console.error(`Error loading content ${dir}/${slug}:`, error);
    return null;
  }
}

/**
 * Get all content items from a directory
 */
export function getAllContent<T>(dir: string): Array<T & { slug: string; readingTime: string }> {
  const files = getContentFiles(dir);
  
  return files
    .map(file => {
      const slug = file.replace(/\.mdx?$/, '');
      const item = getContentBySlug<T>(dir, slug);
      
      if (!item) return null;
      
      return {
        ...item,
        slug,
      };
    })
    .filter(Boolean) as Array<T & { slug: string; readingTime: string }>;
}

/**
 * Get all posts (blog)
 */
export function getAllPosts() {
  return getAllContent<Post>('blog').sort((a, b) => {
    return new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime();
  });
}

/**
 * Get all guides
 */
export function getAllGuides() {
  return getAllContent<Guide>('guides').sort((a, b) => {
    return new Date(b.dateUpdated || b.datePublished).getTime() - 
           new Date(a.dateUpdated || a.datePublished).getTime();
  });
}

/**
 * Get related posts by tags
 */
export function getRelatedPosts(currentSlug: string, tags: string[], limit: number = 3) {
  const allPosts = getAllPosts();
  
  return allPosts
    .filter(post => post.slug !== currentSlug)
    .map(post => ({
      ...post,
      matchScore: post.tags.filter(tag => tags.includes(tag)).length
    }))
    .filter(post => post.matchScore > 0)
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, limit);
}

/**
 * MDX Components for rendering
 */
export const mdxComponents = {
  // You can customize components here
  h1: (props: any) => <h1 className="text-4xl font-bold mb-6 mt-8" {...props} />,
  h2: (props: any) => <h2 className="text-3xl font-bold mb-4 mt-8" {...props} />,
  h3: (props: any) => <h3 className="text-2xl font-semibold mb-3 mt-6" {...props} />,
  p: (props: any) => <p className="text-lg leading-relaxed mb-4 text-neutral-700 dark:text-neutral-300" {...props} />,
  ul: (props: any) => <ul className="list-disc list-inside mb-4 space-y-2" {...props} />,
  ol: (props: any) => <ol className="list-decimal list-inside mb-4 space-y-2" {...props} />,
  li: (props: any) => <li className="text-lg text-neutral-700 dark:text-neutral-300" {...props} />,
  a: (props: any) => <a className="text-primary hover:underline" {...props} />,
  blockquote: (props: any) => (
    <blockquote className="border-l-4 border-primary pl-4 italic my-4 text-neutral-600 dark:text-neutral-400" {...props} />
  ),
  code: (props: any) => (
    <code className="bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded text-sm font-mono" {...props} />
  ),
  pre: (props: any) => (
    <pre className="bg-neutral-900 dark:bg-neutral-950 rounded-lg p-4 overflow-x-auto my-6" {...props} />
  ),
};

/**
 * Render MDX content
 */
export async function renderMDX(content: string) {
  return MDXRemote({
    source: content,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            {
              behavior: 'wrap',
              properties: {
                className: ['anchor'],
              },
            },
          ],
          [
            rehypePrettyCode,
            {
              theme: 'one-dark-pro',
              keepBackground: true,
            },
          ],
        ],
      },
    },
    components: mdxComponents,
  });
}
