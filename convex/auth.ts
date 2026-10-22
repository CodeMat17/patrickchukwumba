import { ConvexError } from "convex/values"
import type { QueryCtx } from "./_generated/server"

/**
 * Who may edit the site. Clerk only proves who someone is; this list decides
 * what they can do. Set ADMIN_EMAILS in the Convex dashboard to a
 * comma-separated list, e.g. "talk2pat0791@gmail.com,someone@example.com".
 */
function adminEmails() {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean)
}

export async function getViewer(ctx: QueryCtx) {
  const identity = await ctx.auth.getUserIdentity()
  if (!identity) return null
  const email = identity.email?.toLowerCase() ?? null
  return {
    identity,
    email,
    isAdmin: email !== null && adminEmails().includes(email),
  }
}

export async function requireAdmin(ctx: QueryCtx) {
  const viewer = await getViewer(ctx)
  if (!viewer) throw new ConvexError("Please sign in to edit the site.")
  if (!viewer.isAdmin) throw new ConvexError("This account is not allowed to edit the site.")
  return viewer
}
