import { type CalendarEvent, type Calendar } from "./types"

import eventsData from "./data/events.json"
import eventDatesData from "./data/event-dates.json"
import calendarsData from "./data/calendars.json"

export const events: CalendarEvent[] = eventsData.map(event => {
  const now = new Date()
  const currentYear = now.getFullYear()
  const currentMonth = now.getMonth()

  const dayAndTime = event.date.split("T")
  const day = parseInt(dayAndTime[0])
  const timeStr = dayAndTime[1]
  const timeParts = timeStr.split(":")
  const hours = parseInt(timeParts[0])
  const minutes = parseInt(timeParts[1])

  const eventDate = new Date(currentYear, currentMonth, day, hours, minutes)

  return {
    ...event,
    date: eventDate,
    type: event.type as CalendarEvent["type"],
  }
})

export const eventDates = eventDatesData.map(item => {
  const now = new Date()
  const currentYear = now.getFullYear()
  const currentMonth = now.getMonth()
  const day = parseInt(item.date.split("T")[0])
  return {
    date: new Date(currentYear, currentMonth, day),
    count: item.count,
  }
})

export const calendars: Calendar[] = calendarsData as Calendar[]
