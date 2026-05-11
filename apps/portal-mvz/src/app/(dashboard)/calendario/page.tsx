import { Calendar } from "../calendar/components/calendar"
import { events, eventDates } from "../calendar/data"

export default function CalendarioPage() {
  return (
    <div className="px-4 lg:px-6">
      <Calendar events={events} eventDates={eventDates} />
    </div>
  )
}
