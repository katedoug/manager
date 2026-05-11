import { NextResponse } from "next/server"

export async function GET() {
  const clientId      = process.env.GOOGLE_CLIENT_ID
  const clientSecret  = process.env.GOOGLE_CLIENT_SECRET
  const refreshToken  = process.env.GOOGLE_REFRESH_TOKEN
  const calendarId    = process.env.GOOGLE_CALENDAR_ID ?? "primary"

  if (!clientId || !clientSecret || !refreshToken) {
    return NextResponse.json({ ok: false, error: "Missing env vars", clientId: !!clientId, clientSecret: !!clientSecret, refreshToken: !!refreshToken }, { status: 400 })
  }

  try {
    const { getCalendarClient } = await import("@/lib/google-calendar")
    const cal = getCalendarClient()
    const calInfo = await cal.calendars.get({ calendarId })
    const now = new Date()
    const evRes = await cal.events.list({
      calendarId,
      timeMin: now.toISOString(),
      maxResults: 5,
      singleEvents: true,
      orderBy: "startTime",
    })
    return NextResponse.json({
      ok: true,
      calendarId,
      calendarSummary: calInfo.data.summary,
      upcomingEvents: evRes.data.items?.length ?? 0,
      nextEvent: evRes.data.items?.[0]?.summary ?? null,
    })
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ ok: false, error: msg }, { status: 500 })
  }
}
