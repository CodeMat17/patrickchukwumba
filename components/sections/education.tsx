"use client"

import { Award, GraduationCap } from "lucide-react"
import { certifications, education } from "@/lib/cv"
import { RevealGroup, RevealItem, SectionHeading } from "@/components/ui/reveal"

export function Education() {
  return (
    <section
      id="education"
      className="scroll-mt-24 border-y border-hairline bg-[var(--surface-2)] py-24 sm:py-36"
    >
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Education & Qualifications"
          title="Chartered, and"
          accent="commercially trained"
          description="A postgraduate business qualification alongside three professional institute memberships in accounting, taxation and cost management."
        />

        <RevealGroup stagger={0.1} className="mt-20 grid gap-6 md:grid-cols-2">
          {/* Education */}
          <RevealItem className="h-full">
            <div className="lift h-full rounded-3xl surface-card p-7 sm:p-8">
              <div className="flex items-center gap-3">
                <span
                  className="grid size-10 place-items-center rounded-xl"
                  style={{
                    background: "color-mix(in oklab, var(--gold) 13%, transparent)",
                  }}
                >
                  <GraduationCap className="size-[1.05rem]" style={{ color: "var(--gold)" }} />
                </span>
                <h3 className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Education
                </h3>
              </div>

              <div className="rule-fade my-7" />

              {education.map((item) => (
                <div key={item.abbr}>
                  <div className="flex items-baseline gap-3">
                    <span
                      className="font-display text-4xl leading-none"
                      style={{ color: "var(--gold)" }}
                    >
                      {item.abbr}
                    </span>
                  </div>
                  <h4 className="mt-4 font-display text-xl text-foreground">
                    {item.title}
                  </h4>
                  <p className="mt-2 text-[0.88rem] text-muted-foreground">
                    {item.institution}
                  </p>
                  <p className="mt-0.5 text-[0.82rem] text-muted-foreground/70">
                    {item.location}
                  </p>
                </div>
              ))}
            </div>
          </RevealItem>

          {/* Professional qualifications */}
          <RevealItem className="h-full">
            <div className="lift h-full rounded-3xl surface-card p-7 sm:p-8">
              <div className="flex items-center gap-3">
                <span
                  className="grid size-10 place-items-center rounded-xl"
                  style={{
                    background: "color-mix(in oklab, var(--gold) 13%, transparent)",
                  }}
                >
                  <Award className="size-[1.05rem]" style={{ color: "var(--gold)" }} />
                </span>
                <h3 className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Professional Qualifications
                </h3>
              </div>

              <div className="rule-fade my-7" />

              <ul className="space-y-0">
                {certifications.map((cert) => (
                  <li
                    key={cert.abbr}
                    className="group flex items-baseline gap-5 border-b border-hairline py-5 last:border-0"
                  >
                    <span
                      className="w-14 shrink-0 font-display text-xl leading-none transition-transform duration-500 group-hover:translate-x-0.5"
                      style={{ color: "var(--gold)" }}
                    >
                      {cert.abbr}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[0.9rem] font-semibold text-foreground">
                        {cert.title}
                      </span>
                      <span className="mt-0.5 block text-[0.83rem] leading-snug text-muted-foreground">
                        {cert.institution}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  )
}
