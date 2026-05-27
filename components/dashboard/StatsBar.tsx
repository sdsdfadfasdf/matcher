"use client"

import { useMemo } from "react"
import { TrendingUp, Award, Zap, DollarSign, Users } from "lucide-react"
import { Card } from "@/components/ui/Card"
import { matches } from "@/lib/data/matches"
import { computeAllCommunityData, getTotalCommunityReports } from "@/lib/community"

function getStats() {
  const communityData = computeAllCommunityData()

  let bestRate = 0
  let bestProgram = ""
  matches.forEach((m) => {
    const cd = communityData.get(m.id)
    const rate = cd && cd.communityVotes > 0 ? cd.communityMatchRate : m.matchRate
    if (rate > bestRate) {
      bestRate = rate
      bestProgram = m.program
    }
  })

  const easyByCategory: Record<string, number> = {}
  matches.filter((m) => m.difficulty === "easy").forEach((m) => {
    easyByCategory[m.category] = (easyByCategory[m.category] || 0) + 1
  })
  let easiestCategory = "hotel"
  let maxCount = 0
  for (const [cat, count] of Object.entries(easyByCategory)) {
    if (count > maxCount) { easiestCategory = cat; maxCount = count }
  }
  const categoryLabel = easiestCategory === "airline" ? "Airline"
    : easiestCategory === "auto" ? "Auto"
    : easiestCategory === "cruise" ? "Cruise" : "Hotel"

  return [
    {
      label: "Total Programs",
      value: matches.length,
      icon: Award,
      color: "text-amber-400",
      bg: "bg-amber-500/10",
    },
    {
      label: "Best Match Rate",
      value: `${Math.round(bestRate)}%`,
      detail: bestProgram,
      icon: TrendingUp,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
    },
    {
      label: "Easiest Category",
      value: categoryLabel,
      detail: `${maxCount} easy matches`,
      icon: Zap,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
    },
    {
      label: "Free Matches",
      value: matches.filter((m) => m.cost === "Free").length,
      detail: "No cost to apply",
      icon: DollarSign,
      color: "text-violet-400",
      bg: "bg-violet-500/10",
    },
    {
      label: "Community Reports",
      value: getTotalCommunityReports(),
      icon: Users,
      color: "text-purple-400",
      bg: "bg-purple-500/10",
    },
  ]
}

export function StatsBar() {
  const stats = useMemo(() => getStats(), [])
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((s) => (
        <Card key={s.label} className="flex items-center gap-4">
          <div className={`rounded-lg p-2.5 ${s.bg}`}>
            <s.icon className={`h-5 w-5 ${s.color}`} />
          </div>
          <div>
            <div className="text-2xl font-bold text-zinc-100">{s.value}</div>
            <div className="text-xs text-zinc-400">{s.label}</div>
            {s.detail && (
              <div className="text-xs text-zinc-500 mt-0.5">{s.detail}</div>
            )}
          </div>
        </Card>
      ))}
    </div>
  )
}
