"use client";

import { useEffect } from "react";

/**
 * Converts FAQ sections into interactive accordions.
 * H3 questions become clickable, paragraphs below them become collapsible answers.
 */
export default function FaqAccordion() {
  useEffect(() => {
    const article = document.querySelector(".prose-custom");
    if (!article) {
      console.log("FaqAccordion: .prose-custom not found");
      return;
    }

    // Find FAQ heading - VERY aggressive search
    let faqHeading: Element | null = null;
    
    // Strategy 1: By ID (most reliable)
    faqHeading = article.querySelector("h2#faq, h2[id*='faq'], h2[id*='question']");
    
    if (faqHeading) {
      console.log("✅ FaqAccordion: Found FAQ heading by ID:", faqHeading.textContent);
    }
    
    // Strategy 2: By text content if ID not found
    if (!faqHeading) {
      const allH2 = article.querySelectorAll("h2");
      console.log(`FaqAccordion: Searching through ${allH2.length} H2 elements...`);
      
      for (const h2 of allH2) {
        const text = h2.textContent?.toLowerCase().trim() || "";
        console.log(`  - Checking H2: "${text}"`);
        
        // VERY aggressive matching - even partial match
        if (
          text === "faq" ||
          text === "faqs" ||
          text === "faq " ||
          text.startsWith("faq") ||
          text.includes("frequently asked") ||
          text.includes("common questions") ||
          text.includes("questions and answers") ||
          text.includes("q&a") ||
          text.includes("q & a")
        ) {
          faqHeading = h2;
          // Add ID if missing
          if (!h2.id) {
            h2.id = "faq";
            console.log("  ➜ Added id='faq' to heading");
          }
          console.log("✅ FaqAccordion: Found FAQ heading by text:", h2.textContent);
          break;
        }
      }
    }
    
    if (!faqHeading) {
      console.warn("❌ FaqAccordion: FAQ heading NOT found. Make sure you have H2 with 'FAQ' text.");
      return;
    }

    // Collect all H3 questions and their answers until next H2
    const faqItems: Array<{ question: HTMLElement; answer: HTMLElement[] }> = [];
    let currentQuestion: HTMLElement | null = null;
    let currentAnswers: HTMLElement[] = [];
    
    console.log("FaqAccordion: Looking for H3 questions after FAQ heading...");

    let elementsToProcess: Element[] = [];
    
    // Check if first element after FAQ heading is a DIV wrapper
    const firstSibling = faqHeading.nextElementSibling;
    if (firstSibling && firstSibling.tagName === "DIV") {
      console.log("  ⚠️ Found DIV wrapper after FAQ heading - looking inside for H3 questions");
      elementsToProcess = Array.from(firstSibling.children);
      console.log(`  → DIV has ${elementsToProcess.length} child elements`);
    } else {
      // No DIV wrapper - collect siblings until next H2
      console.log("  ✓ No DIV wrapper - collecting sibling elements");
      let currentElement = firstSibling;
      while (currentElement && currentElement.tagName !== "H2") {
        elementsToProcess.push(currentElement);
        currentElement = currentElement.nextElementSibling;
      }
      console.log(`  → Found ${elementsToProcess.length} sibling elements`);
    }

    // Process all collected elements
    for (const element of elementsToProcess) {
      console.log(`    - Processing: ${element.tagName}`);
      
      if (element.tagName === "H3") {
        // Save previous Q&A if exists
        if (currentQuestion && currentAnswers.length > 0) {
          faqItems.push({
            question: currentQuestion,
            answer: currentAnswers,
          });
          console.log(`      ✅ Saved Q&A pair (${currentAnswers.length} answer elements)`);
        }
        // Start new Q&A
        currentQuestion = element as HTMLElement;
        currentAnswers = [];
        console.log(`      ➜ New question: "${currentQuestion.textContent}"`);
      } else if (currentQuestion) {
        // Collect answer elements (p, ul, ol, etc.)
        currentAnswers.push(element as HTMLElement);
        console.log(`        + Added answer element: ${element.tagName}`);
      }
    }

    // Don't forget the last one
    if (currentQuestion && currentAnswers.length > 0) {
      faqItems.push({ question: currentQuestion, answer: currentAnswers });
      console.log(`      ✅ Saved last Q&A pair (${currentAnswers.length} answer elements)`);
    }

    if (faqItems.length === 0) {
      console.error("❌ FaqAccordion: No FAQ items found! Make sure you have H3 questions under the FAQ heading.");
      console.error("   Expected structure:");
      console.error("   ## FAQ {#faq}");
      console.error("   ### Question 1?");
      console.error("   Answer paragraph...");
      console.error("   ### Question 2?");
      console.error("   Answer paragraph...");
      return;
    }
    
    console.log(`✅ FaqAccordion: Found ${faqItems.length} FAQ items - converting to accordion`);

    // Create accordion structure
    const accordionContainer = document.createElement("div");
    accordionContainer.className = "faq-accordion";

    faqItems.forEach((item, index) => {
      const accordionItem = document.createElement("div");
      accordionItem.className = "faq-accordion-item";

      // Question button
      const questionBtn = document.createElement("button");
      questionBtn.className = "faq-accordion-question";
      questionBtn.setAttribute("aria-expanded", "false");
      questionBtn.innerHTML = `
        <span class="faq-accordion-question-text">${item.question.innerHTML}</span>
        <svg class="faq-accordion-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      `;

      // Answer panel (CLOSED by default)
      const answerPanel = document.createElement("div");
      answerPanel.className = "faq-accordion-answer";
      answerPanel.style.maxHeight = "0";
      answerPanel.style.overflow = "hidden";

      const answerContent = document.createElement("div");
      answerContent.className = "faq-accordion-answer-content";
      item.answer.forEach((el) => {
        answerContent.appendChild(el.cloneNode(true));
      });
      answerPanel.appendChild(answerContent);

      // Toggle functionality
      questionBtn.addEventListener("click", () => {
        const isExpanded = questionBtn.getAttribute("aria-expanded") === "true";

        if (isExpanded) {
          // Collapse
          questionBtn.setAttribute("aria-expanded", "false");
          answerPanel.style.maxHeight = "0";
          accordionItem.classList.remove("is-open");
        } else {
          // Expand
          questionBtn.setAttribute("aria-expanded", "true");
          answerPanel.style.maxHeight = answerPanel.scrollHeight + "px";
          accordionItem.classList.add("is-open");
        }
      });

      accordionItem.appendChild(questionBtn);
      accordionItem.appendChild(answerPanel);
      accordionContainer.appendChild(accordionItem);

      // Remove original elements
      item.question.remove();
      item.answer.forEach((el) => el.remove());
    });

    // Insert accordion after FAQ heading
    faqHeading.insertAdjacentElement("afterend", accordionContainer);
    
    console.log("✅ FaqAccordion: Accordion created successfully!");
    console.log("   ➜ All answers are CLOSED by default");
    console.log("   ➜ Click questions to expand/collapse");
  }, []);

  return null;
}
