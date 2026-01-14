'use client';

/**
 * Search Modal (Cmd+K)
 * Full-screen search modal with keyboard navigation
 */

import { useEffect, useState, useCallback, useRef } from 'react';
import Link from 'next/link';
import { createSearchClient, search, groupResultsByCategory, getPopularSearches } from '@/lib/search/client';
import type { SearchResult } from '@/lib/search/types';
import { trackEvent } from '@/lib/analytics';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  searchIndex: SearchResult[];
}

export default function SearchModal({ isOpen, onClose, searchIndex }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isSearching, setIsSearching] = useState(false);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const searchClientRef = useRef(createSearchClient(searchIndex));
  
  // Perform search
  const performSearch = useCallback((q: string) => {
    if (!q || q.trim().length < 2) {
      setResults([]);
      setSelectedIndex(0);
      return;
    }
    
    setIsSearching(true);
    
    // Debounce search
    setTimeout(() => {
      const searchResults = search(searchClientRef.current, q, { limit: 15 });
      setResults(searchResults);
      setSelectedIndex(0);
      setIsSearching(false);
      
      // Track search
      trackEvent('search_query', { query: q, results: searchResults.length });
    }, 150);
  }, []);
  
  // Handle query change
  useEffect(() => {
    performSearch(query);
  }, [query, performSearch]);
  
  // Handle keyboard shortcuts
  useEffect(() => {
    if (!isOpen) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      // Close on Escape
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      
      // Navigate with arrows
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => Math.max(prev - 1, 0));
      }
      
      // Select with Enter
      if (e.key === 'Enter' && results[selectedIndex]) {
        window.location.href = results[selectedIndex].url;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, results, selectedIndex]);
  
  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      trackEvent('search_open', {});
    }
  }, [isOpen]);
  
  // Scroll selected item into view
  useEffect(() => {
    if (resultsRef.current) {
      const selectedElement = resultsRef.current.children[selectedIndex] as HTMLElement;
      selectedElement?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }, [selectedIndex]);
  
  if (!isOpen) return null;
  
  const groupedResults = groupResultsByCategory(results);
  const popularSearches = getPopularSearches();
  
  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-2xl mx-4 bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-neutral-200 dark:border-neutral-800">
          <svg className="w-5 h-5 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search restaurants, ingredients, real estate..."
            className="flex-1 text-lg bg-transparent border-none outline-none text-neutral-900 dark:text-white placeholder:text-neutral-400"
            autoComplete="off"
          />
          
          {isSearching && (
            <div className="w-4 h-4 border-2 border-neutral-300 border-t-neutral-600 rounded-full animate-spin" />
          )}
          
          <kbd className="hidden sm:block px-2 py-1 text-xs font-semibold text-neutral-600 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800 rounded">
            ESC
          </kbd>
        </div>
        
        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto" ref={resultsRef}>
          {/* Show popular searches if no query */}
          {!query && (
            <div className="p-6">
              <p className="text-sm font-semibold text-neutral-500 dark:text-neutral-400 mb-3">
                Popular Searches
              </p>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((term, i) => (
                  <button
                    key={i}
                    onClick={() => setQuery(term)}
                    className="px-3 py-1.5 text-sm text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Show results grouped by category */}
          {query && results.length > 0 && (
            <div>
              {Object.entries(groupedResults).map(([category, items]) => (
                <div key={category} className="py-2">
                  <p className="px-6 py-2 text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wide">
                    {category}
                  </p>
                  {items.map((result, index) => {
                    const globalIndex = results.indexOf(result);
                    const isSelected = globalIndex === selectedIndex;
                    
                    return (
                      <Link
                        key={result.url}
                        href={result.url}
                        onClick={() => {
                          trackEvent('search_result_click', {
                            query,
                            url: result.url,
                            position: globalIndex
                          });
                          onClose();
                        }}
                        className={`block px-6 py-3 transition-colors ${
                          isSelected
                            ? 'bg-neutral-100 dark:bg-neutral-800'
                            : 'hover:bg-neutral-50 dark:hover:bg-neutral-800/50'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-medium text-neutral-900 dark:text-white truncate">
                              {result.title}
                            </h3>
                            <p className="mt-0.5 text-sm text-neutral-500 dark:text-neutral-400 line-clamp-1">
                              {result.description}
                            </p>
                          </div>
                          
                          {result.snippet && (
                            <span className="flex-shrink-0 text-xs font-medium text-neutral-600 dark:text-neutral-400">
                              {result.snippet}
                            </span>
                          )}
                        </div>
                        
                        <p className="mt-1 text-xs text-neutral-400 dark:text-neutral-500 truncate">
                          {result.url}
                        </p>
                      </Link>
                    );
                  })}
                </div>
              ))}
            </div>
          )}
          
          {/* No results */}
          {query && query.length >= 2 && results.length === 0 && !isSearching && (
            <div className="p-12 text-center">
              <svg className="w-12 h-12 mx-auto text-neutral-300 dark:text-neutral-700 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-neutral-600 dark:text-neutral-400 font-medium">
                No results found for "{query}"
              </p>
              <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-500">
                Try different keywords or browse popular searches above
              </p>
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="px-6 py-3 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50">
          <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <kbd className="px-1.5 py-0.5 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded text-[10px]">↑</kbd>
                <kbd className="px-1.5 py-0.5 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded text-[10px]">↓</kbd>
                to navigate
              </span>
              <span className="flex items-center gap-1.5">
                <kbd className="px-1.5 py-0.5 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded text-[10px]">↵</kbd>
                to select
              </span>
            </div>
            <span>
              {results.length > 0 && `${results.length} results`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
