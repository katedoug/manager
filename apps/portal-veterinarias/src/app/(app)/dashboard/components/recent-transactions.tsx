"use client"

import { useState } from "react"
import { Eye, Images, AlertCircle, X, CalendarX } from "lucide-react"
import { useDemoMode } from "@/context/demo-mode"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet"

const appointments = [
  {
    id: "CIT-001",
    patient: { name: "Toby García", owner: "Luis García", species: "Canino" },
    amount: "$450.00",
    status: "completed",
    datetime: "5 may 2025 · 9:00 AM",
    date: "Hace 2 horas",
    service: "Consulta General",
    rating: "4.8 ★",
    diagnosis: "Paciente en buen estado general. Se detectó leve otitis externa en oído derecho. Se recomienda limpieza semanal.",
    recipe: "Otoclean 3 gotas cada 12 horas por 7 días. Vitamina E 1 cápsula diaria.",
    vaccines: null,
    photos: true,
  },
  {
    id: "CIT-002",
    patient: { name: "Luna Martínez", owner: "Ana Martínez", species: "Felino" },
    amount: "$320.00",
    status: "pending",
    datetime: "5 may 2025 · 2:00 PM",
    date: "Hace 5 horas",
    service: "Vacunación",
    rating: null,
    diagnosis: null,
    recipe: null,
    vaccines: "Antirrábica, Panleucopenia, Rinotraqueitis, Calicivirus.",
    photos: false,
  },
  {
    id: "CIT-003",
    patient: { name: "Max Rodríguez", owner: "Carlos Rodríguez", species: "Canino" },
    amount: "$780.00",
    status: "completed",
    datetime: "4 may 2025 · 10:00 AM",
    date: "Ayer",
    service: "Examen de Laboratorio",
    rating: "5.0 ★",
    diagnosis: "Resultados dentro de parámetros normales. Ligera elevación en ALT hepática, se programa seguimiento en 30 días.",
    recipe: "Hepatoprotector 1 tableta cada 24 horas por 30 días.",
    vaccines: null,
    photos: true,
  },
  {
    id: "CIT-004",
    patient: { name: "Mimi López", owner: "Sofía López", species: "Felino" },
    amount: "$1,200.00",
    status: "completed",
    datetime: "3 may 2025 · 8:00 AM",
    date: "Hace 2 días",
    service: "Cirugía Menor",
    rating: "4.5 ★",
    diagnosis: "Esterilización exitosa. Sin complicaciones durante el procedimiento.",
    recipe: "Meloxicam 0.5 mg cada 24 horas por 5 días. Amoxicilina 125 mg cada 12 horas por 7 días.",
    vaccines: null,
    photos: true,
  },
  {
    id: "CIT-005",
    patient: { name: "Rocky Pérez", owner: "Jorge Pérez", species: "Canino" },
    amount: "$280.00",
    status: "cancelled",
    datetime: "2 may 2025 · 4:00 PM",
    date: "Hace 3 días",
    service: "Desparasitación",
    rating: null,
    diagnosis: null,
    recipe: null,
    vaccines: null,
    photos: false,
  },
]

const statusVariant: Record<string, "default" | "secondary" | "destructive"> = {
  completed: "default",
  pending: "secondary",
  cancelled: "destructive",
}

const statusLabel: Record<string, string> = {
  completed: "Completada",
  pending: "Pendiente",
  cancelled: "Cancelada",
}

type Appointment = typeof appointments[number]

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">{label}</span>
      <span className="text-base">{children}</span>
    </div>
  )
}

export function RecentTransactions() {
  const [selected, setSelected] = useState<Appointment | null>(null)
  const { isDemoMode } = useDemoMode()
  const list = isDemoMode ? appointments : []

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle>Citas Recientes</CardTitle>
            <CardDescription>Últimas consultas registradas</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            <Eye className="h-4 w-4 mr-2" />
            Ver Todas
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {list.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-10 text-muted-foreground">
              <CalendarX className="size-8 opacity-30" />
              <p className="text-sm font-medium">Sin citas registradas</p>
              <p className="text-xs">Las citas aparecerán aquí una vez que los clientes empiecen a agendar</p>
            </div>
          ) : list.map((apt) => (
            <div key={apt.id} className="flex p-3 rounded-lg border gap-2">
              <div className="flex flex-1 items-center flex-wrap justify-between gap-1">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium truncate">{apt.patient.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{apt.service} · {apt.patient.owner}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge variant={statusVariant[apt.status]}>{statusLabel[apt.status]}</Badge>
                  <div className="text-right">
                    <p className="text-sm font-medium">{apt.amount}</p>
                    <p className="text-xs text-muted-foreground">{apt.date}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => setSelected(apt)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Sheet open={!!selected} onOpenChange={(open) => { if (!open) setSelected(null) }}>
        <SheetContent className="flex flex-col gap-0 p-0 overflow-y-auto">
          {selected && (
            <>
              {/* Header */}
              <SheetHeader className="px-6 pt-6 pb-4 border-b">
                <SheetTitle className="text-xl">{selected.patient.name}</SheetTitle>
                <SheetDescription className="text-base">Tutor: {selected.patient.owner}</SheetDescription>
              </SheetHeader>

              {/* Body */}
              <div className="flex-1 px-6 py-5 space-y-5">
                <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">Cita</p>

                {/* Row 1: Servicio / Fecha y hora */}
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Servicio">{selected.service}</Field>
                  <Field label="Fecha y hora">{selected.datetime}</Field>
                </div>

                {/* Row 2: Estatus / Calificación */}
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Estatus">
                    <Badge variant={statusVariant[selected.status]}>{statusLabel[selected.status]}</Badge>
                  </Field>
                  <Field label="Calificación">{selected.rating ?? "—"}</Field>
                </div>

                <Separator />

                {/* Diagnóstico */}
                <Field label="Diagnóstico">
                  {selected.diagnosis ?? <span className="text-muted-foreground italic">Sin diagnóstico</span>}
                </Field>

                {/* Receta */}
                <Field label="Receta">
                  {selected.recipe ?? <span className="text-muted-foreground italic">Sin Receta</span>}
                </Field>

                {/* Vacunas */}
                <Field label="Vacunas">
                  {selected.vaccines ?? <span className="text-muted-foreground italic">Sin Aplicación</span>}
                </Field>

                <Separator />

                {/* Fotografías */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground font-medium uppercase tracking-wide">Fotografías</span>
                  <Button variant="outline" size="sm" disabled={!selected.photos}>
                    <Images className="h-4 w-4 mr-2" />
                    Ver Fotografías
                  </Button>
                </div>
              </div>

              {/* Footer */}
              <SheetFooter className="flex flex-col gap-2 px-6 py-4 border-t">
                <Button variant="outline" className="w-full justify-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  Reportar un problema
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-center gap-2"
                  onClick={() => setSelected(null)}
                >
                  <X className="h-4 w-4" />
                  Cerrar
                </Button>
              </SheetFooter>
            </>
          )}
        </SheetContent>
      </Sheet>
    </>
  )
}
