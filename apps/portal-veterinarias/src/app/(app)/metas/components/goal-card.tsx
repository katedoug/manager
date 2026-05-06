"use client"

import { useState } from "react"
import { SlidersHorizontal, TrendingUp, TrendingDown, CheckCircle2, AlertTriangle, XCircle } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Drawer, DrawerClose, DrawerContent, DrawerDescription,
  DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { type Goal, type GoalPeriod, categoryColor, categoryLabel } from "./goals-data"

function getProgress(goal: Goal): number {
  if (goal.higherIsBetter) {
    return Math.min((goal.current / goal.target) * 100, 100)
  }
  // For "lower is better" (cancel rate): progress = how far below the limit we are
  const margin = goal.target - goal.current
  return Math.min(Math.max((margin / goal.target) * 100 + 50, 0), 100)
}

type Status = "exceeded" | "ontrack" | "warning" | "behind"

function getStatus(goal: Goal, pct: number): Status {
  if (goal.higherIsBetter) {
    if (pct >= 100) return "exceeded"
    if (pct >= 75)  return "ontrack"
    if (pct >= 50)  return "warning"
    return "behind"
  } else {
    // lower is better: current <= target is good
    if (goal.current <= goal.target * 0.7)  return "exceeded"
    if (goal.current <= goal.target)         return "ontrack"
    if (goal.current <= goal.target * 1.2)  return "warning"
    return "behind"
  }
}

const statusConfig: Record<Status, { label: string; bar: string; badge: string; icon: typeof TrendingUp }> = {
  exceeded: {
    label: "Superada",
    bar:   "bg-emerald-500",
    badge: "border-emerald-200 bg-emerald-50 text-emerald-700",
    icon:  CheckCircle2,
  },
  ontrack: {
    label: "En camino",
    bar:   "bg-indigo-500",
    badge: "border-indigo-200 bg-indigo-50 text-indigo-700",
    icon:  TrendingUp,
  },
  warning: {
    label: "En riesgo",
    bar:   "bg-amber-400",
    badge: "border-amber-200 bg-amber-50 text-amber-700",
    icon:  AlertTriangle,
  },
  behind: {
    label: "Atrasada",
    bar:   "bg-rose-500",
    badge: "border-rose-200 bg-rose-50 text-rose-700",
    icon:  XCircle,
  },
}

export function GoalCard({ goal }: { goal: Goal }) {
  const [target, setTarget]   = useState(goal.target)
  const [period, setPeriod]   = useState<GoalPeriod>(goal.period)
  const [notes, setNotes]     = useState("")
  const [open, setOpen]       = useState(false)

  const pct    = getProgress({ ...goal, target })
  const status = getStatus({ ...goal, target }, pct)
  const cfg    = statusConfig[status]
  const StatusIcon = cfg.icon

  const formatValue = (v: number) =>
    `${goal.prefix ?? ""}${goal.unit === "%" || goal.unit === "/ 5" ? v : v.toLocaleString("es-MX")}${goal.unit === "%" ? "%" : goal.unit === "/ 5" ? " / 5" : ""}`

  return (
    <Card className="flex flex-col gap-0 p-0 overflow-hidden">
      {/* Color accent top bar */}
      <div className={cn("h-1 w-full", cfg.bar)} />

      <CardHeader className="px-5 pt-4 pb-0 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="flex size-9 items-center justify-center rounded-lg bg-muted shrink-0">
              <goal.icon className="size-4 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm font-semibold leading-tight">{goal.title}</p>
              <Badge variant="outline" className={cn("mt-1 text-xs", categoryColor[goal.category])}>
                {categoryLabel[goal.category]}
              </Badge>
            </div>
          </div>
          <Badge variant="outline" className={cn("text-xs shrink-0", cfg.badge)}>
            <StatusIcon className="size-3 mr-1" />
            {cfg.label}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="px-5 pb-5 pt-4 space-y-4 flex-1 flex flex-col justify-between">
        {/* Values */}
        <div className="space-y-2">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-2xl font-bold tabular-nums leading-none">{formatValue(goal.current)}</p>
              <p className="text-xs text-muted-foreground mt-1">
                de {formatValue(target)} · {period === "mensual" ? "este mes" : "esta semana"}
              </p>
            </div>
            <p className="text-sm font-semibold tabular-nums text-muted-foreground">{Math.round(pct)}%</p>
          </div>
          <Progress value={pct} className={cn("h-2 [&>div]:transition-all", `[&>div]:${cfg.bar}`)} />
        </div>

        {/* Edit button */}
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <Button variant="outline" size="sm" className="w-full cursor-pointer gap-2">
              <SlidersHorizontal className="size-3.5" />
              Editar meta
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="mx-auto w-full max-w-md">
              <DrawerHeader>
                <div className="flex items-center gap-3 mb-1">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
                    <goal.icon className="size-5 text-muted-foreground" />
                  </div>
                  <div>
                    <DrawerTitle>{goal.title}</DrawerTitle>
                    <DrawerDescription className="text-xs">{goal.description}</DrawerDescription>
                  </div>
                </div>
              </DrawerHeader>

              <div className="px-4 space-y-5">
                {/* Current value (read-only) */}
                <div className="rounded-lg bg-muted px-4 py-3 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Valor actual</span>
                  <span className="text-lg font-bold tabular-nums">{formatValue(goal.current)}</span>
                </div>

                {/* Target input */}
                <div className="space-y-2">
                  <Label htmlFor="target-input">
                    {goal.higherIsBetter ? "Meta a alcanzar" : "Máximo permitido"}
                  </Label>
                  <div className="relative">
                    {goal.prefix && (
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                        {goal.prefix}
                      </span>
                    )}
                    <Input
                      id="target-input"
                      type="number"
                      value={target}
                      onChange={(e) => setTarget(Number(e.target.value))}
                      className={cn("tabular-nums", goal.prefix && "pl-7")}
                    />
                    {goal.unit && (
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                        {goal.unit}
                      </span>
                    )}
                  </div>
                </div>

                {/* Period */}
                <div className="space-y-2">
                  <Label>Período</Label>
                  <Select value={period} onValueChange={(v) => setPeriod(v as GoalPeriod)}>
                    <SelectTrigger className="w-full cursor-pointer">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mensual">Mensual</SelectItem>
                      <SelectItem value="semanal">Semanal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Notes */}
                <div className="space-y-2">
                  <Label htmlFor="notes">Notas (opcional)</Label>
                  <Textarea
                    id="notes"
                    placeholder="Ej. Meta ajustada por temporada alta…"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="resize-none"
                    rows={3}
                  />
                </div>
              </div>

              <DrawerFooter className="pt-4">
                <Button className="cursor-pointer" onClick={() => setOpen(false)}>
                  Guardar meta
                </Button>
                <DrawerClose asChild>
                  <Button variant="outline" className="cursor-pointer">Cancelar</Button>
                </DrawerClose>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>
      </CardContent>
    </Card>
  )
}
