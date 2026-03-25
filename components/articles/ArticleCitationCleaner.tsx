"use client";

import { useEffect } from "react";

/**
 * Cleans up incorrect citation formats from AI-generated content.
 * Converts:
 * - "oai_citation:1†Source" → "[1]"
 * - "oai_citation:2†IFANCA" → "[2]"
 * - "oai_citation:3† Food and Drug Administration" → "[3]"
 * - "[5] halal.gov.my" → "[5]"
 * - "[2] FDA" → "[2]"
 * - Any similar patterns → "[N]"
 * 
 * Two regex patterns:
 * 1. oai_citation format: captures everything including spaces until punctuation
 * 2. [N] SourceName format: captures citation number + space + word/domain
 * 
 * This ensures full source names are removed, leaving only clean [N] citations.
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
    // Captures everything until period, comma, or end of sentence
    const oaiCitationRegex = /oai_citation:(\d+)[†‡][^.,:;!\n?]*/g;
    
    // Pattern to match: [N] SourceName OR [N].domain.com (both formats)
    // Handles both: "[5] halal.gov.my" and "[11].halal.gov.my"
    // After bracket, can be space(s) OR dot, then captures full domain/word
    const bracketCitationRegex = /\[(\d+)\](?:\s+|\.)[^\s,:;!\n?]+(?:\.[^\s,:;!\n?]+)*/g;

    let replacementsMade = false;

    textNodes.forEach((textNode) => {
      let text = textNode.textContent || "";
      let modified = false;
      
      // Clean oai_citation format
      if (oaiCitationRegex.test(text)) {
        oaiCitationRegex.lastIndex = 0;
        text = text.replace(oaiCitationRegex, (match, number) => {
          modified = true;
          return `[${number}]`;
        });
      }
      
      // Clean [N] SourceName format
      if (bracketCitationRegex.test(text)) {
        bracketCitationRegex.lastIndex = 0;
        text = text.replace(bracketCitationRegex, (match, number) => {
          modified = true;
          return `[${number}]`;
        });
      }

      if (modified) {
        textNode.textContent = text;
        replacementsMade = true;
      }
    });

    if (replacementsMade) {
      console.log("ArticleCitationCleaner: Cleaned up citation formats");
    }
  }, []);

  return null;
}
