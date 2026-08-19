import type { Metadata } from "next";
import { LegalPageShell, LegalSection } from "@/components/legal/LegalPageShell";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "UQX Data Deletion Instructions",
  description: "How to permanently delete your UQX account and associated data.",
};

const sections: LegalSection[] = [
  {
    id: "overview",
    title: "1. Overview",
    body: (
      <p>
        You can request permanent deletion of your <strong className="text-foreground">UQX</strong>{" "}
        account (package <code className="text-foreground">com.umartech.umarae</code>, a{" "}
        {SITE.name} product) and its associated personal data at any time, directly from
        within the app.
      </p>
    ),
  },
  {
    id: "delete-in-app",
    title: "2. Delete your account (recommended)",
    body: (
      <ol className="list-decimal space-y-2 pl-5">
        <li>Open the UQX app and sign in.</li>
        <li>Go to the Profile tab, then open Settings.</li>
        <li>Scroll to the bottom of the Security section.</li>
        <li>
          Tap <strong className="text-foreground">&ldquo;Delete Account&rdquo;</strong> and
          confirm with your password.
        </li>
      </ol>
    ),
  },
  {
    id: "what-gets-deleted",
    title: "3. What this deletes",
    body: (
      <>
        <p>Deleting your account immediately and permanently:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Removes your name, email, phone number, and profile photo.</li>
          <li>Resets your password and disables two-factor authentication.</li>
          <li>Signs you out of every device and revokes all active sessions.</li>
          <li>Your account is de-identified — it can no longer be used to sign in or be linked back to you.</li>
        </ul>
        <p className="mt-3">
          <strong className="text-foreground">What we keep, and why:</strong> mining reward,
          referral, and UQX transfer records that involve other users are retained in
          de-identified form — a transfer you sent or received is one half of another
          user&apos;s own balance record, so we can&apos;t delete it without corrupting their
          real balance. Your identity is removed from these records; the numbers themselves
          stay accurate for everyone else.
        </p>
        <p className="mt-3">
          This action cannot be undone — there is no recovery period.
        </p>
      </>
    ),
  },
  {
    id: "wallet-note",
    title: "4. Your on-chain wallet",
    body: (
      <p>
        If you created UQX&apos;s built-in non-custodial wallet, its private key and recovery
        phrase were always generated and stored only on your own device — we never had a copy
        to delete. Deleting your UQX account has no effect on that wallet or any tokens in it;
        write down your recovery phrase before deleting your account if you still want access
        to it afterward.
      </p>
    ),
  },
  {
    id: "no-app-access",
    title: "5. Can't access the app?",
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
    title: "6. More information",
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

export default function UqxDataDeletionPage() {
  return (
    <LegalPageShell
      title="UQX Data Deletion Instructions"
      updatedAt="August 19, 2026"
      sections={sections}
    />
  );
}
