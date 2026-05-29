"use client"

import { useState } from "react"
import { Search, X, Zap } from "lucide-react"
import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { knownPrograms } from "@/lib/data/programs"
import { useFilters } from "@/lib/store"
import type { MatchCategory } from "@/lib/data/matches"

const catIcons: Record<string, string> = {
  airline: "text-blue-400",
  hotel: "text-emerald-400",
  auto: "text-amber-400",
  cruise: "text-cyan-400",
}

export function ReverseLookup() {
  const clearMemberships = useFilters((s) => s.clearMemberships)
  const addMembership = useFilters((s) => s.addMembership)
  const setCategory = useFilters((s) => s.setCategory)

  const [query, setQuery] = useState("")
  const [selectedProgram, setSelectedProgram] = useState<(typeof knownPrograms)[0] | null>(null)
  const [selectedTier, setSelectedTier] = useState<string | null>(null)
  const [open, setOpen] = useState(false)

  const filtered = query
    ? knownPrograms.filter((p) =>
        p.program.toLowerCase().includes(query.toLowerCase()),
      )
    : knownPrograms

  function selectProgram(program: (typeof knownPrograms)[0]) {
    setSelectedProgram(program)
    setSelectedTier(null)
    setQuery("")
    setOpen(false)
  }

  function selectTier(tier: string) {
    if (!selectedProgram) return
    setSelectedTier(tier)
    clearMemberships()
    addMembership({ program: selectedProgram.program, tier, category: selectedProgram.category })
    setCategory("all")
  }

  function clearSelection() {
    setSelectedProgram(null)
    setSelectedTier(null)
    clearMemberships()
  }

  return (
    <Card className="border-purple-500/20 space-y-3">
      <div className="flex items-center gap-2">
        <Zap className="h-4 w-4 text-purple-400" />
        <h3 className="text-sm font-semibold text-zinc-200">Quick Lookup</h3>
      </div>
      <p className="text-xs text-zinc-500">
        Select a loyalty program and tier to see what you can get.
      </p>

      {!selectedProgram ? (
        <div className="relative">
          <div className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/50 px-3 py-2">
            <Search className="h-4 w-4 text-zinc-500 shrink-0" />
            <input
              type="text"
              aria-label="Search loyalty programs"
              placeholder="Search programs..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                setOpen(true)
              }}
              onFocus={() => setOpen(true)}
              className="flex-1 bg-transparent text-sm text-zinc-200 placeholder:text-zinc-500 focus:outline-none"
            />
          </div>

          {open && (query || filtered.length > 0) && (
            <div className="absolute left-0 right-0 top-full mt-1 rounded-lg border border-zinc-700 bg-zinc-900 shadow-xl z-50 max-h-56 overflow-y-auto">
              {filtered.map((p) => (
                <button
                  key={p.program}
                  onClick={() => selectProgram(p)}
                  className="w-full text-left px-3 py-2 text-sm text-zinc-300 hover:bg-zinc-800 transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <span className={cn("text-xs font-medium", catIcons[p.category] ?? "text-zinc-500")}>
                    {p.category === "airline" ? "✈" : p.category === "hotel" ? "🏨" : p.category === "auto" ? "🚗" : "🚢"}
                  </span>
                  {p.program}
                  <span className="text-zinc-600 ml-auto text-xs">
                    {p.tiers.length} tiers
                  </span>
                </button>
              ))}
              {filtered.length === 0 && (
                <p className="px-3 py-4 text-xs text-zinc-500 text-center">No programs found</p>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-zinc-200">{selectedProgram.program}</span>
              {selectedTier && (
                <Badge variant="zinc">{selectedTier}</Badge>
              )}
            </div>
            <button
              aria-label="Clear selection"
              onClick={clearSelection}
              className="rounded-lg p-1.5 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {!selectedTier ? (
            <div>
              <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                Select your tier
              </p>
              <div className="flex flex-wrap gap-2">
                {selectedProgram.tiers.map((tier) => (
                  <button
                    key={tier}
                    onClick={() => selectTier(tier)}
                    className={cn(
                      "rounded-lg border px-3 py-1.5 text-sm transition-all cursor-pointer",
                      "border-zinc-700 bg-zinc-800/50 text-zinc-300 hover:border-purple-500/40 hover:bg-purple-500/10 hover:text-purple-400",
                    )}
                  >
                    {tier}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="rounded-lg border border-purple-500/20 bg-purple-500/5 p-3">
              <p className="text-sm text-purple-300">
                Showing matches for {" "}
                <span className="font-semibold">{selectedProgram.program} {selectedTier}</span>
              </p>
            </div>
          )}
        </div>
      )}
    </Card>
  )
}
