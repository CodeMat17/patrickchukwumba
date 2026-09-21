"use client"

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
  type RefObject,
} from "react"

/*
 * Scroll reveals are plain CSS transitions toggled by an IntersectionObserver.
 * Keeping animation libraries out of these (used dozens of times per page)
 * keeps hydration cheap and the main thread free while the page loads.
 */

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

/** Flips to `true` the first time `amount` of the element is visible. */
function useInViewOnce(ref: RefObject<Element | null>, amount: number) {
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: amount }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [ref, amount])

  return inView
}

/**
 * Fades + slides its children in the first time they enter the viewport.
 * Reduced-motion visitors get the content instantly (see globals.css).
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
  const inView = useInViewOnce(ref, amount)
  const offset = OFFSETS[direction]
  // One ref type serves every tag option.
  const Component = as as "div"

  return (
    <Component
      ref={ref}
      data-shown={inView || undefined}
      className={`reveal ${className ?? ""}`}
      style={
        {
          "--reveal-x": `${offset.x}px`,
          "--reveal-y": `${offset.y}px`,
          "--reveal-duration": `${duration}s`,
          "--reveal-delay": `${delay}s`,
        } as CSSProperties
      }
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
  const inView = useInViewOnce(ref, amount)

  useEffect(() => {
    const root = ref.current
    if (!inView || !root) return

    // Only this group's own items — a nested group staggers its own.
    const items = Array.from(
      root.querySelectorAll<HTMLElement>("[data-reveal-item]")
    ).filter((item) => item.parentElement?.closest("[data-reveal-group]") === root)

    items.forEach((item, i) => {
      item.style.setProperty("--reveal-delay", `${delay + i * stagger}s`)
      item.dataset.shown = "true"
    })
  }, [inView, delay, stagger])

  return (
    <div ref={ref} data-reveal-group="" className={className}>
      {children}
    </div>
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
  return (
    <div
      data-reveal-item=""
      className={`reveal ${className ?? ""}`}
      style={
        { "--reveal-y": `${y}px`, "--reveal-duration": "0.7s" } as CSSProperties
      }
    >
      {children}
    </div>
  )
}

/**
 * Word-by-word headline reveal. Each word rises and comes into focus. The text
 * is never clipped or transparent, so it still counts as painted for LCP.
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
  const words = text.split(" ")

  return (
    <span className={className}>
      {words.map((word, i) => {
        const isHighlighted = highlight?.includes(word)

        return (
          <span
            key={`${word}-${i}`}
            className="inline-block align-bottom pb-[0.12em] -mb-[0.12em]"
          >
            {/* CSS-driven so the headline animates before hydration (fast LCP). */}
            <span
              className={`animate-word inline-block ${wordClassName ?? ""} ${
                isHighlighted ? highlightClassName : ""
              }`}
              style={{ animationDelay: `${delay + i * stagger}s` }}
            >
              {word}
            </span>
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
  const inView = useInViewOnce(ref, 0.5)

  useEffect(() => {
    const el = ref.current
    if (!inView || !el) return

    // With reduced motion we skip the ramp and land on the final figure in one frame.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const total = reduced ? 0 : duration

    let raf = 0
    let startedAt: number | null = null

    // Writes the text directly rather than re-rendering React every frame.
    const step = (now: number) => {
      if (startedAt === null) startedAt = now
      const progress = total > 0 ? Math.min((now - startedAt) / total, 1) : 1
      // ease-out quart — fast ramp, long settle
      const eased = 1 - Math.pow(1 - progress, 4)
      el.textContent = Math.round(eased * value).toLocaleString("en-US")
      if (progress < 1) raf = requestAnimationFrame(step)
    }

    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [inView, value, duration])

  return (
    <span ref={ref} className={`tabular ${className ?? ""}`}>
      0
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
