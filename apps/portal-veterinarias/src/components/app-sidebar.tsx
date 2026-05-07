"use client"

import * as React from "react"
import {
  BarChart2,
  CalendarDays,
  CreditCard,
  FileText,
  Home,
  LifeBuoy,
  Send,
  Settings,
  Sparkles,
  Star,
  Target,
  FlaskConical,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import { useDemoMode } from "@/context/demo-mode"
import { Switch } from "@/components/ui/switch"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const navVeterinaria = [
  { title: "Inicio",            url: "/dashboard",         icon: Home        },
  { title: "Citas",             url: "/citas",             icon: CalendarDays },
  { title: "Historial Clínico", url: "/historial-clinico", icon: FileText    },
  { title: "Desempeño",         url: "/desempeno",         icon: BarChart2   },
  { title: "Evaluaciones",      url: "/evaluaciones",      icon: Star        },
]

const navGestion = [
  { title: "Insights (Próximamente)", url: "#", icon: Sparkles, disabled: true },
  { title: "Metas",   url: "/metas",   icon: Target     },
  { title: "Pagos",   url: "/pagos",   icon: CreditCard },
  { title: "Ajustes", url: "/ajustes", icon: Settings   },
]

const navSecondary = [
  { title: "Soporte",     url: "#", icon: LifeBuoy },
  { title: "Comentarios", url: "#", icon: Send     },
]

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  clinicName: string
  userEmail: string
}

export function AppSidebar({ clinicName, userEmail, ...props }: AppSidebarProps) {
  const { isDemoMode, toggleDemoMode } = useDemoMode()
  const user = { name: clinicName, email: userEmail, avatar: "" }

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/">
                <img
                  src="/partners-logo-light.svg"
                  alt="Kate&Doug"
                  className="h-9 w-auto"
                />
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={navVeterinaria} groupLabel="Mi Veterinaria" />
        <NavMain items={navGestion} groupLabel="General" />

        {/* Demo mode group */}
        <SidebarGroup>
          <SidebarGroupLabel>Modo demo</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <div onClick={toggleDemoMode} className="cursor-pointer">
                    <FlaskConical />
                    <span>Datos de prueba</span>
                    <Switch
                      checked={isDemoMode}
                      className="ml-auto pointer-events-none"
                      aria-label="Activar datos de prueba"
                    />
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <NavSecondary items={navSecondary} className="mt-auto" />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}
