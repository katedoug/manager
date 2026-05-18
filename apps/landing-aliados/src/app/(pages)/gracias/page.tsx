import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import Link from "next/link"

export default function GraciasPage() {
  return (
    <section className="min-h-[calc(100vh-4rem)] bg-white flex items-center">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-24 flex flex-col items-center text-center gap-8">

        {/* Icon */}
        <div className="h-20 w-20 rounded-full bg-blue-50 flex items-center justify-center">
          <CheckCircle className="h-10 w-10 text-[#1434CB]" />
        </div>

        {/* Copy */}
        <div className="flex flex-col gap-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
            Solicitud recibida
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl leading-tight">
            Ya tenemos tu registro.
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed max-w-md mx-auto">
            Nuestro equipo revisará los datos de tu clínica y se comunicará contigo en menos de 24 horas hábiles para darte acceso a la red.
          </p>
        </div>

        {/* Trust signals */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-gray-400 border-y border-gray-100 py-6 w-full">
          <span className="flex items-center gap-1.5">⚡ Respuesta en menos de 24 hrs</span>
          <span className="text-gray-300">|</span>
          <span className="flex items-center gap-1.5">🔒 Tus datos están seguros</span>
          <span className="text-gray-300">|</span>
          <span className="flex items-center gap-1.5">✓ Sin costo de entrada</span>
        </div>

        {/* CTA */}
        <Button asChild size="lg" variant="outline" className="border-gray-300 text-gray-700">
          <Link href="/">Regresar al inicio</Link>
        </Button>

      </div>
    </section>
  )
}
