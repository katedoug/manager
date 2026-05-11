"use client"

import { useState } from "react"
import { Pet } from "@/lib/data"
import { Icon } from "../icon"

interface PetsScreenProps {
  pet: Pet
  allPets: Pet[]
  onSelectPet: (id: string) => void
  onAddPet: () => void
}

type Tab = "overview" | "records" | "vaccines" | "rx"

interface PetEvent {
  icon: string
  iconColor: string
  bgColor: string
  title: string
  sub: string
  type: string
  date: string
  clinic: string | null
  vet: string | null
  notes: string
  status: "pending" | "recommended"
  chip: { label: string; color: string; bg: string }
}

export function PetsScreen({ pet, allPets, onSelectPet, onAddPet }: PetsScreenProps) {
  const [tab, setTab] = useState<Tab>("overview")
  const [selectedEvent, setSelectedEvent] = useState<PetEvent | null>(null)

  const petEvents: PetEvent[] = [
    {
      icon: "syringe", iconColor: "var(--kd-persian-blue)", bgColor: "var(--kd-lavender)",
      title: "Vacuna programada", sub: pet.nextVaccine,
      type: "Vacuna", date: pet.nextVaccine,
      clinic: "Kate & Doug San Ángel", vet: "Dra. Mariana García",
      notes: "Séxtuple anual. Llevar cartilla de vacunación actualizada. Evitar baño 48h antes.",
      status: "pending",
      chip: { label: "Pendiente", color: "var(--status-warning)", bg: "rgba(181,101,29,0.10)" },
    },
    {
      icon: "stethoscope", iconColor: "var(--kd-onyx)", bgColor: "var(--kd-parchment)",
      title: "Examen anual", sub: "Recomendado en julio 2026",
      type: "Consulta", date: "julio 2026",
      clinic: null, vet: null,
      notes: "Examen general de salud anual recomendado para mantener el historial actualizado y detectar cambios a tiempo.",
      status: "recommended",
      chip: { label: "Recomendado", color: "var(--kd-persian-blue)", bg: "var(--kd-lavender)" },
    },
  ]

  return (
    <div style={{ paddingBottom: 100 }}>
      <div style={{ padding: "8px 16px 4px" }}>
        <h1 className="kd-h-page" style={{ fontSize: 28 }}>
          Mis peluditos
        </h1>
      </div>

      {/* Pet selector horizontal */}
      <div style={{ padding: "12px 16px", overflowX: "auto", WebkitOverflowScrolling: "touch" as never }}>
        <div style={{ display: "flex", gap: 10, paddingBottom: 4 }}>
          {allPets.map((p) => {
            const active = p.id === pet.id
            return (
              <button
                key={p.id}
                onClick={() => onSelectPet(p.id)}
                style={{
                  minWidth: 110,
                  padding: 12,
                  borderRadius: 16,
                  background: active ? "var(--kd-prussian-blue)" : "var(--kd-white)",
                  border: "1px solid " + (active ? "var(--kd-prussian-blue)" : "var(--border)"),
                  color: active ? "#fff" : "var(--fg1)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: 8,
                  textAlign: "left",
                }}
              >
                <div
                  className="kd-avatar"
                  style={{
                    background: active ? "rgba(255,255,255,0.15)" : p.color + "20",
                    color: active ? "#fff" : p.color,
                  }}
                >
                  {p.initial}
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{p.name}</div>
                  <div style={{ fontSize: 11, color: active ? "rgba(255,255,255,0.6)" : "var(--fg2)" }}>
                    {p.breed}
                  </div>
                </div>
              </button>
            )
          })}
          <button
            onClick={onAddPet}
            style={{
              minWidth: 110,
              padding: 12,
              borderRadius: 16,
              background: "transparent",
              border: "1.5px dashed var(--border)",
              color: "var(--fg2)",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 8,
              textAlign: "left",
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 999,
                background: "var(--kd-parchment)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon name="plus" size={20} />
            </div>
            <div style={{ fontSize: 13, fontWeight: 600 }}>
              Agregar
              <br />
              mascota
            </div>
          </button>
        </div>
      </div>

      {/* Pet hero card */}
      <div style={{ padding: "4px 16px 16px" }}>
        <div className="kd-card" style={{ padding: 0, overflow: "hidden" }}>
          <div
            style={{
              height: 140,
              background: `linear-gradient(135deg, ${pet.color}40, ${pet.color}10)`,
              position: "relative",
            }}
          >
            <img
              src={pet.image}
              alt={pet.name}
              style={{
                position: "absolute",
                bottom: -30,
                left: 20,
                width: 90,
                height: 90,
                borderRadius: 999,
                objectFit: "cover",
                border: "4px solid #fff",
                boxShadow: "var(--shadow-md)",
              }}
            />
          </div>
          <div style={{ padding: "40px 20px 16px" }}>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 28,
                fontWeight: 700,
                letterSpacing: "-0.02em",
                margin: 0,
              }}
            >
              {pet.name}
            </h2>
            <div style={{ fontSize: 13, color: "var(--fg2)", marginTop: 2 }}>
              {pet.breed} · {pet.sex} · {pet.age}
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
              <button className="kd-btn kd-btn-secondary kd-btn-sm">
                <Icon name="download" size={14} /> Expediente PDF
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ padding: "0 16px" }}>
        <div className="kd-tabs" style={{ borderBottom: "1px solid var(--border)" }}>
          {(
            [
              { id: "overview", label: "Resumen" },
              { id: "records", label: "Expediente" },
              { id: "vaccines", label: "Vacunas" },
              { id: "rx", label: "Recetas" },
            ] as { id: Tab; label: string }[]
          ).map((t) => (
            <button
              key={t.id}
              className={"kd-tab " + (tab === t.id ? "is-active" : "")}
              onClick={() => setTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      {tab === "overview" && (
        <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
          <div className="kd-card" style={{ padding: 16 }}>
            <h4 className="kd-h-card" style={{ marginBottom: 12 }}>
              Datos básicos
            </h4>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {(
                [
                  ["Especie", pet.species],
                  ["Raza", pet.breed],
                  ["Sexo", pet.sex],
                  ["Edad", pet.age],
                  ["Peso", pet.weight],
                  ["Microchip", pet.chip.split(" ").slice(-1)[0]],
                ] as [string, string][]
              ).map(([k, v]) => (
                <div key={k}>
                  <div
                    style={{
                      fontSize: 11,
                      color: "var(--fg3)",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      fontWeight: 600,
                    }}
                  >
                    {k}
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 500, marginTop: 2 }}>{v}</div>
                </div>
              ))}
            </div>
          </div>

          {pet.conditions.length > 0 && (
            <div className="kd-card" style={{ padding: 16 }}>
              <h4 className="kd-h-card" style={{ marginBottom: 12 }}>
                Condiciones
              </h4>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {pet.conditions.map((c) => (
                  <span key={c} className="kd-chip kd-chip-warning">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="kd-card" style={{ padding: 16 }}>
            <h4 className="kd-h-card" style={{ marginBottom: 12 }}>
              Próximos eventos
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {petEvents.map((ev) => (
                <button
                  key={ev.title}
                  onClick={() => setSelectedEvent(ev)}
                  style={{
                    display: "flex", alignItems: "center", gap: 12,
                    padding: "10px 12px",
                    borderRadius: 14,
                    background: "var(--bg)",
                    border: "1px solid var(--border)",
                    cursor: "pointer", textAlign: "left", width: "100%",
                    transition: "background 150ms ease",
                  }}
                >
                  <div style={{ width: 36, height: 36, borderRadius: 999, background: ev.bgColor, color: ev.iconColor, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon name={ev.icon} size={18} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "var(--fg1)" }}>{ev.title}</div>
                    <div style={{ fontSize: 12, color: "var(--fg2)" }}>{ev.sub}</div>
                  </div>
                  <Icon name="chevronRight" size={16} color="var(--fg3)" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === "records" && (
        <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            { date: "24 abr 2026", title: "Análisis de sangre completo", vet: "Dra. Mariana García", icon: "fileText", color: "var(--kd-lavender)" },
            { date: "12 abr 2026", title: "Nota de consulta · Tos seca", vet: "Dra. Mariana García", icon: "fileText", color: "var(--kd-parchment)" },
            { date: "02 abr 2026", title: "Examen general anual", vet: "Dr. Ramírez · Clínica San Ángel", icon: "stethoscope", color: "#DDF1E6" },
            { date: "15 ene 2026", title: "Limpieza dental", vet: "Dr. Ramírez · Clínica San Ángel", icon: "smile", color: "#FBEDDB" },
          ].map((r, i) => (
            <div key={i} className="kd-card kd-card-hover" style={{ padding: 14, display: "flex", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: r.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon name={r.icon} size={20} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{r.title}</div>
                <div style={{ fontSize: 12, color: "var(--fg2)" }}>
                  {r.vet} · {r.date}
                </div>
              </div>
              <Icon name="chevronRight" size={18} color="var(--fg3)" />
            </div>
          ))}
        </div>
      )}

      {tab === "vaccines" && (
        <div style={{ padding: 16 }}>
          <div className="kd-card" style={{ padding: 0, overflow: "hidden" }}>
            {[
              { name: "Séxtuple", date: "12 may 2026", status: "pending" },
              { name: "Antirrábica", date: "10 jun 2025", status: "done" },
              { name: "Bordetella", date: "08 mar 2025", status: "done" },
              { name: "Desparasitación", date: "05 feb 2026", status: "done" },
            ].map((v, i, arr) => (
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
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 999,
                    background: v.status === "done" ? "#DDF1E6" : "var(--kd-lavender)",
                    color: v.status === "done" ? "var(--status-success)" : "var(--kd-persian-blue)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon name={v.status === "done" ? "check" : "clock"} size={18} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{v.name}</div>
                  <div style={{ fontSize: 12, color: "var(--fg2)" }}>{v.date}</div>
                </div>
                {v.status === "pending" ? (
                  <span className="kd-chip kd-chip-warning">Pendiente</span>
                ) : (
                  <span className="kd-chip kd-chip-success">Aplicada</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "rx" && (
        <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            { name: "Bravecto 500mg", dose: "1 tableta cada 3 meses", vet: "Dra. Mariana García", date: "24 abr 2026" },
            { name: "Apoquel 5.4mg", dose: "1 tableta diaria · 14 días", vet: "Dra. Mariana García", date: "12 abr 2026" },
          ].map((r, i) => (
            <div key={i} className="kd-card" style={{ padding: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700 }}>{r.name}</div>
                  <div style={{ fontSize: 13, color: "var(--fg2)", marginTop: 2 }}>{r.dose}</div>
                </div>
                <button className="kd-btn kd-btn-icon kd-btn-sm kd-btn-ghost">
                  <Icon name="download" size={16} />
                </button>
              </div>
              <div
                style={{
                  marginTop: 10,
                  paddingTop: 10,
                  borderTop: "1px solid var(--border)",
                  fontSize: 12,
                  color: "var(--fg2)",
                }}
              >
                {r.vet} · {r.date}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Event detail modal */}
      {selectedEvent && (
        <div className="kd-modal-backdrop" onClick={() => setSelectedEvent(null)}>
          <div className="kd-modal" style={{ padding: 0, overflow: "hidden" }} onClick={(e) => e.stopPropagation()}>
            {/* Header strip */}
            <div style={{ padding: "20px 20px 16px", background: selectedEvent.bgColor, display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 48, height: 48, borderRadius: 999, background: "rgba(255,255,255,0.55)", color: selectedEvent.iconColor, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon name={selectedEvent.icon} size={22} color={selectedEvent.iconColor} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 17, fontWeight: 700, color: "var(--fg1)" }}>{selectedEvent.title}</div>
                <span style={{ fontSize: 11, fontWeight: 700, color: selectedEvent.chip.color, background: selectedEvent.chip.bg, borderRadius: 99, padding: "2px 8px" }}>
                  {selectedEvent.chip.label}
                </span>
              </div>
              <button onClick={() => setSelectedEvent(null)} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, color: "var(--fg3)" }}>
                <Icon name="x" size={20} />
              </button>
            </div>

            {/* Detail rows */}
            <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                { icon: "calendar", label: "Fecha", value: selectedEvent.date },
                { icon: "paw",      label: "Mascota", value: pet.name + " · " + pet.breed },
                ...(selectedEvent.clinic ? [{ icon: "building", label: "Clínica",  value: selectedEvent.clinic }] : []),
                ...(selectedEvent.vet    ? [{ icon: "stethoscope", label: "Veterinario", value: selectedEvent.vet }] : []),
              ].map(({ icon, label, value }) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 34, height: 34, borderRadius: 10, background: "var(--kd-lavender)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon name={icon} size={16} color="var(--kd-persian-blue)" />
                  </div>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "var(--fg3)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "var(--fg1)" }}>{value}</div>
                  </div>
                </div>
              ))}

              {/* Notes */}
              <div style={{ padding: "12px 14px", background: "var(--bg)", borderRadius: 12, border: "1px solid var(--border)" }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "var(--fg3)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>Notas</div>
                <div style={{ fontSize: 13, color: "var(--fg2)", lineHeight: 1.55 }}>{selectedEvent.notes}</div>
              </div>
            </div>

            {/* Actions */}
            <div style={{ padding: "0 20px 24px", display: "flex", flexDirection: "column", gap: 8 }}>
              <button className="kd-btn kd-btn-primary kd-btn-block" onClick={() => setSelectedEvent(null)}>
                <Icon name="calendar" size={16} /> Agendar cita
              </button>
              <button className="kd-btn kd-btn-secondary kd-btn-block" onClick={() => setSelectedEvent(null)}>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
