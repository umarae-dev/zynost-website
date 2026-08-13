"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Bot, Workflow, Tag, Info, ChevronDown, ArrowUpRight, Menu, X } from "lucide-react";
import { MagneticButton } from "@/components/shared/MagneticButton";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import PillNav from "@/components/effects/PillNav";
import { NAV_LINKS, SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

// A literal "Home" pill up front, then the existing sections — used for
// both the desktop pill row and the mobile takeover list.
const HEADER_LINKS = [{ label: "Home", href: "/" }, ...NAV_LINKS];

// One icon per HEADER_LINKS entry, same order — purely decorative context
// for the mobile menu.
const NAV_ICONS = [Home, Bot, Workflow, Tag, Info];

// The dropdown pill in the navbar itself, pulling in company + legal
// pages that otherwise only lived in the footer.
const COMPANY_DROPDOWN_LINKS = [
  { label: "Contact", href: "mailto:billing@zynost.com" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Disclaimer", href: "/disclaimer" },
  { label: "Refund Policy", href: "/refund-policy" },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // A short grace period on leave — without it, the gap between the
  // trigger and the panel closes the dropdown while the cursor is still
  // travelling to it.
  function scheduleClose() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setCompanyOpen(false), 150);
  }
  function cancelClose() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open, and let Escape close it.
  useEffect(() => {
    if (!mobileOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMobileOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen]);

  return (
    // Real bug fix (kept from before): the mobile menu's `fixed inset-0`
    // overlay lives as a SIBLING of <header>, not a child — backdrop-blur-lg
    // on the header creates a new CSS containing block for `fixed`
    // descendants, which used to anchor the overlay to the header's own box
    // instead of the viewport.
    //
    // No framer-motion / JS-driven animation anywhere in this header or its
    // mobile menu (previously: scroll-progress bar, logo scale on mount,
    // shared-layout hover pill, staggered menu-item entrance, spring icon
    // morph) — every remaining bit of motion below is a plain CSS
    // `transition` triggered by :hover or a state class, which costs
    // nothing until the pointer is actually over the element.
    <>
      <header
        className={cn(
          "sticky top-0 z-50 bg-transparent transition-[background-color,box-shadow,backdrop-filter] duration-300",
          scrolled || mobileOpen
            ? "bg-white/[0.92] shadow-[0_16px_45px_-32px_rgba(15,23,42,0.55)] backdrop-blur-2xl dark:bg-background/90"
            : "shadow-none backdrop-blur-none"
        )}
      >
      <nav
        className={cn(
          "mx-auto flex max-w-7xl items-center justify-between px-6 transition-[height] duration-300",
          scrolled ? "h-14" : "h-16"
        )}
      >
        <Link href="/" className="group flex items-center gap-2.5" aria-label={`${SITE.name} home`}>
          <Image
            src="/zynost-logo.png"
            alt={`${SITE.name} logo`}
            width={40}
            height={40}
            className="h-10 w-10 shrink-0 transition-transform duration-300 group-hover:scale-90"
          />
          <span className="text-base font-semibold tracking-tight">{SITE.name}</span>
        </Link>

        <div className="hidden items-center lg:flex">
          <PillNav items={HEADER_LINKS} activeHref={pathname === "/" ? "/" : pathname} />

          <div
            className="relative ml-1"
            onMouseEnter={() => {
              cancelClose();
              setCompanyOpen(true);
            }}
            onMouseLeave={scheduleClose}
          >
            <button
              type="button"
              aria-expanded={companyOpen}
              aria-haspopup="true"
              onClick={() => setCompanyOpen((v) => !v)}
              className={cn(
                "flex items-center gap-1 rounded-full px-4 py-2 text-sm transition-colors",
                companyOpen ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              Company
              <ChevronDown size={13} className={cn("transition-transform duration-200", companyOpen && "rotate-180")} />
            </button>

            {companyOpen && (
              <div className="animate-fade-in-up absolute left-1/2 top-full z-50 w-64 -translate-x-1/2 pt-3">
                <div className="overflow-hidden rounded-2xl border border-border bg-background/95 p-2 shadow-[0_24px_70px_-20px_rgba(0,0,0,0.6)] backdrop-blur-2xl">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 top-3 h-px bg-gradient-to-r from-transparent via-violet/60 to-transparent"
                  />
                  {COMPANY_DROPDOWN_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setCompanyOpen(false)}
                      className="block rounded-xl px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          <ThemeToggle />
          <a
            href={`${SITE.appUrl}`}
            className="rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
          >
            Log in
          </a>
          <MagneticButton href={`${SITE.appUrl}`} className="px-5 py-2.5 text-sm">
            Start free
          </MagneticButton>
        </div>

        {!mobileOpen && (
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            aria-expanded={false}
            className="relative z-[70] flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-white/[0.03] text-foreground lg:hidden"
          >
            <Menu size={19} />
          </button>
        )}
      </nav>
      </header>

      {/* Full-viewport takeover instead of a dropdown panel — big,
          thumb-friendly targets, a close control that's unmistakable. A
          sibling of <header>, deliberately — see the comment above. Opens
          instantly (conditional render), just a fast CSS opacity fade,
          no framer-motion, no staggered list entrance. */}
      {mobileOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="fixed inset-0 z-[60] flex flex-col bg-background/98 backdrop-blur-2xl duration-200 animate-in fade-in lg:hidden"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -top-32 right-0 h-72 w-72 rounded-full bg-violet/20 blur-[100px]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-32 left-0 h-72 w-72 rounded-full bg-sky/15 blur-[100px]"
          />

          <div className="relative flex h-16 shrink-0 items-center justify-between px-6">
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className="text-sm font-semibold tracking-tight"
            >
              {SITE.name}
            </Link>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-white/[0.03] text-foreground"
              >
                <X size={19} />
              </button>
            </div>
          </div>

          <div className="relative flex-1 overflow-y-auto px-6 pb-8 pt-4">
            <div className="space-y-1">
              {HEADER_LINKS.map((link, i) => {
                const Icon = NAV_ICONS[i % NAV_ICONS.length];
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="group flex items-center justify-between rounded-2xl px-4 py-4 text-xl font-semibold hover:bg-white/5"
                  >
                    <span className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-violet transition-colors group-hover:bg-violet/15">
                        <Icon size={16} />
                      </span>
                      {link.label}
                    </span>
                    <ArrowUpRight
                      size={16}
                      className="text-muted-foreground opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                    />
                  </Link>
                );
              })}
            </div>

            <div className="mt-6 border-t border-border pt-6">
              <div className="px-4 pb-2 text-xs font-semibold uppercase tracking-wider text-violet">Company</div>
              {COMPANY_DROPDOWN_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between rounded-xl px-4 py-3 text-base text-foreground/90 hover:bg-white/5"
                >
                  {link.label}
                  <ArrowUpRight size={15} className="text-muted-foreground" />
                </Link>
              ))}
            </div>

            <div className="mt-6 space-y-3 border-t border-border pt-6">
              <a
                href={`${SITE.appUrl}`}
                onClick={() => setMobileOpen(false)}
                className="block rounded-xl border border-border px-4 py-3.5 text-center text-base font-semibold"
              >
                Log in
              </a>
              <MagneticButton href={`${SITE.appUrl}`} className="w-full justify-center py-3.5 text-base">
                Start free
              </MagneticButton>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
