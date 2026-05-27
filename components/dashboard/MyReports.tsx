"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { ChevronDown, ChevronRight, Trash2, Pencil } from "lucide-react"
import { Card } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { OutcomeModal } from "@/components/ui/OutcomeModal"
import { matches } from "@/lib/data/matches"
import { useFilters } from "@/lib/store"
import type { OutcomeReport } from "@/lib/data/matches"

export function MyReports() {
  const outcomeReports = useFilters((s) => s.outcomeReports)
  const removeOutcomeReport = useFilters((s) => s.removeOutcomeReport)
  const activeProfile = useFilters((s) => s.activeProfile)
  const [expanded, setExpanded] = useState(false)
  const [editingReport, setEditingReport] = useState<OutcomeReport | null>(null)

  if (!activeProfile) {
    return (
      <Card className="p-4">
        <p className="text-sm text-zinc-500 text-center">
          Create a profile to track your status match reports.
        </p>
      </Card>
    )
  }

  if (outcomeReports.length === 0) return null

  function getMatchProgram(matchId: string): string {
    return matches.find((m) => m.id === matchId)?.program ?? matchId
  }

  function handleDelete(reportId: string) {
    if (!window.confirm("Delete this report? This cannot be undone.")) return
    removeOutcomeReport(reportId)
  }

  const outcomeBadge = (outcome: OutcomeReport["outcome"]) => {
    switch (outcome) {
      case "approved":
        return { variant: "emerald" as const, label: "Approved" }
      case "denied":
        return { variant: "red" as const, label: "Denied" }
      case "pending":
        return { variant: "amber" as const, label: "Pending" }
    }
  }

  return (
    <>
      {editingReport && (
        <OutcomeModal
          match={matches.find((m) => m.id === editingReport.matchId) ?? matches[0]}
          open={!!editingReport}
          onClose={() => setEditingReport(null)}
          editReport={editingReport}
        />
      )}

      <Card className="space-y-2">
        <button
          aria-expanded={expanded}
          onClick={() => setExpanded((v) => !v)}
          className="w-full flex items-center justify-between gap-2 px-4 pt-4 pb-2 text-left cursor-pointer"
        >
          <h3 className="text-sm font-semibold text-zinc-200">
            My Reports ({outcomeReports.length})
          </h3>
          {expanded ? (
            <ChevronDown className="h-4 w-4 text-zinc-500 shrink-0" />
          ) : (
            <ChevronRight className="h-4 w-4 text-zinc-500 shrink-0" />
          )}
        </button>

        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="px-4 pb-4 space-y-2"
          >
            {outcomeReports.map((r) => {
              const badge = outcomeBadge(r.outcome)
              return (
                <div
                  key={r.id}
                  className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-3 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Badge variant={badge.variant}>{badge.label}</Badge>
                    <span className="text-sm text-zinc-300 truncate">
                      {getMatchProgram(r.matchId)}
                    </span>
                    {r.tier && (
                      <span className="text-xs text-zinc-500 hidden sm:inline">
                        as {r.tier}
                      </span>
                    )}
                    <span className="text-xs text-zinc-600 hidden sm:inline">
                      {new Date(r.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <button
                      aria-label="Edit report"
                      onClick={() => setEditingReport(r)}
                      className="rounded p-1.5 text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </button>
                    <button
                      aria-label="Delete report"
                      onClick={() => handleDelete(r.id)}
                      className="rounded p-1.5 text-zinc-500 hover:text-red-400 transition-colors cursor-pointer"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              )
            })}
          </motion.div>
        )}
      </Card>
    </>
  )
}
