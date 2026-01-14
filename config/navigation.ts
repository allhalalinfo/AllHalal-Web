/**
 * Site Navigation Configuration
 * Single source of truth for all navigation items
 */

export interface NavItem {
  label: string;
  href: string;
  enabled: boolean;
  comingSoon?: boolean;
  children?: NavItem[];
}

export const MAIN_NAV_ITEMS: NavItem[] = [
  {
    label: 'Travel',
    href: '/travel',
    enabled: true,
    comingSoon: true
  },
  {
    label: 'Restaurants',
    href: '/restaurants/dubai',
    enabled: true
  },
  {
    label: 'Ingredients',
    href: '/ingredients/gelatin',
    enabled: true
  },
  {
    label: 'Finance',
    href: '/finance',
    enabled: true,
    comingSoon: true
  },
  {
    label: 'Real Estate',
    href: '/real-estate/dubai/downtown-dubai',
    enabled: true
  },
  {
    label: 'Blog',
    href: '/blog',
    enabled: true
  },
  {
    label: 'Guides',
    href: '/guides',
    enabled: true
  }
];

export const SECONDARY_NAV_ITEMS: NavItem[] = [
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

export const MOBILE_NAV_ITEMS = [...MAIN_NAV_ITEMS, ...SECONDARY_NAV_ITEMS];
