import { createClient } from "./server"

export async function getSessionAndClinic() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data } = await supabase
    .from("clinic_users")
    .select("role, clinic:clinics(id, name, slug, address, phone, email, created_at)")
    .eq("user_id", user.id)
    .eq("is_active", true)
    .single()

  if (!data) return null

  return {
    user,
    clinic: data.clinic as unknown as {
      id: string
      name: string
      slug: string | null
      address: string | null
      phone: string | null
      email: string | null
      created_at: string
    },
    role: data.role as string,
  }
}
