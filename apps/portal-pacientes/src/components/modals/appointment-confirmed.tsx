"use client"

import { Icon } from "../icon"

export interface ConfirmedAppointment {
  clinic: string
  clinicAddr: string
  clinicPhone: string
  clinicStars: number
  pet: string
  date: string
  time: string
}

interface AppointmentConfirmedModalProps {
  appointment: ConfirmedAppointment
  onClose: () => void
}

function Row({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: 10,
          background: "var(--kd-lavender)",
          color: "var(--kd-persian-blue)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          marginTop: 1,
        }}
      >
        <Icon name={icon} size={17} color="var(--kd-persian-blue)" />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "var(--fg3)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 2 }}>
          {label}
        </div>
        <div style={{ fontSize: 14, fontWeight: 600, color: "var(--fg1)", lineHeight: 1.4 }}>{value}</div>
      </div>
    </div>
  )
}

export function AppointmentConfirmedModal({ appointment, onClose }: AppointmentConfirmedModalProps) {
  return (
    <div className="kd-modal-backdrop">
      <div className="kd-modal" style={{ padding: 0, overflow: "hidden" }}>

        {/* Header */}
        <div
          style={{
            padding: "24px 24px 20px",
            background: "var(--kd-persian-blue)",
            textAlign: "center",
            color: "#fff",
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 999,
              background: "rgba(255,255,255,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 12px",
            }}
          >
            <Icon name="checkCircle" size={30} color="#fff" />
          </div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700, marginBottom: 4 }}>
            Cita confirmada
          </div>
          <div style={{ fontSize: 13, opacity: 0.8 }}>
            Tu lugar está reservado
          </div>
        </div>

        {/* Detail rows */}
        <div style={{ padding: "20px 20px 0", display: "flex", flexDirection: "column", gap: 16 }}>
          <Row icon="building" label="Clínica" value={appointment.clinic} />
          <div style={{ height: 1, background: "var(--border)" }} />
          <Row icon="mapPin"   label="Dirección" value={appointment.clinicAddr} />
          <div style={{ height: 1, background: "var(--border)" }} />
          <Row icon="phone"    label="Teléfono"  value={appointment.clinicPhone} />
          <div style={{ height: 1, background: "var(--border)" }} />
          <Row icon="calendar" label="Fecha y hora" value={`${appointment.date} · ${appointment.time}`} />
          <div style={{ height: 1, background: "var(--border)" }} />
          <Row icon="paw"      label="Mascota"   value={appointment.pet} />
          <div style={{ height: 1, background: "var(--border)" }} />
          <Row icon="star"     label="Calificación" value={`${appointment.clinicStars} ★ · 100% cubierto en tu plan`} />
        </div>

        {/* Note */}
        <div style={{ margin: "16px 20px 0", padding: "12px 14px", background: "var(--kd-lavender-200)", borderRadius: 12, border: "1px solid var(--kd-lavender)" }}>
          <div style={{ fontSize: 12, color: "var(--fg2)", lineHeight: 1.5 }}>
            Te avisamos <strong>1 hora antes</strong> por correo y notificación. Puedes cancelar hasta <strong>2 horas antes</strong> sin costo.
          </div>
        </div>

        {/* Actions */}
        <div style={{ padding: "16px 20px 24px", display: "flex", flexDirection: "column", gap: 8 }}>
          <button className="kd-btn kd-btn-primary kd-btn-block" onClick={onClose}>
            Listo
          </button>
        </div>
      </div>
    </div>
  )
}
