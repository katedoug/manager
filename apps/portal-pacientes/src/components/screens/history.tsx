"use client"

import { useState } from "react"
import { Pet } from "@/lib/data"
import { Icon } from "../icon"

interface HistoryScreenProps {
  pet: Pet
}

type FilterType = "all" | "consult" | "rx" | "vac" | "lab"

interface HistoryItem {
  type: string
  title: string
  sub: string
  date: string
  vet: string
  icon: string
  detail: {
    sections: { label: string; value: string }[]
    note?: string
    simple?: { label: string; text: string }
  }
}

const ITEMS: HistoryItem[] = [
  {
    type: "consult", icon: "video",
    title: "Consulta videollamada", sub: "Tos seca · resuelta",
    date: "12 abr 2026", vet: "Dra. García",
    detail: {
      sections: [
        { label: "Motivo",       value: "Tos seca persistente por 3 días" },
        { label: "Diagnóstico",  value: "Traqueobronquitis infecciosa leve (tos de las perreras)" },
        { label: "Tratamiento",  value: "Apoquel 5.4 mg · 1 tableta diaria por 14 días" },
        { label: "Seguimiento",  value: "Control en 2 semanas si persisten síntomas" },
        { label: "Clínica",      value: "Videollamada · Kate & Doug" },
      ],
      note: "Evitar ambientes con humo o polvo. Mantener hidratación. No requiere aislamiento.",
    },
  },
  {
    type: "rx", icon: "pill",
    title: "Receta · Apoquel 5.4 mg", sub: "1 tableta diaria · 14 días",
    date: "12 abr 2026", vet: "Dra. García",
    detail: {
      sections: [],
      simple: {
        label: "Receta",
        text: "Apoquel (oclacitinib) 5.4 mg\n1 tableta cada 24 h durante 14 días.\nIndicación: control de prurito y traqueobronquitis.\n\nAdministrar con o sin alimento. No doblar dosis si se olvida. Guardar en lugar fresco y seco.\n\nPrescriptor: Dra. Mariana García · Ced. Prof. 12345678",
      },
    },
  },
  {
    type: "consult", icon: "stethoscope",
    title: "Examen general anual", sub: "Clínica San Ángel",
    date: "02 abr 2026", vet: "Dr. Ramírez",
    detail: {
      sections: [],
      simple: {
        label: "Diagnóstico",
        text: "Estado general: excelente. Sin hallazgos de importancia.\n\nPeso: 14.2 kg (estable). Temperatura: 38.4 °C (normal). Mucosas rosadas, reflejos normales, auscultación cardiopulmonar sin alteraciones.\n\nVacuna séxtuple pendiente para mayo 2026. Próximo examen anual recomendado: abril 2027.",
      },
    },
  },
  {
    type: "lab", icon: "fileText",
    title: "Análisis de sangre", sub: "Resultados normales",
    date: "02 abr 2026", vet: "Lab K&D",
    detail: {
      sections: [
        { label: "Estudio",      value: "Biometría hemática completa + química sanguínea" },
        { label: "Hemoglobina",  value: "15.2 g/dL (normal)" },
        { label: "Leucocitos",   value: "8,400 /µL (normal)" },
        { label: "Glucosa",      value: "92 mg/dL (normal)" },
        { label: "Creatinina",   value: "0.9 mg/dL (normal)" },
      ],
      note: "Todos los valores dentro de rangos de referencia para la especie y edad. Sin alteraciones.",
    },
  },
  {
    type: "vac", icon: "syringe",
    title: "Vacuna antirrábica", sub: "Aplicada en clínica",
    date: "10 jun 2025", vet: "Dr. Ramírez",
    detail: {
      sections: [
        { label: "Vacuna",       value: "Antirrábica monovalente (Nobivac Rabies)" },
        { label: "Lote",         value: "NR-2025-04812" },
        { label: "Vía",          value: "Subcutánea" },
        { label: "Próxima",      value: "junio 2026" },
        { label: "Clínica",      value: "Kate & Doug San Ángel · Dr. Ramírez" },
      ],
      note: "Certificado oficial emitido. Válido para trámites de viaje y tenencia responsable.",
    },
  },
  {
    type: "consult", icon: "video",
    title: "Consulta videollamada", sub: "Comezón · alergia detectada",
    date: "18 may 2025", vet: "Dra. García",
    detail: {
      sections: [
        { label: "Motivo",       value: "Prurito intenso en patas y abdomen" },
        { label: "Diagnóstico",  value: "Dermatitis atópica leve, probable alérgeno ambiental" },
        { label: "Tratamiento",  value: "Bravecto antiparasitario + dieta hipoalergénica 4 semanas" },
        { label: "Seguimiento",  value: "Reevaluación en 4 semanas" },
        { label: "Clínica",      value: "Videollamada · Kate & Doug" },
      ],
      note: "Evitar contacto con pasto recién cortado. Bañar con shampoo hipoalergénico máx. 1 vez/semana.",
    },
  },
  {
    type: "rx", icon: "pill",
    title: "Receta · Bravecto", sub: "Antiparasitario · trimestral",
    date: "18 may 2025", vet: "Dra. García",
    detail: {
      sections: [],
      simple: {
        label: "Receta",
        text: "Bravecto (fluralaner) 500 mg\n1 tableta masticable cada 3 meses.\nIndicación: control de pulgas, garrapatas y ácaros.\n\nAdministrar con alimento para mejor absorción. Anotar fecha de próxima dosis en el calendario.\n\nPrescriptor: Dra. Mariana García · Ced. Prof. 12345678",
      },
    },
  },
  {
    type: "vac", icon: "smile",
    title: "Limpieza dental", sub: "Clínica San Ángel",
    date: "15 ene 2025", vet: "Dr. Ramírez",
    detail: {
      sections: [],
      simple: {
        label: "Diagnóstico",
        text: "Profilaxis dental bajo anestesia general (isoflurano con monitoreo completo).\n\nHallazgos: sarro leve sin extracciones necesarias. Encías en buen estado.\n\nAlta la misma tarde. Recuperación sin complicaciones.\n\nDieta blanda 24 h post-procedimiento. Siguiente limpieza recomendada: enero 2026.",
      },
    },
  },
]

const ITEM_COLORS: Record<string, { bg: string; color: string }> = {
  rx:      { bg: "var(--kd-lavender)",  color: "var(--kd-persian-blue)" },
  vac:     { bg: "#DDF1E6",             color: "var(--status-success)"   },
  lab:     { bg: "#FBEDDB",             color: "var(--status-warning)"   },
  consult: { bg: "var(--kd-parchment)", color: "var(--kd-onyx)"          },
}

const TYPE_LABEL: Record<string, string> = {
  consult: "Consulta", rx: "Receta", vac: "Vacuna / Procedimiento", lab: "Laboratorio",
}

export function HistoryScreen({ pet }: HistoryScreenProps) {
  const [filter, setFilter] = useState<FilterType>("all")
  const [selected, setSelected] = useState<HistoryItem | null>(null)

  const filtered = filter === "all" ? ITEMS : ITEMS.filter((i) => i.type === filter)

  return (
    <div style={{ paddingBottom: 100 }}>
      <div style={{ padding: "8px 16px 4px" }}>
        <h1 className="kd-h-page" style={{ fontSize: 28 }}>Historial</h1>
        <div className="kd-muted" style={{ fontSize: 13, marginTop: 4 }}>
          Todo lo que ha pasado con {pet.name}.
        </div>
      </div>

      <div style={{ padding: "12px 16px", overflowX: "auto" }}>
        <div className="kd-pill-track" style={{ gap: 4 }}>
          {([
            { id: "all",     label: "Todo"      },
            { id: "consult", label: "Consultas" },
            { id: "rx",      label: "Recetas"   },
            { id: "vac",     label: "Vacunas"   },
            { id: "lab",     label: "Lab"       },
          ] as { id: FilterType; label: string }[]).map((f) => (
            <button key={f.id} className={filter === f.id ? "is-active" : ""} onClick={() => setFilter(f.id)}>
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: "8px 16px", display: "flex", flexDirection: "column", gap: 8 }}>
        {filtered.map((it, i) => {
          const { bg, color } = ITEM_COLORS[it.type] || ITEM_COLORS.consult
          return (
            <button
              key={i}
              onClick={() => setSelected(it)}
              style={{
                display: "flex", gap: 12, alignItems: "center",
                padding: 14, borderRadius: 16,
                background: "var(--kd-white)",
                border: "1px solid var(--border)",
                cursor: "pointer", textAlign: "left", width: "100%",
                transition: "box-shadow 150ms ease",
              }}
            >
              <div style={{ width: 40, height: 40, borderRadius: 10, background: bg, color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon name={it.icon} size={20} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: "var(--fg1)" }}>{it.title}</div>
                <div style={{ fontSize: 12, color: "var(--fg2)" }}>{it.sub} · {it.vet}</div>
              </div>
              <div style={{ fontSize: 11, color: "var(--fg3)", fontFamily: "var(--font-mono)", flexShrink: 0 }}>{it.date}</div>
            </button>
          )
        })}
      </div>

      {/* Detail modal */}
      {selected && (() => {
        const { bg, color } = ITEM_COLORS[selected.type] || ITEM_COLORS.consult
        return (
          <div className="kd-modal-backdrop" onClick={() => setSelected(null)}>
            <div className="kd-modal" style={{ padding: 0, overflow: "hidden", maxHeight: "88vh", display: "flex", flexDirection: "column" }} onClick={(e) => e.stopPropagation()}>

              {/* Header */}
              <div style={{ padding: "18px 20px 14px", background: bg, display: "flex", alignItems: "center", gap: 14, flexShrink: 0 }}>
                <div style={{ width: 46, height: 46, borderRadius: 12, background: "rgba(255,255,255,0.55)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon name={selected.icon} size={22} color={color} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color, textTransform: "uppercase", letterSpacing: "0.05em" }}>{TYPE_LABEL[selected.type]}</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: "var(--fg1)", lineHeight: 1.2 }}>{selected.title}</div>
                  <div style={{ fontSize: 12, color: "var(--fg2)", marginTop: 1 }}>{selected.vet} · {selected.date}</div>
                </div>
                <button onClick={() => setSelected(null)} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, color: "var(--fg3)", flexShrink: 0 }}>
                  <Icon name="x" size={20} />
                </button>
              </div>

              {/* Scrollable content */}
              <div style={{ flex: 1, overflowY: "auto" }}>
                {selected.detail.simple ? (
                  <div style={{ padding: "16px 20px 20px" }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "var(--fg3)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>
                      {selected.detail.simple.label}
                    </div>
                    <div style={{ padding: "14px 16px", background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 14, fontSize: 14, color: "var(--fg1)", lineHeight: 1.65, whiteSpace: "pre-line" }}>
                      {selected.detail.simple.text}
                    </div>
                  </div>
                ) : (
                  <>
                    <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: 0 }}>
                      {selected.detail.sections.map(({ label, value }, idx, arr) => (
                        <div key={label}>
                          <div style={{ display: "flex", gap: 12, padding: "11px 0", alignItems: "flex-start" }}>
                            <div style={{ fontSize: 12, fontWeight: 700, color: "var(--fg3)", textTransform: "uppercase", letterSpacing: "0.05em", minWidth: 96, paddingTop: 1 }}>{label}</div>
                            <div style={{ fontSize: 14, color: "var(--fg1)", fontWeight: 500, flex: 1, lineHeight: 1.45 }}>{value}</div>
                          </div>
                          {idx < arr.length - 1 && <div style={{ height: 1, background: "var(--border)" }} />}
                        </div>
                      ))}
                    </div>
                    {selected.detail.note && (
                      <div style={{ margin: "0 20px 20px", padding: "12px 14px", background: "var(--bg)", borderRadius: 12, border: "1px solid var(--border)" }}>
                        <div style={{ fontSize: 11, fontWeight: 700, color: "var(--fg3)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>Notas</div>
                        <div style={{ fontSize: 13, color: "var(--fg2)", lineHeight: 1.55 }}>{selected.detail.note}</div>
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Actions */}
              <div style={{ padding: "12px 20px 24px", borderTop: "1px solid var(--border)", display: "flex", gap: 8, flexShrink: 0 }}>
                <button
                  className="kd-btn kd-btn-secondary"
                  style={{ flex: 1 }}
                  onClick={() => setSelected(null)}
                >
                  Cerrar
                </button>
                <button
                  className="kd-btn kd-btn-primary"
                  style={{ flex: 1 }}
                  onClick={() => {}}
                >
                  <Icon name="download" size={16} /> Descargar
                </button>
              </div>
            </div>
          </div>
        )
      })()}
    </div>
  )
}
