"use client"

import { useState, useEffect } from "react"
import { VET_INFO } from "@/lib/data"
import { Icon } from "../icon"

type Status = "loading" | "form" | "confirming" | "confirmed"

const DAY_NAMES   = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"]
const MONTH_NAMES = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"]

const MOTIVOS = [
  { id: "general",     label: "Consulta general",          icon: "stethoscope" },
  { id: "seguimiento", label: "Revisión de seguimiento",   icon: "pulse"       },
  { id: "problema",    label: "Problema de salud",         icon: "alertCircle" },
  { id: "vacunas",     label: "Consulta de vacunas",       icon: "syringe"     },
  { id: "otro",        label: "Otro",                      icon: "edit"        },
]

const BASE_SLOTS = [
  { time: "09:00", available: true  },
  { time: "09:30", available: false },
  { time: "10:00", available: true  },
  { time: "10:30", available: true  },
  { time: "11:00", available: true  },
  { time: "11:30", available: false },
  { time: "14:00", available: false },
  { time: "14:30", available: true  },
  { time: "15:00", available: true  },
  { time: "15:30", available: false },
  { time: "16:00", available: true  },
  { time: "16:30", available: true  },
]

function getNextDays(n: number): Date[] {
  return Array.from({ length: n }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() + i + 1)
    return d
  })
}

function isDayAvailable(d: Date) {
  const day = d.getDay()
  if (day === 0 || day === 6) return false
  return d.getDate() % 5 !== 0
}

interface VideoBookingScreenProps {
  onClose: () => void
  onDone: (goTo?: "home" | "history") => void
}

export function VideoBookingScreen({ onClose, onDone }: VideoBookingScreenProps) {
  const [status, setStatus]           = useState<Status>("loading")
  const [days]                        = useState(() => getNextDays(21))
  const [selectedDay, setSelectedDay] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [slotsLoading, setSlotsLoading] = useState(false)
  const [motivo, setMotivo]           = useState<string | null>(null)
  const [notas, setNotas]             = useState("")

  useEffect(() => {
    const t = setTimeout(() => setStatus("form"), 1800)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (!selectedDay) return
    setSlotsLoading(true)
    setSelectedTime(null)
    const t = setTimeout(() => setSlotsLoading(false), 900)
    return () => clearTimeout(t)
  }, [selectedDay])

  const canConfirm = !!selectedDay && !!selectedTime && !!motivo

  function handleConfirm() {
    setStatus("confirming")
    setTimeout(() => setStatus("confirmed"), 2600)
  }

  /* ── Loading ── */
  if (status === "loading") {
    return (
      <div style={{
        position: "fixed", inset: 0, background: "var(--bg)", zIndex: 100,
        display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", gap: 20,
      }}>
        <div
          style={{
            width: 64, height: 64, borderRadius: 999,
            background: "var(--kd-lavender)",
            display: "flex", alignItems: "center", justifyContent: "center",
            marginBottom: 4,
          }}
        >
          <Icon name="video" size={28} color="var(--kd-persian-blue)" />
        </div>
        <div className="kd-spinner" style={{ width: 32, height: 32 }} />
        <div style={{ textAlign: "center" }}>
          <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>
            Consultando disponibilidad
          </div>
          <div style={{ fontSize: 14, color: "var(--fg2)" }}>
            de {VET_INFO.name}…
          </div>
        </div>
      </div>
    )
  }

  /* ── Confirming ── */
  if (status === "confirming") {
    return (
      <div style={{
        position: "fixed", inset: 0, background: "var(--bg)", zIndex: 100,
        display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", gap: 20,
      }}>
        <div className="kd-spinner" style={{ width: 36, height: 36 }} />
        <div style={{ textAlign: "center" }}>
          <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>Confirmando videollamada</div>
          <div style={{ fontSize: 14, color: "var(--fg2)" }}>Guardando tu cita con {VET_INFO.name}…</div>
        </div>
      </div>
    )
  }

  /* ── Confirmed ── */
  if (status === "confirmed") {
    const motivoLabel = MOTIVOS.find(m => m.id === motivo)?.label ?? ""
    const dateLabel   = selectedDay
      ? `${DAY_NAMES[selectedDay.getDay()]} ${selectedDay.getDate()} de ${MONTH_NAMES[selectedDay.getMonth()]}`
      : ""

    return (
      <div style={{
        position: "fixed", inset: 0, background: "var(--bg)", zIndex: 100,
        display: "flex", flexDirection: "column",
      }}>
        {/* Body */}
        <div style={{
          flex: 1, display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", padding: "32px 24px", gap: 0,
        }}>
          {/* Illustration */}
          <div style={{ width: 180, height: 180, marginBottom: 8, animation: "kd-modal-in 360ms var(--ease-soft) both" }}>
            <svg viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
              {/* Background circle */}
              <circle cx="90" cy="90" r="90" fill="#E8EDFF"/>
              {/* Decorative ring */}
              <circle cx="90" cy="90" r="72" fill="none" stroke="#1434CB" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.25"/>
              {/* Calendar base */}
              <rect x="46" y="60" width="88" height="76" rx="14" fill="#030027"/>
              <rect x="46" y="60" width="88" height="26" rx="14" fill="#1434CB"/>
              <rect x="46" y="74" width="88" height="14" fill="#1434CB"/>
              {/* Calendar rings */}
              <rect x="68" y="52" width="8" height="18" rx="4" fill="#030027"/>
              <rect x="104" y="52" width="8" height="18" rx="4" fill="#030027"/>
              {/* Check circle */}
              <circle cx="90" cy="112" r="20" fill="#E8EDFF"/>
              {/* Check mark */}
              <path d="M80 112l7 7 13-14" stroke="#1434CB" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              {/* Paw prints */}
              <circle cx="38" cy="50" r="5" fill="#1434CB" opacity="0.2"/>
              <circle cx="30" cy="60" r="3.5" fill="#1434CB" opacity="0.15"/>
              <circle cx="142" cy="130" r="4" fill="#1434CB" opacity="0.2"/>
              <circle cx="150" cy="120" r="3" fill="#1434CB" opacity="0.15"/>
            </svg>
          </div>

          <div style={{ fontWeight: 700, fontSize: 24, marginBottom: 6, letterSpacing: "-0.02em" }}>
            ¡Videollamada agendada!
          </div>
          <div style={{ fontSize: 14, color: "var(--fg2)", marginBottom: 28 }}>
            Recibirás un recordatorio antes de tu cita
          </div>

          {/* Summary card */}
          <div style={{
            background: "var(--kd-white)", border: "1px solid var(--border)",
            borderRadius: 20, padding: "20px", width: "100%", maxWidth: 380,
            display: "flex", flexDirection: "column", gap: 14,
          }}>
            {[
              { icon: "calendar", label: "Fecha",      value: dateLabel },
              { icon: "clock",    label: "Hora",        value: selectedTime ?? "" },
              { icon: "video",    label: "Tipo",        value: "Videollamada" },
              { icon: "user",     label: "Veterinaria", value: VET_INFO.name },
              { icon: "stethoscope", label: "Motivo",   value: motivoLabel },
            ].map((row, i, arr) => (
              <div key={row.label} style={{
                display: "flex", alignItems: "center", gap: 12,
                paddingBottom: i < arr.length - 1 ? 14 : 0,
                borderBottom: i < arr.length - 1 ? "1px solid var(--border)" : "none",
              }}>
                <div style={{
                  width: 34, height: 34, borderRadius: 10,
                  background: "var(--kd-lavender)", color: "var(--kd-persian-blue)",
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}>
                  <Icon name={row.icon} size={16} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, color: "var(--fg3)", fontWeight: 600 }}>{row.label}</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "var(--fg1)" }}>{row.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div style={{
          padding: "12px 24px 36px", background: "var(--kd-white)",
          borderTop: "1px solid var(--border)", display: "flex", flexDirection: "column", gap: 8,
        }}>
          <button
            className="kd-btn kd-btn-primary"
            onClick={() => onDone("home")}
            style={{ width: "100%", fontWeight: 700, fontSize: 16, height: 52 }}
          >
            Ir al inicio
          </button>
          <button
            className="kd-btn kd-btn-secondary"
            onClick={() => onDone("history")}
            style={{ width: "100%", fontWeight: 700 }}
          >
            Ver mis citas
          </button>
        </div>
      </div>
    )
  }

  /* ── Form ── */
  return (
    <div style={{
      position: "fixed", inset: 0, background: "var(--bg)", zIndex: 100,
      display: "flex", flexDirection: "column",
      animation: "kd-slide-up 220ms var(--ease-soft) both",
    }}>

      {/* Header */}
      <div style={{
        padding: "14px 16px", display: "flex", alignItems: "center", gap: 12,
        background: "var(--kd-white)", borderBottom: "1px solid var(--border)",
        flexShrink: 0,
      }}>
        <button className="kd-btn kd-btn-icon kd-btn-sm kd-btn-ghost" onClick={onClose}>
          <Icon name="chevronLeft" size={20} />
        </button>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 700, fontSize: 15 }}>Agendar videollamada</div>
          <div style={{ fontSize: 12, color: "var(--fg2)" }}>{VET_INFO.name} · {VET_INFO.role}</div>
        </div>
        <div style={{
          width: 36, height: 36, borderRadius: 999,
          background: "var(--kd-lavender)", color: "var(--kd-persian-blue)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15, flexShrink: 0,
        }}>
          {VET_INFO.avatar}
        </div>
      </div>

      {/* Scrollable body */}
      <div style={{ flex: 1, overflowY: "auto" }}>

        {/* Date strip */}
        <div style={{ paddingTop: 20 }}>
          <div style={{
            padding: "0 20px 10px", fontSize: 11, fontWeight: 700,
            letterSpacing: "0.07em", textTransform: "uppercase", color: "var(--fg3)",
          }}>
            Selecciona fecha
          </div>
          <div style={{ overflowX: "auto", overflowY: "hidden", WebkitOverflowScrolling: "touch" } as React.CSSProperties}>
            <div style={{ display: "flex", gap: 8, padding: "4px 20px 16px", width: "max-content" }}>
              {days.map((d, i) => {
                const available  = isDayAvailable(d)
                const isSelected = selectedDay?.toDateString() === d.toDateString()
                return (
                  <button
                    key={i}
                    disabled={!available}
                    onClick={() => setSelectedDay(d)}
                    style={{
                      flexShrink: 0,
                      display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
                      width: 52, padding: "10px 0", borderRadius: 14,
                      border: isSelected ? "none" : "1px solid var(--border)",
                      background: isSelected
                        ? "var(--kd-persian-blue)"
                        : available ? "var(--kd-white)" : "transparent",
                      color: isSelected ? "#fff" : available ? "var(--fg1)" : "var(--fg3)",
                      cursor: available ? "pointer" : "not-allowed",
                      opacity: available ? 1 : 0.38,
                    }}
                  >
                    <span style={{ fontSize: 11, fontWeight: 600, color: isSelected ? "rgba(255,255,255,0.7)" : "var(--fg3)" }}>
                      {DAY_NAMES[d.getDay()]}
                    </span>
                    <span style={{ fontSize: 18, fontWeight: 700, lineHeight: 1 }}>
                      {d.getDate()}
                    </span>
                    <span style={{ fontSize: 10, opacity: 0.6 }}>
                      {MONTH_NAMES[d.getMonth()]}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Time slots */}
        <div style={{ padding: "0 20px 20px", borderTop: "1px solid var(--border)", paddingTop: 16 }}>
          <div style={{
            fontSize: 11, fontWeight: 700, letterSpacing: "0.07em",
            textTransform: "uppercase", color: "var(--fg3)", marginBottom: 12,
          }}>
            Horarios disponibles
          </div>
          {!selectedDay ? (
            <div style={{ fontSize: 13, color: "var(--fg3)", padding: "8px 0" }}>
              Selecciona una fecha para ver horarios
            </div>
          ) : slotsLoading ? (
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "16px 0", color: "var(--fg3)", fontSize: 13 }}>
              <div className="kd-spinner" style={{ width: 16, height: 16, flexShrink: 0 }} />
              Obteniendo horarios…
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
              {BASE_SLOTS.map((slot) => {
                const isSelected = selectedTime === slot.time
                return (
                  <button
                    key={slot.time}
                    disabled={!slot.available}
                    onClick={() => setSelectedTime(slot.time)}
                    style={{
                      height: 40, borderRadius: 10,
                      border: isSelected ? "none" : "1px solid var(--border)",
                      background: isSelected
                        ? "var(--kd-persian-blue)"
                        : slot.available ? "var(--kd-white)" : "var(--bg-soft)",
                      color: isSelected ? "#fff" : slot.available ? "var(--fg1)" : "var(--fg3)",
                      fontSize: 13, fontWeight: 600, fontFamily: "var(--font-mono)",
                      cursor: slot.available ? "pointer" : "not-allowed",
                      opacity: slot.available ? 1 : 0.4,
                      textDecoration: slot.available ? "none" : "line-through",
                    }}
                  >
                    {slot.time}
                  </button>
                )
              })}
            </div>
          )}
        </div>

        {/* Motivo */}
        <div style={{ padding: "0 20px 20px", borderTop: "1px solid var(--border)", paddingTop: 16 }}>
          <div style={{
            fontSize: 11, fontWeight: 700, letterSpacing: "0.07em",
            textTransform: "uppercase", color: "var(--fg3)", marginBottom: 12,
          }}>
            Motivo de consulta
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {MOTIVOS.map((m) => {
              const isSelected = motivo === m.id
              return (
                <button
                  key={m.id}
                  onClick={() => setMotivo(m.id)}
                  style={{
                    display: "flex", alignItems: "center", gap: 12,
                    padding: "12px 14px", borderRadius: 12, textAlign: "left",
                    border: isSelected
                      ? "1.5px solid var(--kd-persian-blue)"
                      : "1px solid var(--border)",
                    background: isSelected ? "var(--kd-lavender)" : "var(--kd-white)",
                    color: isSelected ? "var(--kd-persian-blue)" : "var(--fg1)",
                    fontSize: 14, fontWeight: isSelected ? 600 : 400,
                    cursor: "pointer", fontFamily: "var(--font-sans)",
                  }}
                >
                  <Icon
                    name={m.icon}
                    size={16}
                    color={isSelected ? "var(--kd-persian-blue)" : "var(--fg3)"}
                  />
                  <span style={{ flex: 1 }}>{m.label}</span>
                  {isSelected && <Icon name="check" size={16} color="var(--kd-persian-blue)" />}
                </button>
              )
            })}
          </div>
        </div>

        {/* Notas */}
        <div style={{ padding: "0 20px 40px", borderTop: "1px solid var(--border)", paddingTop: 16 }}>
          <div style={{
            fontSize: 11, fontWeight: 700, letterSpacing: "0.07em",
            textTransform: "uppercase", color: "var(--fg3)", marginBottom: 12,
          }}>
            Notas adicionales{" "}
            <span style={{ fontWeight: 400, textTransform: "none", letterSpacing: 0, fontSize: 11 }}>
              (opcional)
            </span>
          </div>
          <textarea
            className="kd-input"
            value={notas}
            onChange={(e) => setNotas(e.target.value)}
            placeholder="¿Algo más que deba saber la doctora?"
            rows={3}
            style={{
              width: "100%", resize: "none", height: "auto",
              padding: "12px 14px", lineHeight: 1.6,
              fontFamily: "var(--font-sans)", fontSize: 14,
              boxSizing: "border-box",
            }}
          />
        </div>
      </div>

      {/* Footer */}
      <div style={{
        padding: "12px 20px 36px", background: "var(--kd-white)",
        borderTop: "1px solid var(--border)", flexShrink: 0,
      }}>
        <button
          className="kd-btn kd-btn-primary"
          disabled={!canConfirm}
          onClick={handleConfirm}
          style={{
            width: "100%", fontWeight: 700, fontSize: 16, height: 52,
            opacity: canConfirm ? 1 : 0.35,
            transition: "opacity 300ms ease",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          }}
        >
          <Icon name="video" size={18} />
          Confirmar videollamada
        </button>
      </div>
    </div>
  )
}

