"use client";

import Link from "next/link";
import { ArrowUpRight, Send } from "lucide-react";
import { NodeNetwork } from "@/components/shared/NodeNetwork";
import { SubscribeForm } from "@/components/shared/SubscribeForm";
import { XLogo, GitHubLogo, DiscordLogo, YouTubeLogo } from "@/components/shared/SocialIcons";
import { SITE } from "@/lib/constants";

// Placeholder hrefs — real profile URLs to be swapped in later.
const SOCIALS = [
  { label: "X (Twitter)", href: `https://x.com/${SITE.twitter.replace("@", "")}`, Icon: XLogo },
  { label: "Discord", href: "#", Icon: DiscordLogo },
  { label: "Telegram", href: "#", Icon: Send },
  { label: "YouTube", href: "#", Icon: YouTubeLogo },
  { label: "GitHub", href: "#", Icon: GitHubLogo },
];

const FOOTER_COLUMNS = [
  {
    heading: "Product",
    links: [
      { label: "Features", href: "/#agents" },
      { label: "System Planned Trade", href: "/#system-planned-trade" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Contact", href: "mailto:billing@zynost.com" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Disclaimer", href: "/disclaimer" },
      { label: "Refund Policy", href: "/refund-policy" },
    ],
  },
];

function FooterLink({ label, href }: { label: string; href: string }) {
  return (
    <Link href={href} className="group/link inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground">
      {label}
      <ArrowUpRight
        size={12}
        className="-translate-x-1 opacity-0 transition-all duration-200 group-hover/link:translate-x-0 group-hover/link:opacity-100"
      />
    </Link>
  );
}

export function Footer() {
  return (
    <footer className="relative z-10 overflow-hidden border-t border-border">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet/60 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-violet/[0.06] blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-sky/[0.05] blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-6">
          <div className="col-span-2 md:col-span-2">
            <Link href="/" className="group flex items-center gap-2.5" aria-label={`${SITE.name} home`}>
              <div className="transition-transform duration-200 group-hover:scale-105">
                <NodeNetwork size={28} satellites={5} variant="compact" />
              </div>
              <span className="text-base font-semibold tracking-tight">{SITE.name}</span>
            </Link>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              {SITE.tagline} 18 AI agents, one clear, backtested decision.
            </p>
            <div className="mt-5 flex items-center gap-3">
              {SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  onClick={href === "#" ? (e) => e.preventDefault() : undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-violet hover:text-violet hover:shadow-[0_0_20px_-4px_rgba(139,92,246,0.5)]"
                >
                  <Icon size={16} strokeWidth={2} />
                </a>
              ))}
            </div>
          </div>

          {FOOTER_COLUMNS.map((col) => (
            <div key={col.heading}>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {col.heading}
              </h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <FooterLink {...link} />
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Get updates
            </h3>
            <SubscribeForm />
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-border pt-8 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>&copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <p className="max-w-2xl">
            Not financial advice. You still make the final call on if, when, and how much to
            trade — Zynost presents evidence, never an instruction.
          </p>
        </div>
      </div>
    </footer>
  );
}
