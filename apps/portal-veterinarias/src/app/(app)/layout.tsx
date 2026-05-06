import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { DemoModeProvider } from "@/context/demo-mode"
import { DemoLoader } from "@/components/demo-loader"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <DemoModeProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>{children}</SidebarInset>
      </SidebarProvider>
      <DemoLoader />
    </DemoModeProvider>
  )
}
