/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * ALLHALAL TAILWIND CONFIGURATION v3.0
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * Design system based on hatchet.com.au patterns with AllHalal green branding
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      /* ─────────────────────────────────────────────────────────────────────────
         COLORS - AllHalal Green Palette
         ───────────────────────────────────────────────────────────────────────── */
      colors: {
        // Primary Green (replacing Hatchet red)
        primary: {
          DEFAULT: '#00D094',
          light: '#00E5A3',
          dark: '#00B87D',
          soft: 'rgba(0, 208, 148, 0.1)',
          glow: 'rgba(0, 208, 148, 0.4)',
        },
        // Background Colors
        bg: {
          primary: '#0A0A0A',
          secondary: '#0F0F0F',
          tertiary: '#141414',
          elevated: '#1A1A1A',
          card: '#161616',
        },
        // Surface Colors
        surface: {
          DEFAULT: 'rgba(255, 255, 255, 0.02)',
          hover: 'rgba(255, 255, 255, 0.05)',
          active: 'rgba(255, 255, 255, 0.08)',
        },
        // Border Colors
        border: {
          DEFAULT: 'rgba(255, 255, 255, 0.08)',
          light: 'rgba(255, 255, 255, 0.12)',
          hover: 'rgba(255, 255, 255, 0.2)',
        },
        // Text Colors
        text: {
          primary: '#FFFFFF',
          secondary: 'rgba(255, 255, 255, 0.7)',
          tertiary: 'rgba(255, 255, 255, 0.5)',
          muted: 'rgba(255, 255, 255, 0.35)',
        },
      },

      /* ─────────────────────────────────────────────────────────────────────────
         TYPOGRAPHY
         ───────────────────────────────────────────────────────────────────────── */
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      fontSize: {
        // Hero: 120px desktop, 56px mobile - clean, not overwhelming
        'hero': ['clamp(3rem, 10vw, 7.5rem)', { lineHeight: '0.95', letterSpacing: '-0.03em' }],
        'display-1': ['clamp(2rem, 6vw, 4rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-2': ['clamp(1.75rem, 4vw, 3rem)', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
        'display-3': ['clamp(1.25rem, 3vw, 2rem)', { lineHeight: '1.2' }],
      },
      
      /* ─────────────────────────────────────────────────────────────────────────
         SPACING
         ───────────────────────────────────────────────────────────────────────── */
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
        '38': '9.5rem',
        '42': '10.5rem',
        'section': 'clamp(4rem, 10vw, 8rem)',
        'section-sm': 'clamp(2rem, 5vw, 4rem)',
        'section-lg': 'clamp(6rem, 15vw, 12rem)',
      },

      /* ─────────────────────────────────────────────────────────────────────────
         CONTAINER
         ───────────────────────────────────────────────────────────────────────── */
      maxWidth: {
        'container': '1400px',
        'container-wide': '1600px',
        'container-narrow': '800px',
        'prose': '720px',
      },

      /* ─────────────────────────────────────────────────────────────────────────
         BORDER RADIUS
         ───────────────────────────────────────────────────────────────────────── */
      borderRadius: {
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '24px',
      },

      /* ─────────────────────────────────────────────────────────────────────────
         SHADOWS & EFFECTS
         ───────────────────────────────────────────────────────────────────────── */
      boxShadow: {
        'glow': '0 0 40px rgba(0, 208, 148, 0.4)',
        'glow-sm': '0 0 20px rgba(0, 208, 148, 0.3)',
        'glow-lg': '0 0 80px rgba(0, 208, 148, 0.4)',
        'card': '0 4px 30px rgba(0, 0, 0, 0.3)',
        'card-hover': '0 8px 40px rgba(0, 0, 0, 0.4)',
      },

      /* ─────────────────────────────────────────────────────────────────────────
         ANIMATIONS
         ───────────────────────────────────────────────────────────────────────── */
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'fade-in-down': 'fadeInDown 0.6s ease-out forwards',
        'scale-in': 'scaleIn 0.5s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.6s ease-out forwards',
        'slide-in-right': 'slideInRight 0.6s ease-out forwards',
        'marquee': 'marquee 30s linear infinite',
        'marquee-slow': 'marquee 45s linear infinite',
        'marquee-fast': 'marquee 20s linear infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },

      /* ─────────────────────────────────────────────────────────────────────────
         TRANSITIONS
         ───────────────────────────────────────────────────────────────────────── */
      transitionDuration: {
        'fast': '150ms',
        'base': '300ms',
        'slow': '500ms',
        'smooth': '600ms',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'bounce': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },

      /* ─────────────────────────────────────────────────────────────────────────
         Z-INDEX SCALE
         ───────────────────────────────────────────────────────────────────────── */
      zIndex: {
        'dropdown': '100',
        'sticky': '200',
        'fixed': '300',
        'modal-backdrop': '400',
        'modal': '500',
        'popover': '600',
        'tooltip': '700',
      },

      /* ─────────────────────────────────────────────────────────────────────────
         BACKDROP BLUR
         ───────────────────────────────────────────────────────────────────────── */
      backdropBlur: {
        'xs': '2px',
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '24px',
        '3xl': '40px',
      },
    },
  },
  plugins: [],
};

export default config;
