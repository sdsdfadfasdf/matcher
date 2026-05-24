"use client"

import { motion, AnimatePresence } from "motion/react"
import { MatchCard } from "@/components/dashboard/MatchCard"
import type { Match } from "@/lib/data/matches"

export function MatchGrid({ matches }: { matches: Match[] }) {
  if (matches.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-zinc-500">
        <p className="text-lg font-medium">No matches found</p>
        <p className="text-sm">Try changing your filters</p>
      </div>
    )
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <AnimatePresence mode="popLayout">
        {matches.map((m, i) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ delay: i * 0.05 }}
          >
            <MatchCard match={m} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
