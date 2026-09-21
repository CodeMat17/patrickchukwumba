"use client"

import { Check } from "lucide-react"
import {
  careerHighlights,
  coreCompetencies,
  profile,
} from "@/lib/cv"
import { ProfilePhoto } from "@/components/profile-photo"
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal"

const facts = [
  { label: "Current role", value: profile.currentRole },
  { label: "Organisation", value: profile.company },
  { label: "Group", value: profile.group },
  { label: "Based in", value: profile.location },
] as const

export function About() {
  return (
    <section id="about" className="scroll-mt-24 py-24 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] lg:gap-20">
          {/* ── Portrait column (sticks while the prose scrolls) ── */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal direction="right">
              <ProfilePhoto className="aspect-[4/5] w-full" />
            </Reveal>

            <Reveal direction="up" delay={0.15}>
              <dl className="mt-10 space-y-0">
                {facts.map((fact) => (
                  <div
                    key={fact.label}
                    className="flex items-baseline justify-between gap-4 border-b border-hairline py-3.5 last:border-0"
                  >
                    <dt className="text-[0.68rem] uppercase tracking-[0.16em] text-muted-foreground">
                      {fact.label}
                    </dt>
                    <dd className="text-right text-[0.85rem] font-medium text-foreground">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          {/* ── Prose column ── */}
          <div>
            <Reveal direction="up">
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-gold/60" />
                <span className="eyebrow">Professional Summary</span>
              </div>
            </Reveal>

            <Reveal direction="up" delay={0.08}>
              <h2 className="mt-6 font-display text-[clamp(1.9rem,3.6vw,2.9rem)] leading-[1.14] text-foreground">
                A finance foundation turned into{" "}
                <span className="text-gradient-gold">procurement leadership</span>.
              </h2>
            </Reveal>

            <Reveal direction="up" delay={0.14}>
              <p className="mt-7 text-[1rem] leading-[1.8] text-muted-foreground">
                {profile.summary}
              </p>
            </Reveal>

            <Reveal direction="up" delay={0.2}>
              <p className="mt-5 text-[1rem] leading-[1.8] text-muted-foreground">
                {profile.profileStatement}
              </p>
            </Reveal>

            {/* Core competencies */}
            <Reveal direction="up" delay={0.26}>
              <div className="mt-14 flex items-center gap-3">
                <span className="h-px w-8 bg-gold/60" />
                <span className="eyebrow">Core Competencies</span>
              </div>
            </Reveal>

            <RevealGroup
              stagger={0.045}
              className="mt-6 grid gap-x-8 gap-y-0 sm:grid-cols-2"
            >
              {coreCompetencies.map((competency) => (
                <RevealItem key={competency} y={14}>
                  <div className="flex items-start gap-3 border-b border-hairline py-3.5">
                    <span
                      className="mt-[0.45rem] size-1.5 shrink-0 rounded-full"
                      style={{ background: "var(--gold)" }}
                    />
                    <span className="text-[0.88rem] leading-snug text-foreground">
                      {competency}
                    </span>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>

            {/* Selected career highlights */}
            <Reveal direction="up" delay={0.1}>
              <div className="mt-16 flex items-center gap-3">
                <span className="h-px w-8 bg-gold/60" />
                <span className="eyebrow">Selected Career Highlights</span>
              </div>
            </Reveal>

            <RevealGroup stagger={0.07} className="mt-6 grid gap-3 sm:grid-cols-2">
              {careerHighlights.map((highlight) => (
                <RevealItem key={highlight} className="h-full">
                  <div className="lift h-full rounded-2xl surface-card p-5">
                    <span
                      className="grid size-7 place-items-center rounded-lg"
                      style={{
                        background: "color-mix(in oklab, var(--gold) 14%, transparent)",
                      }}
                    >
                      <Check className="size-3.5" style={{ color: "var(--gold)" }} />
                    </span>
                    <p className="mt-3.5 text-[0.86rem] leading-relaxed text-muted-foreground">
                      {highlight}
                    </p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </div>
    </section>
  )
}
