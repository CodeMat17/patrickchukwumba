"use client"

import { earlierRoles, roles } from "@/lib/cv"
import { Reveal, RevealGroup, RevealItem, SectionHeading } from "@/components/ui/reveal"

function RoleCard({ role }: { role: (typeof roles)[number] }) {
  return (
    <div
      className={`lift rounded-2xl p-6 sm:p-7 ${
        role.isCurrent
          ? "surface-card border-gold/35"
          : "surface-card"
      }`}
      style={
        role.isCurrent
          ? {
              background:
                "linear-gradient(135deg, color-mix(in oklab, var(--gold) 6%, var(--surface)), var(--surface))",
            }
          : undefined
      }
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h3 className="font-display text-[1.25rem] leading-snug text-foreground">
            {role.title}
          </h3>
          <p className="mt-1.5 text-[0.8rem] text-muted-foreground">
            {role.company} · {role.location}
          </p>
        </div>

        <div className="shrink-0 sm:text-right">
          <p className="text-[0.78rem] font-medium tabular text-foreground">
            {role.period}
          </p>
          <p className="mt-0.5 text-[0.72rem] text-muted-foreground">{role.duration}</p>
          {role.isCurrent ? (
            <span
              className="mt-2 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.12em]"
              style={{
                background: "color-mix(in oklab, var(--gold) 15%, transparent)",
                color: "var(--gold)",
              }}
            >
              <span
                className="size-1 rounded-full"
                style={{ background: "var(--gold)" }}
              />
              Current
            </span>
          ) : null}
        </div>
      </div>

      <div className="rule-fade my-5" />

      <ul className="space-y-2.5">
        {role.points.map((point) => (
          <li key={point} className="flex items-start gap-3">
            <span
              className="mt-[0.5rem] size-1 shrink-0 rounded-full"
              style={{ background: "var(--gold)" }}
            />
            <span className="text-[0.86rem] leading-relaxed text-muted-foreground">
              {point}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Experience() {
  return (
    <section
      id="experience"
      className="scroll-mt-24 border-y border-hairline bg-[var(--surface-2)] py-24 sm:py-36"
    >
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Professional Experience"
          title="Two decades of compounding"
          accent="responsibility"
          description="A single-company career inside the HEINEKEN Group — from inventory accounting in Ibadan to a €450M+ category portfolio at Lagos headquarters."
        />

        {/* ── Timeline ── */}
        <div className="relative mt-20 pl-8 sm:pl-12">
          {/* Track */}
          <div
            className="absolute left-[3px] top-2 bottom-2 w-px sm:left-[7px]"
            style={{ background: "var(--hairline)" }}
            aria-hidden
          />
          {/* Fill — grows as the timeline scrolls past the middle of the viewport (CSS scroll timeline). */}
          <div
            className="timeline-fill absolute left-[3px] top-2 bottom-2 w-px origin-top sm:left-[7px]"
            aria-hidden
          >
            <div
              className="h-full w-full"
              style={{
                background:
                  "linear-gradient(to bottom, var(--gold-soft), var(--gold), var(--gold-deep))",
              }}
            />
          </div>

          <RevealGroup stagger={0.1} amount={0.05} className="space-y-6">
            {roles.map((role) => (
              <RevealItem key={role.period} y={30}>
                <div className="relative">
                  {/* Node */}
                  <span
                    className="absolute -left-8 top-8 grid size-[9px] place-items-center rounded-full ring-4 sm:-left-12"
                    style={{
                      background: role.isCurrent ? "var(--gold)" : "var(--border)",
                      // @ts-expect-error -- CSS custom property shorthand for the ring color
                      "--tw-ring-color": "var(--surface-2)",
                    }}
                    aria-hidden
                  />
                  <RoleCard role={role} />
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        {/* ── Earlier finance roles ── */}
        <div className="mt-20">
          <Reveal direction="up">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-gold/60" />
                <span className="eyebrow">Earlier Finance Roles</span>
              </div>
              <span className="text-[0.78rem] tabular text-muted-foreground">
                Nigerian Breweries Plc · 2004 — 2012
              </span>
            </div>
          </Reveal>

          <RevealGroup stagger={0.07} className="mt-7">
            {earlierRoles.map((role) => (
              <RevealItem key={role.period} y={16}>
                <div className="group grid gap-2 border-b border-hairline py-5 transition-colors duration-500 hover:border-gold/40 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-8">
                  <div>
                    <h4 className="text-[0.95rem] font-semibold text-foreground transition-colors duration-500 group-hover:text-gold">
                      {role.title}
                    </h4>
                    <p className="mt-1.5 max-w-[62ch] text-[0.84rem] leading-relaxed text-muted-foreground">
                      {role.point}
                    </p>
                  </div>
                  <div className="sm:text-right">
                    <p className="text-[0.78rem] font-medium tabular text-foreground">
                      {role.period}
                    </p>
                    <p className="mt-0.5 text-[0.72rem] text-muted-foreground">
                      {role.location}
                    </p>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  )
}
