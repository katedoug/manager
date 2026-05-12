"use client"

import { useState } from "react"
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Users,
  MoreHorizontal,
  Search,
  Grid3X3,
  List,
  ChevronDown,
  Menu,
} from "lucide-react"
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isToday,
  isSameDay,
} from "date-fns"
import { es } from "date-fns/locale"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { type CalendarEvent } from "../types"

interface CalendarMainProps {
  selectedDate?: Date
  onDateSelect?: (date: Date) => void
  onMenuClick?: () => void
  events?: CalendarEvent[]
  onEventClick?: (event: CalendarEvent) => void
}

export function CalendarMain({
  selectedDate,
  onDateSelect,
  onMenuClick,
  events = [],
  onEventClick,
}: CalendarMainProps) {
  const [currentDate, setCurrentDate] = useState(selectedDate || new Date())
  const [viewMode, setViewMode] = useState<"month" | "list">("month")
  const [showEventDialog, setShowEventDialog] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)

  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)

  const calendarStart = new Date(monthStart)
  calendarStart.setDate(calendarStart.getDate() - monthStart.getDay())

  const calendarEnd = new Date(monthEnd)
  calendarEnd.setDate(calendarEnd.getDate() + (6 - monthEnd.getDay()))

  const calendarDays = eachDayOfInterval({ start: calendarStart, end: calendarEnd })

  const getEventsForDay = (date: Date) =>
    events.filter(event => isSameDay(event.date, date))

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate(direction === "prev" ? subMonths(currentDate, 1) : addMonths(currentDate, 1))
  }

  const goToToday = () => setCurrentDate(new Date())

  const handleEventClick = (event: CalendarEvent) => {
    if (onEventClick) {
      onEventClick(event)
    } else {
      setSelectedEvent(event)
      setShowEventDialog(true)
    }
  }

  const weekDays = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"]

  const renderCalendarGrid = () => (
    <div className="flex-1 bg-background">
      <div className="grid grid-cols-7 border-b">
        {weekDays.map(day => (
          <div
            key={day}
            className="p-4 text-center font-medium text-sm text-muted-foreground border-r last:border-r-0"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 flex-1">
        {calendarDays.map(day => {
          const dayEvents = getEventsForDay(day)
          const isCurrentMonth = isSameMonth(day, currentDate)
          const isDayToday = isToday(day)
          const isSelected = selectedDate && isSameDay(day, selectedDate)

          return (
            <div
              key={day.toISOString()}
              className={cn(
                "min-h-[120px] border-r border-b last:border-r-0 p-2 cursor-pointer transition-colors",
                isCurrentMonth
                  ? "bg-background hover:bg-accent/50"
                  : "bg-muted/30 text-muted-foreground",
                isSelected && "ring-2 ring-primary ring-inset",
                isDayToday && "bg-accent/20"
              )}
              onClick={() => onDateSelect?.(day)}
            >
              <div className="flex items-center justify-between mb-1">
                <span
                  className={cn(
                    "text-sm font-medium",
                    isDayToday &&
                      "bg-primary text-primary-foreground rounded-md w-6 h-6 flex items-center justify-center text-xs"
                  )}
                >
                  {format(day, "d")}
                </span>
                {dayEvents.length > 2 && (
                  <span className="text-xs text-muted-foreground">+{dayEvents.length - 2}</span>
                )}
              </div>

              <div className="space-y-1">
                {dayEvents.slice(0, 2).map(event => (
                  <div
                    key={event.id}
                    className={cn(
                      "text-xs p-1 rounded-sm text-white cursor-pointer truncate",
                      event.color
                    )}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleEventClick(event)
                    }}
                  >
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span className="truncate">{event.title}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )

  const renderListView = () => {
    const upcoming = events
      .filter(event => event.date >= new Date())
      .sort((a, b) => a.date.getTime() - b.date.getTime())

    return (
      <div className="flex-1 p-4">
        <div className="space-y-3">
          {upcoming.map(event => (
            <Card
              key={event.id}
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handleEventClick(event)}
            >
              <CardContent className="px-4 py-3">
                <div className="flex items-start gap-3">
                  <div className={cn("w-2.5 h-2.5 rounded-full mt-1.5 shrink-0", event.color)} />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium truncate">{event.title}</h3>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <CalendarIcon className="w-3 h-3 shrink-0" />
                        {format(event.date, "d MMM yyyy", { locale: es })}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3 shrink-0" />
                        {event.time}
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="lg" className="cursor-pointer shrink-0 -mr-2" onClick={e => { e.stopPropagation(); handleEventClick(event) }}>
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex flex-col flex-wrap gap-4 p-6 border-b md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4 flex-wrap">
          <Button
            variant="outline"
            size="lg"
            className="xl:hidden cursor-pointer"
            onClick={onMenuClick}
          >
            <Menu className="w-4 h-4" />
          </Button>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="lg" onClick={() => navigateMonth("prev")} className="cursor-pointer">
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="lg" onClick={() => navigateMonth("next")} className="cursor-pointer">
              <ChevronRight className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="lg" onClick={goToToday} className="cursor-pointer">
              Hoy
            </Button>
          </div>

          <h1 className="text-2xl font-semibold capitalize">
            {format(currentDate, "MMMM yyyy", { locale: es })}
          </h1>
        </div>

        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Buscar citas…" className="pl-10 w-64" />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="lg" variant="outline" className="cursor-pointer">
                {viewMode === "month" ? (
                  <Grid3X3 className="w-4 h-4 mr-2" />
                ) : (
                  <List className="w-4 h-4 mr-2" />
                )}
                {viewMode === "month" ? "Mes" : "Lista"}
                <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setViewMode("month")} className="cursor-pointer">
                <Grid3X3 className="w-4 h-4 mr-2" />
                Mes
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setViewMode("list")} className="cursor-pointer">
                <List className="w-4 h-4 mr-2" />
                Lista
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {viewMode === "month" ? renderCalendarGrid() : renderListView()}

      {/* Event Detail Dialog */}
      <Dialog open={showEventDialog} onOpenChange={setShowEventDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedEvent?.title || "Detalles de la Cita"}</DialogTitle>
            <DialogDescription>Ver y gestionar esta cita</DialogDescription>
          </DialogHeader>
          {selectedEvent && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-muted-foreground" />
                <span>{format(selectedEvent.date, "EEEE, d 'de' MMMM yyyy", { locale: es })}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span>
                  {selectedEvent.time} ({selectedEvent.duration})
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span>{selectedEvent.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-muted-foreground" />
                <div className="flex items-center gap-2">
                  <span>Participantes:</span>
                  <div className="flex -space-x-2">
                    {selectedEvent.attendees.map((attendee, index) => (
                      <Avatar key={index} className="w-6 h-6 border-2 border-background">
                        <AvatarFallback className="text-xs">
                          {attendee.slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className={cn("text-white", selectedEvent.color)}>
                  {selectedEvent.type}
                </Badge>
              </div>
              <div className="flex gap-2 pt-4">
                <Button size="lg"
                  variant="outline"
                  className="flex-1 cursor-pointer"
                  onClick={() => setShowEventDialog(false)}
                >
                  Editar
                </Button>
                <Button size="lg"
                  variant="destructive"
                  className="flex-1 cursor-pointer"
                  onClick={() => setShowEventDialog(false)}
                >
                  Eliminar
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
