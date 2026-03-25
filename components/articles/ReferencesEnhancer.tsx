"use client";

import { useEffect } from "react";

/**
 * Enhances References section with collapsible accordion
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

    // Create collapsible container
    const container = document.createElement("div");
    container.className = "references-collapsible";

    // Create toggle button
    const toggleButton = document.createElement("button");
    toggleButton.className = "references-toggle";
    toggleButton.setAttribute("aria-expanded", "false");
    toggleButton.innerHTML = `
      <span class="references-toggle-text">Show ${items.length} references</span>
      <svg class="references-toggle-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `;

    // Create content panel (hidden by default)
    const contentPanel = document.createElement("div");
    contentPanel.className = "references-content";
    contentPanel.style.maxHeight = "0";
    contentPanel.style.overflow = "hidden";

    // Create styled list inside panel
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

    contentPanel.appendChild(styledList);

    // Toggle functionality
    toggleButton.addEventListener("click", () => {
      const isExpanded = toggleButton.getAttribute("aria-expanded") === "true";

      if (isExpanded) {
        // Collapse
        toggleButton.setAttribute("aria-expanded", "false");
        contentPanel.style.maxHeight = "0";
        toggleButton.querySelector(".references-toggle-text")!.textContent = `Show ${items.length} references`;
      } else {
        // Expand
        toggleButton.setAttribute("aria-expanded", "true");
        contentPanel.style.maxHeight = contentPanel.scrollHeight + "px";
        toggleButton.querySelector(".references-toggle-text")!.textContent = `Hide references`;
      }
    });

    container.appendChild(toggleButton);
    container.appendChild(contentPanel);

    // Replace original list with collapsible version
    listElement.replaceWith(container);
  }, []);

  return null;
}
