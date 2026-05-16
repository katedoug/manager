import { ReactNode } from "react"

interface PageHeroProps {
  title: ReactNode
  subtitle: string
  tag?: string
}

export function PageHero({ title, subtitle, tag }: PageHeroProps) {
  return (
    <section className="bg-gray-50 border-b border-gray-200 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {tag && (
          <p className="text-sm font-medium uppercase tracking-widest text-gray-400 mb-3">
            {tag}
          </p>
        )}

        <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl leading-tight max-w-3xl">
          {title}
        </h1>
        <p className="mt-5 text-xl text-gray-500 max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      </div>
    </section>
  )
}
