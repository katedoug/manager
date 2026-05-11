import * as React from "react"
import {
  LayoutDashboard,
  Calendar,
  MessageCircle,
  ClipboardList,
  Building2,
  Settings,
  Star,
  Users,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { SidebarNotification } from "@/components/sidebar-notification"
import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const navGroups = [
  {
    label: "Principal",
    items: [
      { title: "Resumen",    url: "/dashboard",  icon: LayoutDashboard },
      { title: "Calendario", url: "/calendario", icon: Calendar },
      { title: "Chat",       url: "/chat",        icon: MessageCircle },
    ],
  },
  {
    label: "Clínica",
    items: [
      { title: "Pacientes",        url: "/pacientes", icon: Users },
      { title: "Historial clínico", url: "/historial", icon: ClipboardList },
      { title: "Clínicas aliadas",  url: "/clinicas",  icon: Building2 },
    ],
  },
  {
    label: "Cuenta",
    items: [
      { title: "Métricas CSAT", url: "/metricas", icon: Star },
      { title: "Ajustes",       url: "/ajustes",  icon: Settings },
    ],
  },
]

interface User {
  name: string
  email: string
  avatar: string
}

export function AppSidebar({
  user,
  ...props
}: React.ComponentProps<typeof Sidebar> & { user: User }) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard">
                <Image
                  src="/logo.svg"
                  alt="Kate & Doug"
                  width={120}
                  height={21}
                  priority
                />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {navGroups.map((group) => (
          <NavMain key={group.label} label={group.label} items={group.items} />
        ))}
      </SidebarContent>
      <SidebarFooter>
        <SidebarNotification />
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}
