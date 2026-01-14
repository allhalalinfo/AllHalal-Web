'use client';

/**
 * FAQ Accordion Component
 * Accessible accordion with structured data for SEO
 */

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { generateFAQPageLD } from '@/lib/seo/structured-data';
import type { FAQItem } from '@/data/types';

interface FAQAccordionProps {
  /**
   * FAQ items
   */
  items: FAQItem[];
  
  /**
   * Allow multiple items open at once
   */
  allowMultiple?: boolean;
  
  /**
   * Include structured data (JSON-LD)
   */
  includeStructuredData?: boolean;
  
  /**
   * Custom class names
   */
  className?: string;
}

export function FAQAccordion({
  items,
  allowMultiple = false,
  includeStructuredData = true,
  className = ''
}: FAQAccordionProps) {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());
  
  const toggleItem = (index: number) => {
    setOpenItems(prev => {
      const newSet = new Set(prev);
      
      if (newSet.has(index)) {
        // Close this item
        newSet.delete(index);
      } else {
        // Open this item
        if (!allowMultiple) {
          // Close all others
          newSet.clear();
        }
        newSet.add(index);
      }
      
      return newSet;
    });
  };
  
  const structuredData = includeStructuredData ? generateFAQPageLD(items) : null;
  
  return (
    <>
      {/* Structured Data (JSON-LD) */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              ...structuredData
            })
          }}
        />
      )}
      
      {/* FAQ UI */}
      <div className={`space-y-4 ${className}`}>
        {items.map((item, index) => {
          const isOpen = openItems.has(index);
          
          return (
            <div
              key={index}
              className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden bg-white dark:bg-gray-900"
            >
              {/* Question Button */}
              <button
                onClick={() => toggleItem(index)}
                className="w-full flex items-center justify-between p-4 md:p-6 text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${index}`}
              >
                <span className="font-semibold text-gray-900 dark:text-white pr-8">
                  {item.question}
                </span>
                
                <ChevronDown
                  className={`h-5 w-5 text-gray-500 flex-shrink-0 transition-transform ${
                    isOpen ? 'transform rotate-180' : ''
                  }`}
                  aria-hidden="true"
                />
              </button>
              
              {/* Answer Panel */}
              {isOpen && (
                <div
                  id={`faq-answer-${index}`}
                  className="px-4 md:px-6 pb-4 md:pb-6"
                  role="region"
                  aria-labelledby={`faq-question-${index}`}
                >
                  <div
                    className="text-gray-600 dark:text-gray-400 prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: item.answer }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
