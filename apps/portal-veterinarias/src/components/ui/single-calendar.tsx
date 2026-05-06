"use client"

import { DayPicker } from "react-day-picker"
import { Calendar } from "@/components/ui/calendar"
import type { ComponentProps } from "react"

type SingleCalendarProps = Omit<ComponentProps<typeof DayPicker>, "mode" | "selected" | "onSelect"> & {
  selected?: Date
  onSelect?: (date: Date | undefined) => void
}

function SingleCalendar({ selected, onSelect, ...props }: SingleCalendarProps) {
  return (
    <Calendar
      mode="single"
      selected={selected}
      onSelect={onSelect}
      {...(props as Omit<ComponentProps<typeof DayPicker>, "mode">)}
    />
  )
}

export { SingleCalendar }
