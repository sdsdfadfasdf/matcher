import { create } from "zustand"
import type { UserStatus } from "./eligibility"

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

  setCategory: (c: Category) => void
  setDifficulty: (d: Difficulty) => void
  setSort: (s: SortKey) => void
  setSearch: (s: string) => void
  setView: (v: ViewMode) => void
  setEligibilityMode: (v: boolean) => void
  addMembership: (m: UserStatus) => void
  removeMembership: (program: string) => void
  clearMemberships: () => void
}

export const useFilters = create<FilterState>((set) => ({
  category: "all",
  difficulty: "all",
  sort: "ease",
  search: "",
  view: "grid",
  eligibilityMode: false,
  memberships: [],

  setCategory: (category) => set({ category }),
  setDifficulty: (difficulty) => set({ difficulty }),
  setSort: (sort) => set({ sort }),
  setSearch: (search) => set({ search }),
  setView: (view) => set({ view }),
  setEligibilityMode: (eligibilityMode) => set({ eligibilityMode }),
  addMembership: (m) =>
    set((s) => ({
      memberships: s.memberships.some((x) => x.program === m.program)
        ? s.memberships.map((x) => (x.program === m.program ? m : x))
        : [...s.memberships, m],
    })),
  removeMembership: (program) =>
    set((s) => ({ memberships: s.memberships.filter((m) => m.program !== program) })),
  clearMemberships: () => set({ memberships: [] }),
}))
