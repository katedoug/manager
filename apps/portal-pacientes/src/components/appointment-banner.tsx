"use client"

import { useEffect, useState } from "react"
import { Icon } from "./icon"

export type AppointmentStatus = "pending" | "confirmed" | "in-progress" | "completed" | "rejected"

export interface ActiveAppointment {
  clinic: string
  pet: string
  date: string
  time: string
  status: AppointmentStatus
}

interface AppointmentBannerProps {
  appointment: ActiveAppointment
  onPress: () => void
  onDismiss: () => void
}

const STEPS: { key: AppointmentStatus | "in-progress"; label: string }[] = [
  { key: "pending",     label: "Solicitada"  },
  { key: "confirmed",   label: "Confirmada"  },
  { key: "in-progress", label: "En consulta" },
]

const STATUS_INDEX: Record<AppointmentStatus, number> = {
  pending:       0,
  confirmed:     1,
  "in-progress": 2,
  completed:     3,
  rejected:      0,
}

const STATUS_TEXT: Record<AppointmentStatus, string> = {
  pending:       "Esperando confirmación de la clínica",
  confirmed:     "Cita confirmada — te esperamos",
  "in-progress": "Consulta en curso",
  completed:     "Consulta completada",
  rejected:      "La clínica no pudo aceptar tu cita",
}

export function AppointmentBanner({ appointment, onPress, onDismiss }: AppointmentBannerProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80)
    return () => clearTimeout(t)
  }, [])

  const currentStep = STATUS_INDEX[appointment.status]
  const isPending = appointment.status === "pending"
  const isInProgress = appointment.status === "in-progress"

  return (
    <div
      style={{
        overflow: "hidden",
        maxHeight: visible ? 200 : 0,
        opacity: visible ? 1 : 0,
        transition: "max-height 400ms var(--ease-soft), opacity 300ms ease",
      }}
    >
      <div
        onClick={onPress}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && onPress()}
        style={{
          display: "block",
          width: "100%",
          cursor: "pointer",
          padding: "8px 12px 6px",
        }}
      >
        <div
          style={{
            background: "var(--kd-white)",
            border: "1px solid var(--border)",
            borderRadius: 18,
            padding: "12px 14px",
            boxShadow: "0 2px 12px rgba(3,0,39,0.07)",
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          {/* Row 1: clinic + time + dismiss */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 10,
                background: "var(--kd-lavender)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Icon name="stethoscope" size={16} color="var(--kd-persian-blue)" />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "var(--fg1)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {appointment.clinic}
              </div>
              <div style={{ fontSize: 11, color: "var(--fg2)" }}>
                {appointment.pet} · {appointment.date}, {appointment.time}
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: isPending ? "var(--status-warning)" : isInProgress ? "var(--status-success)" : "var(--kd-persian-blue)",
                  background: isPending ? "rgba(181,101,29,0.09)" : isInProgress ? "rgba(22,163,74,0.10)" : "var(--kd-lavender)",
                  borderRadius: 99,
                  padding: "2px 8px",
                }}
              >
                {isPending ? "Pendiente" : appointment.status === "confirmed" ? "Confirmada" : "En consulta"}
              </span>
              <button
                onClick={(e) => { e.stopPropagation(); onDismiss() }}
                style={{ background: "none", border: "none", cursor: "pointer", padding: 4, color: "var(--fg3)" }}
              >
                <Icon name="x" size={14} />
              </button>
            </div>
          </div>

          {/* Row 2: status text */}
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            {isPending && (
              <span style={{ position: "relative", width: 8, height: 8, flexShrink: 0 }}>
                <span className="kd-ping" style={{ position: "absolute", inset: 0, borderRadius: 99, background: "var(--status-warning)", opacity: 0.6 }} />
                <span style={{ position: "absolute", inset: 0, borderRadius: 99, background: "var(--status-warning)" }} />
              </span>
            )}
            {isInProgress && (
              <span style={{ position: "relative", width: 8, height: 8, flexShrink: 0 }}>
                <span className="kd-ping" style={{ position: "absolute", inset: 0, borderRadius: 99, background: "var(--status-success)", opacity: 0.6 }} />
                <span style={{ position: "absolute", inset: 0, borderRadius: 99, background: "var(--status-success)" }} />
              </span>
            )}
            <span style={{ fontSize: 12, color: "var(--fg2)", fontWeight: 500 }}>
              {STATUS_TEXT[appointment.status]}
            </span>
          </div>

          {/* Row 3: progress tracker */}
          <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
            {STEPS.map((step, i) => {
              const done = i < currentStep
              const active = i === currentStep
              return (
                <div key={step.key} style={{ display: "flex", alignItems: "center", flex: i < STEPS.length - 1 ? 1 : "none" }}>
                  {/* Dot */}
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
                    <div
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: 999,
                        background: done || active ? "var(--kd-persian-blue)" : "var(--kd-white)",
                        border: `2px solid ${done || active ? "var(--kd-persian-blue)" : "var(--border)"}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        transition: "all 400ms ease",
                        boxShadow: active ? "0 0 0 4px rgba(20,52,203,0.15)" : "none",
                      }}
                    >
                      {done && <Icon name="check" size={10} color="#fff" />}
                    </div>
                    <span style={{ fontSize: 9, fontWeight: done || active ? 700 : 500, color: done || active ? "var(--kd-persian-blue)" : "var(--fg3)", whiteSpace: "nowrap" }}>
                      {step.label}
                    </span>
                  </div>
                  {/* Line */}
                  {i < STEPS.length - 1 && (
                    <div style={{ flex: 1, height: 2, background: done ? "var(--kd-persian-blue)" : "var(--border)", margin: "0 4px", marginBottom: 14, transition: "background 400ms ease" }} />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
