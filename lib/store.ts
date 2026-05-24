import { create } from "zustand"

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

  setCategory: (c: Category) => void
  setDifficulty: (d: Difficulty) => void
  setSort: (s: SortKey) => void
  setSearch: (s: string) => void
  setView: (v: ViewMode) => void
}

export const useFilters = create<FilterState>((set) => ({
  category: "all",
  difficulty: "all",
  sort: "ease",
  search: "",
  view: "grid",

  setCategory: (category) => set({ category }),
  setDifficulty: (difficulty) => set({ difficulty }),
  setSort: (sort) => set({ sort }),
  setSearch: (search) => set({ search }),
  setView: (view) => set({ view }),
}))
