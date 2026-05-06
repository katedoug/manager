import { HideLoader } from "@/components/hide-loader"
import { TopBar } from "@/components/top-bar"
import { EarningsCards } from "./components/earnings-cards"
import { NextPayout } from "./components/next-payout"
import { PayoutsTable } from "./components/payouts-table"

export default function PagosPage() {
  return (
    <>
      <HideLoader />
      <TopBar title="Pagos" />
      <div className="flex-1 space-y-6 px-4 py-4 lg:px-6 lg:py-6">

        <div>
          <h1 className="text-2xl font-bold">Pagos</h1>
          <p className="text-sm text-muted-foreground">
            Resumen de ingresos, comisiones y transferencias a tu cuenta bancaria.
          </p>
        </div>

        <EarningsCards />

        <NextPayout />

        <PayoutsTable />

      </div>
    </>
  )
}
