import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export async function proxy(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  const isAuthRoute = request.nextUrl.pathname === "/"
  const isAppRoute = request.nextUrl.pathname.startsWith("/dashboard") ||
    request.nextUrl.pathname.startsWith("/citas") ||
    request.nextUrl.pathname.startsWith("/desempeno") ||
    request.nextUrl.pathname.startsWith("/evaluaciones") ||
    request.nextUrl.pathname.startsWith("/metas") ||
    request.nextUrl.pathname.startsWith("/historial-clinico") ||
    request.nextUrl.pathname.startsWith("/pagos") ||
    request.nextUrl.pathname.startsWith("/ajustes") ||
    request.nextUrl.pathname.startsWith("/perfil")

  if (!user && isAppRoute) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  if (user && isAuthRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
