"use client"

import { Icon } from "../icon"

interface BookingSuccessModalProps {
  onClose: () => void
}

export function BookingSuccessModal({ onClose }: BookingSuccessModalProps) {
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
          }}
        >
          <Icon name="checkCircle" size={36} />
        </div>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 24,
            fontWeight: 700,
            margin: "0 0 8px",
          }}
        >
          ¡Cita agendada!
        </h2>
        <p className="kd-muted" style={{ margin: "0 0 20px", fontSize: 14 }}>
          Te enviamos los detalles a tu correo. Te recordamos 1 hora antes.
        </p>
        <button className="kd-btn kd-btn-primary kd-btn-block" onClick={onClose}>
          Volver al inicio
        </button>
      </div>
    </div>
  )
}
