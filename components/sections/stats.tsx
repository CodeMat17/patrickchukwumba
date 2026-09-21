"use client"

import { stats } from "@/lib/cv"
import { Counter, RevealGroup, RevealItem } from "@/components/ui/reveal"

export function Stats() {
  return (
    <section className="relative border-b border-hairline bg-background">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* 1px gutters filled by the container colour draw the dividers, so the
            grid stays correct at every breakpoint without per-index border rules.
            The opaque cell wrapper sits outside the animated element, otherwise
            the gutter colour would flash through while the content fades in. */}
        <RevealGroup
          stagger={0.1}
          className="grid grid-cols-1 gap-px bg-[var(--hairline)] sm:grid-cols-2 lg:grid-cols-4"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="group bg-background px-6 py-10 sm:px-8 sm:py-14"
            >
              <RevealItem>
                <span className="block font-display text-[clamp(2.4rem,5vw,3.6rem)] leading-none text-foreground">
                  {stat.prefix}
                  <Counter value={stat.value} duration={2200} />
                  {stat.suffix}
                </span>

                <div className="mt-4 h-px w-10 origin-left bg-gold transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-[3]" />

                <p className="mt-4 text-[0.8rem] font-semibold uppercase tracking-[0.16em] text-foreground">
                  {stat.label}
                </p>
                <p className="mt-2.5 max-w-[26ch] text-[0.83rem] leading-relaxed text-muted-foreground">
                  {stat.description}
                </p>
              </RevealItem>
            </div>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
