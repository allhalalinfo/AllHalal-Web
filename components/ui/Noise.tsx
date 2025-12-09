"use client";

/**
 * Noise overlay - DISABLED on mobile for performance
 */
export default function Noise() {
  return (
    <div className="pointer-events-none fixed inset-0 z-50 h-full w-full opacity-[0.02] mix-blend-overlay hidden md:block">
      <svg className="h-full w-full">
        <filter id="noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.6"
            numOctaves="2"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>
    </div>
  );
}
