"use client"

import { useEffect } from "react"
import { ThemeProvider } from "next-themes"
import { createSmoothScroll } from "@/lib/smooth-scroll"

function SmoothScroll() {
  useEffect(() => {
    const engine = createSmoothScroll()
    return () => engine.destroy()
  }, [])

  return null
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <SmoothScroll />
      {children}
    </ThemeProvider>
  )
}
