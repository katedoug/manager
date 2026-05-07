import { HideLoader } from "@/components/hide-loader"
import { TopBar } from "@/components/top-bar"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { BadgeCheck } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { getSessionAndClinic } from "@/lib/supabase/queries"

export default async function PerfilPage() {
  const session = await getSessionAndClinic()
  const clinic  = session?.clinic
  const email   = session?.user?.email ?? "—"

  const joined = clinic?.created_at
    ? format(new Date(clinic.created_at), "MMMM yyyy", { locale: es })
    : "—"

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
            <p className="text-xs font-semibold uppercase tracking-widest text-[#8B9FE8]">
              Perfil de clínica · {email}
            </p>

            <div>
              <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl">
                {clinic?.name ?? "Mi Clínica"}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <BadgeCheck className="inline-block align-middle ml-2 size-7 cursor-default fill-blue-500 text-white shrink-0" />
                  </TooltipTrigger>
                  <TooltipContent side="right">Clínica Verificada</TooltipContent>
                </Tooltip>
              </h1>
              <p className="mt-2 text-base text-white/60">
                {clinic?.address ?? "—"}
              </p>
            </div>
          </div>
        </div>

        {/* Stats — placeholders hasta tener datos reales */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Card>
            <CardContent className="flex flex-col items-start justify-center gap-1.5 px-6 py-4">
              <span className="text-base text-muted-foreground">Consultas mes</span>
              <span className="text-5xl font-bold tabular-nums">—</span>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col items-start justify-center gap-1.5 px-6 py-4">
              <span className="text-base text-muted-foreground">Calificación promedio</span>
              <span className="text-5xl font-bold tabular-nums">—</span>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col items-start justify-center gap-1.5 px-6 py-4">
              <span className="text-base text-muted-foreground">Reseñas de clientes</span>
              <span className="text-5xl font-bold tabular-nums">—</span>
            </CardContent>
          </Card>
        </div>

        {/* Info detail */}
        <Card>
          <CardHeader>
            <CardTitle>Información de la Clínica</CardTitle>
          </CardHeader>
          <Separator />
          <dl>
            <DescriptionRow label="Nombre"              value={clinic?.name    ?? "—"} />
            <DescriptionRow label="Correo electrónico"  value={email} />
            <DescriptionRow label="Teléfono"            value={clinic?.phone   ?? "—"} />
            <DescriptionRow label="Dirección"           value={clinic?.address ?? "—"} />
            <DescriptionRow label="Miembro desde"       value={joined} last />
          </dl>
        </Card>

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

function DescriptionRow({ label, value, last = false }: { label: string; value: string; last?: boolean }) {
  return (
    <div className={`grid grid-cols-3 gap-4 px-6 py-3.5 ${!last ? "border-b" : ""}`}>
      <dt className="text-sm text-muted-foreground">{label}</dt>
      <dd className="col-span-2 text-sm font-medium">{value}</dd>
    </div>
  )
}
