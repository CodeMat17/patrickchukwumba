import { config, fields, singleton } from "@keystatic/core"

/**
 * Editing dashboard for the site, served at /keystatic.
 *
 * Every singleton below maps to one JSON file in `content/`, which `lib/cv.ts`
 * reads. Locally the editor writes straight to disk; in production it commits
 * through Keystatic Cloud, and Vercel redeploys the site from that commit.
 */

const cloudProject = process.env.NEXT_PUBLIC_KEYSTATIC_CLOUD_PROJECT

const uploads = { directory: "public/uploads", publicPath: "/uploads/" }

/** Eyebrow + two-tone heading + intro, shared by most sections. */
const heading = {
  eyebrow: fields.text({ label: "Small label above the heading" }),
  title: fields.text({ label: "Heading — first part" }),
  accent: fields.text({
    label: "Heading — gold highlighted part",
    description: "Shown in gold right after the first part.",
  }),
}

const textList = (label: string, itemLabel: string, description?: string) =>
  fields.array(fields.text({ label: itemLabel, multiline: true }), {
    label,
    description,
    itemLabel: (props) => props.value || itemLabel,
  })

export default config({
  storage: cloudProject ? { kind: "cloud" } : { kind: "local" },
  ...(cloudProject ? { cloud: { project: cloudProject as `${string}/${string}` } } : {}),

  ui: {
    brand: { name: "Patrick Chukwumba — Website" },
    navigation: {
      "About you": ["profile"],
      "Page sections (top to bottom)": [
        "hero",
        "stats",
        "about",
        "experience",
        "skills",
        "education",
        "contact",
      ],
      "Settings": ["site"],
    },
  },

  singletons: {
    profile: singleton({
      label: "Profile, photo, CV & contact details",
      path: "content/profile",
      format: { data: "json" },
      schema: {
        photo: fields.image({
          label: "Profile photo",
          description: "A portrait photo works best (taller than it is wide).",
          ...uploads,
        }),
        cv: fields.file({
          label: "CV (PDF)",
          description: "Visitors can download this from the Contact section.",
          ...uploads,
        }),
        name: fields.text({ label: "Full name (formal order)" }),
        displayName: fields.text({
          label: "Full name (as shown on the site)",
        }),
        shortName: fields.text({
          label: "Short name",
          description: "Shown in the top menu bar.",
        }),
        monogram: fields.text({
          label: "Initials",
          description: "Shown in the little gold badge, e.g. PC.",
        }),
        tagline: fields.text({
          label: "Menu bar tagline",
          description: "Small text under your name in the top menu bar.",
        }),
        title: fields.text({ label: "Professional title" }),
        currentRole: fields.text({ label: "Current job title" }),
        company: fields.text({ label: "Company" }),
        companyWebsite: fields.url({ label: "Company website" }),
        group: fields.text({ label: "Parent group" }),
        groupWebsite: fields.url({ label: "Parent group website" }),
        location: fields.text({ label: "City & country" }),
        address: fields.text({ label: "Full address", multiline: true }),
        personalEmail: fields.text({ label: "Personal email" }),
        workEmail: fields.text({ label: "Work email" }),
        primaryPhone: fields.text({
          label: "Primary phone",
          description: "Include the country code, e.g. +234 706 8764902.",
        }),
        secondaryPhone: fields.text({ label: "Secondary phone" }),
      },
    }),

    hero: singleton({
      label: "1. Top banner",
      path: "content/hero",
      format: { data: "json" },
      schema: {
        nameLine1: fields.text({ label: "Name — first line" }),
        nameLine2: fields.text({
          label: "Name — second line",
          description: "Shown in gold with an underline.",
        }),
        nameLine3: fields.text({ label: "Name — third line" }),
        intro: fields.text({ label: "Introduction", multiline: true }),
        introHighlights: fields.array(fields.text({ label: "Phrase" }), {
          label: "Bold phrases in the introduction",
          description:
            "Type a phrase exactly as it appears in the introduction to make it stand out.",
          itemLabel: (props) => props.value || "Phrase",
        }),
        primaryButton: fields.text({ label: "Gold button text" }),
        secondaryButton: fields.text({ label: "Second button text" }),
        currentlyLabel: fields.text({ label: "Label above current role" }),
        sinceWord: fields.text({
          label: "Word before the start date",
          description: 'e.g. "since" in "Nigerian Breweries Plc · since November 2021".',
        }),
        careerArcLabel: fields.text({ label: "Career arc label" }),
        careerArc: fields.array(
          fields.object({
            label: fields.text({ label: "Phase name" }),
            span: fields.text({
              label: "Years shown",
              description: 'e.g. "2004 — 2012" or "2012 — today".',
            }),
            startYear: fields.integer({ label: "Start year" }),
            endYear: fields.integer({
              label: "End year",
              description: "Leave empty if this phase is ongoing.",
            }),
          }),
          {
            label: "Career arc",
            description:
              "The bar is sized by the years of each phase. The last phase is drawn in gold.",
            itemLabel: (props) => props.fields.label.value || "Phase",
          }
        ),
        categoriesLabel: fields.text({ label: "Categories label" }),
        categories: fields.array(fields.text({ label: "Category" }), {
          label: "Categories under management",
          itemLabel: (props) => props.value || "Category",
        }),
        credentialsLabel: fields.text({
          label: "Credentials label",
          description:
            "The credentials themselves come from the Education & qualifications section.",
        }),
        scrollLabel: fields.text({ label: "Scroll hint text" }),
      },
    }),

    stats: singleton({
      label: "2. Key numbers",
      path: "content/stats",
      format: { data: "json" },
      schema: {
        items: fields.array(
          fields.object({
            value: fields.integer({
              label: "Number",
              description: "Digits only, e.g. 450. It counts up when visitors scroll to it.",
            }),
            prefix: fields.text({
              label: "Before the number",
              description: "Optional, e.g. €",
            }),
            suffix: fields.text({
              label: "After the number",
              description: "Optional, e.g. + or M+",
            }),
            label: fields.text({ label: "Label" }),
            description: fields.text({ label: "Description", multiline: true }),
          }),
          {
            label: "Numbers",
            itemLabel: (props) =>
              `${props.fields.prefix.value}${props.fields.value.value ?? ""}${props.fields.suffix.value} ${props.fields.label.value}`,
          }
        ),
      },
    }),

    about: singleton({
      label: "3. About",
      path: "content/about",
      format: { data: "json" },
      schema: {
        ...heading,
        summary: fields.text({ label: "Summary paragraph", multiline: true }),
        profileStatement: fields.text({
          label: "Second paragraph",
          multiline: true,
        }),
        factLabels: fields.object(
          {
            currentRole: fields.text({ label: "Current role" }),
            company: fields.text({ label: "Company" }),
            group: fields.text({ label: "Group" }),
            location: fields.text({ label: "Location" }),
          },
          {
            label: "Labels beside the photo",
            description:
              "The values come from “Profile, photo, CV & contact details”.",
          }
        ),
        competenciesLabel: fields.text({ label: "Competencies label" }),
        competencies: textList("Core competencies", "Competency"),
        highlightsLabel: fields.text({ label: "Highlights label" }),
        highlights: textList("Career highlights", "Highlight"),
      },
    }),

    experience: singleton({
      label: "4. Experience",
      path: "content/experience",
      format: { data: "json" },
      schema: {
        ...heading,
        description: fields.text({ label: "Introduction", multiline: true }),
        currentBadge: fields.text({
          label: "Badge on the current role",
        }),
        roles: fields.array(
          fields.object({
            title: fields.text({ label: "Job title" }),
            company: fields.text({ label: "Company" }),
            location: fields.text({ label: "Location" }),
            period: fields.text({
              label: "Dates",
              description: 'e.g. "November 2021 — Present".',
            }),
            duration: fields.text({
              label: "Duration",
              description: 'e.g. "4+ years".',
            }),
            isCurrent: fields.checkbox({
              label: "This is my current role",
              description: "Highlights it and shows it in the top banner.",
            }),
            points: textList("Responsibilities & achievements", "Point"),
          }),
          {
            label: "Roles (newest first)",
            itemLabel: (props) =>
              `${props.fields.title.value} · ${props.fields.period.value}`,
          }
        ),
        earlierLabel: fields.text({ label: "Earlier roles label" }),
        earlierCaption: fields.text({ label: "Earlier roles caption" }),
        earlierRoles: fields.array(
          fields.object({
            title: fields.text({ label: "Job title" }),
            location: fields.text({ label: "Location" }),
            period: fields.text({ label: "Dates" }),
            point: fields.text({ label: "Summary", multiline: true }),
          }),
          {
            label: "Earlier roles (shown as a compact list)",
            itemLabel: (props) =>
              `${props.fields.title.value} · ${props.fields.period.value}`,
          }
        ),
      },
    }),

    skills: singleton({
      label: "5. Skills",
      path: "content/skills",
      format: { data: "json" },
      schema: {
        ...heading,
        description: fields.text({ label: "Introduction", multiline: true }),
        groups: fields.array(
          fields.object({
            group: fields.text({ label: "Group name" }),
            skills: fields.array(fields.text({ label: "Skill" }), {
              label: "Skills",
              itemLabel: (props) => props.value || "Skill",
            }),
          }),
          {
            label: "Skill groups",
            itemLabel: (props) => props.fields.group.value || "Group",
          }
        ),
        snapshotLabel: fields.text({ label: "Career snapshot label" }),
        snapshot: fields.array(
          fields.object({
            area: fields.text({ label: "Area" }),
            detail: fields.text({ label: "Detail", multiline: true }),
          }),
          {
            label: "Career snapshot",
            itemLabel: (props) => props.fields.area.value || "Area",
          }
        ),
      },
    }),

    education: singleton({
      label: "6. Education & qualifications",
      path: "content/education",
      format: { data: "json" },
      schema: {
        ...heading,
        description: fields.text({ label: "Introduction", multiline: true }),
        educationLabel: fields.text({ label: "Education card label" }),
        education: fields.array(
          fields.object({
            abbr: fields.text({ label: "Abbreviation", description: "e.g. MBA" }),
            title: fields.text({ label: "Degree" }),
            institution: fields.text({ label: "Institution" }),
            location: fields.text({ label: "Location" }),
          }),
          {
            label: "Degrees",
            itemLabel: (props) => props.fields.abbr.value || "Degree",
          }
        ),
        qualificationsLabel: fields.text({ label: "Qualifications card label" }),
        certifications: fields.array(
          fields.object({
            abbr: fields.text({ label: "Abbreviation", description: "e.g. FCA" }),
            title: fields.text({
              label: "Membership level",
              description: 'e.g. "Fellow" or "Associate".',
            }),
            institution: fields.text({ label: "Institute" }),
          }),
          {
            label: "Professional qualifications",
            itemLabel: (props) => props.fields.abbr.value || "Qualification",
          }
        ),
      },
    }),

    contact: singleton({
      label: "7. Contact",
      path: "content/contact",
      format: { data: "json" },
      schema: {
        ...heading,
        description: fields.text({ label: "Introduction", multiline: true }),
        emailButton: fields.text({ label: "Email button text" }),
        callButton: fields.text({ label: "Call button text" }),
        cvButton: fields.text({
          label: "CV download button text",
          description: "Only shown when a CV is uploaded in your profile.",
        }),
        channelLabels: fields.object(
          {
            personalEmail: fields.text({ label: "Personal email" }),
            workEmail: fields.text({ label: "Work email" }),
            primaryPhone: fields.text({ label: "Primary phone" }),
            secondaryPhone: fields.text({ label: "Secondary phone" }),
          },
          {
            label: "Labels on the contact cards",
            description:
              "The emails and numbers come from “Profile, photo, CV & contact details”.",
          }
        ),
      },
    }),

    site: singleton({
      label: "Menu, footer & Google",
      path: "content/site",
      format: { data: "json" },
      schema: {
        nav: fields.object(
          {
            about: fields.text({ label: "About" }),
            experience: fields.text({ label: "Experience" }),
            skills: fields.text({ label: "Skills" }),
            education: fields.text({ label: "Education" }),
            contact: fields.text({ label: "Contact" }),
            cta: fields.text({ label: "Email button" }),
          },
          { label: "Top menu links" }
        ),
        footer: fields.object(
          {
            backToTop: fields.text({ label: "Back-to-top button" }),
            rights: fields.text({ label: "Copyright text" }),
          },
          { label: "Footer" }
        ),
        searchTitle: fields.text({
          label: "Google title",
          description: "The headline shown in Google results and the browser tab.",
        }),
        searchDescription: fields.text({
          label: "Google description",
          description: "The short summary under the title in Google results.",
          multiline: true,
        }),
        shareTitle: fields.text({
          label: "Sharing title",
          description: "Shown when the site link is shared on WhatsApp, LinkedIn, X, etc.",
        }),
        shareDescription: fields.text({
          label: "Sharing description",
          multiline: true,
        }),
        keywords: fields.array(fields.text({ label: "Keyword" }), {
          label: "Search keywords",
          itemLabel: (props) => props.value || "Keyword",
        }),
        expertiseTopics: fields.array(fields.text({ label: "Topic" }), {
          label: "Areas of expertise (for search engines)",
          itemLabel: (props) => props.value || "Topic",
        }),
      },
    }),
  },
})
