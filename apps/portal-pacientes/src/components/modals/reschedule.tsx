"use client"

import { useState, useEffect } from "react"
import { Icon } from "../icon"
import { ModalPortal } from "../modal-portal"
import { VET_INFO } from "@/lib/data"

const DAY_NAMES = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"]
const MONTH_NAMES = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"]

const TIME_SLOTS = [
  { time: "09:00", available: true  },
  { time: "09:30", available: false },
  { time: "10:00", available: true  },
  { time: "10:30", available: true  },
  { time: "11:00", available: false },
  { time: "11:30", available: true  },
  { time: "14:00", available: true  },
  { time: "14:30", available: true  },
  { time: "15:00", available: false },
  { time: "15:30", available: true  },
  { time: "16:00", available: true  },
  { time: "16:30", available: false },
]

function getNextDays(n: number): Date[] {
  return Array.from({ length: n }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() + i + 1)
    return d
  })
}

interface RescheduleModalProps {
  onClose: () => void
}

export function RescheduleModal({ onClose }: RescheduleModalProps) {
  const days = getNextDays(14)
  const [selectedDay, setSelectedDay] = useState<Date>(days[1])
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [slotsLoading, setSlotsLoading] = useState(false)
  const [confirmed, setConfirmed] = useState(false)

  useEffect(() => {
    setSlotsLoading(true)
    setSelectedTime(null)
    const t = setTimeout(() => setSlotsLoading(false), 800)
    return () => clearTimeout(t)
  }, [selectedDay])

  function handleConfirm() {
    setConfirmed(true)
    setTimeout(onClose, 2000)
  }

  if (confirmed) {
    return (
      <ModalPortal>
        <div className="kd-modal-backdrop" onClick={onClose}>
          <div
            className="kd-modal"
            onClick={(e) => e.stopPropagation()}
            style={{ padding: "40px 24px", textAlign: "center" }}
          >
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: 999,
                background: "var(--kd-lavender)",
                color: "var(--kd-persian-blue)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px",
              }}
            >
              <Icon name="checkCircle" size={32} color="var(--kd-persian-blue)" />
            </div>
            <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 8 }}>
              ¡Cita reagendada!
            </div>
            <div style={{ fontSize: 14, color: "var(--fg2)", lineHeight: 1.5 }}>
              {DAY_NAMES[selectedDay.getDay()]} {selectedDay.getDate()} de{" "}
              {MONTH_NAMES[selectedDay.getMonth()]} · {selectedTime}
              <br />
              con {VET_INFO.name}
            </div>
          </div>
        </div>
      </ModalPortal>
    )
  }

  return (
    <ModalPortal>
      <div className="kd-modal-backdrop" onClick={onClose}>
        <div
          className="kd-modal"
          onClick={(e) => e.stopPropagation()}
          style={{ padding: 0 }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "20px 20px 16px",
              borderBottom: "1px solid var(--border)",
            }}
          >
            <div>
              <div style={{ fontWeight: 700, fontSize: 17 }}>Reagendar cita</div>
              <div style={{ fontSize: 12, color: "var(--fg2)", marginTop: 2 }}>
                Consulta de seguimiento · con {VET_INFO.name}
              </div>
            </div>
            <button className="kd-btn kd-btn-icon kd-btn-ghost" onClick={onClose}>
              <Icon name="x" size={20} />
            </button>
          </div>

          {/* Date strip */}
          <div style={{ padding: "16px 0 0" }}>
            <div style={{ padding: "0 20px 10px", fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: "var(--fg3)" }}>
              Selecciona fecha
            </div>
            <div style={{ overflowX: "auto", overflowY: "hidden", WebkitOverflowScrolling: "touch" } as React.CSSProperties}>
            <div style={{ display: "flex", gap: 8, padding: "4px 20px 16px", width: "max-content" }}>
              {days.map((d, i) => {
                const isSelected = d.toDateString() === selectedDay.toDateString()
                return (
                  <button
                    key={i}
                    onClick={() => { setSelectedDay(d); setSelectedTime(null) }}
                    style={{
                      flexShrink: 0,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 4,
                      width: 52,
                      padding: "10px 0",
                      borderRadius: 14,
                      border: isSelected ? "none" : "1px solid var(--border)",
                      background: isSelected ? "var(--kd-persian-blue)" : "var(--kd-white)",
                      color: isSelected ? "#fff" : "var(--fg1)",
                      cursor: "pointer",
                    }}
                  >
                    <span style={{ fontSize: 11, fontWeight: 600, opacity: isSelected ? 0.75 : 1, color: isSelected ? "#fff" : "var(--fg3)" }}>
                      {DAY_NAMES[d.getDay()]}
                    </span>
                    <span style={{ fontSize: 18, fontWeight: 700, lineHeight: 1 }}>
                      {d.getDate()}
                    </span>
                    <span style={{ fontSize: 10, opacity: isSelected ? 0.7 : 0.5 }}>
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
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: "var(--fg3)", marginBottom: 12 }}>
              Horarios disponibles
            </div>
            {slotsLoading ? (
              <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "16px 0", color: "var(--fg3)", fontSize: 13 }}>
                <div className="kd-spinner" style={{ width: 16, height: 16, flexShrink: 0 }} />
                Obteniendo horarios…
              </div>
            ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
              {TIME_SLOTS.map((slot) => {
                const isSelected = selectedTime === slot.time
                return (
                  <button
                    key={slot.time}
                    disabled={!slot.available}
                    onClick={() => setSelectedTime(slot.time)}
                    style={{
                      height: 40,
                      borderRadius: 10,
                      border: isSelected ? "none" : "1px solid var(--border)",
                      background: isSelected
                        ? "var(--kd-persian-blue)"
                        : slot.available
                          ? "var(--kd-white)"
                          : "var(--bg-soft)",
                      color: isSelected
                        ? "#fff"
                        : slot.available
                          ? "var(--fg1)"
                          : "var(--fg3)",
                      fontSize: 13,
                      fontWeight: 600,
                      fontFamily: "var(--font-mono)",
                      cursor: slot.available ? "pointer" : "not-allowed",
                      opacity: slot.available ? 1 : 0.45,
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

          {/* Footer */}
          <div style={{ padding: "0 20px 20px", borderTop: "1px solid var(--border)", paddingTop: 12, display: "flex", flexDirection: "column", gap: 8 }}>
            <button
              className="kd-btn kd-btn-primary"
              disabled={!selectedTime}
              onClick={handleConfirm}
              style={{ width: "100%", fontWeight: 700, opacity: selectedTime ? 1 : 0.4 }}
            >
              Confirmar reagenda
            </button>
            <button
              className="kd-btn"
              onClick={onClose}
              style={{ width: "100%", fontWeight: 700, color: "#dc2626", background: "rgba(220,38,38,0.08)", border: "none" }}
            >
              Cancelar cita
            </button>
          </div>
        </div>
      </div>
    </ModalPortal>
  )
}
