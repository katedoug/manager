"use client"

import { Icon } from "../icon"

interface BookingCancelledModalProps {
  onClose: () => void
}

export function BookingCancelledModal({ onClose }: BookingCancelledModalProps) {
  return (
    <div className="kd-modal-backdrop">
      <div className="kd-modal" style={{ padding: 28, textAlign: "center" }}>
        <div
          style={{
            width: 72,
            height: 72,
            margin: "0 auto 16px",
            borderRadius: 999,
            background: "rgba(179,38,30,0.08)",
            color: "#B3261E",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon name="heart" size={34} color="#B3261E" />
        </div>

        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 22,
            fontWeight: 700,
            margin: "0 0 10px",
            lineHeight: 1.2,
          }}
        >
          Lo sentimos mucho
        </h2>

        <p style={{ fontSize: 13, color: "var(--fg2)", margin: "0 0 8px", lineHeight: 1.6 }}>
          Lamentamos que hayas tenido que cancelar tu cita. Sabemos que la salud de tu mascota es lo más importante.
        </p>
        <p style={{ fontSize: 13, color: "var(--fg2)", margin: "0 0 24px", lineHeight: 1.6 }}>
          Trabajamos constantemente para mejorar la disponibilidad de nuestras clínicas aliadas y evitar que esto vuelva a ocurrir.
        </p>

        <button className="kd-btn kd-btn-primary kd-btn-block" onClick={onClose}>
          Entendido
        </button>
      </div>
    </div>
  )
}
