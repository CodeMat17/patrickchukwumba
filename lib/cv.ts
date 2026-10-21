/**
 * Single source of truth for page content.
 *
 * The text lives in `content/*.json`, which the owner edits through the
 * Keystatic dashboard at /keystatic (see `keystatic.config.ts`). This module
 * reshapes those files into what the sections render.
 */

import profileData from "@/content/profile.json"
import heroData from "@/content/hero.json"
import statsData from "@/content/stats.json"
import aboutData from "@/content/about.json"
import experienceData from "@/content/experience.json"
import skillsData from "@/content/skills.json"
import educationData from "@/content/education.json"
import contactData from "@/content/contact.json"
import siteData from "@/content/site.json"

/** "+234 706 8764902" → "tel:+2347068764902" */
const telHref = (display: string) => `tel:${display.replace(/[^\d+]/g, "")}`

export const profile = {
  name: profileData.name,
  displayName: profileData.displayName,
  shortName: profileData.shortName,
  monogram: profileData.monogram,
  title: profileData.title,
  tagline: profileData.tagline,
  currentRole: profileData.currentRole,
  company: profileData.company,
  companyWebsite: profileData.companyWebsite,
  group: profileData.group,
  groupWebsite: profileData.groupWebsite,
  location: profileData.location,
  address: profileData.address,
  emails: {
    personal: profileData.personalEmail,
    work: profileData.workEmail,
  },
  phones: {
    primary: { display: profileData.primaryPhone, href: telHref(profileData.primaryPhone) },
    secondary: { display: profileData.secondaryPhone, href: telHref(profileData.secondaryPhone) },
  },
  photoUrl: (profileData.photo as string | null) || null,
  cvUrl: (profileData.cv as string | null) || null,
  summary: aboutData.summary,
  profileStatement: aboutData.profileStatement,
}

export const site = siteData

export const hero = heroData

export const stats = statsData.items

export const about = aboutData

export const coreCompetencies = aboutData.competencies

export const careerHighlights = aboutData.highlights

export type Role = {
  title: string
  company: string
  location: string
  period: string
  duration: string
  isCurrent?: boolean
  points: readonly string[]
}

export const experience = experienceData

export const roles: readonly Role[] = experienceData.roles

/** Finance foundation, 2004–2012 — shown as a compact ledger rather than full cards. */
export const earlierRoles = experienceData.earlierRoles

export const skills = skillsData

export const technicalSkills = skillsData.groups

export const careerSnapshot = skillsData.snapshot

export const educationSection = educationData

export const education = educationData.education

export const certifications = educationData.certifications

export const contact = contactData

/** Categories under management, used in the hero dossier. */
export const categories = heroData.categories
