/**
 * Shape of every editable part of the site, described once.
 *
 * The dashboard at /dashboard renders its forms from these definitions, and
 * `convex/content.ts` turns the same definitions into validators, so whatever
 * the form can produce is exactly what the database accepts.
 *
 * Imported by Convex functions too — keep imports relative and runtime-light.
 */

import { v, type Validator } from "convex/values"

/** A field's value. Its shape is only known at runtime, from the field definition. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Json = any

type Base = { label: string; description?: string }

export type Field =
  | (Base & { kind: "text"; multiline?: boolean })
  | (Base & { kind: "url" })
  | (Base & { kind: "integer"; optional?: boolean })
  | (Base & { kind: "checkbox" })
  | (Base & { kind: "image" | "file" })
  | (Base & { kind: "object"; fields: Fields })
  | (Base & { kind: "list"; of: Field; itemLabel?: (item: Json) => string })

export type Fields = Record<string, Field>

/** Stored value of an image or file field. `url` is resolved by the server from `storageId`. */
export type Upload = { url: string; storageId?: string; name?: string } | null

const text = (label: string, description?: string): Field => ({ kind: "text", label, description })
const longText = (label: string, description?: string): Field => ({
  kind: "text",
  label,
  description,
  multiline: true,
})
const url = (label: string): Field => ({ kind: "url", label })
const integer = (label: string, description?: string, optional?: boolean): Field => ({
  kind: "integer",
  label,
  description,
  optional,
})
const object = (label: string, fields: Fields, description?: string): Field => ({
  kind: "object",
  label,
  description,
  fields,
})
const list = (
  label: string,
  of: Field,
  itemLabel?: (item: Json) => string,
  description?: string
): Field => ({ kind: "list", label, of, itemLabel, description })

const textList = (label: string, itemLabel: string, description?: string) =>
  list(label, longText(itemLabel), (value: string) => value || itemLabel, description)

/** Eyebrow + two-tone heading, shared by most sections. */
const heading: Fields = {
  eyebrow: text("Small label above the heading"),
  title: text("Heading — first part"),
  accent: text("Heading — gold highlighted part", "Shown in gold right after the first part."),
}

export type Section = { label: string; group: string; fields: Fields }

export const sections = {
  profile: {
    label: "Profile, photo & contact details",
    group: "About you",
    fields: {
      photo: {
        kind: "image",
        label: "Profile photo",
        description: "A portrait photo works best (taller than it is wide).",
      },
      displayName: text("Full name"),
      shortName: text("Short name", "Shown in the top menu bar."),
      monogram: text("Initials", "Shown in the little gold badge, e.g. PC."),
      tagline: text("Menu bar tagline", "Small text under your name in the top menu bar."),
      title: text("Professional title"),
      currentRole: text("Current job title"),
      company: text("Company"),
      companyWebsite: url("Company website"),
      group: text("Parent group"),
      groupWebsite: url("Parent group website"),
      location: text("City & country"),
      address: longText("Full address"),
      personalEmail: text("Personal email"),
      workEmail: text("Work email"),
      primaryPhone: text("Primary phone", "Include the country code, e.g. +234 706 8764902."),
      secondaryPhone: text("Secondary phone"),
    },
  },

  hero: {
    label: "1. Top banner",
    group: "Page sections (top to bottom)",
    fields: {
      nameLine1: text("Name — first line"),
      nameLine2: text("Name — second line", "Shown in gold with an underline."),
      nameLine3: text("Name — third line"),
      intro: longText("Introduction"),
      introHighlights: list(
        "Bold phrases in the introduction",
        text("Phrase"),
        (value: string) => value || "Phrase",
        "Type a phrase exactly as it appears in the introduction to make it stand out."
      ),
      primaryButton: text("Gold button text"),
      secondaryButton: text("Second button text"),
      currentlyLabel: text("Label above current role"),
      sinceWord: text(
        "Word before the start date",
        'e.g. "since" in "Nigerian Breweries Plc · since November 2021".'
      ),
      careerArcLabel: text("Career arc label"),
      careerArc: list(
        "Career arc",
        object("Phase", {
          label: text("Phase name"),
          span: text("Years shown", 'e.g. "2004 — 2012" or "2012 — today".'),
          startYear: integer("Start year"),
          endYear: integer("End year", "Leave empty if this phase is ongoing.", true),
        }),
        (item) => item.label || "Phase",
        "The bar is sized by the years of each phase. The last phase is drawn in gold."
      ),
      categoriesLabel: text("Categories label"),
      categories: list(
        "Categories under management",
        text("Category"),
        (value: string) => value || "Category"
      ),
      credentialsLabel: text(
        "Credentials label",
        "The credentials themselves come from the Education & qualifications section."
      ),
      scrollLabel: text("Scroll hint text"),
    },
  },

  stats: {
    label: "2. Key numbers",
    group: "Page sections (top to bottom)",
    fields: {
      items: list(
        "Numbers",
        object("Number", {
          value: integer(
            "Number",
            "Digits only, e.g. 450. It counts up when visitors scroll to it."
          ),
          prefix: text("Before the number", "Optional, e.g. €"),
          suffix: text("After the number", "Optional, e.g. + or M+"),
          label: text("Label"),
          description: longText("Description"),
        }),
        (item) => `${item.prefix}${item.value ?? ""}${item.suffix} ${item.label}`
      ),
    },
  },

  about: {
    label: "3. About",
    group: "Page sections (top to bottom)",
    fields: {
      ...heading,
      summary: longText("Summary paragraph"),
      profileStatement: longText("Second paragraph"),
      factLabels: object(
        "Labels beside the photo",
        {
          currentRole: text("Current role"),
          company: text("Company"),
          group: text("Group"),
          location: text("Location"),
        },
        "The values come from “Profile, photo & contact details”."
      ),
      competenciesLabel: text("Competencies label"),
      competencies: textList("Core competencies", "Competency"),
      highlightsLabel: text("Highlights label"),
      highlights: textList("Career highlights", "Highlight"),
    },
  },

  experience: {
    label: "4. Experience",
    group: "Page sections (top to bottom)",
    fields: {
      ...heading,
      description: longText("Introduction"),
      currentBadge: text("Badge on the current role"),
      roles: list(
        "Roles (newest first)",
        object("Role", {
          title: text("Job title"),
          company: text("Company"),
          location: text("Location"),
          period: text("Dates", 'e.g. "November 2021 — Present".'),
          duration: text("Duration", 'e.g. "4+ years".'),
          isCurrent: {
            kind: "checkbox",
            label: "This is my current role",
            description: "Highlights it and shows it in the top banner.",
          },
          points: textList("Responsibilities & achievements", "Point"),
        }),
        (item) => `${item.title} · ${item.period}`
      ),
      earlierLabel: text("Earlier roles label"),
      earlierCaption: text("Earlier roles caption"),
      earlierRoles: list(
        "Earlier roles (shown as a compact list)",
        object("Role", {
          title: text("Job title"),
          location: text("Location"),
          period: text("Dates"),
          point: longText("Summary"),
        }),
        (item) => `${item.title} · ${item.period}`
      ),
    },
  },

  skills: {
    label: "5. Skills",
    group: "Page sections (top to bottom)",
    fields: {
      ...heading,
      description: longText("Introduction"),
      groups: list(
        "Skill groups",
        object("Group", {
          group: text("Group name"),
          skills: list("Skills", text("Skill"), (value: string) => value || "Skill"),
        }),
        (item) => item.group || "Group"
      ),
      snapshotLabel: text("Career snapshot label"),
      snapshot: list(
        "Career snapshot",
        object("Area", {
          area: text("Area"),
          detail: longText("Detail"),
        }),
        (item) => item.area || "Area"
      ),
    },
  },

  education: {
    label: "6. Education & qualifications",
    group: "Page sections (top to bottom)",
    fields: {
      ...heading,
      description: longText("Introduction"),
      educationLabel: text("Education card label"),
      education: list(
        "Degrees",
        object("Degree", {
          abbr: text("Abbreviation", "e.g. MBA"),
          title: text("Degree"),
          institution: text("Institution"),
          location: text("Location"),
        }),
        (item) => item.abbr || "Degree"
      ),
      qualificationsLabel: text("Qualifications card label"),
      certifications: list(
        "Professional qualifications",
        object("Qualification", {
          abbr: text("Abbreviation", "e.g. FCA"),
          title: text("Membership level", 'e.g. "Fellow" or "Associate".'),
          institution: text("Institute"),
        }),
        (item) => item.abbr || "Qualification"
      ),
    },
  },

  contact: {
    label: "7. Contact",
    group: "Page sections (top to bottom)",
    fields: {
      ...heading,
      description: longText("Introduction"),
      emailButton: text("Email button text"),
      callButton: text("Call button text"),
      channelLabels: object(
        "Labels on the contact cards",
        {
          personalEmail: text("Personal email"),
          workEmail: text("Work email"),
          primaryPhone: text("Primary phone"),
          secondaryPhone: text("Secondary phone"),
        },
        "The emails and numbers come from “Profile, photo & contact details”."
      ),
    },
  },

  site: {
    label: "Menu, footer & Google",
    group: "Settings",
    fields: {
      nav: object("Top menu links", {
        about: text("About"),
        experience: text("Experience"),
        skills: text("Skills"),
        education: text("Education"),
        contact: text("Contact"),
        cta: text("Email button"),
      }),
      footer: object("Footer", {
        backToTop: text("Back-to-top button"),
        rights: text("Copyright text"),
      }),
      searchTitle: text(
        "Google title",
        "The headline shown in Google results and the browser tab."
      ),
      searchDescription: longText(
        "Google description",
        "The short summary under the title in Google results."
      ),
      shareTitle: text(
        "Sharing title",
        "Shown when the site link is shared on WhatsApp, LinkedIn, X, etc."
      ),
      shareDescription: longText("Sharing description"),
      keywords: list("Search keywords", text("Keyword"), (value: string) => value || "Keyword"),
      expertiseTopics: list(
        "Areas of expertise (for search engines)",
        text("Topic"),
        (value: string) => value || "Topic"
      ),
    },
  },
} satisfies Record<string, Section>

export type SectionKey = keyof typeof sections

export const sectionKeys = Object.keys(sections) as SectionKey[]

/** Convex validator for one field — keeps stored content in the shape the site renders. */
export function toValidator(field: Field): Validator<Json, "required", string> {
  switch (field.kind) {
    case "text":
    case "url":
      return v.string()
    case "integer":
      return field.optional ? v.union(v.number(), v.null()) : v.number()
    case "checkbox":
      return v.boolean()
    case "image":
    case "file":
      return v.union(
        v.null(),
        v.object({
          url: v.string(),
          storageId: v.optional(v.id("_storage")),
          name: v.optional(v.string()),
        })
      )
    case "object":
      return fieldsValidator(field.fields)
    case "list":
      return v.array(toValidator(field.of))
  }
}

export const fieldsValidator = (fields: Fields) =>
  v.object(Object.fromEntries(Object.entries(fields).map(([key, f]) => [key, toValidator(f)])))

/** Empty value for a field, used for new list items and missing keys. */
export function emptyValue(field: Field): unknown {
  switch (field.kind) {
    case "text":
    case "url":
      return ""
    case "integer":
      return field.optional ? null : 0
    case "checkbox":
      return false
    case "image":
    case "file":
      return null
    case "object":
      return normalize(field.fields, {})
    case "list":
      return []
  }
}

/** Fills in missing keys and drops unknown ones so a value always matches its schema. */
export function normalize(fields: Fields, value: unknown): Record<string, unknown> {
  const source = (value && typeof value === "object" ? value : {}) as Record<string, unknown>
  return Object.fromEntries(
    Object.entries(fields).map(([key, field]) => [key, normalizeField(field, source[key])])
  )
}

function normalizeField(field: Field, value: unknown): unknown {
  if (value === undefined) return emptyValue(field)
  if (field.kind === "object") return normalize(field.fields, value)
  if (field.kind === "list") {
    return Array.isArray(value) ? value.map((item) => normalizeField(field.of, item)) : []
  }
  return value
}

/** Every storage id referenced by a section's value, so replaced uploads can be deleted. */
export function collectStorageIds(fields: Fields, value: unknown, into = new Set<string>()) {
  const source = (value ?? {}) as Record<string, unknown>
  for (const [key, field] of Object.entries(fields)) collectField(field, source[key], into)
  return into
}

function collectField(field: Field, value: unknown, into: Set<string>) {
  if (value == null) return
  if (field.kind === "image" || field.kind === "file") {
    const id = (value as Upload)?.storageId
    if (id) into.add(id)
  } else if (field.kind === "object") {
    collectStorageIds(field.fields, value, into)
  } else if (field.kind === "list" && Array.isArray(value)) {
    for (const item of value) collectField(field.of, item, into)
  }
}
