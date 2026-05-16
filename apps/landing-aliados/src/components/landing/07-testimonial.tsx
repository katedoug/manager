import { Quote, ShieldCheck } from "lucide-react"
import Image from "next/image"

const COMMITMENTS = [
  {
    title: "Sin costo de entrada",
    body: "Te unes a la red sin inversión. Sin mensualidad, sin setup, sin letra chica.",
  },
  {
    title: "Pagos garantizados",
    body: "Cada servicio prestado a un paciente KD tiene pago asegurado. Sin excepciones.",
  },
]

export function Testimonial() {
  return (
    <section className="py-24 bg-[#030027]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">

          {/* Left: quote */}
          <div className="flex flex-col gap-8">
            <Quote className="h-10 w-10 text-gray-600" />

            <blockquote className="text-2xl font-medium text-white leading-relaxed lg:text-3xl">
              Vi cómo las mejores clínicas del país perdían pacientes simplemente porque no tenían presupuesto para competir en publicidad con las cadenas. Kate&Doug existe para cambiar eso, sin que la clínica arriesgue un solo peso.
            </blockquote>

            <div className="flex flex-col gap-1">
              <span className="font-semibold text-white">Rafael Martínez</span>
              <span className="text-sm text-gray-400">CEO & Fundador, Kate&Doug</span>
            </div>
          </div>

          {/* Right: dashboard placeholder + commitments */}
          <div className="flex flex-col gap-6">
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-gray-700">
              <Image src="/assets/screen2.png" alt="Kate&Doug — panel de agenda" fill className="object-cover object-left-top" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {COMMITMENTS.map((c) => (
                <div key={c.title} className="bg-gray-800 rounded-xl p-5 border border-gray-700 flex flex-col gap-2">
                  <ShieldCheck className="h-5 w-5 text-[#1434CB]" />
                  <p className="font-semibold text-white text-sm">{c.title}</p>
                  <p className="text-xs text-gray-400 leading-relaxed">{c.body}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
