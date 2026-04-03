"use client";

import { useEffect } from "react";

/**
 * Client Component: removes old "Keep Learning" section from article HTML
 * This prevents duplication with the new server-side RelatedArticles component
 * 
 * IMPORTANT: Only removes old sections from article content (inside .prose div),
 * NOT the new server-side RelatedArticles section (which is outside .prose)
 */
export default function KeepLearningCleaner() {
  useEffect(() => {
    // Only search within the article prose content, not the entire page
    const proseContainer = document.querySelector(".prose");
    if (!proseContainer) return;

    // Find all h2/h3 headings with "Keep Learning" text inside the prose container
    const headings = Array.from(proseContainer.querySelectorAll("h2, h3"));
    
    headings.forEach((heading) => {
      const text = heading.textContent?.trim().toLowerCase();
      
      if (text === "keep learning") {
        // Strategy 1: Check if heading is inside a wrapper div (common pattern)
        const wrapperDiv = heading.closest("div.pattern-learning-list, div[class*='learning'], div[class*='keep-learning']");
        if (wrapperDiv && proseContainer.contains(wrapperDiv)) {
          wrapperDiv.remove();
          return;
        }
        
        // Strategy 2: Find the parent section
        let sectionToRemove = heading.closest("section");
        
        if (sectionToRemove && proseContainer.contains(sectionToRemove)) {
          sectionToRemove.remove();
          return;
        }
        
        // Strategy 3: Remove heading and following content until next heading
        const parent = heading.parentElement;
        if (parent) {
          let currentNode: ChildNode | null = heading.nextSibling;
          const nodesToRemove: ChildNode[] = [heading];
          
          while (currentNode) {
            const nextSibling = currentNode.nextSibling;
            
            // Stop if we hit another heading or major section
            if (
              currentNode.nodeType === Node.ELEMENT_NODE &&
              (currentNode as Element).matches("h1, h2, h3, section, footer")
            ) {
              break;
            }
            
            nodesToRemove.push(currentNode);
            currentNode = nextSibling;
          }
          
          // Remove all collected nodes
          nodesToRemove.forEach((node) => {
            if (node.parentNode) {
              node.parentNode.removeChild(node);
            }
          });
        }
      }
    });
  }, []);

  return null;
}
