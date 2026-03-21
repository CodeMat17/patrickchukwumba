"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Briefcase } from "lucide-react"

const experiences = [
  {
    period: "Nov 2021 – Present",
    duration: "4 years+",
    title: "Supply Chain Category Manager",
    company: "Nigerian Breweries Plc",
    location: "Lagos HQ",
    isCurrent: true,
    description:
      "Responsible for people management, capability development, category strategy development, sourcing activities and governance. Working with category buyers to support the Supply Chain function. Responsible for tendering, negotiation, supplier selection and opportunity assessment for all locally sourced Supply Chain activities.",
    categories:
      "Production Materials (Raw & Packaging) · Investment Projects · Logistics (Internal & Road Transportation) · Energy & Brewery Services · MRO Spares & Services · Regulations",
    highlights: [
      "EUR +700m under management as of 2025",
      "+1,100 suppliers across categories",
      "3 FTEs directly managed",
    ],
  },
  {
    period: "Oct 2018 – Oct 2021",
    duration: "3 years 11 months",
    title: "Manager – Contract Management",
    company: "Nigerian Breweries Plc",
    location: "Lagos HQ",
    isCurrent: false,
    description:
      "Leading and managing the Contract Management team — responsible for Contract Implementation, Contract Execution, Supplier Performance Management and Contract Closures. Management of internal/external Stakeholders and interface with Heineken Global Category Buyers.",
    categories: "Contract Management for all Categories (Locally and Globally Managed materials)",
    highlights: ["+2,000 suppliers", "7 FTEs directly managed"],
  },
  {
    period: "Aug 2017 – Oct 2018",
    duration: "1 year 2 months",
    title: "Category Buyer, Supply Chain Services & Projects",
    company: "Nigerian Breweries Plc",
    location: "Lagos HQ",
    isCurrent: false,
    description:
      "Responsible for Investment Projects, Logistics & Warehousing. Worked with the Supply Chain Project team to deliver Investment projects across Breweries and with the Distribution team to ensure uninterrupted supply of delivery trucks.",
    categories: "Investment Projects · Logistics & Warehousing",
    highlights: [],
  },
  {
    period: "Mar 2015 – Jul 2017",
    duration: "2 years 4 months",
    title: "Contract Manager – Production Materials",
    company: "Nigerian Breweries Plc",
    location: "Lagos HQ",
    isCurrent: false,
    description:
      "Effectively managed relationships with all stakeholders involved in production materials and secured uninterrupted supply of production materials.",
    categories: "Production Materials",
    highlights: [],
  },
  {
    period: "May 2013 – Feb 2015",
    duration: "1 year 9 months",
    title: "Category Buyer – Production Materials",
    company: "Nigerian Breweries Plc",
    location: "Lagos HQ",
    isCurrent: false,
    description:
      "Responsible for all locally sourced Production Materials (Raw and Packaging). Managed tendering, negotiation, supplier selection and opportunity assessment. Secured uninterrupted supply.",
    categories: "Raw & Packaging Materials",
    highlights: [],
  },
  {
    period: "Oct 2012 – Apr 2013",
    duration: "6 months",
    title: "Category Buyer – Business Services & Commerce",
    company: "Nigerian Breweries Plc",
    location: "Lagos HQ",
    isCurrent: false,
    description:
      "Secured multi-year uninterrupted supply of locally sourced material at competitive cost. Role required strategy development, tendering, negotiation, supplier selection, contracting and STP policy compliance. Brought financial expertise and procurement experience to support the category.",
    categories: "Business Services & Commerce",
    highlights: [],
  },
  {
    period: "Mar 2010 – Sep 2012",
    duration: "1 year 6 months",
    title: "Bank Operations Manager",
    company: "Nigerian Breweries Plc",
    location: "Lagos HQ",
    isCurrent: false,
    description: "Managed banking operations for the organisation.",
    categories: "Finance / Operations",
    highlights: [],
  },
  {
    period: "Aug 2008 – Feb 2010",
    duration: "1 year 6 months",
    title: "Tax and Consolidation Manager",
    company: "Nigerian Breweries Plc",
    location: "Lagos HQ",
    isCurrent: false,
    description: "Managed tax and group consolidation processes.",
    categories: "Finance",
    highlights: [],
  },
  {
    period: "Jun 2007 – Jul 2008",
    duration: "1 year 1 month",
    title: "Business Unit Controller",
    company: "Nigerian Breweries Plc",
    location: "South Business Unit",
    isCurrent: false,
    description:
      "Developed control consciousness and discipline in utilisation of financial resources to ensure cost savings in operations.",
    categories: "Finance / Control",
    highlights: [],
  },
  {
    period: "Dec 2006 – May 2007",
    duration: "6 months",
    title: "Financial Accountant",
    company: "Nigerian Breweries Plc",
    location: "Ibadan Brewery",
    isCurrent: false,
    description: "Financial accounting responsibilities at the Ibadan Brewery.",
    categories: "Finance",
    highlights: [],
  },
  {
    period: "Jul 2004 – Nov 2006",
    duration: "2 years 5 months",
    title: "Inventory Accountant",
    company: "Nigerian Breweries Plc",
    location: "Ibadan Brewery",
    isCurrent: false,
    description: "Managed inventory accounting at the Ibadan Brewery.",
    categories: "Finance / Inventory",
    highlights: [],
  },
]

function ExperienceItem({
  exp,
  index,
  isLast,
}: {
  exp: (typeof experiences)[0]
  index: number
  isLast: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: Math.min(index * 0.08, 0.4) }}
      className="relative flex gap-6"
    >
      {/* Timeline spine */}
      <div className="flex flex-col items-center flex-shrink-0">
        <div
          className="w-3 h-3 rounded-full border-2 mt-1 flex-shrink-0 z-10"
          style={{
            borderColor: exp.isCurrent ? "var(--gold)" : "var(--border)",
            background: exp.isCurrent ? "var(--gold)" : "var(--background)",
          }}
        />
        {!isLast && <div className="w-px flex-1 mt-1 min-h-[40px]" style={{ background: "var(--border)" }} />}
      </div>

      {/* Card */}
      <div
        className={`pb-8 flex-1 ${isLast ? "" : ""}`}
      >
        <div
          className={`p-5 rounded-2xl ring-1 transition-all duration-300 hover:shadow-md ${
            exp.isCurrent
              ? "bg-card ring-[var(--gold)]/30"
              : "bg-card ring-border"
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
            <div>
              <h3 className="font-semibold text-foreground text-sm leading-snug">{exp.title}</h3>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-xs text-muted-foreground">{exp.company}</span>
                <span className="text-muted-foreground/40 text-xs">·</span>
                <span className="text-xs text-muted-foreground">{exp.location}</span>
              </div>
            </div>
            <div className="flex flex-col items-start sm:items-end gap-1 flex-shrink-0">
              <span className="text-xs font-medium text-foreground">{exp.period}</span>
              <span className="text-xs text-muted-foreground">{exp.duration}</span>
              {exp.isCurrent && (
                <span
                  className="text-xs px-2 py-0.5 rounded-full font-medium"
                  style={{
                    background: "oklch(0.72 0.15 82 / 15%)",
                    color: "var(--gold)",
                  }}
                >
                  Current
                </span>
              )}
            </div>
          </div>

          <p className="text-xs text-muted-foreground leading-relaxed mb-3">{exp.description}</p>

          <div className="text-xs text-muted-foreground/70 mb-3 italic">
            <strong className="not-italic font-medium text-muted-foreground">Scope: </strong>
            {exp.categories}
          </div>

          {exp.highlights.length > 0 && (
            <ul className="flex flex-col gap-1">
              {exp.highlights.map((h) => (
                <li key={h} className="flex items-center gap-2 text-xs font-medium"
                  style={{ color: "var(--gold)" }}>
                  <span className="w-1 h-1 rounded-full flex-shrink-0"
                    style={{ background: "var(--gold)" }} />
                  {h}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export function Experience() {
  const headerRef = useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true })

  return (
    <section id="experience" className="py-20 sm:py-28 bg-muted/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <span className="inline-block text-xs font-semibold tracking-widest uppercase mb-3"
            style={{ color: "var(--gold)" }}>
            Career Journey
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            20 Years at{" "}
            <span style={{ color: "var(--gold)" }}>Nigerian Breweries</span>
          </h2>
          <p className="mt-3 text-muted-foreground text-sm max-w-xl mx-auto">
            A consistent trajectory from Finance to Procurement leadership within one of Africa&apos;s most respected FMCG companies.
          </p>
        </motion.div>

        {/* Timeline */}
        <div>
          {experiences.map((exp, i) => (
            <ExperienceItem key={`${exp.title}-${exp.period}`} exp={exp} index={i} isLast={i === experiences.length - 1} />
          ))}
        </div>

        {/* Started journey */}
        <div className="flex items-center gap-4 mt-2 pl-9">
          <div className="w-3 h-3 rounded-full flex-shrink-0"
            style={{ background: "var(--border)" }} />
          <span className="text-xs text-muted-foreground italic">
            Career with Nigerian Breweries Plc began July 2004 · 20+ years of loyalty and growth
          </span>
        </div>
      </div>
    </section>
  )
}
