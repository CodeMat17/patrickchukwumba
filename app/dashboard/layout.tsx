import type { Metadata } from "next"
import { Inter, Nunito } from "next/font/google"
import { ClerkProvider } from "@clerk/nextjs"
import { ThemeProvider } from "next-themes"
import "../globals.css"
import { ConvexClientProvider } from "@/components/dashboard/convex-client-provider"

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" })
const nunito = Nunito({ variable: "--font-display", subsets: ["latin"], display: "swap" })

export const metadata: Metadata = {
  title: "Edit website",
  robots: { index: false, follow: false },
}

/** Root layout for the editing dashboard — kept apart from the public site's static shell. */
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${nunito.variable} h-full`} suppressHydrationWarning>
      <body className="min-h-full bg-background text-foreground antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <ClerkProvider>
            <ConvexClientProvider>{children}</ConvexClientProvider>
          </ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
