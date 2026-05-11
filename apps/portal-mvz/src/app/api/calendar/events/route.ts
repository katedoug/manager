import { NextResponse } from "next/server"
import { getCalendarClientWithRefreshToken, CALENDAR_ID } from "@/lib/google-calendar"
import { getGoogleRefreshToken, CORS_HEADERS } from "@/lib/calendar-auth"
import { calendar_v3 } from "googleapis"

export const dynamic = "force-dynamic"

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS_HEADERS })
}

async function getCalendar() {
  const token = await getGoogleRefreshToken()
  return getCalendarClientWithRefreshToken(token)
}

// GET /api/calendar/events?timeMin=...&timeMax=...
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const timeMin = searchParams.get("timeMin") ?? new Date().toISOString()
    const timeMax = searchParams.get("timeMax") ?? new Date(Date.now() + 30 * 86_400_000).toISOString()

    const cal = await getCalendar()
    const res = await cal.events.list({
      calendarId: CALENDAR_ID,
      timeMin,
      timeMax,
      singleEvents: true,
      orderBy: "startTime",
      maxResults: 250,
    })

    const events = (res.data.items ?? []).map(toAppEvent)
    return NextResponse.json(events)
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e)
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}

// POST /api/calendar/events — create event
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { title, date, time, duration, location, description, attendees, patientEmail } = body

    const start = buildDateTime(date, time)
    const end = buildEndDateTime(start, duration)

    const resource: calendar_v3.Schema$Event = {
      summary: title,
      location,
      description,
      start: { dateTime: start, timeZone: "America/Mexico_City" },
      end:   { dateTime: end,   timeZone: "America/Mexico_City" },
      attendees: [
        ...(patientEmail ? [{ email: patientEmail }] : []),
        ...(attendees ?? []).map((a: string) => ({ email: a })),
      ],
      conferenceData: {
        createRequest: {
          requestId: `kd-${Date.now()}`,
          conferenceSolutionKey: { type: "hangoutsMeet" },
        },
      },
    }

    const cal = await getCalendar()
    const res = await cal.events.insert({
      calendarId: CALENDAR_ID,
      conferenceDataVersion: 1,
      sendUpdates: "all",
      requestBody: resource,
    })

    return NextResponse.json(toAppEvent(res.data), { status: 201, headers: CORS_HEADERS })
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e)
    return NextResponse.json({ error: msg }, { status: 500, headers: CORS_HEADERS })
  }
}

// ─── helpers ────────────────────────────────────────────────────────────────

function toAppEvent(ev: calendar_v3.Schema$Event) {
  const startRaw = ev.start?.dateTime ?? ev.start?.date ?? ""
  const endRaw   = ev.end?.dateTime   ?? ev.end?.date   ?? ""
  const start    = new Date(startRaw)
  const end      = new Date(endRaw)

  const diffMs  = end.getTime() - start.getTime()
  const diffMin = Math.round(diffMs / 60_000)
  const duration =
    diffMin < 60 ? `${diffMin} min` :
    diffMin === 60 ? "1 hora" :
    diffMin % 60 === 0 ? `${diffMin / 60} horas` :
    `${Math.floor(diffMin / 60)}h ${diffMin % 60}min`

  const meetLink = ev.conferenceData?.entryPoints?.find(e => e.entryPointType === "video")?.uri ?? null

  return {
    googleEventId: ev.id,
    title:       ev.summary ?? "Sin título",
    date:        start.toISOString(),
    time:        start.toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit", hour12: true }),
    duration,
    location:    ev.location ?? "",
    description: ev.description ?? "",
    attendees:   (ev.attendees ?? []).map(a => a.displayName ?? a.email ?? ""),
    color:       "bg-blue-500",
    type:        "meeting" as const,
    meetLink,
  }
}

function buildDateTime(dateIso: string, time: string): string {
  const d = new Date(dateIso)
  const [hourMin, ampm] = time.split(" ")
  let [h, m] = hourMin.split(":").map(Number)
  if (ampm === "PM" && h !== 12) h += 12
  if (ampm === "AM" && h === 12) h = 0
  d.setHours(h, m, 0, 0)
  return d.toISOString()
}

const DURATION_MAP: Record<string, number> = {
  "15 min": 15, "30 min": 30, "45 min": 45,
  "1 hour": 60, "1 hora": 60,
  "1.5 hours": 90, "2 hours": 120, "3 hours": 180, "All day": 480,
}

function buildEndDateTime(startIso: string, duration: string): string {
  const mins = DURATION_MAP[duration] ?? 60
  return new Date(new Date(startIso).getTime() + mins * 60_000).toISOString()
}
