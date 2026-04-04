"use client";

import { useEffect } from "react";

/**
 * DuplicateTitleCleaner - Removes duplicate H1/H2 titles from article content
 * 
 * Problem: Swift agent sometimes includes the article title as H1 or H2
 * in the article content itself, which duplicates the page's main H1 title.
 * 
 * This component removes any H1/H2 heading in the article content that:
 * - Matches the page's main H1 title (exact or very similar)
 * - Appears within the first 3 headings of the article
 */
export default function DuplicateTitleCleaner() {
  useEffect(() => {
    // Get the main page title (H1)
    const mainTitle = document.querySelector("h1")?.textContent?.trim().toLowerCase();
    if (!mainTitle) return;

    const proseContainer = document.querySelector(".prose-custom");
    if (!proseContainer) return;

    // Find all H1 and H2 headings in the article content
    const headings = proseContainer.querySelectorAll("h1, h2");
    
    // Only check first 3 headings to avoid removing legitimate section titles
    const headingsToCheck = Array.from(headings).slice(0, 3);

    headingsToCheck.forEach((heading) => {
      const headingText = heading.textContent?.trim().toLowerCase();
      
      if (!headingText) return;

      // Check if this heading matches the main title
      // Use fuzzy matching (normalize whitespace, punctuation)
      const normalizedMainTitle = mainTitle.replace(/[^\w\s]/g, '').replace(/\s+/g, ' ');
      const normalizedHeadingText = headingText.replace(/[^\w\s]/g, '').replace(/\s+/g, ' ');

      // If exact match or very similar (>90% similarity)
      if (normalizedHeadingText === normalizedMainTitle || 
          normalizedHeadingText.includes(normalizedMainTitle) ||
          normalizedMainTitle.includes(normalizedHeadingText)) {
        
        console.log(`⚠️ DuplicateTitleCleaner: Found duplicate title in content`);
        console.log(`  → Main title: "${mainTitle}"`);
        console.log(`  → Duplicate: ${heading.tagName} "${headingText}"`);
        
        // Remove the duplicate heading
        heading.remove();
        
        console.log(`✅ DuplicateTitleCleaner: Removed duplicate ${heading.tagName}`);
      }
    });
  }, []);

  return null;
}
