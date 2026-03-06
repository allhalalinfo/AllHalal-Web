"use client";

import Link from "next/link";

export default function QuickLinksWidget({ locale }: { locale: string }) {
  const links = [
    { name: "Halal Checker", icon: "🔍", href: `/${locale}/is-it-halal`, color: "bg-accent-green hover:bg-accent-green/90 text-white" },
    { name: "Islamic Calendar", icon: "📅", href: `/${locale}/learn/islamic-calendar`, color: "bg-bg-dark hover:bg-bg-dark/80 text-white" },
    { name: "Halal Finance", icon: "💰", href: `/${locale}/finance`, color: "bg-accent-teal hover:bg-accent-teal/90 text-white" },
    { name: "Boycott Checker", icon: "🚫", href: `/${locale}/boycott-checker`, color: "bg-accent-terracotta hover:bg-accent-terracotta/90 text-white" }
  ];

  return (
    <div id="tools" className="bg-white rounded-[2rem] p-6 shadow-card border border-border flex flex-col justify-between">
      <div className="flex justify-between items-center mb-4 px-2">
        <h3 className="text-lg font-bold font-display text-text-primary">Quick Tools</h3>
        <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-full">4 Apps</span>
      </div>
      <div className="grid grid-cols-2 gap-3 h-full">
        {links.map((link, idx) => (
          <Link key={idx} href={link.href} className={`rounded-xl p-4 flex flex-col items-center justify-center text-center transition-transform hover:scale-[1.02] ${link.color}`}>
            <div className="text-2xl mb-2">{link.icon}</div>
            <div className="text-xs font-bold">{link.name}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
