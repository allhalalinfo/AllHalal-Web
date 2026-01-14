/**
 * Article Card Component
 * Reusable card for blog posts, guides, and other articles
 */

import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, User } from 'lucide-react';

interface ArticleCardProps {
  /**
   * Article title
   */
  title: string;
  
  /**
   * Article description/excerpt
   */
  description: string;
  
  /**
   * URL slug
   */
  slug: string;
  
  /**
   * Base path (e.g., '/blog', '/guides')
   */
  basePath: string;
  
  /**
   * Cover image URL
   */
  coverImage?: string;
  
  /**
   * Author name
   */
  author?: string;
  
  /**
   * Published date (ISO 8601 or formatted string)
   */
  datePublished?: string;
  
  /**
   * Read time in minutes
   */
  readTime?: number;
  
  /**
   * Category
   */
  category?: string;
  
  /**
   * Tags
   */
  tags?: string[];
  
  /**
   * Card size variant
   */
  size?: 'small' | 'medium' | 'large';
  
  /**
   * Layout variant
   */
  variant?: 'vertical' | 'horizontal';
  
  /**
   * Show featured badge
   */
  featured?: boolean;
  
  /**
   * Show editors' pick badge
   */
  editorsPick?: boolean;
}

export function ArticleCard({
  title,
  description,
  slug,
  basePath,
  coverImage,
  author,
  datePublished,
  readTime,
  category,
  tags,
  size = 'medium',
  variant = 'vertical',
  featured = false,
  editorsPick = false
}: ArticleCardProps) {
  const href = `${basePath}/${slug}`;
  
  // Format date if needed
  const formattedDate = datePublished
    ? new Date(datePublished).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    : null;
  
  // Size-specific styles
  const sizeStyles = {
    small: {
      container: 'max-w-sm',
      image: 'h-48',
      title: 'text-lg',
      description: 'text-sm line-clamp-2'
    },
    medium: {
      container: 'max-w-md',
      image: 'h-56',
      title: 'text-xl',
      description: 'text-base line-clamp-3'
    },
    large: {
      container: 'max-w-2xl',
      image: 'h-72',
      title: 'text-2xl md:text-3xl',
      description: 'text-lg line-clamp-4'
    }
  };
  
  const currentSize = sizeStyles[size];
  
  if (variant === 'horizontal') {
    return (
      <Link
        href={href}
        className="group block overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:shadow-lg transition-shadow"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Image */}
          {coverImage && (
            <div className="relative md:col-span-1 h-48 md:h-full overflow-hidden">
              <Image
                src={coverImage}
                alt={title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {(featured || editorsPick) && (
                <div className="absolute top-2 left-2">
                  {featured && (
                    <span className="inline-block px-2 py-1 text-xs font-semibold text-white bg-gradient-to-r from-yellow-500 to-orange-500 rounded">
                      Featured
                    </span>
                  )}
                  {editorsPick && (
                    <span className="inline-block px-2 py-1 text-xs font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded ml-1">
                      Editor's Pick
                    </span>
                  )}
                </div>
              )}
            </div>
          )}
          
          {/* Content */}
          <div className="md:col-span-2 p-6">
            {category && (
              <span className="inline-block text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide mb-2">
                {category}
              </span>
            )}
            
            <h3 className={`font-bold text-gray-900 dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors ${currentSize.title}`}>
              {title}
            </h3>
            
            <p className={`text-gray-600 dark:text-gray-400 mb-4 ${currentSize.description}`}>
              {description}
            </p>
            
            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-500">
              {author && (
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>{author}</span>
                </div>
              )}
              
              {formattedDate && (
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{formattedDate}</span>
                </div>
              )}
              
              {readTime && (
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{readTime} min read</span>
                </div>
              )}
            </div>
            
            {/* Tags */}
            {tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {tags.slice(0, 3).map(tag => (
                  <span
                    key={tag}
                    className="inline-block px-2 py-1 text-xs text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </Link>
    );
  }
  
  // Vertical variant (default)
  return (
    <Link
      href={href}
      className={`group block overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:shadow-lg transition-shadow ${currentSize.container}`}
    >
      {/* Image */}
      {coverImage && (
        <div className={`relative ${currentSize.image} overflow-hidden`}>
          <Image
            src={coverImage}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {(featured || editorsPick) && (
            <div className="absolute top-2 left-2">
              {featured && (
                <span className="inline-block px-2 py-1 text-xs font-semibold text-white bg-gradient-to-r from-yellow-500 to-orange-500 rounded">
                  Featured
                </span>
              )}
              {editorsPick && (
                <span className="inline-block px-2 py-1 text-xs font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded ml-1">
                  Editor's Pick
                </span>
              )}
            </div>
          )}
        </div>
      )}
      
      {/* Content */}
      <div className="p-6">
        {category && (
          <span className="inline-block text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide mb-2">
            {category}
          </span>
        )}
        
        <h3 className={`font-bold text-gray-900 dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors ${currentSize.title}`}>
          {title}
        </h3>
        
        <p className={`text-gray-600 dark:text-gray-400 mb-4 ${currentSize.description}`}>
          {description}
        </p>
        
        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-500">
          {author && (
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>{author}</span>
            </div>
          )}
          
          {formattedDate && (
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{formattedDate}</span>
            </div>
          )}
          
          {readTime && (
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{readTime} min</span>
            </div>
          )}
        </div>
        
        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {tags.slice(0, 3).map(tag => (
              <span
                key={tag}
                className="inline-block px-2 py-1 text-xs text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
