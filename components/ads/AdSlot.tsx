"use client";

import { useEffect, useRef } from "react";

type AdSlotSize = "small" | "medium" | "large" | "banner";

type AdSlotProps = {
  id: string;
  slot?: string;
  size?: AdSlotSize;
  className?: string;
  placeholder?: boolean;
  label?: string;
};

type AdsByGoogleWindow = Window & {
  adsbygoogle?: unknown[];
};

const ADSENSE_ENABLED = process.env.NEXT_PUBLIC_ENABLE_ADSENSE_SLOTS === "true";
const ADSENSE_CLIENT_ID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "ca-pub-5317347727083675";

const SLOT_STYLES: Record<
  AdSlotSize,
  {
    shell: string;
    minHeight: string;
    format: "auto" | "rectangle" | "fluid";
    fullWidthResponsive?: "true" | "false";
  }
> = {
  small: {
    shell: "min-h-[13rem]",
    minHeight: "250px",
    format: "rectangle",
    fullWidthResponsive: "false",
  },
  medium: {
    shell: "min-h-[18rem]",
    minHeight: "280px",
    format: "auto",
    fullWidthResponsive: "true",
  },
  large: {
    shell: "min-h-[24rem]",
    minHeight: "360px",
    format: "auto",
    fullWidthResponsive: "true",
  },
  banner: {
    shell: "min-h-[7rem]",
    minHeight: "90px",
    format: "auto",
    fullWidthResponsive: "true",
  },
};

function PreviewSlot({
  id,
  size,
  label,
  className,
}: {
  id: string;
  size: AdSlotSize;
  label: string;
  className: string;
}) {
  const config = SLOT_STYLES[size];

  return (
    <aside
      id={`ad-${id}`}
      className={`relative overflow-hidden rounded-[1.75rem] border border-dashed border-[rgba(47,37,30,0.14)] bg-[linear-gradient(135deg,rgba(255,255,255,0.82),rgba(245,240,231,0.9))] p-5 shadow-[0_14px_36px_rgba(43,34,24,0.05)] ${config.shell} ${className}`}
    >
      <div className="flex h-full flex-col justify-between">
        <div>
          <div className="inline-flex rounded-full border border-[rgba(47,37,30,0.08)] bg-white/70 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.24em] text-text-secondary">
            Ad Preview
          </div>
          <h3 className="mt-4 text-lg font-bold font-display text-text-primary">{label}</h3>
          <p className="mt-2 text-sm leading-relaxed text-text-secondary">
            Hidden until AdSense is approved and slot IDs are enabled in environment variables.
          </p>
        </div>
        <div className="mt-4 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-text-muted">
          {size}
        </div>
      </div>
    </aside>
  );
}

export default function AdSlot({
  id,
  slot,
  size = "medium",
  className = "",
  placeholder = false,
  label = "Sponsored",
}: AdSlotProps) {
  const slotRef = useRef<HTMLElement | null>(null);
  const hasRequestedRef = useRef(false);
  const config = SLOT_STYLES[size];
  const canServe = ADSENSE_ENABLED && Boolean(slot);

  useEffect(() => {
    if (!canServe || !slotRef.current || hasRequestedRef.current) {
      return;
    }

    try {
      const adsWindow = window as AdsByGoogleWindow;
      adsWindow.adsbygoogle = adsWindow.adsbygoogle || [];
      adsWindow.adsbygoogle.push({});
      hasRequestedRef.current = true;
    } catch (error) {
      console.error(`Failed to initialise AdSense slot "${id}"`, error);
    }
  }, [canServe, id]);

  if (!canServe) {
    return placeholder ? (
      <PreviewSlot id={id} size={size} label={label} className={className} />
    ) : null;
  }

  return (
    <div
      id={`ad-${id}`}
      className={`overflow-hidden rounded-[1.75rem] border border-[rgba(47,37,30,0.08)] bg-white/80 shadow-[0_14px_36px_rgba(43,34,24,0.05)] ${config.shell} ${className}`}
    >
      <div className="px-4 pt-3 text-[0.68rem] font-bold uppercase tracking-[0.22em] text-text-muted">
        Sponsored
      </div>
      <ins
        ref={slotRef}
        className="adsbygoogle block w-full"
        style={{ display: "block", minHeight: config.minHeight }}
        data-ad-client={ADSENSE_CLIENT_ID}
        data-ad-slot={slot}
        data-ad-format={config.format}
        data-full-width-responsive={config.fullWidthResponsive}
      />
    </div>
  );
}
