'use client';

/**
 * Search Button (Cmd+K trigger)
 * Displays in header/navbar
 */

import { useEffect, useState } from 'react';

interface SearchButtonProps {
  onClick: () => void;
}

export default function SearchButton({ onClick }: SearchButtonProps) {
  const [isMac, setIsMac] = useState(false);
  
  useEffect(() => {
    setIsMac(navigator.platform.toLowerCase().includes('mac'));
  }, []);
  
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 px-4 py-2 text-sm text-neutral-600 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors w-full sm:w-64"
    >
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      
      <span className="flex-1 text-left">Search...</span>
      
      <kbd className="hidden sm:inline-flex px-2 py-0.5 text-xs font-semibold bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded">
        {isMac ? '⌘' : 'Ctrl'} K
      </kbd>
    </button>
  );
}
