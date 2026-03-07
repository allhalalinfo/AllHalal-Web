"use client";

import Link from "next/link";

export default function QuickLinksWidget({ locale }: { locale: string }) {
  const links = [
    {
      name: "Halal Checker",
      icon: "🔍",
      href: `/${locale}/is-it-halal`,
      color: "bg-accent-green hover:bg-accent-green/90 text-white",
      note: "Search ingredients and brands",
      span: "col-span-2",
    },
    {
      name: "Prayer Times",
      icon: "🕋",
      href: `/${locale}/prayer-times`,
      color: "bg-accent-navy hover:bg-accent-navy/90 text-white",
      note: "Daily salah and qibla",
    },
    {
      name: "Islamic Calendar",
      icon: "📅",
      href: `/${locale}/learn/islamic-calendar`,
      color: "bg-bg-dark hover:bg-bg-dark/80 text-white",
      note: "Hijri dates and events",
    },
    {
      name: "Duas & Athkar",
      icon: "🤲",
      href: `/${locale}/learn/duas`,
      color: "bg-accent-olive hover:bg-accent-olive/90 text-white",
      note: "Daily remembrance",
    },
    {
      name: "Halal Finance",
      icon: "💰",
      href: `/${locale}/finance`,
      color: "bg-accent-teal hover:bg-accent-teal/90 text-white",
      note: "Zakat and investing",
    },
    {
      name: "Boycott Checker",
      icon: "🚫",
      href: `/${locale}/boycott-checker`,
      color: "bg-accent-terracotta hover:bg-accent-terracotta/90 text-white",
      note: "Brand awareness",
    },
  ];

  return (
    <div id="tools" className="bg-white rounded-[2rem] p-6 shadow-card border border-border flex flex-col justify-between">
      <div className="flex justify-between items-center mb-4 px-2">
        <h3 className="text-lg font-bold font-display text-text-primary">Core Tools</h3>
        <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-full">6 Tools</span>
      </div>
      <div className="grid grid-cols-2 gap-3 h-full">
        {links.map((link, idx) => (
          <Link
            key={idx}
            href={link.href}
            className={`rounded-[1.35rem] p-4 flex flex-col justify-between text-left transition-transform hover:scale-[1.02] min-h-[112px] ${link.color} ${link.span || ""}`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="text-2xl">{link.icon}</div>
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] opacity-70">Tool</span>
            </div>
            <div>
              <div className="text-sm font-bold">{link.name}</div>
              <div className="text-[11px] opacity-80 mt-1">{link.note}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
