"use client"

import { Plus } from "lucide-react"

import { Calendars } from "./calendars"
import { DatePicker } from "./date-picker"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

interface CalendarSidebarProps {
  selectedDate?: Date
  onDateSelect?: (date: Date) => void
  onNewEvent?: () => void
  events?: Array<{ date: Date; count: number }>
  visibleServices: Set<string>
  onToggleService: (serviceId: string) => void
  className?: string
}

export function CalendarSidebar({
  selectedDate,
  onDateSelect,
  onNewEvent,
  events = [],
  visibleServices,
  onToggleService,
  className,
}: CalendarSidebarProps) {
  return (
    <div className={`flex flex-col h-full bg-background rounded-lg ${className}`}>
      <div className="p-6 border-b">
        <Button size="lg" className="w-full cursor-pointer" onClick={onNewEvent}>
          <Plus className="w-4 h-4 mr-2" />
          Nueva Cita
        </Button>
      </div>

      <DatePicker
        selectedDate={selectedDate}
        onDateSelect={onDateSelect}
        events={events}
      />

      <Separator />

      <div className="flex-1 overflow-y-auto p-4">
        <Calendars
          visibleServices={visibleServices}
          onToggle={onToggleService}
        />
      </div>
    </div>
  )
}
