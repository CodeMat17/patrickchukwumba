import type { Metadata, Viewport } from "next";
import { Inter, Nunito } from "next/font/google";
import "../globals.css";
import { Providers } from "@/components/providers";
import { ContentProvider } from "@/components/content-provider";
import { getContent } from "@/lib/content";
import type { Content } from "@/lib/cv";

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

export async function generateMetadata(): Promise<Metadata> {
  const { profile, site } = await getContent();
  const [firstName, ...otherNames] = profile.displayName.split(" ");

  return {
    metadataBase: new URL(siteUrl),

    title: {
      default: site.searchTitle,
      template: `%s | ${profile.displayName}`,
    },

    description: site.searchDescription,

    keywords: site.keywords,

    authors: [{ name: profile.displayName, url: siteUrl }],
    creator: profile.displayName,
    publisher: profile.displayName,

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
      siteName: profile.displayName,
      title: site.searchTitle,
      description: site.shareDescription,
      firstName,
      lastName: otherNames.join(" "),
      username: "patrickchukwumba",
      gender: "male",
    },

    twitter: {
      card: "summary_large_image",
      title: site.shareTitle,
      description: site.shareDescription,
      creator: "@patrickchukwumba",
    },

    category: "professional profile",
  };
}

const personJsonLd = ({ profile, site, education, certifications }: Content) => ({
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.displayName,
  alternateName: profile.shortName,
  description: site.shareDescription,
  url: siteUrl,
  image: new URL(profile.photoUrl ?? "/opengraph-image.jpg", siteUrl).href,
  email: [profile.emails.personal, profile.emails.work].filter(Boolean),
  telephone: [profile.phones.primary.href, profile.phones.secondary.href]
    .filter((href) => href !== "tel:")
    .map((href) => href.replace("tel:", "")),
  address: {
    "@type": "PostalAddress",
    streetAddress: profile.address,
    addressLocality: profile.location.split(",")[0].trim(),
    addressCountry: "NG",
  },
  jobTitle: profile.currentRole,
  worksFor: {
    "@type": "Organization",
    name: profile.company,
    url: profile.companyWebsite,
    parentOrganization: {
      "@type": "Organization",
      name: profile.group,
      url: profile.groupWebsite,
    },
  },
  alumniOf: education.map((item) => ({
    "@type": "EducationalOrganization",
    name: item.institution,
    description: `${item.title} (${item.abbr})`,
  })),
  hasCredential: certifications.map((cert) => ({
    "@type": "EducationalOccupationalCredential",
    name: `${cert.title}, ${cert.institution} (${cert.abbr})`,
  })),
  knowsAbout: site.expertiseTopics,
  sameAs: [siteUrl],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const content = await getContent();
  const jsonLd = personJsonLd(content);

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
        <Providers>
          <ContentProvider value={content}>{children}</ContentProvider>
        </Providers>
      </body>
    </html>
  );
}
