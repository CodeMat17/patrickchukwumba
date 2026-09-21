"use client"

import Image from "next/image"
import { useState } from "react"
import { Camera } from "lucide-react"
import { profile } from "@/lib/cv"

/**
 * Portrait frame for `/public/profile.jpg`.
 * Falls back to a monogram plate when the file is absent, so the layout never
 * collapses into a broken-image box.
 */
export function ProfilePhoto({ className = "" }: { className?: string }) {
  const [hasError, setHasError] = useState(false)

  return (
    <div className={`group relative ${className}`}>
      {/* Offset brass rule behind the frame */}
      <div
        className="pointer-events-none absolute -bottom-3 -right-3 -z-10 h-full w-full rounded-[1.75rem] border transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:translate-y-1"
        style={{ borderColor: "color-mix(in oklab, var(--gold) 45%, transparent)" }}
        aria-hidden
      />

      <div className="relative h-full w-full overflow-hidden rounded-[1.75rem] border border-hairline bg-[var(--surface-2)] shadow-lift">
        {!hasError ? (
          <Image
            src="/profile.jpg"
            alt={profile.displayName}
            fill
            sizes="(max-width: 1024px) 100vw, 420px"
            className="object-cover object-top transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
            onError={() => setHasError(true)}
          />
        ) : (
          <div className="grain absolute inset-0 flex flex-col items-center justify-center gap-5 gradient-ink">
            <div
              className="grid size-24 place-items-center rounded-full font-display text-2xl"
              style={{
                background: "linear-gradient(135deg, var(--gold-soft), var(--gold-deep))",
                color: "oklch(0.16 0.02 265)",
                boxShadow: "0 0 0 6px oklch(1 0 0 / 6%)",
              }}
            >
              PCO
            </div>

            <div className="px-6 text-center">
              <p className="font-display text-lg text-white">{profile.displayName}</p>
              <p className="mt-1 text-[0.7rem] uppercase tracking-[0.18em] text-white/45">
                {profile.title}
              </p>
            </div>

            <span className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-white/20 px-3 py-1.5 text-[0.68rem] text-white/40">
              <Camera className="size-3" />
              Add public/profile.jpg
            </span>
          </div>
        )}

        {/* Bottom scrim so any overlaid caption stays legible */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3"
          style={{
            background: "linear-gradient(to top, oklch(0.12 0.02 265 / 55%), transparent)",
          }}
          aria-hidden
        />
      </div>
    </div>
  )
}
