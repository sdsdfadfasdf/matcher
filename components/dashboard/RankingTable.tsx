"use client"

import { cn, formatPercent, easeLabel, easeColor, easeBg, rateColor } from "@/lib/utils"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { Send, ChevronDown, ChevronRight } from "lucide-react"
import type { Match } from "@/lib/data/matches"
import { useState, Fragment } from "react"
import { EmailModal } from "@/components/ui/EmailModal"
import { findEligibleSources } from "@/lib/eligibility"
import { useFilters } from "@/lib/store"
import { getCommunityData } from "@/lib/community"
import { getFreshness } from "@/lib/freshness"
import { motion } from "motion/react"

export function RankingTable({ matches }: { matches: Match[] }) {
  const [emailMatch, setEmailMatch] = useState<Match | null>(null)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const eligibilityMode = useFilters((s) => s.eligibilityMode)
  const memberships = useFilters((s) => s.memberships)

  if (matches.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-zinc-500">
        <p className="text-lg font-medium">No matches found</p>
        <p className="text-sm">Try changing your filters or adding memberships</p>
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
                <th scope="col" className="py-3 px-4 font-medium w-8"></th>
                <th scope="col" className="py-3 px-4 font-medium">Program</th>
                <th scope="col" className="py-3 px-4 font-medium">Category</th>
                <th scope="col" className="py-3 px-4 font-medium">Match Rate</th>
                <th scope="col" className="py-3 px-4 font-medium">Difficulty</th>
                <th scope="col" className="py-3 px-4 font-medium">Cost</th>
                <th scope="col" className="py-3 px-4 font-medium w-[100px]">Apply</th>
              </tr>
            </thead>
            <tbody>
              {matches.map((m) => {
                const isExpanded = expandedId === m.id
                const communityData = getCommunityData(m.id)
                const freshness = getFreshness(m)
                const effectiveRate = communityData && communityData.communityVotes > 0
                  ? communityData.communityMatchRate
                  : m.matchRate
                const eligibleSources =
                  eligibilityMode && memberships.length > 0
                    ? findEligibleSources(m, memberships)
                    : []

                return (
                  <Fragment key={m.id}>
                    <tr
                      className={cn(
                        "border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors",
                        isExpanded && "bg-zinc-800/20",
                      )}
                    >
                      <td className="py-3 px-4">
                        <button
                          aria-label={isExpanded ? "Collapse details" : "Expand details"}
                          aria-expanded={isExpanded}
                          onClick={() => setExpandedId(isExpanded ? null : m.id)}
                          className="rounded p-0.5 text-zinc-600 hover:text-zinc-400 transition-colors cursor-pointer"
                        >
                          {isExpanded ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronRight className="h-4 w-4" />
                          )}
                        </button>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-zinc-200">{m.program}</span>
                          <span className={cn(
                            "text-[10px]",
                            freshness.variant === "emerald" ? "text-emerald-500" :
                            freshness.variant === "amber" ? "text-amber-500" : "text-red-500",
                          )}>
                            {freshness.label}
                          </span>
                        </div>
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
                              className={cn("h-full rounded-full", rateColor(effectiveRate))}
                              style={{ width: `${effectiveRate}%` }}
                            />
                          </div>
                          <span className="text-zinc-300">{formatPercent(effectiveRate)}</span>
                          {communityData && communityData.communityVotes > 0 && (
                            <span className="text-[10px] text-zinc-600 italic">community</span>
                          )}
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
                    {isExpanded && (
                      <tr className="border-b border-zinc-800/50">
                        <td colSpan={7} className="px-4 py-4">
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-4"
                          >
                            <div>
                              <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                                Requirements
                              </h4>
                              <ul className="list-disc pl-4 text-sm text-zinc-300 space-y-1">
                                {m.requirements.map((r, i) => (
                                  <li key={i}>{r}</li>
                                ))}
                              </ul>
                            </div>

                            {eligibleSources.length > 0 && (
                              <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3">
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

                            <div className="md:col-start-2">
                              <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                                How to Apply
                              </h4>
                              <div className="text-sm text-zinc-300 space-y-1">
                                {m.howToApply.email && (
                                  <p>
                                    Email:{" "}
                                    <a
                                      href={`mailto:${m.howToApply.email}`}
                                      className="text-blue-400 hover:underline"
                                    >
                                      {m.howToApply.email}
                                    </a>
                                  </p>
                                )}
                                {m.howToApply.url && (
                                  <p>
                                    URL:{" "}
                                    <a
                                      href={m.howToApply.url}
                                      target="_blank"
                                      rel="noopener"
                                      className="text-blue-400 hover:underline"
                                    >
                                      {m.howToApply.url}
                                    </a>
                                  </p>
                                )}
                              </div>
                            </div>

                            {m.tips && (
                              <div className={cn("rounded-lg border p-3", easeBg(m.difficulty))}>
                                <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">
                                  Tips from Reports
                                </h4>
                                <p className="text-sm text-zinc-300">{m.tips}</p>
                              </div>
                            )}
                          </motion.div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
