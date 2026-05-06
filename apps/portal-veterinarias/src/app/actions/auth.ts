"use server"

import { cookies } from "next/headers"

const DEMO_EMAIL    = "demo@demo.com"
const DEMO_PASSWORD = "test1234"

export async function login(
  _prevState: { error: string } | { success: true } | null,
  formData: FormData
) {
  const email    = (formData.get("email")    as string)?.trim()
  const password = (formData.get("password") as string)

  if (email !== DEMO_EMAIL || password !== DEMO_PASSWORD) {
    return { error: "Correo o contraseña incorrectos" }
  }

  const cookieStore = await cookies()
  cookieStore.set("auth", "1", {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24,
    sameSite: "lax",
  })

  // Navigation is handled client-side after the 3-second loader
  return { success: true as const }
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete("auth")
  // Navigation is handled client-side after the 3-second loader
}
