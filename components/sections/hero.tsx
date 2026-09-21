"use client"

import { useRef } from "react"
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion"
import { ArrowDown, ArrowUpRight, Mail, MapPin } from "lucide-react"
import { profile, categories } from "@/lib/cv"
import { EASE_OUT, RevealWords } from "@/components/ui/reveal"
import { scrollToSection } from "@/lib/smooth-scroll"

const HEADER_OFFSET = 88

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  // Parallax: the content drifts up and fades as the hero leaves the viewport.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", reduced ? "0%" : "22%"])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, reduced ? 1 : 0])
  const orbY = useTransform(scrollYProgress, [0, 1], ["0%", reduced ? "0%" : "-30%"])
  const gridY = useTransform(scrollYProgress, [0, 1], ["0%", reduced ? "0%" : "12%"])

  return (
    <section
      ref={ref}
      className="grain relative flex min-h-[100svh] items-center overflow-hidden gradient-ink"
    >
      {/* Brass light pools */}
      <motion.div style={{ y: orbY }} className="absolute inset-0" aria-hidden>
        <div
          className="absolute -right-[10%] top-[6%] size-[min(46rem,90vw)] rounded-full blur-[140px] opacity-[0.22]"
          style={{ background: "var(--gold)" }}
        />
        <div
          className="absolute -left-[12%] bottom-[-8%] size-[min(34rem,80vw)] rounded-full blur-[130px] opacity-[0.14]"
          style={{ background: "var(--gold-deep)" }}
        />
      </motion.div>

      {/* Engraved grid */}
      <motion.div
        style={{ y: gridY }}
        className="grid-etch absolute inset-0 opacity-[0.045]"
        aria-hidden
      />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-28 pt-32 sm:px-8 sm:pt-36"
      >
        <div className="grid items-end gap-14 lg:grid-cols-[1.35fr_1fr]">
          {/* ── Left: the statement ── */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.15 }}
              className="inline-flex items-center gap-2.5 rounded-full glass-dark px-4 py-2"
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
            </motion.div>

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
                  <motion.path
                    d="M4 16 C 60 6, 120 4, 180 9 S 270 18, 296 8"
                    fill="none"
                    stroke="var(--gold)"
                    strokeWidth={5}
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                    initial={{ pathLength: reduced ? 1 : 0, opacity: reduced ? 1 : 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{
                      pathLength: { duration: 1.1, ease: EASE_OUT, delay: 0.9 },
                      opacity: { duration: 0.2, delay: 0.9 },
                    }}
                  />
                </svg>
              </span>
              <br />
              <RevealWords text="Okorie" delay={0.5} />
            </h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, ease: EASE_OUT, delay: 0.8 }}
              className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3"
            >
              <span className="text-[0.95rem] font-medium uppercase tracking-[0.2em] text-white/85 sm:text-[1.05rem]">
                {profile.title}
              </span>
              <span className="hidden h-4 w-px bg-white/20 sm:block" />
              <span className="inline-flex items-center gap-1.5 text-sm text-white/50">
                <MapPin className="size-3.5" />
                {profile.location}
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.92 }}
              className="mt-7 max-w-xl text-[0.98rem] leading-[1.75] text-white/60"
            >
              22+ years inside the HEINEKEN Group, turning a finance foundation into
              procurement leadership — a{" "}
              <span className="font-semibold text-white/90">€450M+</span> annual spend
              portfolio and an ecosystem of{" "}
              <span className="font-semibold text-white/90">1,100+ suppliers</span>.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE_OUT, delay: 1.04 }}
              className="mt-10 flex flex-wrap items-center gap-3"
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
            </motion.div>
          </div>

          {/* ── Right: the ledger ── */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE_OUT, delay: 0.7 }}
            className="rounded-3xl glass-dark p-7 sm:p-8"
          >
            <p className="text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-white/40">
              Categories under management
            </p>

            <ul className="mt-6 space-y-0">
              {categories.map((category, i) => (
                <motion.li
                  key={category}
                  initial={{ opacity: 0, x: 14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.7,
                    ease: EASE_OUT,
                    delay: 0.95 + i * 0.07,
                  }}
                  className="flex items-baseline gap-4 border-b border-white/8 py-3 last:border-0"
                >
                  <span
                    className="text-[0.62rem] font-semibold tabular"
                    style={{ color: "var(--gold)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[0.92rem] text-white/75">{category}</span>
                </motion.li>
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
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.button
        onClick={() => scrollToSection("#about", HEADER_OFFSET)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2.5 text-white/35 transition-colors duration-300 hover:text-white/70"
        aria-label="Scroll to about section"
      >
        <span className="text-[0.6rem] uppercase tracking-[0.3em]">Scroll</span>
        <motion.span
          animate={reduced ? undefined : { y: [0, 7, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="size-4" />
        </motion.span>
      </motion.button>
    </section>
  )
}
