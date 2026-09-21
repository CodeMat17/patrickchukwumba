"use client"

import type { CSSProperties } from "react"
import { ArrowDown, ArrowUpRight, Mail, MapPin } from "lucide-react"
import { profile, categories } from "@/lib/cv"
import { RevealWords } from "@/components/ui/reveal"
import { scrollToSection } from "@/lib/smooth-scroll"

const HEADER_OFFSET = 88

/** Inline vars for the CSS `animate-rise` entrance, which runs before hydration. */
const rise = (delay: number, y = 18, duration = 0.9) =>
  ({
    "--rise-y": `${y}px`,
    animationDuration: `${duration}s`,
    animationDelay: `${delay}s`,
  }) as CSSProperties

export function Hero() {
  // Parallax (content drifts and fades, light pools and grid drift) runs on
  // CSS scroll timeline — see the `parallax-*` classes in globals.css.
  return (
    <section
      className="grain relative flex min-h-[100svh] items-center overflow-hidden gradient-ink"
    >
      {/* Brass light pools */}
      <div className="parallax-orbs absolute inset-0" aria-hidden>
        <div
          className="absolute -right-[10%] top-[6%] size-[min(46rem,90vw)] scale-[1.4] rounded-full opacity-[0.22]"
          style={{ background: `radial-gradient(closest-side, var(--gold) 15%, transparent)` }}
        />
        <div
          className="absolute -left-[12%] bottom-[-8%] size-[min(34rem,80vw)] scale-[1.4] rounded-full opacity-[0.14]"
          style={{ background: `radial-gradient(closest-side, var(--gold-deep) 15%, transparent)` }}
        />
      </div>

      {/* Engraved grid */}
      <div
        className="parallax-grid grid-etch absolute inset-0 opacity-[0.045]"
        aria-hidden
      />

      <div
        className="parallax-content relative z-10 mx-auto w-full max-w-7xl px-5 pb-28 pt-32 sm:px-8 sm:pt-36"
      >
        <div className="grid items-end gap-14 lg:grid-cols-[1.35fr_1fr]">
          {/* ── Left: the statement ── */}
          <div>
            <div
              className="animate-rise inline-flex items-center gap-2.5 rounded-full glass-dark px-4 py-2"
              style={rise(0.15, 16, 0.8)}
            >
              <span className="relative flex size-1.5">
                <span
                  className="absolute inline-flex size-full animate-ping rounded-full opacity-70"
                  style={{ background: "var(--gold)" }}
                />
                <span
                  className="relative inline-flex size-1.5 rounded-full"
                  style={{ background: "var(--gold)" }}
                />
              </span>
              <span className="text-[0.68rem] font-medium uppercase tracking-[0.18em] text-white/70">
                {profile.company} · {profile.group}
              </span>
            </div>

            <h1 className="mt-8 font-display text-[clamp(2.9rem,8.2vw,6.4rem)] leading-[0.94] text-white">
              <RevealWords text="Patrick" delay={0.3} />
              <br />
              <span className="relative inline-block">
                <RevealWords
                  text="Chukwumba"
                  delay={0.4}
                  highlight={["Chukwumba"]}
                />
                {/* Hand-drawn brass underline, stroked in after the name reveals */}
                <svg
                  viewBox="0 0 300 24"
                  preserveAspectRatio="none"
                  className="pointer-events-none absolute -bottom-[0.14em] left-0 h-[0.22em] w-full overflow-visible"
                  aria-hidden
                >
                  <path
                    className="animate-draw"
                    pathLength={1}
                    d="M4 16 C 60 6, 120 4, 180 9 S 270 18, 296 8"
                    fill="none"
                    stroke="var(--gold)"
                    strokeWidth={5}
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
              </span>
              <br />
              <RevealWords text="Okorie" delay={0.5} />
            </h1>

            <div
              className="animate-rise mt-8 flex flex-wrap items-center gap-x-5 gap-y-3"
              style={rise(0.8, 0, 1)}
            >
              <span className="text-[0.95rem] font-medium uppercase tracking-[0.2em] text-white/85 sm:text-[1.05rem]">
                {profile.title}
              </span>
              <span className="hidden h-4 w-px bg-white/20 sm:block" />
              <span className="inline-flex items-center gap-1.5 text-sm text-white/50">
                <MapPin className="size-3.5" />
                {profile.location}
              </span>
            </div>

            <p
              className="animate-rise mt-7 max-w-xl text-[0.98rem] leading-[1.75] text-white/60"
              style={rise(0.92, 18, 0.9)}
            >
              22+ years inside the HEINEKEN Group, turning a finance foundation into
              procurement leadership — a{" "}
              <span className="font-semibold text-white/90">€450M+</span> annual spend
              portfolio and an ecosystem of{" "}
              <span className="font-semibold text-white/90">1,100+ suppliers</span>.
            </p>

            <div
              className="animate-rise mt-10 flex flex-wrap items-center gap-3"
              style={rise(1.04, 18, 0.9)}
            >
              <button
                onClick={() => scrollToSection("#experience", HEADER_OFFSET)}
                className="sheen group inline-flex items-center gap-2 rounded-full gradient-gold px-7 py-3.5 text-[0.85rem] font-semibold text-[oklch(0.16_0.02_265)] shadow-lift transition-transform duration-500 hover:-translate-y-0.5"
              >
                Explore the career
                <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>

              <button
                onClick={() => scrollToSection("#contact", HEADER_OFFSET)}
                className="inline-flex items-center gap-2 rounded-full glass-dark px-7 py-3.5 text-[0.85rem] font-semibold text-white transition-colors duration-300 hover:bg-white/15"
              >
                <Mail className="size-4" />
                Get in touch
              </button>
            </div>
          </div>

          {/* ── Right: the ledger ── */}
          <div
            className="animate-rise rounded-3xl glass-dark p-7 sm:p-8"
              style={rise(0.7, 28, 1)}
          >
            <p className="text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-white/40">
              Categories under management
            </p>

            <ul className="mt-6 space-y-0">
              {categories.map((category, i) => (
                <li
                  key={category}
                  style={{ "--rise-x": "14px", "--rise-y": "0px", animationDuration: "0.7s", animationDelay: `${0.95 + i * 0.07}s` } as CSSProperties}
                  className="animate-rise flex items-baseline gap-4 border-b border-white/8 py-3 last:border-0"
                >
                  <span
                    className="text-[0.62rem] font-semibold tabular"
                    style={{ color: "var(--gold)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[0.92rem] text-white/75">{category}</span>
                </li>
              ))}
            </ul>

            <div className="mt-7 flex items-end justify-between border-t border-white/10 pt-6">
              <div>
                <p className="text-[0.62rem] uppercase tracking-[0.2em] text-white/40">
                  Annual spend
                </p>
                <p
                  className="mt-1.5 font-display text-3xl"
                  style={{ color: "var(--gold)" }}
                >
                  €450M+
                </p>
              </div>
              <div className="text-right">
                <p className="text-[0.62rem] uppercase tracking-[0.2em] text-white/40">
                  Suppliers
                </p>
                <p className="mt-1.5 font-display text-3xl text-white">1,100+</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <button
        onClick={() => scrollToSection("#about", HEADER_OFFSET)}
        style={rise(1.6, 0, 1)}
        className="animate-rise absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2.5 text-white/35 transition-colors duration-300 hover:text-white/70"
        aria-label="Scroll to about section"
      >
        <span className="text-[0.6rem] uppercase tracking-[0.3em]">Scroll</span>
        <span className="animate-bob">
          <ArrowDown className="size-4" />
        </span>
      </button>
    </section>
  )
}
