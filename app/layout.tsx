/**
 * Root layout - minimal wrapper
 * The actual layout with <html> and <body> is in:
 * - app/[locale]/layout.tsx (for localized pages)
 * - app/(media)/layout.tsx (for media pages)
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
