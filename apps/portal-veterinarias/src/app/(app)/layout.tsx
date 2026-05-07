import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { DemoModeProvider } from "@/context/demo-mode"
import { DemoLoader } from "@/components/demo-loader"
import { getSessionAndClinic } from "@/lib/supabase/queries"

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const session = await getSessionAndClinic()

  return (
    <DemoModeProvider>
      <SidebarProvider>
        <AppSidebar
          clinicName={session?.clinic?.name ?? "Mi Clínica"}
          userEmail={session?.user?.email ?? ""}
        />
        <SidebarInset>{children}</SidebarInset>
      </SidebarProvider>
      <DemoLoader />
    </DemoModeProvider>
  )
}
