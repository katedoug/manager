import type { Metadata } from "next"
import Script from "next/script"
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
        <Script id="ze-snippet" src="https://static.zdassets.com/ekr/snippet.js?key=3f25e427-eacc-4e5c-a2a6-5090a6478dc4" strategy="afterInteractive" />
      </body>
    </html>
  )
}
