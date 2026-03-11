"use client";

import Link from "next/link";

export default function QuickLinksWidget({ locale }: { locale: string }) {
  const links = [
    {
      name: "Halal Checker",
      icon: "🔍",
      href: `/${locale}/is-it-halal`,
      color: "bg-[#234D3A] hover:bg-[#1F4534] text-white",
      note: "Search ingredients and brands",
      span: "col-span-2",
    },
    {
      name: "Prayer Times",
      icon: "🕋",
      href: `/${locale}/prayer-times`,
      color: "bg-[#24485A] hover:bg-[#1F4050] text-white",
      note: "Daily salah and qibla",
    },
    {
      name: "Islamic Calendar",
      icon: "📅",
      href: `/${locale}/learn/islamic-calendar`,
      color: "bg-[#3C2A21] hover:bg-[#34241D] text-white",
      note: "Hijri dates and events",
    },
    {
      name: "Duas & Athkar",
      icon: "🤲",
      href: `/${locale}/learn/duas`,
      color: "bg-[#56664A] hover:bg-[#4E5D43] text-white",
      note: "Daily remembrance",
    },
    {
      name: "Halal Finance",
      icon: "💰",
      href: `/${locale}/finance`,
      color: "bg-[#466774] hover:bg-[#3F5E69] text-white",
      note: "Zakat and investing",
    },
    {
      name: "Boycott Checker",
      icon: "🚫",
      href: `/${locale}/boycott-checker`,
      color: "bg-[#7A5A48] hover:bg-[#6F5141] text-white",
      note: "Brand awareness",
    },
  ];

  return (
    <div
      id="tools"
      className="relative overflow-hidden bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(246,242,235,0.94))] rounded-[2rem] p-6 shadow-[0_18px_42px_rgba(48,40,29,0.1)] border border-border flex flex-col justify-between"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(244,185,66,0.12),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(75,122,136,0.12),transparent_28%)]" />
      <div className="flex justify-between items-center mb-4 px-2">
        <h3 className="text-lg font-bold font-display text-text-primary">Core Tools</h3>
        <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-full">6 Tools</span>
      </div>
      <div className="relative grid grid-cols-2 gap-3 h-full">
        {links.map((link, idx) => (
          <Link
            key={idx}
            href={link.href}
            className={`group relative overflow-hidden rounded-[1.35rem] p-4 flex flex-col justify-between text-left transition-all hover:-translate-y-0.5 min-h-[108px] shadow-[0_10px_22px_rgba(17,17,17,0.06)] ${link.color} ${link.span || ""}`}
          >
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),transparent)] opacity-50" />
            <div className="flex items-start justify-between gap-3">
              <div className="text-2xl opacity-95">{link.icon}</div>
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] opacity-55">Tool</span>
            </div>
            <div className="relative">
              <div className="text-sm font-bold">{link.name}</div>
              <div className="text-[11px] opacity-72 mt-1">{link.note}</div>
              <div className="mt-3 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.18em] opacity-60 group-hover:opacity-90 transition-opacity">
                Open <span aria-hidden="true">→</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
