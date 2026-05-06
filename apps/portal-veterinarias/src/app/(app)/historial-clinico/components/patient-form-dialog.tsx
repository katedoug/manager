"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import {
  Dialog, DialogContent, DialogDescription,
  DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"

const schema = z.object({
  name:       z.string().min(2, "Mínimo 2 caracteres"),
  species:    z.string().min(1, "Selecciona una especie"),
  breed:      z.string().min(1, "Ingresa la raza"),
  owner:      z.string().min(2, "Mínimo 2 caracteres"),
  ownerEmail: z.string().email("Email inválido"),
  status:     z.string().min(1, "Selecciona un estado"),
})

export type PatientFormValues = z.infer<typeof schema>

interface PatientFormDialogProps {
  onAddPatient: (data: PatientFormValues) => void
}

export function PatientFormDialog({ onAddPatient }: PatientFormDialogProps) {
  const [open, setOpen] = useState(false)

  const form = useForm<PatientFormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", species: "", breed: "", owner: "", ownerEmail: "", status: "" },
  })

  function onSubmit(data: PatientFormValues) {
    onAddPatient(data)
    form.reset()
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer">
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Paciente
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Nuevo Paciente</DialogTitle>
          <DialogDescription>Registra un nuevo paciente en el historial clínico.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField control={form.control} name="name" render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre del Paciente</FormLabel>
                  <FormControl><Input placeholder="Ej. Toby" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="breed" render={({ field }) => (
                <FormItem>
                  <FormLabel>Raza</FormLabel>
                  <FormControl><Input placeholder="Ej. Labrador" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField control={form.control} name="species" render={({ field }) => (
                <FormItem>
                  <FormLabel>Especie</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger className="w-full cursor-pointer"><SelectValue placeholder="Seleccionar" /></SelectTrigger></FormControl>
                    <SelectContent>
                      <SelectItem value="Canino">Canino</SelectItem>
                      <SelectItem value="Felino">Felino</SelectItem>
                      <SelectItem value="Ave">Ave</SelectItem>
                      <SelectItem value="Exótico">Exótico</SelectItem>
                      <SelectItem value="Otro">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="status" render={({ field }) => (
                <FormItem>
                  <FormLabel>Estado</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger className="w-full cursor-pointer"><SelectValue placeholder="Seleccionar" /></SelectTrigger></FormControl>
                    <SelectContent>
                      <SelectItem value="Activo">Activo</SelectItem>
                      <SelectItem value="Inactivo">Inactivo</SelectItem>
                      <SelectItem value="Pendiente">Pendiente</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
            </div>
            <FormField control={form.control} name="owner" render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre del Tutor</FormLabel>
                <FormControl><Input placeholder="Ej. Luis García" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="ownerEmail" render={({ field }) => (
              <FormItem>
                <FormLabel>Email del Tutor</FormLabel>
                <FormControl><Input placeholder="tutor@ejemplo.com" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <DialogFooter>
              <Button type="submit" className="cursor-pointer">Guardar Paciente</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
