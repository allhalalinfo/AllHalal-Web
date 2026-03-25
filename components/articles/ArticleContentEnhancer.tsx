"use client";

import { useEffect } from "react";

/**
 * Client component that automatically adds section pattern classes
 * to article headings based on their text content.
 * This provides fallback styling for articles without explicit IDs.
 */
export default function ArticleContentEnhancer() {
  useEffect(() => {
    const article = document.querySelector(".prose-custom");
    if (!article) return;

    const h2Elements = article.querySelectorAll("h2");

    h2Elements.forEach((h2) => {
      const text = h2.textContent?.toLowerCase() || "";
      
      // Pattern 1: Quick Answer / TL;DR
      if (
        text.includes("quick") ||
        text.includes("tldr") ||
        text.includes("tl;dr") ||
        text.includes("summary") ||
        text.includes("in short")
      ) {
        if (!h2.id) h2.id = "quick-answer";
      }
      
      // Pattern 2: Key Takeaways
      if (text.includes("takeaway") || text.includes("key points")) {
        if (!h2.id) h2.id = "key-takeaways";
      }
      
      // Pattern 3: Why This Matters
      if (text.includes("why") && (text.includes("matter") || text.includes("important"))) {
        if (!h2.id) h2.id = "why-this-matters";
      }
      
      // Pattern 4: Common Mistakes
      if (
        text.includes("mistake") ||
        text.includes("error") ||
        text.includes("avoid") ||
        text.includes("misconception")
      ) {
        if (!h2.id) h2.id = "common-mistakes";
      }
      
      // Pattern 5: Keep Learning / References
      if (
        text.includes("learning") ||
        text.includes("reference") ||
        text.includes("resource") ||
        text.includes("further reading")
      ) {
        if (!h2.id) h2.id = "keep-learning";
      }
      
      // Pattern 6: Step-by-Step / How-to
      if (
        text.includes("step") ||
        text.includes("how to") ||
        text.includes("method") ||
        text.includes("process")
      ) {
        if (!h2.id) h2.id = "step-by-step";
      }
      
      // Pattern 7: FAQ
      if (
        text.includes("faq") ||
        text.includes("frequently asked") ||
        text.includes("common question")
      ) {
        if (!h2.id) h2.id = "faq";
      }
      
      // Pattern 8: Practical Tips
      if (
        (text.includes("practical") || text.includes("pro")) &&
        text.includes("tip")
      ) {
        if (!h2.id) h2.id = "practical-tips";
      }
      
      // Pattern 9: Comparison
      if (
        text.includes("comparison") ||
        text.includes("versus") ||
        text.includes(" vs ") ||
        text.includes(" vs.")
      ) {
        if (!h2.id) h2.id = "comparison";
      }
      
      // Pattern 10: Final CTA / Conclusion
      if (
        text.includes("final") ||
        text.includes("conclusion") ||
        text.includes("next step") ||
        text.includes("bottom line") ||
        text.includes("wrap")
      ) {
        if (!h2.id) h2.id = "final-thoughts";
      }
      
      // Pattern: Practical Examples
      if (text.includes("example") && text.includes("practical")) {
        if (!h2.id) h2.id = "practical-examples";
      }
    });
  }, []);

  return null;
}
