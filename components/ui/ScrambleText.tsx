"use client";

import { useCallback, useEffect, useRef, useState } from "react";

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
  const [isInView, setIsInView] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Native Intersection Observer (replaces framer-motion useInView)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect(); // once: true
        }
      },
      { threshold: 0.5 } // amount: 0.5
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const scramble = useCallback(() => {
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
  }, [text]);

  useEffect(() => {
    if (isInView && !hover) {
      const timeout = setTimeout(() => {
        scramble();
      }, delay * 1000);
      return () => clearTimeout(timeout);
    }
  }, [isInView, hover, delay, scramble]);

  useEffect(() => {
    if (hover && isHovered) {
      scramble();
    }
  }, [hover, isHovered, scramble]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <span
      ref={containerRef}
      className={`inline-block font-mono ${className}`}
      onMouseEnter={() => hover && setIsHovered(true)}
      onMouseLeave={() => hover && setIsHovered(false)}
    >
      {displayText}
    </span>
  );
}
