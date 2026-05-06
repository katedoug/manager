import { HideLoader } from "@/components/hide-loader"
import { TopBar } from "@/components/top-bar"
import { SectionCards }       from "./components/section-cards"
import { DesempenoLineChart } from "./components/line-chart"
import { DesempenoBarChart }  from "./components/bar-chart"
import { DesempenoPieChart }  from "./components/pie-chart"
import { TopServices }        from "./components/top-services"
import { Insights }           from "./components/insights"

export default function DesempenoPage() {
  return (
    <>
      <HideLoader />
      <TopBar title="Desempeño" />
      <div className="flex-1 space-y-6 px-4 py-4 lg:px-6 lg:py-6">

        <div>
          <h1 className="text-2xl font-bold">Desempeño</h1>
          <p className="text-sm text-muted-foreground">
            Monitorea tus indicadores clave y descubre oportunidades de mejora.
          </p>
        </div>

        <SectionCards />

        <DesempenoLineChart />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <DesempenoBarChart />
          <DesempenoPieChart />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <TopServices />
          <Insights />
        </div>

      </div>
    </>
  )
}
