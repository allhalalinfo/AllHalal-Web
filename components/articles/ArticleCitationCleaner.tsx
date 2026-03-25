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
 * Also cleans link text content: if a link starts with [N], removes everything after.
 * 
 * This ensures full source names are removed, leaving only clean [N] citations.
 * This runs before ArticleReferencesLinker, which then makes [N] clickable.
 */
export default function ArticleCitationCleaner() {
  useEffect(() => {
    const article = document.querySelector(".prose-custom");
    if (!article) return;

    // STEP 1: Clean text nodes
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
    
    // Pattern to match: [N] Multi-word source names and domains
    // Handles: "[8] Food and Drug Administration" and "[5].halal.gov.my"
    // Uses lazy match (.*?) to capture everything until sentence-ending punctuation
    // Stops at: period+space, comma, semicolon, exclamation, question, or newline
    const bracketCitationRegex = /\[(\d+)\](?:\s+|\.).*?(?=\.\s|,|;|!|\?|\n|$)/g;

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

    // STEP 2: Clean link text content
    // If link text starts with [N], keep ONLY [N] and mark as citation
    const links = article.querySelectorAll("a");
    links.forEach((link) => {
      const text = link.textContent || "";
      const match = text.match(/^\[(\d+)\]/);
      if (match) {
        // Link starts with [N]
        if (text.length > match[0].length) {
          // Has extra text after [N] - clean it
          link.textContent = match[0]; // Keep only [N]
          replacementsMade = true;
        }
        // Mark as citation link to prevent button styling
        link.classList.add("citation-link");
      }
    });

    if (replacementsMade) {
      console.log("ArticleCitationCleaner: Cleaned up citation formats");
    }
  }, []);

  return null;
}
