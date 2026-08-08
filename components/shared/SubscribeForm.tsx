"use client";

import { useState } from "react";

export function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    try {
      // Same-origin route (see app/api/subscribe/route.ts) that proxies to
      // the real backend server-side — avoids the browser ever making a
      // cross-origin request for this at all.
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("Subscribe failed");
      setStatus("done");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <p className="mt-4 text-sm text-bullish">You&apos;re subscribed — thanks!</p>
    );
  }

  return (
    <form className="mt-4 flex flex-col gap-2" onSubmit={handleSubmit}>
      <label htmlFor="footer-email" className="sr-only">
        Email address
      </label>
      <input
        id="footer-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@email.com"
        className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus:border-violet"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-lg bg-violet px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-violet-dim disabled:opacity-60"
      >
        {status === "loading" ? "Subscribing..." : "Subscribe"}
      </button>
      {status === "error" && (
        <p className="text-xs text-bearish">Something went wrong — try again.</p>
      )}
    </form>
  );
}
