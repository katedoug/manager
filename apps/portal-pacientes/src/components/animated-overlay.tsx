"use client"

import { useState, useEffect } from "react"

interface AnimatedOverlayProps {
  open: boolean
  onExited?: () => void
  children: React.ReactNode
}

export function AnimatedOverlay({ open, onExited, children }: AnimatedOverlayProps) {
  const [mounted, setMounted] = useState(open)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    if (open) {
      setMounted(true)
      setExiting(false)
    } else if (mounted) {
      setExiting(true)
    }
  }, [open])

  if (!mounted) return null

  return (
    <div
      className={exiting ? "kd-overlay-exit" : "kd-overlay-enter"}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "var(--bg)",
        display: "flex",
        flexDirection: "column",
      }}
      onAnimationEnd={() => {
        if (exiting) {
          setMounted(false)
          setExiting(false)
          onExited?.()
        }
      }}
    >
      {children}
    </div>
  )
}
