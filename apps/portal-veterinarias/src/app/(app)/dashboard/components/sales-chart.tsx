"use client"

import { useState } from "react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { useDemoMode } from "@/context/demo-mode"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

const allData = [
  { month: "Ene", ingresos: 12500, meta: 14000 },
  { month: "Feb", ingresos: 15200, meta: 14000 },
  { month: "Mar", ingresos: 13800, meta: 14000 },
  { month: "Abr", ingresos: 17400, meta: 16000 },
  { month: "May", ingresos: 19600, meta: 16000 },
  { month: "Jun", ingresos: 21200, meta: 18000 },
  { month: "Jul", ingresos: 22500, meta: 18000 },
  { month: "Ago", ingresos: 20800, meta: 18000 },
  { month: "Sep", ingresos: 24200, meta: 20000 },
  { month: "Oct", ingresos: 25100, meta: 20000 },
  { month: "Nov", ingresos: 27900, meta: 22000 },
  { month: "Dic", ingresos: 18450, meta: 22000 },
]

const chartConfig = {
  ingresos: {
    label: "Ingresos",
    color: "var(--primary)",
  },
  meta: {
    label: "Meta",
    color: "var(--primary)",
  },
}

const emptyData = allData.map(d => ({ month: d.month, ingresos: 0, meta: 0 }))

export function SalesChart() {
  const [timeRange, setTimeRange] = useState("12m")
  const { isDemoMode } = useDemoMode()

  const source = isDemoMode ? allData : emptyData
  const data =
    timeRange === "3m"
      ? source.slice(-3)
      : timeRange === "6m"
        ? source.slice(-6)
        : source

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle>Rendimiento de Ingresos</CardTitle>
          <CardDescription>Ingresos mensuales vs meta</CardDescription>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3m">Últimos 3 meses</SelectItem>
              <SelectItem value="6m">Últimos 6 meses</SelectItem>
              <SelectItem value="12m">Últimos 12 meses</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">Exportar</Button>
        </div>
      </CardHeader>
      <CardContent className="p-0 pt-6">
        <div className="px-6 pb-6">
          <ChartContainer config={chartConfig} className="h-[350px] w-full">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
              <defs>
                <linearGradient id="colorIngresos" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-ingresos)" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="var(--color-ingresos)" stopOpacity={0.05} />
                </linearGradient>
                <linearGradient id="colorMeta" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-meta)" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="var(--color-meta)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted/30" />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
                tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                type="monotone"
                dataKey="meta"
                stackId="1"
                stroke="var(--color-meta)"
                fill="url(#colorMeta)"
                strokeDasharray="5 5"
                strokeWidth={1}
              />
              <Area
                type="monotone"
                dataKey="ingresos"
                stackId="2"
                stroke="var(--color-ingresos)"
                fill="url(#colorIngresos)"
                strokeWidth={1}
              />
            </AreaChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  )
}
