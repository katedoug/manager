"use client"

import { useState, useEffect, useRef } from "react"
import { Pet, TUTOR_DATA } from "@/lib/data"
import { Icon } from "./icon"

interface MobileBarProps {
  pets: Pet[]
  activePetId: string
  onSelect: (id: string) => void
  onAddPet: () => void
  onNotifications: () => void
  onAccount: () => void
}

export function MobileBar({ pets, activePetId, onSelect, onAddPet, onNotifications, onAccount }: MobileBarProps) {
  const [open, setOpen] = useState(false)
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  const pet = pets.find((p) => p.id === activePetId) || pets[0]

  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [open])

  return (
    <div
      ref={ref}
      style={{
        position: "sticky",
        top: 0,
        zIndex: 40,
        background: "rgba(245,242,236,0.88)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      {/* Header row */}
      <div style={{ padding: "14px 16px", display: "flex", alignItems: "center", gap: 12 }}>
        <button
          onClick={() => setOpen((v) => !v)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            flex: 1,
            minWidth: 0,
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
            textAlign: "left",
          }}
        >
          <PetAvatar pet={pet} size={36} />
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 11, color: "var(--fg2)", fontWeight: 500 }}>Estás viendo</div>
            <div style={{ display: "flex", alignItems: "center", gap: 4, fontWeight: 600, fontSize: 15, color: "var(--fg1)" }}>
              <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{pet.name}</span>
              <span
                style={{
                  display: "inline-flex",
                  transition: "transform 200ms ease",
                  transform: open ? "rotate(180deg)" : "rotate(0deg)",
                  color: "var(--fg2)",
                }}
              >
                <Icon name="chevronDown" size={16} />
              </span>
            </div>
          </div>
        </button>

        <button
          className="kd-btn kd-btn-icon kd-btn-ghost"
          onClick={onNotifications}
          aria-label="Notificaciones"
          style={{ position: "relative", flexShrink: 0 }}
        >
          <Icon name="bell" size={20} />
          <span
            style={{
              position: "absolute",
              top: 8,
              right: 8,
              width: 8,
              height: 8,
              background: "var(--kd-persian-blue)",
              borderRadius: 999,
            }}
          />
        </button>
        <button
          onClick={onAccount}
          aria-label="Mi cuenta"
          style={{
            width: 34,
            height: 34,
            borderRadius: 999,
            background: TUTOR_DATA.color + "20",
            color: TUTOR_DATA.color,
            fontSize: 14,
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            border: "none",
            cursor: "pointer",
          }}
        >
          {TUTOR_DATA.initial}
        </button>
      </div>

      {/* Dropdown */}
      {open && (
        <div
          className="kd-dropdown"
          style={{
            position: "absolute",
            top: "calc(100% + 6px)",
            left: 16,
            width: 268,
            background: "var(--kd-white)",
            borderRadius: 16,
            boxShadow: "0 16px 48px rgba(3,0,39,0.14), 0 2px 8px rgba(3,0,39,0.06)",
            border: "1px solid var(--border)",
            overflow: "hidden",
            zIndex: 50,
          }}
        >
          {pets.map((p, i) => (
            <button
              key={p.id}
              onClick={() => { onSelect(p.id); setOpen(false) }}
              onMouseEnter={() => setHoveredId(p.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "12px 16px",
                background: hoveredId === p.id
                  ? "rgba(20,52,203,0.07)"
                  : p.id === activePetId
                    ? "var(--kd-lavender)"
                    : "none",
                border: "none",
                borderBottom: i < pets.length - 1 ? "1px solid var(--border)" : "none",
                cursor: "pointer",
                textAlign: "left",
                transition: "background 150ms ease",
              }}
            >
              <PetAvatar pet={p} size={40} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 600, fontSize: 14, color: "var(--fg1)" }}>{p.name}</div>
                <div style={{ fontSize: 12, color: "var(--fg2)" }}>{p.breed} · {p.age}</div>
              </div>
              {p.id === activePetId && (
                <Icon name="check" size={18} color="var(--kd-persian-blue)" />
              )}
            </button>
          ))}

          {/* Divider + add */}
          <button
            onClick={() => { onAddPet(); setOpen(false) }}
            onMouseEnter={() => setHoveredId("__add")}
            onMouseLeave={() => setHoveredId(null)}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "12px 16px",
              background: hoveredId === "__add" ? "rgba(20,52,203,0.07)" : "none",
              border: "none",
              borderTop: "1px solid var(--border)",
              cursor: "pointer",
              color: "var(--kd-persian-blue)",
              fontWeight: 600,
              fontSize: 14,
              transition: "background 150ms ease",
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 999,
                background: "var(--kd-lavender)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Icon name="plus" size={20} color="var(--kd-persian-blue)" />
            </div>
            Agregar mascota
          </button>
        </div>
      )}
    </div>
  )
}

function PetAvatar({ pet, size }: { pet: Pet; size: number }) {
  if (pet.species === "Perro") {
    return (
      <img
        src="/avatars/dog.svg"
        alt={pet.name}
        style={{ width: size, height: size, borderRadius: 999, objectFit: "cover", flexShrink: 0 }}
      />
    )
  }
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: 999,
        background: pet.color + "20",
        color: pet.color,
        fontWeight: 700,
        fontSize: Math.round(size * 0.39),
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      {pet.initial}
    </div>
  )
}
