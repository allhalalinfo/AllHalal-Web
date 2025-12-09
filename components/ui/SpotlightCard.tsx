"use client";

import { useRef, useState, useEffect, MouseEvent } from "react";

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
}

export default function SpotlightCard({ 
  children, 
  className = "", 
  spotlightColor = "rgba(0, 208, 148, 0.15)"
}: SpotlightCardProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (isMobile || !divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => !isMobile && setOpacity(1);
  const handleMouseLeave = () => !isMobile && setOpacity(0);

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`
        relative overflow-hidden rounded-xl bg-bg-card transition-colors duration-300
        /* Desktop: normal border, hover shows active */
        border border-border md:hover:border-primary/30
        /* Mobile: always active border + glow */
        max-md:border-primary/30 max-md:shadow-[0_0_20px_rgba(0,208,148,0.1)]
        ${className}
      `}
    >
      {/* Desktop: Mouse-following spotlight */}
      <div
        className="pointer-events-none absolute -inset-px transition duration-300 hidden md:block"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 40%)`,
        }}
      />
      
      {/* Mobile: Static glow overlay - always visible */}
      <div 
        className="pointer-events-none absolute inset-0 md:hidden"
        style={{
          background: `radial-gradient(circle at 50% 30%, ${spotlightColor}, transparent 70%)`,
        }}
      />
      
      <div className="relative h-full">{children}</div>
    </div>
  );
}
