"use client"

import { cn, formatPercent, easeLabel, easeColor, easeBg, rateColor } from "@/lib/utils"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { Send } from "lucide-react"
import type { Match } from "@/lib/data/matches"
import { useState } from "react"
import { EmailModal } from "@/components/ui/EmailModal"

export function RankingTable({ matches }: { matches: Match[] }) {
  const [emailMatch, setEmailMatch] = useState<Match | null>(null)

  if (matches.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-zinc-500">
        <p className="text-lg font-medium">No matches found</p>
        <p className="text-sm">Try changing your filters</p>
      </div>
    )
  }

  return (
    <>
      {emailMatch && (
        <EmailModal
          match={emailMatch}
          open={!!emailMatch}
          onClose={() => setEmailMatch(null)}
        />
      )}
      <div className="rounded-xl border border-zinc-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-800 text-left text-xs text-zinc-500 uppercase tracking-wider">
                <th className="py-3 px-4 font-medium">Program</th>
                <th className="py-3 px-4 font-medium">Category</th>
                <th className="py-3 px-4 font-medium">Match Rate</th>
                <th className="py-3 px-4 font-medium">Difficulty</th>
                <th className="py-3 px-4 font-medium">Cost</th>
                <th className="py-3 px-4 font-medium w-[100px]">Apply</th>
              </tr>
            </thead>
            <tbody>
              {matches.map((m) => (
                <tr
                  key={m.id}
                  className="border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors"
                >
                  <td className="py-3 px-4">
                    <span className="font-medium text-zinc-200">{m.program}</span>
                  </td>
                  <td className="py-3 px-4">
                    <Badge variant="zinc">
                      {m.category === "airline"
                        ? "Airline"
                        : m.category === "hotel"
                          ? "Hotel"
                          : m.category === "auto"
                            ? "Auto"
                            : "Cruise"}
                    </Badge>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-16 rounded-full bg-zinc-800 overflow-hidden">
                        <div
                          className={cn("h-full rounded-full", rateColor(m.matchRate))}
                          style={{ width: `${m.matchRate}%` }}
                        />
                      </div>
                      <span className="text-zinc-300">{formatPercent(m.matchRate)}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={cn("text-xs font-medium", easeColor(m.difficulty))}>
                      {easeLabel(m.difficulty)}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-zinc-400">{m.cost}</td>
                  <td className="py-3 px-4">
                    <Button
                      variant="success"
                      size="sm"
                      onClick={() => setEmailMatch(m)}
                    >
                      <Send className="h-3 w-3" />
                      Apply
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
