import { daysAgo } from "./utils"
import { loadProfiles } from "./profiles"
import { oldestFetchDate } from "./data/sources"
import type { Match } from "./data/matches"

export type FreshnessLevel = "fresh" | "stale" | "expired"

export function getFreshness(match?: Match): {
  level: FreshnessLevel
  label: string
  variant: "emerald" | "amber" | "red"
} {
  const dateStr = match?.lastVerified ?? oldestFetchDate()
  const days = daysAgo(dateStr)

  if (days <= 7) {
    return { level: "fresh", label: "Verified recently", variant: "emerald" }
  }
  if (days <= 30) {
    return { level: "fresh", label: `Verified ${days}d ago`, variant: "emerald" }
  }
  if (days <= 60) {
    return { level: "stale", label: `Verified ${days}d ago`, variant: "amber" }
  }
  return { level: "expired", label: `Verified ${days}d ago`, variant: "red" }
}

export function getExpiredFlagCount(matchId: string): number {
  const profiles = loadProfiles()
  let count = 0
  for (const p of profiles) {
    const flags = p.expiredFlags ?? []
    if (flags.includes(matchId)) count++
  }
  return count
}

export function isMatchFlaggedByUser(matchId: string): boolean {
  const profiles = loadProfiles()
  // We can't easily know "current user" from here — the store manages that
  return false
}
