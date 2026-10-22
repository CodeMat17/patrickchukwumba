"use client"

import { createContext, useContext } from "react"
import type { Content } from "@/lib/cv"

const ContentContext = createContext<Content | null>(null)

/** Hands the content loaded on the server (`lib/content.ts`) to the client sections. */
export function ContentProvider({ value, children }: { value: Content; children: React.ReactNode }) {
  return <ContentContext value={value}>{children}</ContentContext>
}

export function useContent() {
  const content = useContext(ContentContext)
  if (!content) throw new Error("useContent must be used inside <ContentProvider>")
  return content
}
