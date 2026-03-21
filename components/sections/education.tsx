"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { GraduationCap, Award, Heart } from "lucide-react"

const education = [
  {
    type: "education",
    title: "Master of Business Administration (MBA)",
    institution: "University of Lagos",
    location: "Lagos, Nigeria",
    detail: "Business Administration",
  },
]

const certifications = [
  {
    title: "Fellow — Institute of Chartered Accountants of Nigeria",
    short: "FCA (ICAN)",
    body: "Institute of Chartered Accountants of Nigeria",
    description: "The highest grade of membership, recognising distinguished service and expertise in accountancy.",
  },
  {
    title: "Associate — Chartered Institute of Taxation of Nigeria",
    short: "ACIT (CITN)",
    body: "Chartered Institute of Taxation of Nigeria",
    description: "Professional certification in Nigerian tax law, practice and compliance.",
  },
]

const interests = ["Family", "Football", "Travelling"]

export function Education() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section id="education" className="py-20 sm:py-28 bg-muted/30">
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
            Qualifications
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Education &{" "}
            <span style={{ color: "var(--gold)" }}>Certifications</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Education */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-card rounded-2xl p-6 ring-1 ring-border"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: "oklch(0.72 0.15 82 / 12%)" }}>
                <GraduationCap className="size-4" style={{ color: "var(--gold)" }} />
              </div>
              <h3 className="text-sm font-semibold text-foreground">Education</h3>
            </div>
            {education.map((edu) => (
              <div key={edu.title} className="space-y-1">
                <h4 className="text-sm font-semibold text-foreground leading-snug">{edu.title}</h4>
                <p className="text-xs font-medium" style={{ color: "var(--gold)" }}>{edu.institution}</p>
                <p className="text-xs text-muted-foreground">{edu.location}</p>
              </div>
            ))}
          </motion.div>

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-card rounded-2xl p-6 ring-1 ring-border lg:col-span-1"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: "oklch(0.72 0.15 82 / 12%)" }}>
                <Award className="size-4" style={{ color: "var(--gold)" }} />
              </div>
              <h3 className="text-sm font-semibold text-foreground">Professional Certifications</h3>
            </div>
            <div className="space-y-4">
              {certifications.map((cert) => (
                <div key={cert.short} className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-2 py-0.5 rounded-md"
                      style={{
                        background: "oklch(0.72 0.15 82 / 15%)",
                        color: "var(--gold)",
                      }}>
                      {cert.short}
                    </span>
                  </div>
                  <h4 className="text-xs font-semibold text-foreground leading-snug">{cert.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{cert.description}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Personal Interests */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-card rounded-2xl p-6 ring-1 ring-border"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: "oklch(0.72 0.15 82 / 12%)" }}>
                <Heart className="size-4" style={{ color: "var(--gold)" }} />
              </div>
              <h3 className="text-sm font-semibold text-foreground">Personal Interests</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {interests.map((interest) => (
                <span
                  key={interest}
                  className="px-3 py-1.5 rounded-full text-xs font-medium border"
                  style={{
                    borderColor: "oklch(0.72 0.15 82 / 30%)",
                    color: "var(--gold)",
                    background: "oklch(0.72 0.15 82 / 8%)",
                  }}
                >
                  {interest}
                </span>
              ))}
            </div>
            <div className="mt-6 pt-5 border-t border-border">
              <p className="text-xs text-muted-foreground leading-relaxed">
                Outside of work, Patrick enjoys quality family time, following football and exploring new destinations — values that also inform his collaborative leadership style.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
