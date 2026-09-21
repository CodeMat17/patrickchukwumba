"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import {
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "framer-motion"

/** Shared easing — a long, weighted ease-out used everywhere on the page. */
export const EASE_OUT = [0.16, 1, 0.3, 1] as const

type Direction = "up" | "down" | "left" | "right" | "none"

const OFFSETS: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 28 },
  down: { x: 0, y: -28 },
  left: { x: 32, y: 0 },
  right: { x: -32, y: 0 },
  none: { x: 0, y: 0 },
}

/**
 * Fades + slides its children in the first time they enter the viewport.
 * Collapses to a plain fade when the visitor prefers reduced motion.
 */
export function Reveal({
  children,
  delay = 0,
  duration = 0.8,
  direction = "up",
  amount = 0.25,
  className,
  as = "div",
}: {
  children: ReactNode
  delay?: number
  duration?: number
  direction?: Direction
  amount?: number
  className?: string
  as?: "div" | "section" | "li" | "span"
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount })
  const reduced = useReducedMotion()

  const offset = reduced ? OFFSETS.none : OFFSETS[direction]
  const Component = motion[as] as typeof motion.div

  return (
    <Component
      ref={ref}
      initial={{ opacity: 0, x: offset.x, y: offset.y }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : undefined}
      transition={{ duration: reduced ? 0.3 : duration, delay, ease: EASE_OUT }}
      className={className}
    >
      {children}
    </Component>
  )
}

/** Parent that staggers `RevealItem` children as the group scrolls into view. */
export function RevealGroup({
  children,
  className,
  stagger = 0.08,
  delay = 0,
  amount = 0.2,
}: {
  children: ReactNode
  className?: string
  stagger?: number
  delay?: number
  amount?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount })

  const variants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  }

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function RevealItem({
  children,
  className,
  y = 24,
}: {
  children: ReactNode
  className?: string
  y?: number
}) {
  const reduced = useReducedMotion()

  const variants: Variants = {
    hidden: { opacity: 0, y: reduced ? 0 : y },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduced ? 0.3 : 0.7, ease: EASE_OUT },
    },
  }

  return (
    <motion.div variants={variants} className={className}>
      {children}
    </motion.div>
  )
}

/**
 * Word-by-word headline reveal. Each word rises out of a clipping mask,
 * which reads far more deliberate than a single block fade.
 */
export function RevealWords({
  text,
  className,
  wordClassName,
  delay = 0,
  stagger = 0.06,
  highlight,
  highlightClassName = "text-gradient-gold",
}: {
  text: string
  className?: string
  wordClassName?: string
  delay?: number
  stagger?: number
  highlight?: string[]
  highlightClassName?: string
}) {
  const reduced = useReducedMotion()
  const words = text.split(" ")

  return (
    <span className={className}>
      {words.map((word, i) => {
        const isHighlighted = highlight?.includes(word)

        return (
          <span
            key={`${word}-${i}`}
            className="inline-block overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em]"
          >
            <motion.span
              className={`inline-block ${wordClassName ?? ""} ${
                isHighlighted ? highlightClassName : ""
              }`}
              initial={{ y: reduced ? 0 : "110%", opacity: reduced ? 0 : 1 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: reduced ? 0.3 : 0.95,
                delay: delay + i * stagger,
                ease: EASE_OUT,
              }}
            >
              {word}
            </motion.span>
            {i < words.length - 1 ? " " : null}
          </span>
        )
      })}
    </span>
  )
}

/** Counts from 0 to `value` once the element is on screen. */
export function Counter({
  value,
  duration = 2000,
  className,
}: {
  value: number
  duration?: number
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const reduced = useReducedMotion()
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView || reduced) return

    let raf = 0
    let startedAt: number | null = null

    const step = (now: number) => {
      if (startedAt === null) startedAt = now
      const progress = Math.min((now - startedAt) / duration, 1)
      // ease-out quart — fast ramp, long settle
      const eased = 1 - Math.pow(1 - progress, 4)
      setDisplay(Math.round(eased * value))
      if (progress < 1) raf = requestAnimationFrame(step)
    }

    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [inView, value, duration, reduced])

  // With reduced motion we skip the ramp entirely and render the final figure.
  const shown = reduced ? value : display

  return (
    <span ref={ref} className={`tabular ${className ?? ""}`}>
      {shown.toLocaleString()}
    </span>
  )
}

/** Section eyebrow + display heading, used by every section for a consistent rhythm. */
export function SectionHeading({
  eyebrow,
  title,
  accent,
  description,
  align = "center",
  className,
}: {
  eyebrow: string
  title: string
  accent?: string
  description?: string
  align?: "center" | "left"
  className?: string
}) {
  const centered = align === "center"

  return (
    <div
      className={`${centered ? "text-center mx-auto" : "text-left"} max-w-2xl ${
        className ?? ""
      }`}
    >
      <Reveal direction="up">
        <div
          className={`flex items-center gap-3 ${centered ? "justify-center" : ""}`}
        >
          <span className="h-px w-8 bg-gold/60" />
          <span className="eyebrow">{eyebrow}</span>
          <span className="h-px w-8 bg-gold/60" />
        </div>
      </Reveal>

      <Reveal direction="up" delay={0.08}>
        <h2 className="font-display mt-5 text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.08] text-foreground">
          {title}{" "}
          {accent ? <span className="text-gradient-gold">{accent}</span> : null}
        </h2>
      </Reveal>

      {description ? (
        <Reveal direction="up" delay={0.16}>
          <p className="mt-5 text-[0.95rem] leading-relaxed text-muted-foreground">
            {description}
          </p>
        </Reveal>
      ) : null}
    </div>
  )
}
