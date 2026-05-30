import { type VariantProps, cva } from "class-variance-authority"
import { cn } from "@/lib/utils"
import type { ButtonHTMLAttributes } from "react"

const button = cva(
  "inline-flex items-center justify-center gap-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 disabled:pointer-events-none disabled:opacity-50 cursor-pointer uppercase tracking-wider",
  {
    variants: {
      variant: {
        primary:
          "bg-zinc-100 text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300",
        secondary:
          "bg-zinc-800 text-zinc-200 hover:bg-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700",
        ghost:
          "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50",
        danger:
          "bg-red-600/20 text-red-400 hover:bg-red-600/30 border border-red-500/20",
        success:
          "bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600/30 border border-emerald-500/20",
        "m-blue":
          "bg-[#0066b1] text-white hover:bg-[#005094]",
        "m-red":
          "bg-[#e22718] text-white hover:bg-[#c42012]",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-10 px-4",
        lg: "h-12 px-6 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
)

type Props = ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof button>

export function Button({ className, variant, size, ...props }: Props) {
  return <button className={cn(button({ variant, size }), className)} {...props} />
}
