"use client"

import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

export const SERVICES = [
  { id: "Consulta General", color: "bg-blue-500"   },
  { id: "Vacunación",       color: "bg-purple-500" },
  { id: "Examen de Sangre", color: "bg-green-500"  },
  { id: "Examen de Orina",  color: "bg-teal-500"   },
  { id: "Examen Fecal",     color: "bg-cyan-500"   },
  { id: "Limpieza Dental",  color: "bg-pink-500"   },
  { id: "Desparasitación",  color: "bg-orange-500" },
]

interface CalendarsProps {
  visibleServices: Set<string>
  onToggle: (serviceId: string) => void
}

export function Calendars({ visibleServices, onToggle }: CalendarsProps) {
  return (
    <div className="space-y-1">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground px-2 mb-3">
        Servicios
      </p>
      {SERVICES.map((service) => {
        const visible = visibleServices.has(service.id)
        return (
          <button
            key={service.id}
            onClick={() => onToggle(service.id)}
            className="flex items-center gap-3 w-full px-2 py-1.5 rounded-md hover:bg-accent/50 transition-colors cursor-pointer"
          >
            <div
              className={cn(
                "flex aspect-square size-4 shrink-0 items-center justify-center rounded-sm border transition-all",
                visible
                  ? cn("border-transparent text-white", service.color)
                  : "border-border bg-transparent"
              )}
            >
              {visible && <Check className="size-3" />}
            </div>
            <span className={cn("text-sm truncate", !visible && "text-muted-foreground")}>
              {service.id}
            </span>
          </button>
        )
      })}
    </div>
  )
}
