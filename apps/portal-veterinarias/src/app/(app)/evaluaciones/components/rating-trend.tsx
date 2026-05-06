"use client"

import { EvilLineChart } from "@/components/evilcharts/charts/line-chart"
import { type ChartConfig } from "@/components/evilcharts/ui/chart"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { useDemoMode } from "@/context/demo-mode"

const demoData = [
  { mes: "Dic", calificacion: 4.4, cancelRate: 11.2 },
  { mes: "Ene", calificacion: 4.5, cancelRate: 9.8  },
  { mes: "Feb", calificacion: 4.6, cancelRate: 8.5  },
  { mes: "Mar", calificacion: 4.5, cancelRate: 9.1  },
  { mes: "Abr", calificacion: 4.7, cancelRate: 7.9  },
  { mes: "May", calificacion: 4.8, cancelRate: 7.4  },
]

const emptyData = demoData.map(d => ({ mes: d.mes, calificacion: 0, cancelRate: 0 }))

const chartConfig = {
  calificacion: { label: "Calificación", colors: { light: ["#030027", "#4f46e5"], dark: ["#4f46e5", "#818cf8"] } },
  cancelRate:   { label: "Cancel Rate",  colors: { light: ["#f43f5e"],            dark: ["#fb7185"]             } },
} satisfies ChartConfig

export function RatingTrend() {
  const { isDemoMode } = useDemoMode()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tendencia</CardTitle>
        <CardDescription>Calificación y Cancel Rate — últimos 6 meses</CardDescription>
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
