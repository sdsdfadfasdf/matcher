import type { Match } from "./data/matches"
import { isEligible, type UserStatus } from "./eligibility"

export type StrategicSuggestion = {
  steppingStone: Match
  unlocks: Match[]
}

/**
 * For each match the user is eligible for (but doesn't already hold),
 * simulate having that program's status and find which *new* matches
 * become available. Returns suggestions sorted by unlock count (desc),
 * limited to the top 5.
 */
export function computeStrategicUnlocks(
  matches: Match[],
  userStatuses: UserStatus[],
): StrategicSuggestion[] {
  if (userStatuses.length === 0) return []

  // 1. Build a set of match IDs the user can already access directly
  const directlyEligible = matches.filter((m) => isEligible(m, userStatuses))
  const directlyEligibleIds = new Set(directlyEligible.map((m) => m.id))

  // 2. Pre-compute referenced tiers for each program
  //    (what tier of program P is accepted by other matches' eligibleFrom)
  const programTiers = new Map<string, string[]>()
  for (const m of matches) {
    for (const src of m.eligibleFrom ?? []) {
      const key = src.program.toLowerCase()
      if (!programTiers.has(key)) programTiers.set(key, [])
      if (src.tier) {
        const existing = programTiers.get(key)!
        if (!existing.includes(src.tier)) {
          existing.push(src.tier)
        }
      }
    }
  }

  // 3. For each 1st-degree match not already held, compute unlocks
  const suggestions: StrategicSuggestion[] = []

  for (const steppingStone of directlyEligible) {
    // Skip if user already holds this program
    if (
      userStatuses.some(
        (us) => us.program.toLowerCase() === steppingStone.program.toLowerCase(),
      )
    ) {
      continue
    }

    // Determine the simulated tier:
    //   use the first referenced tier for this program, or "" if none
    const referencedTiers =
      programTiers.get(steppingStone.program.toLowerCase()) ?? []
    const simulatedTier = referencedTiers.length > 0 ? referencedTiers[0] : ""

    const simulatedStatus: UserStatus = {
      program: steppingStone.program,
      tier: simulatedTier,
      category: steppingStone.category,
    }

    const combinedStatuses = [...userStatuses, simulatedStatus]

    const unlocked = matches.filter((m) => {
      if (m.id === steppingStone.id) return false
      if (directlyEligibleIds.has(m.id)) return false
      return isEligible(m, combinedStatuses)
    })

    if (unlocked.length > 0) {
      suggestions.push({ steppingStone, unlocks: unlocked })
    }
  }

  // Sort by most unlocks first, limit to top 5
  return suggestions.sort((a, b) => b.unlocks.length - a.unlocks.length).slice(0, 5)
}
