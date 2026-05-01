"use client";

import Link from "next/link";
import { halalItems } from "@/data/halalItems";

/**
 * RelatedHalalChecks Component
 * 
 * Displays related "Is It Halal?" checks based on article content keywords.
 * Helps with internal linking for SEO and reduces "Crawled - currently not indexed" issues.
 */

interface RelatedHalalChecksProps {
  articleTitle: string;
  articleContent?: string;
  maxItems?: number;
}

export default function RelatedHalalChecks({ 
  articleTitle, 
  articleContent, 
  maxItems = 3 
}: RelatedHalalChecksProps) {
  // Extract keywords from article title and content
  const extractKeywords = (title: string, content?: string): string[] => {
    const text = `${title} ${content || ""}`.toLowerCase();
    const keywords: string[] = [];
    
    // Common food/product keywords to search for
    const foodKeywords = [
      "nutella", "doritos", "skittles", "mcdonalds", "starbucks",
      "kitkat", "oreo", "pepsi", "coca cola", "redbull",
      "gelatin", "alcohol", "wine", "beer", "pork", "bacon",
      "cheese", "milk", "yogurt", "butter", "cream",
      "chocolate", "candy", "gummy", "vitamins", "supplements",
      "cosmetics", "shampoo", "soap", "perfume",
      "medicine", "vaccine", "drug"
    ];
    
    foodKeywords.forEach(keyword => {
      if (text.includes(keyword)) {
        keywords.push(keyword);
      }
    });
    
    return [...new Set(keywords)]; // Remove duplicates
  };
  
  const keywords = extractKeywords(articleTitle, articleContent);
  
  // Find related halal items based on keywords
  const relatedItems = halalItems
    .filter(item => {
      const itemText = `${item.name} ${item.aliases?.join(" ") || ""}`.toLowerCase();
      return keywords.some(keyword => itemText.includes(keyword));
    })
    .slice(0, maxItems);
  
  // If no keyword matches, show high-priority items
  const fallbackItems = relatedItems.length === 0 
    ? halalItems.filter(item => item.priority === "high").slice(0, maxItems)
    : relatedItems;
  
  if (fallbackItems.length === 0) return null;
  
  return (
    <div className="mt-16 border-t border-[rgba(47,37,30,0.08)] pt-12">
      <div className="mb-6">
        <h2 className="text-2xl font-black font-display text-text-primary mb-2">
          Related Halal Checks
        </h2>
        <p className="text-text-secondary">
          Curious about specific products? Check their halal status:
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {fallbackItems.map(item => (
          <Link
            key={item.slug}
            href={`/is-it-halal/${item.slug}`}
            className="group block rounded-2xl border border-[rgba(47,37,30,0.08)] bg-white/80 p-5 transition-all duration-200 hover:border-primary hover:shadow-[0_8px_24px_rgba(75,122,136,0.12)]"
          >
            <div className="mb-3 flex items-start justify-between">
              <h3 className="text-lg font-bold text-text-primary group-hover:text-primary">
                Is {item.name} Halal?
              </h3>
              <span
                className={`inline-block rounded-full px-3 py-1 text-xs font-bold ${
                  item.verdict === "halal"
                    ? "bg-green-500/10 text-green-700 dark:text-green-400"
                    : item.verdict === "haram"
                    ? "bg-red-500/10 text-red-700 dark:text-red-400"
                    : "bg-amber-500/10 text-amber-700 dark:text-amber-400"
                }`}
              >
                {item.verdict.toUpperCase()}
              </span>
            </div>
            <p className="text-sm leading-relaxed text-text-secondary line-clamp-2">
              {item.shortReason}
            </p>
            <div className="mt-4 flex items-center text-sm font-semibold text-primary">
              Read full answer
              <svg
                className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </Link>
        ))}
      </div>
      
      <div className="mt-6 text-center">
        <Link
          href="/is-it-halal"
          className="inline-flex items-center gap-2 rounded-full border border-[rgba(47,37,30,0.15)] bg-white/80 px-6 py-3 font-semibold text-text-primary backdrop-blur-sm transition-all hover:bg-white hover:shadow-md"
        >
          Browse all halal checks
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}
