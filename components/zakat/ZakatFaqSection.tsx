import { ZAKAT_FAQ_ITEMS } from "@/data/zakatFaq";

/**
 * Native <details> accordion — minimal JS, good for SEO and performance.
 */
export default function ZakatFaqSection() {
  return (
    <section
      id="zakat-faq"
      className="mx-auto mt-20 max-w-3xl scroll-mt-28 border-t border-border pt-16"
      aria-labelledby="zakat-faq-heading"
    >
      <h2 id="zakat-faq-heading" className="font-display text-2xl font-bold text-text-primary md:text-3xl">
        ❓ Frequently asked questions
      </h2>
      <p className="mt-3 text-text-secondary">
        Short answers for common situations. Complex cases should be reviewed with a qualified scholar.
      </p>

      <div className="mt-10 space-y-3">
        {ZAKAT_FAQ_ITEMS.map((item) => (
          <details
            key={item.id}
            className="group rounded-2xl border border-border bg-bg-card px-5 py-4 shadow-sm open:shadow-md"
          >
            <summary className="cursor-pointer list-none font-semibold text-text-primary [&::-webkit-details-marker]:hidden">
              <span className="flex items-center justify-between gap-3">
                {item.question}
                <span className="text-primary transition-transform group-open:rotate-180">▼</span>
              </span>
            </summary>
            <div className="mt-4 space-y-3 border-t border-border pt-4 text-sm leading-relaxed text-text-secondary">
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
