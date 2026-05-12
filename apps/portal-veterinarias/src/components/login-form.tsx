"use client"

import { useActionState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { login } from "@/app/actions/auth"
import { useLoader } from "@/components/loader-provider"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const router = useRouter()
  const { show } = useLoader()
  const [state, formAction, isPending] = useActionState(login, null)

  // When login succeeds → show loader 3 s → navigate
  useEffect(() => {
    if (state && "success" in state && state.success) {
      show("Iniciando sesión…")
      const t = setTimeout(() => router.push("/"), 3000)
      return () => clearTimeout(t)
    }
  }, [state, show, router])

  return (
    <form
      action={formAction}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Inicia sesión en tu cuenta</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Ingresa tus credenciales para acceder al portal
          </p>
        </div>

        {state && "error" in state && (
          <p className="rounded-md bg-destructive/10 px-3 py-2 text-center text-sm text-destructive">
            {state.error}
          </p>
        )}

        <Field>
          <FieldLabel htmlFor="email">Correo electrónico</FieldLabel>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="correo@ejemplo.com"
            required
            autoComplete="email"
            className="bg-background"
          />
        </Field>

        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Contraseña</FieldLabel>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              ¿Olvidaste tu contraseña?
            </a>
          </div>
          <Input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            className="bg-background"
          />
        </Field>

        <Field>
          <Button size="lg" type="submit" disabled={isPending}>
            {isPending ? "Verificando…" : "Iniciar sesión"}
          </Button>
        </Field>

        <FieldDescription className="text-center text-xs text-muted-foreground">
          El acceso es gestionado por Kate&amp;Doug.
        </FieldDescription>
      </FieldGroup>
    </form>
  )
}
