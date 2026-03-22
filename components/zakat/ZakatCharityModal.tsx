"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { ZAKAT_CHARITY_FUNDS } from "@/data/zakatCharityFunds";

type Props = {
  open: boolean;
  onClose: () => void;
  suggestedAmount: number;
};

/**
 * Modal: list trusted Zakat partners; user edits amount and opens donation pages in a new tab.
 */
export default function ZakatCharityModal({ open, onClose, suggestedAmount }: Props) {
  const [amount, setAmount] = useState("");

  useEffect(() => {
    if (open) {
      setAmount(suggestedAmount > 0 ? suggestedAmount.toFixed(2) : "");
    }
  }, [open, suggestedAmount]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-end justify-center p-4 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="zakat-charity-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-[rgba(24,19,14,0.45)] backdrop-blur-sm"
        aria-label="Close"
        onClick={onClose}
      />
      <div className="relative z-10 max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-[1.75rem] border border-border bg-bg-card p-6 shadow-[0_24px_80px_rgba(43,34,24,0.2)] sm:p-8">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h2 id="zakat-charity-title" className="font-display text-xl font-bold text-text-primary">
              Pay your Zakat
            </h2>
            <p className="mt-2 text-sm text-text-secondary">
              allhalal.info does not collect donations. You are sent directly to each organisation’s own
              payment page.
            </p>
          </div>
          <button
            type="button"
            className="rounded-full border border-border p-2 text-text-muted hover:bg-bg-primary hover:text-text-primary"
            onClick={onClose}
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <label className="block text-sm font-semibold text-text-primary">
          Amount (USD) to keep in mind
          <input
            type="number"
            min={0}
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            id="zakat-charity-amount"
            className="mt-2 w-full rounded-xl border border-border bg-bg-primary px-4 py-3 text-lg font-bold text-text-primary outline-none focus:border-primary/40"
          />
        </label>
        <p className="mt-2 text-xs text-text-muted">
          Copy this figure into the charity checkout if the site does not pre-fill it.
        </p>

        <ul className="mt-8 space-y-4">
          {ZAKAT_CHARITY_FUNDS.map((fund) => (
            <li
              key={fund.id}
              className="rounded-2xl border border-border bg-bg-primary/80 p-4 shadow-sm"
            >
              <div className="font-bold text-text-primary">{fund.name}</div>
              <p className="mt-1 text-sm text-text-secondary">{fund.description}</p>
              <a
                href={fund.donateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex text-sm font-semibold text-primary hover:underline"
              >
                Open donation page →
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
