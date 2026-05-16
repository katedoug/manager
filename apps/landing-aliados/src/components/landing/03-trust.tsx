const LOGOS = [
  "[Clínica Uno]",
  "[Clínica Dos]",
  "[Clínica Tres]",
  "[Clínica Cuatro]",
  "[Clínica Cinco]",
  "[Clínica Seis]",
  "[Clínica Siete]",
  "[Clínica Ocho]",
]

export function Trust() {
  return (
    <section className="border-y border-gray-100 bg-gray-50 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-gray-400 mb-8 font-medium tracking-wide uppercase">
          [+000 clínicas veterinarias ya son parte de la red]
        </p>

        {/* Logo carousel — static row, overflow hidden */}
        <div className="flex items-center gap-8 overflow-hidden">
          <div className="flex items-center gap-8 animate-none flex-wrap justify-center w-full">
            {LOGOS.map((logo) => (
              <div
                key={logo}
                className="h-10 w-28 rounded-md bg-gray-200 border border-gray-200 flex items-center justify-center shrink-0"
              >
                <span className="text-xs text-gray-400 text-center px-1">{logo}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
