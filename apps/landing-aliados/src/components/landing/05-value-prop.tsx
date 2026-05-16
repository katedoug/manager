import { Card, CardContent } from "@/components/ui/card"

const PAIN_CARDS = [
  {
    num: "01",
    title: "El costo invisible",
    body: "La mayoría de las clínicas veterinarias invierten en Google, Instagram o agencias para atraer pacientes. Pocos saben que cada cita nueva puede costarles entre $300 y $800 MXN en publicidad antes de que el paciente entre por la puerta.",
  },
  {
    num: "02",
    title: "Pacientes que no regresan",
    body: "Sin recordatorios automáticos, sin historial compartido, sin seguimiento post-consulta. El 60% de los dueños de mascotas cambia de clínica al menos una vez al año, no por insatisfacción sino por falta de conexión.",
  },
  {
    num: "03",
    title: "Tiempo que no es tuyo",
    body: "Agenda manual, expedientes en papel, llamadas perdidas. Cada hora que tu equipo dedica a administración es una hora que no está atendiendo pacientes.",
  },
  {
    num: "04",
    title: "El cliente que vino una vez y no regresó",
    body: "Sin recordatorios automáticos, sin historial de corte, sin conexión con el dueño entre visitas. El 40% de los clientes de grooming no regresa, no por insatisfacción sino porque nadie los llamó.",
  },
]

export function ValueProp() {
  return (
    <section className="py-24 bg-[#E8EDFF]" id="beneficios">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="max-w-2xl mb-14">
          <p className="text-sm font-medium uppercase tracking-widest text-[#1434CB] mb-3">
            El problema que nadie calcula
          </p>
          <h2 className="text-4xl font-bold sm:text-5xl leading-tight">
            Cada paciente nuevo te costó dinero. ¿Sabes exactamente cuánto?
          </h2>
        </div>

        {/* Pain cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {PAIN_CARDS.map((card) => (
            <Card key={card.num} className="border-gray-200 bg-white flex flex-col">
              <CardContent className="flex flex-col gap-4 p-6 flex-1">
                <span className="text-8xl font-bold text-[#1434CB] leading-none">{card.num}</span>
                <h3 className="text-xl font-bold">{card.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed flex-1">{card.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Transition */}
        <p className="mt-12 text-lg font-semibold text-[#1434CB] text-center">
          KD resuelve los tres. Sin que inviertas un peso en publicidad.
        </p>

      </div>
    </section>
  )
}
