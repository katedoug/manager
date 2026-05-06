"use client"

import { Stethoscope } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useDemoMode } from "@/context/demo-mode"

const demoServices = [
  { name: "Consulta General", consultas: 104, ingresos: "$10,192", pct: 42, color: "bg-indigo-500"  },
  { name: "Vacunación",       consultas: 69,  ingresos: "$4,140",  pct: 28, color: "bg-violet-500"  },
  { name: "Limpieza Dental",  consultas: 37,  ingresos: "$5,550",  pct: 15, color: "bg-pink-500"    },
  { name: "Examen de Sangre", consultas: 22,  ingresos: "$2,640",  pct: 9,  color: "bg-teal-500"    },
  { name: "Desparasitación",  consultas: 16,  ingresos: "$1,658",  pct: 6,  color: "bg-orange-500"  },
]

export function TopServices() {
  const { isDemoMode } = useDemoMode()
  const list = isDemoMode ? demoServices : []

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ingresos por Servicio</CardTitle>
        <CardDescription>Desglose del mes actual</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {list.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-10 text-muted-foreground">
            <Stethoscope className="size-8 opacity-30" />
            <p className="text-sm font-medium">Sin servicios registrados</p>
            <p className="text-xs">Los datos aparecerán aquí una vez que proceses tus primeras citas</p>
          </div>
        ) : list.map((s) => (
          <div key={s.name} className="space-y-1.5">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span className={cn("size-2.5 rounded-full shrink-0", s.color)} />
                <span className="font-medium">{s.name}</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <span className="tabular-nums">{s.consultas} consultas</span>
                <span className="font-semibold text-foreground tabular-nums">{s.ingresos}</span>
              </div>
            </div>
            <div className="h-1.5 rounded-full bg-muted overflow-hidden">
              <div
                className={cn("h-full rounded-full transition-all", s.color)}
                style={{ width: `${s.pct}%` }}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
