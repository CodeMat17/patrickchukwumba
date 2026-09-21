/**
 * A small inertial smooth-scroll engine.
 *
 * Wheel input is intercepted and fed into a target offset that the page eases
 * toward every frame, which gives the weighted, "premium" scroll feel without
 * pulling in a dependency. Touch devices keep their native momentum scrolling,
 * and the engine disables itself entirely under `prefers-reduced-motion`.
 */

const EASE = 0.095 // how much of the remaining distance is covered each frame
const SETTLE = 0.2 // px — below this we snap and stop the loop

type Engine = {
  destroy: () => void
  scrollTo: (target: number, duration?: number) => void
}

let engine: Engine | null = null

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches

const maxScroll = () =>
  Math.max(0, document.documentElement.scrollHeight - window.innerHeight)

/** Cheap ease-out used for anchor jumps — fast start, long glide. */
const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t))

export function createSmoothScroll(): Engine {
  if (engine) return engine

  // Coarse pointers (phones, tablets) already have excellent native momentum.
  const wheelDriven =
    window.matchMedia("(pointer: fine)").matches && !prefersReducedMotion()

  let target = window.scrollY
  let current = window.scrollY
  let frame = 0
  let selfScrolled = -1
  let tween: number | null = null

  const applyScroll = (value: number) => {
    selfScrolled = value
    // "instant" so a CSS `scroll-behavior: smooth` can't animate each frame and fight the loop.
    window.scrollTo({ top: value, behavior: "instant" })
  }

  const loop = () => {
    const distance = target - current

    if (Math.abs(distance) < SETTLE) {
      current = target
      applyScroll(current)
      frame = 0
      return
    }

    current += distance * EASE
    applyScroll(current)
    frame = requestAnimationFrame(loop)
  }

  const start = () => {
    if (!frame) frame = requestAnimationFrame(loop)
  }

  const onWheel = (event: WheelEvent) => {
    if (event.ctrlKey || event.metaKey) return // pinch-zoom
    // Let genuinely scrollable inner panels (modals, code blocks) keep native behaviour.
    if ((event.target as Element | null)?.closest?.("[data-native-scroll]")) return

    event.preventDefault()

    // deltaMode: 0 = pixels, 1 = lines, 2 = pages
    const multiplier =
      event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1

    cancelTween()
    target = Math.min(Math.max(target + event.deltaY * multiplier, 0), maxScroll())
    start()
  }

  // Keep the target in sync when something else moves the page:
  // keyboard, scrollbar drag, browser restore, find-in-page.
  const onScroll = () => {
    if (Math.abs(window.scrollY - selfScrolled) < 1) return
    target = window.scrollY
    current = window.scrollY
  }

  const onResize = () => {
    target = Math.min(target, maxScroll())
  }

  const cancelTween = () => {
    if (tween !== null) {
      cancelAnimationFrame(tween)
      tween = null
    }
  }

  const scrollTo = (to: number, duration = 1100) => {
    const destination = Math.min(Math.max(to, 0), maxScroll())

    if (prefersReducedMotion()) {
      cancelTween()
      target = destination
      current = destination
      applyScroll(destination)
      return
    }

    cancelTween()
    if (frame) {
      cancelAnimationFrame(frame)
      frame = 0
    }

    const from = window.scrollY
    const delta = destination - from
    const startedAt = performance.now()

    const step = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1)
      const value = from + delta * easeOutExpo(progress)

      current = value
      target = destination
      applyScroll(value)

      if (progress < 1) {
        tween = requestAnimationFrame(step)
      } else {
        tween = null
        current = destination
        target = destination
      }
    }

    tween = requestAnimationFrame(step)
  }

  if (wheelDriven) {
    window.addEventListener("wheel", onWheel, { passive: false })
    document.documentElement.classList.add("has-smooth-scroll")
  }
  window.addEventListener("scroll", onScroll, { passive: true })
  window.addEventListener("resize", onResize, { passive: true })

  engine = {
    scrollTo,
    destroy: () => {
      if (frame) cancelAnimationFrame(frame)
      cancelTween()
      window.removeEventListener("wheel", onWheel)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onResize)
      document.documentElement.classList.remove("has-smooth-scroll")
      engine = null
    },
  }

  return engine
}

/** Smoothly scroll to an element id (`"#about"`), accounting for the fixed header. */
export function scrollToSection(selector: string, offset = 0) {
  const el = document.querySelector(selector)
  if (!el) return

  const to = el.getBoundingClientRect().top + window.scrollY - offset

  if (engine) engine.scrollTo(to)
  else
    window.scrollTo({
      top: to,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    })
}

export function scrollToTop() {
  if (engine) engine.scrollTo(0)
  else
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    })
}
