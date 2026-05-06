"use client"

import { HideLoader } from "@/components/hide-loader"
import { TopBar } from "@/components/top-bar"
import { Calendar } from "./components/calendar"
import { events, eventDates } from "./data"
import { useDemoMode } from "@/context/demo-mode"

export default function CitasPage() {
  const { isDemoMode } = useDemoMode()

  return (
    <>
      <HideLoader />
      <TopBar title="Citas" />
      <div className="flex flex-1 flex-col gap-4 p-4 lg:p-6">
        <div>
          <h1 className="text-2xl font-semibold">Calendario de Citas</h1>
          <p className="text-sm text-muted-foreground">
            Gestiona y programa las citas de tu veterinaria
          </p>
        </div>
        <Calendar events={isDemoMode ? events : []} eventDates={isDemoMode ? eventDates : []} />
      </div>
    </>
  )
}
