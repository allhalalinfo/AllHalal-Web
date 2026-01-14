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

import { mdxComponents } from './mdx-components';

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
