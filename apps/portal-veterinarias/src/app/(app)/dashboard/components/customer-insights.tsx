"use client"

import { useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts"
import { useDemoMode } from "@/context/demo-mode"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Users, MapPin, TrendingUp, Target, ArrowUpIcon, HeartPulse } from "lucide-react"

const patientGrowthData = [
  { month: "Ene", nuevos: 48, recurrentes: 210, inactivos: 12 },
  { month: "Feb", nuevos: 63, recurrentes: 234, inactivos: 15 },
  { month: "Mar", nuevos: 57, recurrentes: 268, inactivos: 9 },
  { month: "Abr", nuevos: 89, recurrentes: 301, inactivos: 18 },
  { month: "May", nuevos: 104, recurrentes: 342, inactivos: 11 },
  { month: "Jun", nuevos: 127, recurrentes: 389, inactivos: 14 },
]

const chartConfig = {
  nuevos: { label: "Nuevos Pacientes", color: "var(--chart-1)" },
  recurrentes: { label: "Recurrentes", color: "var(--chart-2)" },
  inactivos: { label: "Inactivos", color: "var(--chart-3)" },
}

const speciesData = [
  { species: "Caninos", patients: 712, percentage: "55.4%", growth: "+14.2%", growthColor: "text-green-600" },
  { species: "Felinos", patients: 384, percentage: "29.9%", growth: "+9.1%", growthColor: "text-green-600" },
  { species: "Aves", patients: 98, percentage: "7.6%", growth: "+4.3%", growthColor: "text-blue-600" },
  { species: "Exóticos", patients: 64, percentage: "5.0%", growth: "+2.8%", growthColor: "text-orange-600" },
  { species: "Otros", patients: 27, percentage: "2.1%", growth: "-1.4%", growthColor: "text-red-600" },
]

const zonesData = [
  { zone: "Col. Centro", patients: 312, revenue: "$56,160", growth: "+11.3%", growthColor: "text-green-600" },
  { zone: "Col. Norte", patients: 248, revenue: "$44,640", growth: "+8.7%", growthColor: "text-green-600" },
  { zone: "Col. Sur", patients: 198, revenue: "$35,640", growth: "+15.2%", growthColor: "text-blue-600" },
  { zone: "Col. Oriente", patients: 134, revenue: "$24,120", growth: "+6.4%", growthColor: "text-green-600" },
  { zone: "Otras zonas", patients: 393, revenue: "$70,740", growth: "+5.1%", growthColor: "text-orange-600" },
]

const emptyGrowthData = patientGrowthData.map(d => ({ month: d.month, nuevos: 0, recurrentes: 0, inactivos: 0 }))
const emptySpeciesData = speciesData.map(d => ({ ...d, patients: 0, percentage: "0%", growth: "—", growthColor: "text-muted-foreground" }))
const emptyZonesData = zonesData.map(d => ({ ...d, patients: 0, revenue: "$0", growth: "—", growthColor: "text-muted-foreground" }))

export function CustomerInsights() {
  const [activeTab, setActiveTab] = useState("growth")
  const { isDemoMode } = useDemoMode()
  const growthData  = isDemoMode ? patientGrowthData : emptyGrowthData
  const speciesRows = isDemoMode ? speciesData       : emptySpeciesData
  const zonesRows   = isDemoMode ? zonesData         : emptyZonesData

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle>Estadísticas de Pacientes</CardTitle>
        <CardDescription>Tendencias de crecimiento y demografía</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full h-10">
            <TabsTrigger value="growth" className="flex-1 cursor-pointer gap-2">
              <TrendingUp className="h-4 w-4" />
              <span className="hidden sm:inline">Crecimiento</span>
            </TabsTrigger>
            <TabsTrigger value="species" className="flex-1 cursor-pointer gap-2">
              <HeartPulse className="h-4 w-4" />
              <span className="hidden sm:inline">Especies</span>
            </TabsTrigger>
            <TabsTrigger value="zones" className="flex-1 cursor-pointer gap-2">
              <MapPin className="h-4 w-4" />
              <span className="hidden sm:inline">Zonas</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="growth" className="mt-8 space-y-6">
            <div className="grid gap-6">
              <div className="grid grid-cols-10 gap-6">
                <div className="col-span-10 xl:col-span-7">
                  <h3 className="text-sm font-medium text-muted-foreground mb-6">Tendencia de Pacientes</h3>
                  <ChartContainer config={chartConfig} className="h-[375px] w-full">
                    <BarChart data={growthData} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="month" tick={{ fontSize: 12 }} tickLine={{ stroke: "var(--border)" }} axisLine={{ stroke: "var(--border)" }} />
                      <YAxis tick={{ fontSize: 12 }} tickLine={{ stroke: "var(--border)" }} axisLine={{ stroke: "var(--border)" }} domain={[0, "dataMax"]} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="nuevos" fill="var(--color-nuevos)" radius={[2, 2, 0, 0]} />
                      <Bar dataKey="recurrentes" fill="var(--color-recurrentes)" radius={[2, 2, 0, 0]} />
                      <Bar dataKey="inactivos" fill="var(--color-inactivos)" radius={[2, 2, 0, 0]} />
                    </BarChart>
                  </ChartContainer>
                </div>

                <div className="col-span-10 xl:col-span-3 space-y-5">
                  <h3 className="text-sm font-medium text-muted-foreground mb-6">Métricas Clave</h3>
                  <div className="grid grid-cols-3 gap-5">
                    <div className="p-4 rounded-lg max-lg:col-span-3 xl:col-span-3 border">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">Total Pacientes</span>
                      </div>
                      <div className="text-2xl font-bold">{isDemoMode ? "1,285" : "0"}</div>
                      <div className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                        {isDemoMode ? <><ArrowUpIcon className="h-3 w-3 text-green-600" /><span className="text-green-600">+12.4% vs mes anterior</span></> : "—"}
                      </div>
                    </div>
                    <div className="p-4 rounded-lg max-lg:col-span-3 xl:col-span-3 border">
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">Tasa de Retención</span>
                      </div>
                      <div className="text-2xl font-bold">{isDemoMode ? "87.4%" : "—"}</div>
                      <div className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                        {isDemoMode ? <><ArrowUpIcon className="h-3 w-3 text-green-600" /><span className="text-green-600">+2.3% de mejora</span></> : "Sin datos"}
                      </div>
                    </div>
                    <div className="p-4 rounded-lg max-lg:col-span-3 xl:col-span-3 border">
                      <div className="flex items-center gap-2 mb-2">
                        <Target className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">Valor Promedio</span>
                      </div>
                      <div className="text-2xl font-bold">{isDemoMode ? "$480" : "$0"}</div>
                      <div className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                        {isDemoMode ? <><ArrowUpIcon className="h-3 w-3 text-green-600" /><span className="text-green-600">+6.8% crecimiento</span></> : "—"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="species" className="mt-8">
            <div className="rounded-lg border bg-card">
              <Table>
                <TableHeader>
                  <TableRow className="border-b">
                    <TableHead className="py-5 px-6 font-semibold">Especie</TableHead>
                    <TableHead className="text-right py-5 px-6 font-semibold">Pacientes</TableHead>
                    <TableHead className="text-right py-5 px-6 font-semibold">Porcentaje</TableHead>
                    <TableHead className="text-right py-5 px-6 font-semibold">Crecimiento</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {speciesRows.map((row, index) => (
                    <TableRow key={index} className="hover:bg-muted/30 transition-colors">
                      <TableCell className="font-medium py-5 px-6">{row.species}</TableCell>
                      <TableCell className="text-right py-5 px-6">{row.patients.toLocaleString()}</TableCell>
                      <TableCell className="text-right py-5 px-6">{row.percentage}</TableCell>
                      <TableCell className="text-right py-5 px-6">
                        <span className={`font-medium ${row.growthColor}`}>{row.growth}</span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-6">
              <div className="text-muted-foreground text-sm hidden sm:block">
                {speciesRows.length} especies registradas
              </div>
              <div className="space-x-2">
                <Button variant="outline" size="sm" disabled>Anterior</Button>
                <Button variant="outline" size="sm" disabled>Siguiente</Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="zones" className="mt-8">
            <div className="rounded-lg border bg-card">
              <Table>
                <TableHeader>
                  <TableRow className="border-b">
                    <TableHead className="py-5 px-6 font-semibold">Zona</TableHead>
                    <TableHead className="text-right py-5 px-6 font-semibold">Pacientes</TableHead>
                    <TableHead className="text-right py-5 px-6 font-semibold">Ingresos</TableHead>
                    <TableHead className="text-right py-5 px-6 font-semibold">Crecimiento</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {zonesRows.map((row, index) => (
                    <TableRow key={index} className="hover:bg-muted/30 transition-colors">
                      <TableCell className="font-medium py-5 px-6">{row.zone}</TableCell>
                      <TableCell className="text-right py-5 px-6">{row.patients.toLocaleString()}</TableCell>
                      <TableCell className="text-right py-5 px-6">{row.revenue}</TableCell>
                      <TableCell className="text-right py-5 px-6">
                        <span className={`font-medium ${row.growthColor}`}>{row.growth}</span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-6">
              <div className="text-muted-foreground text-sm hidden sm:block">
                {zonesRows.length} zonas registradas
              </div>
              <div className="space-x-2">
                <Button variant="outline" size="sm" disabled>Anterior</Button>
                <Button variant="outline" size="sm" disabled>Siguiente</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
