"use client";

import { useEffect } from "react";

/**
 * Converts domain-based citations like (ecfr.gov) to numbered format [1], [2], etc.
 * 
 * How it works:
 * 1. Parses References section to extract domains and their order
 * 2. Finds all (domain.com) patterns in article text
 * 3. Replaces them with corresponding [N] based on References order
 * 
 * Example:
 * Text: "Natural flavors can include animals (ecfr.gov)."
 * References: 
 *   FDA / eCFR — 21 CFR 101.22...
 *   FDA — Food Allergen...
 * 
 * Result: "Natural flavors can include animals [1]."
 */
export default function ArticleDomainCitationConverter() {
  useEffect(() => {
    const article = document.querySelector(".prose-custom");
    if (!article) return;

    // STEP 1: Find References section and parse domains
    const referencesHeadings = Array.from(article.querySelectorAll("h2"));
    const referencesH2 = referencesHeadings.find(h2 => {
      const text = h2.textContent?.toLowerCase().trim() || "";
      return text === "references" || text === "reference";
    });

    if (!referencesH2) {
      console.log("ArticleDomainCitationConverter: No References section found");
      return;
    }

    // Collect reference items
    let referenceTexts: string[] = [];
    let currentEl = referencesH2.nextElementSibling;
    
    while (currentEl && currentEl.tagName !== "H2") {
      if (currentEl.tagName === "P") {
        // Paragraph with <br> or newlines
        const html = currentEl.innerHTML;
        const parts = html.split(/<br\s*\/?>/gi);
        referenceTexts = parts
          .map(part => part.trim())
          .filter(part => part.length > 0)
          .map(part => {
            // Extract text content, removing HTML tags
            const temp = document.createElement("div");
            temp.innerHTML = part;
            return temp.textContent || "";
          });
        break;
      } else if (currentEl.tagName === "UL" || currentEl.tagName === "OL") {
        // List format
        const items = currentEl.querySelectorAll("li");
        referenceTexts = Array.from(items).map(li => li.textContent || "");
        break;
      }
      currentEl = currentEl.nextElementSibling;
    }

    if (referenceTexts.length === 0) {
      console.log("ArticleDomainCitationConverter: No references parsed");
      return;
    }

    // STEP 2: Build domain-to-number mapping
    // Extract domains from reference texts (look for links or domain names)
    const domainMap = new Map<string, number>();
    
    console.log("ArticleDomainCitationConverter: Reference texts:", referenceTexts);
    
    referenceTexts.forEach((refText, index) => {
      const refNumber = index + 1;
      
      // Remove [N] prefix if present (from bad format)
      let cleanRefText = refText.replace(/^\[\d+\]\s*/, "");
      
      console.log(`ArticleDomainCitationConverter: Processing ref ${refNumber}: "${cleanRefText}"`);
      
      // Try to extract domain from various formats:
      // 1. Look for common patterns like "ecfr.gov", "fda.gov", "ifanca.org"
      const domainMatches = cleanRefText.match(/([a-z0-9-]+\.[a-z]{2,}(?:\.[a-z]{2,})?)/gi);
      
      if (domainMatches) {
        domainMatches.forEach(domain => {
          const cleanDomain = domain.toLowerCase().trim();
          if (!domainMap.has(cleanDomain)) {
            domainMap.set(cleanDomain, refNumber);
            console.log(`ArticleDomainCitationConverter: Mapped domain "${cleanDomain}" → [${refNumber}]`);
          }
        });
      } else {
        console.warn(`ArticleDomainCitationConverter: No domain found in ref ${refNumber}: "${cleanRefText}"`);
      }
    });

    if (domainMap.size === 0) {
      console.log("ArticleDomainCitationConverter: No domains extracted from references");
      return;
    }

    console.log("ArticleDomainCitationConverter: Domain map:", Array.from(domainMap.entries()));

    // STEP 3: Find and replace (domain.com) in article text
    const walker = document.createTreeWalker(
      article,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: (node) => {
          // Skip References section itself
          let parent = node.parentElement;
          while (parent && parent !== article) {
            if (parent === referencesH2 || (parent.previousElementSibling === referencesH2)) {
              return NodeFilter.FILTER_REJECT;
            }
            parent = parent.parentElement;
          }
          return NodeFilter.FILTER_ACCEPT;
        }
      }
    );

    const textNodes: Text[] = [];
    let node;
    while ((node = walker.nextNode())) {
      textNodes.push(node as Text);
    }

    // Pattern to match: (domain.com) or (subdomain.domain.com)
    const domainCitationRegex = /\(([a-z0-9-]+\.[a-z]{2,}(?:\.[a-z]{2,})?)\)/gi;

    let replacementsMade = false;

    textNodes.forEach((textNode) => {
      let text = textNode.textContent || "";
      
      if (domainCitationRegex.test(text)) {
        domainCitationRegex.lastIndex = 0;
        
        const newText = text.replace(domainCitationRegex, (match, domain) => {
          const cleanDomain = domain.toLowerCase().trim();
          const refNumber = domainMap.get(cleanDomain);
          
          if (refNumber) {
            console.log(`ArticleDomainCitationConverter: Replacing "${match}" with "[${refNumber}]"`);
            replacementsMade = true;
            return `[${refNumber}]`;
          }
          
          // If domain not found in references, keep original
          console.warn(`ArticleDomainCitationConverter: Domain "${cleanDomain}" not found in references, keeping "${match}"`);
          return match;
        });
        
        if (text !== newText) {
          textNode.textContent = newText;
        }
      }
    });

    if (replacementsMade) {
      console.log("ArticleDomainCitationConverter: Converted domain citations to numbered format");
    }
  }, []);

  return null;
}
