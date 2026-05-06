"use client"

import { EvilLineChart } from "@/components/evilcharts/charts/line-chart"
import { type ChartConfig } from "@/components/evilcharts/ui/chart"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { useDemoMode } from "@/context/demo-mode"

const demoData = [
  { mes: "Dic", ingresos: 17200, meta: 20000 },
  { mes: "Ene", ingresos: 19400, meta: 20000 },
  { mes: "Feb", ingresos: 18800, meta: 21000 },
  { mes: "Mar", ingresos: 21500, meta: 21000 },
  { mes: "Abr", ingresos: 22900, meta: 22000 },
  { mes: "May", ingresos: 24180, meta: 22000 },
]

const emptyData = demoData.map(d => ({ mes: d.mes, ingresos: 0, meta: 0 }))

const chartConfig = {
  ingresos: { label: "Ingresos", colors: { light: ["#030027", "#4f46e5"], dark: ["#4f46e5", "#818cf8"] } },
  meta:     { label: "Meta",     colors: { light: ["#a78bfa"],            dark: ["#c4b5fd"]             } },
} satisfies ChartConfig

export function DesempenoLineChart() {
  const { isDemoMode } = useDemoMode()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ingresos Mensuales</CardTitle>
        <CardDescription>Ingresos reales vs meta — últimos 6 meses</CardDescription>
      </CardHeader>
      <CardContent>
        <EvilLineChart
          data={isDemoMode ? demoData : emptyData}
          xDataKey="mes"
          chartConfig={chartConfig}
          curveType="bump"
          className="h-[260px] w-full"
        />
      </CardContent>
    </Card>
  )
}
