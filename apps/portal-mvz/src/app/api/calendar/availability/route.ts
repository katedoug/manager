import { NextResponse } from "next/server"
import { getCalendarClient, CALENDAR_ID } from "@/lib/google-calendar"

export const dynamic = "force-dynamic"

// GET /api/calendar/availability?date=2026-05-15
// Returns available 30-min slots for the given date (09:00–18:00 Mexico City)
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const dateStr = searchParams.get("date")
    if (!dateStr) return NextResponse.json({ error: "date param required" }, { status: 400 })

    const tz = "America/Mexico_City"
    const dayStart = new Date(`${dateStr}T09:00:00`)
    const dayEnd   = new Date(`${dateStr}T18:00:00`)

    const cal = getCalendarClient()
    const freeBusy = await cal.freebusy.query({
      requestBody: {
        timeMin: dayStart.toISOString(),
        timeMax: dayEnd.toISOString(),
        timeZone: tz,
        items: [{ id: CALENDAR_ID }],
      },
    })

    const busy = (freeBusy.data.calendars?.[CALENDAR_ID]?.busy ?? []).map(b => ({
      start: new Date(b.start!),
      end:   new Date(b.end!),
    }))

    // Generate 30-min slots and mark availability
    const slots: { time: string; available: boolean }[] = []
    const cursor = new Date(dayStart)
    while (cursor < dayEnd) {
      const slotEnd = new Date(cursor.getTime() + 30 * 60_000)
      const isBusy = busy.some(b => cursor < b.end && slotEnd > b.start)
      slots.push({
        time: cursor.toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit", hour12: false }),
        available: !isBusy,
      })
      cursor.setMinutes(cursor.getMinutes() + 30)
    }

    return NextResponse.json({ date: dateStr, slots })
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e)
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
