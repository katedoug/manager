"use client"

import { useState } from "react"
import Image from "next/image"

interface LoginScreenProps {
  onLogin: () => void
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [email, setEmail] = useState("")
  const [pwd, setPwd] = useState("")
  const [showPwd, setShowPwd] = useState(false)
  const [primaryHover, setPrimaryHover] = useState(false)
  const [secondaryHover, setSecondaryHover] = useState(false)

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#E8EDFF",
        color: "#0D0D0D",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 24,
        }}
      >
        <div style={{ maxWidth: 400, width: "100%" }}>
          {/* Logo */}
          <div style={{ marginBottom: 48 }}>
            <Image src="/logo.svg" alt="Kate&Doug" width={120} height={28} priority />
          </div>

          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(36px, 8vw, 56px)",
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
              color: "#0D0D0D",
              margin: "0 0 14px",
            }}
          >
            Hola de nuevo.
          </h1>
          <p style={{ color: "var(--kd-onyx-500)", fontSize: 17, lineHeight: 1.5, marginBottom: 36, margin: "0 0 36px" }}>
            Tu vet, tus mascotas y tu plan, en un solo lugar.
          </p>

          <form
            onSubmit={(e) => { e.preventDefault(); onLogin() }}
            style={{ display: "flex", flexDirection: "column", gap: 14 }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: "var(--kd-onyx-500)" }}>Correo</label>
              <input
                className="kd-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="hola@ejemplo.mx"
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: "var(--kd-onyx-500)" }}>Contraseña</label>
              <div style={{ position: "relative" }}>
                <input
                  className="kd-input"
                  type={showPwd ? "text" : "password"}
                  value={pwd}
                  onChange={(e) => setPwd(e.target.value)}
                  placeholder="••••••••"
                  style={{ paddingRight: 48 }}
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  style={{
                    position: "absolute",
                    right: 14,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "var(--fg3)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                    display: "flex",
                  }}
                >
                  <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
                    {showPwd
                      ? <path d="M17.9 17.9A10 10 0 0 1 12 19c-6.5 0-10-7-10-7a18 18 0 0 1 5.1-5.9M9.9 4.2A10 10 0 0 1 12 4c6.5 0 10 7 10 7a18 18 0 0 1-2.2 3.2M14.1 14.1A3 3 0 0 1 9.9 9.9M2 2l20 20" />
                      : <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                    }
                  </svg>
                </button>
              </div>
            </div>

            <button
              type="button"
              style={{
                alignSelf: "flex-end",
                fontSize: 13,
                fontWeight: 600,
                color: "#1434CB",
                background: "none",
                border: "none",
                cursor: "pointer",
                marginTop: -4,
                padding: 0,
              }}
            >
              ¿Olvidaste tu contraseña?
            </button>

            {/* Primary CTA */}
            <button
              type="submit"
              onMouseEnter={() => setPrimaryHover(true)}
              onMouseLeave={() => setPrimaryHover(false)}
              style={{
                marginTop: 8,
                height: 52,
                width: "100%",
                borderRadius: 999,
                border: "none",
                background: primaryHover ? "#2D4BDC" : "#1434CB",
                color: "#fff",
                fontSize: 16,
                fontWeight: 600,
                fontFamily: "var(--font-sans)",
                letterSpacing: "-0.01em",
                cursor: "pointer",
                transition: "background 200ms ease",
              }}
            >
              Iniciar sesión
            </button>

            {/* Secondary CTA */}
            <button
              type="button"
              onMouseEnter={() => setSecondaryHover(true)}
              onMouseLeave={() => setSecondaryHover(false)}
              style={{
                height: 52,
                width: "100%",
                borderRadius: 999,
                border: "1.5px solid rgba(13,13,13,0.2)",
                background: secondaryHover ? "#030027" : "transparent",
                color: secondaryHover ? "#ffffff" : "#0D0D0D",
                fontSize: 16,
                fontWeight: 600,
                fontFamily: "var(--font-sans)",
                letterSpacing: "-0.01em",
                cursor: "pointer",
                transition: "background 200ms ease",
              }}
            >
              Crear cuenta
            </button>
          </form>
        </div>
      </div>

      <div style={{ padding: 24, textAlign: "center", fontSize: 13, color: "var(--fg3)" }}>
        Al continuar aceptas nuestros términos y la política de privacidad.
      </div>
    </div>
  )
}
