"use client"

import { useState } from "react"
import { CalendarIcon, Clock, Building2, Search, Check, ChevronsUpDown } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { cn } from "@/lib/utils"
import { type CalendarEvent } from "../types"

interface EventFormProps {
  event?: CalendarEvent | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (event: Partial<CalendarEvent>) => void
  onDelete?: (eventId: number) => void
}

// Placeholder data — se conectará a la DB después
const mockPatients = [
  { id: "PAC-001", name: "Toby García",   owner: "Luis García"    },
  { id: "PAC-002", name: "Luna Martínez", owner: "Ana Martínez"   },
  { id: "PAC-003", name: "Max Rodríguez", owner: "Carlos Rodríguez" },
  { id: "PAC-004", name: "Mimi López",    owner: "Sofía López"    },
  { id: "PAC-005", name: "Rocky Pérez",   owner: "Jorge Pérez"    },
  { id: "PAC-006", name: "Bella Torres",  owner: "María Torres"   },
  { id: "PAC-007", name: "Coco Ramírez",  owner: "Pedro Ramírez"  },
]

const services = [
  "Consulta General",
  "Vacunación",
  "Examen de Sangre",
  "Examen de Orina",
  "Examen Fecal",
  "Limpieza Dental",
  "Desparasitación",
]

const timeSlots = [
  "8:00 AM", "8:30 AM", "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM",
  "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM",
  "5:00 PM", "5:30 PM", "6:00 PM",
]

// Placeholder sucursales — se conectará a la DB después
const branches = [
  { id: "SUC-001", name: "Sucursal Centro"  },
  { id: "SUC-002", name: "Sucursal Norte"   },
  { id: "SUC-003", name: "Sucursal Sur"     },
]

const serviceColor: Record<string, string> = {
  "Consulta General": "bg-blue-500",
  "Vacunación":       "bg-purple-500",
  "Examen de Sangre": "bg-green-500",
  "Examen de Orina":  "bg-green-500",
  "Examen Fecal":     "bg-green-500",
  "Limpieza Dental":  "bg-pink-500",
  "Desparasitación":  "bg-orange-500",
}

export function EventForm({ event, open, onOpenChange, onSave, onDelete }: EventFormProps) {
  const isEditing = !!event
  const [patientOpen, setPatientOpen] = useState(false)
  const [showCalendar, setShowCalendar] = useState(false)

  // Try to match existing event title to a mock patient
  const matchedPatient = event
    ? mockPatients.find(p => p.name === event.title) ?? null
    : null

  const [formData, setFormData] = useState({
    patientId:   matchedPatient?.id   || "",
    patientName: matchedPatient?.name || event?.title || "",
    service:     event ? (services.find(s => event.title?.includes(s)) ?? services[0]) : "",
    date:        event?.date || new Date(),
    time:        event?.time || "9:00 AM",
    branch:      event?.location || "",
    description: event?.description || "",
  })

  const selectedPatient = mockPatients.find(p => p.id === formData.patientId)

  const handleSave = () => {
    const eventData: Partial<CalendarEvent> = {
      id:          event?.id,
      title:       selectedPatient ? selectedPatient.name : formData.patientName,
      date:        formData.date,
      time:        formData.time,
      duration:    "30 min",
      type:        "meeting",
      attendees:   [],
      location:    formData.branch,
      description: formData.description,
      color:       serviceColor[formData.service] || "bg-blue-500",
    }
    onSave(eventData)
    onOpenChange(false)
  }

  const handleDelete = () => {
    if (event?.id && onDelete) {
      onDelete(event.id)
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{event ? "Editar Cita" : "Nueva Cita"}</DialogTitle>
          <DialogDescription>
            {event ? "Modifica los datos de esta cita" : "Agrega una nueva cita al calendario"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 py-4">

          {/* Paciente — combobox */}
          <div className="space-y-2">
            <Label>Paciente</Label>
            <Popover open={isEditing ? false : patientOpen} onOpenChange={isEditing ? undefined : setPatientOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={patientOpen}
                  disabled={isEditing}
                  className="w-full justify-between font-normal"
                >
                  {selectedPatient ? (
                    <span>
                      {selectedPatient.name}
                      <span className="ml-2 text-muted-foreground text-xs">
                        {selectedPatient.owner} · {selectedPatient.id}
                      </span>
                    </span>
                  ) : (
                    <span className="text-muted-foreground flex items-center gap-2">
                      <Search className="h-4 w-4" />
                      Buscar paciente…
                    </span>
                  )}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0" align="start">
                <Command>
                  <CommandInput placeholder="Nombre del paciente…" />
                  <CommandList>
                    <CommandEmpty>No se encontró el paciente.</CommandEmpty>
                    <CommandGroup>
                      {mockPatients.map(p => (
                        <CommandItem
                          key={p.id}
                          value={`${p.name} ${p.owner} ${p.id}`}
                          onSelect={() => {
                            setFormData(prev => ({ ...prev, patientId: p.id, patientName: p.name }))
                            setPatientOpen(false)
                          }}
                        >
                          <Check className={cn("mr-2 h-4 w-4", formData.patientId === p.id ? "opacity-100" : "opacity-0")} />
                          <div className="flex flex-col">
                            <span className="font-medium">{p.name}</span>
                            <span className="text-xs text-muted-foreground">{p.owner} · {p.id}</span>
                          </div>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          {/* Servicio */}
          <div className="space-y-2">
            <Label>Servicio</Label>
            <Select
              value={formData.service}
              onValueChange={(value) => setFormData(prev => ({ ...prev, service: value }))}
              disabled={isEditing}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecciona un servicio" />
              </SelectTrigger>
              <SelectContent>
                {services.map(s => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Fecha y Hora */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <CalendarIcon className="w-4 h-4" />
                Fecha
              </Label>
              <Popover open={isEditing ? false : showCalendar} onOpenChange={isEditing ? undefined : setShowCalendar}>
                <PopoverTrigger asChild>
                  <Button variant="outline" disabled={isEditing} className="w-full justify-start text-left font-normal">
                    {format(formData.date, "PPP", { locale: es })}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.date}
                    onSelect={(date) => {
                      if (date) {
                        setFormData(prev => ({ ...prev, date }))
                        setShowCalendar(false)
                      }
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Hora
              </Label>
              <Select
                value={formData.time}
                onValueChange={(value) => setFormData(prev => ({ ...prev, time: value }))}
                disabled={isEditing}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map(t => (
                    <SelectItem key={t} value={t}>{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Sucursal */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              Sucursal
            </Label>
            <Select
              value={formData.branch}
              onValueChange={(value) => setFormData(prev => ({ ...prev, branch: value }))}
              disabled={isEditing}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecciona una sucursal" />
              </SelectTrigger>
              <SelectContent>
                {branches.map(b => (
                  <SelectItem key={b.id} value={b.id}>{b.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Descripción */}
          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              placeholder="Notas adicionales sobre la cita…"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              disabled={isEditing}
              rows={3}
            />
          </div>

          {/* Acciones */}
          <div className="flex gap-3 pt-2">
            {isEditing ? (
              <Button onClick={() => console.log("Solicitar modificación")} className="flex-1 cursor-pointer">
                Solicitar Modificación
              </Button>
            ) : (
              <>
                <Button onClick={handleSave} className="flex-1 cursor-pointer">
                  Crear Cita
                </Button>
                <Button onClick={() => onOpenChange(false)} variant="outline" className="cursor-pointer">
                  Cancelar
                </Button>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
