import { loadProfiles } from "./profiles"
import type { CommunityMatchData } from "./data/matches"

let cached: Map<string, CommunityMatchData> | null = null

function compute(): Map<string, CommunityMatchData> {
  const profiles = loadProfiles()
  const reports = profiles.flatMap((p) => p.outcomeReports ?? [])

  const grouped = new Map<string, CommunityMatchData>()

  for (const r of reports) {
    let entry = grouped.get(r.matchId)
    if (!entry) {
      entry = {
        communityMatchRate: 0,
        communityVotes: 0,
        communityOutcomes: { approved: 0, denied: 0, pending: 0 },
        lastReportDate: null,
      }
      grouped.set(r.matchId, entry)
    }

    if (r.outcome === "approved") entry.communityOutcomes.approved++
    else if (r.outcome === "denied") entry.communityOutcomes.denied++
    else entry.communityOutcomes.pending++

    if (!entry.lastReportDate || r.timestamp > entry.lastReportDate) {
      entry.lastReportDate = r.timestamp
    }
  }

  for (const entry of grouped.values()) {
    const { approved, denied } = entry.communityOutcomes
    entry.communityVotes = approved + denied
    entry.communityMatchRate =
      entry.communityVotes > 0 ? Math.round((approved / entry.communityVotes) * 100) : 0
  }

  return grouped
}

export function computeAllCommunityData(): Map<string, CommunityMatchData> {
  cached = compute()
  return cached
}

export function getCommunityData(matchId: string): CommunityMatchData | null {
  if (!cached) cached = compute()
  return cached.get(matchId) ?? null
}

export function getTotalCommunityReports(): number {
  if (!cached) cached = compute()
  let total = 0
  for (const entry of cached.values()) {
    total +=
      entry.communityOutcomes.approved +
      entry.communityOutcomes.denied +
      entry.communityOutcomes.pending
  }
  return total
}

export function invalidateCommunityCache(): void {
  cached = null
}
