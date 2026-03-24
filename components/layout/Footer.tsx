"use client";

import Image from "next/image";
import Link from "next/link";

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/allhalal.info?igsh=OXAzbWc4dW9tMTgy&utm_source=qr",
    icon: InstagramIcon,
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@allhalal.info?_r=1&_t=ZN-92xfO5qF7UE",
    icon: TikTokIcon,
  },
  {
    label: "X",
    href: "https://x.com/allhalalinfo",
    icon: XIcon,
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@allhalalinfo?si=h0044GYscW2jXN92",
    icon: YouTubeIcon,
  },
  {
    label: "Bluesky",
    href: "https://bsky.app/profile/allhalalinfo.bsky.social",
    icon: BlueskyIcon,
  },
];

function isExternalLink(href: string) {
  return href.startsWith("http");
}

function localizeHref(href: string) {
  if (isExternalLink(href) || href.startsWith("/#")) {
    return href;
  }
  return href;
}

export default function Footer() {

  const primaryLinks = [
    { label: "Open halal checker", href: "/is-it-halal" },
    { label: "See prayer times", href: "/prayer-times" },
    { label: "Read Muslim updates", href: "/news" },
  ];

  const navGroups = [
    {
      title: "Use allhalal.info",
      links: [
        { label: "Halal Checker", href: "/is-it-halal" },
        { label: "Prayer Times", href: "/prayer-times" },
        { label: "Boycott Checker", href: "/boycott-checker" },
        { label: "Finance", href: "/finance" },
      ],
    },
    {
      title: "Read & Learn",
      links: [
        { label: "Learn", href: "/learn" },
        { label: "News", href: "/news" },
        { label: "Ramadan", href: "/learn/ramadan" },
        { label: "Our Methodology", href: "/methodology" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "/#about" },
        { label: "Contact", href: "/contact" },
        { label: "Support", href: "/support" },
        { label: "Download App", href: "https://apps.apple.com/us/app/allhalal-info-food-scanner/id6756242265" },
      ],
    },
  ];

  const legalLinks = [
    { label: "Privacy Policy", href: "/legal/privacy-policy" },
    { label: "Terms of Service", href: "/legal/terms-of-service" },
    { label: "Disclaimer", href: "/legal/disclaimer" },
  ];

  return (
    <footer className="mt-12 pb-4 md:mt-16 md:pb-6">
      <div className="container">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-[rgba(73,58,42,0.08)] bg-[linear-gradient(180deg,#2E1C18_0%,#251612_45%,#1D120F_100%)] text-text-inverse shadow-[0_30px_80px_rgba(33,23,18,0.22)]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(230,187,104,0.16),transparent_28%),radial-gradient(circle_at_85%_18%,rgba(92,128,148,0.16),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.06),transparent_38%)]" />

          <div className="relative border-b border-white/8 px-4 py-6 sm:px-6 sm:py-7 md:px-10 md:py-10">
            <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
              <div>
                <Link
                  href="/"
                  className="inline-flex items-center gap-3 rounded-full bg-white/5 px-3 py-2 ring-1 ring-white/10 backdrop-blur-sm"
                >
                  <span className="relative h-10 w-10 overflow-hidden rounded-full sm:h-11 sm:w-11">
                    <Image
                      src="/branding/publicbrandingheader-logo.png"
                      alt="allhalal.info logo"
                      fill
                      sizes="(min-width: 640px) 44px, 40px"
                      className="object-contain"
                    />
                  </span>
                  <span>
                    <span className="block text-base font-bold tracking-tight text-white sm:text-lg">
                      allhalal.info
                    </span>
                    <span className="mt-0.5 block text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-white/56 sm:text-[0.68rem] sm:tracking-[0.28em]">
                      Muslim portal
                    </span>
                  </span>
                </Link>

                <h2 className="mt-5 max-w-3xl text-2xl font-display font-bold leading-tight text-white sm:text-[2rem] md:mt-6 md:text-5xl">
                  Halal clarity, prayer rhythm, finance tools and Muslim life in one place.
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-text-inverse-secondary sm:text-[0.95rem] md:mt-4 md:text-lg">
                  Halal verification, prayer times, Islamic finance tools, and daily spiritual content designed for Muslims worldwide.
                </p>
              </div>

              <div className="rounded-[1.6rem] border border-white/10 bg-white/5 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-sm sm:rounded-[2rem] sm:p-5">
                <div className="text-[0.68rem] font-bold uppercase tracking-[0.22em] text-[#E6BB68] sm:text-[0.72rem] sm:tracking-[0.28em]">
                  Start Here
                </div>
                <div className="mt-2 text-xl font-display font-bold leading-tight text-white sm:mt-3 sm:text-2xl">
                  Keep the most useful tools one tap away.
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {primaryLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={localizeHref(link.href)}
                      className="rounded-full border border-white/12 bg-white/6 px-3 py-2 text-[0.82rem] font-semibold text-white/86 transition-colors hover:border-white/18 hover:bg-white/10 sm:px-4 sm:py-2.5 sm:text-sm"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
                <div className="mt-4 flex flex-col gap-2.5 sm:mt-5 sm:flex-row sm:gap-3">
                  <Link
                    href="/app"
                    className="inline-flex items-center justify-center rounded-full bg-gradient-gold px-4 py-2.5 text-sm font-bold text-[#4A3319] shadow-[0_12px_28px_rgba(176,144,98,0.24)] transition-transform hover:-translate-y-0.5 sm:px-5 sm:py-3"
                  >
                    Open app
                  </Link>
                  <Link
                    href="/methodology"
                    className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/5 px-4 py-2.5 text-sm font-bold text-white/86 transition-colors hover:bg-white/10 sm:px-5 sm:py-3"
                  >
                    Review methodology
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="relative px-4 py-6 sm:px-6 sm:py-7 md:px-10 md:py-10">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="space-y-5 sm:space-y-6">
                <div>
                  <div className="text-[0.68rem] font-bold uppercase tracking-[0.22em] text-white/42 sm:text-[0.72rem] sm:tracking-[0.28em]">
                    Follow allhalal.info
                  </div>
                  <p className="mt-2 max-w-md text-[0.9rem] leading-relaxed text-text-inverse-secondary sm:mt-3 sm:text-sm">
                    New halal answers, Muslim updates, Ramadan reminders and product launches.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[0.86rem] font-medium text-white/78 transition-colors hover:border-white/16 hover:bg-white/9 hover:text-white sm:px-3.5 sm:py-2 sm:text-sm"
                      aria-label={social.label}
                    >
                      <social.icon className="h-4 w-4" />
                      <span>{social.label}</span>
                    </a>
                  ))}
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 md:gap-6">
                {navGroups.map((group) => (
                  <div key={group.title}>
                    <h3 className="text-[0.68rem] font-bold uppercase tracking-[0.22em] text-white/42 sm:text-[0.72rem] sm:tracking-[0.28em]">
                      {group.title}
                    </h3>
                    <ul className="mt-3 space-y-2.5 sm:mt-4 sm:space-y-3">
                      {group.links.map((link) => (
                        <li key={link.label}>
                          <Link
                            href={localizeHref(link.href)}
                            className="text-[0.95rem] text-white/72 transition-colors hover:text-white sm:text-sm"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative border-t border-white/8 px-4 py-4 sm:px-6 sm:py-5 md:px-10">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-wrap gap-2">
                {legalLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={localizeHref(link.href)}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[0.72rem] font-medium text-white/66 transition-colors hover:bg-white/9 hover:text-white sm:text-xs"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className="flex flex-col gap-1.5 text-[0.72rem] text-white/48 sm:text-xs md:flex-row md:items-center md:gap-5">
                <p>
                  © {new Date().getFullYear()} allhalal.info. All rights reserved.
                </p>
                <p>
                  Developed by Muslims for Muslims.{" "}
                  <a
                    href="https://gezellix.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/72 transition-colors hover:text-white"
                  >
                    Gezellix
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function BlueskyIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 10.8c-1.087-2.114-4.046-6.53-6.798-8.958C3.81 1.257 2.694.01 1.2.01c-.066 0-.133.007-.2.02C.537.09.09.537.02 1c-.013.067-.02.134-.02.2C0 2.694 1.257 3.81 1.842 5.202c2.428 2.752 6.844 5.711 8.958 6.798 1.087 2.114 4.046 6.53 6.798 8.958C18.19 22.743 19.306 23.99 20.8 23.99c.066 0 .133-.007.2-.02.463-.07.91-.517.98-.98.013-.067.02-.134.02-.2 0-1.494-1.257-2.611-2.642-3.196-2.428-2.752-6.844-5.711-8.958-6.798zm-1.784 1.812C8.23 15.05 4.392 18.5 2.346 20.654c.654.654 1.692 1.192 2.854 1.192 1.494 0 2.611-1.257 3.196-2.642 1.784-2.046 5.622-5.496 7.668-7.642-1.784-2.046-5.622-5.496-7.668-7.642C7.811 1.257 6.694.01 5.2.01c-1.162 0-2.2.538-2.854 1.192 2.046 2.146 5.884 5.596 7.668 7.642z" />
    </svg>
  );
}

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.498 6.186a2.998 2.998 0 0 0-2.11-2.12C19.53 3.5 12 3.5 12 3.5s-7.53 0-9.388.566a2.998 2.998 0 0 0-2.11 2.12C0 8.06 0 12 0 12s0 3.94.502 5.814a2.998 2.998 0 0 0 2.11 2.12C4.47 20.5 12 20.5 12 20.5s7.53 0 9.388-.566a2.998 2.998 0 0 0 2.11-2.12C24 15.94 24 12 24 12s0-3.94-.502-5.814zM9.75 15.568V8.432L15.818 12 9.75 15.568z" />
    </svg>
  );
}
