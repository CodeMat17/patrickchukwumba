"use client"

import { useId, useRef, useState } from "react"
import { useMutation } from "convex/react"
import { ArrowDown, ArrowUp, ChevronRight, FileText, Loader2, Plus, Trash2, Upload as UploadIcon } from "lucide-react"
import { api } from "@/convex/_generated/api"
import { emptyValue, type Field, type Fields, type Json, type Upload } from "@/lib/content-schema"
import { cn } from "@/lib/utils"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

type Change = (value: Json) => void

/** Comfortable touch targets on phones, tighter on larger screens. */
const inputClass = "h-11 px-3 sm:h-9"
const textareaClass = "field-sizing-fixed resize-y px-3 leading-relaxed"
const iconButton = "size-9 text-muted-foreground disabled:opacity-30 sm:size-7"

/** Renders every field of a section or object, in schema order. */
export function FieldList({
  fields,
  value,
  onChange,
}: {
  fields: Fields
  value: Record<string, Json>
  onChange: (value: Record<string, Json>) => void
}) {
  return (
    <div className="flex flex-col gap-6">
      {Object.entries(fields).map(([key, field]) => (
        <FieldInput
          key={key}
          field={field}
          value={value[key]}
          onChange={(next) => onChange({ ...value, [key]: next })}
        />
      ))}
    </div>
  )
}

function FieldInput({ field, value, onChange }: { field: Field; value: Json; onChange: Change }) {
  switch (field.kind) {
    case "text":
    case "url":
      return <TextInput field={field} value={value} onChange={onChange} />
    case "integer":
      return <IntegerInput field={field} value={value} onChange={onChange} />
    case "checkbox":
      return <CheckboxInput field={field} value={value} onChange={onChange} />
    case "image":
    case "file":
      return <UploadInput field={field} value={value} onChange={onChange} />
    case "object":
      return (
        <fieldset className="min-w-0 rounded-xl border border-border p-3 sm:p-5">
          <legend className="px-1.5 text-sm font-semibold text-foreground">{field.label}</legend>
          {field.description && <Hint>{field.description}</Hint>}
          <div className="mt-4">
            <FieldList fields={field.fields} value={value} onChange={onChange} />
          </div>
        </fieldset>
      )
    case "list":
      return <ListInput field={field} value={value} onChange={onChange} />
  }
}

function Hint({ children }: { children: React.ReactNode }) {
  return <p className="mt-1 text-[0.8rem] leading-relaxed text-muted-foreground">{children}</p>
}

function Labelled({ id, field, children }: { id: string; field: Field; children: React.ReactNode }) {
  return (
    <div>
      <Label htmlFor={id} className="leading-snug">
        {field.label}
      </Label>
      {field.description && <Hint>{field.description}</Hint>}
      <div className="mt-2">{children}</div>
    </div>
  )
}

function TextInput({ field, value, onChange }: { field: Field; value: string; onChange: Change }) {
  const id = useId()
  const multiline = field.kind === "text" && field.multiline
  return (
    <Labelled id={id} field={field}>
      {multiline ? (
        <Textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={Math.min(10, Math.max(3, Math.ceil(value.length / 60)))}
          className={textareaClass}
        />
      ) : (
        <Input
          id={id}
          type={field.kind === "url" ? "url" : "text"}
          inputMode={field.kind === "url" ? "url" : undefined}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={inputClass}
        />
      )}
    </Labelled>
  )
}

function IntegerInput({ field, value, onChange }: { field: Field; value: number | null; onChange: Change }) {
  const id = useId()
  const optional = field.kind === "integer" && field.optional
  return (
    <Labelled id={id} field={field}>
      <Input
        id={id}
        type="number"
        inputMode="numeric"
        step={1}
        value={value ?? ""}
        onChange={(e) => {
          const raw = e.target.value
          if (raw === "") return onChange(optional ? null : 0)
          const parsed = Math.round(Number(raw))
          if (Number.isFinite(parsed)) onChange(parsed)
        }}
        className={cn(inputClass, "max-w-40 tabular")}
      />
    </Labelled>
  )
}

function CheckboxInput({ field, value, onChange }: { field: Field; value: boolean; onChange: Change }) {
  const id = useId()
  return (
    <div className="flex items-start gap-3">
      <Checkbox id={id} checked={value} onCheckedChange={(checked) => onChange(checked)} className="mt-0.5 size-5 sm:size-4" />
      <div>
        <Label htmlFor={id} className="leading-snug">
          {field.label}
        </Label>
        {field.description && <Hint>{field.description}</Hint>}
      </div>
    </div>
  )
}

/**
 * Uploads straight to Convex storage. The new file only replaces the old one
 * on the site once the section is saved; Convex then deletes the old file.
 */
function UploadInput({ field, value, onChange }: { field: Field; value: Upload; onChange: Change }) {
  const id = useId()
  const inputRef = useRef<HTMLInputElement>(null)
  const generateUploadUrl = useMutation(api.content.generateUploadUrl)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const isImage = field.kind === "image"

  async function upload(file: File) {
    setUploading(true)
    setError(null)
    try {
      const postUrl = await generateUploadUrl()
      const res = await fetch(postUrl, {
        method: "POST",
        headers: { "Content-Type": file.type || "application/octet-stream" },
        body: file,
      })
      if (!res.ok) throw new Error()
      const { storageId } = (await res.json()) as { storageId: string }
      onChange({ storageId, name: file.name, url: URL.createObjectURL(file) } satisfies Upload)
    } catch {
      setError("The upload didn't go through. Please try again.")
    } finally {
      setUploading(false)
    }
  }

  const removable = value && !uploading

  return (
    <Labelled id={id} field={field}>
      <div className="flex flex-col gap-3 rounded-xl border border-dashed border-border p-3 sm:flex-row sm:items-center sm:p-4">
        {isImage ? (
          <div className="relative h-36 w-28 shrink-0 self-center overflow-hidden rounded-lg bg-muted sm:h-28 sm:w-24 sm:self-auto">
            {value?.url ? (
              // eslint-disable-next-line @next/next/no-img-element -- previews include local blob: URLs
              <img src={value.url} alt="" className="size-full object-cover object-top" />
            ) : (
              <span className="grid size-full place-items-center text-xs text-muted-foreground">No photo</span>
            )}
          </div>
        ) : (
          <div className="flex min-w-0 items-center gap-2.5 text-sm">
            <FileText className="size-5 shrink-0 text-gold" />
            {value?.url ? (
              <a href={value.url} target="_blank" rel="noreferrer" className="truncate underline-offset-4 hover:underline">
                {value.name || "Current file"}
              </a>
            ) : (
              <span className="text-muted-foreground">No file uploaded</span>
            )}
          </div>
        )}

        <div className="grid grid-cols-2 gap-2 sm:ml-auto sm:flex sm:items-center">
          <Button
            variant="outline"
            size="lg"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className={cn("h-11 sm:h-8", !removable && "col-span-2")}
          >
            {uploading ? <Loader2 className="size-4 animate-spin" /> : <UploadIcon className="size-4" />}
            {uploading ? "Uploading…" : value ? "Replace" : "Upload"}
          </Button>
          <input
            ref={inputRef}
            id={id}
            type="file"
            accept={isImage ? "image/*" : "application/pdf"}
            className="sr-only"
            onChange={(e) => {
              const file = e.target.files?.[0]
              e.target.value = ""
              if (file) upload(file)
            }}
          />
          {removable && (
            <Button
              variant="ghost"
              size="lg"
              onClick={() => onChange(null)}
              className="h-11 text-muted-foreground hover:bg-destructive/10 hover:text-destructive sm:h-8"
            >
              <Trash2 className="size-4" />
              Remove
            </Button>
          )}
        </div>
      </div>
      {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
    </Labelled>
  )
}

function ListInput({ field, value, onChange }: { field: Field & { kind: "list" }; value: Json[]; onChange: Change }) {
  const simple = field.of.kind !== "object"
  // Newly added object items open straight away so they can be filled in.
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const update = (index: number, item: Json) => onChange(value.map((v, i) => (i === index ? item : v)))
  const remove = (index: number) => onChange(value.filter((_, i) => i !== index))
  const move = (index: number, by: -1 | 1) => {
    const next = [...value]
    ;[next[index], next[index + by]] = [next[index + by], next[index]]
    onChange(next)
  }
  const add = () => {
    onChange([...value, emptyValue(field.of)])
    setOpenIndex(value.length)
  }

  const removeButton = (index: number) => (
    <Button
      variant="ghost"
      size="icon"
      className={cn(iconButton, "hover:bg-destructive/10 hover:text-destructive")}
      onClick={simple ? () => remove(index) : undefined}
      aria-label="Remove"
    >
      <Trash2 className="size-4 sm:size-3.5" />
    </Button>
  )

  const controls = (index: number, label?: string) => (
    <div className="flex shrink-0 items-center">
      <Button
        variant="ghost"
        size="icon"
        className={iconButton}
        onClick={() => move(index, -1)}
        disabled={index === 0}
        aria-label="Move up"
      >
        <ArrowUp className="size-4 sm:size-3.5" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className={iconButton}
        onClick={() => move(index, 1)}
        disabled={index === value.length - 1}
        aria-label="Move down"
      >
        <ArrowDown className="size-4 sm:size-3.5" />
      </Button>
      {simple ? (
        removeButton(index)
      ) : (
        <AlertDialog>
          <AlertDialogTrigger render={removeButton(index)} />
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Remove this item?</AlertDialogTitle>
              <AlertDialogDescription>
                {label ? <>&ldquo;{label}&rdquo; will be removed. </> : null}
                It stays on the live site until you press Save.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel size="lg" className="h-11 sm:h-9">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                variant="destructive"
                size="lg"
                className="h-11 sm:h-9"
                onClick={() => remove(index)}
              >
                Remove
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  )

  return (
    <div className="min-w-0">
      <p className="text-sm font-medium text-foreground">{field.label}</p>
      {field.description && <Hint>{field.description}</Hint>}

      <ol className="mt-3 flex flex-col gap-2">
        {value.map((item, index) => {
          if (simple) {
            return (
              <li key={index} className="flex items-start gap-1.5 sm:gap-2">
                <span className="mt-3 w-5 shrink-0 text-right text-xs text-muted-foreground tabular sm:mt-2">
                  {index + 1}.
                </span>
                <div className="min-w-0 flex-1">
                  <SimpleItem field={field.of} value={item} onChange={(next) => update(index, next)} />
                </div>
                <div className="mt-1 sm:mt-1">{controls(index)}</div>
              </li>
            )
          }
          const label = field.itemLabel?.(item) || `${field.of.label} ${index + 1}`
          return (
            <li key={index}>
              <Collapsible
                defaultOpen={openIndex === index}
                className="rounded-xl border border-border bg-card/40 has-data-panel-open:bg-card"
              >
                <div className="flex items-center gap-1 pr-1">
                  <CollapsibleTrigger className="group/trigger flex min-h-12 min-w-0 flex-1 items-center gap-2 rounded-xl py-2 pl-3 text-left outline-none focus-visible:ring-3 focus-visible:ring-ring/50 sm:min-h-10">
                    <ChevronRight className="size-4 shrink-0 text-muted-foreground transition-transform group-data-panel-open/trigger:rotate-90" />
                    <span className="min-w-0 flex-1 truncate text-sm font-medium">{label}</span>
                  </CollapsibleTrigger>
                  {controls(index, label)}
                </div>
                <CollapsibleContent className="border-t border-border p-3 sm:p-5">
                  <FieldList
                    fields={(field.of as Field & { kind: "object" }).fields}
                    value={item}
                    onChange={(next) => update(index, next)}
                  />
                </CollapsibleContent>
              </Collapsible>
            </li>
          )
        })}
      </ol>

      <Button
        variant="outline"
        size="lg"
        onClick={add}
        className="mt-3 h-11 w-full border-dashed text-muted-foreground hover:border-gold/50 sm:h-8 sm:w-auto"
      >
        <Plus className="size-4" />
        Add {field.of.label.toLowerCase()}
      </Button>
    </div>
  )
}

/** A list item that is a single value — shown inline without its own label. */
function SimpleItem({ field, value, onChange }: { field: Field; value: Json; onChange: Change }) {
  if (field.kind === "text" && field.multiline) {
    return (
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={Math.min(6, Math.max(2, Math.ceil(value.length / 50)))}
        aria-label={field.label}
        className={cn(textareaClass, "min-h-11")}
      />
    )
  }
  if (field.kind === "text" || field.kind === "url") {
    return <Input value={value} onChange={(e) => onChange(e.target.value)} aria-label={field.label} className={inputClass} />
  }
  return <FieldInput field={field} value={value} onChange={onChange} />
}
