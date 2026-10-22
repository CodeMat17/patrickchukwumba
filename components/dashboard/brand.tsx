import { PenLine } from "lucide-react"

export function Brand() {
  return (
    <div className="flex items-center gap-3">
      <span className="grid size-9 place-items-center rounded-xl gradient-gold text-[oklch(0.16_0.02_265)] shadow-soft">
        <PenLine className="size-4" />
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-[0.95rem]">Website dashboard</span>
        <span className="mt-1 text-[0.7rem] text-muted-foreground">patrickchukwumba.com</span>
      </span>
    </div>
  )
}
