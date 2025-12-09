/**
 * Root layout - minimal wrapper
 * The actual layout is in app/[locale]/layout.tsx
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
