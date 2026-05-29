"use client"

import { useState, useMemo } from "react"
import { motion } from "motion/react"
import { ChevronDown, ChevronUp, Heart, Send, Flag, Plus } from "lucide-react"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { EmailModal } from "@/components/ui/EmailModal"
import { OutcomeModal } from "@/components/ui/OutcomeModal"
import { cn, formatPercent, easeLabel, easeColor, easeBg, rateColor, rateBorder } from "@/lib/utils"
import { getCommunityData } from "@/lib/community"
import { getFreshness, getExpiredFlagCount } from "@/lib/freshness"
import { findEligibleSources } from "@/lib/eligibility"
import { useFilters } from "@/lib/store"
import type { Match } from "@/lib/data/matches"

export function MatchCard({ match }: { match: Match }) {
  const [expanded, setExpanded] = useState(false)
  const [emailOpen, setEmailOpen] = useState(false)
  const [outcomeOpen, setOutcomeOpen] = useState(false)
  const eligibilityMode = useFilters((s) => s.eligibilityMode)
  const communityData = useMemo(() => getCommunityData(match.id), [match.id])
  const effectiveRate = communityData && communityData.communityVotes > 0
    ? communityData.communityMatchRate
    : match.matchRate
  const memberships = useFilters((s) => s.memberships)
  const favorites = useFilters((s) => s.favorites)
  const toggleFavorite = useFilters((s) => s.toggleFavorite)
  const activeProfile = useFilters((s) => s.activeProfile)
  const expiredFlags = useFilters((s) => s.expiredFlags)
  const toggleExpiredFlag = useFilters((s) => s.toggleExpiredFlag)
  const addToPipeline = useFilters((s) => s.addToPipeline)
  const pipeline = useFilters((s) => s.pipeline)

  const isFav = favorites.includes(match.id)
  const freshness = getFreshness(match)
  const isFlagged = expiredFlags.includes(match.id)
  const flagCount = getExpiredFlagCount(match.id)
  const isInPipeline = pipeline.some((p) => p.matchId === match.id)

  const eligibleSources =
    eligibilityMode && memberships.length > 0
      ? findEligibleSources(match, memberships)
      : []

  const d = match.difficulty

  return (
    <>
      <EmailModal match={match} open={emailOpen} onClose={() => setEmailOpen(false)} />
      <OutcomeModal match={match} open={outcomeOpen} onClose={() => setOutcomeOpen(false)} />
      <motion.div
        layout
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        className={cn(
          "rounded-xl border bg-zinc-900/60 overflow-hidden transition-shadow hover:shadow-lg hover:shadow-black/30 hover:border-zinc-700/60",
          rateBorder(effectiveRate),
        )}
      >
        <button
          aria-expanded={expanded}
          onClick={() => setExpanded((v) => !v)}
          className="w-full p-5 text-left cursor-pointer"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-semibold text-zinc-100 truncate" title={match.program}>
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
                {communityData && communityData.communityVotes > 0 && communityData.lastReportDate ? (
                  <Badge variant="emerald">Verified recently</Badge>
                ) : (
                  <Badge variant={freshness.variant}>{freshness.label}</Badge>
                )}
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-500">
                <span className={cn("font-medium", easeColor(d))}>
                  {easeLabel(d)}
                </span>
                <span>|</span>
                <span>{match.cost}</span>
                <span>|</span>
                <span>{communityData && communityData.communityVotes > 0
                  ? `Based on ${communityData.communityVotes} reports`
                  : `${match.votes} reports`}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              {activeProfile && (
                <button
                  aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleFavorite(match.id)
                  }}
                  className={`rounded-lg p-1.5 transition-colors cursor-pointer ${
                    isFav
                      ? "text-rose-400 hover:text-rose-300 bg-rose-500/10"
                      : "text-zinc-600 hover:text-zinc-400"
                  }`}
                >
                  <Heart className={`h-4 w-4 ${isFav ? "fill-rose-400" : ""}`} />
                </button>
              )}
              <div className="text-right">
                <div className="text-lg font-bold text-zinc-100">
                  {formatPercent(effectiveRate)}
                </div>
                <div className="text-xs text-zinc-500">
                  {communityData && communityData.communityVotes > 0 ? "community rate" : "match rate"}
                </div>
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
                className={cn("h-full rounded-full transition-all", rateColor(effectiveRate))}
                style={{ width: `${effectiveRate}%` }}
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
              <ul className="space-y-1 list-disc pl-4 text-sm text-zinc-300">
                {match.requirements.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>

            {eligibleSources && eligibleSources.length > 0 && (
              <div className="mb-4 rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3">
                <h4 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">
                  You Qualify Via
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {eligibleSources.map((s, i) => (
                    <Badge key={i} variant="emerald">
                      {s.program}{s.tier ? ` (${s.tier})` : ""}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

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

            {activeProfile && (
              <div className="mb-4 rounded-lg border border-zinc-800 bg-zinc-900/60 p-3">
                <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                  Share Your Experience
                </h4>
                <p className="text-xs text-zinc-500 mb-3">
                  Help the community by reporting your outcome.
                </p>
                <Button
                  variant="primary"
                  size="sm"
                  className="w-full"
                  onClick={(e) => {
                    e.stopPropagation()
                    setOutcomeOpen(true)
                  }}
                >
                  Report Your Outcome
                </Button>
              </div>
            )}

            {activeProfile && (
              <div className="mb-4">
                {isInPipeline ? (
                  <div className="rounded-lg border border-zinc-700/50 bg-zinc-800/30 p-3 text-center">
                    <p className="text-xs text-emerald-400 font-medium">Added to Pipeline</p>
                    <p className="text-[10px] text-zinc-500 mt-0.5">Track progress in the pipeline board below</p>
                  </div>
                ) : (
                  <Button
                    variant="secondary"
                    size="sm"
                    className="w-full"
                    onClick={(e) => {
                      e.stopPropagation()
                      addToPipeline(match.id)
                    }}
                  >
                    <Plus className="h-4 w-4" />
                    Add to Pipeline
                  </Button>
                )}
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

            {activeProfile && (
              <div className="mt-3 flex items-center justify-between">
                <button
                  aria-label={isFlagged ? "Remove expired flag" : "Flag as expired"}
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleExpiredFlag(match.id)
                  }}
                  className={cn(
                    "flex items-center gap-1.5 text-xs transition-colors cursor-pointer",
                    isFlagged
                      ? "text-red-400 hover:text-red-300"
                      : "text-zinc-600 hover:text-zinc-400",
                  )}
                >
                  <Flag className={`h-3 w-3 ${isFlagged ? "fill-red-400" : ""}`} />
                  {isFlagged ? "Flagged as expired" : "Flag as expired"}
                  {flagCount > 0 && (
                    <span className="text-zinc-600">({flagCount} flagged)</span>
                  )}
                </button>
              </div>
            )}
          </motion.div>
        )}
      </motion.div>
    </>
  )
}
