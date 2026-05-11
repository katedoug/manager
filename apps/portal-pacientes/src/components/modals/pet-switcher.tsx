"use client"

import { Pet } from "@/lib/data"
import { Icon } from "../icon"

interface PetSwitcherModalProps {
  pets: Pet[]
  activePetId: string
  onSelect: (id: string) => void
  onClose: () => void
}

export function PetSwitcherModal({ pets, activePetId, onSelect, onClose }: PetSwitcherModalProps) {
  return (
    <div className="kd-modal-backdrop" onClick={onClose}>
      <div className="kd-modal" onClick={(e) => e.stopPropagation()} style={{ padding: 20 }}>
        <h3 className="kd-h-section" style={{ marginBottom: 14 }}>
          Cambiar mascota activa
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {pets.map((p) => (
            <button
              key={p.id}
              onClick={() => onSelect(p.id)}
              className="kd-card"
              style={{
                padding: 12,
                display: "flex",
                alignItems: "center",
                gap: 12,
                textAlign: "left",
                borderColor: p.id === activePetId ? "var(--kd-persian-blue)" : "var(--border)",
                borderWidth: p.id === activePetId ? 2 : 1,
              }}
            >
              <img
                src={p.image}
                alt={p.name}
                style={{ width: 44, height: 44, borderRadius: 999, objectFit: "cover" }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600 }}>{p.name}</div>
                <div style={{ fontSize: 12, color: "var(--fg2)" }}>
                  {p.breed} · {p.age}
                </div>
              </div>
              {p.id === activePetId && <Icon name="check" size={20} color="var(--kd-persian-blue)" />}
            </button>
          ))}
        </div>
        <button
          className="kd-btn kd-btn-ghost kd-btn-block"
          style={{ marginTop: 12 }}
          onClick={onClose}
        >
          Cancelar
        </button>
      </div>
    </div>
  )
}
