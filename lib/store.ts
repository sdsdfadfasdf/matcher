import { create } from "zustand"
import type { UserStatus } from "./eligibility"
import type { Profile } from "./profiles"
import { updateProfile } from "./profiles"

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
}

function persist(profile: Profile): void {
  updateProfile(profile)
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

  setCategory: (category) => set({ category }),
  setDifficulty: (difficulty) => set({ difficulty }),
  setSort: (sort) => {
    set({ sort })
    const p = get().activeProfile
    if (p) {
      p.preferences.defaultSort = sort
      persist(p)
    }
  },
  setSearch: (search) => set({ search }),
  setView: (view) => {
    set({ view })
    const p = get().activeProfile
    if (p) {
      p.preferences.defaultView = view
      persist(p)
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
        p.memberships = memberships
        persist(p)
      }
      return { memberships }
    }),
  removeMembership: (program) =>
    set((s) => {
      const memberships = s.memberships.filter((m) => m.program !== program)
      const p = s.activeProfile
      if (p) {
        p.memberships = memberships
        persist(p)
      }
      return { memberships }
    }),
  clearMemberships: () =>
    set((s) => {
      const p = s.activeProfile
      if (p) {
        p.memberships = []
        persist(p)
      }
      return { memberships: [] }
    }),

  setActiveProfile: (p) => {
    if (p) {
      set({
        activeProfile: p,
        memberships: p.memberships,
        favorites: p.favorites,
        view: p.preferences.defaultView,
        sort: p.preferences.defaultSort,
      })
    } else {
      set({
        activeProfile: null,
        memberships: [],
        favorites: [],
      })
    }
  },

  addFavorite: (matchId) =>
    set((s) => {
      const favorites = s.favorites.includes(matchId) ? s.favorites : [...s.favorites, matchId]
      const p = s.activeProfile
      if (p) {
        p.favorites = favorites
        persist(p)
      }
      return { favorites }
    }),

  removeFavorite: (matchId) =>
    set((s) => {
      const favorites = s.favorites.filter((id) => id !== matchId)
      const p = s.activeProfile
      if (p) {
        p.favorites = favorites
        persist(p)
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
        view: p.preferences.defaultView,
        sort: p.preferences.defaultSort,
      })
    }
  },
}))
