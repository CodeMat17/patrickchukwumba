/**
 * Single source of truth for page content.
 *
 * The owner edits the text in the dashboard at /dashboard, which saves it to
 * Convex (see `lib/content-schema.ts`). `content/*.json` holds the defaults for
 * anything not saved yet. This module reshapes both into what the sections render.
 */

import profileDefaults from "@/content/profile.json"
import heroDefaults from "@/content/hero.json"
import statsDefaults from "@/content/stats.json"
import aboutDefaults from "@/content/about.json"
import experienceDefaults from "@/content/experience.json"
import skillsDefaults from "@/content/skills.json"
import educationDefaults from "@/content/education.json"
import contactDefaults from "@/content/contact.json"
import siteDefaults from "@/content/site.json"
import type { Upload } from "@/lib/content-schema"

export const defaults = {
  profile: profileDefaults as Omit<typeof profileDefaults, "photo"> & {
    photo: Upload
  },
  hero: heroDefaults as Omit<typeof heroDefaults, "careerArc"> & {
    careerArc: { label: string; span: string; startYear: number; endYear: number | null }[]
  },
  stats: statsDefaults,
  about: aboutDefaults,
  experience: experienceDefaults,
  skills: skillsDefaults,
  education: educationDefaults,
  contact: contactDefaults,
  site: siteDefaults,
}

export type RawContent = typeof defaults

/** "+234 706 8764902" → "tel:+2347068764902" */
const telHref = (display: string) => `tel:${display.replace(/[^\d+]/g, "")}`

export type Role = {
  title: string
  company: string
  location: string
  period: string
  duration: string
  isCurrent?: boolean
  points: readonly string[]
}

/** Shapes saved content (falling back to defaults per section) for the sections. */
export function buildContent(saved: Partial<RawContent>) {
  const raw = { ...defaults, ...saved }
  const { profile: profileData, about: aboutData, experience, skills } = raw
  const educationSection = raw.education

  const profile = {
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
    photoUrl: profileData.photo?.url || null,
    summary: aboutData.summary,
    profileStatement: aboutData.profileStatement,
  }

  return {
    profile,
    site: raw.site,
    hero: raw.hero,
    stats: raw.stats.items,
    about: aboutData,
    coreCompetencies: aboutData.competencies,
    careerHighlights: aboutData.highlights,
    experience,
    roles: experience.roles as readonly Role[],
    /** Finance foundation, 2004–2012 — shown as a compact ledger rather than full cards. */
    earlierRoles: experience.earlierRoles,
    skills,
    technicalSkills: skills.groups,
    careerSnapshot: skills.snapshot,
    educationSection,
    education: educationSection.education,
    certifications: educationSection.certifications,
    contact: raw.contact,
    /** Categories under management, used in the hero dossier. */
    categories: raw.hero.categories,
  }
}

export type Content = ReturnType<typeof buildContent>
