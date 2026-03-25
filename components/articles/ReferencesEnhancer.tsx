"use client";

import { useEffect } from "react";

/**
 * Enhances References section with beautiful card styling
 */
export default function ReferencesEnhancer() {
  useEffect(() => {
    const article = document.querySelector(".prose-custom");
    if (!article) return;

    // Find References heading
    const referencesH2 = article.querySelector(
      "h2#references, h2.pattern-learning-heading, h2[id*='reference']"
    );
    if (!referencesH2) return;

    // Find the list after References heading (could be ul or ol)
    let listElement = referencesH2.nextElementSibling;
    while (listElement && listElement.tagName !== "UL" && listElement.tagName !== "OL") {
      listElement = listElement.nextElementSibling;
      if (listElement?.tagName === "H2") break; // Stop at next heading
    }

    if (!listElement || (listElement.tagName !== "UL" && listElement.tagName !== "OL")) return;

    // Get all list items
    const items = Array.from(listElement.querySelectorAll("li"));
    if (items.length === 0) return;

    // Create new styled list
    const styledList = document.createElement("div");
    styledList.className = "references-list";

    items.forEach((item, index) => {
      const card = document.createElement("div");
      card.className = "reference-card";
      card.setAttribute("data-index", (index + 1).toString());

      // Extract text and links
      const content = document.createElement("div");
      content.className = "reference-content";
      content.innerHTML = item.innerHTML;

      card.appendChild(content);
      styledList.appendChild(card);
    });

    // Replace original list with styled version
    listElement.replaceWith(styledList);
  }, []);

  return null;
}
