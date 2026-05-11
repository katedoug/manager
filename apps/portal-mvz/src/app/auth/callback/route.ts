import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get("code")

  if (code) {
    const supabase = await createClient()
    const { data } = await supabase.auth.exchangeCodeForSession(code)

    // Persist Google refresh token in user metadata for server-side calendar access
    if (data.session?.provider_refresh_token) {
      await supabase.auth.updateUser({
        data: { google_refresh_token: data.session.provider_refresh_token },
      })
    }
  }

  return NextResponse.redirect(`${origin}/dashboard`)
}
