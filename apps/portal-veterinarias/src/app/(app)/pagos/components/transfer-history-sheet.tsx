"use client"

import React from "react"
import { Download, CalendarClock, ArrowRight, CheckCircle2, Clock, AlertCircle, Building2 } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

type TransferStatus = "pagado" | "en_proceso" | "retenido"

type Transfer = {
  id:           string
  period:       string
  dateRange:    string
  transferDate: string
  net:          string
  gross:        string
  account:      string
  reference:    string
  status:       TransferStatus
}

const transfers: Transfer[] = [
  { id: "P-0051", period: "Sem. 17", dateRange: "21–27 abr 2025", transferDate: "29 abr 2025", gross: "$7,018",  net: "$6,157", account: "BBVA ••••4821", reference: "SPEI-82741", status: "pagado"     },
  { id: "P-0050", period: "Sem. 16", dateRange: "14–20 abr 2025", transferDate: "22 abr 2025", gross: "$7,198",  net: "$6,315", account: "BBVA ••••4821", reference: "SPEI-81003", status: "pagado"     },
  { id: "P-0049", period: "Sem. 15", dateRange: "7–13 abr 2025",  transferDate: "15 abr 2025", gross: "$6,480",  net: "$5,685", account: "BBVA ••••4821", reference: "SPEI-79544", status: "pagado"     },
  { id: "P-0048", period: "Sem. 14", dateRange: "31 mar–6 abr",   transferDate: "8 abr 2025",  gross: "$7,564",  net: "$6,636", account: "BBVA ••••4821", reference: "SPEI-78210", status: "pagado"     },
  { id: "P-0047", period: "Sem. 13", dateRange: "24–30 mar 2025", transferDate: "1 abr 2025",  gross: "$5,978",  net: "$5,245", account: "BBVA ••••4821", reference: "SPEI-76891", status: "pagado"     },
  { id: "P-0046", period: "Sem. 12", dateRange: "17–23 mar 2025", transferDate: "25 mar 2025", gross: "$6,726",  net: "$5,900", account: "BBVA ••••4821", reference: "SPEI-75302", status: "pagado"     },
  { id: "P-0045", period: "Sem. 11", dateRange: "10–16 mar 2025", transferDate: "18 mar 2025", gross: "$5,104",  net: "$4,478", account: "BBVA ••••4821", reference: "SPEI-73944", status: "pagado"     },
  { id: "P-0044", period: "Sem. 10", dateRange: "3–9 mar 2025",   transferDate: "11 mar 2025", gross: "$6,240",  net: "$5,474", account: "BBVA ••••4821", reference: "SPEI-72511", status: "pagado"     },
  { id: "P-0043", period: "Sem. 9",  dateRange: "24 feb–2 mar",   transferDate: "4 mar 2025",  gross: "$5,860",  net: "$5,140", account: "BBVA ••••4821", reference: "SPEI-71022", status: "pagado"     },
  { id: "P-0042", period: "Sem. 8",  dateRange: "17–23 feb 2025", transferDate: "25 feb 2025", gross: "$4,920",  net: "$4,318", account: "BBVA ••••4821", reference: "SPEI-69801", status: "pagado"     },
  { id: "P-0041", period: "Sem. 7",  dateRange: "10–16 feb 2025", transferDate: "18 feb 2025", gross: "$6,100",  net: "$5,351", account: "BBVA ••••4821", reference: "SPEI-68340", status: "pagado"     },
  { id: "P-0040", period: "Sem. 6",  dateRange: "3–9 feb 2025",   transferDate: "11 feb 2025", gross: "$5,540",  net: "$4,861", account: "BBVA ••••4821", reference: "SPEI-66912", status: "pagado"     },
]

const statusConfig: Record<TransferStatus, { label: string; className: string; icon: typeof CheckCircle2 }> = {
  pagado:     { label: "Pagado",     className: "border-emerald-200 bg-emerald-50 text-emerald-700", icon: CheckCircle2 },
  en_proceso: { label: "En proceso", className: "border-blue-200 bg-blue-50 text-blue-700",    icon: Clock        },
  retenido:   { label: "Retenido",   className: "border-amber-200 bg-amber-50 text-amber-700",       icon: AlertCircle  },
}

const totalNet = transfers.reduce((acc, t) => acc + Number(t.net.replace(/[$,]/g, "")), 0)

type Props = {
  trigger?: React.ReactNode
}

export function TransferHistorySheet({ trigger }: Props) {
  const defaultTrigger = (
    <div className="flex items-center gap-1 text-xs text-blue-700 font-medium cursor-pointer hover:underline w-fit">
      <CalendarClock className="size-3.5" />
      Ver historial de transferencias
      <ArrowRight className="size-3" />
    </div>
  )

  return (
    <Sheet>
      <SheetTrigger asChild>
        {trigger ?? defaultTrigger}
      </SheetTrigger>

      <SheetContent className="w-full sm:max-w-lg overflow-y-auto px-6">
        <SheetHeader className="pb-4">
          <SheetTitle>Historial de transferencias</SheetTitle>
          <p className="text-sm text-muted-foreground">
            Todas las transferencias SPEI a tu cuenta bancaria
          </p>
        </SheetHeader>

        {/* Summary + download */}
        <div className="flex items-center justify-between px-1 pb-4">
          <div className="text-sm">
            <span className="text-muted-foreground">Total recibido · </span>
            <span className="font-semibold tabular-nums text-blue-700">
              ${totalNet.toLocaleString("es-MX")}
            </span>
            <span className="text-muted-foreground ml-3">{transfers.length} transferencias</span>
          </div>
          <Button variant="outline" size="lg" className="gap-1.5 cursor-pointer">
            <Download className="size-3.5" />
            Exportar
          </Button>
        </div>

        <Separator />

        {/* Transfer list */}
        <div className="divide-y">
          {transfers.map((t) => {
            const { label, className, icon: StatusIcon } = statusConfig[t.status]
            return (
              <div key={t.id} className="flex items-start justify-between gap-3 py-4 px-1">
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{t.period}</span>
                    <span className="text-xs text-muted-foreground">{t.id}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">{t.dateRange}</div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Building2 className="size-3" />
                    {t.account}
                    <span className="mx-1">·</span>
                    <span className="font-mono">{t.reference}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Transferido el {t.transferDate}
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2 shrink-0">
                  <span className="text-sm font-semibold tabular-nums">{t.net}</span>
                  <span className="text-xs text-muted-foreground tabular-nums">bruto {t.gross}</span>
                  <Badge variant="outline" className={cn("text-xs gap-1", className)}>
                    <StatusIcon className="size-3" />
                    {label}
                  </Badge>
                  <Button variant="ghost" size="icon" className="size-6 text-muted-foreground cursor-pointer">
                    <Download className="size-3" />
                  </Button>
                </div>
              </div>
            )
          })}
        </div>
      </SheetContent>
    </Sheet>
  )
}
