"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, CheckCircle, ShieldCheck } from "lucide-react"
import Image from "next/image"

const TRUST_SIGNALS = [
  "Sin costo de adquisición",
  "Pagos garantizados",
  "Historial clínico digital incluido",
]

export function Hero() {
  return (
    <section className="min-h-screen pt-16 flex items-center bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20 items-center">

          {/* Left: copy + CTA */}
          <div className="flex flex-col gap-6">
            <Badge className="w-fit bg-blue-50 text-[#1434CB] border-blue-100 hover:bg-blue-50 text-xs font-medium px-3 py-1">
              Construyendo la red de salud y bienestar animal más grande de México
            </Badge>

            <h1 className="text-5xl font-bold tracking-tight text-gray-900 lg:text-6xl leading-[1.1]">
              Pacientes nuevos.
              <br />
              <span className="text-[#1434CB]">Sin invertir en marketing.</span>
              <br />
              Cada mes.
            </h1>

            <p className="text-xl text-gray-500 leading-relaxed max-w-lg">
              KD trae tutores comprometidos con la salud de sus mascotas directo a tu clínica, tú solo los atiendes.
            </p>

            {/* Inline email capture — DoorDash style */}
            <div className="flex flex-col sm:flex-row gap-3 max-w-md">
              <Input
                type="email"
                placeholder="tuclinica@email.com"
                className="border-gray-300 h-11 flex-1 rounded-full px-4"
              />
              <Button className="h-11 px-6 w-full sm:w-auto shrink-0 gap-2">
                Comenzar gratis <ArrowRight className="h-4 w-4" />
              </Button>
            </div>

            {/* Trust signals */}
            <ul className="flex flex-col sm:flex-row gap-3 sm:gap-6">
              {TRUST_SIGNALS.map((signal) => (
                <li key={signal} className="flex items-center gap-1.5 text-sm text-gray-500">
                  <CheckCircle className="h-4 w-4 text-gray-400 shrink-0" />
                  {signal}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: image/dashboard placeholder */}
          <div className="flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-lg">
              {/* Hero image */}
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-sm">
                <Image
                  src="/assets/1.jpg"
                  alt="Veterinaria atendiendo a una mascota"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {/* Floating card — bottom left */}
              <div className="absolute bottom-4 left-4 lg:-bottom-4 lg:-left-4 bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-md flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                  <CheckCircle className="h-4 w-4 text-emerald-500" />
                </div>
                <div className="flex flex-col gap-0">
                  <span className="text-xs text-gray-400">El tutor ya pagó.</span>
                  <span className="text-sm font-bold text-gray-900">Tú solo lo atiendes.</span>
                </div>
              </div>
              {/* Floating card — top right */}
              <div className="absolute top-4 right-4 lg:-top-4 lg:-right-4 bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-md flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                  <ShieldCheck className="h-4 w-4 text-[#1434CB]" />
                </div>
                <div className="flex flex-col gap-0">
                  <span className="text-xs text-gray-400">Sin cobranza.</span>
                  <span className="text-sm font-bold text-gray-900">Sin riesgo.</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
