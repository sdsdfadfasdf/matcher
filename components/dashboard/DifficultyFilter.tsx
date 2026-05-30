"use client"

import { difficulties } from "@/lib/data/matches"
import { useFilters } from "@/lib/store"

export function DifficultyFilter() {
  const difficulty = useFilters((s) => s.difficulty)
  const setDifficulty = useFilters((s) => s.setDifficulty)

  return (
    <div className="flex gap-1">
      {difficulties.map((d) => (
        <button
          key={d.id}
          aria-pressed={difficulty === d.id}
          onClick={() => setDifficulty(d.id)}
          className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
            difficulty === d.id
              ? "bg-[#0066b1] text-white"
              : "bg-zinc-800/50 text-zinc-400 hover:text-zinc-200"
          }`}
        >
          {d.label}
        </button>
      ))}
    </div>
  )
}
