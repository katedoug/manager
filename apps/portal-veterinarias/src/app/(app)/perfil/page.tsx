import { HideLoader } from "@/components/hide-loader"
import { TopBar } from "@/components/top-bar"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import React from "react"
import { BadgeCheck, Clock } from "lucide-react"

const user = {
  name: "Veterinaria San Nicolás",
  email: "contacto@sannicolas.vet",
  phone: "+52 55 1234 5678",
  location: "Ciudad de México, CDMX",
  specialty: "Medicina General Veterinaria",
  license: "CDMX-VET-20481",
  joined: "Enero 2022",
  verified: true,
  rating: 4.8,
  reviews: 132,
  consultations: 1240,
}

export default function PerfilPage() {
  return (
    <>
      <HideLoader />
      <TopBar title="Mi Perfil" />
      <div className="flex flex-1 flex-col gap-6 p-4 lg:p-6">

        {/* Hero card */}
        <div
          className="relative overflow-hidden rounded-2xl p-6 sm:p-8"
          style={{
            background: "linear-gradient(135deg, #030027 0%, #0D0B3E 50%, #1A1650 100%)",
          }}
        >
          <div className="flex flex-col gap-5">
            {/* Label */}
            <p className="text-xs font-semibold uppercase tracking-widest text-[#8B9FE8]">
              Perfil de clínica · MVZ Rafael Martínez
            </p>

            {/* Title */}
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl">
                  {user.name}
                </h1>
                {user.verified ? (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <BadgeCheck className="size-7 cursor-default fill-blue-500 text-white" />
                    </TooltipTrigger>
                    <TooltipContent side="right">Clínica Verificada</TooltipContent>
                  </Tooltip>
                ) : (
                  <Clock className="size-5 text-amber-300" />
                )}
              </div>
              <p className="mt-2 text-base text-white/60">
                {user.specialty} · {user.location}
              </p>
            </div>


          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Card>
            <CardContent className="flex flex-col items-start justify-center gap-1.5 px-6 py-4">
              <span className="text-base text-muted-foreground">Consultas mes</span>
              <span className="text-5xl font-bold tabular-nums">{user.consultations.toLocaleString("es-MX")}</span>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col items-start justify-center gap-1.5 px-6 py-4">
              <span className="text-base text-muted-foreground">Calificación promedio</span>
              <span className="text-5xl font-bold tabular-nums">{user.rating}</span>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col items-start justify-center gap-1.5 px-6 py-4">
              <span className="text-base text-muted-foreground">Reseñas de clientes</span>
              <span className="text-5xl font-bold tabular-nums">{user.reviews}</span>
            </CardContent>
          </Card>
        </div>

        {/* Info detail */}
        <Card>
          <CardHeader>
            <CardTitle>Información del MVZ Responsable</CardTitle>
          </CardHeader>
          <Separator />
          <dl>
            <DescriptionRow label="Clínica" value={user.name} />
            <DescriptionRow label="Especialidad" value={user.specialty} />
            <DescriptionRow label="Cédula profesional" value={user.license} />
            <DescriptionRow label="Correo electrónico" value={user.email} />
            <DescriptionRow label="Teléfono" value={user.phone} />
            <DescriptionRow label="Ubicación" value={user.location} />
            <DescriptionRow label="Miembro desde" value={user.joined} last />
          </dl>
        </Card>

        {/* Disclaimer */}
        <p className="text-center text-xs text-muted-foreground pb-2">
          Si necesitas realizar algún cambio en la información de tu perfil, ponte en contacto con nuestro equipo de Partners en{" "}
          <a href="mailto:partners@katedoug.com" className="font-medium text-primary underline underline-offset-2 hover:opacity-80">
            partners@katedoug.com
          </a>
          .
        </p>

      </div>
    </>
  )
}

function DescriptionRow({
  label,
  value,
  last = false,
}: {
  label: string
  value: string
  last?: boolean
}) {
  return (
    <div className={`grid grid-cols-3 gap-4 px-6 py-3.5 ${!last ? "border-b" : ""}`}>
      <dt className="text-sm text-muted-foreground">{label}</dt>
      <dd className="col-span-2 text-sm font-medium">{value}</dd>
    </div>
  )
}
