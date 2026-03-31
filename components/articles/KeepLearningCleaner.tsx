"use client";

import { useEffect } from "react";

/**
 * Client Component: removes old "Keep Learning" section from article HTML
 * This prevents duplication with the new server-side RelatedArticles component
 */
export default function KeepLearningCleaner() {
  useEffect(() => {
    // Find all h2 headings with "Keep Learning" text
    const headings = Array.from(document.querySelectorAll("h2, h3"));
    
    headings.forEach((heading) => {
      const text = heading.textContent?.trim().toLowerCase();
      
      if (text === "keep learning") {
        // Find the parent section or container
        let sectionToRemove = heading.closest("section");
        
        if (!sectionToRemove) {
          // If not in a section, remove heading and following content until next heading
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
        } else {
          // Remove the entire section
          sectionToRemove.remove();
        }
      }
    });
  }, []);

  return null;
}
