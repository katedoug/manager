"use client"

import { Settings, FileText, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function QuickActions() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="lg" variant="outline" className="w-full md:w-auto">
          <Settings className="h-4 w-4 mr-2" />
          Acciones
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-48 md:w-auto min-w-[var(--radix-dropdown-menu-trigger-width)]"
      >
        <DropdownMenuItem className="font-medium">
          <FileText className="h-4 w-4 mr-2" />
          Generar Reporte
        </DropdownMenuItem>
        <DropdownMenuItem className="font-medium">
          <Download className="h-4 w-4 mr-2" />
          Exportar Datos
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
