This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Editing dashboard

All page content is edited at `/dashboard`. **Clerk** signs people in; **Convex** stores the content and decides who may edit it.

- `lib/content-schema.ts` — every editable field. The dashboard forms and Convex's validation are both generated from it.
- `content/*.json` — default text, used for any section that hasn't been saved in the dashboard yet.
- `convex/auth.ts` — the editor allowlist (`ADMIN_EMAILS`).

### Setup

1. `npx convex dev` — log in and create/link a Convex project. It writes `NEXT_PUBLIC_CONVEX_URL` to `.env.local`.
2. In Clerk, create an application, then enable the Convex integration (Clerk dashboard → Integrations → Convex). Copy the Frontend API URL.
3. Add the Clerk keys to `.env.local` (and to Vercel):
   ```
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
   CLERK_SECRET_KEY=sk_...
   ```
4. On the Convex deployment (dashboard → Settings → Environment Variables, or `npx convex env set`):
   ```
   CLERK_JWT_ISSUER_DOMAIN=https://<your-app>.clerk.accounts.dev
   ADMIN_EMAILS=talk2pat0791@gmail.com
   ```
   `ADMIN_EMAILS` is a comma-separated list. Anyone else who signs in is told they can't edit.
5. For production, deploy Convex with `npx convex deploy` and set `NEXT_PUBLIC_CONVEX_URL` on Vercel to the production deployment URL (or use Convex's Vercel build command).

Saving in the dashboard refreshes the public site immediately; it also re-checks Convex hourly.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
