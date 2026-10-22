import type { AuthConfig } from "convex/server"

/**
 * Clerk signs people in; Convex verifies Clerk's token on every request.
 * Set CLERK_JWT_ISSUER_DOMAIN in the Convex dashboard (Settings → Environment
 * Variables) to the Clerk Frontend API URL.
 */
export default {
  providers: [
    {
      domain: process.env.CLERK_JWT_ISSUER_DOMAIN!,
      applicationID: "convex",
    },
  ],
} satisfies AuthConfig
