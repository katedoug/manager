"use client"

import { TrendingUp, TrendingDown, DollarSign, Users, CalendarCheck, HeartPulse } from "lucide-react"
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useDemoMode } from "@/context/demo-mode"

const demoMetrics = [
  { title: "Ingresos del Mes",   value: "$18,450", change: "+8.2%",  trend: "up"   as const, icon: DollarSign,   footer: "Tendencia al alza este mes",       subfooter: "Ingresos de los últimos 6 meses" },
  { title: "Pacientes Activos",  value: "1,285",   change: "+12.4%", trend: "up"   as const, icon: Users,        footer: "Excelente retención de pacientes",  subfooter: "Supera los objetivos del periodo" },
  { title: "Consultas del Mes",  value: "384",     change: "-3.1%",  trend: "down" as const, icon: CalendarCheck, footer: "Bajó 3% este periodo",             subfooter: "Revisar disponibilidad de agenda" },
  { title: "Tasa de Retención",  value: "87.4%",   change: "+5.6%",  trend: "up"   as const, icon: HeartPulse,   footer: "Rendimiento estable en aumento",    subfooter: "Cumple con proyecciones clínicas" },
]

const emptyMetrics = [
  { title: "Ingresos del Mes",  value: "$0", change: "—", trend: "up"   as const, icon: DollarSign,   footer: "Sin actividad este mes",        subfooter: "—" },
  { title: "Pacientes Activos", value: "0",  change: "—", trend: "up"   as const, icon: Users,        footer: "Sin pacientes registrados",     subfooter: "—" },
  { title: "Consultas del Mes", value: "0",  change: "—", trend: "down" as const, icon: CalendarCheck, footer: "Sin consultas registradas",    subfooter: "—" },
  { title: "Tasa de Retención", value: "—",  change: "—", trend: "up"   as const, icon: HeartPulse,   footer: "Sin datos disponibles",         subfooter: "—" },
]

export function MetricsOverview() {
  const { isDemoMode } = useDemoMode()
  const metrics = isDemoMode ? demoMetrics : emptyMetrics

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs grid gap-4 sm:grid-cols-2 @5xl:grid-cols-4">
      {metrics.map((metric) => {
        const TrendIcon = metric.trend === "up" ? TrendingUp : TrendingDown

        return (
          <Card key={metric.title}>
            <CardHeader>
              <CardDescription>{metric.title}</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                {metric.value}
              </CardTitle>
              <CardAction>
                <Badge variant="outline">
                  <TrendIcon className="h-4 w-4" />
                  {metric.change}
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium">
                {metric.footer} <TrendIcon className="size-4" />
              </div>
              <div className="text-muted-foreground">{metric.subfooter}</div>
            </CardFooter>
          </Card>
        )
      })}
    </div>
  )
}
