"use client"

import { EvilPieChart } from "@/components/evilcharts/charts/pie-chart"
import { type ChartConfig } from "@/components/evilcharts/ui/chart"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { useDemoMode } from "@/context/demo-mode"

const demoData = [
  { name: "consultaGeneral",  value: 42 },
  { name: "vacunacion",       value: 28 },
  { name: "limpiezaDental",   value: 15 },
  { name: "examenSangre",     value: 9  },
  { name: "desparasitacion",  value: 6  },
]

const emptyData = [{ name: "consultaGeneral", value: 1 }]

const chartConfig = {
  consultaGeneral:  { label: "Consulta General", colors: { light: ["#030027"],  dark: ["#1e1b4b"]  } },
  vacunacion:       { label: "Vacunación",       colors: { light: ["#4f46e5"],  dark: ["#818cf8"]  } },
  limpiezaDental:   { label: "Limpieza Dental",  colors: { light: ["#7c3aed"],  dark: ["#a78bfa"]  } },
  examenSangre:     { label: "Examen de Sangre", colors: { light: ["#0d9488"],  dark: ["#2dd4bf"]  } },
  desparasitacion:  { label: "Desparasitación",  colors: { light: ["#f59e0b"],  dark: ["#fbbf24"]  } },
} satisfies ChartConfig

export function DesempenoPieChart() {
  const { isDemoMode } = useDemoMode()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Servicios Más Solicitados</CardTitle>
        <CardDescription>Distribución por tipo de servicio</CardDescription>
      </CardHeader>
      <CardContent>
        <EvilPieChart
          data={isDemoMode ? demoData : emptyData}
          dataKey="value"
          nameKey="name"
          chartConfig={chartConfig}
          innerRadius={60}
          paddingAngle={-20}
          cornerRadius={100}
          className="h-[260px] w-full"
        />
      </CardContent>
    </Card>
  )
}
