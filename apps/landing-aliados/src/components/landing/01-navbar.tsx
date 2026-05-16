"use client"

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Menu, X, ChevronDown } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import React from "react"

const NAV_LINKS = [
  { label: "Beneficios",    href: "/beneficios" },
  { label: "Cómo funciona", href: "/como-funciona" },
  { label: "Pagos",         href: "/pagos" },
  // { label: "Recursos",   href: "/recursos" },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = React.useState(false)

  // Prevent body scroll when menu is open
  React.useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [mobileOpen])

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

          {/* Logo */}
          <Link href="/" className="shrink-0 flex items-center transition-opacity duration-200 hover:opacity-75">
            <Image
              src="/partners-logo.svg"
              alt="Kate & Doug Partners"
              width={110}
              height={27}
              priority
            />
          </Link>

          {/* Desktop nav */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              {NAV_LINKS.map((link) => (
                <NavigationMenuItem key={link.label}>
                  <NavigationMenuLink
                    href={link.href}
                    className="group/link px-3 py-2 text-sm font-bold text-gray-600 uppercase tracking-wide transition-colors duration-200 hover:text-[#1434CB] hover:bg-transparent focus:bg-transparent"
                  >
                    <span className="relative">
                      {link.label}
                      <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-[#1434CB] origin-left scale-x-0 transition-transform duration-200 group-hover/link:scale-x-100" />
                    </span>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-3">
            <Button>Únete gratis</Button>
          </div>

          {/* Mobile: get started + hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <Button size="sm" className="px-3">Únete</Button>
            <button
              className="p-2 text-gray-700 rounded-full border border-gray-200 bg-white transition-colors duration-200 hover:bg-gray-50"
              onClick={() => setMobileOpen(true)}
              aria-label="Abrir menú"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>

        </div>
      </header>

      {/* Mobile fullscreen overlay — slides in from left, DoorDash-style */}
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[100] bg-black/20 md:hidden transition-opacity duration-500 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Menu panel — translateX(-100%) closed → translateX(0) open */}
      <nav
        className="fixed top-0 left-0 z-[105] h-screen w-full bg-white md:hidden"
        style={{
          transform: mobileOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.5s ease-in-out",
        }}
      >
        {/* Top bar inside overlay — same height as navbar */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-gray-100">
          <Link href="/" onClick={() => setMobileOpen(false)} className="flex items-center">
            <Image
              src="/partners-logo.svg"
              alt="Kate & Doug Partners"
              width={110}
              height={27}
              priority
            />
          </Link>
          <div className="flex items-center gap-2">
            <Button size="sm" className="px-3">Únete</Button>
            <button
              className="p-2 text-gray-700 rounded-full border border-gray-200 bg-white transition-colors duration-200 hover:bg-gray-50"
              onClick={() => setMobileOpen(false)}
              aria-label="Cerrar menú"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Nav links — large bold uppercase like DoorDash */}
        <div className="px-6 py-6 flex flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-between py-4 text-2xl font-bold uppercase tracking-wide text-gray-900 border-b border-gray-100 last:border-0 transition-colors duration-200 hover:text-gray-500"
            >
              {link.label}
              <ChevronDown className="h-5 w-5 text-gray-400 -rotate-90" />
            </a>
          ))}
        </div>
      </nav>
    </>
  )
}
