import { getSessionAndClinic } from "@/lib/supabase/queries"
import { AjustesClient } from "./client"

export default async function AjustesPage() {
  const session = await getSessionAndClinic()

  return (
    <AjustesClient
      hasClinics={!!session?.clinic}
      clinicName={session?.clinic?.name ?? ""}
      clinicAddress={session?.clinic?.address ?? ""}
      clinicPhone={session?.clinic?.phone ?? ""}
      clinicEmail={session?.clinic?.email ?? ""}
      clinicSlug={session?.clinic?.slug ?? ""}
      userEmail={session?.user?.email ?? ""}
    />
  )
}
