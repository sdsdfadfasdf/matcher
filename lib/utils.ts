import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPercent(n: number) {
  return `${Math.round(n)}%`
}

export function easeLabel(d: "easy" | "medium" | "hard") {
  return d === "easy" ? "Easy" : d === "medium" ? "Medium" : "Hard"
}

export function easeColor(d: "easy" | "medium" | "hard") {
  if (d === "easy") return "text-emerald-400"
  if (d === "medium") return "text-amber-400"
  return "text-red-400"
}

export function easeBg(d: "easy" | "medium" | "hard") {
  if (d === "easy") return "bg-emerald-500/10 border-emerald-500/30"
  if (d === "medium") return "bg-amber-500/10 border-amber-500/30"
  return "bg-red-500/10 border-red-500/30"
}

export function rateColor(rate: number) {
  if (rate >= 80) return "bg-emerald-500"
  if (rate >= 50) return "bg-amber-500"
  return "bg-red-500"
}

export function rateBorder(rate: number) {
  if (rate >= 80) return "border-emerald-500/40"
  if (rate >= 50) return "border-amber-500/40"
  return "border-red-500/40"
}

export function daysAgo(dateStr: string): number {
  const diff = Date.now() - new Date(dateStr).getTime()
  return Math.floor(diff / (1000 * 60 * 60 * 24))
}
