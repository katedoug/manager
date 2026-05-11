import { NextResponse } from "next/server"
import { getCalendarClientWithRefreshToken, CALENDAR_ID } from "@/lib/google-calendar"
import { getGoogleRefreshToken, CORS_HEADERS } from "@/lib/calendar-auth"

export const dynamic = "force-dynamic"

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS_HEADERS })
}

// GET /api/calendar/availability?date=2026-05-15
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const dateStr = searchParams.get("date")
    if (!dateStr) return NextResponse.json({ error: "date param required" }, { status: 400, headers: CORS_HEADERS })

    const refreshToken = await getGoogleRefreshToken()
    const tz = "America/Mexico_City"
    const dayStart = new Date(`${dateStr}T09:00:00`)
    const dayEnd   = new Date(`${dateStr}T18:00:00`)

    const cal = getCalendarClientWithRefreshToken(refreshToken)
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

    return NextResponse.json({ date: dateStr, slots }, { headers: CORS_HEADERS })
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e)
    return NextResponse.json({ error: msg }, { status: 500, headers: CORS_HEADERS })
  }
}
