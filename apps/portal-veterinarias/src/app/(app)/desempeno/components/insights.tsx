"use client"

import { TrendingUp, AlertTriangle, CheckCircle2, Users, Calendar, Lightbulb } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useDemoMode } from "@/context/demo-mode"

const demoInsights = [
  { type: "success", icon: TrendingUp,    title: "Ingresos superan la meta",           desc: "Llevas $2,180 por encima del objetivo mensual. Vas en camino a tu mejor mes histórico." },
  { type: "success", icon: CheckCircle2,  title: "Cancel Rate bajo control",            desc: "7.4% — 2.6 puntos por debajo del umbral crítico. Mantén la confirmación automática de citas." },
  { type: "warning", icon: Users,         title: "5 pacientes sin visita en 90+ días",  desc: "Rocky Pérez, Lola Vega y 3 más no han regresado. Considera enviar un recordatorio proactivo." },
  { type: "warning", icon: Calendar,      title: "Martes y miércoles con baja ocupación", desc: "Esos días promedian 5 consultas vs 10 el resto de la semana. Considera promociones o disponibilidad ampliada." },
  { type: "success", icon: CheckCircle2,  title: "Retención en máximo histórico",       desc: "87.4% de clientes regresan — por encima del objetivo trimestral del 85%." },
  { type: "warning", icon: AlertTriangle, title: "Limpieza Dental: alta demanda, pocos slots", desc: "22 solicitudes rechazadas este mes por falta de disponibilidad. Evalúa agregar un turno." },
]

const styles = {
  success: {
    card:  "border-green-100 bg-green-50/50 dark:border-green-900/30 dark:bg-green-950/20",
    icon:  "text-green-600 bg-green-100 dark:bg-green-900/40",
    title: "text-green-800 dark:text-green-300",
  },
  warning: {
    card:  "border-amber-100 bg-amber-50/50 dark:border-amber-900/30 dark:bg-amber-950/20",
    icon:  "text-amber-600 bg-amber-100 dark:bg-amber-900/40",
    title: "text-amber-800 dark:text-amber-300",
  },
}

export function Insights() {
  const { isDemoMode } = useDemoMode()
  const list = isDemoMode ? demoInsights : []

  return (
    <Card>
      <CardHeader>
        <CardTitle>Áreas de Mejora</CardTitle>
        <CardDescription>Recomendaciones basadas en tu actividad del mes</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-3 sm:grid-cols-2">
        {list.length === 0 ? (
          <div className="sm:col-span-2 flex flex-col items-center gap-2 py-10 text-muted-foreground">
            <Lightbulb className="size-8 opacity-30" />
            <p className="text-sm font-medium">Sin recomendaciones aún</p>
            <p className="text-xs">Las sugerencias aparecerán una vez que tengas actividad registrada</p>
          </div>
        ) : list.map((insight) => {
          const s = styles[insight.type as keyof typeof styles]
          return (
            <div
              key={insight.title}
              className={cn("flex gap-3 rounded-lg border p-3.5", s.card)}
            >
              <div className={cn("mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md", s.icon)}>
                <insight.icon className="size-4" />
              </div>
              <div className="space-y-0.5">
                <p className={cn("text-sm font-semibold leading-snug", s.title)}>{insight.title}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{insight.desc}</p>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
