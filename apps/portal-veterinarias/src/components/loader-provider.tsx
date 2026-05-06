"use client"

import {
  createContext,
  useCallback,
  useContext,
  useState,
} from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

// ── Context ────────────────────────────────────────────────────────────────────

interface LoaderCtx {
  show: (message?: string) => void
  hide: () => void
}

const LoaderContext = createContext<LoaderCtx>({ show: () => {}, hide: () => {} })

export function useLoader() {
  return useContext(LoaderContext)
}

// ── Loader UI ──────────────────────────────────────────────────────────────────

function LoaderOverlay({
  message,
  exiting,
  onExited,
}: {
  message: string
  exiting: boolean
  onExited: () => void
}) {
  return (
    <div
      className={cn(
        "fixed inset-0 z-[200] flex items-center justify-center bg-background/90 backdrop-blur-sm",
        exiting ? "animate-loader-out" : "animate-loader-in",
      )}
      onAnimationEnd={exiting ? onExited : undefined}
    >
      <div className="flex flex-col items-center gap-7 px-6 text-center">

        {/* Brand */}
        <Image
          src="/partners-logo.svg"
          alt="Kate&Doug"
          width={160}
          height={48}
          priority
        />

        {/* Spinner */}
        <div className="relative size-14">
          <div className="absolute inset-0 rounded-full border-[3px] border-muted" />
          <div className="absolute inset-0 animate-spin rounded-full border-[3px] border-primary border-t-transparent" />
        </div>

        {/* Message */}
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium">{message}</p>
          <p className="text-xs text-muted-foreground">Por favor espera un momento…</p>
        </div>

      </div>
    </div>
  )
}

// ── Provider ───────────────────────────────────────────────────────────────────

export function LoaderProvider({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = useState(false)
  const [exiting, setExiting] = useState(false)
  const [message, setMessage] = useState("Cargando…")

  const show = useCallback((msg = "Cargando…") => {
    setMessage(msg)
    setExiting(false)
    setVisible(true)
  }, [])

  const hide = useCallback(() => {
    setExiting(true)
  }, [])

  const handleExited = useCallback(() => {
    setVisible(false)
    setExiting(false)
  }, [])

  return (
    <LoaderContext.Provider value={{ show, hide }}>
      {children}
      {visible && (
        <LoaderOverlay message={message} exiting={exiting} onExited={handleExited} />
      )}
    </LoaderContext.Provider>
  )
}
