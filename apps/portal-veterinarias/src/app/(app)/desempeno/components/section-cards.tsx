"use client"

import { DollarSign, CalendarCheck, XCircle, RefreshCcw, TrendingUp, TrendingDown } from "lucide-react"
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useDemoMode } from "@/context/demo-mode"

const CANCEL_RATE = 7.4

const demoMetrics = [
  { title: "Ingresos del Mes",      value: "$24,180",          change: "+11.3%",                                                                  trend: "up"   as const, isCancelRate: false, icon: DollarSign,   footer: "Por encima del mes anterior",                             subfooter: "Meta mensual: $22,000"        },
  { title: "Consultas Realizadas",  value: "248",              change: "+8.2%",                                                                   trend: "up"   as const, isCancelRate: false, icon: CalendarCheck, footer: "Máximo histórico este mes",                             subfooter: "Promedio diario: 8.3 consultas" },
  { title: "Cancel Rate",           value: `${CANCEL_RATE}%`,  change: CANCEL_RATE >= 10 ? `+${CANCEL_RATE}%` : `-${(10 - CANCEL_RATE).toFixed(1)}pp bajo umbral`, trend: (CANCEL_RATE >= 10 ? "up" : "down") as "up" | "down", isCancelRate: true,  icon: XCircle, footer: CANCEL_RATE >= 10 ? "Requiere atención inmediata" : "Dentro del rango aceptable", subfooter: "Umbral crítico: 10%" },
  { title: "Tasa de Retención",     value: "87.4%",            change: "+5.6%",                                                                   trend: "up"   as const, isCancelRate: false, icon: RefreshCcw,   footer: "Clientes que regresan",                                   subfooter: "Objetivo trimestral: 85%"     },
]

const emptyMetrics = [
  { title: "Ingresos del Mes",      value: "$0", change: "—", trend: "up"   as const, isCancelRate: false, icon: DollarSign,   footer: "Sin actividad este mes",    subfooter: "—" },
  { title: "Consultas Realizadas",  value: "0",  change: "—", trend: "up"   as const, isCancelRate: false, icon: CalendarCheck, footer: "Sin consultas registradas", subfooter: "—" },
  { title: "Cancel Rate",           value: "—",  change: "—", trend: "down" as const, isCancelRate: false, icon: XCircle,      footer: "Sin datos disponibles",     subfooter: "Umbral crítico: 10%" },
  { title: "Tasa de Retención",     value: "—",  change: "—", trend: "up"   as const, isCancelRate: false, icon: RefreshCcw,   footer: "Sin datos disponibles",     subfooter: "—" },
]

export function SectionCards() {
  const { isDemoMode } = useDemoMode()
  const metrics = isDemoMode ? demoMetrics : emptyMetrics

  return (
    <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 sm:grid-cols-2 xl:grid-cols-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs dark:*:data-[slot=card]:bg-card">
      {metrics.map((m) => {
        const TrendIcon = m.trend === "up" ? TrendingUp : TrendingDown
        const cancelBadge = m.isCancelRate
          ? CANCEL_RATE >= 10
            ? "border-red-200 bg-red-50 text-red-700"
            : "border-green-200 bg-green-50 text-green-700"
          : ""

        return (
          <Card key={m.title} className="@container/card">
            <CardHeader>
              <CardDescription className="flex items-center gap-1.5">
                <m.icon className="size-4" />
                {m.title}
              </CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                {m.value}
              </CardTitle>
              <CardAction>
                <Badge variant="outline" className={cn(cancelBadge)}>
                  <TrendIcon className="size-3" />
                  {m.change}
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium">
                {m.footer} <TrendIcon className="size-4" />
              </div>
              <div className="text-muted-foreground">{m.subfooter}</div>
            </CardFooter>
          </Card>
        )
      })}
    </div>
  )
}
