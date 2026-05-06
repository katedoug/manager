"use client"

import * as React from "react"
import { Label, Pie, PieChart, Sector } from "recharts"
import { useDemoMode } from "@/context/demo-mode"
import type { PieSectorDataItem } from "recharts/types/polar/Pie"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartStyle, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

const revenueData = [
  { category: "consultas", value: 40, amount: 7380, fill: "var(--color-consultas)" },
  { category: "vacunas", value: 25, amount: 4613, fill: "var(--color-vacunas)" },
  { category: "examenes", value: 20, amount: 3690, fill: "var(--color-examenes)" },
  { category: "cirugia", value: 15, amount: 2768, fill: "var(--color-cirugia)" },
]

const chartConfig = {
  revenue: { label: "Ingresos" },
  amount: { label: "Monto" },
  consultas: { label: "Consultas", color: "var(--chart-1)" },
  vacunas: { label: "Vacunas", color: "var(--chart-2)" },
  examenes: { label: "Exámenes", color: "var(--chart-3)" },
  cirugia: { label: "Cirugía", color: "var(--chart-4)" },
}

const emptyRevenueData = revenueData.map(d => ({ ...d, amount: 0, value: 0 }))

export function RevenueBreakdown() {
  const id = "revenue-breakdown"
  const [activeCategory, setActiveCategory] = React.useState("consultas")
  const { isDemoMode } = useDemoMode()
  const data = isDemoMode ? revenueData : emptyRevenueData

  const activeIndex = React.useMemo(() => {
    const index = revenueData.findIndex((item) => item.category === activeCategory)
    return index === -1 ? 0 : index
  }, [activeCategory])

  const categories = React.useMemo(() => revenueData.map((item) => item.category), [])

  return (
    <Card data-chart={id} className="flex flex-col">
      <ChartStyle id={id} config={chartConfig} />
      <CardHeader className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 pb-2">
        <div>
          <CardTitle>Distribución de Ingresos</CardTitle>
          <CardDescription>Ingresos por tipo de servicio</CardDescription>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={activeCategory} onValueChange={setActiveCategory}>
            <SelectTrigger className="w-[175px] rounded-lg" aria-label="Seleccionar servicio">
              <SelectValue placeholder="Seleccionar" />
            </SelectTrigger>
            <SelectContent align="end" className="rounded-lg">
              {categories.map((key) => {
                const config = chartConfig[key as keyof typeof chartConfig]
                if (!config) return null
                return (
                  <SelectItem key={key} value={key} className="rounded-md [&_span]:flex">
                    <div className="flex items-center gap-2">
                      <span
                        className="flex h-3 w-3 shrink-0 rounded-full"
                        style={{ backgroundColor: `var(--color-${key})` }}
                      />
                      {config?.label}
                    </div>
                  </SelectItem>
                )
              })}
            </SelectContent>
          </Select>
          <Button variant="outline">Exportar</Button>
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
          <div className="flex justify-center">
            <ChartContainer id={id} config={chartConfig} className="mx-auto aspect-square w-full max-w-[300px]">
              <PieChart>
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <Pie
                  data={data}
                  dataKey="amount"
                  nameKey="category"
                  innerRadius={60}
                  strokeWidth={5}
                  {...({ activeIndex } as Record<string, unknown>)}
                  activeShape={({ outerRadius = 0, ...props }: PieSectorDataItem) => (
                    <g>
                      <Sector {...props} outerRadius={outerRadius + 10} />
                      <Sector {...props} outerRadius={outerRadius + 25} innerRadius={outerRadius + 12} />
                    </g>
                  )}
                >
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                          <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                            <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-bold">
                              ${(data[activeIndex].amount / 1000).toFixed(1)}K
                            </tspan>
                            <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">
                              Ingresos
                            </tspan>
                          </text>
                        )
                      }
                    }}
                  />
                </Pie>
              </PieChart>
            </ChartContainer>
          </div>

          <div className="flex flex-col justify-center space-y-4">
            {data.map((item, index) => {
              const config = chartConfig[item.category as keyof typeof chartConfig]
              const isActive = index === activeIndex
              return (
                <div
                  key={item.category}
                  className={`flex items-center justify-between p-3 rounded-lg transition-colors cursor-pointer ${isActive ? "bg-muted" : "hover:bg-muted/50"}`}
                  onClick={() => setActiveCategory(item.category)}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="flex h-3 w-3 shrink-0 rounded-full"
                      style={{ backgroundColor: `var(--color-${item.category})` }}
                    />
                    <span className="font-medium">{config?.label}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">${(item.amount / 1000).toFixed(1)}K</div>
                    <div className="text-sm text-muted-foreground">{item.value}%</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
