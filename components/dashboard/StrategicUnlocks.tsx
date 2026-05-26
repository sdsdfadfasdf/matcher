"use client"

import { useMemo, useState } from "react"
import { Zap, ChevronRight, ChevronDown } from "lucide-react"
import { Card } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { matches } from "@/lib/data/matches"
import { useFilters } from "@/lib/store"
import { computeStrategicUnlocks } from "@/lib/strategy"
import type { StrategicSuggestion } from "@/lib/strategy"

export function StrategicUnlocks() {
  const memberships = useFilters((s) => s.memberships)

  const suggestions = useMemo(
    () => computeStrategicUnlocks(matches, memberships),
    [memberships],
  )

  if (suggestions.length === 0) return null

  return (
    <Card className="space-y-3">
      <div className="flex items-center gap-2">
        <Zap className="h-4 w-4 text-amber-400" />
        <h3 className="text-sm font-semibold text-zinc-200">Strategic Unlocks</h3>
      </div>
      <p className="text-xs text-zinc-500">
        Get these matches first to unlock even more opportunities:
      </p>
      <div className="space-y-2">
        {suggestions.map((s) => (
          <SuggestionRow key={s.steppingStone.id} suggestion={s} />
        ))}
      </div>
    </Card>
  )
}

function SuggestionRow({ suggestion }: { suggestion: StrategicSuggestion }) {
  const [expanded, setExpanded] = useState(false)
  const setSearch = useFilters((s) => s.setSearch)
  const setCategory = useFilters((s) => s.setCategory)
  const setView = useFilters((s) => s.setView)

  function navigateTo(program: string) {
    setCategory("all")
    setSearch(program)
    setView("grid")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-900/40">
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-center justify-between gap-2 px-3 py-2.5 text-left cursor-pointer"
      >
        <div className="flex items-center gap-2 min-w-0">
          {expanded ? (
            <ChevronDown className="h-3.5 w-3.5 shrink-0 text-zinc-500" />
          ) : (
            <ChevronRight className="h-3.5 w-3.5 shrink-0 text-zinc-500" />
          )}
          <span className="text-sm font-medium text-zinc-200 truncate">
            {suggestion.steppingStone.program}
          </span>
        </div>
        <Badge variant="emerald" className="shrink-0">
          +{suggestion.unlocks.length}
        </Badge>
      </button>
      {expanded && (
        <div className="px-3 pb-3 pt-1 space-y-1 border-t border-zinc-800/50">
          {suggestion.unlocks.map((m) => (
            <button
              key={m.id}
              onClick={() => navigateTo(m.program)}
              className="w-full text-left flex items-center gap-2 text-xs text-zinc-400 hover:text-zinc-200 pl-5 py-0.5 transition-colors cursor-pointer"
            >
              <span className="w-1 h-1 rounded-full bg-zinc-600 shrink-0" aria-hidden="true" />
              <span className="hover:text-blue-400 transition-colors">{m.program}</span>
              <span className="text-zinc-600">({m.category})</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
