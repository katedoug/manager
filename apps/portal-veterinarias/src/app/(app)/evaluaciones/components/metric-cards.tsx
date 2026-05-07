"use client"

import { Star, XCircle, ThumbsUp, MessageSquare, TrendingUp, TrendingDown } from "lucide-react"
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useDemoMode } from "@/context/demo-mode"

const CANCEL_RATE = 7.4
const APPROVAL_RATE = 94.2

const demoMetrics = [
  { title: "Calificación",   value: "4.8",             suffix: "/ 5", change: "+0.2 vs mes anterior",                                                              trend: "up"   as const, isCancelRate: false, icon: Star,        footer: "Excelente nivel de satisfacción",   subfooter: "Basado en 312 reseñas"      },
  { title: "Cancel Rate",    value: `${CANCEL_RATE}%`,  suffix: "",    change: CANCEL_RATE >= 10 ? "Por encima del umbral" : `${(10 - CANCEL_RATE).toFixed(1)}pp bajo el umbral`, trend: (CANCEL_RATE >= 10 ? "up" : "down") as "up" | "down", isCancelRate: true, icon: XCircle, footer: CANCEL_RATE >= 10 ? "Requiere atención inmediata" : "Dentro del rango aceptable", subfooter: "Umbral crítico: 10%" },
  { title: "Approval Rate",  value: `${APPROVAL_RATE}%`, suffix: "",  change: "+2.1% vs mes anterior",                                                             trend: "up"   as const, isCancelRate: false, icon: ThumbsUp,    footer: "Alta aprobación de clientes",       subfooter: "Clientes que regresan: 87%" },
  { title: "Total Reseñas",  value: "312",              suffix: "",    change: "+28 este mes",                                                                      trend: "up"   as const, isCancelRate: false, icon: MessageSquare, footer: "Incremento constante",             subfooter: "Promedio: 52 reseñas/mes"   },
]

const emptyMetrics = [
  { title: "Calificación",  value: "—",  suffix: "/ 5", change: "—", trend: "up"   as const, isCancelRate: false, icon: Star,         footer: "Sin reseñas aún",           subfooter: "—" },
  { title: "Cancel Rate",   value: "—",  suffix: "",    change: "—", trend: "down" as const, isCancelRate: false, icon: XCircle,      footer: "Sin datos disponibles",     subfooter: "Umbral crítico: 10%" },
  { title: "Approval Rate", value: "—",  suffix: "",    change: "—", trend: "up"   as const, isCancelRate: false, icon: ThumbsUp,     footer: "Sin datos disponibles",     subfooter: "—" },
  { title: "Total Reseñas", value: "0",  suffix: "",    change: "—", trend: "up"   as const, isCancelRate: false, icon: MessageSquare, footer: "Sin reseñas registradas",  subfooter: "—" },
]

export function MetricCards() {
  const { isDemoMode } = useDemoMode()
  const metrics = isDemoMode ? demoMetrics : emptyMetrics

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs dark:*:data-[slot=card]:bg-card">
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
                {m.suffix && <span className="text-base font-normal text-muted-foreground ml-1">{m.suffix}</span>}
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
