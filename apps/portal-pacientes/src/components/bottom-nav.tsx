"use client"

import { Icon } from "./icon"

type View = "home" | "pets" | "book" | "history" | "plan"

interface BottomNavProps {
  active: View
  onChange: (v: View) => void
}

const ITEMS: { id: View; label: string; icon: string; primary?: boolean }[] = [
  { id: "home", label: "Inicio", icon: "home" },
  { id: "pets", label: "Mascotas", icon: "paw" },
  { id: "book", label: "Agendar", icon: "plus", primary: true },
  { id: "history", label: "Historial", icon: "fileText" },
  { id: "plan", label: "Mi plan", icon: "shield" },
]

export function BottomNav({ active, onChange }: BottomNavProps) {
  return (
    <div className="kd-bottomnav">
      {ITEMS.map((it) => (
        <button
          key={it.id}
          className={"kd-bottomnav-item " + (active === it.id ? "is-active" : "")}
          onClick={() => onChange(it.id)}
        >
          {it.primary ? (
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 999,
                background: "var(--kd-persian-blue)",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: -16,
                boxShadow: "0 4px 14px rgba(20,52,203,0.35)",
              }}
            >
              <Icon name="plus" size={22} />
            </div>
          ) : (
            <Icon name={it.icon} size={22} />
          )}
          <span>{it.label}</span>
        </button>
      ))}
    </div>
  )
}
