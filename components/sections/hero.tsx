"use client"

import { motion, type Variants } from "framer-motion"
import { ArrowDown, Mail, Phone } from "lucide-react"

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
}

const item: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}

export function Hero() {
  const scrollToAbout = () => {
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-navy" />
      {/* Gold accent orbs */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl"
        style={{ background: "var(--gold)" }} />
      <div className="absolute bottom-1/3 left-1/6 w-64 h-64 rounded-full opacity-8 blur-3xl"
        style={{ background: "var(--gold)" }} />
      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(oklch(1 0 0) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col items-center gap-6">

          {/* Badge */}
          <motion.div variants={item}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-medium tracking-wide"
              style={{
                borderColor: "oklch(0.72 0.15 82 / 40%)",
                color: "var(--gold-light)",
                background: "oklch(0.72 0.15 82 / 10%)",
              }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--gold)" }} />
              Nigerian Breweries Plc · Heineken
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1 variants={item}
            className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight">
            Patrick{" "}
            <span className="relative">
              <span className="text-gold" style={{ color: "var(--gold)" }}>Chukwumba</span>
            </span>
            <br />
            Okorie
          </motion.h1>

          {/* Title */}
          <motion.div variants={item} className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <span className="text-lg sm:text-2xl font-semibold text-white/90">
              Supply Chain Category Manager
            </span>
            <span className="hidden sm:block w-px h-6 bg-white/20" />
            <span className="text-base sm:text-lg text-white/60">Lagos, Nigeria</span>
          </motion.div>

          {/* Summary */}
          <motion.p variants={item}
            className="max-w-2xl text-base sm:text-lg text-white/70 leading-relaxed">
            12+ years driving procurement excellence across Production Materials, Logistics, Energy, and MRO.
            Managing{" "}
            <span className="font-semibold" style={{ color: "var(--gold)" }}>EUR 700m+</span>{" "}
            in categories with{" "}
            <span className="font-semibold" style={{ color: "var(--gold)" }}>1,100+ suppliers</span>{" "}
            globally.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={item} className="flex flex-col sm:flex-row items-center gap-3 mt-2">
            <button
              onClick={() => document.querySelector("#experience")?.scrollIntoView({ behavior: "smooth" })}
              className="px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              style={{
                background: "var(--gold)",
                color: "oklch(0.13 0.04 255)",
              }}
            >
              View Experience
            </button>
            <button
              onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
              className="px-6 py-3 rounded-xl text-sm font-semibold border transition-all duration-200 hover:bg-white/10 text-white"
              style={{ borderColor: "oklch(1 0 0 / 25%)" }}
            >
              Get In Touch
            </button>
          </motion.div>

          {/* Quick contacts */}
          <motion.div variants={item} className="flex flex-col sm:flex-row items-center gap-4 mt-2">
            <a href="mailto:Talk2pat0791@gmail.com"
              className="flex items-center gap-2 text-xs text-white/50 hover:text-white/80 transition-colors">
              <Mail className="size-3" />
              Talk2pat0791@gmail.com
            </a>
            <span className="hidden sm:block w-px h-3 bg-white/20" />
            <a href="tel:+2347068764902"
              className="flex items-center gap-2 text-xs text-white/50 hover:text-white/80 transition-colors">
              <Phone className="size-3" />
              +234 706 876 4902
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.button
          onClick={scrollToAbout}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 hover:text-white/70 transition-colors"
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown className="size-4" />
          </motion.div>
        </motion.button>
      </div>
    </section>
  )
}
