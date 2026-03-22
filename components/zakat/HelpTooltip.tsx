"use client";

import { HelpCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type HelpTooltipProps = {
  text: string;
  label: string;
};

/**
 * Accessible info popover: click toggles (mobile + desktop); closes on outside click.
 */
export function HelpTooltip({ text, label }: HelpTooltipProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, [open]);

  return (
    <div className="relative inline-flex shrink-0" ref={rootRef}>
      <button
        type="button"
        className="flex h-7 w-7 items-center justify-center rounded-full border border-border bg-bg-primary text-text-muted transition-colors hover:border-primary/40 hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
        aria-label={`More information: ${label}`}
        aria-expanded={open}
        onClick={(e) => {
          e.stopPropagation();
          setOpen((v) => !v);
        }}
      >
        <HelpCircle className="h-4 w-4" strokeWidth={2} aria-hidden />
      </button>
      {open ? (
        <div
          role="tooltip"
          className="absolute left-1/2 top-full z-[80] mt-2 w-[min(100vw-2rem,22rem)] -translate-x-1/2 rounded-2xl border border-border bg-bg-card p-4 text-left text-xs leading-relaxed text-text-secondary shadow-[0_20px_50px_rgba(43,34,24,0.18)] sm:left-0 sm:translate-x-0 md:w-80"
        >
          {text}
        </div>
      ) : null}
    </div>
  );
}
