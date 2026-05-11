import { NextResponse } from "next/server"
import { getCalendarClient, CALENDAR_ID } from "@/lib/google-calendar"

// PATCH /api/calendar/events/[id] — reschedule / update
export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await req.json()
    const cal = getCalendarClient()

    // Fetch existing event first to merge
    const existing = await cal.events.get({ calendarId: CALENDAR_ID, eventId: id })

    const patch: Record<string, unknown> = {}
    if (body.title) patch.summary = body.title
    if (body.location !== undefined) patch.location = body.location
    if (body.description !== undefined) patch.description = body.description
    if (body.date && body.time) {
      const start = buildDateTime(body.date, body.time)
      const duration = body.duration ?? "1 hora"
      const end = buildEndDateTime(start, duration)
      patch.start = { dateTime: start, timeZone: "America/Mexico_City" }
      patch.end   = { dateTime: end,   timeZone: "America/Mexico_City" }
    }

    const res = await cal.events.patch({
      calendarId: CALENDAR_ID,
      eventId: id,
      sendUpdates: "all",
      requestBody: { ...existing.data, ...patch },
    })

    return NextResponse.json({ googleEventId: res.data.id, updated: true })
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e)
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}

// DELETE /api/calendar/events/[id]
export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const cal = getCalendarClient()
    await cal.events.delete({ calendarId: CALENDAR_ID, eventId: id, sendUpdates: "all" })
    return NextResponse.json({ deleted: true })
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e)
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}

// ─── helpers (duplicated from events/route.ts to keep files self-contained) ──

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
