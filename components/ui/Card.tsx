import { cn } from "@/lib/utils"

export function Card({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "rounded-xl border border-zinc-800 bg-zinc-900/60 backdrop-blur-sm p-5",
        className,
      )}
    >
      {children}
    </div>
  )
}
