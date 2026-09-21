"use client"

import { careerSnapshot, technicalSkills } from "@/lib/cv"
import { Reveal, RevealGroup, RevealItem, SectionHeading } from "@/components/ui/reveal"

export function Skills() {
  return (
    <section id="skills" className="scroll-mt-24 py-24 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Technical Skills"
          title="Where the"
          accent="expertise sits"
          description="Commercial procurement capability built on top of a chartered finance foundation."
        />

        {/* ── Technical skills ── */}
        <RevealGroup stagger={0.1} className="mt-20 grid gap-6 lg:grid-cols-3">
          {technicalSkills.map((group, gi) => (
            <RevealItem key={group.group} className="h-full">
              <div className="lift sheen h-full rounded-3xl surface-card p-7 sm:p-8">
                <div className="flex items-baseline justify-between">
                  <h3 className="font-display text-xl text-foreground">
                    {group.group}
                  </h3>
                  <span
                    className="text-[0.66rem] font-semibold tabular"
                    style={{ color: "var(--gold)" }}
                  >
                    {String(gi + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="rule-fade my-6" />

                <ul className="space-y-0">
                  {group.skills.map((skill) => (
                    <li
                      key={skill}
                      className="flex items-center gap-3 border-b border-hairline py-3 last:border-0"
                    >
                      <span
                        className="size-1 shrink-0 rounded-full"
                        style={{ background: "var(--gold)" }}
                      />
                      <span className="text-[0.87rem] text-muted-foreground">
                        {skill}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        {/* ── Career snapshot ── */}
        <Reveal direction="up" className="mt-24">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-gold/60" />
            <span className="eyebrow">Career Snapshot</span>
          </div>
        </Reveal>

        <RevealGroup stagger={0.08} className="mt-8">
          {careerSnapshot.map((item, i) => (
            <RevealItem key={item.area} y={18}>
              <div className="group grid gap-2 border-b border-hairline py-6 transition-colors duration-500 hover:border-gold/40 md:grid-cols-[auto_minmax(0,18rem)_1fr] md:items-baseline md:gap-8">
                <span
                  className="text-[0.66rem] font-semibold tabular"
                  style={{ color: "var(--gold)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h4 className="font-display text-[1.15rem] text-foreground transition-colors duration-500 group-hover:text-gold">
                  {item.area}
                </h4>
                <p className="text-[0.88rem] leading-relaxed text-muted-foreground">
                  {item.detail}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
