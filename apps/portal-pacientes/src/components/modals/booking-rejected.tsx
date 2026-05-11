"use client"

import { Icon } from "../icon"

interface BookingRejectedModalProps {
  clinicName: string
  onFindNearby: () => void
  onDismiss: () => void
}

export function BookingRejectedModal({ clinicName, onFindNearby, onDismiss }: BookingRejectedModalProps) {
  return (
    <div className="kd-modal-backdrop">
      <div className="kd-modal" style={{ padding: 28, textAlign: "center" }}>
        {/* Icon */}
        <div
          style={{
            width: 72,
            height: 72,
            margin: "0 auto 16px",
            borderRadius: 999,
            background: "rgba(181,101,29,0.10)",
            color: "var(--status-warning)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon name="calendar" size={34} color="var(--status-warning)" />
        </div>

        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 22,
            fontWeight: 700,
            margin: "0 0 8px",
            lineHeight: 1.2,
          }}
        >
          La clínica no pudo aceptar
        </h2>

        <p style={{ fontSize: 13, color: "var(--fg2)", margin: "0 0 6px", lineHeight: 1.5 }}>
          <strong style={{ color: "var(--fg1)" }}>{clinicName}</strong> no pudo confirmar tu cita por cuestiones de agenda.
        </p>
        <p style={{ fontSize: 13, color: "var(--fg2)", margin: "0 0 24px", lineHeight: 1.5 }}>
          ¿Quieres que busquemos la clínica más cercana disponible?
        </p>

        {/* Actions */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <button className="kd-btn kd-btn-primary kd-btn-block" onClick={onFindNearby} style={{ gap: 8 }}>
            <Icon name="mapPin" size={16} />
            Buscar clínica cercana
          </button>
          <button className="kd-btn kd-btn-secondary kd-btn-block" onClick={onDismiss}>
            No, cancelar
          </button>
        </div>
      </div>
    </div>
  )
}
