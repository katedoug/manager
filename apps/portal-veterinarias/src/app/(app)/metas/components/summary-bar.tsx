import { CheckCircle2, TrendingUp, AlertTriangle, XCircle } from "lucide-react"
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type Props = {
  exceeded: number
  ontrack:  number
  warning:  number
  behind:   number
  total:    number
}

const items = [
  { key: "exceeded", label: "Superadas",  sub: "Meta alcanzada",    icon: CheckCircle2, badge: "", trend: "up"   },
  { key: "ontrack",  label: "En camino",  sub: "Progreso saludable", icon: TrendingUp,   badge: "", trend: "up"   },
  { key: "warning",  label: "En riesgo",  sub: "Requiere atención",  icon: AlertTriangle,badge: "", trend: "down" },
  { key: "behind",   label: "Atrasadas",  sub: "Acción inmediata",   icon: XCircle,      badge: "", trend: "down" },
] as const

export function SummaryBar({ exceeded, ontrack, warning, behind, total }: Props) {
  const values = { exceeded, ontrack, warning, behind }

  return (
    <div className="grid grid-cols-2 gap-4 xl:grid-cols-4 *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs dark:*:data-[slot=card]:bg-card">
      {items.map(({ key, label, sub, icon: Icon, trend }) => {
        const value = values[key]
        const pct   = total > 0 ? Math.round((value / total) * 100) : 0
        const isUp  = trend === "up"

        return (
          <Card key={key} className="@container/card">
            <CardHeader>
              <CardDescription className="flex items-center gap-1.5">
                <Icon className="size-4" />
                {label}
              </CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                {value}
              </CardTitle>
              <CardAction>
                <Badge variant="outline">
                  {isUp
                    ? <TrendingUp className="size-3" />
                    : <AlertTriangle className="size-3" />
                  }
                  {pct}%
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium">
                {sub}
              </div>
              <div className="text-muted-foreground">
                {value} de {total} metas
              </div>
            </CardFooter>
          </Card>
        )
      })}
    </div>
  )
}
