import { create } from "zustand"
import type { UserStatus } from "./eligibility"
import type { OutcomeReport } from "./data/matches"
import type { Profile } from "./profiles"
import { updateProfile } from "./profiles"
import { invalidateCommunityCache } from "./community"

export type Category = "all" | "airline" | "hotel" | "auto" | "cruise"
export type Difficulty = "all" | "easy" | "medium" | "hard"
export type SortKey = "ease" | "rate" | "name" | "cost"
export type ViewMode = "grid" | "table"

type FilterState = {
  category: Category
  difficulty: Difficulty
  sort: SortKey
  search: string
  view: ViewMode
  eligibilityMode: boolean
  memberships: UserStatus[]

  // Profile
  activeProfile: Profile | null
  favorites: string[]
  expiredFlags: string[]
  outcomeReports: OutcomeReport[]

  setCategory: (c: Category) => void
  setDifficulty: (d: Difficulty) => void
  setSort: (s: SortKey) => void
  setSearch: (s: string) => void
  setView: (v: ViewMode) => void
  setEligibilityMode: (v: boolean) => void
  addMembership: (m: UserStatus) => void
  removeMembership: (program: string) => void
  clearMemberships: () => void

  // Profile actions
  setActiveProfile: (p: Profile | null) => void
  addFavorite: (matchId: string) => void
  removeFavorite: (matchId: string) => void
  toggleFavorite: (matchId: string) => void
  syncFromProfile: () => void

  // Outcome report actions
  addOutcomeReport: (report: OutcomeReport) => void
  removeOutcomeReport: (reportId: string) => void
  updateOutcomeReport: (reportId: string, updates: Partial<OutcomeReport>) => void

  // Expired flag action
  toggleExpiredFlag: (matchId: string) => void
}

export const useFilters = create<FilterState>((set, get) => ({
  category: "all",
  difficulty: "all",
  sort: "ease",
  search: "",
  view: "grid",
  eligibilityMode: false,
  memberships: [],
  activeProfile: null,
  favorites: [],
  expiredFlags: [],
  outcomeReports: [],

  setCategory: (category) => set({ category }),
  setDifficulty: (difficulty) => set({ difficulty }),
  setSort: (sort) => {
    set({ sort })
    const p = get().activeProfile
    if (p) {
      updateProfile({ ...p, preferences: { ...p.preferences, defaultSort: sort } })
    }
  },
  setSearch: (search) => set({ search }),
  setView: (view) => {
    set({ view })
    const p = get().activeProfile
    if (p) {
      updateProfile({ ...p, preferences: { ...p.preferences, defaultView: view } })
    }
  },
  setEligibilityMode: (eligibilityMode) => set({ eligibilityMode }),

  addMembership: (m) =>
    set((s) => {
      const memberships = s.memberships.some((x) => x.program === m.program)
        ? s.memberships.map((x) => (x.program === m.program ? m : x))
        : [...s.memberships, m]
      const p = s.activeProfile
      if (p) {
        updateProfile({ ...p, memberships })
      }
      return { memberships }
    }),
  removeMembership: (program) =>
    set((s) => {
      const memberships = s.memberships.filter((m) => m.program !== program)
      const p = s.activeProfile
      if (p) {
        updateProfile({ ...p, memberships })
      }
      return { memberships }
    }),
  clearMemberships: () =>
    set((s) => {
      const p = s.activeProfile
      if (p) {
        updateProfile({ ...p, memberships: [] })
      }
      return { memberships: [] }
    }),

  setActiveProfile: (p) => {
    if (p) {
      set({
        activeProfile: p,
        memberships: p.memberships,
        favorites: p.favorites,
        expiredFlags: p.expiredFlags ?? [],
        outcomeReports: p.outcomeReports ?? [],
        view: p.preferences.defaultView,
        sort: p.preferences.defaultSort,
      })
    } else {
      set({
        activeProfile: null,
        memberships: [],
        favorites: [],
        expiredFlags: [],
        outcomeReports: [],
        view: "grid",
        sort: "ease",
      })
    }
    invalidateCommunityCache()
  },

  addFavorite: (matchId) =>
    set((s) => {
      const favorites = s.favorites.includes(matchId) ? s.favorites : [...s.favorites, matchId]
      const p = s.activeProfile
      if (p) {
        updateProfile({ ...p, favorites })
      }
      return { favorites }
    }),

  removeFavorite: (matchId) =>
    set((s) => {
      const favorites = s.favorites.filter((id) => id !== matchId)
      const p = s.activeProfile
      if (p) {
        updateProfile({ ...p, favorites })
      }
      return { favorites }
    }),

  toggleFavorite: (matchId) => {
    const s = get()
    if (s.favorites.includes(matchId)) {
      s.removeFavorite(matchId)
    } else {
      s.addFavorite(matchId)
    }
  },

  syncFromProfile: () => {
    const p = get().activeProfile
    if (p) {
      set({
        memberships: p.memberships,
        favorites: p.favorites,
        expiredFlags: p.expiredFlags ?? [],
        outcomeReports: p.outcomeReports ?? [],
        view: p.preferences.defaultView,
        sort: p.preferences.defaultSort,
      })
    }
    invalidateCommunityCache()
  },

  addOutcomeReport: (report) =>
    set((s) => {
      const outcomeReports = [...s.outcomeReports, report]
      const p = s.activeProfile
      if (p) {
        updateProfile({ ...p, outcomeReports })
      }
      invalidateCommunityCache()
      return { outcomeReports }
    }),

  removeOutcomeReport: (reportId) =>
    set((s) => {
      const outcomeReports = s.outcomeReports.filter((r) => r.id !== reportId)
      const p = s.activeProfile
      if (p) {
        updateProfile({ ...p, outcomeReports })
      }
      invalidateCommunityCache()
      return { outcomeReports }
    }),

  updateOutcomeReport: (reportId, updates) =>
    set((s) => {
      const outcomeReports = s.outcomeReports.map((r) =>
        r.id === reportId ? { ...r, ...updates } : r,
      )
      const p = s.activeProfile
      if (p) {
        updateProfile({ ...p, outcomeReports })
      }
      invalidateCommunityCache()
      return { outcomeReports }
    }),

  toggleExpiredFlag: (matchId) => {
    const s = get()
    const flags = s.expiredFlags.includes(matchId)
      ? s.expiredFlags.filter((id) => id !== matchId)
      : [...s.expiredFlags, matchId]
    const p = s.activeProfile
    if (p) {
      updateProfile({ ...p, expiredFlags: flags })
    }
    set({ expiredFlags: flags })
  },
}))
