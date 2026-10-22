"use client"

import { SignIn, SignOutButton } from "@clerk/nextjs"
import { Authenticated, AuthLoading, Unauthenticated, useQuery } from "convex/react"
import { Loader2, ShieldAlert } from "lucide-react"
import { api } from "@/convex/_generated/api"
import { Brand } from "@/components/dashboard/brand"
import { Editor } from "@/components/dashboard/editor"
import { Button } from "@/components/ui/button"

/**
 * Clerk handles signing in; Convex decides who may edit (see `convex/auth.ts`)
 * and enforces it on every save — this screen only mirrors that decision.
 */
export function Dashboard() {
  return (
    <>
      <AuthLoading>
        <Centered>
          <Loader2 className="size-6 animate-spin text-gold" />
        </Centered>
      </AuthLoading>
      <Unauthenticated>
        <Centered>
          <div className="flex flex-col items-center gap-6">
            <Brand />
            {/* Editors are invited, not self-registered — hide the "Sign up" link. */}
            <SignIn routing="hash" appearance={{ elements: { footerAction: { display: "none" } } }} />
          </div>
        </Centered>
      </Unauthenticated>
      <Authenticated>
        <AdminGate />
      </Authenticated>
    </>
  )
}

function AdminGate() {
  const viewer = useQuery(api.content.viewer)

  if (viewer === undefined) {
    return (
      <Centered>
        <Loader2 className="size-6 animate-spin text-gold" />
      </Centered>
    )
  }

  if (!viewer?.isAdmin) {
    return (
      <Centered>
        <div className="surface-card flex w-full max-w-md flex-col items-center gap-4 rounded-2xl p-6 text-center sm:p-8">
          <ShieldAlert className="size-8 text-gold" />
          <h1 className="font-display text-xl">This account can&apos;t edit the site</h1>
          <p className="text-sm leading-relaxed text-muted-foreground">
            You&apos;re signed in as <strong className="text-foreground">{viewer?.email ?? "an account without an email"}</strong>.
            Ask the site administrator to add this email to the list of editors, or sign in with a different account.
          </p>
          <SignOutButton>
            <Button variant="outline" size="lg" className="mt-2 h-11 px-4 sm:h-9">
              Sign out
            </Button>
          </SignOutButton>
        </div>
      </Centered>
    )
  }

  return <Editor />
}

function Centered({ children }: { children: React.ReactNode }) {
  return <main className="grid min-h-svh place-items-center px-4 py-12">{children}</main>
}
