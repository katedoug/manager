"use client"

import { Star, MessageSquareDashed } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useDemoMode } from "@/context/demo-mode"

const reviews = [
  {
    id: 1,
    author: "Luis García",
    initials: "LG",
    rating: 5,
    date: "2025-05-02",
    service: "Consulta General",
    comment: "Excelente atención, el doctor fue muy amable y explicó todo con detalle. Toby se recuperó rápidamente.",
  },
  {
    id: 2,
    author: "Ana Martínez",
    initials: "AM",
    rating: 5,
    date: "2025-04-28",
    service: "Vacunación",
    comment: "Muy profesionales, Luna no sufrió nada. El proceso fue rápido y sin esperas. Totalmente recomendados.",
  },
  {
    id: 3,
    author: "Carlos Rodríguez",
    initials: "CR",
    rating: 4,
    date: "2025-04-20",
    service: "Examen de Sangre",
    comment: "Buena atención, aunque la espera fue un poco larga. Los resultados llegaron en tiempo y forma.",
  },
  {
    id: 4,
    author: "Sofía López",
    initials: "SL",
    rating: 5,
    date: "2025-04-15",
    service: "Limpieza Dental",
    comment: "Impresionante el cambio en Mimi después de la limpieza. El equipo es muy cuidadoso y atento.",
  },
  {
    id: 5,
    author: "Pedro Ramírez",
    initials: "PR",
    rating: 3,
    date: "2025-04-10",
    service: "Consulta General",
    comment: "El servicio estuvo bien pero me gustaría que hubiera más opciones de horario disponibles.",
  },
  {
    id: 6,
    author: "María Torres",
    initials: "MT",
    rating: 5,
    date: "2025-04-05",
    service: "Desparasitación",
    comment: "Bella siempre queda feliz después de cada visita. El trato es excepcional, muy recomendable.",
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            "size-3.5",
            i < rating ? "fill-amber-400 text-amber-400" : "fill-muted text-muted"
          )}
        />
      ))}
    </div>
  )
}

const serviceColor: Record<string, string> = {
  "Consulta General": "text-blue-700 bg-blue-50 border-blue-200",
  "Vacunación":       "text-purple-700 bg-purple-50 border-purple-200",
  "Examen de Sangre": "text-teal-700 bg-teal-50 border-teal-200",
  "Limpieza Dental":  "text-pink-700 bg-pink-50 border-pink-200",
  "Desparasitación":  "text-orange-700 bg-orange-50 border-orange-200",
}

export function ReviewsList() {
  const { isDemoMode } = useDemoMode()
  const list = isDemoMode ? reviews : []

  return (
    <Card>
      <CardHeader>
        <CardTitle>Opiniones de Clientes</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {list.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-10 text-muted-foreground">
            <MessageSquareDashed className="size-8 opacity-30" />
            <p className="text-sm font-medium">Sin opiniones aún</p>
            <p className="text-xs">Las reseñas de tus clientes aparecerán aquí</p>
          </div>
        ) : list.map((r) => (
          <div key={r.id} className="flex gap-4 pb-4 border-b last:border-0 last:pb-0">
            {/* Avatar */}
            <div className="size-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <span className="text-xs font-semibold text-primary">{r.initials}</span>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 space-y-1">
              <div className="flex items-start justify-between gap-2 flex-wrap">
                <div className="space-y-0.5">
                  <p className="text-sm font-medium leading-none">{r.author}</p>
                  <StarRating rating={r.rating} />
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Badge variant="outline" className={cn("text-xs", serviceColor[r.service] ?? "")}>
                    {r.service}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{r.date}</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{r.comment}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
