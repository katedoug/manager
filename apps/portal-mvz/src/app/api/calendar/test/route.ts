import { NextResponse } from "next/server"
import { getCalendarClientWithRefreshToken, CALENDAR_ID } from "@/lib/google-calendar"
import { getGoogleRefreshToken } from "@/lib/calendar-auth"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const refreshToken = await getGoogleRefreshToken()
    const cal = getCalendarClientWithRefreshToken(refreshToken)
    const calInfo = await cal.calendars.get({ calendarId: CALENDAR_ID })
    const now = new Date()
    const evRes = await cal.events.list({
      calendarId: CALENDAR_ID,
      timeMin: now.toISOString(),
      maxResults: 5,
      singleEvents: true,
      orderBy: "startTime",
    })
    return NextResponse.json({
      ok: true,
      calendarId: CALENDAR_ID,
      calendarSummary: calInfo.data.summary,
      upcomingEvents: evRes.data.items?.length ?? 0,
      nextEvent: evRes.data.items?.[0]?.summary ?? null,
    })
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ ok: false, error: msg }, { status: 500 })
  }
}
