"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { ChevronDown, ChevronUp, Star, Send } from "lucide-react"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { EmailModal } from "@/components/ui/EmailModal"
import { cn, formatPercent, easeLabel, easeColor, easeBg, rateColor, rateBorder } from "@/lib/utils"
import type { Match } from "@/lib/data/matches"

export function MatchCard({ match }: { match: Match }) {
  const [expanded, setExpanded] = useState(false)
  const [emailOpen, setEmailOpen] = useState(false)

  const d = match.difficulty

  return (
    <>
      <EmailModal match={match} open={emailOpen} onClose={() => setEmailOpen(false)} />
      <motion.div
        layout
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        className={cn(
          "rounded-xl border bg-zinc-900/60 backdrop-blur-sm overflow-hidden transition-shadow hover:shadow-lg hover:shadow-zinc-900/50",
          rateBorder(match.matchRate),
        )}
      >
        <button
          onClick={() => setExpanded((v) => !v)}
          className="w-full p-5 text-left cursor-pointer"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-semibold text-zinc-100 truncate">
                  {match.program}
                </span>
                <Badge variant="zinc">
                  {match.category === "airline"
                    ? "Airline"
                    : match.category === "hotel"
                      ? "Hotel"
                      : match.category === "auto"
                        ? "Auto"
                        : "Cruise"}
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-500">
                <span className={cn("font-medium", easeColor(d))}>
                  {easeLabel(d)}
                </span>
                <span>|</span>
                <span>{match.cost}</span>
                <span>|</span>
                <span>{match.votes} reports</span>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="text-right">
                <div className="text-lg font-bold text-zinc-100">
                  {formatPercent(match.matchRate)}
                </div>
                <div className="text-xs text-zinc-500">match rate</div>
              </div>
              {expanded ? (
                <ChevronUp className="h-4 w-4 text-zinc-500" />
              ) : (
                <ChevronDown className="h-4 w-4 text-zinc-500" />
              )}
            </div>
          </div>

          <div className="mt-3">
            <div className="h-1.5 rounded-full bg-zinc-800 overflow-hidden">
              <div
                className={cn("h-full rounded-full transition-all", rateColor(match.matchRate))}
                style={{ width: `${match.matchRate}%` }}
              />
            </div>
          </div>
        </button>

        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="px-5 pb-5 border-t border-zinc-800/50 pt-4"
          >
            <div className="mb-4">
              <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                Requirements
              </h4>
              <ul className="space-y-1">
                {match.requirements.map((r, i) => (
                  <li key={i} className="text-sm text-zinc-300 flex items-start gap-2">
                    <span className="text-zinc-500 mt-[-1px]">-</span>
                    {r}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-4">
              <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                How to Apply
              </h4>
              <div className="text-sm text-zinc-300 space-y-1">
                {match.howToApply.email && (
                  <p>
                    Email:{" "}
                    <span className="text-blue-400">{match.howToApply.email}</span>
                  </p>
                )}
                {match.howToApply.url && (
                  <p>
                    URL:{" "}
                    <a
                      href={match.howToApply.url}
                      target="_blank"
                      rel="noopener"
                      className="text-blue-400 hover:underline"
                    >
                      {match.howToApply.url}
                    </a>
                  </p>
                )}
              </div>
            </div>

            {match.tips && (
              <div className={cn("rounded-lg border p-3 mb-4", easeBg(d))}>
                <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">
                  Tips from Reports
                </h4>
                <p className="text-sm text-zinc-300">{match.tips}</p>
              </div>
            )}

            <Button
              variant="success"
              size="md"
              className="w-full"
              onClick={() => setEmailOpen(true)}
            >
              <Send className="h-4 w-4" />
              Compose Email
            </Button>
          </motion.div>
        )}
      </motion.div>
    </>
  )
}
