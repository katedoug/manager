import React from "react"
import { createClient } from "@/lib/supabase/server"
import { DashboardShell } from "./dashboard-shell"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const currentUser = {
    name:   user?.user_metadata?.full_name ?? user?.email ?? "Usuario",
    email:  user?.email ?? "",
    avatar: "",
  }

  return <DashboardShell user={currentUser}>{children}</DashboardShell>
}
