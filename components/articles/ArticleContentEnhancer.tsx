"use client";

import { useEffect } from "react";

/**
 * Client component that automatically adds section pattern classes
 * to article headings and their content based on text content.
 * This provides fallback styling for articles without explicit IDs.
 */
export default function ArticleContentEnhancer() {
  useEffect(() => {
    const article = document.querySelector(".prose-custom");
    if (!article) return;

    const h2Elements = article.querySelectorAll("h2");

    h2Elements.forEach((h2) => {
      const text = h2.textContent?.toLowerCase() || "";
      
      // Get next sibling (could be p, ul, ol, etc.)
      let nextEl = h2.nextElementSibling;
      
      // Pattern 1: Quick Answer / TL;DR
      if (
        text.includes("quick") ||
        text.includes("tldr") ||
        text.includes("tl;dr") ||
        text.includes("summary") ||
        text.includes("in short")
      ) {
        if (!h2.id) h2.id = "quick-answer";
        if (nextEl && nextEl.tagName === "P") {
          nextEl.classList.add("pattern-quick-answer");
        }
      }
      
      // Pattern 2: Key Takeaways
      else if (text.includes("takeaway") || text.includes("key points")) {
        if (!h2.id) h2.id = "key-takeaways";
        h2.classList.add("pattern-takeaway-heading");
        // Find next ul
        while (nextEl && nextEl.tagName !== "UL") {
          nextEl = nextEl.nextElementSibling;
        }
        if (nextEl && nextEl.tagName === "UL") {
          nextEl.classList.add("pattern-takeaway-list");
        }
      }
      
      // Pattern 3: Why This Matters
      else if (text.includes("why") && (text.includes("matter") || text.includes("important"))) {
        if (!h2.id) h2.id = "why-this-matters";
        h2.classList.add("pattern-why-matters");
      }
      
      // Pattern 4: Common Mistakes
      else if (
        text.includes("mistake") ||
        text.includes("error") ||
        text.includes("avoid") ||
        text.includes("misconception")
      ) {
        if (!h2.id) h2.id = "common-mistakes";
        h2.classList.add("pattern-mistakes-heading");
        // Find next ol
        while (nextEl && nextEl.tagName !== "OL") {
          nextEl = nextEl.nextElementSibling;
        }
        if (nextEl && nextEl.tagName === "OL") {
          nextEl.classList.add("pattern-mistakes-list");
        }
      }
      
      // Pattern 5: Keep Learning / References
      else if (
        text.includes("learning") ||
        text.includes("reference") ||
        text.includes("resource") ||
        text.includes("further reading")
      ) {
        if (!h2.id) h2.id = "keep-learning";
        h2.classList.add("pattern-learning-heading");
        // Find next ul
        while (nextEl && nextEl.tagName !== "UL") {
          nextEl = nextEl.nextElementSibling;
        }
        if (nextEl && nextEl.tagName === "UL") {
          nextEl.classList.add("pattern-learning-list");
        }
      }
      
      // Pattern 6: Step-by-Step / How-to
      else if (
        text.includes("step") ||
        text.includes("how to") ||
        text.includes("method") ||
        text.includes("process")
      ) {
        if (!h2.id) h2.id = "step-by-step";
        h2.classList.add("pattern-steps-heading");
        // Find next ol
        while (nextEl && nextEl.tagName !== "OL") {
          nextEl = nextEl.nextElementSibling;
        }
        if (nextEl && nextEl.tagName === "OL") {
          nextEl.classList.add("pattern-steps-list");
        }
      }
      
      // Pattern 7: FAQ
      else if (
        text.includes("faq") ||
        text.includes("frequently asked") ||
        text.includes("common question")
      ) {
        if (!h2.id) h2.id = "faq";
        h2.classList.add("pattern-faq-heading");
      }
      
      // Pattern 8: Practical Tips
      else if (
        (text.includes("practical") || text.includes("pro")) &&
        text.includes("tip")
      ) {
        if (!h2.id) h2.id = "practical-tips";
        h2.classList.add("pattern-tips-heading");
      }
      
      // Pattern 9: Comparison
      else if (
        text.includes("comparison") ||
        text.includes("versus") ||
        text.includes(" vs ") ||
        text.includes(" vs.")
      ) {
        if (!h2.id) h2.id = "comparison";
        h2.classList.add("pattern-comparison-heading");
      }
      
      // Pattern 10: Final CTA / Conclusion
      else if (
        text.includes("final") ||
        text.includes("conclusion") ||
        text.includes("next step") ||
        text.includes("bottom line") ||
        text.includes("wrap")
      ) {
        if (!h2.id) h2.id = "final-thoughts";
        h2.classList.add("pattern-final-heading");
      }
      
      // Pattern: Practical Examples
      else if (text.includes("example") && (text.includes("practical") || text.includes("real"))) {
        if (!h2.id) h2.id = "practical-examples";
        h2.classList.add("pattern-examples-heading");
      }
    });
  }, []);

  return null;
}
