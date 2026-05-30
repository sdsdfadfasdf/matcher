import { cn } from "@/lib/utils"

const variants = {
  emerald: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  amber: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  red: "bg-red-500/10 text-red-400 border-red-500/20",
  zinc: "bg-zinc-800 text-zinc-300 border-zinc-700",
  blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "m-blue": "bg-[#0066b1]/20 text-[#0066b1] border-[#0066b1]/30 uppercase tracking-wider text-xs font-bold",
  "m-red": "bg-[#e22718]/20 text-[#e22718] border-[#e22718]/30 uppercase tracking-wider text-xs font-bold",
}

export function Badge({
  children,
  variant = "zinc",
  className,
}: {
  children: React.ReactNode
  variant?: keyof typeof variants
  className?: string
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center border px-2.5 py-0.5 text-xs font-medium",
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  )
}
