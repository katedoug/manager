"use client"

import Image from "next/image"
import { Building2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { TransferHistorySheet } from "./transfer-history-sheet"
import { useDemoMode } from "@/context/demo-mode"

const CYCLE_DAYS    = 7
const DAYS_ELAPSED  = 4
const PCT           = Math.round((DAYS_ELAPSED / CYCLE_DAYS) * 100)

export function NextPayout() {
  const { isDemoMode } = useDemoMode()

  return (
    <Card className="border-primary/20 bg-gradient-to-br from-[#030027]/5 to-card">
      <CardContent className="pt-2 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Próximo pago estimado</p>
          {isDemoMode
            ? <Badge className="bg-blue-700 hover:bg-blue-700 text-white text-xs shrink-0">En proceso</Badge>
            : <Badge variant="outline" className="text-xs shrink-0 text-muted-foreground">Sin ciclo activo</Badge>
          }
        </div>
        <div className="space-y-0.5">
          <p className="text-3xl font-bold tabular-nums">{isDemoMode ? "$6,421" : "$0"}</p>
          <p className="text-sm text-muted-foreground">
            {isDemoMode ? "Acumulado desde el lunes 28 de abril" : "Sin actividad registrada este ciclo"}
          </p>
        </div>

        {/* Progress of cycle */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{isDemoMode ? "Lun 28 abr" : "—"}</span>
            <span className="font-medium text-foreground">
              {isDemoMode ? `Día ${DAYS_ELAPSED} de ${CYCLE_DAYS}` : "Sin datos"}
            </span>
            <span>{isDemoMode ? "Dom 4 may" : "—"}</span>
          </div>
          <Progress value={isDemoMode ? PCT : 0} className="h-2" />
          <p className="text-xs text-muted-foreground text-center">
            {isDemoMode
              ? <>Transferencia el <strong className="text-foreground">martes 6 de mayo</strong> · ciclo semanal</>
              : "Configura tu cuenta bancaria para recibir pagos"
            }
          </p>
        </div>

        <Separator />

        {/* Account + breakdown */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 text-sm">
          <div className="space-y-0.5">
            <p className="text-xs text-muted-foreground">Cuenta destino</p>
            <div className="flex items-center gap-1.5 font-medium">
              <Building2 className="size-3.5 text-muted-foreground" />
              {isDemoMode ? "BBVA ••••4821" : "—"}
            </div>
          </div>
          <div className="space-y-0.5">
            <p className="text-xs text-muted-foreground">Bruto del ciclo</p>
            <p className="font-semibold tabular-nums">{isDemoMode ? "$7,320" : "$0"}</p>
          </div>
          <div className="space-y-0.5">
            <p className="text-xs text-muted-foreground">IVA retenido</p>
            <p className="font-semibold tabular-nums text-muted-foreground">{isDemoMode ? "−$586" : "—"}</p>
          </div>
          <div className="space-y-0.5">
            <p className="text-xs text-muted-foreground">ISR retenido</p>
            <p className="font-semibold tabular-nums text-muted-foreground">{isDemoMode ? "−$313" : "—"}</p>
          </div>
        </div>

        {/* CTA + Powered by */}
        <div className="flex items-center justify-between">
          <TransferHistorySheet />
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <span>Powered by</span>
            <Image src="/stripe-blurple.svg" alt="Stripe" width={36} height={15} className="opacity-70" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
