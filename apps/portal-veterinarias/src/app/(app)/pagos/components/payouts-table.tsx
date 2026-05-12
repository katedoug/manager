"use client"

import { useState } from "react"
import { Download, CheckCircle2, Clock, AlertCircle, Building2, ArrowRight, Banknote } from "lucide-react"
import { useDemoMode } from "@/context/demo-mode"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { TransferHistorySheet } from "./transfer-history-sheet"

type PayoutStatus = "pagado" | "en_proceso" | "retenido"

type Payout = {
  id:          string
  period:      string
  dateRange:   string
  transferDate: string
  consultas:   number
  gross:       string
  commission:  string
  taxes:       string
  net:         string
  status:      PayoutStatus
  account:     string
  reference:   string
}

const payouts: Payout[] = [
  { id: "P-0051", period: "Sem. 17",  dateRange: "21–27 abr 2025",   transferDate: "29 abr 2025", consultas: 58, gross: "$7,018", commission: "$561", taxes: "$300", net: "$6,157", status: "pagado", account: "BBVA ••••4821", reference: "SPEI-82741" },
  { id: "P-0050", period: "Sem. 16",  dateRange: "14–20 abr 2025",   transferDate: "22 abr 2025", consultas: 61, gross: "$7,198", commission: "$576", taxes: "$307", net: "$6,315", status: "pagado", account: "BBVA ••••4821", reference: "SPEI-81003" },
  { id: "P-0049", period: "Sem. 15",  dateRange: "7–13 abr 2025",    transferDate: "15 abr 2025", consultas: 54, gross: "$6,480", commission: "$518", taxes: "$277", net: "$5,685", status: "pagado", account: "BBVA ••••4821", reference: "SPEI-79544" },
  { id: "P-0048", period: "Sem. 14",  dateRange: "31 mar–6 abr 2025", transferDate: "8 abr 2025", consultas: 62, gross: "$7,564", commission: "$605", taxes: "$323", net: "$6,636", status: "pagado", account: "BBVA ••••4821", reference: "SPEI-78210" },
  { id: "P-0047", period: "Sem. 13",  dateRange: "24–30 mar 2025",   transferDate: "1 abr 2025",  consultas: 49, gross: "$5,978", commission: "$478", taxes: "$255", net: "$5,245", status: "pagado", account: "BBVA ••••4821", reference: "SPEI-76891" },
  { id: "P-0046", period: "Sem. 12",  dateRange: "17–23 mar 2025",   transferDate: "25 mar 2025", consultas: 57, gross: "$6,726", commission: "$538", taxes: "$288", net: "$5,900", status: "pagado", account: "BBVA ••••4821", reference: "SPEI-75302" },
  { id: "P-0045", period: "Sem. 11",  dateRange: "10–16 mar 2025",   transferDate: "18 mar 2025", consultas: 44, gross: "$5,104", commission: "$408", taxes: "$218", net: "$4,478", status: "pagado", account: "BBVA ••••4821", reference: "SPEI-73944" },
  { id: "P-0044", period: "Sem. 10",  dateRange: "3–9 mar 2025",     transferDate: "11 mar 2025", consultas: 52, gross: "$6,240", commission: "$499", taxes: "$267", net: "$5,474", status: "pagado", account: "BBVA ••••4821", reference: "SPEI-72511" },
  { id: "P-0043", period: "Sem. 9",   dateRange: "24 feb–2 mar 2025", transferDate: "4 mar 2025", consultas: 47, gross: "$5,860", commission: "$469", taxes: "$251", net: "$5,140", status: "pagado", account: "BBVA ••••4821", reference: "SPEI-71022" },
  { id: "P-0042", period: "Sem. 8",   dateRange: "17–23 feb 2025",   transferDate: "25 feb 2025", consultas: 40, gross: "$4,920", commission: "$394", taxes: "$208", net: "$4,318", status: "pagado", account: "BBVA ••••4821", reference: "SPEI-69801" },
]

const statusConfig: Record<PayoutStatus, { label: string; className: string; icon: typeof CheckCircle2 }> = {
  pagado:     { label: "Pagado",     className: "border-emerald-200 bg-emerald-50 text-emerald-700", icon: CheckCircle2 },
  en_proceso: { label: "En proceso", className: "border-blue-200 bg-blue-50 text-blue-700",    icon: Clock        },
  retenido:   { label: "Retenido",   className: "border-amber-200 bg-amber-50 text-amber-700",       icon: AlertCircle  },
}

export function PayoutsTable() {
  const [filter, setFilter] = useState("todos")
  const { isDemoMode } = useDemoMode()

  const source   = isDemoMode ? payouts : []
  const filtered = filter === "todos" ? source : source.filter(p => p.status === filter)

  const totalNet   = filtered.reduce((acc, p) => acc + Number(p.net.replace(/[$,]/g, "")), 0)
  const totalGross = filtered.reduce((acc, p) => acc + Number(p.gross.replace(/[$,]/g, "")), 0)

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <CardTitle>Transferencias recientes</CardTitle>
            <CardDescription>Últimas 10 transferencias a tu cuenta bancaria</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-36 cursor-pointer">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="pagado">Pagados</SelectItem>
                <SelectItem value="en_proceso">En proceso</SelectItem>
                <SelectItem value="retenido">Retenidos</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="lg" className="cursor-pointer gap-1.5">
              <Download className="size-3.5" />
              Exportar
            </Button>
          </div>
        </div>

        {/* Period totals */}
        <div className="mt-2 flex flex-wrap gap-6 text-sm">
          <div>
            <span className="text-muted-foreground">Bruto total · </span>
            <span className="font-semibold tabular-nums">${totalGross.toLocaleString("es-MX")}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Neto total · </span>
            <span className="font-semibold tabular-nums text-blue-700">${totalNet.toLocaleString("es-MX")}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Transferencias · </span>
            <span className="font-semibold tabular-nums">{filtered.length}</span>
          </div>
        </div>
      </CardHeader>

      <Separator />

      <CardContent className="p-0">
        <Table style={{ tableLayout: "fixed", width: "100%", minWidth: "740px" }}>
          <TableHeader>
            <TableRow className="bg-muted/40">
              <TableHead style={{ width: "9%" }}>Período</TableHead>
              <TableHead style={{ width: "13%" }}>Fechas</TableHead>
              <TableHead style={{ width: "8%" }} className="text-right">Servicios</TableHead>
              <TableHead style={{ width: "11%" }} className="text-right pl-8">Bruto</TableHead>
              <TableHead style={{ width: "9%" }} className="text-right">IVA</TableHead>
              <TableHead style={{ width: "9%" }} className="text-right">ISR</TableHead>
              <TableHead style={{ width: "10%" }} className="text-right font-semibold">Neto</TableHead>
              <TableHead style={{ width: "14%" }} className="pl-8">Estado</TableHead>
              <TableHead style={{ width: "13%" }}>Referencia</TableHead>
              <TableHead style={{ width: "4%" }} />
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={10} className="py-16 text-center">
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <Banknote className="size-8 opacity-30" />
                    <p className="text-sm font-medium">Sin transferencias registradas</p>
                    <p className="text-xs">Las transferencias aparecerán aquí una vez que proceses tus primeras citas</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((p) => {
                const { label, className, icon: StatusIcon } = statusConfig[p.status]
                return (
                  <TableRow key={p.id} className="hover:bg-muted/30">
                    <TableCell>
                      <div className="font-medium">{p.period}</div>
                      <div className="text-xs text-muted-foreground">{p.id}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{p.dateRange}</div>
                      <div className="text-xs text-muted-foreground flex items-center gap-1">
                        <Building2 className="size-3" />
                        {p.account}
                      </div>
                    </TableCell>
                    <TableCell className="text-right tabular-nums">{p.consultas}</TableCell>
                    <TableCell className="text-right tabular-nums text-muted-foreground pl-8">{p.gross}</TableCell>
                    <TableCell className="text-right tabular-nums text-muted-foreground">−{p.commission}</TableCell>
                    <TableCell className="text-right tabular-nums text-muted-foreground">−{p.taxes}</TableCell>
                    <TableCell className="text-right tabular-nums font-semibold">{p.net}</TableCell>
                    <TableCell className="pl-8">
                      <Badge variant="outline" className={cn("text-xs gap-1", className)}>
                        <StatusIcon className="size-3" />
                        {label}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground font-mono">{p.reference}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" className="size-7 cursor-pointer text-muted-foreground hover:text-foreground">
                        <Download className="size-3.5" />
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </CardContent>

      <Separator />

      <div className="flex items-center justify-between px-6 py-3">
        <p className="text-xs text-muted-foreground">
          Mostrando las 10 transferencias más recientes
        </p>
        <TransferHistorySheet trigger={
          <button className="flex items-center gap-1 text-xs text-blue-700 font-medium cursor-pointer hover:underline">
            Ver historial completo
            <ArrowRight className="size-3" />
          </button>
        } />
      </div>
    </Card>
  )
}
