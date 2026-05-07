"use client"

import Image from "next/image"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  User, Lock, Bell, CreditCard,
  Upload,
  Mail, MessageSquare,
  MapPin, Plus, Pencil, ExternalLink, ShieldCheck,
} from "lucide-react"

import { HideLoader } from "@/components/hide-loader"
import { TopBar } from "@/components/top-bar"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"
import { useRef } from "react"
import { useDemoMode } from "@/context/demo-mode"
import { useActionState, useTransition } from "react"
import { setCitasAccess, type CitasAccessState } from "@/app/actions/citas-access"

// ── Schemas ──────────────────────────────────────────────────────────────────

const accountSchema = z.object({
  firstName: z.string().min(1, "Requerido"),
  lastName: z.string().min(1, "Requerido"),
  email: z.string().email("Email inválido"),
  username: z.string().min(3, "Mínimo 3 caracteres"),
  currentPassword: z.string().optional(),
  newPassword: z.string().optional(),
  confirmPassword: z.string().optional(),
})

const profileSchema = z.object({
  firstName: z.string().min(1, "Requerido"),
  lastName: z.string().min(1, "Requerido"),
  email: z.string().email("Email inválido"),
  phone: z.string().optional(),
  website: z.string().optional(),
  location: z.string().optional(),
  role: z.string().optional(),
  bio: z.string().optional(),
  company: z.string().optional(),
  timezone: z.string().optional(),
  language: z.string().optional(),
})

const appearanceSchema = z.object({
  theme: z.enum(["light", "dark"]),
  fontSize: z.string().optional(),
})

const notificationsSchema = z.object({
  emailSecurity: z.boolean(),
  emailUpdates: z.boolean(),
  emailMarketing: z.boolean(),
  pushMessages: z.boolean(),
  pushMentions: z.boolean(),
  pushTasks: z.boolean(),
  emailFrequency: z.string(),
  channelEmail: z.boolean(),
  channelPush: z.boolean(),
  channelSms: z.boolean(),
})

// ── Nav items ─────────────────────────────────────────────────────────────────

const NAV = [
  { id: "cuenta",         label: "Perfil",          icon: Lock },
  { id: "perfil",         label: "Mi clínica",      icon: User },
  { id: "apariencia",     label: "Pagos",            icon: CreditCard },
  { id: "notificaciones", label: "Notificaciones",  icon: Bell },
]

// ── Tab: Cuenta ───────────────────────────────────────────────────────────────

function TabCuenta({ userEmail }: { userEmail: string }) {
  const form = useForm<z.infer<typeof accountSchema>>({
    resolver: zodResolver(accountSchema),
    defaultValues: { firstName: "", lastName: "", email: userEmail, username: "", currentPassword: "", newPassword: "", confirmPassword: "" },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(() => {})} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Información Personal</CardTitle>
            <CardDescription>Actualiza tu información personal que se mostrará en tu perfil.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField control={form.control} name="firstName" render={({ field }) => (
                <FormItem><FormLabel>Nombre</FormLabel><FormControl><Input disabled {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="lastName" render={({ field }) => (
                <FormItem><FormLabel>Apellido</FormLabel><FormControl><Input disabled {...field} /></FormControl><FormMessage /></FormItem>
              )} />
            </div>
            <FormField control={form.control} name="email" render={({ field }) => (
              <FormItem><FormLabel>Correo Electrónico</FormLabel><FormControl><Input type="email" disabled {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="username" render={({ field }) => (
              <FormItem><FormLabel>ID Único</FormLabel><FormControl><Input disabled {...field} /></FormControl><FormMessage /></FormItem>
            )} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cambiar Contraseña</CardTitle>
            <CardDescription>Actualiza tu contraseña para mantener tu cuenta segura.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField control={form.control} name="currentPassword" render={({ field }) => (
              <FormItem><FormLabel>Contraseña Actual</FormLabel><FormControl><Input type="password" placeholder="Contraseña actual" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="newPassword" render={({ field }) => (
              <FormItem><FormLabel>Nueva Contraseña</FormLabel><FormControl><Input type="password" placeholder="Nueva contraseña" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="confirmPassword" render={({ field }) => (
              <FormItem><FormLabel>Confirmar Nueva Contraseña</FormLabel><FormControl><Input type="password" placeholder="Confirmar contraseña" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Zona de Peligro</CardTitle>
            <CardDescription>Acciones irreversibles y destructivas.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Separator />
            <div className="flex flex-wrap gap-2 items-center justify-between">
              <div>
                <h4 className="font-semibold">Eliminar Cuenta</h4>
                <p className="text-sm text-muted-foreground">Elimina permanentemente tu cuenta y todos los datos asociados.</p>
              </div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" type="button">Eliminar Cuenta</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>¿Estás seguro de que deseas eliminar tu cuenta?</AlertDialogTitle>
                    <AlertDialogDescription className="space-y-2">
                      <span className="block">Esta acción no se puede deshacer. Perderás todos tus beneficios, historial de pagos y acceso a la plataforma.</span>
                      <span className="block">Tu cuenta pasará al equipo de partners de Kate&Doug para su revisión antes de ser eliminada definitivamente.</span>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                      Eliminar cuenta
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-2">
          <Button type="submit">Guardar Cambios</Button>
          <Button variant="outline" type="reset">Cancelar</Button>
        </div>
      </form>
    </Form>
  )
}

// ── Tab: Perfil ───────────────────────────────────────────────────────────────

interface TabPerfilProps {
  clinicName: string
  clinicAddress: string
  clinicEmail: string
  clinicSlug: string
}

function TabPerfil({ clinicName, clinicAddress, clinicEmail, clinicSlug }: TabPerfilProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const accordionRefs = useRef<Record<string, HTMLDivElement | null>>({})

  function handleAccordionChange(value: string) {
    if (!value) return
    const el = accordionRefs.current[value]
    if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 120)
  }

  const [servicios, setServicios] = useState([
    { id: "desparasitacion", label: "Desparasitación",  duration: 90,  enabled: true },
    { id: "examen-fecal",    label: "Examen fecal",      duration: 60,  enabled: true },
    { id: "limpieza-dental", label: "Limpieza dental",   duration: 60,  enabled: true },
    { id: "examen-orina",    label: "Examen de orina",   duration: 15,  enabled: true },
    { id: "examen-sangre",   label: "Examen de sangre",  duration: 15,  enabled: true },
    { id: "vacunacion",      label: "Vacunación",         duration: 20,  enabled: true },
    { id: "consulta-general",label: "Consulta general",  duration: 30,  enabled: true },
  ])

  const [editingServicio, setEditingServicio] = useState<{ id: string; label: string; duration: number } | null>(null)
  const [sliderValue, setSliderValue] = useState(30)

  function toggleServicio(id: string) {
    setServicios(prev => prev.map(s => s.id === id ? { ...s, enabled: !s.enabled } : s))
  }

  const [nuevaSucursalOpen, setNuevaSucursalOpen] = useState(false)
  const [creandoSucursal, setCreandoSucursal] = useState(false)

  function handleCrearSucursal() {
    setCreandoSucursal(true)
    setTimeout(() => {
      setCreandoSucursal(false)
      setNuevaSucursalOpen(false)
    }, 4500)
  }

  function openEdit(s: typeof servicios[0]) {
    setEditingServicio(s)
    setSliderValue(s.duration)
  }

  function saveEdit() {
    if (!editingServicio) return
    setServicios(prev => prev.map(s => s.id === editingServicio.id ? { ...s, duration: sliderValue } : s))
    setEditingServicio(null)
  }

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: { firstName: "", lastName: "", email: clinicEmail, phone: "", website: "", location: clinicAddress, role: "", bio: "", company: clinicSlug, timezone: "", language: "" },
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (ev) => setProfileImage(ev.target?.result as string)
      reader.readAsDataURL(file)
    }
  }

  const [citasState, citasAction] = useActionState<CitasAccessState, FormData>(setCitasAccess, null)
  const [isPending, startTransition] = useTransition()

  function handleCitasSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    startTransition(() => citasAction(fd))
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(() => {})} className="space-y-6">

        {/* Acceso al portal de citas */}
        <Card>
          <CardHeader>
            <CardTitle>Acceso al portal de citas</CardTitle>
            <CardDescription>
              Credenciales con las que se accede a <strong>vet.katedoug.com</strong>
            </CardDescription>
          </CardHeader>
          <CardContent>
            {"success" in (citasState ?? {}) ? (
              <div className="rounded-lg bg-emerald-50 border border-emerald-200 px-4 py-3 text-sm text-emerald-800 dark:bg-emerald-950/30 dark:border-emerald-800/40 dark:text-emerald-300">
                Acceso configurado correctamente para <strong>{(citasState as { success: true; email: string }).email}</strong>
              </div>
            ) : (
              <form onSubmit={handleCitasSubmit} className="space-y-4">
                {"error" in (citasState ?? {}) && (
                  <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-800 dark:bg-red-950/30 dark:border-red-800/40 dark:text-red-300">
                    {(citasState as { error: string }).error}
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium">Correo electrónico</label>
                    <Input
                      name="citasEmail"
                      type="email"
                      placeholder="citas@tuclinica.com"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium">Contraseña</label>
                    <Input
                      name="citasPassword"
                      type="password"
                      placeholder="Mínimo 6 caracteres"
                      required
                      minLength={6}
                    />
                  </div>
                </div>
                <Button type="submit" disabled={isPending}>
                  {isPending ? "Configurando…" : "Configurar acceso"}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>

        {/* Sucursales con configuración expandible */}
        <Card>
          <CardHeader>
            <CardTitle>Sucursales</CardTitle>
            <CardDescription>Selecciona una sucursal para editar su configuración</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 pb-4">
            <Accordion type="single" collapsible className="space-y-2" onValueChange={handleAccordionChange}>
              <AccordionItem value="clinica-principal" ref={(el) => { accordionRefs.current["clinica-principal"] = el }} className="rounded-lg border px-4 data-[state=open]:border-primary/40">
                <AccordionTrigger className="hover:no-underline py-4 cursor-pointer">
                  <div className="flex items-center gap-3 text-left">
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-primary/10">
                      <MapPin className="size-3.5 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold">{clinicName}</span>
                        <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700 text-xs">Activa</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{clinicAddress || "Sin dirección configurada"}</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-2 pb-4">
                  <Separator className="mb-6" />
                  <div className="space-y-6">
                    {/* Foto de sucursal */}
                    <div className="flex items-center gap-6">
                      <Avatar className="h-20 w-20 rounded-lg">
                        <AvatarImage src={profileImage ?? undefined} />
                        <AvatarFallback className="rounded-lg text-lg font-semibold">CP</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col gap-2">
                        <div className="flex gap-2">
                          <Button variant="default" size="sm" type="button" onClick={() => fileInputRef.current?.click()}>
                            <Upload className="mr-2 h-4 w-4" />
                            Subir foto
                          </Button>
                          <Button variant="outline" size="sm" type="button" onClick={() => setProfileImage(null)}>
                            Restablecer
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground">JPG, GIF o PNG. Máx 800K</p>
                      </div>
                      <input ref={fileInputRef} type="file" accept="image/jpeg,image/gif,image/png" onChange={handleFileChange} className="hidden" />
                    </div>

                    <Separator />

                    {/* Responsable de Sucursal */}
                    <div className="space-y-4">
                      <p className="text-sm font-semibold">Responsable de Sucursal</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField control={form.control} name="firstName" render={({ field }) => (
                          <FormItem><FormLabel>Nombre</FormLabel><FormControl><Input placeholder="Tu nombre" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="lastName" render={({ field }) => (
                          <FormItem><FormLabel>Apellido</FormLabel><FormControl><Input placeholder="Tu apellido" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="company" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Identificador de Sucursal</FormLabel>
                            <FormControl><Input placeholder="Ej. Sucursal Norte" {...field} /></FormControl>
                            <p className="text-xs text-muted-foreground">Así es como los clientes reconocerán esta sucursal en su app</p>
                            <FormMessage />
                          </FormItem>
                        )} />
                        <FormField control={form.control} name="phone" render={({ field }) => (
                          <FormItem><FormLabel>Teléfono</FormLabel><FormControl><Input type="tel" placeholder="+52 (55) 1234-5678" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="location" render={({ field }) => (
                          <FormItem><FormLabel>Dirección</FormLabel><FormControl><Input placeholder="Av. Principal 123, Col. Centro" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                      </div>
                    </div>

                    <FormField control={form.control} name="bio" render={({ field }) => (
                      <FormItem><FormLabel>Biografía</FormLabel><FormControl><Textarea placeholder="Cuéntanos un poco sobre tu clínica…" className="min-h-[100px]" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />

                    <Separator />

                    {/* Servicios */}
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-semibold">Servicios</p>
                        <p className="text-xs text-muted-foreground">Activa o desactiva los servicios disponibles para esta sucursal</p>
                      </div>
                      <div className="divide-y rounded-lg border">
                        {servicios.map((s) => (
                          <div key={s.id} className="flex items-center gap-4 px-4 py-3">
                            <Switch
                              checked={s.enabled}
                              onCheckedChange={() => toggleServicio(s.id)}
                              className="cursor-pointer shrink-0"
                            />
                            <span className={cn("text-sm flex-1", !s.enabled && "text-muted-foreground line-through")}>
                              {s.label}
                            </span>
                            <span className="w-14 text-xs text-muted-foreground text-right shrink-0">{s.duration} min</span>
                            <Button variant="outline" size="sm" type="button" className="cursor-pointer shrink-0 text-xs" onClick={() => openEdit(s)}>
                              Editar duración
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button type="submit">Guardar Cambios</Button>
                      <Button variant="outline" type="button">Cancelar</Button>
                    </div>
                  </div>

                  {/* Dialog editar duración */}
                  <Dialog open={!!editingServicio} onOpenChange={(open) => !open && setEditingServicio(null)}>
                    <DialogContent className="sm:max-w-sm">
                      <DialogHeader>
                        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Editar duración</p>
                        <DialogTitle className="text-xl">{editingServicio?.label}</DialogTitle>
                      </DialogHeader>

                      <div className="flex flex-col items-center gap-1 py-4">
                        <span className="text-6xl font-bold tabular-nums">{sliderValue}</span>
                        <span className="text-sm text-muted-foreground">minutos</span>
                      </div>

                      <div className="space-y-2 px-1">
                        <Slider
                          min={5}
                          max={120}
                          step={5}
                          value={[sliderValue]}
                          onValueChange={([v]) => setSliderValue(v)}
                          className="cursor-pointer"
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>5 min</span>
                          <span>120 min</span>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 pt-2">
                        <Button type="button" onClick={saveEdit} className="w-full">Guardar</Button>
                        <Button type="button" variant="outline" className="w-full cursor-pointer" onClick={() => setEditingServicio(null)}>Cancelar</Button>
                      </div>
                    </DialogContent>
                  </Dialog>

                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Crear nueva */}
            <button
              type="button"
              onClick={() => setNuevaSucursalOpen(true)}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed px-4 py-3 text-sm text-muted-foreground transition-colors hover:border-primary/50 hover:bg-muted/40 hover:text-foreground cursor-pointer"
            >
              <Plus className="size-4" />
              Crear nueva sucursal
            </button>
          </CardContent>
        </Card>

        {/* Dialog nueva sucursal */}
        <Dialog open={nuevaSucursalOpen} onOpenChange={setNuevaSucursalOpen}>
          <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
            {/* Loader */}
            {creandoSucursal ? (
              <div className="flex flex-col items-center justify-center gap-4 py-20">
                <div className="size-10 rounded-full border-4 border-muted border-t-primary animate-spin" />
                <p className="text-base font-semibold">Preparando todo</p>
                <p className="text-sm text-muted-foreground">Estamos configurando tu nueva sucursal…</p>
              </div>
            ) : (<>

            <DialogHeader>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Mi clínica</p>
              <DialogTitle>Nueva sucursal</DialogTitle>
            </DialogHeader>

            <div className="space-y-6 pt-2">
              {/* Foto */}
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16 rounded-lg">
                  <AvatarFallback className="rounded-lg font-semibold">NS</AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-1.5">
                  <Button variant="outline" size="sm" type="button" className="cursor-pointer w-fit">
                    <Upload className="mr-2 h-4 w-4" />
                    Subir foto
                  </Button>
                  <p className="text-xs text-muted-foreground">JPG, GIF o PNG. Máx 800K</p>
                </div>
              </div>

              <Separator />

              {/* Responsable */}
              <div className="space-y-4">
                <p className="text-sm font-semibold">Responsable de Sucursal</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium">Nombre</label>
                    <Input placeholder="Nombre" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium">Apellido</label>
                    <Input placeholder="Apellido" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium">Correo Electrónico</label>
                    <Input type="email" placeholder="tu@email.com" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium">Identificador de Sucursal</label>
                    <Input placeholder="Ej. Sucursal Norte" />
                    <p className="text-xs text-muted-foreground">Así es como los clientes reconocerán esta sucursal en su app</p>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium">Teléfono</label>
                    <Input type="tel" placeholder="+52 (55) 1234-5678" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium">Dirección</label>
                    <Input placeholder="Av. Principal 123, Col. Centro" />
                  </div>
                </div>
              </div>

              {/* Biografía */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Biografía</label>
                <Textarea placeholder="Cuéntanos un poco sobre esta sucursal…" className="min-h-[80px]" />
              </div>

              <Separator />

              {/* Servicios */}
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-semibold">Servicios</p>
                  <p className="text-xs text-muted-foreground">Activa los servicios disponibles para esta sucursal</p>
                </div>
                <div className="divide-y rounded-lg border">
                  {servicios.map((s) => (
                    <div key={s.id} className="flex items-center gap-4 px-4 py-3">
                      <Switch className="cursor-pointer shrink-0" defaultChecked={s.enabled} />
                      <span className="text-sm flex-1">{s.label}</span>
                      <span className="w-14 text-xs text-muted-foreground text-right shrink-0">{s.duration} min</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Acciones */}
              <div className="flex gap-2 pt-2">
                <Button type="button" className="flex-1" onClick={handleCrearSucursal} disabled={creandoSucursal}>
                  Crear sucursal
                </Button>
                <Button type="button" variant="outline" className="flex-1 cursor-pointer" onClick={() => setNuevaSucursalOpen(false)}>
                  Cancelar
                </Button>
              </div>
            </div>
            </>)}
          </DialogContent>
        </Dialog>

      </form>
    </Form>
  )
}

// ── Tab: Pagos ────────────────────────────────────────────────────────────────

function TabApariencia() {
  const { isDemoMode } = useDemoMode()

  return (
    <div className="space-y-6">

      {/* Stripe Connect — connected */}
      {isDemoMode ? (
        <Card className="border-[#635BFF]/20 bg-gradient-to-br from-[#635BFF]/5 to-card">
          <CardContent className="pt-1 space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 mb-2">
                  <Image src="/stripe-blurple.svg" alt="Stripe" width={52} height={22} />
                  <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700 text-xs">Conectado</Badge>
                </div>
                <p className="text-sm font-semibold">Stripe Connect</p>
                <p className="text-sm text-muted-foreground">
                  Gestiona tu cuenta de pagos, información bancaria y documentos fiscales directamente en Stripe.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 pt-1">
              <Button className="gap-2 cursor-pointer bg-[#635BFF] hover:bg-[#5851e0] text-white">
                <ExternalLink className="size-3.5" />
                Abrir Stripe Dashboard
              </Button>
              <Button variant="outline" className="gap-2 cursor-pointer">
                <ShieldCheck className="size-3.5" />
                Verificar identidad
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Las transferencias se procesan a través de Stripe. Kate&amp;Doug nunca almacena tus datos bancarios.
            </p>
          </CardContent>
        </Card>
      ) : (
        /* Stripe Connect — not configured */
        <Card className="border-amber-200/60 bg-gradient-to-br from-amber-50/60 to-card dark:from-amber-950/20 dark:border-amber-800/30">
          <CardContent className="pt-1 space-y-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 mb-2">
                <Image src="/stripe-blurple.svg" alt="Stripe" width={52} height={22} className="opacity-60" />
                <Badge variant="outline" className="border-amber-200 bg-amber-50 text-amber-700 text-xs dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-400">
                  Por configurar
                </Badge>
              </div>
              <p className="text-sm font-semibold">Stripe Connect</p>
              <p className="text-sm text-muted-foreground">
                Conecta tu cuenta bancaria para empezar a recibir pagos por tus servicios. El proceso toma menos de 5 minutos.
              </p>
            </div>
            <div className="rounded-lg border border-amber-200/80 bg-amber-50/80 px-4 py-3 text-sm text-amber-800 dark:border-amber-800/40 dark:bg-amber-950/30 dark:text-amber-300">
              Necesitas conectar Stripe antes de poder recibir transferencias a tu cuenta.
            </div>
            <div className="flex flex-wrap gap-3 pt-1">
              <Button className="gap-2 cursor-pointer bg-[#635BFF] hover:bg-[#5851e0] text-white">
                <ExternalLink className="size-3.5" />
                Conectar con Stripe
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Kate&amp;Doug nunca almacena tus datos bancarios. Todo se gestiona de forma segura a través de Stripe.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Configuración de payout */}
      <Card>
        <CardHeader>
          <CardTitle>Configuración de pago</CardTitle>
          <CardDescription>Define cómo y cuándo recibirás tus transferencias</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-sm font-medium">CLABE interbancaria</label>
              <Input placeholder="000000000000000000" maxLength={18} />
              <p className="text-xs text-muted-foreground">18 dígitos · se valida con Stripe</p>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Banco</label>
              <Input placeholder="BBVA, Banamex, Banorte…" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Frecuencia de transferencia</label>
              <Select defaultValue="semanal">
                <SelectTrigger className="w-full cursor-pointer">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="semanal">Semanal</SelectItem>
                  <SelectItem value="quincenal">Quincenal</SelectItem>
                  <SelectItem value="mensual">Mensual</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Mínimo de transferencia</label>
              <Input placeholder="$500.00 MXN" />
              <p className="text-xs text-muted-foreground">No se transfiere si el saldo es menor a este monto</p>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">RFC</label>
              <Input placeholder="XAXX010101000" />
              <p className="text-xs text-muted-foreground">Para emisión automática de CFDI</p>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Régimen fiscal</label>
              <Select>
                <SelectTrigger className="w-full cursor-pointer">
                  <SelectValue placeholder="Seleccionar régimen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="601">601 – General de Ley Personas Morales</SelectItem>
                  <SelectItem value="612">612 – Personas Físicas con Actividades Empresariales</SelectItem>
                  <SelectItem value="626">626 – Régimen Simplificado de Confianza</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <Button type="button">Guardar cambios</Button>
            <Button type="button" variant="outline" className="cursor-pointer">Cancelar</Button>
          </div>
        </CardContent>
      </Card>

    </div>
  )
}

// ── Tab: Notificaciones ───────────────────────────────────────────────────────

function TabNotificaciones() {
  const form = useForm<z.infer<typeof notificationsSchema>>({
    resolver: zodResolver(notificationsSchema),
    defaultValues: {
      emailSecurity: false, emailUpdates: true, emailMarketing: false,
      pushMessages: true, pushMentions: true, pushTasks: false,
      emailFrequency: "instant",
      channelEmail: true, channelPush: true, channelSms: false,
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(() => {})} className="space-y-6">
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Notificaciones por Email</CardTitle>
              <CardDescription>Elige qué notificaciones quieres recibir por email.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: "emailSecurity" as const, label: "Alertas de seguridad", desc: "Aviso cuando haya eventos de seguridad en tu cuenta." },
                { name: "emailUpdates" as const, label: "Actualizaciones del producto", desc: "Recibe novedades sobre nuevas funciones y mejoras." },
                { name: "emailMarketing" as const, label: "Emails de marketing", desc: "Ofertas y promociones de la plataforma." },
              ].map(({ name, label, desc }) => (
                <FormField key={name} control={form.control} name={name} render={({ field }) => (
                  <FormItem className="flex items-start space-x-3">
                    <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                    <div className="space-y-1">
                      <FormLabel>{label}</FormLabel>
                      <p className="text-sm text-muted-foreground">{desc}</p>
                    </div>
                  </FormItem>
                )} />
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notificaciones Push</CardTitle>
              <CardDescription>Configura notificaciones push en navegador y móvil.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: "pushMessages" as const, label: "Nuevos mensajes", desc: "Aviso cuando recibas nuevos mensajes." },
                { name: "pushMentions" as const, label: "Menciones", desc: "Aviso cuando alguien te mencione." },
                { name: "pushTasks" as const, label: "Actualizaciones de tareas", desc: "Aviso sobre asignaciones y cambios de tareas." },
              ].map(({ name, label, desc }) => (
                <FormField key={name} control={form.control} name={name} render={({ field }) => (
                  <FormItem className="flex items-start space-x-3">
                    <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                    <div className="space-y-1">
                      <FormLabel>{label}</FormLabel>
                      <p className="text-sm text-muted-foreground">{desc}</p>
                    </div>
                  </FormItem>
                )} />
              ))}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Canales de Notificación</CardTitle>
            <CardDescription>Elige tus canales preferidos para recibir alertas.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { name: "channelEmail" as const, icon: Mail, label: "Email", desc: "Recibe notificaciones por correo electrónico" },
              { name: "channelPush" as const, icon: Bell, label: "Push", desc: "Recibe notificaciones push en el navegador" },
              { name: "channelSms" as const, icon: MessageSquare, label: "SMS", desc: "Recibe notificaciones por mensaje de texto" },
            ].map(({ name, icon: Icon, label, desc }, i) => (
              <div key={name}>
                {i > 0 && <Separator className="mb-4" />}
                <FormField control={form.control} name={name} render={({ field }) => (
                  <FormItem className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Icon className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <FormLabel className="font-medium">{label}</FormLabel>
                        <div className="text-sm text-muted-foreground">{desc}</div>
                      </div>
                    </div>
                    <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                  </FormItem>
                )} />
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="flex gap-2">
          <Button type="submit">Guardar Preferencias</Button>
          <Button variant="outline" type="reset">Cancelar</Button>
        </div>
      </form>
    </Form>
  )
}


// ── Page ──────────────────────────────────────────────────────────────────────

interface AjustesClientProps {
  clinicName: string
  clinicAddress: string
  clinicEmail: string
  clinicSlug: string
  userEmail: string
}

export function AjustesClient({ clinicName, clinicAddress, clinicEmail, clinicSlug, userEmail }: AjustesClientProps) {
  const [active, setActive] = useState("cuenta")

  return (
    <>
      <HideLoader />
      <TopBar title="Ajustes" />
      <div className="flex flex-1 flex-col gap-6 px-4 py-4 lg:px-6 lg:py-6">
        <div>
          <h1 className="text-3xl font-bold">Ajustes</h1>
          <p className="text-muted-foreground">Administra tu perfil y preferencias del sistema.</p>
        </div>

        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Sidebar nav */}
          <nav className="flex shrink-0 flex-row gap-1 overflow-x-auto lg:w-48 lg:flex-col">
            {NAV.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActive(id)}
                className={cn(
                  "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors text-left whitespace-nowrap",
                  active === id
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {label}
              </button>
            ))}
          </nav>

          {/* Content */}
          <div className="min-w-0 flex-1">
            {active === "cuenta"         && <TabCuenta userEmail={userEmail} />}
            {active === "perfil"         && <TabPerfil clinicName={clinicName} clinicAddress={clinicAddress} clinicEmail={clinicEmail} clinicSlug={clinicSlug} />}
            {active === "apariencia"     && <TabApariencia />}
            {active === "notificaciones" && <TabNotificaciones />}
          </div>
        </div>
      </div>
    </>
  )
}
