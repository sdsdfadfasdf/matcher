"use client"

import { Search, X } from "lucide-react"
import { useFilters } from "@/lib/store"

export function SearchBar() {
  const search = useFilters((s) => s.search)
  const setSearch = useFilters((s) => s.setSearch)

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
      <input
        type="search"
        aria-label="Search programs"
        placeholder="Search programs..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full rounded-lg border border-zinc-800 bg-zinc-900/60 pl-9 pr-9 py-2 text-sm text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-600"
      />
      {search && (
        <button
          onClick={() => setSearch("")}
          aria-label="Clear search"
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-0.5 text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  )
}
