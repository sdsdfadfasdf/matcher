"use client"

import { useMemo } from "react"
import { motion } from "motion/react"
import { X } from "lucide-react"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { useFilters } from "@/lib/store"
import { matches } from "@/lib/data/matches"
import type { PipelineStage, PipelineItem } from "@/lib/data/matches"

const columns: { stage: PipelineStage; label: string; color: string }[] = [
  { stage: "planning", label: "Planning", color: "border-zinc-600" },
  { stage: "applied", label: "Applied", color: "border-[#0066b1]" },
  { stage: "approved", label: "Approved", color: "border-[#1c69d4]" },
  { stage: "denied", label: "Denied", color: "border-[#e22718]" },
]

const stageBg: Record<PipelineStage, string> = {
  planning: "bg-[#1a1a1a]",
  applied: "bg-[#1a1a1a]",
  approved: "bg-[#1a1a1a]",
  denied: "bg-[#1a1a1a]",
}

const stageBadge: Record<PipelineStage, "zinc" | "blue" | "emerald" | "red"> = {
  planning: "zinc",
  applied: "blue",
  approved: "emerald",
  denied: "red",
}

function getMatchProgram(matchId: string): { program: string; category: string } | null {
  const m = matches.find((m) => m.id === matchId)
  if (!m) return null
  return { program: m.program, category: m.category }
}

export function ApplicationPipeline() {
  const pipeline = useFilters((s) => s.pipeline)
  const movePipelineItem = useFilters((s) => s.movePipelineItem)
  const removePipelineItem = useFilters((s) => s.removePipelineItem)

  const grouped = useMemo(() => {
    const map: Record<PipelineStage, PipelineItem[]> = {
      planning: [],
      applied: [],
      approved: [],
      denied: [],
    }
    for (const item of pipeline) {
      if (map[item.stage]) {
        map[item.stage].push(item)
      } else {
        map.planning.push(item)
      }
    }
    return map
  }, [pipeline])

  const total = pipeline.length

  if (total === 0) {
    return (
      <div className="border border-[#3c3c3c] bg-[#1a1a1a] p-6">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
          Application Pipeline
        </h3>
        <p className="text-sm text-zinc-600">
          No tracked applications. Click &ldquo;Add to Pipeline&rdquo; on any match to start tracking.
        </p>
      </div>
    )
  }

  const renderItem = (item: PipelineItem) => {
    const info = getMatchProgram(item.matchId)
    if (!info) return null

    return (
      <motion.div
        key={item.id}
        layout
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="border border-[#3c3c3c] bg-black/40 p-3 text-sm"
      >
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <p className="font-medium text-zinc-200 truncate" title={info.program}>
              {info.program}
            </p>
            <div className="flex items-center gap-1.5 mt-1">
              <Badge variant="zinc">
                {info.category === "airline"
                  ? "Airline"
                  : info.category === "hotel"
                    ? "Hotel"
                    : info.category === "auto"
                      ? "Auto"
                      : "Cruise"}
              </Badge>
              <span className="text-[10px] text-zinc-600">
                {new Date(item.addedAt).toLocaleDateString()}
              </span>
            </div>
          </div>
          <button
            aria-label="Remove from pipeline"
            onClick={() => removePipelineItem(item.id)}
            className="rounded p-0.5 text-zinc-600 hover:text-zinc-400 transition-colors cursor-pointer shrink-0"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>

        {item.notes && (
          <p className="mt-2 text-xs text-zinc-500 line-clamp-2">{item.notes}</p>
        )}

        <div className="mt-2">
          <select
            value={item.stage}
            onChange={(e) => movePipelineItem(item.id, e.target.value as PipelineStage)}
            className="w-full border border-[#3c3c3c] bg-black px-2 py-1 text-xs text-zinc-300 cursor-pointer"
          >
            {columns.map((col) => (
              <option key={col.stage} value={col.stage}>
                {col.label}
              </option>
            ))}
          </select>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="border border-[#3c3c3c] bg-[#1a1a1a] p-6">
      <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
        Application Pipeline
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {columns.map((col) => {
          const items = grouped[col.stage]
          return (
            <div
              key={col.stage}
              className={`border-t-2 ${col.color} ${stageBg[col.stage]} p-3`}
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                  {col.label}
                </h4>
                <span className="text-xs text-zinc-600">{items.length}</span>
              </div>
              <div className="space-y-2">
                {items.length === 0 ? (
                  <p className="text-xs text-zinc-600 text-center py-6">No applications</p>
                ) : (
                  items.map(renderItem)
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
