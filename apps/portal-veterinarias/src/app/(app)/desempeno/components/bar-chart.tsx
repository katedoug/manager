"use client"

import { EvilBarChart } from "@/components/evilcharts/charts/bar-chart"
import { type ChartConfig } from "@/components/evilcharts/ui/chart"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { useDemoMode } from "@/context/demo-mode"

const demoData = [
  { mes: "Dic", realizadas: 198, canceladas: 28 },
  { mes: "Ene", realizadas: 210, canceladas: 22 },
  { mes: "Feb", realizadas: 224, canceladas: 19 },
  { mes: "Mar", realizadas: 231, canceladas: 24 },
  { mes: "Abr", realizadas: 239, canceladas: 18 },
  { mes: "May", realizadas: 248, canceladas: 20 },
]

const emptyData = demoData.map(d => ({ mes: d.mes, realizadas: 0, canceladas: 0 }))

const chartConfig = {
  realizadas: { label: "Realizadas", colors: { light: ["#030027", "#4f46e5"], dark: ["#4f46e5", "#818cf8"] } },
  canceladas: { label: "Canceladas", colors: { light: ["#f43f5e"],            dark: ["#fb7185"]             } },
} satisfies ChartConfig

export function DesempenoBarChart() {
  const { isDemoMode } = useDemoMode()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Consultas por Mes</CardTitle>
        <CardDescription>Realizadas vs canceladas — últimos 6 meses</CardDescription>
      </CardHeader>
      <CardContent>
        <EvilBarChart
          data={isDemoMode ? demoData : emptyData}
          xDataKey="mes"
          chartConfig={chartConfig}
          barRadius={6}
          className="h-[260px] w-full"
        />
      </CardContent>
    </Card>
  )
}
