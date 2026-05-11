"use client"

import { Icon } from "../icon"
import { ModalPortal } from "../modal-portal"

export interface ActivityItem {
  date: string
  title: string
  sub: string
  icon: string
  diagnostico: string
  receta?: string
  fotos?: string[]
}

interface ActivityDetailModalProps {
  item: ActivityItem
  onClose: () => void
}

export function ActivityDetailModal({ item, onClose }: ActivityDetailModalProps) {
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
            alignItems: "flex-start",
            gap: 12,
            padding: "20px 20px 16px",
            borderBottom: "1px solid var(--border)",
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
              flexShrink: 0,
            }}
          >
            <Icon name={item.icon} size={20} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: 700, fontSize: 16, lineHeight: 1.2 }}>{item.title}</div>
            <div style={{ fontSize: 12, color: "var(--fg2)", marginTop: 3 }}>
              {item.sub} · {item.date}
            </div>
          </div>
          <button className="kd-btn kd-btn-icon kd-btn-ghost" onClick={onClose} style={{ flexShrink: 0 }}>
            <Icon name="x" size={20} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: 20 }}>

          {/* Diagnóstico */}
          <div>
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.07em",
                textTransform: "uppercase",
                color: "var(--fg3)",
                marginBottom: 8,
              }}
            >
              Diagnóstico
            </div>
            <div
              style={{
                background: "var(--bg-soft)",
                borderRadius: 12,
                padding: "12px 14px",
                fontSize: 14,
                lineHeight: 1.6,
                color: "var(--fg1)",
              }}
            >
              {item.diagnostico}
            </div>
          </div>

          {/* Receta */}
          {item.receta && (
            <div>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.07em",
                  textTransform: "uppercase",
                  color: "var(--fg3)",
                  marginBottom: 8,
                }}
              >
                Receta
              </div>
              <div
                style={{
                  background: "var(--bg-soft)",
                  borderRadius: 12,
                  padding: "12px 14px",
                  fontSize: 14,
                  lineHeight: 1.6,
                  color: "var(--fg1)",
                  display: "flex",
                  gap: 10,
                  alignItems: "flex-start",
                }}
              >
                <Icon name="pill" size={16} color="var(--kd-persian-blue)" style={{ marginTop: 2, flexShrink: 0 }} />
                <span>{item.receta}</span>
              </div>
            </div>
          )}

          {/* Fotos */}
          {item.fotos && item.fotos.length > 0 && (
            <div>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.07em",
                  textTransform: "uppercase",
                  color: "var(--fg3)",
                  marginBottom: 8,
                }}
              >
                Fotos
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
                {item.fotos.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`Foto ${i + 1}`}
                    style={{
                      width: "100%",
                      aspectRatio: "1",
                      objectFit: "cover",
                      borderRadius: 10,
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ padding: "0 20px 20px", display: "flex", flexDirection: "column", gap: 8 }}>
          <button className="kd-btn kd-btn-secondary" style={{ width: "100%", fontWeight: 700 }}>
            <Icon name="download" size={16} />
            Descargar diagnóstico
          </button>
          {item.receta && (
            <button className="kd-btn kd-btn-secondary" style={{ width: "100%", fontWeight: 700 }}>
              <Icon name="download" size={16} />
              Descargar receta
            </button>
          )}
        </div>
      </div>
    </div>
    </ModalPortal>
  )
}
