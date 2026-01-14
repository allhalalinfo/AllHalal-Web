/**
 * Search Client
 * Client-side search using Fuse.js
 */

import Fuse from 'fuse.js';
import type { SearchResult, SearchOptions } from './types';

/**
 * Create Fuse.js instance
 */
export function createSearchClient(items: SearchResult[]) {
  const options: Fuse.IFuseOptions<SearchResult> = {
    keys: [
      { name: 'title', weight: 2 },
      { name: 'description', weight: 1 },
      { name: 'category', weight: 0.5 },
      { name: 'snippet', weight: 0.5 }
    ],
    threshold: 0.3, // 0.0 = exact match, 1.0 = match anything
    includeScore: true,
    includeMatches: true,
    minMatchCharLength: 2,
    ignoreLocation: true, // Search in entire string
    useExtendedSearch: false
  };
  
  return new Fuse(items, options);
}

/**
 * Search function
 */
export function search(
  client: Fuse<SearchResult>,
  query: string,
  options: SearchOptions = {}
): SearchResult[] {
  if (!query || query.trim().length < 2) {
    return [];
  }
  
  const { limit = 20, categories } = options;
  
  // Perform search
  let results = client.search(query, { limit: limit * 2 }); // Get more to filter
  
  // Filter by categories if specified
  if (categories && categories.length > 0) {
    results = results.filter(result => 
      result.item.category && categories.includes(result.item.category)
    );
  }
  
  // Extract items and limit
  return results
    .slice(0, limit)
    .map(result => result.item);
}

/**
 * Group results by category
 */
export function groupResultsByCategory(results: SearchResult[]): Record<string, SearchResult[]> {
  const grouped: Record<string, SearchResult[]> = {};
  
  results.forEach(result => {
    const category = result.category || 'Other';
    if (!grouped[category]) {
      grouped[category] = [];
    }
    grouped[category].push(result);
  });
  
  return grouped;
}

/**
 * Get popular searches (placeholder for future analytics integration)
 */
export function getPopularSearches(): string[] {
  return [
    'gelatin',
    'Dubai restaurants',
    'Downtown Dubai',
    'E120',
    'Murabaha',
    'London halal',
    'Carmine',
    'Palm Jumeirah'
  ];
}

/**
 * Get search suggestions based on query
 */
export function getSearchSuggestions(
  items: SearchResult[],
  query: string,
  limit: number = 5
): string[] {
  if (!query || query.trim().length < 2) {
    return getPopularSearches().slice(0, limit);
  }
  
  const lowerQuery = query.toLowerCase();
  
  // Find items that match
  const matches = items
    .filter(item => 
      item.title.toLowerCase().includes(lowerQuery) ||
      item.description.toLowerCase().includes(lowerQuery)
    )
    .slice(0, limit)
    .map(item => item.title);
  
  return matches;
}
