"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

const skillGroups = [
  {
    category: "Procurement",
    skills: [
      "Category Strategy Development",
      "Strategic Sourcing",
      "Tendering & RFx",
      "Negotiation",
      "Supplier Selection",
      "Contract Management",
      "Supplier Performance Management",
      "Opportunity Assessment",
      "STP Compliance",
    ],
  },
  {
    category: "Leadership",
    skills: [
      "People Management",
      "Team Leadership",
      "Capability Development",
      "Stakeholder Management",
      "Cross-functional Collaboration",
      "Change Management",
    ],
  },
  {
    category: "Category Expertise",
    skills: [
      "Raw Materials",
      "Packaging Materials",
      "Investment Projects",
      "Road Transportation",
      "Internal Logistics",
      "Energy & Utilities",
      "Brewery Services",
      "MRO Spares & Services",
      "Regulatory Procurement",
      "Business Services",
    ],
  },
  {
    category: "Finance & Analytics",
    skills: [
      "Financial Analysis",
      "Cost Modelling",
      "Benchmarking",
      "Data Analytics",
      "Budget Management",
      "Tax & Consolidation",
      "Inventory Management",
    ],
  },
  {
    category: "Tools & Technology",
    skills: [
      "Microsoft Office Suite",
      "SAP",
      "Procurement Platforms",
      "Data Analytics Tools",
      "ERP Systems",
    ],
  },
]

export function Skills() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section id="skills" className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
          ref={ref}
        >
          <span className="inline-block text-xs font-semibold tracking-widest uppercase mb-3"
            style={{ color: "var(--gold)" }}>
            Expertise
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Skills &{" "}
            <span style={{ color: "var(--gold)" }}>Competencies</span>
          </h2>
        </motion.div>

        {/* Skill groups */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillGroups.map((group, gi) => (
            <SkillGroup key={group.category} group={group} groupIndex={gi} parentInView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}

function SkillGroup({
  group,
  groupIndex,
  parentInView,
}: {
  group: (typeof skillGroups)[0]
  groupIndex: number
  parentInView: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={parentInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.1 + groupIndex * 0.08 }}
      className="bg-card rounded-2xl p-6 ring-1 ring-border"
    >
      <div className="flex items-center gap-2 mb-4">
        <div
          className="w-1.5 h-5 rounded-full"
          style={{ background: "var(--gold)" }}
        />
        <h3 className="text-sm font-semibold text-foreground">{group.category}</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {group.skills.map((skill, si) => (
          <motion.span
            key={skill}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={parentInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.3, delay: 0.2 + groupIndex * 0.06 + si * 0.03 }}
            className="px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors hover:border-[var(--gold)]/50 hover:text-foreground cursor-default"
            style={{
              background: "var(--muted)",
              borderColor: "var(--border)",
              color: "var(--muted-foreground)",
            }}
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.div>
  )
}
