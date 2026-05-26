"use client"

import { difficulties } from "@/lib/data/matches"
import { useFilters } from "@/lib/store"

export function DifficultyFilter() {
  const difficulty = useFilters((s) => s.difficulty)
  const setDifficulty = useFilters((s) => s.setDifficulty)

  return (
    <div className="flex gap-2">
      {difficulties.map((d) => (
        <button
          key={d.id}
          aria-pressed={difficulty === d.id}
          onClick={() => setDifficulty(d.id)}
          className={`rounded-full px-3 py-1 text-xs font-medium transition-colors cursor-pointer ${
            difficulty === d.id
              ? "bg-zinc-100 text-zinc-900"
              : "bg-zinc-800/50 text-zinc-400 hover:text-zinc-200"
          }`}
        >
          {d.label}
        </button>
      ))}
    </div>
  )
}
