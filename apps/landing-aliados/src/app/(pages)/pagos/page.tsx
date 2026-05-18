import { PageHero } from "@/components/pages/page-hero"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Banknote, Clock, Zap, ShieldCheck, CheckCircle } from "lucide-react"
import Link from "next/link"

const CYCLE_STEPS = [
  { day: "Lun–Dom", label: "Semana de servicio",  desc: "Tu clínica atiende consultas, vacunas, grooming y procedimientos registrados en la plataforma Kate&Doug durante la semana." },
  { day: "Lunes",   label: "Corte semanal",        desc: "Kate&Doug cierra el ciclo, calcula el total de servicios prestados y genera tu liquidación automáticamente. Recibes un resumen por correo." },
  { day: "Martes",  label: "Transferencia Stripe", desc: "Stripe Connect inicia la transferencia a tu cuenta bancaria registrada. Sin ninguna acción de tu parte." },
  { day: "Miér",    label: "Acreditación",          desc: "Los fondos se reflejan en tu cuenta bancaria. Recibes una notificación con el detalle del depósito." },
]

const FEE_ROWS = [
  { concepto: "Membresía mensual a la red",             monto: "$0",                      note: "Siempre gratis" },
  { concepto: "Comisión Kate&Doug por consulta o servicio", monto: "$0",                  note: "Sin comisiones" },
  { concepto: "Costo de alta en la plataforma",         monto: "$0",                      note: "Sin costo inicial" },
  { concepto: "Contrato de permanencia",                monto: "Ninguno",                 note: "Cancela cuando quieras" },
  { concepto: "Tarifa de procesamiento Stripe",         monto: "0.25% + $12 MXN por pago", note: "Cubre Stripe, no Kate&Doug" },
  { concepto: "Frecuencia de pago",                     monto: "Semanal",                 note: "Todos los martes" },
  { concepto: "Tiempo de acreditación",                 monto: "1–2 días hábiles",        note: "" },
]

const SECURITY_ITEMS = [
  { icon: ShieldCheck, title: "Encriptación de extremo a extremo", body: "Stripe protege todos los datos bancarios con encriptación TLS y cumplimiento PCI DSS nivel 1, el estándar más alto de la industria de pagos. Ningún dato sensible pasa por los servidores de Kate&Doug." },
  { icon: ShieldCheck, title: "Separación de fondos",              body: "Los fondos de cada clínica están segregados dentro de Stripe Connect. Cada aliado recibe exactamente lo que le corresponde, sin mezclas, sin retrasos por otros pagos de la red." },
  { icon: ShieldCheck, title: "Historial de pagos auditable",      body: "Desde tu dashboard puedes descargar el comprobante de cada liquidación, revisar el historial completo y conciliar tus ingresos Kate&Doug con tu contabilidad interna. Todo en un solo lugar." },
]

const FAQS = [
  { q: "¿Qué pasa si hay un error en mi pago?",                    a: "Puedes reportarlo directamente desde la plataforma o por nuestro canal de soporte. Nuestro equipo revisa cada disputa en menos de 24 horas hábiles y te confirma la resolución. Si el error es de Kate&Doug, se corrige en el siguiente ciclo semanal." },
  { q: "¿Puedo pedir que me paguen en dólares?",                   a: "Por el momento, Kate&Doug procesa todos los pagos en pesos mexicanos (MXN) vía Stripe Connect. Si en el futuro habilitamos pagos en USD, las clínicas aliadas activas serán las primeras en saberlo." },
  { q: "¿Qué pasa con los pagos si cancelo mi cuenta?",            a: "Al cancelar tu cuenta, los pagos pendientes del ciclo en curso se liquidan en el siguiente martes normal. Tu historial de pagos permanece disponible para descarga durante 90 días después de la cancelación." },
  { q: "¿Puedo ver exactamente por qué servicio me pagaron?",      a: "Sí. Cada liquidación incluye el desglose por consulta, vacuna, procedimiento o servicio de grooming atendido durante la semana. Puedes descargarlo en formato PDF desde tu dashboard." },
  { q: "¿Puedo tener varias cuentas bancarias registradas?",       a: "Por el momento cada clínica puede tener una cuenta bancaria activa en Stripe Connect. Si necesitas cambiarla, el proceso toma entre 1 y 2 días hábiles y los pagos pendientes no se interrumpen." },
]

export default function PagosPage() {
  return (
    <>
      <PageHero
        tag="Cómo te pagamos"
        title={<>Pagos transparentes, <span className="text-[#1434CB]">automáticos y sin sorpresas.</span></>}
        subtitle="Unirte a la red no tiene costo. Cada semana recibes automáticamente el pago por los servicios que prestaste a pacientes Kate&Doug, directo a tu cuenta bancaria vía Stripe Connect. Sin trámites, sin esperas, sin llamadas."
      />

      {/* Core model */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 items-center">
            <div className="flex flex-col gap-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">El modelo</p>
              <h2 className="text-4xl font-bold text-gray-900 leading-tight">Tú atiendes. Nosotros te pagamos.</h2>
              <p className="text-gray-500 leading-relaxed">La clínica presta el servicio, una consulta veterinaria, una vacuna, un baño de grooming, un corte estético, y lo registra en la plataforma. Kate&Doug consolida todo lo que atendiste durante la semana y genera tu liquidación automáticamente a través de Stripe Connect. Sin que tengas que pedir nada.</p>
              <div className="flex flex-col gap-4">
                {[
                  { icon: Banknote, t: "Tú cobras directamente en clínica",      b: "El pago de la consulta o servicio de grooming lo recibes tú en tu clínica en el momento de la atención. Kate&Doug no interviene en esa transacción." },
                  { icon: Clock,    t: "Kate&Doug consolida cada semana",         b: "Sumamos todos los servicios registrados en la plataforma durante la semana, consultas, vacunas, grooming, procedimientos, y preparamos tu liquidación automáticamente." },
                  { icon: Zap,      t: "Stripe deposita sin que hagas nada",      b: "Sin que tengas que pedir nada, el martes de cada semana Stripe transfiere el total a tu cuenta bancaria registrada." },
                ].map((item) => (
                  <div key={item.t} className="flex gap-4">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 border border-gray-200 shrink-0">
                      <item.icon className="h-4 w-4 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{item.t}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{item.b}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* $0 card */}
            <div className="flex flex-col gap-4">
              <Card className="bg-[#030027] border-0 text-white">
                <CardContent className="px-8 py-10">
                  <p className="text-sm text-gray-400 uppercase tracking-widest font-medium mb-3">Costo para la clínica</p>
                  <div className="text-9xl font-bold leading-none text-white">$0</div>
                  <p className="text-gray-400 text-sm mt-4">Sin mensualidades · Sin comisiones · Sin contratos</p>
                </CardContent>
              </Card>
              <div className="flex items-center gap-3 px-5 py-4 rounded-xl border border-gray-200 bg-white">
                <svg className="shrink-0" xmlns="http://www.w3.org/2000/svg" width="50" height="21" viewBox="0 0 50 21" aria-label="Stripe">
                  <path fillRule="evenodd" clipRule="evenodd" d="M50 10.8c0-3.6-1.8-6.5-5.1-6.5-3.4 0-5.4 2.9-5.4 6.5 0 4.3 2.4 6.4 5.8 6.4 1.7 0 3-.4 3.9-.9v-2.8c-.9.5-2 .8-3.3.8-1.3 0-2.5-.5-2.6-2h6.6c0-.2.1-.8.1-1.5zm-6.7-1.4c0-1.5.9-2.1 1.7-2.1s1.6.6 1.6 2.1h-3.3zM34.4 4.3c-1.3 0-2.2.6-2.7 1l-.2-.8h-3v16.6l3.4-.7V17c.5.4 1.3.9 2.5.9 2.5 0 4.8-2 4.8-6.5-.1-4.1-2.4-6.1-4.8-6.1zm-.8 9.4c-.8 0-1.3-.3-1.7-.7V8.1c.4-.4.9-.6 1.7-.6 1.3 0 2.2 1.5 2.2 3.1 0 1.7-.9 3.1-2.2 3.1zM23.3.8l3.4-.7v2.8l-3.4.7V.8zM23.3 4.5h3.4v12.8h-3.4V4.5zM19.8 5.4l-.2-1h-2.9v12.9h3.4V8.5c.8-1.1 2.2-.9 2.6-.7V4.5c-.5-.2-2.1-.5-2.9.9zM13 1.9l-3.3.7-.1 11c0 2 1.5 3.5 3.6 3.5 1.1 0 2-.2 2.4-.4v-2.8c-.4.2-2.5.8-2.5-1.2V7.4h2.5V4.5H13V1.9zM3.6 8.1c0-.5.4-.7 1.2-.7 1.1 0 2.4.3 3.5.9V5.1C7.1 4.7 5.8 4.3 4.8 4.3 2 4.3 0 5.8 0 8.3c0 3.9 5.4 3.2 5.4 4.9 0 .6-.5.8-1.4.8-1.2 0-2.7-.5-3.9-1.1v3.2c1.3.6 2.7.8 3.9.8 2.9 0 4.9-1.4 4.9-3.9C8.9 9 3.6 9.8 3.6 8.1z" fill="#635BFF"/>
                </svg>
                <p className="text-xs text-gray-500">Pagos procesados con Stripe Connect; infraestructura usada por Amazon, Shopify y Uber.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Weekly payment cycle */}
      <section className="py-24 bg-[#E8EDFF]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">Ciclo de pago</p>
            <h2 className="text-4xl font-bold text-gray-900">Así funciona cada semana.</h2>
          </div>
          <div className="relative">
            <div className="hidden md:block absolute top-8 left-[calc(12.5%+2rem)] right-[calc(12.5%+2rem)] h-px bg-gray-300" />
            <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
              {CYCLE_STEPS.map((step, i) => (
                <div key={step.label} className="flex flex-col items-center text-center gap-3">
                  <div className="relative z-10 flex h-16 w-16 flex-col items-center justify-center rounded-full bg-[#1434CB] shadow-sm">
                    <span className="text-xs font-bold text-white">{step.day}</span>
                  </div>
                  <p className="font-bold text-gray-900">{step.label}</p>
                  <p className="text-xs text-gray-500 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Fee structure */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">Estructura de costos</p>
            <h2 className="text-4xl font-bold text-gray-900">Todo lo que pagas, y todo lo que no pagas.</h2>
          </div>
          <div className="rounded-xl overflow-hidden border border-gray-200">
            {FEE_ROWS.map((row, i) => (
              <div key={row.concepto} className={`flex items-center justify-between px-6 py-4 border-b border-gray-100 last:border-0 ${i % 2 === 1 ? "bg-gray-50" : "bg-white"}`}>
                <span className="text-sm text-gray-700">{row.concepto}</span>
                <div className="text-right">
                  <span className="text-sm font-bold text-gray-900">{row.monto}</span>
                  <span className="block text-xs text-gray-400">{row.note}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security */}
      <section className="py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">Seguridad</p>
            <h2 className="text-4xl font-bold text-gray-900">Tu dinero, siempre protegido.</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {SECURITY_ITEMS.map((item) => (
              <Card key={item.title} className="border-gray-200 bg-white">
                <CardContent className="pt-6 flex flex-col gap-3">
                  <div className="h-10 w-10 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center">
                    <item.icon className="h-5 w-5 text-gray-500" />
                  </div>
                  <h3 className="font-bold text-gray-900">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.body}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900">Preguntas sobre pagos</h2>
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
            <Button size="lg" className="gap-2 bg-white text-[#030027] hover:bg-white/90 font-bold" asChild>
              <Link href="/unete">Quiero unirme a la red <ArrowRight className="h-4 w-4" /></Link>
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
