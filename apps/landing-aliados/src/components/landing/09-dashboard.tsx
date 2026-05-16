import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle } from "lucide-react"
import Image from "next/image"

const BULLETS = [
  {
    title: "Agenda sin llamadas",
    body: "Tus citas del día, organizadas y confirmadas automáticamente. Sin WhatsApps, sin no-shows.",
  },
  {
    title: "Expediente que viaja con el paciente",
    body: "Historial clínico completo, accesible desde cualquier dispositivo, compartido entre toda la red KD.",
  },
  {
    title: "Pagos que llegan solos",
    body: "Cada consulta prestada a un suscriptor KD genera un pago directo a tu clínica. Sin cobrar, sin esperar.",
  },
  {
    title: "Tu desempeño en números",
    body: "Pacientes atendidos, ingresos generados, evaluaciones recibidas. Todo en una pantalla, cada semana.",
  },
  {
    title: "Historial de grooming por paciente",
    body: "Cortes anteriores, productos usados, notas del estilista. Disponible en cada visita, compartido con la clínica si el negocio también ofrece consulta.",
  },
]

export function Dashboard() {
  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">

          {/* Left: copy */}
          <div className="flex flex-col gap-6">
            <p className="text-sm font-medium uppercase tracking-widest text-[#1434CB]">
              La plataforma
            </p>
            <h2 className="text-4xl font-bold leading-tight">
              Toda tu clínica en un solo panel. Sin pagar por ello.
            </h2>
            <p className="text-lg text-gray-500">
              El dashboard KD centraliza tu operación diaria: citas, expedientes, pagos y reportes, sin que pagues una sola mensualidad de software. Lo incluimos porque queremos que crezcas, no que gastes.
            </p>

            <ul className="flex flex-col gap-4">
              {BULLETS.map((b) => (
                <li key={b.title} className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-[#1434CB] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold">{b.title}</p>
                    <p className="text-sm text-gray-500 leading-relaxed">{b.body}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-3 mt-2">
              <Button className="gap-2">
                Ver demo <ArrowRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" className="text-gray-700 border-gray-300">
                Analytics e insights
              </Button>
            </div>
          </div>

          {/* Right: dashboard screenshot */}
          <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-gray-200">
            <Image src="/assets/screen1.png" alt="Kate&Doug — panel principal" fill className="object-cover object-left-top" />
          </div>

        </div>
      </div>
    </section>
  )
}
