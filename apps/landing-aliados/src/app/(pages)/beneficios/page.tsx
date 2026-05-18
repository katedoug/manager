import { PageHero } from "@/components/pages/page-hero"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle, UserPlus, LayoutDashboard, Banknote, HeartHandshake, MessageCircle, Globe } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const BENEFIT_CARDS = [
  { icon: UserPlus,        title: "Pacientes que llegan sin que los busques",                   body: "La red KD conecta a tutores activos en tu zona con tu clínica, sin que inviertas en publicidad, sin agencias, sin Google Ads. Tú solo apareces, ellos agendan." },
  { icon: LayoutDashboard, title: "Tu operación diaria en una pantalla",                        body: "Citas confirmadas, expedientes completos y facturación automática en un solo lugar. Sin hojas de cálculo, sin papel, sin llamadas para recordar citas." },
  { icon: Banknote,        title: "El viernes llega tu depósito. Sin que hagas nada.",          body: "Cada servicio prestado a un suscriptor KD se liquida automáticamente vía Stripe Connect. Sin cobranza, sin esperas, sin trámites." },
  { icon: HeartHandshake,  title: "Una red que trabaja para ti aunque no estés trabajando",     body: "Comparte casos, refiere pacientes y aprende de otros aliados. Las clínicas KD no compiten entre sí, se apoyan." },
  { icon: MessageCircle,   title: "Alguien que responde en menos de 2 horas",                  body: "Nuestro equipo acompaña tu operación diaria. Dudas técnicas, pagos, pacientes. Tienes un canal directo con KD en todo momento." },
  { icon: Globe,           title: "Tu clínica visible donde buscan tus próximos clientes",     body: "Tu perfil público en la red KD aparece en búsquedas de dueños de mascotas en tu zona. Sin pagar por posicionamiento, sin contratar a nadie." },
]

const COMPARISON_ROWS = [
  { feature: "Pacientes nuevos cada mes",         sin: "Depende de tu marketing",                  con: "Llegan desde la red — sin que los busques" },
  { feature: "Costo de adquisición de pacientes", sin: "$300–$800 MXN por paciente nuevo",         con: "$0" },
  { feature: "Sistema de agenda",                 sin: "Llamadas y WhatsApp",                      con: "Digital, con recordatorios automáticos" },
  { feature: "Expediente clínico",                sin: "Papel o sistema propio",                   con: "Digital, compartido con toda la red" },
  { feature: "Pagos por servicios",               sin: "Cobro directo, sin garantía",              con: "Depositados automáticamente cada semana" },
  { feature: "Red de referidos",                  sin: "No existe",                                con: "Pacientes referidos entre clínicas aliadas" },
  { feature: "Reportes de desempeño",             sin: "Manual o inexistente",                     con: "Dashboard semanal incluido" },
  { feature: "Costo de la plataforma",            sin: "Desde $500 MXN/mes (competidores)",        con: "$0 — incluido en la alianza" },
]

const DEEP_DIVES = [
  {
    tag: "Pilar 1 — Pacientes",
    title: "Más pacientes, sin esfuerzo de marketing.",
    body: "Los tutores premium de CDMX y Monterrey no encuentran su clínica en un directorio, la encuentran porque alguien de confianza se la recomendó. Kate&Doug es esa recomendación. Cuando un suscriptor busca atención para su mascota, tu clínica ya está ahí.",
    image: "/assets/7.jpg",
    points: [
      { title: "Perfil verificado en la plataforma" },
      { title: "Visibilidad en la zona donde ya operas" },
      { title: "Reseñas gestionadas dentro de la red" },
      { title: "Referidos entre aliados" },
    ],
    reversed: false,
  },
  {
    tag: "Pilar 2 — Plataforma",
    title: "Tu clínica organizada desde el primer día.",
    body: "Kate&Doug te da una plataforma completa para gestionar tu operación diaria; sin papel, sin llamadas perdidas, sin pacientes que se olvidan de sus citas. Diseñada para clínicas veterinarias y estéticas caninas que quieren crecer sin complicarse.",
    image: "/assets/screen1.png",
    points: [
      { title: "Agenda con recordatorios automáticos",       body: "Tus pacientes reciben recordatorio por WhatsApp antes de cada cita. Menos no-shows, más consultas atendidas, sin que tu equipo haga una sola llamada." },
      { title: "Expediente clínico y de grooming por paciente", body: "Historial completo de consultas, vacunas, cortes y notas clínicas en un solo lugar. Accesible desde cualquier dispositivo. Cuando el paciente llega, ya sabes todo lo que necesitas." },
      { title: "Historial compartido con la red",            body: "Cuando un paciente Kate&Doug llega a tu clínica, su expediente ya está ahí. Vacunas, consultas anteriores, notas clínicas. Todo disponible desde el primer momento, sin que tengas que preguntar nada." },
      { title: "Dashboard de desempeño semanal",             body: "Ve cuántos pacientes atendiste, cuánto generaste y cómo va tu clínica semana a semana. Sin hojas de cálculo, sin esperar el fin de mes para saber cómo vas." },
    ],
    reversed: true,
  },
  {
    tag: "Pilar 3 — Comunidad",
    title: "Una red que crece contigo.",
    body: "Unirte a Kate&Doug no es solo activar un perfil, es entrar a un ecosistema donde cada nuevo suscriptor, cada nueva clínica aliada y cada consulta atendida hace que la red sea más valiosa para todos. Tu clínica crece cuando la red crece.",
    image: "/assets/17.jpg",
    points: [
      { title: "Sistema de referidos entre aliados",       body: "Cuando una clínica aliada no puede atender a un paciente Kate&Doug, puede referirlo a otra dentro de la red. El paciente no se pierde, y el ingreso tampoco." },
      { title: "Más aliados, más tutores",                 body: "Cada nueva clínica que se une atrae más tutores a la plataforma. Cada nuevo tutor genera más consultas para todas las clínicas de la red. El crecimiento es colectivo." },
      { title: "Datos de desempeño comparativos",          body: "Ve cómo se compara tu clínica con otras aliadas en tu zona, consultas atendidas, evaluaciones, ingresos generados. Sin competencia, con contexto." },
      { title: "Prioridad en nuevas funciones",            body: "Las clínicas fundadoras tienen acceso anticipado a nuevas capacidades de la plataforma." },
    ],
    reversed: false,
  },
]

export default function BeneficiosPage() {
  return (
    <>
      <PageHero
        tag="Por qué unirte"
        title={<>Tu clínica, <span className="text-[#1434CB]">el lunes siguiente</span> de entrar a Kate&amp;Doug.</>}
        subtitle="Agenda llena. Pacientes con historial completo. Pago depositado el viernes. Sin haber gastado un peso en publicidad."
      />

      {/* Benefit cards grid */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {BENEFIT_CARDS.map((b) => (
              <Card key={b.title} className="border-gray-200">
                <CardHeader className="pb-2">
                  <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center mb-2">
                    <b.icon className="h-5 w-5 text-[#1434CB]" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg">{b.title}</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 leading-relaxed">{b.body}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Deep dives */}
      {DEEP_DIVES.map((d) => (
        <section key={d.title} className={`py-24 ${d.reversed ? "bg-gray-50" : "bg-white"}`}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className={`grid grid-cols-1 gap-16 lg:grid-cols-2 items-center ${d.reversed ? "lg:grid-flow-dense" : ""}`}>
              {/* Image */}
              <div className={d.reversed ? "lg:col-start-2" : ""}>
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 border border-gray-200">
                  {d.image
                    ? <Image src={d.image} alt={d.title} fill className="object-cover object-left-top" />
                    : <span className="absolute inset-0 flex items-center justify-center text-sm text-gray-400">[Imagen — {d.tag}]</span>
                  }
                </div>
              </div>
              {/* Text */}
              <div className={`flex flex-col gap-5 ${d.reversed ? "lg:col-start-1" : ""}`}>
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">{d.tag}</p>
                <h2 className="text-4xl font-bold text-gray-900 leading-tight">{d.title}</h2>
                <p className="text-gray-500 leading-relaxed">{d.body}</p>
                <ul className="flex flex-col gap-4 mt-2">
                  {d.points.map((p) => (
                    <li key={p.title} className="flex gap-3">
                      <CheckCircle className="h-4 w-4 text-[#1434CB] shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{p.title}</p>
                        {'body' in p && p.body && <p className="text-sm text-gray-500 leading-relaxed mt-0.5">{p.body}</p>}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Comparison table */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">Comparativa</p>
            <h2 className="text-4xl font-bold text-gray-900 flex items-center justify-center gap-3">
              Estar o no con
              <Image src="/logo.svg" alt="Kate&Doug" width={160} height={40} className="inline-block" />
            </h2>
          </div>
          <div className="rounded-xl overflow-hidden border border-gray-200">
            <div className="grid grid-cols-3 bg-gray-50 border-b border-gray-200">
              <div className="p-4 text-sm font-semibold text-gray-700">Característica</div>
              <div className="p-4 text-sm font-semibold text-gray-400 text-center">Sin Kate&amp;Doug</div>
              <div className="p-4 text-sm font-semibold text-center bg-gray-900 text-white">Con Kate&amp;Doug</div>
            </div>
            {COMPARISON_ROWS.map((row, i) => (
              <div key={row.feature} className={`grid grid-cols-3 border-b border-gray-100 last:border-0 ${i % 2 === 1 ? "bg-gray-50/50" : "bg-white"}`}>
                <div className="p-4 text-sm text-gray-700">{row.feature}</div>
                <div className="p-4 text-sm text-gray-400 text-center">{row.sin}</div>
                <div className="p-4 text-sm font-medium text-gray-900 text-center bg-gray-900/5">{row.con}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA banner */}
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
