"use client"

import { Search } from "lucide-react"
import { useFilters } from "@/lib/store"

export function SearchBar() {
  const search = useFilters((s) => s.search)
  const setSearch = useFilters((s) => s.setSearch)

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
      <input
        type="text"
        placeholder="Search programs..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full rounded-lg border border-zinc-800 bg-zinc-900/60 pl-9 pr-3 py-2 text-sm text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-600"
      />
    </div>
  )
}
