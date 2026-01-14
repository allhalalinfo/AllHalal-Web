'use client';

/**
 * Breadcrumbs Component
 * SEO-friendly breadcrumb navigation with structured data
 */

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { getBreadcrumbs, generateBreadcrumbStructuredData } from '@/lib/seo/breadcrumbs';

interface BreadcrumbsProps {
  /**
   * Custom breadcrumb items (overrides auto-generation)
   */
  items?: Array<{
    label: string;
    href: string;
  }>;
  
  /**
   * Show home icon instead of "Home" text
   */
  homeIcon?: boolean;
  
  /**
   * Custom class names
   */
  className?: string;
}

export function Breadcrumbs({ items, homeIcon = true, className = '' }: BreadcrumbsProps) {
  const pathname = usePathname();
  
  // Use custom items or auto-generate from path
  const breadcrumbs = items || getBreadcrumbs(pathname || '/');
  
  // Generate structured data
  const structuredData = generateBreadcrumbStructuredData(breadcrumbs);
  
  if (breadcrumbs.length <= 1) {
    // Don't show breadcrumbs on homepage or single-level pages
    return null;
  }
  
  return (
    <>
      {/* Structured Data (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: structuredData }}
      />
      
      {/* Breadcrumbs UI */}
      <nav
        aria-label="Breadcrumb"
        className={`flex items-center space-x-2 text-sm ${className}`}
      >
        <ol className="flex items-center space-x-2">
          {breadcrumbs.map((crumb, index) => {
            const isLast = index === breadcrumbs.length - 1;
            const isHome = index === 0;
            
            return (
              <li key={crumb.href} className="flex items-center">
                {index > 0 && (
                  <ChevronRight
                    className="mx-2 h-4 w-4 text-gray-400"
                    aria-hidden="true"
                  />
                )}
                
                {isLast ? (
                  // Current page (not a link)
                  <span
                    className="font-medium text-gray-900 dark:text-gray-100"
                    aria-current="page"
                  >
                    {isHome && homeIcon ? (
                      <Home className="h-4 w-4" aria-label="Home" />
                    ) : (
                      crumb.label
                    )}
                  </span>
                ) : (
                  // Link to previous pages
                  <Link
                    href={crumb.href}
                    className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
                  >
                    {isHome && homeIcon ? (
                      <Home className="h-4 w-4" aria-label="Home" />
                    ) : (
                      crumb.label
                    )}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
