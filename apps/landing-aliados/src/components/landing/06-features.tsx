import { Card, CardContent } from "@/components/ui/card"
import { Calendar, ClipboardList, CreditCard, MapPin } from "lucide-react"
import Image from "next/image"

const FEATURES = [
  {
    icon: Calendar,
    title: "Citas que llegan solas",
    body: "Los pacientes KD agendan directo desde su app. Tú ves tu semana organizada, sin llamadas, sin WhatsApps perdidos, sin no-shows.",
  },
  {
    icon: ClipboardList,
    title: "El historial que viaja con el paciente",
    body: "Cada consulta, vacuna y diagnóstico queda registrado y accesible desde cualquier dispositivo. Si el paciente visita otra clínica KD, su historia ya está ahí.",
  },
  {
    icon: CreditCard,
    title: "Cobras sin perseguir a nadie",
    body: "KD liquida directamente a tu clínica por cada servicio prestado. Sin efectivo, sin cobros pendientes, sin fricciones con el dueño de la mascota.",
  },
  {
    icon: MapPin,
    title: "Pacientes en tu zona que ya te buscan",
    body: "Tu clínica aparece en el directorio KD para todos los suscriptores cercanos. Ellos ya pagaron su membresía, tú solo los atiendes.",
  },
]

export function Features() {
  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 items-stretch">

          {/* Left: image */}
          <div className="relative w-full min-h-[400px] rounded-2xl overflow-hidden">
            <Image
              src="/assets/12.jpg"
              alt="Plataforma KD en acción"
              fill
              className="object-cover"
            />
          </div>

          {/* Right: copy + features */}
          <div className="flex flex-col gap-4">
            <p className="text-sm font-medium uppercase tracking-widest text-[#1434CB]">
              La plataforma que viene con pacientes incluidos
            </p>
            <h2 className="text-4xl font-bold leading-tight">
              Para clínicas veterinarias y estéticas caninas, todo lo que necesitas para crecer sin pagar por ello.
            </h2>
            <p className="text-gray-500 mb-4">
              Mientras otros cobran por su software, KD te da la plataforma gratis porque nuestro negocio es traerte pacientes, no venderte tecnología.
            </p>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {FEATURES.map((feat) => (
                <Card key={feat.title} className="border-gray-100 bg-gray-50 shadow-none">
                  <CardContent className="py-5 px-5 flex flex-col gap-2">
                    <feat.icon className="h-6 w-6 text-[#1434CB]" />
                    <h3 className="text-sm font-semibold">{feat.title}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed">{feat.body}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
