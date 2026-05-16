import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Zap, ShieldCheck, Clock, Banknote } from "lucide-react"

const HOW_IT_WORKS = [
  {
    icon: Banknote,
    title: "Tú cobras el servicio en clínica",
    body: "El dueño de la mascota paga su consulta o servicio directamente contigo. KD no interviene en ese momento ni toca ese dinero.",
  },
  {
    icon: Clock,
    title: "KD consolida tu liquidación",
    body: "Cada semana calculamos automáticamente todos los servicios prestados a suscriptores KD en tu clínica y preparamos tu pago.",
  },
  {
    icon: Zap,
    title: "Depósito automático de manera semanal",
    body: "Los fondos llegan a tu cuenta bancaria vía Stripe Connect. Sin trámites, sin llamadas, sin esperas.",
  },
  {
    icon: ShieldCheck,
    title: "Sin retenciones ni sorpresas",
    body: "Recibes exactamente lo acordado por cada servicio. Sin comisiones ocultas, sin descuentos de último momento.",
  },
]

const PAYMENT_DETAILS = [
  { label: "Costo de unirte a la red",              value: "$0",           highlight: true },
  { label: "Costo de configuración",                value: "$0",           highlight: true },
  { label: "Comisión que KD cobra por consulta",    value: "$0",           highlight: true },
  { label: "Frecuencia de pago",                    value: "Semanal",      highlight: false },
  { label: "Método de pago",                        value: "Stripe Connect", highlight: false },
  { label: "Tiempo de acreditación",                value: "1–2 días hábiles", highlight: false },
  { label: "Divisas soportadas",                    value: "MXN / USD",    highlight: false },
]

export function Payments() {
  return (
    <section className="py-24 bg-gray-50" id="pagos">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-medium uppercase tracking-widest text-[#1434CB] mb-3">
            Pagos
          </p>
          <h2 className="text-4xl font-bold sm:text-5xl leading-tight">
            Tú haces el trabajo. Nosotros te pagamos.
          </h2>
          <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
            Unirte a la red es gratis. Cada semana recibes automáticamente el pago por los servicios prestados, directo a tu cuenta, sin papeleo.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 items-center">

          {/* Left: how it works — 4 steps */}
          <div className="flex flex-col gap-5">
            {HOW_IT_WORKS.map((item) => (
              <div key={item.title} className="flex gap-4 items-start">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white border border-gray-200 shadow-sm shrink-0">
                  <item.icon className="h-5 w-5 text-gray-600" />
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="font-semibold text-gray-900">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.body}</p>
                </div>
              </div>
            ))}

            <Button variant="outline" className="w-fit mt-2 gap-2 border-gray-300 text-gray-700">
              Ver detalles de Stripe Connect <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Right: payment detail card */}
          <div className="flex flex-col gap-4">

            {/* Hero highlight */}
            <Card className="bg-gray-900 border-0 text-white">
              <CardContent className="px-8 py-8 flex flex-col gap-2">
                <p className="text-sm text-gray-400 uppercase tracking-widest font-medium">
                  Costo para la clínica
                </p>
                <div className="flex items-end gap-2 mt-1">
                  <span className="text-8xl font-bold leading-none">$0</span>
                </div>
                <p className="text-gray-400 text-sm mt-2">
                  Sin mensualidades. Sin comisiones. Sin contrato de permanencia.
                </p>
              </CardContent>
            </Card>

            {/* Payment detail rows */}
            <Card className="border-gray-200 bg-white">
              <CardContent className="px-6 py-2">
                {PAYMENT_DETAILS.map((row, i) => (
                  <div
                    key={row.label}
                    className={`flex items-center justify-between py-3.5 ${
                      i < PAYMENT_DETAILS.length - 1 ? "border-b border-gray-100" : ""
                    }`}
                  >
                    <span className="text-sm text-gray-600">{row.label}</span>
                    <span className={`text-sm font-semibold ${row.highlight ? "text-gray-900" : "text-gray-700"}`}>
                      {row.value}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Stripe badge */}
            <div className="flex items-center justify-center gap-3 px-4 py-3 rounded-lg border border-gray-200 bg-white">
              <svg className="shrink-0" xmlns="http://www.w3.org/2000/svg" width="50" height="21" viewBox="0 0 50 21" aria-label="Stripe">
                <path fillRule="evenodd" clipRule="evenodd" d="M50 10.8c0-3.6-1.8-6.5-5.1-6.5-3.4 0-5.4 2.9-5.4 6.5 0 4.3 2.4 6.4 5.8 6.4 1.7 0 3-.4 3.9-.9v-2.8c-.9.5-2 .8-3.3.8-1.3 0-2.5-.5-2.6-2h6.6c0-.2.1-.8.1-1.5zm-6.7-1.4c0-1.5.9-2.1 1.7-2.1s1.6.6 1.6 2.1h-3.3zM34.4 4.3c-1.3 0-2.2.6-2.7 1l-.2-.8h-3v16.6l3.4-.7V17c.5.4 1.3.9 2.5.9 2.5 0 4.8-2 4.8-6.5-.1-4.1-2.4-6.1-4.8-6.1zm-.8 9.4c-.8 0-1.3-.3-1.7-.7V8.1c.4-.4.9-.6 1.7-.6 1.3 0 2.2 1.5 2.2 3.1 0 1.7-.9 3.1-2.2 3.1zM23.3.8l3.4-.7v2.8l-3.4.7V.8zM23.3 4.5h3.4v12.8h-3.4V4.5zM19.8 5.4l-.2-1h-2.9v12.9h3.4V8.5c.8-1.1 2.2-.9 2.6-.7V4.5c-.5-.2-2.1-.5-2.9.9zM13 1.9l-3.3.7-.1 11c0 2 1.5 3.5 3.6 3.5 1.1 0 2-.2 2.4-.4v-2.8c-.4.2-2.5.8-2.5-1.2V7.4h2.5V4.5H13V1.9zM3.6 8.1c0-.5.4-.7 1.2-.7 1.1 0 2.4.3 3.5.9V5.1C7.1 4.7 5.8 4.3 4.8 4.3 2 4.3 0 5.8 0 8.3c0 3.9 5.4 3.2 5.4 4.9 0 .6-.5.8-1.4.8-1.2 0-2.7-.5-3.9-1.1v3.2c1.3.6 2.7.8 3.9.8 2.9 0 4.9-1.4 4.9-3.9C8.9 9 3.6 9.8 3.6 8.1z" fill="#635BFF"/>
              </svg>
              <p className="text-xs text-gray-500">
                🔒 Procesado con la infraestructura de pagos más segura del mundo.
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
