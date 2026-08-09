"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

// next-themes already handles the FOUC-free class application (via
// ThemeProvider's own injected script) and persistence to localStorage —
// this is just the button. `mounted` guards the icon choice until after
// hydration, since `resolvedTheme` is unknown on the server.
export function ThemeToggle({ className = "" }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
      className={`flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:text-foreground ${className}`}
    >
      {mounted && (isDark ? <Sun size={15} /> : <Moon size={15} />)}
    </button>
  );
}
