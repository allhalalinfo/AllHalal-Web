/**
 * Media Site Layout
 * Layout for blog, guides, restaurants, real estate, etc.
 * This is inside [locale] group, so it inherits parent layout
 */

import { ReactNode } from 'react';
import Header from "@/components/layout/Header";
import { SearchProvider } from "@/components/media/search";
import { getSearchIndex } from "@/lib/search";

export default function MediaLayout({ children }: { children: ReactNode }) {
  const searchIndex = getSearchIndex();
  
  return (
    <SearchProvider searchIndex={searchIndex.items}>
      <Header />
      {children}
    </SearchProvider>
  );
}
