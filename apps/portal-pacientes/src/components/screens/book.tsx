"use client"

import { useState, useEffect, useCallback } from "react"
import dynamic from "next/dynamic"
import { Pet } from "@/lib/data"
import { Icon } from "../icon"
import type { ClinicPin } from "../clinic-map-picker"

interface BookScreenProps {
  pet: Pet
  onComplete: () => void
  onBack: () => void
}

const ClinicMapPicker = dynamic(
  () => import("../clinic-map-picker").then((m) => m.ClinicMapPicker),
  {
    ssr: false,
    loading: () => (
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", background: "var(--kd-lavender-200)" }}>
        <div style={{ textAlign: "center", color: "var(--fg2)", fontSize: 14, fontWeight: 500 }}>Cargando mapa…</div>
      </div>
    ),
  }
)

const REASONS = ["Revisión general", "Vacunación", "Vómito o diarrea", "Lesión / accidente", "Comportamiento", "Limpieza dental", "Otro"]
const MVZ_URL = process.env.NEXT_PUBLIC_MVZ_URL ?? "http://localhost:3000"

const CLINICS: ClinicPin[] = [
  { id: "cdmx-san-angel", name: "Kate & Doug San Ángel",   addr: "Insurgentes Sur 1900",      dist: "1.2 km", stars: 4.9, lat: 19.3503, lng: -99.1853, city: "CDMX", especialidad: "perros" },
  { id: "cdmx-roma",      name: "Kate & Doug Roma Norte",  addr: "Álvaro Obregón 12",         dist: "2.6 km", stars: 4.8, lat: 19.4196, lng: -99.1622, city: "CDMX", especialidad: "ambos"  },
  { id: "cdmx-condesa",   name: "Kate & Doug Condesa",     addr: "Av. Tamaulipas 88",         dist: "3.4 km", stars: 4.7, lat: 19.4129, lng: -99.1734, city: "CDMX", especialidad: "gatos"  },
  { id: "cdmx-coyoacan",  name: "Kate & Doug Coyoacán",    addr: "Av. Universidad 1823",      dist: "4.1 km", stars: 4.6, lat: 19.3470, lng: -99.1620, city: "CDMX", especialidad: "ambos"  },
  { id: "mty-san-pedro",  name: "Kate & Doug San Pedro",   addr: "Av. Vasconcelos 150",       dist: "2.0 km", stars: 4.9, lat: 25.6549, lng: -100.4037, city: "MTY",  especialidad: "ambos"  },
  { id: "mty-centro",     name: "Kate & Doug Centro MTY",  addr: "Padre Mier 825",            dist: "3.5 km", stars: 4.6, lat: 25.6711, lng: -100.3099, city: "MTY",  especialidad: "perros" },
  { id: "mty-cumbres",    name: "Kate & Doug Cumbres",     addr: "Av. Lázaro Cárdenas 2400",  dist: "5.2 km", stars: 4.8, lat: 25.7516, lng: -100.3596, city: "MTY",  especialidad: "gatos"  },
]

function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number) {
  const R = 6371
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLng = ((lng2 - lng1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2
  const km = R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return km < 1 ? `${Math.round(km * 1000)} m` : `${km.toFixed(1)} km`
}

const CITY_CENTER: Record<"CDMX" | "MTY", [number, number]> = {
  CDMX: [19.390, -99.175],
  MTY:  [25.693, -100.368],
}

type FilterCity = "CDMX" | "MTY"
type FilterEsp  = "todas" | "perros" | "gatos" | "ambos"

export function BookScreen({ pet, onComplete, onBack }: BookScreenProps) {
  const [step, setStep] = useState(1)
  const [reason, setReason] = useState("")
  const [description, setDescription] = useState("")
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [time, setTime] = useState("")
  const [slots, setSlots] = useState<{ time: string; available: boolean }[] | null>(null)
  const [slotsLoading, setSlotsLoading] = useState(false)
  const [booking, setBooking] = useState(false)
  const [bookingError, setBookingError] = useState("")
  const [clinic, setClinic] = useState("cdmx-san-angel")
  const [filterCity, setFilterCity] = useState<FilterCity>("CDMX")
  const [filterEsp,  setFilterEsp]  = useState<FilterEsp>("todas")
  const [filterStars, setFilterStars] = useState<4.5 | 4.8 | null>(null)
  const [userCoords, setUserCoords] = useState<{ lat: number; lng: number } | null>(null)

  useEffect(() => {
    if (step !== 2) return
    if (!navigator.geolocation) return
    navigator.geolocation.getCurrentPosition(
      (pos) => setUserCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => {}
    )
  }, [step])

  const fetchSlots = useCallback(async (date: Date) => {
    setSlotsLoading(true)
    setSlots(null)
    setTime("")
    try {
      const dateStr = date.toISOString().slice(0, 10)
      const res = await fetch(`${MVZ_URL}/api/calendar/availability?date=${dateStr}`)
      if (res.ok) {
        const data = await res.json()
        setSlots(data.slots)
      } else {
        // Fallback mock slots if API unavailable
        setSlots(FALLBACK_SLOTS)
      }
    } catch {
      setSlots(FALLBACK_SLOTS)
    } finally {
      setSlotsLoading(false)
    }
  }, [])

  useEffect(() => {
    if (step === 3 && selectedDate) fetchSlots(selectedDate)
  }, [step, selectedDate, fetchSlots])

  const handleConfirm = async () => {
    if (!selectedDate || !time) return
    setBooking(true)
    setBookingError("")
    try {
      const selectedClinic = CLINICS.find(c => c.id === clinic)
      const res = await fetch(`${MVZ_URL}/api/calendar/events`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: `Consulta: ${pet.name} · ${reason || "Revisión general"}`,
          date: selectedDate.toISOString(),
          time: formatTimeTo12h(time),
          duration: "30 min",
          location: selectedClinic?.name ?? "",
          description: description || reason,
          attendees: [],
        }),
      })
      if (!res.ok) throw new Error("Error al crear la cita")
      onComplete()
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e)
      setBookingError(msg)
    } finally {
      setBooking(false)
    }
  }

  const clinicsWithDist = CLINICS.map((c) => ({
    ...c,
    dist: userCoords ? haversineKm(userCoords.lat, userCoords.lng, c.lat, c.lng) : c.dist,
  }))

  const visibleClinics = clinicsWithDist
    .filter((c) => c.city === filterCity)
    .filter((c) => filterEsp === "todas" || c.especialidad === filterEsp || (filterEsp !== "ambos" && c.especialidad === "ambos"))
    .filter((c) => filterStars === null || c.stars >= filterStars)

  const selectedClinic = CLINICS.find((c) => c.id === clinic)

  // Step 2 (clinic map) is full-screen
  if (step === 2) {
    return (
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 76, zIndex: 60, background: "var(--bg)" }}>
        {/* Header */}
        <div
          style={{
            position: "absolute", top: 0, left: 0, right: 0,
            padding: "14px 16px",
            display: "flex", alignItems: "center", gap: 12,
            background: "var(--kd-white)",
            borderBottom: "1px solid var(--border)",
            zIndex: 10,
          }}
        >
          <button className="kd-btn kd-btn-icon kd-btn-sm kd-btn-ghost" onClick={() => setStep(1)}>
            <Icon name="chevronLeft" size={20} />
          </button>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, color: "var(--fg2)", fontWeight: 600 }}>Paso 2 de 4</div>
            <div style={{ fontSize: 16, fontWeight: 600 }}>Elige tu clínica</div>
          </div>
          {userCoords
            ? <div style={{ fontSize: 11, color: "#16a34a", display: "flex", alignItems: "center", gap: 4 }}><Icon name="mapPin" size={13} color="#16a34a" /> Ubicación activa</div>
            : <div style={{ fontSize: 11, color: "var(--fg3)", display: "flex", alignItems: "center", gap: 4 }}><Icon name="mapPin" size={13} color="var(--fg3)" /> Ubicando…</div>
          }
        </div>

        {/* Filter bar */}
        <div
          className="kd-scroll-x"
          style={{
            position: "absolute", top: 54, left: 0, right: 0,
            display: "flex", alignItems: "center", gap: 6,
            padding: "10px 16px",
            background: "var(--kd-white)",
            borderBottom: "1px solid var(--border)",
            zIndex: 10,
          }}
        >
          {(["CDMX", "MTY"] as FilterCity[]).map((c) => (
            <Chip key={c} label={c} active={filterCity === c} onClick={() => { setFilterCity(c); setClinic("") }} />
          ))}
          <Divider />
          {([
            { id: "perros", label: "🐶 Perros" },
            { id: "gatos",  label: "🐱 Gatos"  },
            { id: "ambos",  label: "Ambos"      },
          ] as { id: FilterEsp; label: string }[]).map((e) => (
            <Chip key={e.id} label={e.label} active={filterEsp === e.id} onClick={() => setFilterEsp(filterEsp === e.id ? "todas" : e.id)} />
          ))}
          <Divider />
          {([{ val: 4.5 as const, label: "★ 4.5+" }, { val: 4.8 as const, label: "★ 4.8+" }]).map((s) => (
            <Chip key={s.val} label={s.label} active={filterStars === s.val} onClick={() => setFilterStars(filterStars === s.val ? null : s.val)} />
          ))}
        </div>

        {/* Map — sits below headers, above the list */}
        <div style={{ position: "absolute", top: 106, left: 0, right: 0, height: 280, zIndex: 1 }}>
          <ClinicMapPicker
            clinics={visibleClinics}
            selectedId={clinic}
            center={CITY_CENTER[filterCity]}
            zoom={12}
            onSelect={setClinic}
          />
        </div>

        {/* Scrollable clinic list — starts below map */}
        <div
          style={{
            position: "absolute",
            top: 386,   /* 106 (headers) + 280 (map) */
            left: 0, right: 0, bottom: 76,  /* leave room for CTA */
            overflowY: "auto",
            background: "var(--bg)",
          }}
        >
          <div style={{ padding: "12px 16px 0", fontSize: 12, fontWeight: 700, color: "var(--fg2)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
            {visibleClinics.length} clínicas disponibles
          </div>
          <div style={{ padding: "8px 16px 16px", display: "flex", flexDirection: "column", gap: 8 }}>
            {visibleClinics.map((c) => {
              const active = clinic === c.id
              return (
                <button
                  key={c.id}
                  onClick={() => setClinic(c.id)}
                  style={{
                    display: "flex", gap: 12, alignItems: "center",
                    padding: 14, borderRadius: 16,
                    background: active ? "var(--kd-lavender-200)" : "var(--kd-white)",
                    border: `2px solid ${active ? "var(--kd-persian-blue)" : "var(--border)"}`,
                    cursor: "pointer", textAlign: "left", width: "100%",
                    transition: "border-color 150ms ease, background 150ms ease",
                  }}
                >
                  <div style={{ width: 40, height: 40, borderRadius: 12, background: active ? "var(--kd-persian-blue)" : "var(--kd-lavender)", color: active ? "#fff" : "var(--kd-persian-blue)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon name="building" size={20} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: active ? "var(--kd-persian-blue)" : "var(--fg1)" }}>{c.name}</div>
                    <div style={{ fontSize: 12, color: "var(--fg2)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.addr} · {c.dist}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 2, fontSize: 12 }}>
                      <Icon name="star" size={12} color="#B5651D" />
                      <span style={{ fontWeight: 600 }}>{c.stars}</span>
                      <span style={{ color: "var(--fg3)" }}>· 100% cubierto en tu plan</span>
                    </div>
                  </div>
                  {active && <Icon name="checkCircle" size={20} color="var(--kd-persian-blue)" />}
                </button>
              )
            })}
          </div>
        </div>

        {/* CTA — pinned at bottom */}
        <div
          style={{
            position: "absolute", bottom: 0, left: 0, right: 0,
            padding: "12px 16px 16px",
            background: "var(--kd-white)",
            borderTop: "1px solid var(--border)",
            zIndex: 10,
          }}
        >
          <button
            className="kd-btn kd-btn-primary kd-btn-lg kd-btn-block"
            onClick={() => setStep(3)}
            disabled={!clinic}
          >
            Continuar <Icon name="arrowRight" size={18} />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ paddingBottom: 160, minHeight: "100vh" }}>
      {/* Header */}
      <div
        style={{
          padding: "14px 16px",
          display: "flex",
          alignItems: "center",
          gap: 12,
          borderBottom: "1px solid var(--border)",
        }}
      >
        <button
          className="kd-btn kd-btn-icon kd-btn-sm kd-btn-ghost"
          onClick={() => (step > 1 ? setStep(step - 1) : onBack())}
        >
          <Icon name="chevronLeft" size={20} />
        </button>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, color: "var(--fg2)", fontWeight: 600 }}>Paso {step} de 4</div>
          <div style={{ fontSize: 16, fontWeight: 600 }}>Agendar consulta</div>
        </div>
      </div>
      <div className="kd-progress" style={{ margin: "12px 16px 0" }}>
        <div
          className="kd-progress-bar"
          style={{ width: (step / 4) * 100 + "%", transition: "width 320ms var(--ease-standard)" }}
        />
      </div>

      <div style={{ padding: 16 }}>
        {/* Step 1: pet + reason */}
        {step === 1 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <h2 className="kd-h-page" style={{ fontSize: 24 }}>
              Cuéntanos qué necesitas
            </h2>

            {/* Pet info card */}
            <div
              className="kd-card"
              style={{
                padding: 0,
                overflow: "hidden",
                background: "var(--kd-white)",
              }}
            >
              {/* Top row: photo + name/breed/age */}
              <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 16px 14px" }}>
                <img
                  src={pet.image}
                  alt={pet.name}
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 16,
                    objectFit: "cover",
                    flexShrink: 0,
                  }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20, letterSpacing: "-0.02em" }}>
                    {pet.name}
                  </div>
                  <div style={{ fontSize: 13, color: "var(--fg2)", marginTop: 2 }}>{pet.breed}</div>
                  <div style={{ fontSize: 13, color: "var(--fg2)" }}>{pet.age} · {pet.weight}</div>
                </div>
              </div>

              {/* Divider */}
              <div style={{ borderTop: "1px solid var(--border)", margin: "0 16px" }} />

              {/* Conditions row */}
              <div style={{ padding: "12px 16px", display: "flex", alignItems: "flex-start", gap: 10 }}>
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 8,
                    background: pet.conditions.length === 0 ? "rgba(34,197,94,0.12)" : "var(--kd-lavender)",
                    color: pet.conditions.length === 0 ? "#16a34a" : "var(--kd-persian-blue)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    marginTop: 1,
                  }}
                >
                  <Icon name={pet.conditions.length === 0 ? "check" : "alertCircle"} size={15} />
                </div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "var(--fg2)", marginBottom: 3 }}>
                    Condiciones médicas
                  </div>
                  {pet.conditions.length === 0 ? (
                    <div style={{ fontSize: 13, color: "#16a34a", fontWeight: 500 }}>Sin condiciones registradas</div>
                  ) : (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {pet.conditions.map((c) => (
                        <span
                          key={c}
                          style={{
                            fontSize: 12,
                            fontWeight: 500,
                            padding: "3px 10px",
                            borderRadius: 999,
                            background: "var(--kd-lavender)",
                            color: "var(--kd-persian-blue)",
                          }}
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <h3 className="kd-h-section" style={{ marginTop: 8 }}>
              ¿Qué necesitas?
            </h3>
            <div className="kd-card" style={{ padding: 0, overflow: "hidden" }}>
              {REASONS.map((r, i) => {
                const active = reason === r
                return (
                  <button
                    key={r}
                    onClick={() => setReason(r)}
                    style={{
                      width: "100%",
                      padding: "14px 16px",
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      borderBottom: i < REASONS.length - 1 ? "1px solid var(--border)" : "none",
                      background: active ? "var(--kd-lavender-200)" : "none",
                      border: "none",
                      cursor: "pointer",
                      textAlign: "left",
                      fontFamily: "var(--font-sans)",
                      borderBottomWidth: i < REASONS.length - 1 ? 1 : 0,
                      borderBottomStyle: "solid",
                      borderBottomColor: "var(--border)",
                    }}
                  >
                    {/* Radio circle */}
                    <div
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: 999,
                        border: active ? "6px solid var(--kd-persian-blue)" : "2px solid var(--border)",
                        flexShrink: 0,
                        transition: "border 160ms ease",
                      }}
                    />
                    <span style={{ fontSize: 14, fontWeight: active ? 600 : 400, color: active ? "var(--kd-persian-blue)" : "var(--fg1)" }}>
                      {r}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Description textarea — only for "Otro" */}
            {reason === "Otro" && (
              <div style={{ animation: "kd-slide-up 200ms var(--ease-soft) both" }}>
                <h3 className="kd-h-section" style={{ marginTop: 16 }}>
                  Describe el problema
                </h3>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Cuéntanos con más detalle qué le ocurre a tu mascota…"
                  rows={4}
                  style={{
                    width: "100%",
                    padding: "14px 16px",
                    borderRadius: 16,
                    border: "1px solid var(--border)",
                    background: "var(--kd-white)",
                    fontFamily: "var(--font-sans)",
                    fontSize: 14,
                    color: "var(--fg1)",
                    lineHeight: 1.6,
                    resize: "none",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "var(--kd-persian-blue)")}
                  onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                />
              </div>
            )}
          </div>
        )}

        {/* Step 3: date/time picker */}
        {step === 3 && (
          <div>
            <h2 className="kd-h-page" style={{ fontSize: 24, marginBottom: 4 }}>
              Elige día y hora
            </h2>
            <p className="kd-muted" style={{ marginTop: 0, fontSize: 14 }}>
              {currentMonth.toLocaleString("es-MX", { month: "long", year: "numeric" })}
            </p>
            <div className="kd-card" style={{ padding: 16, marginTop: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                <button
                  style={{ padding: 4, background: "none", border: "none", cursor: "pointer", color: "var(--fg2)" }}
                  onClick={() => setCurrentMonth(m => new Date(m.getFullYear(), m.getMonth() - 1, 1))}
                >
                  <Icon name="chevronLeft" size={18} />
                </button>
                <div style={{ fontWeight: 600 }}>
                  {currentMonth.toLocaleString("es-MX", { month: "long", year: "numeric" })}
                </div>
                <button
                  style={{ padding: 4, background: "none", border: "none", cursor: "pointer", color: "var(--fg2)" }}
                  onClick={() => setCurrentMonth(m => new Date(m.getFullYear(), m.getMonth() + 1, 1))}
                >
                  <Icon name="chevronRight" size={18} />
                </button>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(7,1fr)",
                  gap: 4,
                  fontSize: 11,
                  color: "var(--fg3)",
                  marginBottom: 8,
                  textAlign: "center",
                  fontWeight: 600,
                }}
              >
                {["L", "M", "M", "J", "V", "S", "D"].map((d, i) => (
                  <div key={i}>{d}</div>
                ))}
              </div>
              <CalendarGrid
                month={currentMonth}
                selected={selectedDate}
                today={new Date()}
                onSelect={(d) => { setSelectedDate(d); setTime("") }}
              />
            </div>
            {selectedDate && (
              <>
                <h3 className="kd-h-section" style={{ marginTop: 24, marginBottom: 12 }}>
                  Horarios disponibles · {selectedDate.toLocaleDateString("es-MX", { day: "numeric", month: "short" })}
                </h3>
                {slotsLoading ? (
                  <div style={{ textAlign: "center", padding: 24, color: "var(--fg3)", fontSize: 14 }}>Consultando disponibilidad…</div>
                ) : (
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8 }}>
                    {(slots ?? []).filter(s => s.available).map((s) => (
                      <button
                        key={s.time}
                        onClick={() => setTime(s.time)}
                        className="kd-card"
                        style={{
                          padding: "12px 0",
                          textAlign: "center",
                          fontWeight: 600,
                          fontSize: 14,
                          background: time === s.time ? "var(--kd-persian-blue)" : "var(--kd-white)",
                          color: time === s.time ? "#fff" : "var(--fg1)",
                          borderColor: time === s.time ? "var(--kd-persian-blue)" : "var(--border)",
                        }}
                      >
                        {s.time}
                      </button>
                    ))}
                    {slots && slots.filter(s => s.available).length === 0 && (
                      <p style={{ gridColumn: "1/-1", textAlign: "center", color: "var(--fg3)", fontSize: 14, padding: 16 }}>
                        Sin horarios disponibles para este día.
                      </p>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* Step 4: confirm */}
        {step === 4 && (
          <div>
            <h2 className="kd-h-page" style={{ fontSize: 24 }}>
              Confirmar
            </h2>
            <div className="kd-card" style={{ marginTop: 16, padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                ["Mascota",  pet.name,                   "paw"],
                ["Clínica",  selectedClinic?.name || "", "building"],
                ["Motivo",   reason || "Revisión general", "fileText"],
                ["Cuándo",   selectedDate ? `${selectedDate.toLocaleDateString("es-MX", { day: "numeric", month: "long" })} · ${time}` : "—", "calendar"],
                ["Costo",    "Incluido en tu plan",     "shield"],
              ].map(([k, v, ic]) => (
                <div key={k} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 8,
                      background: "var(--kd-lavender)",
                      color: "var(--kd-persian-blue)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icon name={ic} size={16} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontSize: 11,
                        color: "var(--fg2)",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        fontWeight: 600,
                      }}
                    >
                      {k}
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>{v}</div>
                  </div>
                </div>
              ))}
            </div>
            <div
              style={{
                marginTop: 16,
                padding: 14,
                borderRadius: 14,
                background: "var(--kd-lavender-200)",
                border: "1px solid var(--kd-lavender)",
              }}
            >
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>Recordatorio</div>
              <div style={{ fontSize: 12, color: "var(--fg2)" }}>
                Te avisamos 1 hora antes por correo y notificación. Puedes cancelar hasta 2 horas antes sin costo.
              </div>
            </div>
            {bookingError && (
              <p style={{ marginTop: 12, fontSize: 13, color: "var(--kd-red, #dc2626)", textAlign: "center" }}>
                {bookingError}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Fixed action — pinned above the bottom nav + FAB clearance */}
      <div
        style={{
          position: "fixed",
          bottom: 88,
          left: 0,
          right: 0,
          zIndex: 60,
          padding: "12px 16px",
          background: "rgba(245,242,236,0.96)",
          backdropFilter: "blur(12px)",
          borderTop: "1px solid var(--border)",
        }}
      >
        {step < 4 ? (
          <button
            className="kd-btn kd-btn-primary kd-btn-lg kd-btn-block"
            disabled={step === 3 && (!selectedDate || !time)}
            onClick={() => setStep(step + 1)}
          >
            Continuar <Icon name="arrowRight" size={18} />
          </button>
        ) : (
          <button
            className="kd-btn kd-btn-primary kd-btn-lg kd-btn-block"
            disabled={booking}
            onClick={handleConfirm}
          >
            {booking
              ? <><span style={{ display: "inline-block", width: 16, height: 16, border: "2px solid #fff", borderTopColor: "transparent", borderRadius: 999, animation: "kd-spin 0.7s linear infinite" }} /> Creando cita…</>
              : <><Icon name="checkCircle" size={18} /> Confirmar cita</>
            }
          </button>
        )}
      </div>
    </div>
  )
}

// ─── helpers ────────────────────────────────────────────────────────────────

const FALLBACK_SLOTS = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "17:00",
].map(t => ({ time: t, available: true }))

function formatTimeTo12h(time24: string): string {
  const [h, m] = time24.split(":").map(Number)
  const ampm = h >= 12 ? "PM" : "AM"
  const h12  = h % 12 || 12
  return `${h12}:${String(m).padStart(2, "0")} ${ampm}`
}

function CalendarGrid({
  month, selected, today, onSelect,
}: {
  month: Date
  selected: Date | null
  today: Date
  onSelect: (d: Date) => void
}) {
  const year = month.getFullYear()
  const mon  = month.getMonth()
  const firstDay = new Date(year, mon, 1)
  // Monday-first: getDay() returns 0=Sun, shift so Monday=0
  const startOffset = (firstDay.getDay() + 6) % 7
  const daysInMonth = new Date(year, mon + 1, 0).getDate()
  const cells: (number | null)[] = [
    ...Array(startOffset).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ]

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 4 }}>
      {cells.map((d, i) => {
        if (!d) return <div key={`e${i}`} />
        const dateObj = new Date(year, mon, d)
        const isPast    = dateObj < new Date(today.getFullYear(), today.getMonth(), today.getDate())
        const isWeekend = dateObj.getDay() === 0 || dateObj.getDay() === 6
        const disabled  = isPast || isWeekend
        const isSelected = selected
          ? selected.getFullYear() === year && selected.getMonth() === mon && selected.getDate() === d
          : false
        const isToday   = today.getFullYear() === year && today.getMonth() === mon && today.getDate() === d

        return (
          <button
            key={d}
            disabled={disabled}
            onClick={() => onSelect(dateObj)}
            style={{
              height: 38,
              borderRadius: 10,
              background: isSelected ? "var(--kd-persian-blue)" : isToday ? "var(--kd-lavender)" : "transparent",
              color: isSelected ? "#fff" : disabled ? "var(--kd-onyx-200)" : "var(--fg1)",
              fontWeight: isSelected || isToday ? 700 : 500,
              fontSize: 14,
              cursor: disabled ? "not-allowed" : "pointer",
              opacity: disabled ? 0.4 : 1,
              border: "none",
            }}
          >
            {d}
          </button>
        )
      })}
    </div>
  )
}

function Chip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        height: 32,
        padding: "0 12px",
        borderRadius: 999,
        fontSize: 12,
        fontWeight: 600,
        whiteSpace: "nowrap",
        flexShrink: 0,
        cursor: "pointer",
        fontFamily: "var(--font-sans)",
        background: active ? "var(--kd-persian-blue)" : "var(--kd-white)",
        color: active ? "#fff" : "var(--fg2)",
        border: active ? "none" : "1px solid var(--border)",
        transition: "background 150ms ease, color 150ms ease",
      }}
    >
      {label}
    </button>
  )
}

function Divider() {
  return (
    <div
      style={{
        width: 1,
        height: 20,
        background: "var(--border)",
        flexShrink: 0,
        margin: "0 2px",
      }}
    />
  )
}
