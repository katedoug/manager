"use client"

import { useState } from "react"
import { GoalCard } from "./goal-card"
import { SummaryBar } from "./summary-bar"
import { GOALS, type GoalPeriod, type GoalCategory, categoryLabel } from "./goals-data"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { useDemoMode } from "@/context/demo-mode"

const CATEGORIES: GoalCategory[] = ["financiero", "operacional", "pacientes", "servicios"]

function getPct(goal: (typeof GOALS)[0]): number {
  if (goal.higherIsBetter) return Math.min((goal.current / goal.target) * 100, 100)
  const margin = goal.target - goal.current
  return Math.min(Math.max((margin / goal.target) * 100 + 50, 0), 100)
}

function getStatus(goal: (typeof GOALS)[0]) {
  const pct = getPct(goal)
  if (goal.higherIsBetter) {
    if (pct >= 100) return "exceeded"
    if (pct >= 75)  return "ontrack"
    if (pct >= 50)  return "warning"
    return "behind"
  } else {
    if (goal.current <= goal.target * 0.7)  return "exceeded"
    if (goal.current <= goal.target)         return "ontrack"
    if (goal.current <= goal.target * 1.2)  return "warning"
    return "behind"
  }
}

export function GoalsGrid() {
  const [period, setPeriod] = useState<GoalPeriod | "todas">("todas")
  const { isDemoMode } = useDemoMode()

  const source   = isDemoMode ? GOALS : GOALS.map(g => ({ ...g, current: 0 }))
  const filtered = period === "todas" ? source : source.filter(g => g.period === period)

  const statuses = filtered.map(getStatus)
  const counts = {
    exceeded: statuses.filter(s => s === "exceeded").length,
    ontrack:  statuses.filter(s => s === "ontrack").length,
    warning:  statuses.filter(s => s === "warning").length,
    behind:   statuses.filter(s => s === "behind").length,
  }

  return (
    <div className="space-y-6">
      {/* Period filter */}
      <div className="flex items-center gap-1 rounded-lg border bg-muted/40 p-1 w-fit">
        {(["todas", "mensual", "semanal"] as const).map((p) => (
          <Button
            key={p}
            variant="ghost"
            size="lg"
            onClick={() => setPeriod(p)}
            className={cn(
              "cursor-pointer capitalize rounded-md h-7 px-3 text-sm",
              period === p && "bg-background shadow-sm font-semibold text-foreground"
            )}
          >
            {p === "todas" ? "Todas" : p.charAt(0).toUpperCase() + p.slice(1)}
          </Button>
        ))}
      </div>

      {/* Summary */}
      <SummaryBar {...counts} total={filtered.length} />

      {/* Goals by category */}
      {CATEGORIES.map((cat, i) => {
        const goals = filtered.filter(g => g.category === cat)
        if (!goals.length) return null
        return (
          <div key={cat}>
            {i > 0 && <Separator className="mb-6" />}
            <div className="space-y-3">
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                {categoryLabel[cat]}
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {goals.map(g => <GoalCard key={g.id} goal={g} />)}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
