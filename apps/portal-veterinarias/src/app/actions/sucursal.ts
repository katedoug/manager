"use server"

import { createClient } from "@/lib/supabase/server"
import { createClient as createAdminClient } from "@supabase/supabase-js"

export type CreateSucursalState =
  | null
  | { error: string }
  | { success: true }

export async function createSucursal(
  _: CreateSucursalState,
  formData: FormData,
): Promise<CreateSucursalState> {
  const name          = (formData.get("nombre")        as string)?.trim()
  const slug          = (formData.get("slug")          as string)?.trim()
  const phone         = (formData.get("phone")         as string)?.trim()
  const address       = (formData.get("address")       as string)?.trim()
  const citasEmail    = (formData.get("citasEmail")    as string)?.trim()
  const citasPassword = formData.get("citasPassword")  as string

  if (!name) return { error: "El nombre de la sucursal es requerido" }

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

  const { error: updateError } = await supabase
    .from("clinics")
    .update({
      name,
      slug:    slug    || null,
      phone:   phone   || null,
      address: address || null,
    })
    .eq("id", clinicUser.clinic_id)

  if (updateError) return { error: updateError.message }

  if (citasEmail && citasPassword) {
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return { error: "SUPABASE_SERVICE_ROLE_KEY no configurada en el servidor" }
    }
    try {
      const admin = createAdminClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY,
      )
      const { error: createError } = await admin.auth.admin.createUser({
        email: citasEmail,
        password: citasPassword,
        email_confirm: true,
      })
      if (createError && !createError.message.toLowerCase().includes("already been registered")) {
        return { error: createError.message }
      }
      await supabase.from("clinics").update({ email: citasEmail }).eq("id", clinicUser.clinic_id)
    } catch (e) {
      return { error: `Error al crear usuario de citas: ${e instanceof Error ? e.message : String(e)}` }
    }
  }

  return { success: true }
}
