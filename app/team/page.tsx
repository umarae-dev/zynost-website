import type { Metadata } from "next";
import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";
import { Reveal, RevealGroup, RevealItem } from "@/components/shared/Reveal";
import { MagneticButton } from "@/components/shared/MagneticButton";
import { LinkedinLogo } from "@/components/shared/SocialIcons";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Team",
  description: `The people building ${SITE.name} — Zynost, Zynost Pay, and UQX.`,
};

type TeamMember = {
  name: string;
  role: string;
  bio: string;
  image: string | null;
  linkedin: string;
  initials: string;
};

// Falls back to an initials avatar if the photo hasn't been dropped into
// public/team/ yet, so this page never ships a broken <img> in the meantime.
function photoIfExists(filename: string): string | null {
  const exists = fs.existsSync(path.join(process.cwd(), "public", "team", filename));
  return exists ? `/team/${filename}` : null;
}

const TEAM: TeamMember[] = [
  {
    name: "Muhammad Umar",
    role: "Founder & CEO",
    bio: "Builds and runs Zynost end-to-end — product, engineering, and the ecosystem strategy tying Zynost, Zynost Pay, and UQX together.",
    image: photoIfExists("muhammad-umar.png"),
    linkedin: "https://www.linkedin.com/in/umarae-dev/",
    initials: "MU",
  },
  {
    name: "Syed Noor Khan",
    role: "Head of Business Development & Digital Marketing",
    bio: "Leads business development and digital marketing — growing Zynost's reach and partnerships across the ecosystem.",
    image: photoIfExists("syed-noor-khan.png"),
    linkedin: "https://www.linkedin.com/in/syednoor-khan-47406a386/",
    initials: "SK",
  },
];

export default function TeamPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <Reveal className="text-center">
        <span className="text-xs font-semibold uppercase tracking-wider text-violet">Team</span>
        <h1 className="mt-3 text-balance text-4xl font-bold tracking-tight sm:text-5xl">
          The people building {SITE.name}.
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
          Real people, not an anonymous project. Every product across the ecosystem, from{" "}
          {SITE.name} to Zynost Pay to UQX, is built and run by the people below.
        </p>
      </Reveal>

      <RevealGroup className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {TEAM.map((member) => (
          <RevealItem key={member.name}>
            <TeamCard member={member} />
          </RevealItem>
        ))}
        <RevealItem>
          <JoinTeamCard />
        </RevealItem>
      </RevealGroup>

      <Reveal delay={0.1} className="mt-16 flex justify-center">
        <MagneticButton href="/about">More About {SITE.name}</MagneticButton>
      </Reveal>
    </div>
  );
}

function TeamCard({ member }: { member: TeamMember }) {
  return (
    <div className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card p-7 transition-colors hover:border-violet/40">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-violet/10 blur-2xl transition-opacity duration-300 group-hover:opacity-80"
      />
      <div className="relative flex items-start gap-5">
        <div className="relative shrink-0">
          <div className="h-20 w-20 overflow-hidden rounded-2xl border border-border bg-surface-2 sm:h-24 sm:w-24">
            {member.image ? (
              <Image
                src={member.image}
                alt={member.name}
                width={96}
                height={96}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-violet/20 to-sky/20 text-lg font-bold text-violet">
                {member.initials}
              </div>
            )}
          </div>
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${member.name} on LinkedIn`}
            className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background text-[#0A66C2] shadow-sm transition-transform hover:scale-110"
          >
            <LinkedinLogo className="h-4 w-4" />
          </a>
        </div>
        <div className="min-w-0 pt-1">
          <h2 className="text-lg font-semibold">{member.name}</h2>
          <p className="mt-0.5 text-sm font-medium text-violet">{member.role}</p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{member.bio}</p>
        </div>
      </div>
    </div>
  );
}

function JoinTeamCard() {
  return (
    <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-dashed border-border p-7 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-dashed border-border text-muted-foreground">
        +
      </div>
      <p className="mt-4 text-sm font-medium text-foreground">Growing, one hire at a time.</p>
      <p className="mt-1.5 max-w-[26ch] text-sm text-muted-foreground">
        This page gets updated as the team grows — check back for more.
      </p>
    </div>
  );
}
