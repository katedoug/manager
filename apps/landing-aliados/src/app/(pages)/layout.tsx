import { Navbar } from "@/components/landing/01-navbar"
import { Footer } from "@/components/landing/13-footer"

export default function PagesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="pt-16">{children}</main>
      <Footer />
    </>
  )
}
