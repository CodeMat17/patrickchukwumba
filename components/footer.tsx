"use client"

import { ArrowUp } from "lucide-react"
import { profile } from "@/lib/cv"
import { scrollToTop } from "@/lib/smooth-scroll"

export function Footer() {
  return (
    <footer className="border-t border-hairline bg-[var(--surface-2)]">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3.5">
            <span className="grid size-10 place-items-center rounded-xl gradient-gold text-[0.72rem] font-bold text-[oklch(0.16_0.02_265)] shadow-soft">
              {profile.monogram}
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-display text-[1rem] text-foreground">
                {profile.displayName}
              </span>
              <span className="mt-1.5 text-[0.7rem] text-muted-foreground">
                {profile.title} · {profile.location}
              </span>
            </span>
          </div>

          <button
            onClick={scrollToTop}
            className="group inline-flex items-center gap-2 rounded-full border border-hairline px-5 py-2.5 text-[0.78rem] font-medium text-muted-foreground transition-colors duration-500 hover:border-gold/40 hover:text-foreground"
          >
            Back to top
            <ArrowUp className="size-3.5 transition-transform duration-500 group-hover:-translate-y-0.5" />
          </button>
        </div>

        <div className="rule-fade my-8" />

        <div className="flex flex-col items-start justify-between gap-3 text-[0.73rem] text-muted-foreground sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {profile.displayName}. All rights reserved.
          </p>
          <p>
            {profile.company} · {profile.group}
          </p>
        </div>
      </div>
    </footer>
  )
}
