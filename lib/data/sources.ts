export type DataSource = {
  name: string
  url: string
  lastFetched: string // ISO date
  category: "primary" | "secondary" | "verification"
  notes: string
}

export const dataSources: DataSource[] = [
  {
    name: "StatusMatcher.com",
    url: "https://statusmatcher.com",
    lastFetched: "2026-05-24",
    category: "primary",
    notes: "Crowd-sourced status match reports. Primary data source for match rates, requirements, and user tips.",
  },
  {
    name: "The Points Guy",
    url: "https://thepointsguy.com/loyalty-programs/airline-status-matches-challenges/",
    lastFetched: "2026-05-24",
    category: "primary",
    notes: "Comprehensive 2026 airline status match guide. Used for challenge details, deadlines, and tier requirements.",
  },
  {
    name: "AwardWallet",
    url: "https://awardwallet.com",
    lastFetched: "2026-05-24",
    category: "secondary",
    notes: "Detailed match guides for United, Virgin Voyages, Wyndham. Used for challenge math and timing advice.",
  },
  {
    name: "Frequent Miler",
    url: "https://frequentmiler.com/tag/elite-status",
    lastFetched: "2026-05-24",
    category: "secondary",
    notes: "Elite status tracking. Used for Lufthansa M&M BA/Iberia match and United challenge details.",
  },
  {
    name: "Loyalty Lobby",
    url: "https://loyaltylobby.com",
    lastFetched: "2026-05-24",
    category: "secondary",
    notes: "Hotel status match details. Used for Hilton fast-track, Royal Jordanian hotel match, Accor data.",
  },
  {
    name: "Award Travel Finder",
    url: "https://awardtravelfinder.com",
    lastFetched: "2026-05-24",
    category: "secondary",
    notes: "SkyTeam and oneworld match program details. Used for Vietnam Airlines, Kenya Airways, Royal Air Maroc data.",
  },
]

/** Returns true if any source is older than 7 days (needs refresh). */
export function needsRefresh(): boolean {
  const now = new Date()
  const week = 7 * 24 * 60 * 60 * 1000
  return dataSources.some((s) => {
    const fetched = new Date(s.lastFetched)
    return now.getTime() - fetched.getTime() > week
  })
}

/** Returns the oldest fetch date across all sources. */
export function oldestFetchDate(): string {
  return dataSources.reduce((oldest, s) =>
    s.lastFetched < oldest ? s.lastFetched : oldest,
    dataSources[0].lastFetched,
  )
}
