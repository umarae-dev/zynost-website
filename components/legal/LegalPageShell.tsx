"use client";

import { useEffect, useState, ReactNode } from "react";
import { cn } from "@/lib/utils";

export type LegalSection = {
  id: string;
  title: string;
  body: ReactNode;
};

/**
 * Shared document template for every legal page — sticky in-page table of
 * contents on desktop that highlights the active section on scroll, a
 * readable ~680px column, consistent typography. Works with zero
 * animation/JS too (the TOC links are plain anchors), satisfying the
 * "must render cleanly under reduced motion / no-JS" requirement.
 */
export function LegalPageShell({
  title,
  updatedAt,
  intro,
  sections,
}: {
  title: string;
  updatedAt: string;
  intro?: ReactNode;
  sections: LegalSection[];
}) {
  const [active, setActive] = useState(sections[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: "-15% 0px -70% 0px" }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sections]);

  return (
    <div className="mx-auto max-w-7xl px-6 py-20">
      <div className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{title}</h1>
        <p className="mt-3 text-sm text-muted-foreground">Last updated: {updatedAt}</p>
        {intro && <div className="mt-6 text-muted-foreground">{intro}</div>}
      </div>

      <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-[220px_1fr]">
        <nav className="hidden lg:block">
          <div className="sticky top-24 space-y-1 border-l border-border pl-4">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={cn(
                  "block py-1 text-sm transition-colors",
                  active === s.id
                    ? "font-semibold text-violet"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {s.title}
              </a>
            ))}
          </div>
        </nav>

        <div className="max-w-[680px] space-y-12">
          {sections.map((s) => (
            <section key={s.id} id={s.id} className="scroll-mt-24">
              <h2 className="text-xl font-semibold">{s.title}</h2>
              <div className="prose-legal mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground">
                {s.body}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
