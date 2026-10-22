"use server"

import { auth } from "@clerk/nextjs/server"
import { revalidatePath, updateTag } from "next/cache"
import { CONTENT_TAG } from "@/lib/content"

/**
 * Clears the public site's cached content after a save. Convex already
 * decided whether the save was allowed; this only asks Next.js to re-render.
 */
export async function refreshSite() {
  const { userId } = await auth()
  if (!userId) throw new Error("Not signed in")
  updateTag(CONTENT_TAG)
  revalidatePath("/", "layout")
}
