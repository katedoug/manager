"use client"

import { createContext, useContext, useState, useEffect } from "react"

type DemoModeContextType = {
  isDemoMode: boolean
  isLoading: boolean
  toggleDemoMode: () => void
}

const DemoModeContext = createContext<DemoModeContextType>({
  isDemoMode: true,
  isLoading: false,
  toggleDemoMode: () => {},
})

export function DemoModeProvider({ children }: { children: React.ReactNode }) {
  const [isDemoMode, setIsDemoMode] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem("demoMode")
    if (stored !== null) setIsDemoMode(stored === "true")
  }, [])

  function toggleDemoMode() {
    setIsLoading(true)
    setTimeout(() => {
      setIsDemoMode(prev => {
        const next = !prev
        localStorage.setItem("demoMode", String(next))
        return next
      })
      setIsLoading(false)
    }, 1200)
  }

  return (
    <DemoModeContext.Provider value={{ isDemoMode, isLoading, toggleDemoMode }}>
      {children}
    </DemoModeContext.Provider>
  )
}

export function useDemoMode() {
  return useContext(DemoModeContext)
}
