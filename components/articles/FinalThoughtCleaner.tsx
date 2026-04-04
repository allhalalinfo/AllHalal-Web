"use client";

import { useEffect } from "react";

/**
 * FinalThoughtCleaner - Removes "Final thought" sections from article content
 * 
 * Problem: Swift agent sometimes adds "Final thought" heading at the end
 * which duplicates the Quick Answer from the beginning, causing visual confusion.
 * 
 * This component removes the entire "Final thought" section including:
 * - The H2 heading
 * - Following paragraph(s) that duplicate Quick Answer content
 */
export default function FinalThoughtCleaner() {
  useEffect(() => {
    const proseContainer = document.querySelector(".prose-custom");
    if (!proseContainer) return;

    const headings = proseContainer.querySelectorAll("h2");

    headings.forEach((heading) => {
      const text = heading.textContent?.trim().toLowerCase();

      // Match "Final thought", "Final thoughts", "Final note" etc.
      if (text?.includes("final") && (text.includes("thought") || text.includes("note"))) {
        console.log("⚠️ FinalThoughtCleaner: Found 'Final thought' section to remove");

        // Strategy 1: Remove the entire section until next H2
        let currentElement: Element | null = heading;
        const elementsToRemove: Element[] = [heading];

        // Collect all elements until next H2 or end
        while (currentElement && currentElement.nextElementSibling) {
          const nextEl = currentElement.nextElementSibling;
          
          // Stop if we hit another H2
          if (nextEl.tagName === "H2") {
            break;
          }

          elementsToRemove.push(nextEl);
          currentElement = nextEl;
        }

        // Remove all collected elements
        elementsToRemove.forEach(el => {
          console.log(`  → Removing: ${el.tagName} "${el.textContent?.slice(0, 50)}..."`);
          el.remove();
        });

        console.log(`✅ FinalThoughtCleaner: Removed ${elementsToRemove.length} elements`);
      }
    });
  }, []);

  return null;
}
