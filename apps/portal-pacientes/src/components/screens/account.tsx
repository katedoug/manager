"use client"

import { useState } from "react"
import { TUTOR_DATA } from "@/lib/data"
import { Icon } from "../icon"

interface AccountScreenProps {
  onClose: () => void
  onGoToPlan: () => void
}

function Toggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      role="switch"
      aria-checked={value}
      onClick={() => onChange(!value)}
      style={{
        width: 44,
        height: 26,
        borderRadius: 999,
        background: value ? "var(--kd-persian-blue)" : "var(--kd-onyx-200)",
        border: "none",
        cursor: "pointer",
        padding: 3,
        display: "flex",
        alignItems: "center",
        justifyContent: value ? "flex-end" : "flex-start",
        transition: "background 200ms ease",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          width: 20,
          height: 20,
          borderRadius: 999,
          background: "#fff",
          boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
          transition: "transform 200ms ease",
        }}
      />
    </button>
  )
}

function SectionHeader({ label }: { label: string }) {
  return (
    <div style={{ padding: "24px 16px 8px" }}>
      <span style={{ fontSize: 12, fontWeight: 700, color: "var(--fg2)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
        {label}
      </span>
    </div>
  )
}

function SettingsRow({
  icon, label, value, onPress, danger,
}: {
  icon: string; label: string; value?: string; onPress?: () => void; danger?: boolean
}) {
  return (
    <button
      onClick={onPress}
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "14px 16px",
        background: "none",
        border: "none",
        cursor: onPress ? "pointer" : "default",
        textAlign: "left",
      }}
    >
      <div
        style={{
          width: 34,
          height: 34,
          borderRadius: 10,
          background: danger ? "rgba(179,38,30,0.08)" : "var(--kd-lavender)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Icon name={icon} size={17} color={danger ? "#B3261E" : "var(--kd-persian-blue)"} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: danger ? "#B3261E" : "var(--fg1)" }}>{label}</div>
        {value && <div style={{ fontSize: 12, color: "var(--fg2)", marginTop: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{value}</div>}
      </div>
      {onPress && <Icon name="chevronRight" size={16} color="var(--fg3)" />}
    </button>
  )
}

function Divider() {
  return <div style={{ height: 1, background: "var(--border)", margin: "0 16px" }} />
}

type Section = "perfil" | "direccion" | "seguridad" | "notificaciones" | null

function FormInput({
  label, value, onChange, type = "text", placeholder,
}: {
  label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string
}) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--fg2)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.04em" }}>
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: "100%",
          height: 44,
          borderRadius: 12,
          border: "1.5px solid var(--border)",
          padding: "0 14px",
          fontSize: 14,
          background: "var(--kd-white)",
          color: "var(--fg1)",
          outline: "none",
          transition: "border-color 150ms ease",
          boxSizing: "border-box",
        }}
        onFocus={(e) => (e.target.style.borderColor = "var(--kd-persian-blue)")}
        onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
      />
    </div>
  )
}

export function AccountScreen({ onClose, onGoToPlan }: AccountScreenProps) {
  const [section, setSection] = useState<Section>(null)

  const [name, setName] = useState(TUTOR_DATA.name)
  const [phone, setPhone] = useState(TUTOR_DATA.phone)

  const [street, setStreet] = useState(TUTOR_DATA.address.street)
  const [colonia, setColonia] = useState(TUTOR_DATA.address.colonia)
  const [city, setCity] = useState(TUTOR_DATA.address.city)
  const [cp, setCp] = useState(TUTOR_DATA.address.cp)

  const [email, setEmail] = useState(TUTOR_DATA.email)

  const [notifCitas, setNotifCitas] = useState(true)
  const [notifResultados, setNotifResultados] = useState(true)
  const [notifOfertas, setNotifOfertas] = useState(false)

  if (section === "perfil") {
    return (
      <SubScreen title="Perfil" onBack={() => setSection(null)}>
        <div style={{ padding: "24px 16px" }}>
          {/* Avatar */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, marginBottom: 32 }}>
            <div style={{ position: "relative" }}>
              <div
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 999,
                  background: TUTOR_DATA.color + "20",
                  color: TUTOR_DATA.color,
                  fontSize: 32,
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {TUTOR_DATA.initial}
              </div>
            </div>
            <span style={{ fontSize: 13, color: "var(--fg2)" }}>Cambiar foto de perfil</span>
          </div>
          <FormInput label="Nombre completo" value={name} onChange={setName} />
          <FormInput label="Teléfono" value={phone} onChange={setPhone} type="tel" placeholder="+52 55 0000 0000" />
          <button className="kd-btn kd-btn-primary kd-btn-block" style={{ marginTop: 8 }}>
            Guardar cambios
          </button>
        </div>
      </SubScreen>
    )
  }

  if (section === "direccion") {
    return (
      <SubScreen title="Dirección" onBack={() => setSection(null)}>
        <div style={{ padding: "24px 16px" }}>
          <FormInput label="Calle y número" value={street} onChange={setStreet} placeholder="Av. Insurgentes Sur 1234" />
          <FormInput label="Colonia" value={colonia} onChange={setColonia} placeholder="Del Valle" />
          <FormInput label="Ciudad" value={city} onChange={setCity} placeholder="Ciudad de México" />
          <FormInput label="Código postal" value={cp} onChange={setCp} placeholder="03100" type="tel" />
          <button className="kd-btn kd-btn-primary kd-btn-block" style={{ marginTop: 8 }}>
            Guardar dirección
          </button>
        </div>
      </SubScreen>
    )
  }

  if (section === "seguridad") {
    return (
      <SubScreen title="Correo y seguridad" onBack={() => setSection(null)}>
        <div style={{ padding: "24px 16px" }}>
          <FormInput label="Correo electrónico" value={email} onChange={setEmail} type="email" />
          <button className="kd-btn kd-btn-primary kd-btn-block" style={{ marginTop: 8 }}>
            Actualizar correo
          </button>
          <div style={{ height: 1, background: "var(--border)", margin: "24px 0" }} />
          <p style={{ fontSize: 13, color: "var(--fg2)", marginBottom: 16, lineHeight: 1.5 }}>
            Para cambiar tu contraseña recibirás un correo de verificación.
          </p>
          <button className="kd-btn kd-btn-secondary kd-btn-block">
            Enviar correo para cambiar contraseña
          </button>
        </div>
      </SubScreen>
    )
  }

  if (section === "notificaciones") {
    return (
      <SubScreen title="Notificaciones" onBack={() => setSection(null)}>
        <SectionHeader label="Alertas" />
        <div className="kd-card" style={{ margin: "0 16px", padding: 0, overflow: "hidden" }}>
          <NotifRow label="Citas y recordatorios" desc="Recordatorios de citas próximas" value={notifCitas} onChange={setNotifCitas} />
          <Divider />
          <NotifRow label="Resultados y diagnósticos" desc="Cuando tu vet suba resultados" value={notifResultados} onChange={setNotifResultados} />
          <Divider />
          <NotifRow label="Ofertas y novedades" desc="Promociones y nuevos servicios" value={notifOfertas} onChange={setNotifOfertas} />
        </div>
      </SubScreen>
    )
  }

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
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
        <button className="kd-btn kd-btn-icon kd-btn-sm kd-btn-ghost" onClick={onClose}>
          <Icon name="x" size={20} />
        </button>
        <div style={{ fontWeight: 700, fontSize: 17 }}>Mi cuenta</div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", paddingBottom: 40 }}>
        {/* Profile hero */}
        <div
          style={{
            padding: "28px 16px 20px",
            display: "flex",
            alignItems: "center",
            gap: 16,
            borderBottom: "1px solid var(--border)",
          }}
        >
          <div
            style={{
              width: 60,
              height: 60,
              borderRadius: 999,
              background: TUTOR_DATA.color + "20",
              color: TUTOR_DATA.color,
              fontSize: 24,
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            {TUTOR_DATA.initial}
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: "var(--fg1)" }}>{name}</div>
            <div style={{ fontSize: 13, color: "var(--fg2)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {TUTOR_DATA.email}
            </div>
          </div>
        </div>

        {/* Cuenta */}
        <SectionHeader label="Tu cuenta" />
        <div className="kd-card" style={{ margin: "0 16px", padding: 0, overflow: "hidden" }}>
          <SettingsRow icon="user" label="Perfil" value={name} onPress={() => setSection("perfil")} />
          <Divider />
          <SettingsRow icon="mapPin" label="Dirección" value={street || "Sin dirección"} onPress={() => setSection("direccion")} />
          <Divider />
          <SettingsRow icon="lock" label="Correo y seguridad" value={email} onPress={() => setSection("seguridad")} />
        </div>

        {/* Preferencias */}
        <SectionHeader label="Preferencias" />
        <div className="kd-card" style={{ margin: "0 16px", padding: 0, overflow: "hidden" }}>
          <SettingsRow icon="bell" label="Notificaciones" value="3 activas" onPress={() => setSection("notificaciones")} />
        </div>

        {/* Suscripción */}
        <SectionHeader label="Suscripción" />
        <div className="kd-card" style={{ margin: "0 16px", padding: 0, overflow: "hidden" }}>
          <SettingsRow
            icon="shield"
            label="Mi plan"
            value="Plan Familia · renueva mar 2027"
            onPress={() => { onClose(); onGoToPlan() }}
          />
        </div>

        {/* Cerrar sesión */}
        <div style={{ margin: "32px 16px 0" }}>
          <div className="kd-card" style={{ padding: 0, overflow: "hidden" }}>
            <SettingsRow icon="logOut" label="Cerrar sesión" onPress={() => {}} danger />
          </div>
        </div>
      </div>
    </div>
  )
}

function SubScreen({ title, onBack, children }: { title: string; onBack: () => void; children: React.ReactNode }) {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
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
        <button className="kd-btn kd-btn-icon kd-btn-sm kd-btn-ghost" onClick={onBack}>
          <Icon name="chevronLeft" size={20} />
        </button>
        <div style={{ fontWeight: 700, fontSize: 17 }}>{title}</div>
      </div>
      <div style={{ flex: 1, overflowY: "auto" }}>{children}</div>
    </div>
  )
}

function NotifRow({
  label, desc, value, onChange,
}: {
  label: string; desc: string; value: boolean; onChange: (v: boolean) => void
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 16px" }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: "var(--fg1)" }}>{label}</div>
        <div style={{ fontSize: 12, color: "var(--fg2)", marginTop: 2 }}>{desc}</div>
      </div>
      <Toggle value={value} onChange={onChange} />
    </div>
  )
}
