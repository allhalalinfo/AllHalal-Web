"use client";

import { useEffect } from "react";

/**
 * Client Component: converts H1 tags inside article content to H2
 * This prevents duplicate H1 tags (one from page header, one from article HTML)
 * Only affects content inside .prose container
 */
export default function ArticleH1Converter() {
  useEffect(() => {
    const proseContainer = document.querySelector(".prose");
    if (!proseContainer) return;

    // Find all H1 tags inside the article content
    const h1Tags = Array.from(proseContainer.querySelectorAll("h1"));
    
    h1Tags.forEach((h1) => {
      // Create a new H2 element
      const h2 = document.createElement("h2");
      
      // Copy all attributes
      Array.from(h1.attributes).forEach((attr) => {
        h2.setAttribute(attr.name, attr.value);
      });
      
      // Copy content
      h2.innerHTML = h1.innerHTML;
      
      // Replace H1 with H2
      h1.replaceWith(h2);
    });
  }, []);

  return null;
}
