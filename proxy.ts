import { clerkMiddleware } from "@clerk/nextjs/server"

/**
 * Clerk reads the session for the dashboard only — the public site stays
 * static and never loads Clerk. Edit permissions are enforced by Convex.
 */
export default clerkMiddleware()

export const config = {
  matcher: ["/dashboard/:path*"],
}
