import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://patrickchukwumba.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Patrick Chukwumba Okorie | Supply Chain Category Manager – Nigerian Breweries Plc",
    template: "%s | Patrick Chukwumba Okorie",
  },

  description:
    "Patrick Chukwumba Okorie is a Supply Chain Category Manager at Nigerian Breweries Plc (Heineken Group) with 12+ years of procurement and finance experience. Managing EUR 700m+ spend across Production Materials, Logistics, Energy, Investment Projects, MRO and Regulatory categories. Fellow ICAN. Lagos, Nigeria.",

  keywords: [
    "Patrick Chukwumba Okorie",
    "Patrick Okorie",
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
      "Supply Chain Category Manager at Nigerian Breweries Plc (Heineken Group). 12+ years of procurement & finance expertise. Managing EUR 700m+ spend. Fellow ICAN. Lagos, Nigeria.",
    firstName: "Patrick",
    lastName: "Chukwumba Okorie",
    username: "patrickchukwumba",
    gender: "male",
  },

  twitter: {
    card: "summary_large_image",
    title: "Patrick Chukwumba Okorie | Supply Chain Category Manager",
    description:
      "Supply Chain Category Manager at Nigerian Breweries Plc (Heineken Group). 12+ years procurement & finance expertise. EUR 700m+ spend under management.",
    creator: "@patrickchukwumba",
  },

  category: "professional profile",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Patrick Chukwumba Okorie",
  alternateName: "Patrick Okorie",
  url: siteUrl,
  email: ["Talk2pat0791@gmail.com", "Patrick.chukwumbw@heineken.com"],
  telephone: ["+2347068764902", "+2349020568338"],
  address: {
    "@type": "PostalAddress",
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
      name: "Fellow, Institute of Chartered Accountants of Nigeria (ICAN)",
    },
    {
      "@type": "EducationalOccupationalCredential",
      name: "Associate, Chartered Institute of Taxation of Nigeria (CITN)",
    },
  ],
  knowsAbout: [
    "Supply Chain Management",
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
      className={`${nunito.variable} h-full antialiased`}
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
