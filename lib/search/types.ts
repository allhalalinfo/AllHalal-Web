/**
 * Search Types
 */

export interface SearchResult {
  type: 'city' | 'area' | 'ingredient' | 'e-code' | 'developer' | 'country' | 'page';
  slug: string;
  title: string;
  description: string;
  category?: string;
  url: string;
  snippet?: string;
  metadata?: {
    status?: string; // For ingredients: halal/haram/doubtful/depends
    country?: string;
    priceRange?: string;
    muslimPercentage?: number;
  };
}

export interface SearchIndex {
  items: SearchResult[];
  lastUpdated: string;
}

export interface SearchOptions {
  threshold?: number; // Fuse.js threshold (0.0 = exact, 1.0 = match anything)
  limit?: number; // Max results
  categories?: string[]; // Filter by categories
}
