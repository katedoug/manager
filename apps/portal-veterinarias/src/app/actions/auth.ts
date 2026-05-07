"use server"

import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"

export async function login(
  _prevState: { error: string } | { success: true } | null,
  formData: FormData
) {
  const email    = (formData.get("email")    as string)?.trim()
  const password = (formData.get("password") as string)

  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    return { error: "Correo o contraseña incorrectos" }
  }

  return { success: true as const }
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect("/")
}
