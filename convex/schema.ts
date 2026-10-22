import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"
import { sectionKeys } from "../lib/content-schema"

export const sectionValidator = v.union(...sectionKeys.map((key) => v.literal(key)))

export default defineSchema({
  /** One document per site section; `data` is validated against `lib/content-schema.ts` on save. */
  content: defineTable({
    section: sectionValidator,
    data: v.any(),
    updatedAt: v.number(),
    updatedBy: v.string(),
  }).index("by_section", ["section"]),
})
