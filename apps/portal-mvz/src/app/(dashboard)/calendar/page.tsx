import { Calendar } from "./components/calendar"
import { events as mockEvents } from "./data"
import { type CalendarEvent } from "./types"
import { createClient } from "@/lib/supabase/server"

async function fetchGoogleEvents(refreshToken: string): Promise<CalendarEvent[] | null> {
  try {
    const now = new Date()
    const timeMin = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()
    const timeMax = new Date(now.getFullYear(), now.getMonth() + 2, 0).toISOString()

    const { getCalendarClientWithRefreshToken, CALENDAR_ID } = await import("@/lib/google-calendar")
    const cal = getCalendarClientWithRefreshToken(refreshToken)
    const res = await cal.events.list({
      calendarId: CALENDAR_ID,
      timeMin,
      timeMax,
      singleEvents: true,
      orderBy: "startTime",
      maxResults: 250,
    })

    let idx = 1
    return (res.data.items ?? []).map(ev => {
      const startRaw = ev.start?.dateTime ?? ev.start?.date ?? ""
      const endRaw   = ev.end?.dateTime   ?? ev.end?.date   ?? ""
      const start    = new Date(startRaw)
      const end      = new Date(endRaw)
      const diffMin  = Math.round((end.getTime() - start.getTime()) / 60_000)
      const duration =
        diffMin < 60 ? `${diffMin} min` :
        diffMin === 60 ? "1 hora" :
        diffMin % 60 === 0 ? `${diffMin / 60} horas` :
        `${Math.floor(diffMin / 60)}h ${diffMin % 60}min`

      const meetLink = ev.conferenceData?.entryPoints?.find(e => e.entryPointType === "video")?.uri ?? null

      return {
        id: idx++,
        googleEventId: ev.id ?? undefined,
        title:       ev.summary ?? "Sin título",
        date:        start,
        time:        start.toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit", hour12: true }),
        duration,
        location:    ev.location ?? "",
        description: ev.description ?? "",
        attendees:   (ev.attendees ?? []).map(a => a.displayName ?? a.email ?? ""),
        color:       "bg-blue-500",
        type:        "meeting" as const,
        meetLink,
      }
    })
  } catch (err) {
    console.error("[Google Calendar] fetch failed:", err)
    return null
  }
}

export default async function CalendarPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const googleRefreshToken = user?.user_metadata?.google_refresh_token ?? null

  const googleEvents = googleRefreshToken ? await fetchGoogleEvents(googleRefreshToken) : null
  const events = googleEvents ?? mockEvents
  const eventDates = events.map(e => ({ date: e.date, count: 1 }))
  const isLive = googleEvents !== null

  return (
    <div className="px-4 lg:px-6">
      {!isLive && (
        <p className="mb-3 text-xs text-muted-foreground">
          Mostrando datos de ejemplo · inicia sesión con Google para ver tu calendario real.
        </p>
      )}
      <Calendar events={events} eventDates={eventDates} />
    </div>
  )
}
