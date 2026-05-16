import { Navbar }     from "@/components/landing/01-navbar"
import { Hero }       from "@/components/landing/02-hero"
import { Trust }      from "@/components/landing/03-trust"
import { Stats }      from "@/components/landing/04-stats"
import { ValueProp }  from "@/components/landing/05-value-prop"
import { Features }   from "@/components/landing/06-features"
import { Testimonial } from "@/components/landing/07-testimonial"
import { Process }    from "@/components/landing/08-process"
import { Dashboard }  from "@/components/landing/09-dashboard"
import { Payments }   from "@/components/landing/10-payments"
import { Faq }        from "@/components/landing/11-faq"
import { CtaForm }    from "@/components/landing/12-cta-form"
import { Footer }     from "@/components/landing/13-footer"

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />        {/* 02 — headline + email CTA inline */}
        {/* <Trust /> */}  {/* 03 — logos de clínicas aliadas — oculto hasta tener clínicas */}
        {/* <Stats /> */}  {/* 04 — 4 métricas clave — oculto hasta tener datos */}
        <ValueProp />   {/* 05 — 3 pilares (pacientes, plataforma, red) */}
        <Features />    {/* 06 — features 2x2 con imagen */}
        <Testimonial /> {/* 07 — quote + dashboard dark */}
        <Process />     {/* 08 — 4 pasos para unirse */}
        <Dashboard />   {/* 09 — platform preview */}
        <Payments />    {/* 10 — pagos semanales vía Stripe Connect, $0 upfront */}
        <Faq />         {/* 11 — accordion preguntas */}
        <CtaForm />     {/* 12 — form de registro final */}
      </main>
      <Footer />        {/* 13 — 5 columnas */}
    </>
  )
}
