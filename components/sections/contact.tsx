"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Mail, Phone, ExternalLink } from "lucide-react"

const contactItems = [
  {
    icon: Mail,
    label: "Personal Email",
    value: "Talk2pat0791@gmail.com",
    href: "mailto:Talk2pat0791@gmail.com",
  },
  {
    icon: Mail,
    label: "Work Email",
    value: "Patrick.chukwumbw@heineken.com",
    href: "mailto:Patrick.chukwumbw@heineken.com",
  },
  {
    icon: Phone,
    label: "Primary Phone",
    value: "+234 706 876 4902",
    href: "tel:+2347068764902",
  },
  {
    icon: Phone,
    label: "Secondary Phone",
    value: "+234 902 056 8338",
    href: "tel:+2349020568338",
  },
]

export function Contact() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section id="contact" className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <span className="inline-block text-xs font-semibold tracking-widest uppercase mb-3"
            style={{ color: "var(--gold)" }}>
            Reach Out
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Get In{" "}
            <span style={{ color: "var(--gold)" }}>Touch</span>
          </h2>
          <p className="mt-3 text-muted-foreground text-sm max-w-xl mx-auto">
            Available for strategic procurement discussions, consulting opportunities, or professional collaborations.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {contactItems.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
            >
              {item.href ? (
                <a
                  href={item.href}
                  className="group flex items-start gap-4 p-5 rounded-2xl bg-card ring-1 ring-border hover:ring-[var(--gold)]/40 hover:shadow-md transition-all duration-300 h-full"
                >
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors"
                    style={{ background: "oklch(0.72 0.15 82 / 10%)" }}>
                    <item.icon className="size-4" style={{ color: "var(--gold)" }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-xs text-muted-foreground">{item.label}</p>
                      <ExternalLink className="size-3 text-muted-foreground/50 group-hover:text-muted-foreground transition-colors" />
                    </div>
                    <p className="text-sm font-medium text-foreground mt-0.5 break-all">{item.value}</p>
                  </div>
                </a>
              ) : (
                <div className="flex items-start gap-4 p-5 rounded-2xl bg-card ring-1 ring-border h-full">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "oklch(0.72 0.15 82 / 10%)" }}>
                    <item.icon className="size-4" style={{ color: "var(--gold)" }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground">{item.label}</p>
                    <p className="text-sm font-medium text-foreground mt-0.5">{item.value}</p>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 max-w-4xl mx-auto rounded-2xl p-8 text-center relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, oklch(0.22 0.06 255), oklch(0.15 0.05 270))",
          }}
        >
          <div className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: "radial-gradient(circle at 70% 50%, var(--gold) 0%, transparent 60%)",
            }} />
          <div className="relative z-10">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
              Open to Strategic Conversations
            </h3>
            <p className="text-white/70 text-sm mb-6 max-w-md mx-auto">
              Whether you&apos;re a procurement leader, supplier, or business partner — let&apos;s connect and create value together.
            </p>
            <a
              href="mailto:Talk2pat0791@gmail.com"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all hover:-translate-y-0.5 hover:shadow-xl"
              style={{
                background: "var(--gold)",
                color: "oklch(0.13 0.04 255)",
              }}
            >
              <Mail className="size-4" />
              Send a Message
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
