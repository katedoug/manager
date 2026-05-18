import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { ArrowRight, MessageCircle } from "lucide-react"

const FAQS = [
  {
    q: "¿Qué necesito para unirme a la red KD?",
    a: "Solo los datos básicos de tu clínica: nombre, RFC, dirección, servicios que ofreces y una cuenta bancaria para recibir pagos. Nuestro equipo te acompaña en el proceso, normalmente tarda menos de 30 minutos.",
  },
  {
    q: "¿Cuánto tiempo tarda en estar activo mi perfil?",
    a: "En menos de 24 horas hábiles tu clínica ya aparece en la red y puede recibir pacientes KD. No hay instalaciones ni integraciones técnicas de tu parte.",
  },
  {
    q: "¿Hay comisiones por cada consulta o paciente?",
    a: "No. KD no cobra comisión sobre los servicios que prestas. Cada peso que acuerda tu tarifa de servicio es tuyo. KD genera ingresos a través de las membresías de los tutores, no de las clínicas.",
  },
  {
    q: "¿Cuánto me paga KD por cada servicio?",
    a: "Los montos por servicio se acuerdan contigo antes de activar tu perfil. Son fijos, transparentes y no cambian sin tu aprobación. Puedes ver el desglose completo en la sección de pagos antes de registrarte.",
  },
  {
    q: "¿Puedo cancelar cuando quiera?",
    a: "Sí. No hay contrato de permanencia. Puedes salir de la red en cualquier momento sin penalizaciones. Los pagos pendientes se liquidan en el siguiente ciclo semanal normal.",
  },
  {
    q: "¿Qué soporte recibo si tengo problemas técnicos?",
    a: "Tienes acceso a soporte directo por chat y mail con respuesta garantizada en menos de 2 horas. Para problemas críticos de pagos, el tiempo de respuesta es inmediato.",
  },
  {
    q: "¿Solo pueden unirse clínicas veterinarias o también estéticas caninas?",
    a: "KD acepta tanto clínicas veterinarias como estéticas y groomerías. Si tu negocio atiende mascotas, puedes formar parte de la red. El proceso de registro y los pagos funcionan igual para ambos.",
  },
]

export function Faq() {
  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-sm font-medium uppercase tracking-widest text-[#1434CB] mb-3">
            FAQ
          </p>
          <h2 className="text-4xl font-bold sm:text-5xl">
            Preguntas frecuentes
          </h2>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {FAQS.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-gray-200">
              <AccordionTrigger className="text-left font-medium text-gray-900 py-5 hover:no-underline text-base">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-gray-500 pb-5 leading-relaxed">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Support CTA */}
        <div className="mt-12 rounded-2xl bg-[#030027] overflow-hidden">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 px-8 py-8">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10">
                <MessageCircle className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-bold text-white text-lg">¿Tienes más preguntas?</p>
                <p className="text-sm text-white/60 mt-0.5">Nuestro equipo responde en menos de 2 horas.</p>
              </div>
            </div>
            <Button className="bg-white text-[#030027] hover:bg-white/90 shrink-0 gap-2 font-semibold" asChild>
              <a href="https://calendar.app.google/rZ7oJ49Z9NJeGR9D7" target="_blank" rel="noopener noreferrer">Agenda una Demo <ArrowRight className="h-4 w-4" /></a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
