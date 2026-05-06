"use client"

import { useDemoMode } from "@/context/demo-mode"

export function DemoLoader() {
  const { isLoading } = useDemoMode()

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-background/80 backdrop-blur-sm">
      <div className="size-10 rounded-full border-4 border-muted border-t-primary animate-spin" />
      <p className="text-sm font-semibold">Cargando</p>
    </div>
  )
}
