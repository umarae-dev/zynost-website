import type { Metadata } from "next";
import { LegalPageShell, LegalSection } from "@/components/legal/LegalPageShell";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Data Deletion Instructions",
  description: `How to permanently delete your ${SITE.name} account and all associated data.`,
};

const sections: LegalSection[] = [
  {
    id: "overview",
    title: "1. Overview",
    body: (
      <p>
        You can permanently delete your {SITE.name} account — and every record tied to
        it — at any time, directly from within the app. This applies no matter how you
        originally signed up: email and password, Google, or Facebook.
      </p>
    ),
  },
  {
    id: "delete-in-app",
    title: "2. Delete your account (recommended)",
    body: (
      <ol className="list-decimal space-y-2 pl-5">
        <li>Open the {SITE.name} app and sign in.</li>
        <li>Go to your account icon in the top right corner, then select your Profile.</li>
        <li>Scroll down to the bottom of the Profile page.</li>
        <li>
          Tap <strong className="text-foreground">&ldquo;Delete my account&rdquo;</strong>, type{" "}
          <strong className="text-foreground">DELETE</strong> to confirm, and (if your
          account has a password set) re-enter it.
        </li>
      </ol>
    ),
  },
  {
    id: "what-gets-deleted",
    title: "3. What this deletes",
    body: (
      <>
        <p>This immediately and permanently removes:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Your account itself (email, login credentials, profile settings).</li>
          <li>Your portfolio holdings and logged trades.</li>
          <li>Price alerts, watchlist entries, and notifications.</li>
          <li>Planned trades and saved trade plans.</li>
          <li>Billing/payment invoice records and any refund requests tied to your account.</li>
        </ul>
        <p>
          This action cannot be undone — there is no recovery period or soft-delete. If you
          only want to disconnect Facebook or Google without deleting your whole account, use
          that provider&apos;s own connected-apps settings instead (this only revokes their
          login access; your {SITE.name} account and data stay intact).
        </p>
      </>
    ),
  },
  {
    id: "no-app-access",
    title: "4. Can't access the app?",
    body: (
      <p>
        If you no longer have access to the app, email{" "}
        <a href="mailto:privacy@zynost.com" className="text-violet hover:underline">
          privacy@zynost.com
        </a>{" "}
        from the address on your account and ask us to delete it — we&apos;ll verify your
        identity and confirm once it&apos;s done, typically within a few business days.
      </p>
    ),
  },
  {
    id: "more-info",
    title: "5. More information",
    body: (
      <p>
        See our{" "}
        <a href="/privacy-policy" className="text-violet hover:underline">
          Privacy Policy
        </a>{" "}
        for full details on what data we collect and how it&apos;s used before deletion.
      </p>
    ),
  },
];

export default function DataDeletionPage() {
  return (
    <LegalPageShell
      title="Data Deletion Instructions"
      updatedAt="August 5, 2026"
      sections={sections}
    />
  );
}
