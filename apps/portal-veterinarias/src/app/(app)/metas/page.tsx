import { HideLoader } from "@/components/hide-loader"
import { TopBar } from "@/components/top-bar"
import { GoalsGrid } from "./components/goals-grid"

export default function MetasPage() {
  return (
    <>
      <HideLoader />
      <TopBar title="Metas" />
      <div className="flex-1 space-y-6 px-4 py-4 lg:px-6 lg:py-6">

        <div>
          <h1 className="text-2xl font-bold">Metas</h1>
          <p className="text-sm text-muted-foreground">
            Define y monitorea tus objetivos mensuales o semanales. Edita cada meta según tus prioridades.
          </p>
        </div>

        <GoalsGrid />

      </div>
    </>
  )
}
