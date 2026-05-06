"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"

interface DatePickerProps {
  selectedDate?: Date
  onDateSelect?: (date: Date) => void
  events?: Array<{ date: Date; count: number }>
}

export function DatePicker({ selectedDate, onDateSelect, events = [] }: DatePickerProps) {
  const [date, setDate] = useState<Date | undefined>(selectedDate || new Date())

  const handleDateSelect = (selected: Date | undefined) => {
    if (selected) {
      setDate(selected)
      onDateSelect?.(selected)
    }
  }

  const eventDates = events.reduce(
    (acc, event) => {
      acc[event.date.toDateString()] = event.count
      return acc
    },
    {} as Record<string, number>
  )

  return (
    <div className="flex justify-center">
      <Calendar
        mode="single"
        selected={date}
        onSelect={handleDateSelect}
        className="w-full [&_[role=gridcell]_button]:cursor-pointer [&_button]:cursor-pointer"
        modifiers={{
          hasEvents: (d) => Boolean(eventDates[d.toDateString()]),
        }}
        modifiersClassNames={{
          hasEvents:
            "relative after:absolute after:bottom-1 after:right-1 after:w-1.5 after:h-1.5 after:bg-primary after:rounded-full",
        }}
      />
    </div>
  )
}
