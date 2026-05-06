import type { Metadata } from "next"
import "./globals.css"

import { TooltipProvider } from "@/components/ui/tooltip"
import { LoaderProvider } from "@/components/loader-provider"

export const metadata: Metadata = {
  title: "Kate&Doug — Portal Veterinario",
  description: "Portal de gestión veterinaria",
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className="h-full antialiased">
      <body>
        <TooltipProvider>
          <LoaderProvider>
            {children}
          </LoaderProvider>
        </TooltipProvider>
      </body>
    </html>
  )
}
