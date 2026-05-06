"use client"

import { useState, useCallback } from "react"

import { CalendarSidebar } from "./calendar-sidebar"
import { CalendarMain } from "./calendar-main"
import { EventForm } from "./event-form"
import { SERVICES } from "./calendars"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { type CalendarEvent } from "../types"
import { useCalendar } from "../use-calendar"

interface CalendarProps {
  events: CalendarEvent[]
  eventDates: Array<{ date: Date; count: number }>
}

export function Calendar({ events, eventDates }: CalendarProps) {
  const calendar = useCalendar(events)

  // All services visible by default
  const [visibleServices, setVisibleServices] = useState<Set<string>>(
    () => new Set(SERVICES.map(s => s.id))
  )

  const handleToggleService = useCallback((serviceId: string) => {
    setVisibleServices(prev => {
      const next = new Set(prev)
      if (next.has(serviceId)) {
        next.delete(serviceId)
      } else {
        next.add(serviceId)
      }
      return next
    })
  }, [])

  // Filter events: show event if its title starts with a visible service name
  const filteredEvents = calendar.events.filter(event =>
    SERVICES.some(s => visibleServices.has(s.id) && event.title.startsWith(s.id))
  )

  const sidebarProps = {
    selectedDate:     calendar.selectedDate,
    onDateSelect:     calendar.handleDateSelect,
    onNewEvent:       calendar.handleNewEvent,
    events:           eventDates,
    visibleServices,
    onToggleService:  handleToggleService,
  }

  return (
    <>
      <div className="border rounded-lg bg-background relative">
        <div className="flex min-h-[800px]">
          <div className="hidden xl:block w-80 flex-shrink-0 border-r">
            <CalendarSidebar {...sidebarProps} className="h-full" />
          </div>

          <div className="flex-1 min-w-0">
            <CalendarMain
              selectedDate={calendar.selectedDate}
              onDateSelect={calendar.handleDateSelect}
              onMenuClick={() => calendar.setShowCalendarSheet(true)}
              events={filteredEvents}
              onEventClick={calendar.handleEditEvent}
            />
          </div>
        </div>

        <Sheet open={calendar.showCalendarSheet} onOpenChange={calendar.setShowCalendarSheet}>
          <SheetContent side="left" className="w-80 p-0" style={{ position: "absolute" }}>
            <SheetHeader className="p-4 pb-2">
              <SheetTitle>Calendario</SheetTitle>
              <SheetDescription>Navega por fechas y gestiona tus citas</SheetDescription>
            </SheetHeader>
            <CalendarSidebar {...sidebarProps} className="h-full" />
          </SheetContent>
        </Sheet>
      </div>

      <EventForm
        event={calendar.editingEvent}
        open={calendar.showEventForm}
        onOpenChange={calendar.setShowEventForm}
        onSave={calendar.handleSaveEvent}
        onDelete={calendar.handleDeleteEvent}
      />
    </>
  )
}
