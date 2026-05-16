import { PageHero } from "@/components/pages/page-hero"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle, Calendar, ClipboardList, Bell, BarChart2 } from "lucide-react"
import Image from "next/image"

const PHASES = [
  { num: "01", label: "Registro",      desc: "Día 1" },
  { num: "02", label: "Configuración", desc: "Días 1–3" },
  { num: "03", label: "Operación",     desc: "Día 4 en adelante" },
]

const ONBOARDING_STEPS = [
  {
    num: "01",
    title: "Crea tu cuenta",
    body: "Llena el formulario con los datos básicos de tu clínica: nombre, dirección, servicios y veterinario responsable. Sin documentos complicados, sin contratos que firmar.",
    detail: "Tiempo estimado: 10 minutos",
  },
  {
    num: "02",
    title: "Verificamos tu clínica",
    body: "Nuestro equipo revisa tu solicitud y te confirma si cumples los requisitos para ser aliado Kate&Doug. Si hay algo que ajustar, te lo decimos con claridad.",
    detail: "Respuesta en menos de 24 horas hábiles",
  },
  {
    num: "03",
    title: "Configura tu perfil público",
    body: "Agrega fotos de tu clínica, describe tus servicios, horarios y especialidades. Tu perfil es lo primero que ven los tutores Kate&Doug en tu zona antes de agendar.",
    detail: "El perfil se activa de inmediato",
  },
  {
    num: "04",
    title: "Conecta tu cuenta bancaria",
    body: "Vincula tu cuenta vía Stripe Connect para recibir pagos automáticos cada semana. El proceso es seguro y tarda entre 1 y 2 días hábiles en verificarse.",
    detail: "Verificación de cuenta: 1–2 días hábiles",
  },
  {
    num: "05",
    title: "Sesión de bienvenida",
    body: "Un miembro de nuestro equipo te hace un recorrido completo de la plataforma por videollamada: agenda, expedientes, pagos y todo lo que necesitas para operar desde el primer día.",
    detail: "Sesión de 45 minutos por videollamada",
  },
]

const DAILY_FEATURES = [
  { icon: Calendar,      title: "Agenda del día",             body: "Ve, confirma y reprograma citas directamente desde el panel principal. Tus pacientes Kate&Doug aparecen ya confirmados con su historial clínico listo." },
  { icon: ClipboardList, title: "Registro de consulta",       body: "Abre el expediente del paciente, registra el motivo de consulta, diagnóstico y tratamiento en formato SOAP. Todo queda guardado y disponible para visitas futuras." },
  { icon: Bell,          title: "Seguimiento post-consulta",  body: "Registra indicaciones, próxima cita y notas de seguimiento. El tutor las recibe automáticamente a través de la app Kate&Doug." },
  { icon: BarChart2,     title: "Cierre de jornada",          body: "Revisa tu resumen del día: consultas atendidas, ingresos generados, próximas citas y pendientes para el día siguiente. Todo en una pantalla." },
]

const GROWTH_BULLETS = [
  "Más reseñas verificadas = más tutores que eligen tu clínica primero.",
  "Reportes mensuales con tendencias de tu clínica vs. el promedio de la red.",
  "Acceso anticipado a nuevas funciones conforme la plataforma evoluciona.",
]

const FAQS = [
  { q: "¿Qué pasa si mi clínica no es aprobada?",             a: "Te comunicamos exactamente qué requisito no se cumplió y qué necesitas ajustar para volver a aplicar. El proceso de re-aplicación es el mismo y sin costo." },
  { q: "¿Puedo migrar mis expedientes actuales?",              a: "Sí. Si tienes expedientes en papel o en otro sistema, nuestro equipo te ayuda a estructurar la migración durante la sesión de bienvenida. Los formatos soportados se confirman en ese paso." },
  { q: "¿Qué pasa si quiero salirme de la red?",               a: "Puedes salir en cualquier momento sin penalización. Tus datos y expedientes permanecen disponibles para ti. Los pagos pendientes se liquidan en el siguiente ciclo semanal normal." },
  { q: "¿Puedo tener varios veterinarios en la misma cuenta?", a: "Sí. Puedes crear perfiles individuales por veterinario dentro de la misma clínica, con agenda, expedientes y reportes separados por profesional." },
]

export default function ComoFuncionaPage() {
  return (
    <>
      <PageHero
        tag="El proceso"
        title={<>De cero a <span className="text-[#1434CB]">tu primera consulta nueva</span> en 24 horas.</>}
        subtitle="Unirte a la red es sencillo. En tres fases, registro, configuración y operación, tu clínica queda lista para recibir nuevos pacientes y gestionar todo desde un solo lugar."
      />

      {/* Phase overview bar */}
      <section className="bg-white border-b border-gray-200 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-0 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-200">
            {PHASES.map((phase) => (
              <div key={phase.num} className="flex items-center gap-4 px-8 py-4 first:pl-0 last:pr-0">
                <span className="text-4xl font-bold text-gray-200">{phase.num}</span>
                <div>
                  <p className="font-bold text-gray-900">{phase.label}</p>
                  <p className="text-sm text-gray-400">{phase.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed onboarding steps */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 items-start">
            <div className="flex flex-col gap-4 lg:sticky lg:top-24">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">Fase 1 — Registro y configuración</p>
              <h2 className="text-4xl font-bold text-gray-900 leading-tight">Desde el registro hasta estar activo en la red.</h2>
              <p className="text-gray-500 leading-relaxed">Nuestro equipo te acompaña en cada paso. Solo necesitas los datos básicos de tu clínica y una cuenta bancaria para recibir pagos. El proceso completo toma menos de un día hábil.</p>
              <div className="relative w-full aspect-video rounded-xl overflow-hidden mt-4">
                <Image src="/assets/screen2.png" alt="Plataforma Kate&Doug — registro" fill className="object-cover object-left-top" />
              </div>
            </div>

            <div className="flex flex-col gap-6">
              {ONBOARDING_STEPS.map((step, i) => (
                <div key={step.num} className="flex gap-5">
                  <div className="flex flex-col items-center gap-2 shrink-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1434CB] text-white text-sm font-bold">
                      {step.num}
                    </div>
                    {i < ONBOARDING_STEPS.length - 1 && (
                      <div className="w-px flex-1 bg-gray-200 min-h-[2rem]" />
                    )}
                  </div>
                  <div className="flex flex-col gap-1.5 pb-6">
                    <h3 className="font-bold text-gray-900 text-lg">{step.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{step.body}</p>
                    <p className="text-xs text-gray-400 font-medium mt-1">{step.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Day-to-day platform usage */}
      <section className="py-24 bg-[#E8EDFF]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col gap-12">
          {/* Header */}
          <div className="flex flex-col gap-4 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">Fase 2 — Operación diaria</p>
            <h2 className="text-4xl font-bold text-gray-900 leading-tight">Un día normal con Vet Manager.</h2>
            <p className="text-gray-500 leading-relaxed">Una vez activa, la plataforma se integra a tu rutina sin fricción. Desde la mañana con tu agenda confirmada hasta el cierre del día con tu resumen de ingresos.</p>
          </div>
          {/* Cards */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {DAILY_FEATURES.map((f) => (
              <Card key={f.title} className="border-gray-200 bg-white shadow-none">
                <CardContent className="py-4 px-4 flex flex-col gap-1.5">
                  <f.icon className="h-5 w-5 text-[#1434CB]" />
                  <h4 className="text-sm font-semibold text-gray-900">{f.title}</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">{f.body}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          {/* Full-width image */}
          <div className="relative w-full aspect-[2/1] rounded-2xl overflow-hidden">
            <Image src="/assets/screen3.png" alt="Vet Manager — vista diaria" fill className="object-cover object-left-top" />
          </div>
        </div>
      </section>

      {/* Growth phase */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">Fase 3 — Crecimiento</p>
            <h2 className="text-4xl font-bold text-gray-900">Más pacientes, mejores datos, más ingresos.</h2>
            <p className="text-gray-500 mt-4 max-w-xl mx-auto">Con el tiempo, tu perfil acumula reseñas, tu historial de pagos se consolida y tu clínica gana más visibilidad dentro de la red. Cada mes activo trabaja a tu favor.</p>
          </div>
          <ul className="flex flex-col gap-4 max-w-xl mx-auto">
            {GROWTH_BULLETS.map((b) => (
              <li key={b} className="flex gap-3 items-start">
                <CheckCircle className="h-5 w-5 text-[#1434CB] shrink-0 mt-0.5" />
                <span className="text-gray-600 leading-relaxed">{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-gray-50">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900">Preguntas sobre el proceso</h2>
          </div>
          <div className="flex flex-col divide-y divide-gray-200">
            {FAQS.map((faq) => (
              <div key={faq.q} className="py-6">
                <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-[#030027]">
        <div className="mx-auto max-w-3xl px-4 text-center flex flex-col items-center gap-6">
          <h2 className="text-4xl font-bold text-white sm:text-5xl leading-tight">
            Tu próximo paciente ya tiene membresía.
            <br />
            Solo falta tu clínica.
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            Sin costo de entrada. Sin comisiones. Sin contrato de permanencia.
            <br />
            Tu clínica activa en menos de 24 horas.
          </p>
          <div className="flex flex-col items-center gap-2">
            <Button size="lg" className="gap-2 bg-white text-[#030027] hover:bg-white/90 font-bold">
              Quiero unirme a la red <ArrowRight className="h-4 w-4" />
            </Button>
            <span className="text-xs text-gray-500">Sin letras chiquitas.</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-gray-400 pt-2">
            <span className="flex items-center gap-1.5">🔒 Pagos vía Stripe Connect</span>
            <span className="text-gray-600">|</span>
            <span className="flex items-center gap-1.5">⚡ Activo en 24 hrs</span>
            <span className="text-gray-600">|</span>
            <span className="flex items-center gap-1.5">✓ Sin permanencia</span>
          </div>
        </div>
      </section>
    </>
  )
}
