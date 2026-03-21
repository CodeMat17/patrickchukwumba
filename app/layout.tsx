import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  display: "swap",
});



export const metadata: Metadata = {
  title: "Patrick Chukwumba Okorie | Supply Chain Category Manager",
  description:
    "Supply Chain Category Manager at Nigerian Breweries Plc with 12+ years of procurement and finance experience, managing EUR 700m+ in categories across Production Materials, Logistics, Energy, and more.",
  keywords: [
    "Supply Chain",
    "Category Manager",
    "Nigerian Breweries",
    "Procurement",
    "Heineken",
    "Patrick Chukwumba",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${nunito.variable}  h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
