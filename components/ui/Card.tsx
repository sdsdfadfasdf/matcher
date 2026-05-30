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
        "border border-[#3c3c3c] bg-[#1a1a1a] p-5",
        className,
      )}
    >
      {children}
    </div>
  )
}
