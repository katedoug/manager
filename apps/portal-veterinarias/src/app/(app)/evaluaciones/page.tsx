import { HideLoader } from "@/components/hide-loader"
import { TopBar } from "@/components/top-bar"
import { MetricCards } from "./components/metric-cards"
import { RatingBreakdown } from "./components/rating-breakdown"
import { RatingTrend } from "./components/rating-trend"
import { ReviewsList } from "./components/reviews-list"

export default function EvaluacionesPage() {
  return (
    <>
      <HideLoader />
      <TopBar title="Evaluaciones" />
      <div className="flex-1 space-y-6 px-4 py-4 lg:px-6 lg:py-6">

        <div>
          <h1 className="text-2xl font-bold">Evaluaciones</h1>
          <p className="text-sm text-muted-foreground">
            Monitorea la satisfacción de tus clientes y el desempeño de tu clínica.
          </p>
        </div>

        <MetricCards />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <RatingBreakdown />
          <RatingTrend />
        </div>

        <ReviewsList />

      </div>
    </>
  )
}
