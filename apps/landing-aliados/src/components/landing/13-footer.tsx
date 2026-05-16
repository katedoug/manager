import Image from "next/image"

const NAV_LINKS = [
  { label: "Beneficios",    href: "/beneficios" },
  { label: "Cómo funciona", href: "/como-funciona" },
  { label: "Pagos",         href: "/pagos" },
  // { label: "Recursos",      href: "/recursos" },
]

const LINKS = {
  soluciones: [
    { label: "Vet Manager",    href: "https://manager.katedoug.com" },
    { label: "Clinic Manager", href: "https://vet.katedoug.com" },
  ],
  recursos: ["Centro de ayuda", "Blog", "Guías"],
  empresa: ["Acerca de KD", "Carreras", "Prensa", "Contacto"],
}

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Main footer grid */}
        <div className="py-14 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Col 1: Logo + description + app badges */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <Image
              src="/partners-logo.svg"
              alt="Kate & Doug Partners"
              width={220}
              height={55}
            />
            <p className="text-sm text-gray-500 max-w-xs leading-relaxed">
              Bienestar moderno
            </p>
            <div className="flex gap-3">
              <a href="#" aria-label="Facebook" className="h-9 w-9 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center hover:bg-gray-200 transition-colors duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-gray-600">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a href="#" aria-label="Instagram" className="h-9 w-9 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center hover:bg-gray-200 transition-colors duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>
              <a href="#" aria-label="LinkedIn" className="h-9 w-9 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center hover:bg-gray-200 transition-colors duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-gray-600">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Navegación */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-500">
              Navegación
            </h4>
            <ul className="flex flex-col gap-2.5">
              {NAV_LINKS.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-sm text-gray-500 hover:text-gray-800">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Soluciones */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-500">
              Soluciones
            </h4>
            <ul className="flex flex-col gap-2.5">
              {LINKS.soluciones.map((l) => (
                <li key={l.label}>
                  <a href={l.href} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-gray-800">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Recursos — hidden */}
          {/* <div className="flex flex-col gap-4">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-500">
              Recursos
            </h4>
            <ul className="flex flex-col gap-2.5">
              {LINKS.recursos.map((l) => (
                <li key={l}>
                  <a href="#" className="text-sm text-gray-500 hover:text-gray-800">{l}</a>
                </li>
              ))}
            </ul>
          </div> */}

          {/* Col 4: Empresa — hidden */}
          {/* <div className="flex flex-col gap-4">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-500">
              Empresa
            </h4>
            <ul className="flex flex-col gap-2.5">
              {LINKS.empresa.map((l) => (
                <li key={l}>
                  <a href="#" className="text-sm text-gray-500 hover:text-gray-800">{l}</a>
                </li>
              ))}
            </ul>
          </div> */}

        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-100 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400">
          <span>© {new Date().getFullYear()} KD Veterinarias Aliadas. Todos los derechos reservados.</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-gray-600">Términos</a>
            <a href="#" className="hover:text-gray-600">Privacidad</a>
            <a href="#" className="hover:text-gray-600">Cookies</a>
          </div>
        </div>

      </div>
    </footer>
  )
}
