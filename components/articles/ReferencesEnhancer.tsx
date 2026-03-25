"use client";

import { useEffect } from "react";

/**
 * Enhances References section with collapsible accordion
 */
export default function ReferencesEnhancer() {
  useEffect(() => {
    const article = document.querySelector(".prose-custom");
    if (!article) {
      console.log("ReferencesEnhancer: .prose-custom not found");
      return;
    }

    // Find References heading - ONLY "References", not "Keep Learning"
    let referencesH2: Element | null = null;
    
    const allH2 = article.querySelectorAll("h2");
    for (const h2 of allH2) {
      const text = h2.textContent?.toLowerCase().trim() || "";
      // Match ONLY "References" (not "Keep Learning" or other sections)
      if (text === "references" || text === "reference") {
        referencesH2 = h2;
        console.log("ReferencesEnhancer: Found References heading by exact text match");
        break;
      }
    }

    if (!referencesH2) {
      console.log("ReferencesEnhancer: References heading not found");
      return;
    }

    processReferences(referencesH2);

    function processReferences(heading: Element) {
      // Find content after References heading
      let contentElements: Element[] = [];
      let currentEl = heading.nextElementSibling;
      
      // Collect all elements until next H2
      while (currentEl && currentEl.tagName !== "H2") {
        contentElements.push(currentEl);
        currentEl = currentEl.nextElementSibling;
      }

      if (contentElements.length === 0) return;

      // Check if it's a list or paragraph with line breaks
      let items: Array<{ text: string; html: string }> = [];
      
      const firstEl = contentElements[0];
      if (firstEl.tagName === "OL" || firstEl.tagName === "UL") {
        // List format
        const liElements = firstEl.querySelectorAll("li");
        items = Array.from(liElements).map((li, i) => ({
          text: li.textContent || "",
          html: li.innerHTML,
        }));
      } else if (firstEl.tagName === "P") {
        // Paragraph with line breaks - split by [N]
        const html = firstEl.innerHTML;
        const parts = html.split(/<br\s*\/?>/gi);
        items = parts
          .map(part => part.trim())
          .filter(part => part.length > 0)
          .map((part, i) => ({
            text: part.replace(/<[^>]*>/g, ""),
            html: part,
          }));
      }

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
              card.id = `ref-${index + 1}`; // Add ID for linking

              const content = document.createElement("div");
              content.className = "reference-content";
              
              // Remove [N] from the beginning of the text to avoid duplication
              // (the badge already shows the number)
              let cleanedHtml = item.html.trim();
              cleanedHtml = cleanedHtml.replace(/^\[\d+\]\s*/, ""); // Remove [1], [2], etc. from start
              
              content.innerHTML = cleanedHtml;

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

      // Replace all content elements with collapsible version
      contentElements.forEach(el => el.remove());
      heading.insertAdjacentElement("afterend", container);
    }
  }, []);

  return null;
}
