"use client"

import { useMemo } from "react"
import { LayoutGrid, List } from "lucide-react"
import { Header } from "@/components/layout/Header"
import { StatsBar } from "@/components/dashboard/StatsBar"
import { CategoryFilter } from "@/components/dashboard/CategoryFilter"
import { DifficultyFilter } from "@/components/dashboard/DifficultyFilter"
import { SearchBar } from "@/components/dashboard/SearchBar"
import { MatchGrid } from "@/components/dashboard/MatchGrid"
import { RankingTable } from "@/components/dashboard/RankingTable"
import { Button } from "@/components/ui/Button"
import { matches } from "@/lib/data/matches"
import { useFilters, type SortKey } from "@/lib/store"

const easeWeights: Record<string, number> = { easy: 1, medium: 0.6, hard: 0.3 }

function sortMatches(filtered: typeof matches, sort: SortKey) {
  return [...filtered].sort((a, b) => {
    switch (sort) {
      case "ease":
        return b.matchRate * easeWeights[b.difficulty] - a.matchRate * easeWeights[a.difficulty]
      case "rate":
        return b.matchRate - a.matchRate
      case "name":
        return a.program.localeCompare(b.program)
      case "cost":
        return a.cost === "Free" ? -1 : b.cost === "Free" ? 1 : a.cost.localeCompare(b.cost)
      default:
        return 0
    }
  })
}

export default function Home() {
  const category = useFilters((s) => s.category)
  const difficulty = useFilters((s) => s.difficulty)
  const sort = useFilters((s) => s.sort)
  const search = useFilters((s) => s.search)
  const view = useFilters((s) => s.view)
  const setSort = useFilters((s) => s.setSort)
  const setView = useFilters((s) => s.setView)

  const filtered = useMemo(() => {
    let result = matches
    if (category !== "all") result = result.filter((m) => m.category === category)
    if (difficulty !== "all") result = result.filter((m) => m.difficulty === difficulty)
    if (search) {
      const q = search.toLowerCase()
      result = result.filter((m) => m.program.toLowerCase().includes(q))
    }
    return sortMatches(result, sort)
  }, [category, difficulty, sort, search])

  const sortLabels: Record<SortKey, string> = {
    ease: "Ease Score",
    rate: "Match Rate",
    name: "Name",
    cost: "Cost",
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8 space-y-6">
        <StatsBar />

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <CategoryFilter />
            <DifficultyFilter />
          </div>

          <div className="flex items-center gap-3">
            <SearchBar />
            <div className="flex items-center gap-1 rounded-lg bg-zinc-800/50 p-1">
              <button
                onClick={() => setView("grid")}
                className={`rounded-md p-1.5 cursor-pointer transition-colors ${
                  view === "grid"
                    ? "bg-zinc-700 text-zinc-100"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setView("table")}
                className={`rounded-md p-1.5 cursor-pointer transition-colors ${
                  view === "table"
                    ? "bg-zinc-700 text-zinc-100"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm text-zinc-500">
            Showing {filtered.length} of {matches.length} programs
          </p>
          <div className="flex items-center gap-1 text-xs text-zinc-500">
            <span className="mr-1">Sort by:</span>
            {(Object.entries(sortLabels) as [SortKey, string][]).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setSort(key)}
                className={`rounded px-2 py-0.5 cursor-pointer transition-colors ${
                  sort === key
                    ? "bg-zinc-700 text-zinc-200"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {view === "grid" ? (
          <MatchGrid matches={filtered} />
        ) : (
          <RankingTable matches={filtered} />
        )}

        <footer className="py-8 text-center text-xs text-zinc-600">
          Data curated from{" "}
          <a
            href="https://statusmatcher.com"
            target="_blank"
            rel="noopener"
            className="text-zinc-500 hover:text-zinc-300 underline transition-colors"
          >
            statusmatcher.com
          </a>
          . Match rates are based on crowd-sourced reports and may change. Always verify
          requirements directly with the program.
        </footer>
      </main>
    </div>
  )
}
