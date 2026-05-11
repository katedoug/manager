"use client"

import { useState } from "react"
import { Icon } from "../icon"
import { ModalPortal } from "../modal-portal"
import { PLAN_INFO } from "@/lib/data"

const ALL_BENEFITS = [
  { id: "consultas", label: "Consultas físicas",  used: 4,  total: 12, icon: "stethoscope" },
  { id: "vacunas",   label: "Vacunas",            used: 2,  total: 3,  icon: "syringe"     },
  { id: "examenes",  label: "Exámenes",           used: 1,  total: 2,  icon: "fileText"    },
  { id: "desparas",  label: "Desparasitación",    used: 0,  total: 1,  icon: "pill"        },
  { id: "dental",    label: "Limpieza dental",    used: 0,  total: 1,  icon: "smile"       },
]

interface BenefitsModalProps {
  onClose: () => void
}

export function BenefitsModal({ onClose }: BenefitsModalProps) {
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <ModalPortal>
    <div className="kd-modal-backdrop" onClick={onClose}>
      <div
        className="kd-modal"
        onClick={(e) => e.stopPropagation()}
        style={{ padding: 0, overflow: "hidden" }}
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
            <div style={{ fontWeight: 700, fontSize: 17 }}>{PLAN_INFO.name}</div>
            <div style={{ fontSize: 12, color: "var(--fg2)", marginTop: 2 }}>
              Servicios disponibles este ciclo
            </div>
          </div>
          <button className="kd-btn kd-btn-icon kd-btn-ghost" onClick={onClose}>
            <Icon name="x" size={20} />
          </button>
        </div>

        {/* List */}
        <div style={{ padding: "8px 0 8px" }}>
          {ALL_BENEFITS.map((b) => {
            const pct = Math.round((b.used / b.total) * 100)
            const remaining = b.total - b.used
            const isHovered = hovered === b.id
            return (
              <div
                key={b.id}
                onMouseEnter={() => setHovered(b.id)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  padding: "14px 20px",
                  background: isHovered ? "var(--kd-lavender)" : "transparent",
                  transition: "background 150ms ease",
                }}
              >
                {/* Icon chip */}
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 12,
                    background: remaining > 0 ? "var(--kd-lavender)" : "var(--border)",
                    color: remaining > 0 ? "var(--kd-persian-blue)" : "var(--fg3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Icon name={b.icon} size={18} />
                </div>

                {/* Text + bar */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}>
                    <span style={{ fontSize: 14, fontWeight: 600 }}>{b.label}</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: remaining > 0 ? "var(--kd-persian-blue)" : "var(--fg3)" }}>
                      {remaining > 0
                        ? <>{remaining} <span style={{ fontWeight: 400, color: "var(--fg3)" }}>disponible{remaining !== 1 ? "s" : ""}</span></>
                        : "Agotado"}
                    </span>
                  </div>
                  <div
                    style={{
                      height: 5,
                      borderRadius: 999,
                      background: "var(--border)",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: pct + "%",
                        borderRadius: 999,
                        background: pct >= 100 ? "var(--fg3)" : "var(--kd-persian-blue)",
                        transition: "width 400ms var(--ease-soft)",
                      }}
                    />
                  </div>
                  <div style={{ fontSize: 11, color: "var(--fg3)", marginTop: 4 }}>
                    {b.used} de {b.total} usado{b.used !== 1 ? "s" : ""}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Footer */}
        <div style={{ padding: "12px 20px 20px", borderTop: "1px solid var(--border)", display: "flex", flexDirection: "column", gap: 8 }}>
          <button className="kd-btn kd-btn-primary" style={{ width: "100%", fontWeight: 700 }}>
            Mejorar plan
          </button>
          <button className="kd-btn kd-btn-secondary" style={{ width: "100%", fontWeight: 700 }}>
            Adquirir servicios adicionales
          </button>
        </div>
      </div>
    </div>
    </ModalPortal>
  )
}
