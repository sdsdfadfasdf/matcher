"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "motion/react"
import { X, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { cn, formatPercent } from "@/lib/utils"
import { getCommunityData, invalidateCommunityCache } from "@/lib/community"
import { useFilters } from "@/lib/store"
import type { Match, OutcomeReport, OutcomeResult } from "@/lib/data/matches"

export function OutcomeModal({
  match,
  open,
  onClose,
  editReport,
}: {
  match: Match
  open: boolean
  onClose: () => void
  editReport?: OutcomeReport
}) {
  const addOutcomeReport = useFilters((s) => s.addOutcomeReport)
  const updateOutcomeReport = useFilters((s) => s.updateOutcomeReport)
  const activeProfile = useFilters((s) => s.activeProfile)

  const [outcome, setOutcome] = useState<OutcomeResult | null>(editReport?.outcome ?? null)
  const [tier, setTier] = useState(editReport?.tier ?? "")
  const [notes, setNotes] = useState(editReport?.notes ?? "")
  const [submitted, setSubmitted] = useState(false)

  const communityData = useMemo(() => getCommunityData(match.id), [match.id])

  const isEditing = !!editReport
  const isValid = outcome !== null

  function reset() {
    setOutcome(editReport?.outcome ?? null)
    setTier(editReport?.tier ?? "")
    setNotes(editReport?.notes ?? "")
    setSubmitted(false)
  }

  function handleClose() {
    reset()
    onClose()
  }

  function handleSubmit() {
    if (!outcome) return

    if (isEditing && editReport) {
      updateOutcomeReport(editReport.id, { outcome, tier: tier || undefined, notes: notes || undefined })
    } else {
      const report: OutcomeReport = {
        id: crypto.randomUUID(),
        matchId: match.id,
        outcome,
        timestamp: new Date().toISOString(),
        tier: tier || undefined,
        notes: notes || undefined,
      }
      addOutcomeReport(report)
    }

    invalidateCommunityCache()
    setSubmitted(true)
  }

  function getCountForResult(result: OutcomeResult): number {
    if (!communityData) return 0
    return communityData.communityOutcomes[result]
  }

  const totalCommunityVotes = communityData ? communityData.communityVotes : 0

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={handleClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg rounded-2xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl"
          >
            <button
              aria-label="Close outcome report modal"
              onClick={handleClose}
              className="absolute right-4 top-4 rounded-lg p-1 text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            {!submitted ? (
              <>
                <h2 className="text-lg font-semibold text-zinc-100 mb-1">
                  {isEditing ? "Edit Your Report" : "Report Your Outcome"}
                </h2>
                <p className="text-sm text-zinc-400 mb-4">{match.program}</p>

                {!activeProfile && (
                  <p className="text-xs text-amber-400 mb-4 rounded-lg border border-amber-500/20 bg-amber-500/10 px-3 py-2">
                    Create a profile to track your reports across sessions.
                  </p>
                )}

                <div className="mb-4">
                  <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                    Outcome
                  </p>
                  <div className="flex gap-3">
                    {([
                      { value: "approved" as OutcomeResult, label: "Approved", border: "border-emerald-500/40", bg: "bg-emerald-500/10", text: "text-emerald-400", selected: "border-emerald-400 bg-emerald-500/20" },
                      { value: "denied" as OutcomeResult, label: "Denied", border: "border-red-500/40", bg: "bg-red-500/10", text: "text-red-400", selected: "border-red-400 bg-red-500/20" },
                      { value: "pending" as OutcomeResult, label: "Pending", border: "border-amber-500/40", bg: "bg-amber-500/10", text: "text-amber-400", selected: "border-amber-400 bg-amber-500/20" },
                    ]).map((opt) => (
                      <button
                        key={opt.value}
                        aria-pressed={outcome === opt.value}
                        onClick={() => setOutcome(opt.value)}
                        className={cn(
                          "flex-1 rounded-xl border px-4 py-3 text-sm font-medium transition-all cursor-pointer text-center",
                          outcome === opt.value
                            ? `${opt.selected} ${opt.text}`
                            : `${opt.border} ${opt.bg} ${opt.text} opacity-60 hover:opacity-100`,
                        )}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <input
                    className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-600"
                    placeholder="Your tier (e.g., Hilton Diamond)"
                    value={tier}
                    onChange={(e) => setTier(e.target.value)}
                  />
                  <textarea
                    className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-600 min-h-[80px] resize-y"
                    placeholder="Any tips for the community? (optional)"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>

                <Button
                  variant="primary"
                  size="md"
                  className="w-full"
                  disabled={!isValid}
                  onClick={handleSubmit}
                >
                  {isEditing ? "Update Report" : "Submit Report"}
                </Button>
              </>
            ) : (
              <>
                <div className="flex flex-col items-center text-center py-6">
                  <CheckCircle2 className="h-12 w-12 text-emerald-400 mb-3" />
                  <h2 className="text-lg font-semibold text-zinc-100 mb-1">
                    Your report has been recorded
                  </h2>
                  <p className="text-sm text-zinc-400 mb-6">
                    Thanks for contributing to the community!
                  </p>

                  {totalCommunityVotes > 0 && (
                    <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 w-full mb-6">
                      <div className="text-3xl font-bold text-zinc-100 mb-1">
                        {formatPercent(communityData!.communityMatchRate)}
                      </div>
                      <div className="text-sm text-zinc-400">community match rate</div>
                      <div className="text-xs text-zinc-500 mt-1">
                        Based on {totalCommunityVotes} reports
                      </div>
                      <div className="flex justify-center gap-4 mt-3 text-xs">
                        <span className="text-emerald-400">{getCountForResult("approved")} approved</span>
                        <span className="text-red-400">{getCountForResult("denied")} denied</span>
                        <span className="text-amber-400">{getCountForResult("pending")} pending</span>
                      </div>
                    </div>
                  )}
                </div>

                <Button
                  variant="primary"
                  size="md"
                  className="w-full"
                  onClick={handleClose}
                >
                  Done
                </Button>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
