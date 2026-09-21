import type { Metadata, Viewport } from "next";
import { Inter, Nunito } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const nunito = Nunito({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://patrickchukwumba.com";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbfaf8" },
    { media: "(prefers-color-scheme: dark)", color: "#14161d" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Patrick Chukwumba Okorie | Supply Chain Category Manager – Nigerian Breweries Plc",
    template: "%s | Patrick Chukwumba Okorie",
  },

  description:
    "Patrick Chukwumba Okorie is a Procurement & Finance Executive and Supply Chain Category Manager at Nigerian Breweries Plc (HEINEKEN Group) with 22+ years of experience across strategic sourcing, category management, contract management, treasury, financial control and tax. Managing €450M+ annual spend and 1,100+ suppliers across Production Materials, Logistics, Warehousing, Energy, MRO and Capital Projects. Fellow ICAN (FCA). Lagos, Nigeria.",

  keywords: [
    "Patrick Chukwumba Okorie",
    "Patrick Okorie",
    "Chukwumba Patrick Okorie",
    "Procurement & Finance Executive",
    "Supply Chain Category Manager",
    "Nigerian Breweries Plc",
    "Heineken Nigeria",
    "Procurement Manager Nigeria",
    "Category Manager Lagos",
    "Supply Chain Nigeria",
    "FMCG Procurement",
    "Production Materials Procurement",
    "Logistics Category Manager",
    "Contract Management",
    "Procurement Strategy",
    "Supplier Management Nigeria",
    "ICAN Fellow",
    "Chartered Accountant Nigeria",
    "Strategic Sourcing",
    "Supplier Relationship Management",
    "Treasury & Financial Control",
    "Talk2pat0791",
    "Heineken Supply Chain",
    "Category Buyer Nigeria",
    "Procurement Leader Africa",
  ],

  authors: [{ name: "Patrick Chukwumba Okorie", url: siteUrl }],
  creator: "Patrick Chukwumba Okorie",
  publisher: "Patrick Chukwumba Okorie",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },

  alternates: {
    canonical: siteUrl,
  },

  openGraph: {
    type: "profile",
    locale: "en_NG",
    url: siteUrl,
    siteName: "Patrick Chukwumba Okorie",
    title: "Patrick Chukwumba Okorie | Supply Chain Category Manager – Nigerian Breweries Plc",
    description:
      "Procurement & Finance Executive · Supply Chain Category Manager at Nigerian Breweries Plc (HEINEKEN Group). 22+ years of procurement & finance expertise. €450M+ annual spend, 1,100+ suppliers. Fellow ICAN. Lagos, Nigeria.",
    firstName: "Patrick",
    lastName: "Chukwumba Okorie",
    username: "patrickchukwumba",
    gender: "male",
  },

  twitter: {
    card: "summary_large_image",
    title: "Patrick Chukwumba Okorie | Supply Chain Category Manager",
    description:
      "Procurement & Finance Executive at Nigerian Breweries Plc (HEINEKEN Group). 22+ years procurement & finance expertise. €450M+ annual spend, 1,100+ suppliers.",
    creator: "@patrickchukwumba",
  },

  category: "professional profile",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Patrick Chukwumba Okorie",
  alternateName: ["Patrick Okorie", "Chukwumba Patrick Okorie"],
  description:
    "Procurement & Finance Executive with 22+ years at Nigerian Breweries Plc (HEINEKEN Group), managing €450M+ annual spend and 1,100+ suppliers.",
  url: siteUrl,
  image: `${siteUrl}/opengraph-image.jpg`,
  email: ["Talk2pat0791@gmail.com", "Patrick.chukwumba@heineken.com"],
  telephone: ["+2347068764902", "+2349020568338"],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Plot 1197A, 423 Cavera Road, 6th Avenue, Festac Town",
    addressLocality: "Lagos",
    addressCountry: "NG",
  },
  jobTitle: "Supply Chain Category Manager",
  worksFor: {
    "@type": "Organization",
    name: "Nigerian Breweries Plc",
    url: "https://www.nbplc.com",
    parentOrganization: {
      "@type": "Organization",
      name: "Heineken",
      url: "https://www.heineken.com",
    },
  },
  alumniOf: [
    {
      "@type": "EducationalOrganization",
      name: "University of Lagos",
      description: "Masters in Business Administration (MBA)",
    },
  ],
  hasCredential: [
    {
      "@type": "EducationalOccupationalCredential",
      name: "Fellow, Institute of Chartered Accountants of Nigeria (FCA)",
    },
    {
      "@type": "EducationalOccupationalCredential",
      name: "Associate, Chartered Institute of Taxation of Nigeria (ACTI)",
    },
    {
      "@type": "EducationalOccupationalCredential",
      name: "Associate, Institute of Cost Management of Nigeria (ICM)",
    },
  ],
  knowsAbout: [
    "Supply Chain Management",
    "Strategic Sourcing",
    "Supplier Relationship Management",
    "Spend Analytics",
    "Supply Chain Risk Management",
    "Treasury",
    "Tax Management",
    "Warehousing",
    "Procurement Strategy",
    "Category Management",
    "Contract Management",
    "Supplier Performance Management",
    "Logistics",
    "Production Materials",
    "Energy Procurement",
    "Investment Projects",
    "MRO",
    "Financial Management",
    "FMCG",
  ],
  sameAs: [siteUrl],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${nunito.variable} h-full`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
