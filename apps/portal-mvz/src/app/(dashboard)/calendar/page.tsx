"use client"

import { useState, useEffect } from "react"
import { Calendar } from "./components/calendar"
import { events as mockEvents } from "./data"
import { type CalendarEvent } from "./types"

export default function CalendarPage() {
  const [events, setEvents] = useState<CalendarEvent[]>(mockEvents)
  const [eventDates, setEventDates] = useState(mockEvents.map(e => ({ date: e.date, count: 1 })))
  const [status, setStatus] = useState<"loading" | "live" | "mock">("loading")

  useEffect(() => {
    const now = new Date()
    const timeMin = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()
    const timeMax = new Date(now.getFullYear(), now.getMonth() + 2, 0).toISOString()

    fetch(`/api/calendar/events?timeMin=${encodeURIComponent(timeMin)}&timeMax=${encodeURIComponent(timeMax)}`)
      .then(r => r.json())
      .then((data: unknown) => {
        if (!Array.isArray(data)) { setStatus("mock"); return }
        const calEvents: CalendarEvent[] = (data as Record<string, unknown>[]).map((ev, idx) => ({
          id: idx + 1,
          googleEventId: ev.googleEventId as string | undefined,
          title:       (ev.title as string) ?? "Sin título",
          date:        new Date(ev.date as string),
          time:        ev.time as string,
          duration:    ev.duration as string,
          location:    (ev.location as string) ?? "",
          description: (ev.description as string) ?? "",
          attendees:   (ev.attendees as string[]) ?? [],
          color:       "bg-blue-500",
          type:        "meeting" as const,
          meetLink:    (ev.meetLink as string | null) ?? null,
        }))
        setEvents(calEvents)
        setEventDates(calEvents.map(e => ({ date: e.date, count: 1 })))
        setStatus("live")
      })
      .catch(() => setStatus("mock"))
  }, [])

  return (
    <div className="px-4 lg:px-6">
      {status === "live" && (
        <p className="mb-3 text-xs text-green-600">
          {events.length} eventos cargados desde Google Calendar.
        </p>
      )}
      {status === "mock" && (
        <p className="mb-3 text-xs text-muted-foreground">
          Mostrando datos de ejemplo · inicia sesión con Google para ver tu calendario real.
        </p>
      )}
      <Calendar events={events} eventDates={eventDates} />
    </div>
  )
}
