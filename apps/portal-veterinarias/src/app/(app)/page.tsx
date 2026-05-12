import { BadgeCheck } from "lucide-react"

import { HideLoader } from "@/components/hide-loader"
import { TopBar } from "@/components/top-bar"
import { MetricsOverview } from "./dashboard/components/metrics-overview"
import { SalesChart } from "./dashboard/components/sales-chart"
import { RevenueBreakdown } from "./dashboard/components/revenue-breakdown"
import { RecentTransactions } from "./dashboard/components/recent-transactions"
import { TopProducts } from "./dashboard/components/top-products"
import { CustomerInsights } from "./dashboard/components/customer-insights"
import { QuickActions } from "./dashboard/components/quick-actions"

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return "Buenos días"
  if (hour < 19) return "Buenas tardes"
  return "Buenas noches"
}

export default function InicioPage() {
  const greeting = getGreeting()

  return (
    <>
      <HideLoader />
      <TopBar title="Inicio" />
      <div className="flex-1 space-y-6 px-4 py-4 lg:px-6 lg:py-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-6">
          <div className="flex flex-col gap-1.5">
            <h1 className="text-2xl font-bold leading-tight sm:text-3xl">
              {greeting}, Veterinaria San Nicolás
              <BadgeCheck className="inline-block align-middle ml-1 size-6 shrink-0 fill-blue-500 text-white sm:size-7" />
            </h1>
            <p className="text-sm text-muted-foreground sm:text-base">
              Monitorea el rendimiento de tu clínica y métricas clave en tiempo real.
            </p>
          </div>
          <QuickActions />
        </div>

        <div className="@container/main space-y-6">
          <MetricsOverview />
          <div className="grid gap-6 grid-cols-1 @5xl:grid-cols-2">
            <SalesChart />
            <RevenueBreakdown />
          </div>
          <div className="grid gap-6 grid-cols-1 @5xl:grid-cols-2">
            <RecentTransactions />
            <TopProducts />
          </div>
          <CustomerInsights />
        </div>
      </div>
    </>
  )
}
