import "server-only"

import { cache } from "react"
import { unstable_cache } from "next/cache"
import { ConvexHttpClient } from "convex/browser"
import { api } from "@/convex/_generated/api"
import { buildContent, type RawContent } from "@/lib/cv"

/** Cache tag cleared by the dashboard after every save (see `app/dashboard/actions.ts`). */
export const CONTENT_TAG = "content"

/** Saved content from Convex, cached between requests so the public site stays fast. */
const fetchSaved = unstable_cache(
  async () => {
    const url = process.env.NEXT_PUBLIC_CONVEX_URL
    if (!url) return {}
    return (await new ConvexHttpClient(url).query(api.content.get, {})) as Partial<RawContent>
  },
  ["site-content"],
  { tags: [CONTENT_TAG], revalidate: 3600 }
)

/**
 * Content for the public site. Any section not saved yet — or everything, if
 * Convex can't be reached — falls back to the defaults in `content/*.json`.
 */
export const getContent = cache(async () => {
  try {
    return buildContent(await fetchSaved())
  } catch (error) {
    console.error("Could not load content from Convex; using defaults.", error)
    return buildContent({})
  }
})
