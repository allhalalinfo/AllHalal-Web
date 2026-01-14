'use client';

/**
 * Search Provider
 * Manages global search state and Cmd+K shortcut
 */

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import SearchModal from './SearchModal';
import type { SearchResult } from '@/lib/search/types';

interface SearchContextValue {
  isOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  toggleSearch: () => void;
}

const SearchContext = createContext<SearchContextValue | null>(null);

export function useSearch() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within SearchProvider');
  }
  return context;
}

interface SearchProviderProps {
  children: ReactNode;
  searchIndex: SearchResult[];
}

export default function SearchProvider({ children, searchIndex }: SearchProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const openSearch = () => setIsOpen(true);
  const closeSearch = () => setIsOpen(false);
  const toggleSearch = () => setIsOpen(prev => !prev);
  
  // Global Cmd+K / Ctrl+K shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        toggleSearch();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  
  const value: SearchContextValue = {
    isOpen,
    openSearch,
    closeSearch,
    toggleSearch
  };
  
  return (
    <SearchContext.Provider value={value}>
      {children}
      <SearchModal 
        isOpen={isOpen} 
        onClose={closeSearch}
        searchIndex={searchIndex}
      />
    </SearchContext.Provider>
  );
}
