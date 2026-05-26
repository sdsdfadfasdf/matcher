"use client"

import { useState, useRef, useEffect } from "react"
import { Search, X, Plus, Plane, Hotel, Car, Ship } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"
import { Badge } from "@/components/ui/Badge"
import { knownPrograms } from "@/lib/data/programs"
import { useFilters } from "@/lib/store"
import type { UserStatus } from "@/lib/eligibility"
import type { MatchCategory } from "@/lib/data/matches"

const catIcons: Record<string, React.ReactNode> = {
  airline: <Plane className="h-3 w-3" />,
  hotel: <Hotel className="h-3 w-3" />,
  auto: <Car className="h-3 w-3" />,
  cruise: <Ship className="h-3 w-3" />,
}

export function MembershipSelector() {
  const memberships = useFilters((s) => s.memberships)
  const addMembership = useFilters((s) => s.addMembership)
  const removeMembership = useFilters((s) => s.removeMembership)
  const clearMemberships = useFilters((s) => s.clearMemberships)

  const [query, setQuery] = useState("")
  const [open, setOpen] = useState(false)
  const [selectedProgram, setSelectedProgram] = useState<(typeof knownPrograms)[0] | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
        setSelectedProgram(null)
      }
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape" && open) {
        if (selectedProgram) {
          setSelectedProgram(null)
        } else if (query) {
          setQuery("")
        } else {
          setOpen(false)
        }
      }
    }
    document.addEventListener("mousedown", handleClick)
    document.addEventListener("keydown", handleKey)
    return () => {
      document.removeEventListener("mousedown", handleClick)
      document.removeEventListener("keydown", handleKey)
    }
  }, [open, query, selectedProgram])

  const filtered = query
    ? knownPrograms.filter(
        (p) =>
          p.program.toLowerCase().includes(query.toLowerCase()) &&
          !memberships.some((m) => m.program === p.program),
      )
    : knownPrograms.filter(
        (p) => !memberships.some((m) => m.program === p.program),
      )

  function select(program: (typeof knownPrograms)[0], tier: string) {
    addMembership({ program: program.program, tier, category: program.category })
    setQuery("")
    setOpen(false)
    setSelectedProgram(null)
  }

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 space-y-3" ref={containerRef}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-zinc-200">Your Memberships</h3>
        {memberships.length > 0 && (
          <button
            onClick={clearMemberships}
            className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
          >
            Clear all
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-1.5 min-h-[28px]">
        <AnimatePresence>
          {memberships.map((m) => (
            <motion.span
              key={m.program}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <Badge variant="blue" className="flex items-center gap-1 pr-1">
                {catIcons[m.category]}
                {m.program}
                <span className="text-zinc-400">({m.tier})</span>
                <button
                  onClick={() => removeMembership(m.program)}
                  className="ml-0.5 rounded-full p-0.5 hover:bg-blue-500/20 transition-colors cursor-pointer"
                >
                  <X className="h-2.5 w-2.5" />
                </button>
              </Badge>
            </motion.span>
          ))}
        </AnimatePresence>
        {memberships.length === 0 && (
          <p className="text-xs text-zinc-500">
            Add your existing elite statuses to find matching programs
          </p>
        )}
      </div>

      <div className="relative">
        <div className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/50 px-3 py-2">
          <Search className="h-4 w-4 text-zinc-500 shrink-0" />
          <input
            type="text"
            aria-label="Search loyalty programs"
            placeholder="Add a loyalty program..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setOpen(true)
              setSelectedProgram(null)
            }}
            onFocus={() => setOpen(true)}
            className="flex-1 bg-transparent text-sm text-zinc-200 placeholder:text-zinc-500 focus:outline-none"
          />
        </div>

        <AnimatePresence>
          {open && (query || filtered.length > 0 || selectedProgram) && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              className="absolute left-0 right-0 top-full mt-1 rounded-lg border border-zinc-700 bg-zinc-900 shadow-xl z-50 max-h-64 overflow-y-auto"
            >
              {selectedProgram ? (
                <div>
                  <div className="flex items-center gap-2 px-3 py-2 border-b border-zinc-800">
                    <button
                      onClick={() => setSelectedProgram(null)}
                      className="text-xs text-zinc-400 hover:text-zinc-200 cursor-pointer"
                    >
                      Back
                    </button>
                    <span className="text-sm text-zinc-200 font-medium">
                      {selectedProgram.program}
                    </span>
                  </div>
                  {selectedProgram.tiers.map((tier) => (
                    <button
                      key={tier}
                      onClick={() => select(selectedProgram, tier)}
                      className="w-full text-left px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-800 transition-colors flex items-center gap-2 cursor-pointer"
                    >
                      <Plus className="h-3 w-3 text-zinc-500" />
                      {tier}
                    </button>
                  ))}
                </div>
              ) : (
                filtered.map((p) => (
                  <button
                    key={p.program}
                    onClick={() => setSelectedProgram(p)}
                    className="w-full text-left px-3 py-2 text-sm text-zinc-300 hover:bg-zinc-800 transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <span className="text-zinc-500">{catIcons[p.category]}</span>
                    {p.program}
                    <span className="text-zinc-600 ml-auto text-xs">
                      {p.tiers.length} tiers
                    </span>
                  </button>
                ))
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
