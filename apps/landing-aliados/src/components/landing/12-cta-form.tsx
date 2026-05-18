"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"

export function CtaForm() {
  const router = useRouter()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    router.push("/gracias")
  }

  return (
    <section className="py-24 bg-gray-900">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-sm font-medium uppercase tracking-widest text-[#1434CB] mb-3">
            Únete a la red
          </p>
          <h2 className="text-4xl font-bold text-white sm:text-5xl mb-4">
            Tu primera consulta nueva en menos de 24 horas.
          </h2>
          <p className="text-gray-400 text-lg">
            Sin suscripciones. Sin plazos forzosos. Sin papeleo.
          </p>
        </div>

        {/* Form card */}
        <div className="bg-white rounded-2xl p-8 shadow-xl">
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="nombre" className="text-gray-700 text-sm font-medium">
                  Nombre del responsable
                </Label>
                <Input id="nombre" placeholder="Dr. Juan García" className="border-gray-300" />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="clinica" className="text-gray-700 text-sm font-medium">
                  Nombre de la clínica
                </Label>
                <Input id="clinica" placeholder="Clínica Veterinaria XYZ" className="border-gray-300" />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="email" className="text-gray-700 text-sm font-medium">
                  Email de contacto
                </Label>
                <Input id="email" type="email" placeholder="dr@clinica.com" className="border-gray-300" />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label className="text-gray-700 text-sm font-medium">
                  Ciudad
                </Label>
                <Select>
                  <SelectTrigger className="border-gray-300 h-9 w-full">
                    <SelectValue placeholder="Selecciona tu ciudad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cdmx">Ciudad de México</SelectItem>
                    <SelectItem value="mty">Nuevo León</SelectItem>
                    <SelectItem value="otra">Otra</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <Label className="text-gray-700 text-sm font-medium">
                  ¿Qué tipo de negocio tienes?
                </Label>
                <Select>
                  <SelectTrigger className="border-gray-300 h-9 w-full">
                    <SelectValue placeholder="Selecciona el tipo de negocio" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="clinica">Clínica Veterinaria</SelectItem>
                    <SelectItem value="hospital">Hospital Veterinario</SelectItem>
                    <SelectItem value="estetica">Estética y Grooming</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button type="submit" size="lg" className="w-full mt-2 gap-2">
              Solicitar acceso gratuito <ArrowRight className="h-4 w-4" />
            </Button>

            <p className="text-xs text-center text-gray-400">
              Al registrarte aceptas nuestros{" "}
              <span className="underline cursor-pointer">Términos de servicio</span>{" "}
              y{" "}
              <span className="underline cursor-pointer">Política de privacidad</span>.
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}
