"use client"

import { useEffect, useState } from "react"
import { Icon } from "../icon"

const NEARBY_CLINICS = [
  "Kate & Doug Roma Norte",
  "Kate & Doug Condesa",
  "Kate & Doug Coyoacán",
  "Kate & Doug San Ángel",
]

interface SearchingClinicModalProps {
  rejectedClinic: string
  onAccepted: (clinic: string) => void
  onCancel: () => void
}

type Phase = "searching" | "found"

export function SearchingClinicModal({ rejectedClinic, onAccepted, onCancel }: SearchingClinicModalProps) {
  const [phase, setPhase] = useState<Phase>("searching")
  const [currentIdx, setCurrentIdx] = useState(0)
  const [acceptedClinic, setAcceptedClinic] = useState("")

  useEffect(() => {
    // Cycle through clinic names every 1.8s to simulate contacting each one
    const cycle = setInterval(() => {
      setCurrentIdx((i) => (i + 1) % NEARBY_CLINICS.length)
    }, 1800)

    // After ~7s a clinic "accepts"
    const accept = setTimeout(() => {
      clearInterval(cycle)
      const winner = NEARBY_CLINICS[1] // Condesa accepts for demo
      setAcceptedClinic(winner)
      setPhase("found")
    }, 7000)

    return () => {
      clearInterval(cycle)
      clearTimeout(accept)
    }
  }, [])

  if (phase === "found") {
    return (
      <div className="kd-modal-backdrop">
        <div className="kd-modal" style={{ padding: 28, textAlign: "center" }}>
          <div
            style={{
              width: 72,
              height: 72,
              margin: "0 auto 16px",
              borderRadius: 999,
              background: "#DDF1E6",
              color: "var(--status-success)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              animation: "kd-fade-slide-up 300ms var(--ease-soft) both",
            }}
          >
            <Icon name="checkCircle" size={34} color="var(--status-success)" />
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 22,
              fontWeight: 700,
              margin: "0 0 8px",
              lineHeight: 1.2,
              animation: "kd-fade-slide-up 300ms 80ms var(--ease-soft) both",
            }}
          >
            ¡Clínica encontrada!
          </h2>
          <p
            style={{
              fontSize: 13,
              color: "var(--fg2)",
              margin: "0 0 4px",
              lineHeight: 1.5,
              animation: "kd-fade-slide-up 300ms 140ms var(--ease-soft) both",
            }}
          >
            <strong style={{ color: "var(--fg1)" }}>{acceptedClinic}</strong> ha aceptado tu solicitud y confirmó tu cita.
          </p>
          <p
            style={{
              fontSize: 13,
              color: "var(--fg2)",
              margin: "0 0 24px",
              lineHeight: 1.5,
              animation: "kd-fade-slide-up 300ms 180ms var(--ease-soft) both",
            }}
          >
            Te enviamos los detalles actualizados a tu correo.
          </p>
          <button
            className="kd-btn kd-btn-primary kd-btn-block"
            onClick={() => onAccepted(acceptedClinic)}
            style={{ animation: "kd-fade-slide-up 300ms 240ms var(--ease-soft) both" }}
          >
            Ver mi cita
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="kd-modal-backdrop">
      <div className="kd-modal" style={{ padding: 28, textAlign: "center" }}>

        {/* Radar animation */}
        <div
          style={{
            position: "relative",
            width: 96,
            height: 96,
            margin: "0 auto 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: 999,
                background: "var(--kd-persian-blue)",
                animation: `kd-radar 2.4s ${i * 0.8}s ease-out infinite`,
                opacity: 0,
              }}
            />
          ))}
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 999,
              background: "var(--kd-persian-blue)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1,
              flexShrink: 0,
            }}
          >
            <Icon name="mapPin" size={24} color="#fff" />
          </div>
        </div>

        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 21,
            fontWeight: 700,
            margin: "0 0 6px",
            lineHeight: 1.2,
          }}
        >
          Buscando clínica disponible
        </h2>
        <p style={{ fontSize: 13, color: "var(--fg2)", margin: "0 0 20px", lineHeight: 1.5 }}>
          Estamos contactando automáticamente a las clínicas más cercanas a{" "}
          <strong style={{ color: "var(--fg1)" }}>{rejectedClinic}</strong>.
        </p>

        {/* Currently contacting */}
        <div
          style={{
            background: "var(--kd-lavender-200)",
            border: "1px solid var(--kd-lavender)",
            borderRadius: 14,
            padding: "12px 16px",
            marginBottom: 20,
            minHeight: 48,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div className="kd-spinner" style={{ width: 16, height: 16, borderWidth: 2, flexShrink: 0 }} />
          <div style={{ textAlign: "left" }}>
            <div style={{ fontSize: 11, color: "var(--fg3)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Contactando
            </div>
            <div
              key={currentIdx}
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: "var(--kd-persian-blue)",
                animation: "kd-fade-slide-up 250ms var(--ease-soft) both",
              }}
            >
              {NEARBY_CLINICS[currentIdx]}
            </div>
          </div>
        </div>

        <button
          className="kd-btn kd-btn-ghost kd-btn-block"
          onClick={onCancel}
          style={{ fontSize: 13, color: "var(--fg3)" }}
        >
          Cancelar búsqueda
        </button>
      </div>
    </div>
  )
}
