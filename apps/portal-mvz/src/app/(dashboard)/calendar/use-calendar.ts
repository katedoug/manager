"use client"

import { useState, useCallback } from "react"
import { type CalendarEvent } from "./types"

export interface UseCalendarState {
  selectedDate: Date
  showEventForm: boolean
  editingEvent: CalendarEvent | null
  showCalendarSheet: boolean
  events: CalendarEvent[]
}

export interface UseCalendarActions {
  setSelectedDate: (date: Date) => void
  setShowEventForm: (show: boolean) => void
  setEditingEvent: (event: CalendarEvent | null) => void
  setShowCalendarSheet: (show: boolean) => void
  handleDateSelect: (date: Date) => void
  handleNewEvent: () => void
  handleNewCalendar: () => void
  handleSaveEvent: (eventData: Partial<CalendarEvent>) => void
  handleDeleteEvent: (eventId: number) => void
  handleEditEvent: (event: CalendarEvent) => void
}

export interface UseCalendarReturn extends UseCalendarState, UseCalendarActions {}

export function useCalendar(initialEvents: CalendarEvent[] = []): UseCalendarReturn {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [showEventForm, setShowEventForm] = useState(false)
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null)
  const [showCalendarSheet, setShowCalendarSheet] = useState(false)
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents)

  const handleDateSelect = useCallback((date: Date) => {
    setSelectedDate(date)
    setShowCalendarSheet(false)
  }, [])

  const handleNewEvent = useCallback(() => {
    setEditingEvent(null)
    setShowEventForm(true)
  }, [])

  const handleNewCalendar = useCallback(() => {}, [])

  const handleSaveEvent = useCallback(async (eventData: Partial<CalendarEvent>) => {
    try {
      const res = await fetch("/api/calendar/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: eventData.title,
          date: eventData.date?.toISOString(),
          time: eventData.time,
          duration: eventData.duration,
          location: eventData.location,
          description: eventData.description,
          attendees: eventData.attendees,
        }),
      })
      if (res.ok) {
        const created = await res.json()
        const newEvent: CalendarEvent = {
          id: Date.now(),
          googleEventId: created.googleEventId,
          title:       created.title,
          date:        new Date(created.date),
          time:        created.time,
          duration:    created.duration,
          location:    created.location ?? "",
          description: created.description ?? "",
          attendees:   created.attendees ?? [],
          color:       "bg-blue-500",
          type:        "meeting",
          meetLink:    created.meetLink,
        }
        setEvents(prev => [...prev, newEvent])
      }
    } catch {
      // API not configured — add event locally so UI still works
      setEvents(prev => [...prev, {
        id: Date.now(),
        title: eventData.title ?? "",
        date: eventData.date ?? new Date(),
        time: eventData.time ?? "",
        duration: eventData.duration ?? "",
        location: eventData.location ?? "",
        attendees: eventData.attendees ?? [],
        color: eventData.color ?? "bg-blue-500",
        type: eventData.type ?? "meeting",
      }])
    }
    setShowEventForm(false)
    setEditingEvent(null)
  }, [])

  const handleDeleteEvent = useCallback(async (eventId: number) => {
    const event = events.find(e => e.id === eventId)
    if (event?.googleEventId) {
      try {
        await fetch(`/api/calendar/events/${event.googleEventId}`, { method: "DELETE" })
      } catch {}
    }
    setEvents(prev => prev.filter(e => e.id !== eventId))
    setShowEventForm(false)
    setEditingEvent(null)
  }, [events])

  const handleEditEvent = useCallback((event: CalendarEvent) => {
    setEditingEvent(event)
    setShowEventForm(true)
  }, [])

  return {
    selectedDate,
    showEventForm,
    editingEvent,
    showCalendarSheet,
    events,
    setSelectedDate,
    setShowEventForm,
    setEditingEvent,
    setShowCalendarSheet,
    handleDateSelect,
    handleNewEvent,
    handleNewCalendar,
    handleSaveEvent,
    handleDeleteEvent,
    handleEditEvent,
  }
}
