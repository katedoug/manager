"use client"

import { useState } from "react"
import { Pet, VET_INFO } from "@/lib/data"
import { Icon } from "../icon"
import { BenefitsModal } from "../modals/benefits"
import { ActivityDetailModal, ActivityItem } from "../modals/activity-detail"
import { RescheduleModal } from "../modals/reschedule"

type View = "home" | "pets" | "book" | "history" | "plan"

interface HomeScreenProps {
  pet: Pet
  onNav: (v: View) => void
  onOpenChat: () => void
  onOpenVideo: () => void
  onBookVideo: () => void
  onOpenKate: () => void
}

const BENEFITS = [
  { id: "consultas", label: "Consultas físicas", used: 4, total: 12 },
  { id: "vacunas",   label: "Vacunas",           used: 2, total: 3  },
  { id: "examenes",  label: "Exámenes",           used: 1, total: 2  },
  { id: "desparas",  label: "Desparasitación",    used: 0, total: 1  },
]

export function HomeScreen({ pet, onNav, onOpenChat, onOpenVideo, onBookVideo, onOpenKate }: HomeScreenProps) {
  const today = new Date().toLocaleDateString("es-MX", { weekday: "long", day: "numeric", month: "long" })
  const [showBenefits, setShowBenefits] = useState(false)
  const [selectedActivity, setSelectedActivity] = useState<ActivityItem | null>(null)
  const [showReschedule, setShowReschedule] = useState(false)

  return (
    <>
    <div style={{ paddingBottom: 100 }}>
      {/* Greeting */}
      <div style={{ padding: "16px 16px 8px" }}>
        <div className="kd-eyebrow" style={{ marginBottom: 6 }}>
          Hoy, {today}
        </div>
        <h1 className="kd-h-page" style={{ fontSize: 24 }}>
          Bienvenido de nuevo, {pet.name}.
        </h1>
      </div>

      {/* Hero — próxima cita */}
      <div style={{ padding: "8px 16px 16px" }}>
        <div
          style={{
            background: "var(--kd-prussian-blue)",
            color: "#fff",
            borderRadius: 24,
            padding: 20,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              right: -40,
              top: -40,
              width: 200,
              height: 200,
              borderRadius: 999,
              background: "radial-gradient(circle, rgba(232,237,255,0.18), transparent 70%)",
            }}
          />
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--kd-persian-blue-300)",
              marginBottom: 8,
            }}
          >
            Próxima cita · {pet.name}
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 26,
              fontWeight: 700,
              lineHeight: 1.1,
              margin: "0 0 6px",
              letterSpacing: "-0.02em",
            }}
          >
            Consulta de seguimiento
            <br />
            jueves 14:30
          </h2>
          <div style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", marginBottom: 18 }}>
            con {VET_INFO.name} · videollamada
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            <button
              onClick={onOpenVideo}
              style={{
                display: "flex", alignItems: "center", gap: 6,
                height: 38, padding: "0 13px", borderRadius: 999, border: "none",
                background: "var(--kd-white)", color: "var(--kd-prussian-blue)",
                fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 13,
                letterSpacing: "-0.01em", cursor: "pointer", whiteSpace: "nowrap", lineHeight: 1,
                flexShrink: 0,
              }}
            >
              <Icon name="video" size={15} />
              <span>Unirme</span>
            </button>
<button
              onClick={() => setShowReschedule(true)}
              style={{
                display: "flex", alignItems: "center", gap: 6,
                height: 38, padding: "0 13px", borderRadius: 999, border: "none",
                background: "rgba(255,255,255,0.10)", color: "rgba(255,255,255,0.75)",
                fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 13,
                letterSpacing: "-0.01em", cursor: "pointer", whiteSpace: "nowrap", lineHeight: 1,
                flexShrink: 0,
              }}
            >
              <Icon name="refresh" size={15} color="rgba(255,255,255,0.75)" />
              <span>Reagendar</span>
            </button>
          </div>
        </div>
      </div>


      {/* Quick actions */}
      <div style={{ padding: "4px 16px 10px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <h3 className="kd-h-section">Accesos rápidos</h3>
      </div>
      <div
        style={{
          padding: "0 16px 16px",
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 8,
        }}
      >
        {[
          { label: "Chatea con una veterinaria", icon: "message", onClick: onOpenChat },
          { label: "Programa una videollamada", icon: "video", onClick: onBookVideo  },
          { label: "Agenda un servicio", icon: "calendar", onClick: () => onNav("book") },
          { label: "Habla con Kate, nuestra IA", icon: "sparkles", onClick: onOpenKate },
        ].map((a) => (
          <button
            key={a.label}
            onClick={a.onClick}
            className="kd-card kd-card-hover"
            style={{
              background: "var(--kd-white)",
              padding: "14px 8px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
              fontSize: 11,
              fontWeight: 600,
              color: "var(--fg1)",
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                background: "var(--kd-lavender)",
                color: "var(--kd-persian-blue)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon name={a.icon} size={20} />
            </div>
            {a.label}
          </button>
        ))}
      </div>

      {/* Beneficios */}
      <div style={{ padding: "8px 16px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            marginBottom: 12,
          }}
        >
          <h3 className="kd-h-section">Incluido en tu plan</h3>
          <button
            style={{ fontSize: 13, color: "var(--kd-persian-blue)", fontWeight: 600, background: "none", border: "none", cursor: "pointer" }}
            onClick={() => setShowBenefits(true)}
          >
            Ver todo
          </button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {BENEFITS.map((b) => {
            const pct = Math.round((b.used / b.total) * 100)
            return (
              <div key={b.id} className="kd-card" style={{ padding: 16 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "var(--fg2)", marginBottom: 10 }}>
                  {b.label}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: 32,
                    letterSpacing: "-0.03em",
                    lineHeight: 1,
                  }}
                >
                  {b.used}
                  <span style={{ fontSize: 16, color: "var(--fg3)", fontWeight: 500 }}> / {b.total}</span>
                </div>
                <div className="kd-progress" style={{ marginTop: 10 }}>
                  <div className="kd-progress-bar" style={{ width: pct + "%" }} />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Recordatorios */}
      <div style={{ padding: "8px 16px 10px" }}>
        <h3 className="kd-h-section">Tus recordatorios</h3>
      </div>

      {/* Próxima vacuna alert */}
      <div style={{ padding: "0 16px 16px" }}>
        <div
          className="kd-card"
          style={{
            padding: 14,
            display: "flex",
            gap: 12,
            alignItems: "center",
            background: "var(--kd-lavender-200)",
            borderColor: "var(--kd-lavender)",
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 999,
              background: "var(--kd-persian-blue)",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Icon name="syringe" size={20} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600 }}>Próxima vacuna</div>
            <div style={{ fontSize: 12, color: "var(--fg2)" }}>{pet.nextVaccine}</div>
          </div>
          <button className="kd-btn kd-btn-sm kd-btn-primary" onClick={() => onNav("book")}>
            Agendar
          </button>
        </div>
      </div>

      {/* Actividad reciente */}
      <div style={{ padding: "8px 16px 24px" }}>
        <h3 className="kd-h-section" style={{ marginBottom: 12 }}>
          Actividad reciente
        </h3>
        <div className="kd-card" style={{ padding: 0, overflow: "hidden" }}>
          {([
            {
              date: "24 abr", title: "Receta antiparasitario", sub: "Dra. Mariana García", icon: "pill",
              diagnostico: "Se detectaron signos leves de infestación parasitaria. Se prescribe tratamiento preventivo mensual.",
              receta: "Nexgard Spectra 30–60 kg · 1 tableta mensual por 3 meses",
            },
            {
              date: "12 abr", title: "Consulta videollamada", sub: "Tos seca · resuelta", icon: "video",
              diagnostico: "Tos seca persistente de 4 días. Descartada traqueobronquitis infecciosa. Probable irritación leve de vías respiratorias altas. Resolución espontánea esperada.",
              receta: "Antitusivo pediátrico 2.5 ml cada 8 h por 5 días. Mantener ambiente húmedo.",
            },
            {
              date: "02 abr", title: "Examen general", sub: "Clínica San Ángel · Dr. Ramírez", icon: "stethoscope",
              diagnostico: "Revisión de rutina. Peso: 28.4 kg. BCS 4/9, condición corporal ideal. Dientes con acumulación moderada de sarro. Resto de exploración sin hallazgos relevantes.",
            },
          ] as ActivityItem[]).map((a, i, arr) => (
            <button
              key={i}
              onClick={() => setSelectedActivity(a)}
              style={{
                width: "100%",
                padding: "14px 16px",
                display: "flex",
                alignItems: "center",
                gap: 12,
                borderBottom: i < arr.length - 1 ? "1px solid var(--border)" : 0,
                background: "none",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
                fontFamily: "var(--font-sans)",
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: "var(--kd-parchment)",
                  color: "var(--kd-onyx)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Icon name={a.icon} size={18} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{a.title}</div>
                <div style={{ fontSize: 12, color: "var(--fg2)" }}>{a.sub}</div>
              </div>
              <div style={{ fontSize: 12, color: "var(--fg3)", fontFamily: "var(--font-mono)", flexShrink: 0 }}>{a.date}</div>
            </button>
          ))}
        </div>
      </div>
    </div>

    {showBenefits && <BenefitsModal onClose={() => setShowBenefits(false)} />}
    {selectedActivity && <ActivityDetailModal item={selectedActivity} onClose={() => setSelectedActivity(null)} />}
    {showReschedule && <RescheduleModal onClose={() => setShowReschedule(false)} />}
    </>
  )
}
