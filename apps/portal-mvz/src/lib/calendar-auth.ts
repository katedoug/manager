import { createClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"

/**
 * Gets the Google refresh token for calendar API calls.
 * - If there's an authenticated MVZ session, uses that user's token.
 * - Otherwise (e.g. called from portal-pacientes), looks up the first
 *   active vet user's token via the service role.
 */
export async function getGoogleRefreshToken(): Promise<string> {
  // Try authenticated session first
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    const token = user?.user_metadata?.google_refresh_token
    if (token) return token
  } catch {}

  // Fall back to service role lookup — find first vet with a stored token
  const admin = createAdminClient()
  const { data, error } = await admin.auth.admin.listUsers()
  if (error || !data?.users) throw new Error("No se pudo obtener usuarios")

  const vetUser = data.users.find(u => u.user_metadata?.google_refresh_token)
  const token = vetUser?.user_metadata?.google_refresh_token
  if (!token) throw new Error("No Google refresh token disponible. Inicia sesión con Google en el portal MVZ primero.")
  return token
}

export const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
}
