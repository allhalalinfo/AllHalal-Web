import { ZAKAT_FAQ_ITEMS } from "@/data/zakatFaq";

/**
 * Native <details> accordion — minimal JS, good for SEO and performance.
 */
export default function ZakatFaqSection() {
  return (
    <section
      id="zakat-faq"
      className="mx-auto mt-8 max-w-3xl scroll-mt-28 border-t border-border pt-8"
      aria-labelledby="zakat-faq-heading"
    >
      <h2 id="zakat-faq-heading" className="font-display text-2xl font-bold text-text-primary md:text-3xl">
        ❓ Frequently asked questions
      </h2>

      <div className="mt-5 space-y-3">
        {ZAKAT_FAQ_ITEMS.map((item) => (
          <details
            key={item.id}
            className="group rounded-2xl border border-[rgba(47,37,30,0.1)] bg-white px-5 py-4 shadow-sm open:shadow-md [&_summary::-webkit-details-marker]:hidden"
          >
            <summary className="cursor-pointer list-none font-semibold text-text-primary">
              <span className="flex items-center justify-between gap-3">
                {item.question}
                <span className="shrink-0 text-primary transition-transform group-open:rotate-180">▼</span>
              </span>
            </summary>
            <div className="mt-4 space-y-3 border-t border-[rgba(47,37,30,0.08)] bg-white pt-4 text-sm leading-relaxed text-text-secondary">
              {item.blocks.map((b, i) =>
                b.type === "p" ? (
                  <p key={i}>{b.text}</p>
                ) : (
                  <p key={i}>
                    <a
                      href={b.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-primary underline-offset-2 hover:underline"
                    >
                      {b.text}
                    </a>
                  </p>
                )
              )}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
