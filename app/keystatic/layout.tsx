import type { Metadata } from "next"
import KeystaticApp from "./keystatic"

export const metadata: Metadata = {
  title: "Edit website",
  robots: { index: false, follow: false },
}

/** Root layout for the editing dashboard — kept apart from the site's styles and theme. */
export default function KeystaticLayout() {
  return (
    <html lang="en">
      <body>
        <KeystaticApp />
      </body>
    </html>
  )
}
