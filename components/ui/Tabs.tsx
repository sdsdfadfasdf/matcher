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
    <div role="tablist" className={cn("flex gap-px bg-[#3c3c3c]/30", className)}>
      {tabs.map((t) => (
        <button
          key={t.id}
          role="tab"
          aria-selected={active === t.id}
          onClick={() => onChange(t.id)}
          className={cn(
            "flex-1 px-3 py-1.5 text-sm font-bold uppercase tracking-wider transition-colors cursor-pointer",
            active === t.id
              ? "bg-[#0066b1] text-white"
              : "bg-[#1a1a1a] text-zinc-400 hover:text-zinc-200",
          )}
        >
          {t.label}
        </button>
      ))}
    </div>
  )
}
