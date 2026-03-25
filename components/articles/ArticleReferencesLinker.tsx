"use client";

import { useEffect } from "react";

/**
 * Makes inline citations [1], [2], etc. clickable and links them to References section.
 * Opens the References accordion if it's collapsed.
 */
export default function ArticleReferencesLinker() {
  useEffect(() => {
    const article = document.querySelector(".prose-custom");
    if (!article) return;

    // Find References heading to know where to stop
    const referencesHeading = article.querySelector("h2#references, h2[id*='reference']");
    if (!referencesHeading) {
      console.log("ArticleReferencesLinker: References heading not found");
      return;
    }

    // Process all text nodes BEFORE the References section
    const walker = document.createTreeWalker(
      article,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: (node) => {
          // Skip if inside References section
          let parent = node.parentElement;
          while (parent && parent !== article) {
            if (parent.tagName === "H2" && parent.textContent?.toLowerCase().includes("reference")) {
              return NodeFilter.FILTER_REJECT;
            }
            if (parent.classList.contains("references-collapsible")) {
              return NodeFilter.FILTER_REJECT;
            }
            parent = parent.parentElement;
          }
          return NodeFilter.FILTER_ACCEPT;
        },
      }
    );

    const textNodes: Text[] = [];
    let node;
    while ((node = walker.nextNode())) {
      textNodes.push(node as Text);
    }

    // Pattern to match [1], [2], etc. but not [N] in already linked text
    const citationRegex = /\[(\d+)\]/g;

    textNodes.forEach((textNode) => {
      const text = textNode.textContent || "";
      if (!citationRegex.test(text)) return;

      // Reset regex
      citationRegex.lastIndex = 0;

      // Create a document fragment with linked citations
      const fragment = document.createDocumentFragment();
      let lastIndex = 0;
      let match;

      while ((match = citationRegex.exec(text)) !== null) {
        const refNumber = match[1];
        const matchStart = match.index;

        // Add text before the match
        if (matchStart > lastIndex) {
          fragment.appendChild(
            document.createTextNode(text.substring(lastIndex, matchStart))
          );
        }

        // Create clickable link
        const link = document.createElement("a");
        link.href = `#ref-${refNumber}`;
        link.textContent = `[${refNumber}]`;
        link.className = "article-citation-link";
        link.setAttribute("data-ref", refNumber);
        
        // Add click handler to open accordion and scroll
        link.addEventListener("click", (e) => {
          e.preventDefault();
          
          // Find and open the References accordion
          const toggleButton = document.querySelector(".references-toggle") as HTMLButtonElement;
          const contentPanel = document.querySelector(".references-content") as HTMLElement;
          
          if (toggleButton && contentPanel) {
            const isExpanded = toggleButton.getAttribute("aria-expanded") === "true";
            
            if (!isExpanded) {
              // Expand accordion
              toggleButton.setAttribute("aria-expanded", "true");
              contentPanel.style.maxHeight = contentPanel.scrollHeight + "px";
              toggleButton.querySelector(".references-toggle-text")!.textContent = "Hide references";
            }
            
            // Wait for accordion animation, then scroll
            setTimeout(() => {
              const targetCard = document.getElementById(`ref-${refNumber}`);
              if (targetCard) {
                targetCard.scrollIntoView({ behavior: "smooth", block: "center" });
                
                // Highlight the card briefly
                targetCard.style.transition = "all 0.3s ease";
                targetCard.style.boxShadow = "0 4px 16px rgba(244, 185, 66, 0.4)";
                targetCard.style.transform = "scale(1.02)";
                
                setTimeout(() => {
                  targetCard.style.boxShadow = "";
                  targetCard.style.transform = "";
                }, 2000);
              }
            }, isExpanded ? 0 : 300);
          }
        });

        fragment.appendChild(link);
        lastIndex = matchStart + match[0].length;
      }

      // Add remaining text
      if (lastIndex < text.length) {
        fragment.appendChild(document.createTextNode(text.substring(lastIndex)));
      }

      // Replace the text node with the fragment
      textNode.parentNode?.replaceChild(fragment, textNode);
    });
  }, []);

  return null;
}
