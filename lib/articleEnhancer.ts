/**
 * Server-side article content enhancement utilities
 * Moved from client-side ArticleContentEnhancer for better performance
 * 
 * These functions transform HTML content by adding semantic classes and IDs
 * based on heading text patterns, preventing client-side DOM manipulation
 */

import { parse } from 'node-html-parser';

/**
 * Enhanced HTML content with pattern classes and IDs
 */
export function enhanceArticleHTML(html: string): string {
  if (!html) return html;

  const root = parse(html);
  const h2Elements = root.querySelectorAll('h2');

  h2Elements.forEach((h2) => {
    const text = h2.textContent.toLowerCase();
    let nextEl = h2.nextElementSibling;

    // Pattern 1: Quick Answer / TL;DR
    if (
      text.includes('quick') ||
      text.includes('tldr') ||
      text.includes('tl;dr') ||
      text.includes('summary') ||
      text.includes('in short')
    ) {
      if (!h2.getAttribute('id')) h2.setAttribute('id', 'quick-answer');
      if (nextEl && nextEl.tagName === 'P') {
        const classes = nextEl.getAttribute('class') || '';
        nextEl.setAttribute('class', `${classes} pattern-quick-answer`.trim());
      }
    }
    // Pattern 2: Key Takeaways
    else if (text.includes('takeaway') || text.includes('key points')) {
      if (!h2.getAttribute('id')) h2.setAttribute('id', 'key-takeaways');
      const h2Classes = h2.getAttribute('class') || '';
      h2.setAttribute('class', `${h2Classes} pattern-takeaway-heading`.trim());
      
      while (nextEl && nextEl.tagName !== 'UL') {
        nextEl = nextEl.nextElementSibling;
      }
      if (nextEl && nextEl.tagName === 'UL') {
        const classes = nextEl.getAttribute('class') || '';
        nextEl.setAttribute('class', `${classes} pattern-takeaway-list`.trim());
      }
    }
    // Pattern 3: Why This Matters
    else if (text.includes('why') && (text.includes('matter') || text.includes('important'))) {
      if (!h2.getAttribute('id')) h2.setAttribute('id', 'why-this-matters');
      const classes = h2.getAttribute('class') || '';
      h2.setAttribute('class', `${classes} pattern-why-matters`.trim());
    }
    // Pattern 4: Common Mistakes
    else if (
      text.includes('mistake') ||
      text.includes('error') ||
      text.includes('avoid') ||
      text.includes('misconception')
    ) {
      if (!h2.getAttribute('id')) h2.setAttribute('id', 'common-mistakes');
      const classes = h2.getAttribute('class') || '';
      h2.setAttribute('class', `${classes} pattern-mistakes-heading`.trim());
      
      while (nextEl && nextEl.tagName !== 'OL') {
        nextEl = nextEl.nextElementSibling;
      }
      if (nextEl && nextEl.tagName === 'OL') {
        const olClasses = nextEl.getAttribute('class') || '';
        nextEl.setAttribute('class', `${olClasses} pattern-mistakes-list`.trim());
      }
    }
    // Pattern 5: Keep Learning / References
    else if (
      text.includes('learning') ||
      text.includes('reference') ||
      text.includes('resource') ||
      text.includes('further reading')
    ) {
      if (!h2.getAttribute('id')) h2.setAttribute('id', 'keep-learning');
      const classes = h2.getAttribute('class') || '';
      h2.setAttribute('class', `${classes} pattern-learning-heading`.trim());
      
      while (nextEl && nextEl.tagName !== 'UL') {
        nextEl = nextEl.nextElementSibling;
      }
      if (nextEl && nextEl.tagName === 'UL') {
        const ulClasses = nextEl.getAttribute('class') || '';
        nextEl.setAttribute('class', `${ulClasses} pattern-learning-list`.trim());
      }
    }
    // Pattern 6: Step-by-Step / How-to
    else if (
      text.includes('step') ||
      text.includes('how to') ||
      text.includes('method') ||
      text.includes('process')
    ) {
      if (!h2.getAttribute('id')) h2.setAttribute('id', 'step-by-step');
      const classes = h2.getAttribute('class') || '';
      h2.setAttribute('class', `${classes} pattern-steps-heading`.trim());
      
      while (nextEl && nextEl.tagName !== 'OL') {
        nextEl = nextEl.nextElementSibling;
      }
      if (nextEl && nextEl.tagName === 'OL') {
        const olClasses = nextEl.getAttribute('class') || '';
        nextEl.setAttribute('class', `${olClasses} pattern-steps-list`.trim());
      }
    }
    // Pattern 7: FAQ
    else if (
      text.includes('faq') ||
      text.includes('frequently asked') ||
      text.includes('common question')
    ) {
      if (!h2.getAttribute('id')) h2.setAttribute('id', 'faq');
      const classes = h2.getAttribute('class') || '';
      h2.setAttribute('class', `${classes} pattern-faq-heading`.trim());
    }
    // Pattern 8: Practical Tips
    else if ((text.includes('practical') || text.includes('pro')) && text.includes('tip')) {
      if (!h2.getAttribute('id')) h2.setAttribute('id', 'practical-tips');
      const classes = h2.getAttribute('class') || '';
      h2.setAttribute('class', `${classes} pattern-tips-heading`.trim());
    }
    // Pattern 9: Comparison
    else if (
      text.includes('comparison') ||
      text.includes('versus') ||
      text.includes(' vs ') ||
      text.includes(' vs.')
    ) {
      if (!h2.getAttribute('id')) h2.setAttribute('id', 'comparison');
      const classes = h2.getAttribute('class') || '';
      h2.setAttribute('class', `${classes} pattern-comparison-heading`.trim());
    }
    // Pattern 10: Final CTA / Conclusion
    else if (
      text.includes('final') ||
      text.includes('conclusion') ||
      text.includes('next step') ||
      text.includes('bottom line') ||
      text.includes('wrap')
    ) {
      if (!h2.getAttribute('id')) h2.setAttribute('id', 'final-thoughts');
      const classes = h2.getAttribute('class') || '';
      h2.setAttribute('class', `${classes} pattern-final-heading`.trim());
    }
    // Pattern 11: Practical Examples
    else if (text.includes('example') && (text.includes('practical') || text.includes('real'))) {
      if (!h2.getAttribute('id')) h2.setAttribute('id', 'practical-examples');
      const classes = h2.getAttribute('class') || '';
      h2.setAttribute('class', `${classes} pattern-examples-heading`.trim());
    }
  });

  // Transform References paragraphs to lists
  const referencesHeading = root.querySelector('h2[id*="reference"], h2[id*="resource"]');
  if (referencesHeading) {
    let p = referencesHeading.nextElementSibling;
    if (p && p.tagName === 'P') {
      const content = p.innerHTML;
      if (content.includes('<br') || content.split('\n').length > 1) {
        const lines = content.split(/<br\s*\/?>/gi).map(line => line.trim()).filter(Boolean);
        const ul = parse('<ul class="pattern-learning-list"></ul>');
        lines.forEach(line => {
          ul.appendChild(parse(`<li>${line}</li>`));
        });
        p.replaceWith(ul);
      }
    }
  }

  return root.toString();
}

/**
 * Add example card wrappers to content
 * Looks for "Example N:" patterns and wraps them in styled divs
 */
export function wrapExampleCards(html: string): string {
  if (!html) return html;

  const root = parse(html);
  const h3Elements = root.querySelectorAll('h3');
  
  let exampleIndex = 1;
  h3Elements.forEach((h3) => {
    const text = h3.textContent;
    const match = text.match(/example\s+\d+/i);
    
    if (match) {
      // Create wrapper div
      const wrapper = parse(`<div class="example-card" data-example-index="${exampleIndex}"></div>`);
      
      // Move h3 and following siblings until next h2/h3
      const siblings = [];
      let el = h3.nextElementSibling;
      while (el && el.tagName !== 'H2' && el.tagName !== 'H3') {
        siblings.push(el);
        const next = el.nextElementSibling;
        el.remove();
        el = next;
      }
      
      // Append h3 and siblings to wrapper
      wrapper.appendChild(h3.clone());
      siblings.forEach(sibling => wrapper.appendChild(sibling.clone()));
      
      // Replace h3 with wrapper
      h3.replaceWith(wrapper);
      
      exampleIndex++;
    }
  });

  return root.toString();
}
