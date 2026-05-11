"use client"

import { useState } from "react"
import { CalendarIcon, Clock, MapPin, Users, Type, Tag, Video } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { type CalendarEvent } from "../types"

interface EventFormProps {
  event?: CalendarEvent | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (event: Partial<CalendarEvent>) => void
  onDelete?: (eventId: number) => void
}

const eventTypes = [
  { value: "meeting", label: "Meeting", color: "bg-blue-500" },
  { value: "event", label: "Event", color: "bg-green-500" },
  { value: "personal", label: "Personal", color: "bg-pink-500" },
  { value: "task", label: "Task", color: "bg-orange-500" },
  { value: "reminder", label: "Reminder", color: "bg-purple-500" }
]

const timeSlots = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
  "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM",
  "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM"
]

const durationOptions = [
  "15 min", "30 min", "45 min", "1 hour", "1.5 hours", "2 hours", "3 hours", "All day"
]

// ─── Read-only consultation view ────────────────────────────────────────────

function ConsultationView({ event, onClose }: { event: CalendarEvent; onClose: () => void }) {
  const eventType = eventTypes.find(t => t.value === event.type)

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-base">
            <div className={cn("w-2.5 h-2.5 rounded-full shrink-0", eventType?.color ?? "bg-blue-500")} />
            {event.title}
          </DialogTitle>
          <DialogDescription className="sr-only">Detalles de la consulta</DialogDescription>
        </DialogHeader>

        <div className="space-y-3 py-1 text-sm">
          <div className="flex items-start gap-3">
            <CalendarIcon className="w-4 h-4 mt-0.5 text-muted-foreground shrink-0" />
            <span>{format(event.date, "EEEE d 'de' MMMM, yyyy", { locale: es })}</span>
          </div>

          <div className="flex items-start gap-3">
            <Clock className="w-4 h-4 mt-0.5 text-muted-foreground shrink-0" />
            <span>{event.time} · {event.duration}</span>
          </div>

          {event.location && (
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 mt-0.5 text-muted-foreground shrink-0" />
              <span>{event.location}</span>
            </div>
          )}

          {event.attendees.length > 0 && (
            <div className="flex items-start gap-3">
              <Users className="w-4 h-4 mt-0.5 text-muted-foreground shrink-0" />
              <div className="flex flex-wrap gap-1.5">
                {event.attendees.map((attendee, i) => (
                  <Badge key={i} variant="secondary" className="flex items-center gap-1.5 px-2 py-0.5">
                    <Avatar className="w-4 h-4">
                      <AvatarFallback className="text-[9px] font-medium">
                        {attendee.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-xs">{attendee}</span>
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {event.description && (
            <p className="text-muted-foreground leading-relaxed pl-7">{event.description}</p>
          )}
        </div>

        <div className="flex flex-col gap-2 pt-2">
          {event.meetLink && (
            <Button asChild className="w-full gap-2">
              <a href={event.meetLink} target="_blank" rel="noopener noreferrer">
                <Video className="w-4 h-4" />
                Atender consulta por Meet
              </a>
            </Button>
          )}
          {!event.meetLink && (
            <Button className="w-full">Atender consulta</Button>
          )}
          <div className="flex gap-2">
            <Button variant="secondary" className="flex-1">Reagendar</Button>
            <Button variant="outline" onClick={onClose} className="flex-1">Regresar</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// ─── Create form ─────────────────────────────────────────────────────────────

export function EventForm({ event, open, onOpenChange, onSave, onDelete }: EventFormProps) {
  // Existing event → read-only consultation view
  if (event && open) {
    return <ConsultationView event={event} onClose={() => onOpenChange(false)} />
  }

  return <CreateEventForm open={open} onOpenChange={onOpenChange} onSave={onSave} />
}

function CreateEventForm({ open, onOpenChange, onSave }: Pick<EventFormProps, "open" | "onOpenChange" | "onSave">) {
  const [formData, setFormData] = useState({
    title: "",
    date: new Date(),
    time: "9:00 AM",
    duration: "1 hour",
    type: "meeting" as CalendarEvent["type"],
    location: "",
    description: "",
    attendees: [] as string[],
    allDay: false,
    reminder: true
  })

  const [showCalendar, setShowCalendar] = useState(false)
  const [newAttendee, setNewAttendee] = useState("")

  const handleSave = () => {
    const eventData: Partial<CalendarEvent> = {
      ...formData,
      color: eventTypes.find(t => t.value === formData.type)?.color || "bg-blue-500"
    }
    onSave(eventData)
    onOpenChange(false)
  }

  const addAttendee = () => {
    if (newAttendee.trim() && !formData.attendees.includes(newAttendee.trim())) {
      setFormData(prev => ({ ...prev, attendees: [...prev.attendees, newAttendee.trim()] }))
      setNewAttendee("")
    }
  }

  const removeAttendee = (attendee: string) => {
    setFormData(prev => ({ ...prev, attendees: prev.attendees.filter(a => a !== attendee) }))
  }

  const selectedEventType = eventTypes.find(t => t.value === formData.type)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className={cn("w-3 h-3 rounded-full", selectedEventType?.color)} />
            Crear nuevo evento
          </DialogTitle>
          <DialogDescription>
            Agrega un nuevo evento a tu calendario
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Event Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="flex items-center gap-2">
              <Type className="w-4 h-4" />
              Título
            </Label>
            <Input
              id="title"
              placeholder="Título del evento..."
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="text-lg font-medium"
            />
          </div>

          {/* Event Type */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Tag className="w-4 h-4" />
                Tipo
              </Label>
              <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value as CalendarEvent["type"] }))}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {eventTypes.map(type => (
                    <SelectItem key={type.value} value={type.value}>
                      <div className="flex items-center gap-2">
                        <div className={cn("w-3 h-3 rounded-full", type.color)} />
                        {type.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <CalendarIcon className="w-4 h-4" />
                Fecha
              </Label>
              <Popover open={showCalendar} onOpenChange={setShowCalendar}>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    {format(formData.date, "PPP")}
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
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Hora
              </Label>
              <Select value={formData.time} onValueChange={(value) => setFormData(prev => ({ ...prev, time: value }))}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map(time => (
                    <SelectItem key={time} value={time}>{time}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Duration and All Day */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Duración</Label>
              <Select value={formData.duration} onValueChange={(value) => setFormData(prev => ({ ...prev, duration: value }))}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {durationOptions.map(duration => (
                    <SelectItem key={duration} value={duration}>{duration}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Opciones</Label>
              <div className="flex items-center space-x-4 h-10">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="all-day"
                    checked={formData.allDay}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, allDay: checked }))}
                  />
                  <Label htmlFor="all-day" className="text-sm">Todo el día</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="reminder"
                    checked={formData.reminder}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, reminder: checked }))}
                  />
                  <Label htmlFor="reminder" className="text-sm">Recordatorio</Label>
                </div>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location" className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Ubicación
            </Label>
            <Input
              id="location"
              placeholder="Agregar ubicación..."
              value={formData.location}
              onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
            />
          </div>

          {/* Attendees */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Asistentes
            </Label>
            <div className="flex gap-2">
              <Input
                placeholder="Agregar asistente..."
                value={newAttendee}
                onChange={(e) => setNewAttendee(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addAttendee()}
              />
              <Button onClick={addAttendee} variant="outline" className="cursor-pointer">Agregar</Button>
            </div>
            {formData.attendees.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.attendees.map((attendee, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-2 px-2 py-1">
                    <Avatar className="w-5 h-5">
                      <AvatarFallback className="text-[10px] font-medium">
                        {attendee.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{attendee}</span>
                    <button
                      onClick={() => removeAttendee(attendee)}
                      className="text-muted-foreground hover:text-foreground cursor-pointer"
                      type="button"
                    >
                      ×
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              placeholder="Agregar descripción..."
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-6">
            <Button onClick={handleSave} className="flex-1 cursor-pointer">
              Crear evento
            </Button>
            <Button onClick={() => onOpenChange(false)} variant="outline" className="cursor-pointer">
              Cancelar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
