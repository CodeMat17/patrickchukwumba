"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Moon, Sun, Menu, X } from "lucide-react"
import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
} from "framer-motion"
import { scrollToSection, scrollToTop } from "@/lib/smooth-scroll"
import { EASE_OUT } from "@/components/ui/reveal"

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Expertise", href: "#skills" },
  { label: "Credentials", href: "#education" },
  { label: "Contact", href: "#contact" },
]

const HEADER_OFFSET = 88

/** Thin brass progress bar pinned to the very top of the viewport. */
function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  })

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left gradient-gold"
      aria-hidden
    />
  )
}

function useActiveSection() {
  const [active, setActive] = useState<string>("")

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.querySelector(link.href))
      .filter((el): el is Element => el !== null)

    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry closest to the top of the reading area.
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top)
          )

        if (visible[0]) setActive(`#${visible[0].target.id}`)
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return active
}

function ThemeToggle({ onDark }: { onDark: boolean }) {
  const { resolvedTheme, setTheme } = useTheme()

  // next-themes leaves this undefined until it has read the client preference,
  // which doubles as our "mounted" signal and keeps the markup hydration-safe.
  const mounted = resolvedTheme !== undefined
  const isDark = resolvedTheme === "dark"

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className={`relative grid size-9 place-items-center rounded-full border transition-colors duration-300 ${
        onDark
          ? "border-white/15 text-white/70 hover:border-white/30 hover:text-white"
          : "border-hairline text-muted-foreground hover:border-gold/40 hover:text-foreground"
      }`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {mounted ? (
          <motion.span
            key={isDark ? "sun" : "moon"}
            initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
            transition={{ duration: 0.35, ease: EASE_OUT }}
            className="absolute"
          >
            {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </motion.span>
        ) : null}
      </AnimatePresence>
    </button>
  )
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const active = useActiveSection()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Lock the page while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileOpen])

  // The hero sits behind the bar and is dark in both themes, so the header runs
  // light until the page scrolls — or until the mobile sheet paints a light
  // backdrop underneath it.
  const onDark = !scrolled && !mobileOpen

  const go = (href: string) => {
    setMobileOpen(false)
    // Wait a beat so the sheet's exit animation doesn't fight the scroll.
    requestAnimationFrame(() => scrollToSection(href, HEADER_OFFSET))
  }

  return (
    <>
      <ScrollProgress />

      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.1 }}
        className='fixed inset-x-0 top-0 z-50'>
        <div
          className={`transition-[background-color,border-color,box-shadow,backdrop-filter] duration-500 ${
            scrolled
              ? "surface-glass border-x-0 border-t-0 shadow-soft"
              : "border-transparent bg-transparent"
          }`}>
          <nav className='mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-5 sm:px-8'>
            {/* Monogram */}
            <button
              onClick={scrollToTop}
              className='group flex items-center gap-3'
              aria-label='Back to top'>
              <span className='grid size-9 place-items-center rounded-xl gradient-gold text-[0.7rem] font-bold tracking-tight text-[oklch(0.16_0.02_265)] shadow-soft transition-transform duration-500 group-hover:scale-105'>
                PC
              </span>
              <div className='text-start flex-col leading-none'>
                <p
                  className={`font-display text-[0.95rem] transition-colors duration-500 ${
                    onDark ? "text-white" : "text-foreground"
                  }`}>
                  Patrick Chukwumba 
                </p>

                <p
                  className={`mt-1 text-[0.58rem] uppercase tracking-[0.2em] transition-colors duration-500 ${
                    onDark ? "text-white/45" : "text-muted-foreground"
                  }`}>
                  Supply Chain
                </p>
              </div>
            </button>

            {/* Desktop links */}
            <div className='hidden items-center gap-1 md:flex'>
              {navLinks.map((link) => {
                const isActive = active === link.href;

                return (
                  <button
                    key={link.href}
                    onClick={() => go(link.href)}
                    className={`relative rounded-full px-4 py-2 text-[0.82rem] font-medium transition-colors duration-300 ${
                      isActive
                        ? onDark
                          ? "text-white"
                          : "text-foreground"
                        : onDark
                          ? "text-white/55 hover:text-white"
                          : "text-muted-foreground hover:text-foreground"
                    }`}>
                    {isActive ? (
                      <motion.span
                        layoutId='nav-pill'
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 32,
                        }}
                        className={`absolute inset-0 -z-10 rounded-full ${
                          onDark ? "bg-white/10" : "bg-gold/12"
                        }`}
                      />
                    ) : null}
                    {link.label}
                  </button>
                );
              })}
            </div>

            <div className='flex items-center gap-2'>
              <a
                href='mailto:Talk2pat0791@gmail.com'
                className={`hidden rounded-full px-5 py-2.5 text-[0.8rem] font-semibold transition-all duration-500 sm:inline-flex ${
                  onDark
                    ? "bg-white/10 text-white ring-1 ring-white/20 hover:bg-white/16"
                    : "gradient-gold text-[oklch(0.16_0.02_265)] shadow-soft hover:shadow-lift"
                }`}>
                Let&apos;s talk
              </a>

              <ThemeToggle onDark={onDark} />

              <button
                onClick={() => setMobileOpen((open) => !open)}
                aria-label='Toggle navigation'
                aria-expanded={mobileOpen}
                className={`grid size-9 place-items-center rounded-full border transition-colors duration-300 md:hidden ${
                  onDark
                    ? "border-white/15 text-white/70"
                    : "border-hairline text-muted-foreground"
                }`}>
                {mobileOpen ? (
                  <X className='size-4' />
                ) : (
                  <Menu className='size-4' />
                )}
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* Mobile sheet */}
      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className='fixed inset-0 z-40 md:hidden'>
            <div
              className='absolute inset-0 bg-background/95 backdrop-blur-xl'
              onClick={() => setMobileOpen(false)}
            />

            <div className='relative flex h-full flex-col justify-center px-8'>
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.href}
                  onClick={() => go(link.href)}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{
                    delay: 0.06 + i * 0.06,
                    duration: 0.5,
                    ease: EASE_OUT,
                  }}
                  className='group flex items-baseline gap-4 border-b border-hairline py-5 text-left'>
                  <span className='eyebrow w-6 text-[0.6rem]'>0{i + 1}</span>
                  <span className='font-display text-3xl text-foreground transition-colors group-hover:text-gold'>
                    {link.label}
                  </span>
                </motion.button>
              ))}

              <motion.a
                href='mailto:Talk2pat0791@gmail.com'
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.42, duration: 0.5, ease: EASE_OUT }}
                className='mt-10 inline-flex items-center justify-center rounded-full gradient-gold px-6 py-3.5 text-sm font-semibold text-[oklch(0.16_0.02_265)]'>
                Talk2pat0791@gmail.com
              </motion.a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
