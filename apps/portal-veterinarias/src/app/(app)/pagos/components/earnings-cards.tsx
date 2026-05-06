"use client"

import { DollarSign, TrendingUp, TrendingDown, Percent, Banknote, Receipt } from "lucide-react"
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useDemoMode } from "@/context/demo-mode"

const demoMetrics = [
  { title: "Ingresos brutos",      value: "$24,180", change: "+11.3%",    trend: "up"      as const, icon: DollarSign, footer: "Total facturado este mes",      subfooter: "248 consultas · mayo 2025" },
  { title: "Comisión plataforma",  value: "$1,934",  change: "8% s/brutos",trend: "neutral" as const, icon: Percent,    footer: "Tarifa mensual Kate&Doug",      subfooter: "Incluye procesamiento de pagos" },
  { title: "Impuestos retenidos",  value: "$2,659",  change: "IVA 16%",   trend: "neutral" as const, icon: Receipt,    footer: "Retención fiscal del período",   subfooter: "CFDI generado automáticamente" },
  { title: "Pago neto del mes",    value: "$19,587", change: "+9.8%",     trend: "up"      as const, icon: Banknote,   footer: "Transferido a tu cuenta",        subfooter: "BBVA ••••4821" },
]

const emptyMetrics = [
  { title: "Ingresos brutos",      value: "$0",  change: "—", trend: "neutral" as const, icon: DollarSign, footer: "Sin actividad este mes",   subfooter: "—" },
  { title: "Comisión plataforma",  value: "$0",  change: "—", trend: "neutral" as const, icon: Percent,    footer: "Tarifa mensual Kate&Doug", subfooter: "—" },
  { title: "Impuestos retenidos",  value: "$0",  change: "—", trend: "neutral" as const, icon: Receipt,    footer: "Sin retenciones",          subfooter: "—" },
  { title: "Pago neto del mes",    value: "$0",  change: "—", trend: "neutral" as const, icon: Banknote,   footer: "Sin transferencias",        subfooter: "—" },
]

export function EarningsCards() {
  const { isDemoMode } = useDemoMode()
  const metrics = isDemoMode ? demoMetrics : emptyMetrics

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs dark:*:data-[slot=card]:bg-card">
      {metrics.map((m) => {
        const TrendIcon = m.trend === "up" ? TrendingUp : m.trend === "down" ? TrendingDown : TrendingUp
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
                <Badge variant="outline">
                  {m.trend !== "neutral" && <TrendIcon className="size-3" />}
                  {m.change}
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium">{m.footer}</div>
              <div className="text-muted-foreground">{m.subfooter}</div>
            </CardFooter>
          </Card>
        )
      })}
    </div>
  )
}
