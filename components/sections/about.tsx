"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Award, Target, Globe, BarChart3 } from "lucide-react"
import { ProfilePhoto } from "@/components/profile-photo"

const highlights = [
  {
    icon: Target,
    title: "Strategic Procurement",
    body: "Category strategy development, sourcing activities and governance across multi-billion euro spend.",
  },
  {
    icon: Globe,
    title: "Global Exposure",
    body: "Interface with Heineken Global Category Buyers, managing both locally and globally sourced materials.",
  },
  {
    icon: BarChart3,
    title: "Data-Driven",
    body: "Proficient in procurement tools, software and strategies that drive cost, value and efficiency.",
  },
  {
    icon: Award,
    title: "Finance Backbone",
    body: "Fellow ICAN and Associate CITN — a rare blend of financial acumen and procurement expertise.",
  },
]

export function About() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section id="about" className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="grid lg:grid-cols-[280px_1fr] xl:grid-cols-[320px_1fr] gap-10 lg:gap-16 items-start">

          {/* ── Left: Profile photo ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-4"
          >
            <ProfilePhoto className="w-full aspect-[3/4]" />

            {/* Quick-info strip below photo */}
            <div className="bg-card rounded-2xl p-4 ring-1 ring-border space-y-2.5">
              {[
                { label: "Company", value: "Nigerian Breweries Plc" },
                { label: "Role", value: "Supply Chain Category Mgr" },
                { label: "Location", value: "Lagos, Nigeria" },
                { label: "Experience", value: "12+ Years" },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-start justify-between gap-2">
                  <span className="text-xs text-muted-foreground flex-shrink-0">{label}</span>
                  <span className="text-xs font-medium text-foreground text-right">{value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Right: text + cards ── */}
          <div className="flex flex-col gap-8">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className="inline-block text-xs font-semibold tracking-widest uppercase mb-3"
                style={{ color: "var(--gold)" }}>
                About Me
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight mb-6">
                Procurement Leader<br />with a{" "}
                <span style={{ color: "var(--gold)" }}>Finance Edge</span>
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed text-sm sm:text-base">
                <p>
                  Skilled procurement manager with over <strong className="text-foreground">12 years</strong> of
                  procurement and Finance experience, covering multiple categories across Nigerian Breweries Plc
                  — one of Africa&apos;s leading FMCG companies and part of the Heineken Group.
                </p>
                <p>
                  Proficiently leveraging procurement tools, software and strategies that drive cost, value
                  and efficiency. Highly accustomed to working in{" "}
                  <strong className="text-foreground">volatile, fast-changing market conditions</strong>,
                  while still meeting the business needs of a variety of stakeholders.
                </p>
                <p>
                  Currently responsible for people management, capability development, category strategy
                  development, sourcing activities and governance — overseeing a portfolio spanning
                  Production Materials, Logistics, Energy, Investment Projects, MRO and Regulatory categories.
                </p>
              </div>

              <div className="mt-8 flex items-center gap-4">
                <a
                  href="mailto:Patrick.chukwumbw@heineken.com"
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg"
                  style={{ background: "var(--gold)", color: "oklch(0.13 0.04 255)" }}
                >
                  Send Email
                </a>
                <a
                  href="tel:+2347068764902"
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold border border-border hover:bg-muted transition-colors"
                >
                  Call Now
                </a>
              </div>
            </motion.div>

            {/* Highlight cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {highlights.map((h, i) => (
                <motion.div
                  key={h.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.25 + i * 0.08 }}
                  className="p-5 rounded-2xl bg-card ring-1 ring-border hover:ring-[var(--gold)]/40 transition-all duration-300"
                >
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-3"
                    style={{ background: "oklch(0.72 0.15 82 / 10%)" }}>
                    <h.icon className="size-4" style={{ color: "var(--gold)" }} />
                  </div>
                  <h3 className="text-sm font-semibold text-foreground mb-1.5">{h.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{h.body}</p>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
