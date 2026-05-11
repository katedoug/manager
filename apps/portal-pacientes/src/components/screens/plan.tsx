"use client"

import { Icon } from "../icon"

const BENEFITS = [
  { label: "Consultas en línea", used: 4, total: 12, desc: "Sin costo, 24/7" },
  { label: "Vacunación", used: 2, total: 3, desc: "Aplicación incluida en clínica aliada" },
  { label: "Examen general anual", used: 1, total: 1, desc: "Por mascota" },
  { label: "Limpieza dental", used: 0, total: 1, desc: "Por mascota" },
  { label: "Desparasitación", used: 1, total: 4, desc: "Cada 3 meses" },
]

const PAYMENTS = [
  { date: "12 mar 2026", desc: "Plan Familia · Renovación anual", amount: "$5,499.00" },
  { date: "12 mar 2025", desc: "Plan Familia · Suscripción inicial", amount: "$5,499.00" },
  { date: "10 ene 2025", desc: "Adicional · Limpieza dental Rocco", amount: "$1,290.00" },
]

export function PlanScreen() {
  return (
    <div style={{ paddingBottom: 100 }}>
      <div style={{ padding: "8px 16px 4px" }}>
        <h1 className="kd-h-page" style={{ fontSize: 28 }}>
          Mi plan
        </h1>
      </div>

      {/* Plan card */}
      <div style={{ padding: 16 }}>
        <div
          style={{
            background: "var(--kd-prussian-blue)",
            color: "#fff",
            borderRadius: 24,
            padding: 24,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              right: -30,
              top: -30,
              width: 160,
              height: 160,
              borderRadius: 999,
              background: "radial-gradient(circle, rgba(232,237,255,0.2), transparent 70%)",
            }}
          />
          <div className="kd-eyebrow" style={{ color: "var(--kd-persian-blue-300)" }}>
            Plan activo
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 32,
              fontWeight: 700,
              letterSpacing: "-0.02em",
              margin: "8px 0 4px",
            }}
          >
            Plan Familia
          </h2>
          <div style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", marginBottom: 24 }}>
            3 mascotas · renueva el 12 marzo 2027
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
            <span style={{ fontFamily: "var(--font-display)", fontSize: 36, fontWeight: 700 }}>$5,499</span>
            <span style={{ fontSize: 14, color: "rgba(255,255,255,0.6)" }}>/ año MXN</span>
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 20 }}>
            <button className="kd-btn kd-btn-sm" style={{ background: "#fff", color: "var(--kd-prussian-blue)" }}>
              Cambiar plan
            </button>
            <button className="kd-btn kd-btn-sm" style={{ background: "rgba(255,255,255,0.1)", color: "#fff" }}>
              Pausar
            </button>
          </div>
        </div>
      </div>

      {/* Beneficios */}
      <div style={{ padding: "8px 16px" }}>
        <h3 className="kd-h-section" style={{ marginBottom: 12 }}>
          Tus beneficios este año
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {BENEFITS.map((b) => {
            const pct = (b.used / b.total) * 100
            return (
              <div key={b.label} className="kd-card" style={{ padding: 14 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "space-between",
                    marginBottom: 8,
                  }}
                >
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>{b.label}</div>
                    <div style={{ fontSize: 12, color: "var(--fg2)" }}>{b.desc}</div>
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: 18,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {b.used}
                    <span style={{ color: "var(--fg3)", fontWeight: 500 }}>/{b.total}</span>
                  </div>
                </div>
                <div className="kd-progress">
                  <div className="kd-progress-bar" style={{ width: pct + "%" }} />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Método de pago */}
      <div style={{ padding: "24px 16px 8px" }}>
        <h3 className="kd-h-section" style={{ marginBottom: 12 }}>
          Método de pago
        </h3>
        <div className="kd-card" style={{ padding: 16, display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 52,
              height: 36,
              borderRadius: 6,
              background: "linear-gradient(135deg, #635BFF, #4A40E8)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "-0.01em",
            }}
          >
            stripe
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 600 }}>Visa ·· 4242</div>
            <div style={{ fontSize: 12, color: "var(--fg2)" }}>Vence 09/28</div>
          </div>
          <button className="kd-btn kd-btn-sm kd-btn-secondary">Cambiar</button>
        </div>
      </div>

      {/* Historial de pagos */}
      <div style={{ padding: "16px" }}>
        <h3 className="kd-h-section" style={{ marginBottom: 12 }}>
          Historial de pagos
        </h3>
        <div className="kd-card" style={{ padding: 0, overflow: "hidden" }}>
          {PAYMENTS.map((p, i, arr) => (
            <div
              key={i}
              style={{
                padding: "14px 16px",
                display: "flex",
                alignItems: "center",
                gap: 12,
                borderBottom: i < arr.length - 1 ? "1px solid var(--border)" : 0,
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{p.desc}</div>
                <div style={{ fontSize: 11, color: "var(--fg2)" }}>{p.date}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 14, fontWeight: 600, fontFamily: "var(--font-mono)" }}>
                  {p.amount}
                </div>
                <span className="kd-chip kd-chip-success kd-chip-sm">Pagado</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
