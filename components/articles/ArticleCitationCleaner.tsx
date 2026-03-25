"use client";

import { useEffect } from "react";

/**
 * Cleans up incorrect citation formats from AI-generated content.
 * Converts:
 * - "oai_citation:1†Source" → "[1]"
 * - "oai_citation:2†IFANCA" → "[2]"
 * - Any similar patterns → "[N]"
 * 
 * This runs before ArticleReferencesLinker, which then makes [N] clickable.
 */
export default function ArticleCitationCleaner() {
  useEffect(() => {
    const article = document.querySelector(".prose-custom");
    if (!article) return;

    // Find all text nodes in the article
    const walker = document.createTreeWalker(
      article,
      NodeFilter.SHOW_TEXT,
      null
    );

    const textNodes: Text[] = [];
    let node;
    while ((node = walker.nextNode())) {
      textNodes.push(node as Text);
    }

    // Pattern to match: oai_citation:N†Source or oai_citation:N‡Source (various symbols)
    const citationRegex = /oai_citation:(\d+)[†‡][^\s\n]*/g;

    let replacementsMade = false;

    textNodes.forEach((textNode) => {
      const text = textNode.textContent || "";
      if (!citationRegex.test(text)) return;

      // Reset regex
      citationRegex.lastIndex = 0;

      // Replace all occurrences
      const cleanedText = text.replace(citationRegex, (match, number) => {
        replacementsMade = true;
        return `[${number}]`;
      });

      if (cleanedText !== text) {
        textNode.textContent = cleanedText;
      }
    });

    if (replacementsMade) {
      console.log("ArticleCitationCleaner: Cleaned up oai_citation formats");
    }
  }, []);

  return null;
}
