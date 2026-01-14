/**
 * Search Module
 * Exports all search functionality
 */

export { buildSearchIndex, getSearchIndex, getSearchStats } from './build-index';
export { createSearchClient, search, groupResultsByCategory, getPopularSearches, getSearchSuggestions } from './client';
export type { SearchResult, SearchIndex, SearchOptions } from './types';
