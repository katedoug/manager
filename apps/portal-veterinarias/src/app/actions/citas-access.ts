"use server"

import { createClient } from "@/lib/supabase/server"
import { createClient as createBareClient } from "@supabase/supabase-js"

export type CitasAccessState =
  | null
  | { error: string }
  | { success: true; email: string }

export async function setCitasAccess(
  _: CitasAccessState,
  formData: FormData,
): Promise<CitasAccessState> {
  const email    = (formData.get("citasEmail") as string)?.trim()
  const password = formData.get("citasPassword") as string

  if (!email || !password) return { error: "Completa el correo y la contraseña" }
  if (password.length < 6)  return { error: "La contraseña debe tener al menos 6 caracteres" }

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: "No autenticado" }

  const { data: clinicUser } = await supabase
    .from("clinic_users")
    .select("clinic_id")
    .eq("user_id", user.id)
    .eq("is_active", true)
    .single()

  if (!clinicUser) return { error: "Sin clínica asociada" }

  // Bare client — creates the new user without touching the manager's session cookies
  const bare = createBareClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )

  const { error: signUpError } = await bare.auth.signUp({ email, password })

  if (signUpError) {
    if (signUpError.message.toLowerCase().includes("already registered")) {
      return { error: "Ese correo ya tiene una cuenta. Elige otro correo o contacta a soporte." }
    }
    return { error: signUpError.message }
  }

  const { error: updateError } = await supabase
    .from("clinics")
    .update({ email })
    .eq("id", clinicUser.clinic_id)

  if (updateError) return { error: "Error al guardar el correo en la clínica" }

  return { success: true, email }
}
