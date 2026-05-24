import type { Match, EligibleSource } from "./data/matches"

export type UserStatus = {
  program: string
  tier: string
  category: string
}

/** Returns all UserStatuses that make the user eligible for this match. */
export function findEligibleSources(match: Match, userStatuses: UserStatus[]): EligibleSource[] {
  if (!match.eligibleFrom || match.eligibleFrom.length === 0) return []
  if (userStatuses.length === 0) return []

  return match.eligibleFrom.filter((src) =>
    userStatuses.some((us) => {
      const programMatch = us.program.toLowerCase() === src.program.toLowerCase()
      if (!programMatch) return false
      if (!src.tier) return true // any tier accepted
      return us.tier.toLowerCase() === src.tier.toLowerCase()
    }),
  )
}

/** Returns true if ANY of the user's statuses qualify for this match. */
export function isEligible(match: Match, userStatuses: UserStatus[]): boolean {
  if (!match.eligibleFrom || match.eligibleFrom.length === 0) return false
  return findEligibleSources(match, userStatuses).length > 0
}

/** Filter matches: in eligibility mode, only show eligible + matches without eligibleFrom (unknown). */
export function filterEligible(matches: Match[], userStatuses: UserStatus[]): Match[] {
  if (userStatuses.length === 0) return matches
  return matches.filter((m) => {
    if (!m.eligibleFrom || m.eligibleFrom.length === 0) return true // unknown eligibility = always show
    return isEligible(m, userStatuses)
  })
}
