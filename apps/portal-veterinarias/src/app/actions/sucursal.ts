"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"
import { createClient as createBareClient } from "@supabase/supabase-js"

export type CreateSucursalState =
  | null
  | { error: string }
  | { success: true }

export async function createSucursal(
  _: CreateSucursalState,
  formData: FormData,
): Promise<CreateSucursalState> {
  const name         = (formData.get("nombre")        as string)?.trim()
  const slug         = (formData.get("slug")          as string)?.trim()
  const phone        = (formData.get("phone")         as string)?.trim()
  const address      = (formData.get("address")       as string)?.trim()
  const citasEmail   = (formData.get("citasEmail")    as string)?.trim()
  const citasPassword = formData.get("citasPassword") as string

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
    const bare = createBareClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    )
    const { error: signUpError } = await bare.auth.signUp({ email: citasEmail, password: citasPassword })
    if (signUpError && !signUpError.message.toLowerCase().includes("already registered")) {
      return { error: signUpError.message }
    }
    await supabase.from("clinics").update({ email: citasEmail }).eq("id", clinicUser.clinic_id)
  }

  revalidatePath("/ajustes")
  return { success: true }
}
