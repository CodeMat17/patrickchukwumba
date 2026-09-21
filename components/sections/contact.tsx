"use client"

import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react"
import { profile } from "@/lib/cv"
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal"

const channels = [
  {
    icon: Mail,
    label: "Personal Email",
    value: profile.emails.personal,
    href: `mailto:${profile.emails.personal}`,
  },
  {
    icon: Mail,
    label: "Work Email",
    value: profile.emails.work,
    href: `mailto:${profile.emails.work}`,
  },
  {
    icon: Phone,
    label: "Primary Phone",
    value: profile.phones.primary.display,
    href: profile.phones.primary.href,
  },
  {
    icon: Phone,
    label: "Secondary Phone",
    value: profile.phones.secondary.display,
    href: profile.phones.secondary.href,
  },
] as const

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 py-24 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grain relative overflow-hidden rounded-[2rem] gradient-ink px-6 py-16 sm:px-14 sm:py-20">
          {/* Brass light pool */}
          <div
            className="pointer-events-none absolute -right-[8%] -top-[30%] size-[32rem] rounded-full blur-[130px] opacity-[0.18]"
            style={{ background: "var(--gold)" }}
            aria-hidden
          />

          <div className="relative z-10 grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
            {/* ── Invitation ── */}
            <div>
              <Reveal direction="up">
                <div className="flex items-center gap-3">
                  <span className="h-px w-8 bg-gold/60" />
                  <span className="eyebrow">Get in touch</span>
                </div>
              </Reveal>

              <Reveal direction="up" delay={0.08}>
                <h2 className="mt-6 font-display text-[clamp(2rem,4.2vw,3.2rem)] leading-[1.08] text-white">
                  Let&apos;s talk procurement,{" "}
                  <span className="text-gradient-gold">strategy and value</span>.
                </h2>
              </Reveal>

              <Reveal direction="up" delay={0.14}>
                <p className="mt-6 max-w-md text-[0.96rem] leading-[1.8] text-white/55">
                  Open to strategic procurement conversations, advisory engagements and
                  professional collaboration.
                </p>
              </Reveal>

              <Reveal direction="up" delay={0.2}>
                <div className="mt-9 flex flex-wrap items-center gap-3">
                  <a
                    href={`mailto:${profile.emails.personal}`}
                    className="sheen group inline-flex items-center gap-2 rounded-full gradient-gold px-7 py-3.5 text-[0.85rem] font-semibold text-[oklch(0.16_0.02_265)] shadow-lift transition-transform duration-500 hover:-translate-y-0.5"
                  >
                    Send an email
                    <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                  <a
                    href={profile.phones.primary.href}
                    className="inline-flex items-center gap-2 rounded-full glass-dark px-7 py-3.5 text-[0.85rem] font-semibold text-white transition-colors duration-300 hover:bg-white/15"
                  >
                    <Phone className="size-4" />
                    Call now
                  </a>
                </div>
              </Reveal>

              <Reveal direction="up" delay={0.26}>
                <div className="mt-10 flex items-start gap-3 border-t border-white/10 pt-7">
                  <MapPin
                    className="mt-0.5 size-4 shrink-0"
                    style={{ color: "var(--gold)" }}
                  />
                  <p className="max-w-xs text-[0.83rem] leading-relaxed text-white/45">
                    {profile.address}
                  </p>
                </div>
              </Reveal>
            </div>

            {/* ── Channels ── */}
            <RevealGroup stagger={0.08} className="grid gap-3 sm:grid-cols-2">
              {channels.map((channel) => (
                <RevealItem key={channel.label} className="h-full">
                  <a
                    href={channel.href}
                    className="group flex h-full flex-col justify-between gap-6 rounded-2xl glass-dark p-6 transition-all duration-500 hover:-translate-y-1 hover:bg-white/12"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span
                        className="grid size-9 place-items-center rounded-xl"
                        style={{ background: "oklch(1 0 0 / 8%)" }}
                      >
                        <channel.icon
                          className="size-4"
                          style={{ color: "var(--gold)" }}
                        />
                      </span>
                      <ArrowUpRight className="size-4 text-white/25 transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white/70" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-[0.64rem] uppercase tracking-[0.18em] text-white/40">
                        {channel.label}
                      </p>
                      <p className="mt-1.5 break-words text-[0.9rem] font-medium text-white">
                        {channel.value}
                      </p>
                    </div>
                  </a>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </div>
    </section>
  )
}
