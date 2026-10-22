"use client"

import { Fragment, useEffect, useState } from "react"
import { UserButton } from "@clerk/nextjs"
import { useMutation, useQuery } from "convex/react"
import { ConvexError } from "convex/values"
import type { FunctionArgs } from "convex/server"
import { Check, ExternalLink, Loader2 } from "lucide-react"
import { api } from "@/convex/_generated/api"
import { normalize, sectionKeys, sections, type SectionKey } from "@/lib/content-schema"
import { defaults } from "@/lib/cv"
import { cn } from "@/lib/utils"
import { refreshSite } from "@/app/dashboard/actions"
import { Brand } from "@/components/dashboard/brand"
import { FieldList } from "@/components/dashboard/fields"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type Draft = Record<string, unknown>

const groups = [...new Set(sectionKeys.map((key) => sections[key].group))]

export function Editor() {
  const saved = useQuery(api.content.get)
  const save = useMutation(api.content.save)

  const [active, setActive] = useState<SectionKey>("profile")
  const [drafts, setDrafts] = useState<Partial<Record<SectionKey, Draft>>>({})
  const [status, setStatus] = useState<
    { kind: "saving" } | { kind: "saved" } | { kind: "error"; message: string } | null
  >(null)

  /** What's live for a section: the saved version, or the original text if it was never saved. */
  const baseline = (key: SectionKey) =>
    normalize(sections[key].fields, saved?.[key] ?? defaults[key]) as Draft
  const isDirty = (key: SectionKey) =>
    drafts[key] !== undefined && JSON.stringify(drafts[key]) !== JSON.stringify(baseline(key))
  const anyDirty = saved !== undefined && sectionKeys.some(isDirty)

  useEffect(() => {
    if (!anyDirty) return
    const warn = (e: BeforeUnloadEvent) => e.preventDefault()
    window.addEventListener("beforeunload", warn)
    return () => window.removeEventListener("beforeunload", warn)
  }, [anyDirty])

  if (saved === undefined) {
    return (
      <main className="grid min-h-svh place-items-center">
        <Loader2 className="size-6 animate-spin text-gold" />
      </main>
    )
  }

  const section = sections[active]
  const value = drafts[active] ?? baseline(active)
  const dirty = isDirty(active)

  async function onSave() {
    setStatus({ kind: "saving" })
    try {
      await save({ update: { section: active, data: value } as FunctionArgs<typeof api.content.save>["update"] })
      setDrafts((d) => ({ ...d, [active]: undefined }))
      await refreshSite()
      setStatus({ kind: "saved" })
    } catch (error) {
      const message =
        error instanceof ConvexError ? String(error.data) : "Something went wrong while saving. Please try again."
      setStatus({ kind: "error", message })
    }
  }

  function choose(key: SectionKey) {
    setActive(key)
    setStatus(null)
    window.scrollTo({ top: 0 })
  }

  return (
    <div className="flex min-h-svh flex-col">
      <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-3 px-4 sm:h-16 sm:px-6">
          <Brand />
          <div className="flex items-center gap-2 sm:gap-3">
            <Button
              variant="outline"
              size="lg"
              nativeButton={false}
              render={<a href="/" target="_blank" rel="noreferrer" aria-label="View site" />}
              className="max-sm:size-9 max-sm:px-0"
            >
              <span className="hidden sm:inline">View site</span>
              <ExternalLink className="size-3.5" />
            </Button>
            <UserButton />
          </div>
        </div>
      </header>

      {/* Section picker on phones and tablets: stays reachable while scrolling a long form */}
      <div className="sticky top-14 z-20 border-b border-border bg-background/90 px-4 py-3 backdrop-blur sm:top-16 sm:px-6 lg:hidden">
        <Select
          value={active}
          onValueChange={(key) => key && choose(key as SectionKey)}
          items={sectionKeys.map((key) => ({ value: key, label: sections[key].label }))}
        >
          <SelectTrigger aria-label="Section" className="h-11 w-full text-base sm:text-sm">
            <SelectValue>
              {(key: SectionKey) => (
                <>
                  <span className="truncate">{sections[key].label}</span>
                  {anyDirty && (
                    <span className="ml-auto text-xs text-gold">
                      {sectionKeys.filter(isDirty).length} unsaved
                    </span>
                  )}
                </>
              )}
            </SelectValue>
          </SelectTrigger>
          <SelectContent alignItemWithTrigger={false} className="max-h-[min(var(--available-height),26rem)]">
            {groups.map((group, i) => (
              <Fragment key={group}>
                {i > 0 && <SelectSeparator />}
                <SelectGroup>
                  <SelectLabel>{group}</SelectLabel>
                  {sectionKeys
                    .filter((key) => sections[key].group === group)
                    .map((key) => (
                      <SelectItem key={key} value={key} className="py-2.5 text-base sm:py-1.5 sm:text-sm">
                        {sections[key].label}
                        {isDirty(key) && (
                          <span className="size-2 shrink-0 rounded-full bg-gold" aria-label="Unsaved changes" />
                        )}
                      </SelectItem>
                    ))}
                </SelectGroup>
              </Fragment>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 px-4 py-6 sm:px-6 lg:flex-row lg:gap-10 lg:py-10">
        <nav className="hidden w-64 shrink-0 lg:block">
          <div className="sticky top-26 flex flex-col gap-6">
            {groups.map((group) => (
              <div key={group}>
                <p className="eyebrow px-3">{group}</p>
                <ul className="mt-2 flex flex-col gap-0.5">
                  {sectionKeys
                    .filter((key) => sections[key].group === group)
                    .map((key) => (
                      <li key={key}>
                        <button
                          type="button"
                          onClick={() => choose(key)}
                          className={cn(
                            "flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors",
                            key === active
                              ? "bg-muted font-medium text-foreground"
                              : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                          )}
                        >
                          {sections[key].label}
                          {isDirty(key) && (
                            <span className="size-2 shrink-0 rounded-full bg-gold" aria-label="Unsaved changes" />
                          )}
                        </button>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </nav>

        <main className="min-w-0 flex-1 pb-36 sm:pb-28">
          <h1 className="font-display text-2xl sm:text-3xl">{section.label}</h1>
          {!saved[active] && (
            <p className="mt-2 text-sm text-muted-foreground">
              Showing the site&apos;s original text. Your first save stores it here.
            </p>
          )}

          <div className="mt-8">
            <FieldList
              fields={section.fields}
              value={value}
              onChange={(next) => {
                setDrafts((d) => ({ ...d, [active]: next }))
                setStatus(null)
              }}
            />
          </div>
        </main>
      </div>

      {/* Save bar */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/90 pb-[env(safe-area-inset-bottom)] backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-3 sm:h-16 sm:flex-row sm:items-center sm:gap-3 sm:px-6 sm:py-0">
          <p
            className={cn(
              "min-w-0 text-[0.8rem] sm:mr-auto sm:truncate sm:text-sm",
              status?.kind === "error" ? "text-destructive" : "text-muted-foreground"
            )}
            role="status"
          >
            {status?.kind === "error"
              ? status.message
              : status?.kind === "saved"
                ? "Saved — the site is updated."
                : dirty
                  ? "You have unsaved changes."
                  : "All changes saved."}
          </p>
          <div className="flex items-center gap-2 sm:gap-3">
            {dirty && (
              <Button
                variant="ghost"
                size="lg"
                onClick={() => {
                  setDrafts((d) => ({ ...d, [active]: undefined }))
                  setStatus(null)
                }}
                disabled={status?.kind === "saving"}
                className="h-11 flex-1 px-3 text-muted-foreground sm:h-9 sm:flex-none"
              >
                Discard
              </Button>
            )}
            <Button
              size="lg"
              onClick={onSave}
              disabled={(!dirty && !!saved[active]) || status?.kind === "saving"}
              className="h-11 flex-1 gradient-gold px-4 font-semibold text-[oklch(0.16_0.02_265)] shadow-soft disabled:opacity-40 sm:h-9 sm:flex-none"
            >
              {status?.kind === "saving" ? (
                <Loader2 className="size-4 animate-spin" />
              ) : status?.kind === "saved" && !dirty ? (
                <Check className="size-4" />
              ) : null}
              {status?.kind === "saving" ? "Saving…" : "Save"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
