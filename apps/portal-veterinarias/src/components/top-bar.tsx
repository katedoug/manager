"use client"

import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { CommandMenu } from "@/components/command-menu"
import { NotificationBell } from "@/components/notification-bell"

interface TopBarProps {
  title: string
}

export function TopBar({ title }: TopBarProps) {
  return (
    <header className="flex h-12 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator
        orientation="vertical"
        className="mr-1 data-vertical:h-4 data-vertical:self-auto"
      />
      <span className="truncate text-sm font-medium text-muted-foreground">
        {title}
      </span>
      <div className="ml-auto flex items-center gap-1">
        <CommandMenu />
        <NotificationBell />
      </div>
    </header>
  )
}
