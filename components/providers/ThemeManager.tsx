"use client";

import { useEffect } from "react";

/**
 * ThemeManager - Client component to apply theme attribute to HTML element
 * Supports: auto (system preference), dark, light
 */
export default function ThemeManager() {
  useEffect(() => {
    // Get theme from URL parameter
    const params = new URLSearchParams(window.location.search);
    const theme = params.get('theme') || 'auto';
    
    // Apply theme to HTML root element
    const html = document.documentElement;
    
    if (theme === 'dark') {
      html.setAttribute('data-theme', 'dark');
    } else if (theme === 'light') {
      html.setAttribute('data-theme', 'light');
    } else {
      // Auto mode - let CSS media query handle it
      html.setAttribute('data-theme', 'auto');
    }
    
    console.log(`✅ Theme applied: ${theme}`);
  }, []);
  
  return null; // This component doesn't render anything
}
