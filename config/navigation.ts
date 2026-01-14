/**
 * Site Navigation Configuration
 * Single source of truth for all navigation items
 */

export interface NavItem {
  label: string;
  href: string;
  enabled: boolean;
}

/**
 * Main navigation items (always visible in header)
 */
export const MAIN_NAV_ITEMS: NavItem[] = [
  {
    label: 'Restaurants',
    href: '/restaurants/dubai',
    enabled: true
  },
  {
    label: 'Travel',
    href: '/travel',
    enabled: true
  },
  {
    label: 'Guides',
    href: '/guides',
    enabled: true
  },
  {
    label: 'Blog',
    href: '/blog',
    enabled: true
  },
  {
    label: 'Finance',
    href: '/finance',
    enabled: true
  },
  {
    label: 'Real Estate',
    href: '/real-estate/dubai/downtown-dubai',
    enabled: true
  },
  {
    label: 'Legal',
    href: '/legal',
    enabled: true
  },
  {
    label: 'Support',
    href: '/support',
    enabled: true
  },
  {
    label: 'Contact',
    href: '/contact',
    enabled: true
  }
];
