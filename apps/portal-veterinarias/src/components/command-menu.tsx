"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
  BarChart2,
  CalendarDays,
  CreditCard,
  FileText,
  Home,
  SearchIcon,
  Settings,
  Star,
  Target,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"

const NAV_VETERINARIA = [
  { title: "Inicio",            url: "/",         icon: Home         },
  { title: "Citas",             url: "/citas",             icon: CalendarDays  },
  { title: "Historial Clínico", url: "/historial-clinico", icon: FileText     },
  { title: "Desempeño",         url: "/desempeno",         icon: BarChart2    },
  { title: "Evaluaciones",      url: "/evaluaciones",      icon: Star         },
]

const NAV_GENERAL = [
  { title: "Metas",   url: "/metas",   icon: Target   },
  { title: "Pagos",   url: "/pagos",   icon: CreditCard },
  { title: "Ajustes", url: "/ajustes", icon: Settings  },
]

export function CommandMenu() {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((v) => !v)
      }
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [])

  function navigate(url: string) {
    setOpen(false)
    router.push(url)
  }

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setOpen(true)}
        className="h-8 w-40 justify-between gap-2 pr-1.5 text-sm font-normal text-muted-foreground"
      >
        <span className="flex items-center gap-1.5">
          <SearchIcon className="size-3.5 shrink-0" />
          Buscar…
        </span>
        <kbd className="flex h-5 items-center gap-0.5 rounded border bg-muted px-1.5 text-[10px] font-medium">
          <span className="text-xs leading-none">⌘</span>K
        </kbd>
      </Button>

      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title="Buscar"
        description="Navega entre páginas y acciones"
      >
        <Command>
          <CommandInput placeholder="Buscar páginas, acciones…" />
          <CommandList>
            <CommandEmpty>Sin resultados.</CommandEmpty>

            <CommandGroup heading="Mi Veterinaria">
              {NAV_VETERINARIA.map((item) => (
                <CommandItem key={item.url} onSelect={() => navigate(item.url)}>
                  <item.icon />
                  {item.title}
                </CommandItem>
              ))}
            </CommandGroup>

            <CommandSeparator />

            <CommandGroup heading="General">
              {NAV_GENERAL.map((item) => (
                <CommandItem key={item.url} onSelect={() => navigate(item.url)}>
                  <item.icon />
                  {item.title}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  )
}
