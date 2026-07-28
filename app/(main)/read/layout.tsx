import "../../css/prose.css";
import "../../css/app-mode.css";

/**
 * Article pages layout
 * Lazy-loads prose.css only for /read/[slug] pages
 * ~40KB of CSS only loaded when needed
 */
export default function ReadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
