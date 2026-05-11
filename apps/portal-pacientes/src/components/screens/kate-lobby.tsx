"use client"

import { useState } from "react"
import { Icon } from "../icon"

interface KateLobbyScreenProps {
  onAccept: () => void
  onCancel: () => void
}

export function KateLobbyScreen({ onAccept, onCancel }: KateLobbyScreenProps) {
  const [accepted, setAccepted] = useState(false)

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "14px 16px",
          display: "flex",
          alignItems: "center",
          gap: 12,
          background: "var(--kd-white)",
          borderBottom: "1px solid var(--border)",
          flexShrink: 0,
        }}
      >
        <button className="kd-btn kd-btn-icon kd-btn-sm kd-btn-ghost" onClick={onCancel}>
          <Icon name="x" size={20} />
        </button>
        <div style={{ fontWeight: 600, fontSize: 15 }}>Asistente IA</div>
      </div>

      {/* Body */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "32px 24px 24px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
        }}
      >
        {/* Kate avatar */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/kate-avatar.png"
          alt="Kate"
          style={{
            width: 88,
            height: 88,
            borderRadius: 24,
            boxShadow: "0 8px 24px rgba(3,0,39,0.18)",
            display: "block",
          }}
        />

        <div style={{ textAlign: "center" }}>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: 26,
              letterSpacing: "-0.02em",
              margin: "0 0 8px",
            }}
          >
            Hola, soy Kate
          </h1>
          <p style={{ fontSize: 15, color: "var(--fg2)", lineHeight: 1.6, margin: 0 }}>
            Tu asistente veterinaria con inteligencia artificial de Kate&nbsp;&amp;&nbsp;Doug
          </p>
        </div>

        {/* Disclaimer card */}
        <div
          style={{
            background: "var(--kd-white)",
            border: "1px solid var(--border)",
            borderRadius: 20,
            padding: "20px",
            width: "100%",
            maxWidth: 400,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 16,
              paddingBottom: 14,
              borderBottom: "1px solid var(--border)",
            }}
          >
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: 10,
                background: "rgba(179,38,30,0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Icon name="alertCircle" size={18} color="#B3261E" />
            </div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#B3261E" }}>
              Aviso importante
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              {
                icon: "stethoscope",
                text: "Kate es una herramienta de orientación general y no reemplaza la consulta con un médico veterinario certificado.",
              },
              {
                icon: "alertCircle",
                text: "Ante cualquier emergencia o síntoma grave, busca atención veterinaria de inmediato.",
              },
              {
                icon: "shield",
                text: "Las respuestas de Kate no constituyen diagnóstico médico ni prescripción de tratamiento.",
              },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 8,
                    background: "var(--kd-lavender)",
                    color: "var(--kd-persian-blue)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    marginTop: 1,
                  }}
                >
                  <Icon name={item.icon} size={14} />
                </div>
                <p style={{ fontSize: 13, color: "var(--fg2)", lineHeight: 1.55, margin: 0 }}>
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Checkbox acceptance */}
        <button
          onClick={() => setAccepted(!accepted)}
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 12,
            background: "none",
            border: "none",
            cursor: "pointer",
            textAlign: "left",
            fontFamily: "var(--font-sans)",
            padding: 0,
            width: "100%",
            maxWidth: 400,
          }}
        >
          <div
            style={{
              width: 22,
              height: 22,
              borderRadius: 6,
              border: accepted ? "none" : "2px solid var(--border)",
              background: accepted ? "var(--kd-persian-blue)" : "var(--kd-white)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              marginTop: 1,
              transition: "all 160ms ease",
            }}
          >
            {accepted && <Icon name="check" size={13} color="#fff" />}
          </div>
          <span style={{ fontSize: 13, color: "var(--fg1)", lineHeight: 1.55 }}>
            Entiendo que Kate es un apoyo informativo y que ante cualquier duda o emergencia debo consultar a un veterinario certificado.
          </span>
        </button>
      </div>

      {/* Footer */}
      <div style={{ padding: "16px 24px 32px", flexShrink: 0 }}>
        <button
          className="kd-btn kd-btn-primary kd-btn-lg kd-btn-block"
          disabled={!accepted}
          onClick={onAccept}
          style={{
            opacity: accepted ? 1 : 0.4,
            transition: "opacity 200ms ease",
          }}
        >
          <Icon name="sparkles" size={18} color={accepted ? "#fff" : "currentColor"} />
          Hablar con Kate
        </button>
      </div>
    </div>
  )
}
