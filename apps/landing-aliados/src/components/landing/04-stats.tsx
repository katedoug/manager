import { Card, CardContent } from "@/components/ui/card"

const STATS = [
  { number: "[0,000]", label: "[Clínicas aliadas]", sublabel: "[y creciendo]" },
  { number: "[00]", label: "[Ciudades]",            sublabel: "[en México]" },
  { number: "[00k]", label: "[Pacientes atendidos]", sublabel: "[este mes]" },
  { number: "[00%]", label: "[Crecimiento promedio]", sublabel: "[primer año]" },
]

export function Stats() {
  return (
    <section className="py-16 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {STATS.map((stat) => (
            <Card key={stat.label} className="border-gray-100 shadow-none text-center">
              <CardContent className="py-8 px-4 flex flex-col items-center gap-1">
                <span className="text-5xl font-bold text-gray-900">{stat.number}</span>
                <span className="text-sm font-medium text-gray-700 mt-1">{stat.label}</span>
                <span className="text-xs text-gray-400">{stat.sublabel}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
