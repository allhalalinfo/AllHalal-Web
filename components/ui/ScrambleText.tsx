"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const CHARS = "-_~=+*!@#%&^?|/\\0101";

interface ScrambleTextProps {
  text: string;
  className?: string;
  delay?: number;
  hover?: boolean;
}

export default function ScrambleText({ 
  text, 
  className = "", 
  delay = 0,
  hover = false 
}: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const containerRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.5 });
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const scramble = () => {
    let pos = 0;

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      const scrambled = text
        .split("")
        .map((char, index) => {
          if (pos / 3 > index) {
            return char;
          }
          const randomChar = CHARS[Math.floor(Math.random() * CHARS.length)];
          return randomChar;
        })
        .join("");

      setDisplayText(scrambled);
      pos++;

      if (pos >= text.length * 3) {
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
    }, 30);
  };

  useEffect(() => {
    if (isInView && !hover) {
      const timeout = setTimeout(() => {
        scramble();
      }, delay * 1000);
      return () => clearTimeout(timeout);
    }
  }, [isInView, hover, delay]);

  useEffect(() => {
    if (hover && isHovered) {
      scramble();
    }
  }, [isHovered]);

  return (
    <motion.span
      ref={containerRef}
      className={`inline-block font-mono ${className}`} // font-mono for tech feel
      onMouseEnter={() => hover && setIsHovered(true)}
      onMouseLeave={() => hover && setIsHovered(false)}
    >
      {displayText}
    </motion.span>
  );
}
