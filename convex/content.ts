import { ConvexError, v } from "convex/values"
import { mutation, query, type MutationCtx } from "./_generated/server"
import type { Id } from "./_generated/dataModel"
import {
  collectStorageIds,
  fieldsValidator,
  sectionKeys,
  sections,
  type Field,
  type Fields,
  type Json,
  type Upload,
} from "../lib/content-schema"
import { getViewer, requireAdmin } from "./auth"

/** Everything the public site renders. Sections never saved are absent, and the site uses its defaults. */
export const get = query({
  args: {},
  handler: async (ctx) => {
    const docs = await ctx.db.query("content").collect()
    return Object.fromEntries(docs.map((doc) => [doc.section, doc.data])) as Record<string, unknown>
  },
})

/** Lets the dashboard tell a signed-in visitor whether they can edit. */
export const viewer = query({
  args: {},
  handler: async (ctx) => {
    const viewer = await getViewer(ctx)
    return viewer && { email: viewer.email, isAdmin: viewer.isAdmin }
  },
})

/** One variant per section, so Convex rejects any data that doesn't match that section's fields. */
const sectionUpdate = v.union(
  ...sectionKeys.map((key) =>
    v.object({ section: v.literal(key), data: fieldsValidator(sections[key].fields) })
  )
)

export const save = mutation({
  args: { update: sectionUpdate },
  handler: async (ctx, { update }) => {
    const viewer = await requireAdmin(ctx)
    const section = update.section as keyof typeof sections
    const fields: Fields = sections[section].fields

    const data = await resolveUploads(ctx, fields, update.data)
    const existing = await ctx.db
      .query("content")
      .withIndex("by_section", (q) => q.eq("section", section))
      .unique()

    // Delete uploads that this save replaced or removed.
    if (existing) {
      const kept = collectStorageIds(fields, data)
      for (const id of collectStorageIds(fields, existing.data)) {
        if (!kept.has(id)) await ctx.storage.delete(id as Id<"_storage">)
      }
    }

    const doc = { section, data, updatedAt: Date.now(), updatedBy: viewer.email ?? "" }
    if (existing) await ctx.db.replace(existing._id, doc)
    else await ctx.db.insert("content", doc)
  },
})

export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    await requireAdmin(ctx)
    return await ctx.storage.generateUploadUrl()
  },
})

/** Replaces each upload's URL with the one Convex serves for its storage id, never trusting the client's. */
async function resolveUploads(ctx: MutationCtx, fields: Fields, value: Json) {
  const out: Record<string, unknown> = {}
  for (const [key, field] of Object.entries(fields)) {
    out[key] = await resolveField(ctx, field, value[key])
  }
  return out
}

async function resolveField(ctx: MutationCtx, field: Field, value: Json): Promise<unknown> {
  if (field.kind === "image" || field.kind === "file") {
    const upload = value as Upload
    if (!upload?.storageId) return upload
    const url = await ctx.storage.getUrl(upload.storageId as Id<"_storage">)
    if (!url) throw new ConvexError("An uploaded file could not be found. Please upload it again.")
    return { ...upload, url }
  }
  if (field.kind === "object") return resolveUploads(ctx, field.fields, value)
  if (field.kind === "list") {
    return Promise.all((value as unknown[]).map((item) => resolveField(ctx, field.of, item)))
  }
  return value
}
