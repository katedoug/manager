"use client"

import { Eye, Star, TrendingUp, Stethoscope } from "lucide-react"
import { useDemoMode } from "@/context/demo-mode"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

const services = [
  {
    id: 1,
    name: "Consulta General",
    appointments: 142,
    revenue: "$63,900",
    growth: "+18%",
    rating: 4.9,
    capacity: 95,
    category: "Consulta",
  },
  {
    id: 2,
    name: "Vacunación Completa",
    appointments: 98,
    revenue: "$31,360",
    growth: "+23%",
    rating: 4.8,
    capacity: 82,
    category: "Prevención",
  },
  {
    id: 3,
    name: "Examen de Laboratorio",
    appointments: 67,
    revenue: "$52,260",
    growth: "+12%",
    rating: 4.7,
    capacity: 70,
    category: "Diagnóstico",
  },
  {
    id: 4,
    name: "Cirugía Menor",
    appointments: 31,
    revenue: "$37,200",
    growth: "+8%",
    rating: 4.9,
    capacity: 52,
    category: "Cirugía",
  },
  {
    id: 5,
    name: "Desparasitación",
    appointments: 189,
    revenue: "$37,800",
    growth: "+31%",
    rating: 4.6,
    capacity: 100,
    category: "Prevención",
  },
]

export function TopProducts() {
  const { isDemoMode } = useDemoMode()
  const list = isDemoMode ? services : []

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div>
          <CardTitle>Servicios Principales</CardTitle>
          <CardDescription>Servicios con mejor rendimiento este mes</CardDescription>
        </div>
        <Button variant="outline" size="sm">
          <Eye className="h-4 w-4 mr-2" />
          Ver Todos
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {list.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-10 text-muted-foreground">
            <Stethoscope className="size-8 opacity-30" />
            <p className="text-sm font-medium">Sin servicios registrados</p>
            <p className="text-xs">Los servicios con mejor rendimiento aparecerán aquí</p>
          </div>
        ) : list.map((service, index) => (
          <div key={service.id} className="flex items-center p-3 rounded-lg border gap-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold text-sm shrink-0">
              #{index + 1}
            </div>
            <div className="flex gap-2 items-center justify-between space-x-3 flex-1 flex-wrap">
              <div>
                <div className="flex items-center space-x-2">
                  <p className="text-sm font-medium truncate">{service.name}</p>
                  <Badge variant="outline" className="text-xs">
                    {service.category}
                  </Badge>
                </div>
                <div className="flex items-center space-x-2 mt-1">
                  <div className="flex items-center space-x-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs text-muted-foreground">{service.rating}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground">{service.appointments} citas</span>
                </div>
              </div>
              <div className="text-right space-y-1">
                <div className="flex items-center space-x-2">
                  <p className="text-sm font-medium">{service.revenue}</p>
                  <Badge variant="outline" className="text-green-600 border-green-200">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {service.growth}
                  </Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-muted-foreground">Ocupación: {service.capacity}%</span>
                  <Progress value={service.capacity} className="w-12 h-1" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
