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
import { CheckCircle, ArrowRight, MapPin, FileText, Star, Stethoscope } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import React from "react"

const SERVICIOS = [
  "Consulta física",
  "Vacunas",
  "Desparasitación interna y externa",
  "Examen de laboratorio",
  "Limpieza dental sin anestesia",
  "Grooming",
]

const COLONIAS_CDMX = ["Polanco", "Santa Fe", "Interlomas", "Roma", "Condesa", "Del Valle", "Narvarte"]
const COLONIAS_NL   = ["San Pedro Garza García", "San Nicolás de los Garza", "Monterrey — San Jerónimo", "Monterrey — Cumbres"]

const REQUISITOS = [
  {
    icon: MapPin,
    title: "Zona de cobertura",
    items: ["CDMX: Polanco, Roma, Condesa, Del Valle, Narvarte, Santa Fe, Interlomas", "Nuevo León: San Pedro, San Nicolás, Monterrey (San Jerónimo, Cumbres)"],
  },
  {
    icon: Stethoscope,
    title: "Servicios",
    items: ["Al menos uno del catálogo Kate&Doug", "Consulta física, vacunas, laboratorio, grooming, dental", "Consultorio físico — no se aceptan servicios solo a domicilio"],
  },
  {
    icon: Star,
    title: "Reputación",
    items: ["Calificación en Google de 4.5 o más (auto-aprobado)", "Entre 4.0 y 4.4 se evalúa en visita presencial", "Sin reseñas — se evalúa caso por caso"],
  },
  {
    icon: FileText,
    title: "Documentos",
    items: ["RFC activo (persona moral o física con actividad empresarial)", "Cédula profesional del veterinario responsable", "Cuenta bancaria a nombre del RFC para recibir pagos"],
  },
]

const PASOS = [
  { num: "01", title: "Revisamos tu solicitud",   desc: "Nuestro equipo verifica que tu clínica cumple los requisitos de zona, servicios y documentación. Te respondemos en menos de 24 horas hábiles." },
  { num: "02", title: "Primera llamada",           desc: "Un miembro del equipo te llama para conocer tu operación, resolver dudas y confirmar el modelo. Sin compromisos." },
  { num: "03", title: "Visita de verificación",    desc: "Nuestro equipo visita tu clínica en persona para conocer las instalaciones. Si todo está en orden, quedas aprobado ese mismo día." },
  { num: "04", title: "Tu clínica, activa",        desc: "Configuras tu perfil, conectas tu cuenta bancaria y en 24 horas ya puedes recibir pacientes Kate&Doug." },
]

export default function UnetePage() {
  const router = useRouter()
  const params = useSearchParams()
  const emailFromHero = params.get("email") ?? ""
  const [servicios, setServicios] = React.useState<string[]>([])

  function toggleServicio(s: string) {
    setServicios((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s])
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    router.push("/gracias")
  }

  return (
    <>
      {/* ── HERO ──────────────────────────────────────────── */}
      <section className="bg-white py-20 border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
            <div className="flex flex-col gap-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">Solicitud de ingreso</p>
              <h1 className="text-5xl font-bold tracking-tight text-gray-900 leading-tight">
                La red de veterinarias más selecta de México.{" "}
                <span className="text-[#1434CB]">¿Tu clínica cumple el perfil?</span>
              </h1>
              <p className="text-xl text-gray-500 leading-relaxed">
                Si ya tienes una clínica con buena atención y quieres crecer sin gastar en publicidad, esto es para ti. Kate&Doug conecta tutores comprometidos con veterinarias como la tuya, sin costo, sin letra chica.
              </p>
              <ul className="flex flex-col gap-3">
                {["Sin costo de entrada ni mensualidades", "Pacientes nuevos desde el primer mes", "Pago garantizado cada semana vía Stripe", "Tu equipo de soporte disponible siempre"].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-[#1434CB] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "24 hrs", label: "Para estar activo en la red" },
                { value: "$0",     label: "Costo de entrada o mensualidad" },
                { value: "100%",   label: "De los pagos llegan directo a ti" },
                { value: "4.5+",   label: "Calificación mínima en Google" },
              ].map((stat) => (
                <div key={stat.label} className="bg-gray-50 border border-gray-100 rounded-2xl p-6 flex flex-col gap-1">
                  <span className="text-3xl font-bold text-[#1434CB]">{stat.value}</span>
                  <span className="text-sm text-gray-500 leading-snug">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── REQUISITOS ────────────────────────────────────── */}
      <section className="py-16 bg-gray-50 border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900">¿Tu clínica califica?</h2>
            <p className="text-gray-500 mt-2 text-sm">Si cumples estos criterios, ya tienes lo que necesitas para entrar a la red.</p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {REQUISITOS.map((r) => (
              <div key={r.title} className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col gap-4">
                <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center">
                  <r.icon className="h-5 w-5 text-[#1434CB]" />
                </div>
                <p className="font-bold text-gray-900 text-sm">{r.title}</p>
                <ul className="flex flex-col gap-2">
                  {r.items.map((item) => (
                    <li key={item} className="flex gap-2 items-start text-xs text-gray-500 leading-relaxed">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#1434CB] shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FORM ──────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">Solicitar acceso</p>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">Completa tu solicitud.</h2>
            <p className="text-gray-500 mt-3">Tarda menos de 5 minutos. Nuestro equipo la revisará en menos de 24 horas hábiles.</p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">

            {/* Sección 1 — Tu negocio */}
            <div className="px-8 py-7 border-b border-gray-100">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-5">Tu negocio</p>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <Label className="text-sm font-medium text-gray-700">Nombre de la clínica</Label>
                  <Input placeholder="Clínica Veterinaria El Roble" className="border-gray-300 w-full" required />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label className="text-sm font-medium text-gray-700">Tipo de negocio</Label>
                  <Select required>
                    <SelectTrigger className="border-gray-300 w-full">
                      <SelectValue placeholder="Selecciona" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="clinica">Clínica Veterinaria</SelectItem>
                      <SelectItem value="hospital">Hospital Veterinario</SelectItem>
                      <SelectItem value="estetica">Estética y Grooming</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label className="text-sm font-medium text-gray-700">Ciudad</Label>
                  <Select required>
                    <SelectTrigger className="border-gray-300 w-full">
                      <SelectValue placeholder="Ciudad de México o Nuevo León" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cdmx">Ciudad de México</SelectItem>
                      <SelectItem value="nl">Nuevo León</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label className="text-sm font-medium text-gray-700">Colonia o municipio</Label>
                  <Input placeholder="Ej. Polanco, San Pedro Garza García…" className="border-gray-300 w-full" required />
                </div>
              </div>
            </div>

            {/* Sección 2 — Servicios */}
            <div className="px-8 py-7 border-b border-gray-100">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">Servicios que ofreces</p>
              <p className="text-xs text-gray-400 mb-5">Selecciona todos los que apliquen. Debes ofrecer al menos uno.</p>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {SERVICIOS.map((s) => {
                  const selected = servicios.includes(s)
                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() => toggleServicio(s)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-medium transition-all text-left ${
                        selected
                          ? "bg-blue-50 border-[#1434CB] text-[#1434CB]"
                          : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
                      }`}
                    >
                      <div className={`h-4 w-4 rounded-full border-2 flex items-center justify-center shrink-0 ${selected ? "border-[#1434CB] bg-[#1434CB]" : "border-gray-300"}`}>
                        {selected && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
                      </div>
                      {s}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Sección 3 — Reputación */}
            <div className="px-8 py-7 border-b border-gray-100">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-5">Reputación en Google</p>
              <div className="flex flex-col gap-1.5">
                <Label className="text-sm font-medium text-gray-700">Calificación aproximada en Google Maps</Label>
                <Select required>
                  <SelectTrigger className="border-gray-300">
                    <SelectValue placeholder="Selecciona tu calificación" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="4.5+">4.5 o más</SelectItem>
                    <SelectItem value="4.0-4.4">Entre 4.0 y 4.4</SelectItem>
                    <SelectItem value="sin-resenas">Sin reseñas aún</SelectItem>
                    <SelectItem value="menos-4">Menos de 4.0</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-400 mt-1">Si tienes menos de 4.0, puedes aplicar igualmente — evaluamos cada caso.</p>
              </div>
            </div>

            {/* Sección 4 — Contacto */}
            <div className="px-8 py-7 border-b border-gray-100">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-5">Datos de contacto</p>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <Label className="text-sm font-medium text-gray-700">Nombre completo</Label>
                  <Input placeholder="Dr. Juan García" className="border-gray-300 w-full" required />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label className="text-sm font-medium text-gray-700">Cargo</Label>
                  <Select>
                    <SelectTrigger className="border-gray-300 w-full">
                      <SelectValue placeholder="Tu rol en la clínica" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dueno">Dueño / Socio</SelectItem>
                      <SelectItem value="vet">Veterinario responsable</SelectItem>
                      <SelectItem value="admin">Administrador</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label className="text-sm font-medium text-gray-700">Email de contacto</Label>
                  <Input type="email" placeholder="dr@tuclinica.com" defaultValue={emailFromHero} className="border-gray-300 w-full" required />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label className="text-sm font-medium text-gray-700">Teléfono</Label>
                  <div className="flex rounded-md border border-gray-300 overflow-hidden focus-within:ring-1 focus-within:ring-ring">
                    <select className="border-0 border-r border-gray-200 bg-gray-50 px-3 text-sm text-gray-700 focus:outline-none shrink-0">
                      <option value="+52">🇲🇽 +52</option>
                      <option value="+1">🇺🇸 +1</option>
                      <option value="+1ca">🇨🇦 +1</option>
                      <option value="+34">🇪🇸 +34</option>
                      <option value="+54">🇦🇷 +54</option>
                      <option value="+57">🇨🇴 +57</option>
                      <option value="+56">🇨🇱 +56</option>
                    </select>
                    <input type="tel" placeholder="55 0000 0000" className="flex-1 px-3 py-2 text-sm bg-white focus:outline-none" required />
                  </div>
                </div>
              </div>
            </div>

            {/* Sección 5 — Documentación */}
            <div className="px-8 py-7 border-b border-gray-100">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">Documentación</p>
              <p className="text-xs text-gray-400 mb-5">No necesitas subir nada ahora. Solo confirma que cuentas con esto.</p>
              <div className="flex flex-col gap-3">
                {[
                  "Cuento con RFC activo (persona moral o física con actividad empresarial)",
                  "El veterinario responsable tiene cédula profesional vigente",
                  "Tengo o puedo abrir una cuenta bancaria a nombre del RFC para recibir pagos",
                ].map((item) => (
                  <label key={item} className="flex items-start gap-3 cursor-pointer group">
                    <input type="checkbox" className="mt-0.5 h-4 w-4 accent-[#1434CB] shrink-0" required />
                    <span className="text-sm text-gray-600 leading-relaxed group-hover:text-gray-900 transition-colors">{item}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Submit */}
            <div className="px-8 py-7 bg-gray-50 flex flex-col gap-4">
              <Button type="submit" size="lg" className="w-full gap-2">
                Enviar solicitud <ArrowRight className="h-4 w-4" />
              </Button>
              <p className="text-xs text-center text-gray-400">
                Al enviar aceptas nuestros{" "}
                <span className="underline cursor-pointer">Términos de servicio</span>{" "}
                y{" "}
                <span className="underline cursor-pointer">Política de privacidad</span>.
                Tu información nunca se comparte con terceros.
              </p>
            </div>

          </form>
        </div>
      </section>

      {/* ── QUÉ PASA DESPUÉS ──────────────────────────────── */}
      <section className="py-20 bg-[#E8EDFF]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">Lo que sigue</p>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">De solicitud a tu primera consulta nueva.</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PASOS.map((paso) => (
              <div key={paso.num} className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col gap-3">
                <span className="text-4xl font-bold text-gray-200">{paso.num}</span>
                <p className="font-bold text-gray-900 text-sm">{paso.title}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{paso.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
