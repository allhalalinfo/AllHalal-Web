"use client";

import { useEffect } from "react";

/**
 * Converts FAQ sections into interactive accordions.
 * H3 questions become clickable, paragraphs below them become collapsible answers.
 */
export default function FaqAccordion() {
  useEffect(() => {
    const article = document.querySelector(".prose-custom");
    if (!article) return;

    // Find FAQ heading
    const faqHeading = article.querySelector(
      "h2#faq, h2.pattern-faq-heading, h2[id*='faq'], h2[id*='question']"
    );
    if (!faqHeading) return;

    // Collect all H3 questions and their answers until next H2
    const faqItems: Array<{ question: HTMLElement; answer: HTMLElement[] }> = [];
    let currentElement = faqHeading.nextElementSibling;
    let currentQuestion: HTMLElement | null = null;
    let currentAnswers: HTMLElement[] = [];

    while (currentElement && currentElement.tagName !== "H2") {
      if (currentElement.tagName === "H3") {
        // Save previous Q&A if exists
        if (currentQuestion && currentAnswers.length > 0) {
          faqItems.push({
            question: currentQuestion,
            answer: currentAnswers,
          });
        }
        // Start new Q&A
        currentQuestion = currentElement as HTMLElement;
        currentAnswers = [];
      } else if (currentQuestion) {
        // Collect answer elements (p, ul, ol, etc.)
        currentAnswers.push(currentElement as HTMLElement);
      }
      currentElement = currentElement.nextElementSibling;
    }

    // Don't forget the last one
    if (currentQuestion && currentAnswers.length > 0) {
      faqItems.push({ question: currentQuestion, answer: currentAnswers });
    }

    if (faqItems.length === 0) return;

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

      // Answer panel
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
  }, []);

  return null;
}
