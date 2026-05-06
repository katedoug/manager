"use client"

import { useState } from "react"
import { BellIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

interface Notification {
  id: number
  title: string
  desc: string
  time: string
  read: boolean
}

const INITIAL: Notification[] = [
  {
    id: 1,
    title: "Nueva cita programada",
    desc: "Dr. García agendó una consulta para las 3:00 PM",
    time: "Hace 5 min",
    read: false,
  },
  {
    id: 2,
    title: "Recordatorio de vacuna",
    desc: "Vacuna antirrábica pendiente para Firulais",
    time: "Hace 1 hora",
    read: false,
  },
  {
    id: 3,
    title: "Historial actualizado",
    desc: "Se actualizó el expediente clínico de Mimi",
    time: "Hace 2 horas",
    read: true,
  },
]

export function NotificationBell() {
  const [items, setItems] = useState<Notification[]>(INITIAL)

  const unread = items.filter((n) => !n.read).length

  function markRead(id: number) {
    setItems((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }

  function markAllRead() {
    setItems((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative size-8">
          <BellIcon className="size-4" />
          {unread > 0 && (
            <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-primary ring-2 ring-background" />
          )}
          <span className="sr-only">Notificaciones</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-80 p-0">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-3 py-2.5">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold">Notificaciones</span>
            {unread > 0 && (
              <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-medium text-primary-foreground">
                {unread}
              </span>
            )}
          </div>
          {unread > 0 && (
            <button
              onClick={markAllRead}
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              Marcar todo leído
            </button>
          )}
        </div>

        {/* List */}
        <div className="max-h-72 overflow-y-auto">
          {items.length === 0 ? (
            <Empty className="border-none py-8">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <BellIcon />
                </EmptyMedia>
                <EmptyTitle>Sin notificaciones</EmptyTitle>
                <EmptyDescription>
                  Estás al día, no tienes notificaciones pendientes.
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          ) : (
            items.map((n) => (
              <button
                key={n.id}
                onClick={() => markRead(n.id)}
                className={cn(
                  "flex w-full gap-3 px-3 py-3 text-left transition-colors hover:bg-muted",
                  !n.read && "bg-primary/5 hover:bg-primary/10"
                )}
              >
                <div className="mt-1.5 shrink-0">
                  {n.read ? (
                    <div className="size-2" />
                  ) : (
                    <div className="size-2 rounded-full bg-primary" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className={cn("text-sm leading-tight", !n.read && "font-medium")}>
                    {n.title}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground line-clamp-2">
                    {n.desc}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground/70">{n.time}</p>
                </div>
              </button>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="border-t px-3 py-2">
          <button className="w-full text-center text-xs text-muted-foreground transition-colors hover:text-foreground">
            Ver todas las notificaciones
          </button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
