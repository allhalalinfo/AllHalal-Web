"use client";

import { motion } from "framer-motion";
import { Megaphone, Sparkles } from "lucide-react";

type AdSlotSize = "small" | "medium" | "large" | "banner";

const SLOT_STYLES: Record<
  AdSlotSize,
  {
    shell: string;
    copy: string;
  }
> = {
  small: {
    shell: "min-h-[13rem]",
    copy: "300 x 250 placement for sponsor or affiliate block",
  },
  medium: {
    shell: "min-h-[18rem]",
    copy: "Flexible rectangle for native promotion or partner content",
  },
  large: {
    shell: "min-h-[24rem]",
    copy: "Large storytelling slot for premium campaigns",
  },
  banner: {
    shell: "min-h-[7rem]",
    copy: "Horizontal banner for launch campaigns or newsletter promo",
  },
};

export default function AdSlot({
  id,
  size = "medium",
  placeholder = true,
  label = "Ad Space",
  className = "",
}: {
  id: string;
  size?: AdSlotSize;
  placeholder?: boolean;
  label?: string;
  className?: string;
}) {
  const config = SLOT_STYLES[size];

  if (!placeholder) {
    return <div id={`ad-${id}`} className={`${config.shell} ${className}`} />;
  }

  return (
    <motion.aside
      id={`ad-${id}`}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
      className={`relative overflow-hidden rounded-[1.75rem] border border-[rgba(47,37,30,0.08)] bg-[linear-gradient(135deg,rgba(255,255,255,0.88),rgba(245,240,231,0.92))] p-5 shadow-[0_20px_56px_rgba(43,34,24,0.08)] ${config.shell} ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(244,185,66,0.18),transparent_26%),radial-gradient(circle_at_88%_18%,rgba(75,110,112,0.16),transparent_28%),linear-gradient(140deg,rgba(255,255,255,0.45),transparent_58%)]" />
      <div className="relative flex h-full flex-col justify-between">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(47,37,30,0.08)] bg-white/72 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.24em] text-text-secondary">
              <Megaphone className="h-3.5 w-3.5 text-primary" />
              Sponsored
            </div>
            <h3 className="mt-4 text-2xl font-bold font-display text-text-primary">{label}</h3>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-text-secondary">{config.copy}</p>
          </div>

          <div className="rounded-full bg-[rgba(176,144,98,0.12)] p-3 text-primary">
            <Sparkles className="h-5 w-5" />
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <span className="rounded-full border border-dashed border-[rgba(47,37,30,0.18)] px-3 py-1 text-[0.7rem] font-bold uppercase tracking-[0.2em] text-text-muted">
            {size}
          </span>
          <span className="text-xs font-medium text-text-muted">Reserved for monetization experiments</span>
        </div>
      </div>
    </motion.aside>
  );
}
