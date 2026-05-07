"use server"

import { createClient } from "@/lib/supabase/server"
import { createClient as createAdminClient } from "@supabase/supabase-js"

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

  const admin = createAdminClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  )

  const { error: createError } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  })

  if (createError && !createError.message.toLowerCase().includes("already been registered")) {
    return { error: createError.message }
  }

  const { error: updateError } = await supabase
    .from("clinics")
    .update({ email })
    .eq("id", clinicUser.clinic_id)

  if (updateError) return { error: "Error al guardar el correo en la clínica" }

  return { success: true, email }
}
