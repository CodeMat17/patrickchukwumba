"use client"

import { useEffect, useState, useSyncExternalStore, type CSSProperties } from "react"
import { useTheme } from "next-themes"
import { Moon, Sun, Menu, X } from "lucide-react"
import { scrollToSection, scrollToTop } from "@/lib/smooth-scroll"

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Expertise", href: "#skills" },
  { label: "Credentials", href: "#education" },
  { label: "Contact", href: "#contact" },
]

const HEADER_OFFSET = 88

/**
 * Thin brass progress bar pinned to the very top of the viewport. Driven by a
 * CSS scroll timeline (see `.scroll-progress`), so it costs no JavaScript.
 */
function ScrollProgress() {
  return (
    <div
      className="scroll-progress fixed inset-x-0 top-0 z-[60] h-[2px] origin-left gradient-gold"
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

const subscribeNoop = () => () => {}

function ThemeToggle({ onDark }: { onDark: boolean }) {
  const { resolvedTheme, setTheme } = useTheme()

  // The theme is only known on the client, so render the neutral state until
  // hydration has finished to keep the server and client markup identical.
  const mounted = useSyncExternalStore(subscribeNoop, () => true, () => false)
  const isDark = mounted && resolvedTheme === "dark"

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
      {mounted ? (
        <span key={isDark ? "sun" : "moon"} className="animate-spin-in absolute">
          {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
        </span>
      ) : null}
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
    // Wait a frame so the sheet has closed and unlocked scrolling first.
    requestAnimationFrame(() => scrollToSection(href, HEADER_OFFSET))
  }

  return (
    <>
      <ScrollProgress />

      <header
        className='animate-rise fixed inset-x-0 top-0 z-50'
        style={{ "--rise-y": "-24px", animationDelay: "0.1s" } as CSSProperties}>
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
              className='group flex items-center gap-3'>
              <span aria-hidden className='grid size-9 place-items-center rounded-xl gradient-gold text-[0.7rem] font-bold tracking-tight text-[oklch(0.16_0.02_265)] shadow-soft transition-transform duration-500 group-hover:scale-105'>
                PC
              </span>
              <span className='flex flex-col text-start leading-none'>
                <span
                  className={`font-display text-[0.95rem] transition-colors duration-500 ${
                    onDark ? "text-white" : "text-foreground"
                  }`}>
                  Patrick Chukwumba
                </span>

                <span
                  className={`mt-1 text-[0.58rem] uppercase tracking-[0.2em] transition-colors duration-500 ${
                    onDark ? "text-white/45" : "text-muted-foreground"
                  }`}>
                  Supply Chain
                  <span className='sr-only'> — back to top</span>
                </span>
              </span>
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
                      <span
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
      </header>

      {/* Mobile sheet */}
      {mobileOpen ? (
          <div
            className='animate-rise fixed inset-0 z-40 md:hidden'
            style={{ "--rise-y": "0px", animationDuration: "0.3s" } as CSSProperties}>
            <div
              className='absolute inset-0 bg-background/95 backdrop-blur-xl'
              onClick={() => setMobileOpen(false)}
            />

            <div className='relative flex h-full flex-col justify-center px-8'>
              {navLinks.map((link, i) => (
                <button
                  key={link.href}
                  onClick={() => go(link.href)}
                  style={{ "--rise-y": "24px", animationDuration: "0.5s", animationDelay: `${0.06 + i * 0.06}s` } as CSSProperties}
                  className='animate-rise group flex items-baseline gap-4 border-b border-hairline py-5 text-left'>
                  <span className='eyebrow w-6 text-[0.6rem]'>0{i + 1}</span>
                  <span className='font-display text-3xl text-foreground transition-colors group-hover:text-gold'>
                    {link.label}
                  </span>
                </button>
              ))}

              <a
                href='mailto:Talk2pat0791@gmail.com'
                style={{ "--rise-y": "24px", animationDuration: "0.5s", animationDelay: "0.42s" } as CSSProperties}
                className='animate-rise mt-10 inline-flex items-center justify-center rounded-full gradient-gold px-6 py-3.5 text-sm font-semibold text-[oklch(0.16_0.02_265)]'>
                Talk2pat0791@gmail.com
              </a>
            </div>
          </div>
        ) : null}
    </>
  );
}
