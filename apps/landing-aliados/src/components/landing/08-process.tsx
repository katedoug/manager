import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

const STEPS = [
  {
    number: "01",
    title: "Regístrate",
    description: "Llena el formulario con los datos básicos de tu clínica. Nuestro equipo te contacta en menos de 2 horas para confirmar tu alta.",
  },
  {
    number: "02",
    title: "Configura tu perfil",
    description: "Te ayudamos a subir tus servicios, horarios y equipo. En 30 minutos tu clínica ya está visible en la red KD.",
  },
  {
    number: "03",
    title: "Recibe tu primer paciente",
    description: "Los suscriptores KD en tu zona ya pueden encontrarte y agendar. Tú solo atiendes, nosotros nos encargamos del resto.",
  },
  {
    number: "04",
    title: "Crece con datos",
    description: "Accede a tu dashboard con métricas de desempeño, pagos y evaluaciones. Cada mes más claro que el anterior.",
  },
]

export function Process() {
  return (
    <section className="py-24 bg-gray-50" id="proceso">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <p className="text-sm font-medium uppercase tracking-widest text-[#1434CB] mb-3">
            Cómo funciona
          </p>
          <h2 className="text-4xl font-bold sm:text-5xl">
            Tu primera consulta nueva en menos de 24 horas.
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Sin contratos, sin setup técnico, sin inversión inicial.
          </p>
        </div>

        {/* Stepper */}
        <div className="relative">
          {/* Connecting line desktop */}
          <div className="hidden lg:block absolute top-7 left-[calc(12.5%+1.5rem)] right-[calc(12.5%+1.5rem)] h-px bg-gray-300" />

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-4">
            {STEPS.map((step) => (
              <div key={step.number} className="flex flex-col items-center text-center gap-4">
                {/* Number circle */}
                <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-gray-900 border-4 border-gray-50 shadow-sm">
                  <span className="text-sm font-bold text-white">{step.number}</span>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-bold text-gray-900 text-lg">{step.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA below */}
        <div className="mt-16 text-center">
          <Button size="lg" className="gap-2" asChild>
            <Link href="/unete">Comenzar ahora, es gratis <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
