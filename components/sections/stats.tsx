"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { TrendingUp, Users, Clock, Layers } from "lucide-react"

function useCounter(target: number, duration = 1800, start = false) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!start) return
    let startTime: number | null = null
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
      else setCount(target)
    }
    requestAnimationFrame(step)
  }, [start, target, duration])

  return count
}

const stats = [
  {
    icon: TrendingUp,
    value: 700,
    suffix: "m+",
    prefix: "EUR ",
    label: "Under Management",
    description: "Total procurement spend managed across all categories in 2025",
  },
  {
    icon: Users,
    value: 1100,
    suffix: "+",
    prefix: "",
    label: "Suppliers",
    description: "Global and local supplier base managed across all categories",
  },
  {
    icon: Clock,
    value: 12,
    suffix: "+",
    prefix: "",
    label: "Years Experience",
    description: "Procurement and finance expertise across multiple categories",
  },
  {
    icon: Layers,
    value: 6,
    suffix: "",
    prefix: "",
    label: "Category Areas",
    description: "Production Materials, Logistics, Energy, MRO, Projects & more",
  },
]

function StatCard({
  icon: Icon,
  value,
  suffix,
  prefix,
  label,
  description,
  index,
}: (typeof stats)[0] & { index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-50px" })
  const count = useCounter(value, 1800, inView)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-card rounded-2xl p-6 ring-1 ring-border hover:ring-2 transition-all duration-300"
      style={{ "--hover-ring": "var(--gold)" } as React.CSSProperties}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: "oklch(0.72 0.15 82 / 12%)" }}>
          <Icon className="size-5" style={{ color: "var(--gold)" }} />
        </div>
      </div>
      <div className="mb-1">
        <span className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          {prefix}{count.toLocaleString()}{suffix}
        </span>
      </div>
      <div className="text-sm font-semibold text-foreground mb-1">{label}</div>
      <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
    </motion.div>
  )
}

export function Stats() {
  return (
    <section className="py-16 sm:py-20 bg-muted/40 border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} {...stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
