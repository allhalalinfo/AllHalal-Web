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
  { label: 'Halal Checker', href: '/is-it-halal', enabled: true },
  { label: 'Finance', href: '/finance', enabled: true },
  { label: 'Learn', href: '/learn', enabled: true },
  { label: 'Blog', href: '/blog', enabled: true },
  { label: 'Contact', href: '/contact', enabled: true },
  { label: 'Support', href: '/support', enabled: true },
  { label: 'Legal', href: '/legal', enabled: true }
];
