"use client"

import { useState } from "react"
import { Icon } from "../icon"
import { ModalPortal } from "../modal-portal"

interface Notification {
  id: string
  type: "vaccine" | "message" | "appointment" | "record" | "plan"
  title: string
  body: string
  time: string
  petName?: string
  unread: boolean
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    type: "vaccine",
    title: "Vacuna próxima",
    body: "Luna tiene su refuerzo séxtuple el 12 de mayo. ¡Ya casi!",
    time: "hace 2 h",
    petName: "Luna",
    unread: true,
  },
  {
    id: "2",
    type: "message",
    title: "Nuevo mensaje",
    body: "La Dra. Martínez respondió tu consulta sobre la dieta de Rocco.",
    time: "hace 5 h",
    petName: "Rocco",
    unread: true,
  },
  {
    id: "3",
    type: "appointment",
    title: "Cita confirmada",
    body: "Tu cita del lunes 11 de mayo a las 10:00 AM fue confirmada.",
    time: "ayer, 4:12 PM",
    unread: false,
  },
  {
    id: "4",
    type: "record",
    title: "Expediente actualizado",
    body: "Se agregaron los resultados del análisis de sangre de Frida.",
    time: "ayer, 11:30 AM",
    petName: "Frida",
    unread: false,
  },
  {
    id: "5",
    type: "plan",
    title: "Plan renovado",
    body: "Tu plan mensual fue renovado exitosamente. Próximo cobro: 1 jun.",
    time: "hace 3 días",
    unread: false,
  },
]

const TYPE_CONFIG: Record<Notification["type"], { icon: string; bg: string; color: string }> = {
  vaccine:     { icon: "syringe",     bg: "#EEF0FF", color: "#1434CB" },
  message:     { icon: "message",     bg: "#E8F5E9", color: "#1F7A4D" },
  appointment: { icon: "calendar",    bg: "#FFF3E0", color: "#B5651D" },
  record:      { icon: "fileText",    bg: "#F3E5F5", color: "#7B1FA2" },
  plan:        { icon: "creditCard",  bg: "#E8F5E9", color: "#1F7A4D" },
}

interface NotificationsScreenProps {
  onClose: () => void
}

export function NotificationsScreen({ onClose }: NotificationsScreenProps) {
  const [items, setItems] = useState(MOCK_NOTIFICATIONS)
  const [hovered, setHovered] = useState<string | null>(null)

  const unreadCount = items.filter((n) => n.unread).length

  const markAllRead = () =>
    setItems((prev) => prev.map((n) => ({ ...n, unread: false })))

  const markRead = (id: string) =>
    setItems((prev) => prev.map((n) => n.id === id ? { ...n, unread: false } : n))

  const today = items.filter((_, i) => i < 2)
  const yesterday = items.filter((_, i) => i >= 2 && i < 4)
  const older = items.filter((_, i) => i >= 4)

  const groups = [
    { label: "Hoy", items: today },
    { label: "Ayer", items: yesterday },
    { label: "Esta semana", items: older },
  ].filter((g) => g.items.length > 0)

  return (
    <ModalPortal>
    <div
      className="kd-notif-backdrop"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 60,
        display: "flex",
        justifyContent: "flex-end",
        background: "rgba(3,0,39,0.35)",
        backdropFilter: "blur(2px)",
        WebkitBackdropFilter: "blur(2px)",
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="kd-slide-in-right"
        style={{
          width: "min(100%, 420px)",
          height: "100%",
          background: "var(--bg)",
          display: "flex",
          flexDirection: "column",
          boxShadow: "-24px 0 48px rgba(3,0,39,0.12)",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "20px 20px 16px",
            borderBottom: "1px solid var(--border)",
            display: "flex",
            alignItems: "center",
            gap: 12,
            background: "var(--bg)",
            flexShrink: 0,
          }}
        >
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontWeight: 700, fontSize: 18 }}>Notificaciones</span>
              {unreadCount > 0 && (
                <span
                  style={{
                    background: "var(--kd-persian-blue)",
                    color: "#fff",
                    fontSize: 11,
                    fontWeight: 700,
                    borderRadius: 999,
                    padding: "1px 7px",
                    lineHeight: "18px",
                  }}
                >
                  {unreadCount}
                </span>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllRead}
                style={{
                  marginTop: 2,
                  fontSize: 12,
                  fontWeight: 600,
                  color: "var(--kd-persian-blue)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                }}
              >
                Marcar todo como leído
              </button>
            )}
          </div>
          <button
            onClick={onClose}
            className="kd-btn kd-btn-icon kd-btn-ghost"
            aria-label="Cerrar"
          >
            <Icon name="x" size={20} />
          </button>
        </div>

        {/* List */}
        <div style={{ flex: 1, overflowY: "auto" }}>
          {groups.map((group) => (
            <div key={group.label}>
              <div
                style={{
                  padding: "14px 20px 6px",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "var(--fg3)",
                }}
              >
                {group.label}
              </div>

              {group.items.map((n) => {
                const cfg = TYPE_CONFIG[n.type]
                const isHovered = hovered === n.id
                return (
                  <button
                    key={n.id}
                    onClick={() => markRead(n.id)}
                    onMouseEnter={() => setHovered(n.id)}
                    onMouseLeave={() => setHovered(null)}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 14,
                      padding: "14px 20px",
                      background: isHovered
                        ? "var(--kd-lavender)"
                        : n.unread
                          ? "var(--bg-soft)"
                          : "transparent",
                      border: "none",
                      borderBottom: "1px solid var(--border)",
                      cursor: "pointer",
                      textAlign: "left",
                      transition: "background 150ms ease",
                      position: "relative",
                    }}
                  >
                    {/* Unread dot */}
                    {n.unread && (
                      <span
                        style={{
                          position: "absolute",
                          left: 6,
                          top: "50%",
                          transform: "translateY(-50%)",
                          width: 6,
                          height: 6,
                          borderRadius: 999,
                          background: "var(--kd-persian-blue)",
                          flexShrink: 0,
                        }}
                      />
                    )}

                    {/* Icon chip */}
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 12,
                        background: cfg.bg,
                        color: cfg.color,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Icon name={cfg.icon} size={18} color={cfg.color} strokeWidth={2} />
                    </div>

                    {/* Text */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          fontSize: 14,
                          fontWeight: n.unread ? 700 : 600,
                          color: "var(--fg1)",
                          marginBottom: 2,
                        }}
                      >
                        {n.title}
                        {n.petName && (
                          <span style={{ fontWeight: 400, color: "var(--fg2)" }}> · {n.petName}</span>
                        )}
                      </div>
                      <div
                        style={{
                          fontSize: 13,
                          color: "var(--fg2)",
                          lineHeight: 1.4,
                          marginBottom: 4,
                          overflow: "hidden",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {n.body}
                      </div>
                      <div style={{ fontSize: 11, color: "var(--fg3)", fontWeight: 500 }}>
                        {n.time}
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          ))}

          {items.every((n) => !n.unread) && (
            <div
              style={{
                padding: "48px 20px",
                textAlign: "center",
                color: "var(--fg3)",
                fontSize: 14,
              }}
            >
              <Icon name="bell" size={32} color="var(--fg3)" style={{ margin: "0 auto 12px", display: "block" }} />
              Todo al día
            </div>
          )}
        </div>
      </div>
    </div>
    </ModalPortal>
  )
}
