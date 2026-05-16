import { PageHero } from "@/components/pages/page-hero"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, Video, Download, MessageCircle, Users } from "lucide-react"

const ARTICLES = [
  { tag: "[Gestión clínica]",   title: "[Cómo digitalizar el expediente de tus pacientes en 3 pasos]",             read: "[5 min]" },
  { tag: "[Finanzas]",          title: "[Cómo interpretar tu reporte semanal de KD y tomar mejores decisiones]",   read: "[7 min]" },
  { tag: "[Pacientes]",         title: "[Estrategias para aumentar la recurrencia de consultas en tu clínica]",     read: "[6 min]" },
  { tag: "[Plataforma]",        title: "[Configuración avanzada de la agenda: recordatorios y tiempos de espera]",  read: "[4 min]" },
  { tag: "[Comunidad]",         title: "[Por qué los referidos entre aliados son el canal de crecimiento #1]",      read: "[8 min]" },
  { tag: "[Legal]",             title: "[Guía: cómo cumplir con la normativa veterinaria vigente en México]",       read: "[10 min]" },
]

const VIDEO_GUIDES = [
  { title: "[Tour completo de la plataforma KD]",         duration: "[12 min]" },
  { title: "[Cómo registrar tu primera consulta SOAP]",   duration: "[8 min]" },
  { title: "[Configuración de Stripe Connect paso a paso]", duration: "[6 min]" },
]

const DOWNLOADS = [
  { icon: Download, title: "[Guía de bienvenida para aliados]",          format: "PDF · [24 págs]" },
  { icon: Download, title: "[Checklist de onboarding]",                    format: "PDF · [4 págs]" },
  { icon: Download, title: "[Plantilla de consentimiento informado]",     format: "DOCX · [2 págs]" },
  { icon: Download, title: "[Manual de uso de la plataforma]",             format: "PDF · [48 págs]" },
  { icon: Download, title: "[Glosario de términos clínicos y KD]",        format: "PDF · [8 págs]" },
]

const SUPPORT_CHANNELS = [
  {
    icon: MessageCircle,
    title: "[Chat en vivo]",
    desc: "[Respuesta en menos de 2 horas en días hábiles. Para dudas rápidas de operación y plataforma]",
    cta: "[Abrir chat]",
  },
  {
    icon: Users,
    title: "[Comunidad de aliados]",
    desc: "[Foro privado donde los aliados comparten casos, experiencias y se apoyan mutuamente]",
    cta: "[Unirme al foro]",
  },
  {
    icon: BookOpen,
    title: "[Base de conocimiento]",
    desc: "[Artículos detallados sobre cada función de la plataforma, actualizados con cada release]",
    cta: "[Ver artículos]",
  },
]

export default function RecursosPage() {
  return (
    <>
      <PageHero
        tag="[Centro de recursos]"
        title="[Todo lo que necesitas para sacarle el máximo a la red]"
        subtitle="[Guías, videos, plantillas y el equipo de soporte de KD — para que nunca te quedes atascado y tu clínica siga creciendo]"
      />

      {/* Featured resource */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-6">[Recurso destacado]</p>
          <div className="grid grid-cols-1 gap-0 lg:grid-cols-2 rounded-2xl overflow-hidden border border-gray-200">
            <div className="aspect-video lg:aspect-auto bg-gray-100 flex items-center justify-center border-r border-gray-200">
              <span className="text-sm text-gray-400">[Imagen / video destacado]</span>
            </div>
            <div className="flex flex-col justify-center gap-5 p-10">
              <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">[Guía completa]</span>
              <h2 className="text-3xl font-bold text-gray-900 leading-tight">
                [Guía definitiva para crecer tu clínica veterinaria con la red KD]
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed">
                [Descripción de la guía: qué aprenderás, a quién va dirigida y por qué es el primer recurso que debe leer todo aliado nuevo. Cubre desde el onboarding hasta las estrategias avanzadas de crecimiento]
              </p>
              <div className="flex items-center gap-4 text-xs text-gray-400">
                <span>[45 min de lectura]</span>
                <span>·</span>
                <span>[Actualizado Mayo 2025]</span>
              </div>
              <Button className="w-fit gap-2">
                [Leer guía] <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Blog articles grid */}
      <section className="py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">[Blog]</p>
              <h2 className="text-3xl font-bold text-gray-900">[Artículos recientes]</h2>
            </div>
            <Button variant="ghost" className="text-gray-600 gap-1 hidden sm:flex">
              [Ver todos] <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {ARTICLES.map((a) => (
              <Card key={a.title} className="border-gray-200 bg-white hover:shadow-sm transition-shadow cursor-pointer">
                <CardHeader className="pb-0">
                  <div className="w-full h-40 rounded-lg bg-gray-100 border border-gray-100 flex items-center justify-center mb-3">
                    <span className="text-xs text-gray-400">[Imagen artículo]</span>
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">{a.tag}</span>
                </CardHeader>
                <CardContent className="pt-2 flex flex-col gap-3">
                  <h3 className="font-bold text-gray-900 text-sm leading-snug">{a.title}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">{a.read} de lectura</span>
                    <Button variant="ghost" size="sm" className="h-auto p-0 text-xs text-gray-600 gap-1">
                      [Leer] <ArrowRight className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Video guides */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">[Videos]</p>
              <h2 className="text-3xl font-bold text-gray-900">[Guías en video]</h2>
            </div>
            <Button variant="ghost" className="text-gray-600 gap-1 hidden sm:flex">
              [Ver todos] <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {VIDEO_GUIDES.map((v) => (
              <div key={v.title} className="flex flex-col gap-3">
                <div className="w-full aspect-video rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center relative">
                  <div className="h-12 w-12 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm">
                    <Video className="h-5 w-5 text-gray-500" />
                  </div>
                  <span className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2 py-0.5 rounded">
                    {v.duration}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900 text-sm">{v.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Downloads */}
      <section className="py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">[Descargas]</p>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">[Plantillas y documentos]</h2>
              <p className="text-gray-500 text-sm">[Recursos listos para usar en tu clínica — sin necesidad de diseñar nada desde cero]</p>
            </div>
            <div className="flex flex-col divide-y divide-gray-200 rounded-xl border border-gray-200 bg-white overflow-hidden">
              {DOWNLOADS.map((d) => (
                <div key={d.title} className="flex items-center justify-between px-5 py-4">
                  <div className="flex items-center gap-3">
                    <d.icon className="h-4 w-4 text-gray-400 shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{d.title}</p>
                      <p className="text-xs text-gray-400">{d.format}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-gray-600 gap-1 shrink-0">
                    [Descargar] <Download className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Support channels */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">[Soporte]</p>
            <h2 className="text-4xl font-bold text-gray-900">[Siempre hay alguien disponible]</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">[Descripción del equipo de soporte de KD: horarios, canales disponibles y tiempo promedio de respuesta]</p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {SUPPORT_CHANNELS.map((ch) => (
              <Card key={ch.title} className="border-gray-200">
                <CardContent className="pt-6 flex flex-col gap-4">
                  <div className="h-10 w-10 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center">
                    <ch.icon className="h-5 w-5 text-gray-500" />
                  </div>
                  <h3 className="font-bold text-gray-900">{ch.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed flex-1">{ch.desc}</p>
                  <Button variant="outline" size="sm" className="w-fit border-gray-300 text-gray-700 gap-1">
                    {ch.cta} <ArrowRight className="h-3 w-3" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-900">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">[¿No encuentras lo que buscas?]</h2>
          <p className="text-gray-400 text-lg mb-8">[El equipo de KD está listo para responder cualquier duda — habla con nosotros directamente]</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button size="lg" className="gap-2 bg-white text-gray-900 hover:bg-gray-100">
              [Hablar con soporte] <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
              [Ver base de conocimiento]
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
