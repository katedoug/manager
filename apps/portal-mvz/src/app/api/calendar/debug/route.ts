import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { getCalendarClientWithRefreshToken, CALENDAR_ID } from "@/lib/google-calendar"

export const dynamic = "force-dynamic"

export async function GET() {
  const supabase = await createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  const token = user?.user_metadata?.google_refresh_token ?? null

  if (!token) {
    return NextResponse.json({ step: "no_token", userId: user?.id ?? null, authError: authError?.message ?? null })
  }

  try {
    const cal = getCalendarClientWithRefreshToken(token)
    const res = await cal.events.list({
      calendarId: CALENDAR_ID,
      timeMin: new Date().toISOString(),
      maxResults: 3,
      singleEvents: true,
      orderBy: "startTime",
    })
    return NextResponse.json({
      step: "ok",
      userId: user?.id,
      tokenLen: token.length,
      eventCount: res.data.items?.length ?? 0,
      nextEvent: res.data.items?.[0]?.summary ?? null,
    })
  } catch (err) {
    return NextResponse.json({ step: "calendar_error", error: err instanceof Error ? err.message : String(err) })
  }
}
