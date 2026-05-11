"use client"

import { useState, useEffect } from "react"
import { VET_INFO } from "@/lib/data"
import { Icon } from "../icon"

interface ChatLobbyScreenProps {
  onJoin: () => void
  onCancel: () => void
}

const STATUS_STEPS = [
  "Conectando con tu veterinaria de cabecera…",
  "Verificando disponibilidad…",
  "Conectando con la doctora…",
]

export function ChatLobbyScreen({ onJoin, onCancel }: ChatLobbyScreenProps) {
  const [connected, setConnected] = useState(false)
  const [statusIndex, setStatusIndex] = useState(0)

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setStatusIndex((i) => {
        if (i < STATUS_STEPS.length - 1) return i + 1
        clearInterval(stepInterval)
        return i
      })
    }, 1400)

    const connectTimer = setTimeout(() => {
      setConnected(true)
    }, 4200)

    return () => {
      clearInterval(stepInterval)
      clearTimeout(connectTimer)
    }
  }, [])

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "var(--bg)",
        zIndex: 100,
        display: "flex",
        flexDirection: "column",
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
        }}
      >
        <button className="kd-btn kd-btn-icon kd-btn-sm kd-btn-ghost" onClick={onCancel}>
          <Icon name="x" size={20} />
        </button>
        <div style={{ fontWeight: 600, fontSize: 15 }}>Consulta por chat</div>
      </div>

      {/* Body */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "32px 24px",
          gap: 0,
        }}
      >
        {/* Avatar with pulse / connected indicator */}
        <div style={{ position: "relative", marginBottom: 28 }}>
          {!connected && (
            <>
              <div
                className="kd-ping"
                style={{
                  position: "absolute",
                  inset: -14,
                  borderRadius: 999,
                  background: "var(--kd-persian-blue)",
                  opacity: 0.15,
                }}
              />
              <div
                className="kd-ping"
                style={{
                  position: "absolute",
                  inset: -6,
                  borderRadius: 999,
                  background: "var(--kd-persian-blue)",
                  opacity: 0.2,
                  animationDelay: "0.4s",
                }}
              />
            </>
          )}
          <div
            style={{
              width: 88,
              height: 88,
              borderRadius: 999,
              background: connected ? "var(--kd-lavender)" : "var(--kd-parchment)",
              color: "var(--kd-persian-blue)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "var(--font-display)",
              fontSize: 34,
              fontWeight: 700,
              border: connected
                ? "3px solid var(--kd-persian-blue)"
                : "3px solid rgba(20,52,203,0.15)",
              transition: "all 400ms var(--ease-soft)",
              position: "relative",
              zIndex: 1,
            }}
          >
            {connected ? VET_INFO.avatar : <Icon name="stethoscope" size={36} color="var(--kd-persian-blue)" />}
          </div>

          {/* Online dot */}
          {connected && (
            <div
              style={{
                position: "absolute",
                bottom: 4,
                right: 4,
                width: 18,
                height: 18,
                borderRadius: 999,
                background: "#22c55e",
                border: "3px solid var(--bg)",
                zIndex: 2,
              }}
            />
          )}
        </div>

        {/* Text */}
        {connected ? (
          <div style={{ textAlign: "center", animation: "kd-slide-up 280ms var(--ease-soft) both" }}>
            <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 6 }}>
              {VET_INFO.name} está lista
            </div>
            <div style={{ fontSize: 14, color: "var(--fg2)", lineHeight: 1.5 }}>
              {VET_INFO.role}
              <br />
              Conectada ahora · responde en ~1 min
            </div>
          </div>
        ) : (
          <div style={{ textAlign: "center" }}>
            <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 8 }}>
              Conectando con tu veterinaria de cabecera
            </div>
            <div
              key={statusIndex}
              style={{
                fontSize: 14,
                color: "var(--fg2)",
                animation: "kd-fade-in 300ms ease both",
              }}
            >
              {STATUS_STEPS[statusIndex]}
            </div>

            {/* Dots loader */}
            <div style={{ display: "flex", gap: 6, justifyContent: "center", marginTop: 20 }}>
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: 999,
                    background: "var(--kd-persian-blue)",
                    animation: `kd-ping 1.2s ease ${i * 0.2}s infinite`,
                    opacity: 0.5,
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Info card */}
        <div
          style={{
            marginTop: 36,
            background: "var(--kd-white)",
            border: "1px solid var(--border)",
            borderRadius: 16,
            padding: "14px 18px",
            width: "100%",
            maxWidth: 360,
            display: "flex",
            gap: 12,
            alignItems: "flex-start",
          }}
        >
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
            }}
          >
            <Icon name="shield" size={18} />
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 2 }}>
              Consulta con veterinaria certificada
            </div>
            <div style={{ fontSize: 12, color: "var(--fg2)", lineHeight: 1.5 }}>
              Todas las consultas quedan registradas en el historial de {" "}
              tu mascota.
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ padding: "0 20px 36px" }}>
        <button
          className="kd-btn kd-btn-primary"
          disabled={!connected}
          onClick={onJoin}
          style={{
            width: "100%",
            fontWeight: 700,
            fontSize: 16,
            height: 52,
            opacity: connected ? 1 : 0.35,
            transition: "opacity 400ms ease",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          <Icon name="message" size={18} color={connected ? "#fff" : "currentColor"} />
          Unirme al chat
        </button>
      </div>
    </div>
  )
}
