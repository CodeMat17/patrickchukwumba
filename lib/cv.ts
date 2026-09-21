/**
 * Single source of truth for page content, transcribed from `public/cv.pdf`.
 * Every section reads from here so the site and the CV never drift apart.
 */

export const profile = {
  name: "Chukwumba Patrick Okorie",
  displayName: "Patrick Chukwumba Okorie",
  shortName: "Patrick Chukwumba",
  monogram: "PC",
  title: "Procurement & Finance Executive",
  currentRole: "Supply Chain Category Manager",
  company: "Nigerian Breweries Plc",
  group: "HEINEKEN Group",
  location: "Lagos, Nigeria",
  address: "Plot 1197A, 423 Cavera Road, 6th Avenue, Festac Town, Lagos, Nigeria",
  emails: {
    personal: "Talk2pat0791@gmail.com",
    work: "Patrick.chukwumba@heineken.com",
  },
  phones: {
    primary: { display: "+234 706 8764902", href: "tel:+2347068764902" },
    secondary: { display: "+234 902 0568338", href: "tel:+2349020568338" },
  },
  cvUrl: "/cv.pdf",
  summary:
    "Procurement and Finance Executive with 22+ years of experience spanning Strategic Sourcing, Category Management, Contract Management, Supply Chain Operations, Treasury, Financial Control, and Tax Management within Nigerian Breweries Plc, part of the HEINEKEN Group. Proven track record of managing portfolios exceeding €450 million, leading large supplier ecosystems, delivering sustainable cost savings, mitigating supply risks, and driving business transformation across multiple categories.",
  profileStatement:
    "Experienced in managing high-value spend portfolios, supplier ecosystems, strategic sourcing, contract management, risk mitigation, and cross-functional stakeholder engagement. Combines commercial procurement expertise with a strong finance foundation to support sustainable value creation, governance, and organizational growth.",
} as const

export const stats = [
  {
    value: 22,
    prefix: "",
    suffix: "+",
    label: "Years Experience",
    description:
      "Procurement, supply chain, treasury, financial control and tax — all within the HEINEKEN Group.",
  },
  {
    value: 450,
    prefix: "€",
    suffix: "M+",
    label: "Annual Spend",
    description:
      "Spend portfolio under management across six procurement categories.",
  },
  {
    value: 1100,
    prefix: "",
    suffix: "+",
    label: "Suppliers",
    description:
      "Supplier ecosystem managed for continuity and strategic partnership development.",
  },
  {
    value: 7,
    prefix: "",
    suffix: "",
    label: "Direct Reports",
    description:
      "Procurement and contract management professionals led and developed.",
  },
] as const

export const coreCompetencies = [
  "Strategic Sourcing & Category Management",
  "Contract & Commercial Management",
  "Supplier Relationship Management (SRM)",
  "Cost Optimization & Value Creation",
  "Supply Chain Risk Management",
  "Spend Analytics",
  "Negotiation & Tender Management",
  "Stakeholder Engagement",
  "Leadership & Team Development",
  "Financial Planning & Analysis",
  "Governance & Compliance",
] as const

export const careerHighlights = [
  "Manage procurement spend portfolio exceeding €450 million annually across Production Materials, Logistics, Warehousing, Energy, MRO, and Capital Projects.",
  "Manage supplier ecosystem of over 1,100 suppliers, driving supply continuity and strategic partnership development.",
  "Successfully led procurement and contract management teams of up to 7 direct reports, supporting business objectives across multiple categories.",
  "Delivered uninterrupted supply continuity across critical Raw and Packaging Material categories in highly volatile operating environments.",
  "Partnered with HEINEKEN Global Procurement teams to execute global sourcing strategies while ensuring local business requirements are achieved.",
  "Pioneer member of the Fixed & Variable Truck Scheme that enhanced fleet availability and distribution capability.",
] as const

export type Role = {
  title: string
  company: string
  location: string
  period: string
  duration: string
  isCurrent?: boolean
  points: readonly string[]
}

export const roles: readonly Role[] = [
  {
    title: "Supply Chain Category Manager",
    company: "Nigerian Breweries Plc",
    location: "Lagos Headquarters",
    period: "November 2021 — Present",
    duration: "4+ years",
    isCurrent: true,
    points: [
      "Manage Strategic Sourcing and Category Management activities across €450M+ annual spend.",
      "Supplier portfolio of over 1,100 suppliers covering Production Materials, Logistics, Energy, MRO, Warehousing, and Capital Projects.",
      "Develop and implement sourcing strategies that deliver cost optimization, supply continuity, and risk mitigation.",
      "Ensure compliance with procurement governance, contracting standards, and Source-to-Pay policies.",
      "Lead procurement capability development and mentor category teams.",
    ],
  },
  {
    title: "Manager, Contract Management",
    company: "Nigerian Breweries Plc",
    location: "Lagos Headquarters",
    period: "October 2018 — October 2021",
    duration: "3 years 11 months",
    points: [
      "Led end-to-end contract lifecycle management across multiple procurement categories.",
      "Managed supplier performance, contract governance, and stakeholder engagement for over 1,000 suppliers.",
      "Served as key interface between local operations and HEINEKEN Global Procurement.",
      "Led and developed a team of seven procurement professionals.",
    ],
  },
  {
    title: "Category Buyer, Supply Chain Services & Projects",
    company: "Nigerian Breweries Plc",
    location: "Lagos Headquarters",
    period: "August 2017 — October 2018",
    duration: "1 year 2 months",
    points: [
      "Managed procurement for Capital Investment Projects, Logistics, and Warehousing categories.",
      "Partnered with Supply Chain Project Teams to deliver investment projects across multiple brewery locations.",
      "Led sourcing, contracting, and supplier management activities to support project execution and operational efficiency.",
      "Pioneer member of the Fixed & Variable Truck Scheme, supporting fleet availability and distribution continuity.",
      "Collaborated with Distribution teams to ensure uninterrupted truck operations and product delivery.",
    ],
  },
  {
    title: "Contract Manager, Production Materials",
    company: "Nigerian Breweries Plc",
    location: "Lagos Headquarters",
    period: "March 2015 — July 2017",
    duration: "2 years 4 months",
    points: [
      "Ensured uninterrupted supply of production materials through effective stakeholder management and proactive resolution of supply chain risks.",
      "Served as the primary interface with HEINEKEN Global Category Buyers, enabling seamless execution of global contracts and consistent material availability.",
      "Strengthened collaboration between suppliers, procurement, and operational teams, improving contract compliance, supplier performance, and service delivery.",
      "Provided Global and Local Buyers with OpCo-specific contract requirements and commercial information to support contracting and SLA implementation.",
    ],
  },
  {
    title: "Category Buyer, Production Materials",
    company: "Nigerian Breweries Plc",
    location: "Lagos Headquarters",
    period: "May 2013 — February 2015",
    duration: "2 years 4 months",
    points: [
      "Managed sourcing and category strategies for all locally sourced production materials, including raw and packaging materials, ensuring uninterrupted supply to brewery operations.",
      "Led tendering, supplier selection, and commercial negotiations, delivering cost savings while meeting quality and service requirements.",
      "Identified and executed value creation opportunities across production material categories, improving procurement efficiency and supplier performance.",
      "Collaborated with cross-functional teams to ensure continuity of production through effective demand planning, contract management, and supplier performance monitoring.",
    ],
  },
  {
    title: "Category Buyer, Business Services",
    company: "Nigerian Breweries Plc",
    location: "Lagos Headquarters",
    period: "October 2012 — April 2013",
    duration: "6 months",
    points: [
      "Led sourcing and category management for Business Services & Commerce categories, ensuring uninterrupted supply and service delivery while achieving cost, quality, and compliance objectives.",
      "Leveraged a unique combination of procurement and finance expertise to optimize commercial decisions, strengthen business cases, and deliver sustainable savings.",
      "Combined procurement and financial expertise to drive commercial value, strengthen governance, and support informed decision-making.",
    ],
  },
] as const

/** Finance foundation, 2004–2012 — shown as a compact ledger rather than full cards. */
export const earlierRoles = [
  {
    title: "Bank Operations Manager",
    location: "Lagos Headquarters",
    period: "Mar 2010 — Sep 2012",
    point:
      "Managed treasury operations, liquidity planning, banking relationships, and working capital optimization.",
  },
  {
    title: "Tax & Consolidation Manager",
    location: "Lagos Headquarters",
    period: "Aug 2008 — Feb 2010",
    point:
      "Led financial consolidations, tax compliance, statutory reporting, and audit coordination.",
  },
  {
    title: "Business Unit Controller",
    location: "South Business Unit",
    period: "Jun 2007 — Jul 2008",
    point:
      "Drove budgeting, financial planning, cost control, and performance management initiatives.",
  },
  {
    title: "Financial Accountant",
    location: "Ibadan Brewery",
    period: "Dec 2006 — May 2007",
    point: "Managed financial reporting, reconciliations, and governance processes.",
  },
  {
    title: "Inventory Accountant",
    location: "Ibadan Brewery",
    period: "Jul 2004 — Nov 2006",
    point:
      "Managed inventory controls, reconciliations, payroll accounting, and governance processes.",
  },
] as const

export const technicalSkills = [
  {
    group: "Procurement",
    skills: [
      "Strategic Procurement",
      "Category Management",
      "Contract Management",
      "Supplier Relationship Management",
      "Commercial Negotiation",
    ],
  },
  {
    group: "Supply Chain",
    skills: [
      "Supply Chain Management",
      "Risk Management",
      "Procurement Governance",
      "Business Partnering",
    ],
  },
  {
    group: "Financial",
    skills: [
      "Financial Analysis",
      "Spend Analytics",
      "Financial Planning & Analysis",
      "Budgeting",
    ],
  },
] as const

export const careerSnapshot = [
  {
    area: "Procurement & Category Management",
    detail:
      "Strategic sourcing, tendering, supplier selection, category strategy, commercial negotiation.",
  },
  {
    area: "Contract Management",
    detail:
      "End-to-end contract lifecycle management, governance, supplier performance, SLA implementation.",
  },
  {
    area: "Supply Chain Operations",
    detail:
      "Production materials, logistics, warehousing, energy, MRO, investment projects and supply continuity.",
  },
  {
    area: "Finance & Control",
    detail:
      "Treasury, liquidity, working capital, budgeting, financial control, tax, consolidation and reporting.",
  },
  {
    area: "Leadership",
    detail:
      "Team development, capability building, stakeholder engagement and supplier partnership management.",
  },
] as const

export const education = [
  {
    abbr: "MBA",
    title: "Master of Business Administration",
    institution: "University of Lagos",
    location: "Lagos, Nigeria",
  },
] as const

export const certifications = [
  {
    abbr: "FCA",
    title: "Fellow",
    institution: "Institute of Chartered Accountants of Nigeria",
  },
  {
    abbr: "ACTI",
    title: "Associate",
    institution: "Chartered Institute of Taxation of Nigeria",
  },
  {
    abbr: "ICM",
    title: "Associate",
    institution: "Institute of Cost Management of Nigeria",
  },
] as const

/** Categories under management, used in the hero marquee and the about panel. */
export const categories = [
  "Production Materials",
  "Logistics",
  "Warehousing",
  "Energy",
  "MRO",
  "Capital Projects",
] as const
