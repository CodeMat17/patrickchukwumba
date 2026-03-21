"use client"

import Image from "next/image"
import { useState } from "react"
import { Camera } from "lucide-react"

/**
 * Renders the profile photo from /public/profile.jpg.
 * Falls back to an initials placeholder if the image is missing.
 * To add a real photo: place a file named `profile.jpg` inside the `public/` folder.
 */
export function ProfilePhoto({ className = "" }: { className?: string }) {
  const [hasError, setHasError] = useState(false)

  if (!hasError) {
    return (
      <div className={`relative overflow-hidden rounded-2xl ${className}`}>
        <Image
          src="/profile.jpg"
          alt="Patrick Chukwumba Okorie"
          fill
          className="object-cover object-top"
          onError={() => setHasError(true)}
          priority
          sizes="(max-width: 768px) 100vw, 400px"
        />
      </div>
    )
  }

  /* ── Placeholder ── */
  return (
    <div
      className={`relative overflow-hidden rounded-2xl flex flex-col items-center justify-center gap-3 ${className}`}
      style={{
        background:
          "linear-gradient(145deg, oklch(0.20 0.05 255) 0%, oklch(0.14 0.04 265) 60%, oklch(0.18 0.06 255) 100%)",
      }}
    >
      {/* Decorative rings */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 35% 35%, var(--gold) 0%, transparent 55%)",
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-48 h-48 rounded-full opacity-5 translate-x-1/4 translate-y-1/4"
        style={{ background: "var(--gold)" }}
      />

      {/* Avatar initials circle */}
      <div
        className="relative z-10 w-24 h-24 rounded-full flex items-center justify-center text-3xl font-bold shadow-xl ring-4"
        style={{
          background: "linear-gradient(135deg, oklch(0.72 0.15 82), oklch(0.62 0.18 65))",
          color: "oklch(0.13 0.04 255)",
          boxShadow: "0 0 0 4px oklch(0.72 0.15 82 / 30%)",
        }}
      >
        PCO
      </div>

      {/* Name block */}
      <div className="relative z-10 text-center px-4">
        <p className="text-white font-semibold text-sm leading-snug">Patrick Chukwumba Okorie</p>
        <p className="text-white/50 text-xs mt-0.5">Supply Chain Category Manager</p>
        <p className="text-white/35 text-xs">Nigerian Breweries Plc</p>
      </div>

      {/* Photo hint badge */}
      <div
        className="relative z-10 mt-2 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs"
        style={{
          background: "oklch(1 0 0 / 8%)",
          color: "oklch(1 0 0 / 45%)",
          border: "1px dashed oklch(1 0 0 / 15%)",
        }}
      >
        <Camera className="size-3" />
        Add photo → public/profile.jpg
      </div>
    </div>
  )
}
