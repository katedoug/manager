"use client"

import { Star } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useDemoMode } from "@/context/demo-mode"

const demoDistribution = [
  { stars: 5, count: 212, pct: 68 },
  { stars: 4, count: 69,  pct: 22 },
  { stars: 3, count: 19,  pct: 6  },
  { stars: 2, count: 9,   pct: 3  },
  { stars: 1, count: 3,   pct: 1  },
]

const emptyDistribution = demoDistribution.map(d => ({ ...d, count: 0, pct: 0 }))

const OVERALL = 4.8
const TOTAL   = 312

export function RatingBreakdown() {
  const { isDemoMode } = useDemoMode()
  const distribution = isDemoMode ? demoDistribution : emptyDistribution
  const overall = isDemoMode ? OVERALL : 0
  const total   = isDemoMode ? TOTAL   : 0

  return (
    <Card>
      <CardHeader>
        <CardTitle>Distribución de Calificaciones</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Big score */}
        <div className="flex items-end gap-4">
          <span className="text-6xl font-bold tabular-nums leading-none">{isDemoMode ? overall : "—"}</span>
          <div className="pb-1 space-y-1">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "size-5",
                    isDemoMode && i < Math.round(overall)
                      ? "fill-amber-400 text-amber-400"
                      : "fill-muted text-muted"
                  )}
                />
              ))}
            </div>
            <p className="text-sm text-muted-foreground">{total} reseñas</p>
          </div>
        </div>

        {/* Bar breakdown */}
        <div className="space-y-2">
          {distribution.map(({ stars, count, pct }) => (
            <div key={stars} className="flex items-center gap-3">
              <div className="flex items-center gap-1 w-16 shrink-0">
                <span className="text-sm tabular-nums">{stars}</span>
                <Star className="size-3.5 fill-amber-400 text-amber-400" />
              </div>
              <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full bg-amber-400 transition-all"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="text-sm text-muted-foreground tabular-nums w-8 text-right">{count}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
