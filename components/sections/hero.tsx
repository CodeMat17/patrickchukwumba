"use client"

import type { CSSProperties } from "react"
import { ArrowDown, ArrowUpRight, Mail, MapPin } from "lucide-react"
import type { Content } from "@/lib/cv"
import { useContent } from "@/components/content-provider"
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

/** Each phase is sized by its length in years; an empty end year means "to today". The last phase is the gold one. */
const careerArc = (hero: Content["hero"]) =>
  hero.careerArc.map((phase, i, all) => ({
    label: phase.label,
    span: phase.span,
    years: Math.max(1, (phase.endYear ?? new Date().getFullYear()) - phase.startYear),
    color: i === all.length - 1 ? "var(--gold)" : "rgb(255 255 255 / 0.28)",
  }))

/** Splits the intro so every phrase listed in `introHighlights` renders bold. */
function introParts(hero: Content["hero"]) {
  const phrases = hero.introHighlights.filter(Boolean)
  if (phrases.length === 0) return [hero.intro]
  const escaped = phrases.map((p) => p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
  return hero.intro.split(new RegExp(`(${escaped.join("|")})`))
}

export function Hero() {
  const { profile, hero, categories, roles, education, certifications } = useContent()
  const currentRole = roles.find((role) => role.isCurrent) ?? roles[0]
  const credentials = [...education, ...certifications]
  const arc = careerArc(hero)

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
        className="parallax-content relative z-10 mx-auto w-full max-w-7xl px-5 pb-28 pt-32 sm:px-8 sm:pt-36 lg:pb-[max(4.5rem,9svh)] lg:pt-[calc(88px+4svh)]"
      >
        <div className="grid items-end gap-14 lg:grid-cols-[1.35fr_1fr] lg:items-center lg:gap-[clamp(2.5rem,5vw,4.5rem)]">
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

            <h1 className="mt-8 font-display text-[clamp(2.9rem,8.2vw,6.4rem)] leading-[0.94] lg:mt-[3svh] lg:text-[clamp(3.25rem,min(6.4vw,11svh),6.4rem)] text-white">
              <RevealWords text={hero.nameLine1} delay={0.3} />
              <br />
              <span className="relative inline-block">
                <RevealWords
                  text={hero.nameLine2}
                  delay={0.4}
                  highlight={hero.nameLine2.split(" ")}
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
              <RevealWords text={hero.nameLine3} delay={0.5} />
            </h1>

            <div
              className="animate-rise mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 lg:mt-[3svh]"
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
              className="animate-rise mt-7 max-w-xl text-[0.98rem] lg:mt-[2.5svh] leading-[1.75] text-white/60"
              style={rise(0.92, 18, 0.9)}
            >
              {introParts(hero).map((part, i) =>
                // split() with a capture group puts the matched phrases at odd indexes
                i % 2 === 1 ? (
                  <span key={i} className="font-semibold text-white/90">
                    {part}
                  </span>
                ) : (
                  part
                )
              )}
            </p>

            <div
              className="animate-rise mt-10 flex flex-wrap items-center gap-3 lg:mt-[4svh]"
              style={rise(1.04, 18, 0.9)}
            >
              <button
                onClick={() => scrollToSection("#experience", HEADER_OFFSET)}
                className="sheen group inline-flex items-center gap-2 rounded-full gradient-gold px-7 py-3.5 text-[0.85rem] font-semibold text-[oklch(0.16_0.02_265)] shadow-lift transition-transform duration-500 hover:-translate-y-0.5"
              >
                {hero.primaryButton}
                <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>

              <button
                onClick={() => scrollToSection("#contact", HEADER_OFFSET)}
                className="inline-flex items-center gap-2 rounded-full glass-dark px-7 py-3.5 text-[0.85rem] font-semibold text-white transition-colors duration-300 hover:bg-white/15"
              >
                <Mail className="size-4" />
                {hero.secondaryButton}
              </button>
            </div>
          </div>

          {/* ── Right: the dossier ── */}
          <div
            className="animate-rise rounded-3xl glass-dark p-7 sm:p-8 lg:p-[clamp(1.5rem,3.2svh,2rem)]"
            style={rise(0.7, 28, 1)}
          >
            {/* Current post */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-white/40">
                  {hero.currentlyLabel}
                </p>
                <p className="mt-2.5 font-display text-[1.45rem] leading-tight text-white">
                  {currentRole.title}
                </p>
                <p className="mt-1.5 text-[0.82rem] text-white/50">
                  {currentRole.company} · {hero.sinceWord} {currentRole.period.split(/\s+[—–-]\s+/)[0]}
                </p>
              </div>
              <span
                className="mt-0.5 shrink-0 rounded-full border px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.16em]"
                style={{
                  borderColor: "color-mix(in oklab, var(--gold) 45%, transparent)",
                  color: "var(--gold)",
                }}
              >
                {currentRole.duration}
              </span>
            </div>

            {/* Career arc: finance foundation → procurement leadership */}
            <div className="mt-7 border-t border-white/10 pt-6 lg:mt-[2.4svh] lg:pt-[2.4svh]">
              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-white/40">
                {hero.careerArcLabel}
              </p>
              <div className="mt-4 lg:mt-[1.8svh] flex gap-1.5">
                {arc.map((phase, i) => (
                  <div key={phase.label} className="min-w-0" style={{ flex: `${phase.years} 1 0` }}>
                    <span
                      className="animate-grow-x block h-1.5 rounded-full"
                      style={{ background: phase.color, animationDelay: `${1 + i * 0.3}s` }}
                    />
                    <p className="mt-3 text-[0.82rem] font-medium text-white/80">{phase.label}</p>
                    <p className="mt-0.5 text-[0.7rem] tabular text-white/40">{phase.span}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className="mt-7 border-t border-white/10 pt-6 lg:mt-[2.4svh] lg:pt-[2.4svh]">
              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-white/40">
                {hero.categoriesLabel}
              </p>
              <ul className="mt-4 lg:mt-[1.8svh] flex flex-wrap gap-2">
                {categories.map((category, i) => (
                  <li
                    key={category}
                    style={rise(0.95 + i * 0.06, 8, 0.6)}
                    className="animate-rise rounded-full border border-white/10 bg-white/4 px-3 py-1.5 text-[0.76rem] text-white/70"
                  >
                    {category}
                  </li>
                ))}
              </ul>
            </div>

            {/* Credentials */}
            <div className="mt-7 border-t border-white/10 pt-6 lg:mt-[2.4svh] lg:pt-[2.4svh]">
              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-white/40">
                {hero.credentialsLabel}
              </p>
              <ul className="mt-4 lg:mt-[1.8svh] grid grid-cols-4 gap-2">
                {credentials.map((c) => (
                  <li
                    key={c.abbr}
                    title={`${c.title}, ${c.institution}`}
                    className="rounded-xl border border-white/10 py-2.5 text-center font-display text-lg"
                    style={{ color: "var(--gold)" }}
                  >
                    {c.abbr}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <button
        onClick={() => scrollToSection("#about", HEADER_OFFSET)}
        style={rise(1.6, 0, 1)}
        className="animate-rise absolute bottom-8 left-1/2 lg:bottom-[3svh] z-10 flex -translate-x-1/2 flex-col items-center gap-2.5 text-white/35 transition-colors duration-300 hover:text-white/70"
        aria-label="Scroll to about section"
      >
        <span className="text-[0.6rem] uppercase tracking-[0.3em]">{hero.scrollLabel}</span>
        <span className="animate-bob">
          <ArrowDown className="size-4" />
        </span>
      </button>
    </section>
  )
}
