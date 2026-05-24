import { cn } from "@/lib/utils"

type Tab<T extends string> = {
  id: T
  label: string
}

export function Tabs<T extends string>({
  tabs,
  active,
  onChange,
  className,
}: {
  tabs: Tab<T>[]
  active: T
  onChange: (id: T) => void
  className?: string
}) {
  return (
    <div className={cn("flex gap-1 rounded-lg bg-zinc-800/50 p-1", className)}>
      {tabs.map((t) => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          className={cn(
            "flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors cursor-pointer",
            active === t.id
              ? "bg-zinc-700 text-zinc-100"
              : "text-zinc-400 hover:text-zinc-200",
          )}
        >
          {t.label}
        </button>
      ))}
    </div>
  )
}
