"use client"

import { useState, useCallback, useRef } from "react"
import { StreamVideoClient, StreamVideo, StreamCall, VideoPreview, type Call } from "@stream-io/video-react-sdk"
import "@stream-io/video-react-sdk/dist/css/styles.css"
import { Pet, VET_INFO } from "@/lib/data"
import { Icon } from "../icon"

const API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY!
const CALL_ID = "kd-consult-demo"

const TUTOR_USER = { id: "tutor-demo", name: "Tutor" }

interface VideoLobbyScreenProps {
  pet: Pet
  onJoin: (call: Call, client: StreamVideoClient) => void
  onCancel: () => void
}

function LobbyInner({ pet, onJoin, onCancel, call }: VideoLobbyScreenProps & { call: Call }) {
  const [muted, setMuted] = useState(false)
  const [videoOff, setVideoOff] = useState(false)

  const handleJoin = useCallback(async () => {
    if (muted) await call.microphone.disable()
    if (videoOff) await call.camera.disable()
    await call.join()
    onJoin(call, call.streamVideoClient as StreamVideoClient)
  }, [call, muted, videoOff, onJoin])

  return (
    <div style={{ position: "fixed", inset: 0, background: "#0a0a1e", color: "#fff", zIndex: 200, display: "flex", flexDirection: "column" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 30%, rgba(20,52,203,0.22), transparent 70%)", pointerEvents: "none" }} />

      {/* Top bar */}
      <div style={{ position: "relative", zIndex: 2, padding: "20px 20px 0", display: "flex", alignItems: "center", gap: 12 }}>
        <button onClick={onCancel} style={{ width: 36, height: 36, borderRadius: 999, background: "rgba(255,255,255,0.1)", border: "none", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <Icon name="x" size={18} />
        </button>
        <div style={{ fontSize: 15, fontWeight: 600 }}>Preparándose para unirse</div>
      </div>

      {/* Appointment info */}
      <div style={{ position: "relative", zIndex: 2, padding: "20px 20px 0" }}>
        <div style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16, padding: "14px 16px", display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 44, height: 44, borderRadius: 999, background: "linear-gradient(135deg, #1434CB, #1a3fd4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 700, flexShrink: 0 }}>
            {VET_INFO.avatar}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 14, fontWeight: 700 }}>Consulta de seguimiento</div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", marginTop: 2 }}>{VET_INFO.name} · Hoy · {pet.name}</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, fontWeight: 600, color: "#4ade80", background: "rgba(74,222,128,0.12)", padding: "4px 8px", borderRadius: 999 }}>
            <span style={{ width: 6, height: 6, borderRadius: 999, background: "#4ade80" }} />
            En espera
          </div>
        </div>
      </div>

      {/* Camera preview */}
      <div style={{ position: "relative", zIndex: 2, flex: 1, padding: "20px", display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ flex: 1, borderRadius: 24, background: "#1c1c3a", border: "1px solid rgba(255,255,255,0.08)", overflow: "hidden", position: "relative" }}>
          {!videoOff ? (
            <StreamCall call={call}>
              <VideoPreview />
            </StreamCall>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: 12 }}>
              <div style={{ width: 72, height: 72, borderRadius: 999, background: "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name="videoOff" size={28} color="rgba(255,255,255,0.4)" />
              </div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>Cámara desactivada</div>
            </div>
          )}
          <div style={{ position: "absolute", bottom: 12, left: 14, fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.6)", background: "rgba(0,0,0,0.4)", padding: "3px 8px", borderRadius: 999 }}>Tú</div>
        </div>

        {/* Toggle controls */}
        <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
          {[
            { active: !muted, onIcon: "mic", offIcon: "micOff", label: muted ? "Activar mic" : "Silenciar", toggle: () => setMuted(!muted) },
            { active: !videoOff, onIcon: "video", offIcon: "videoOff", label: videoOff ? "Activar cámara" : "Apagar cámara", toggle: () => setVideoOff(!videoOff) },
          ].map((c) => (
            <button key={c.label} onClick={c.toggle} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, background: "none", border: "none", color: c.active ? "#fff" : "rgba(255,255,255,0.4)", cursor: "pointer", padding: "0 16px" }}>
              <div style={{ width: 48, height: 48, borderRadius: 999, background: c.active ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${c.active ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.06)"}` }}>
                <Icon name={c.active ? c.onIcon : c.offIcon} size={20} />
              </div>
              <span style={{ fontSize: 11 }}>{c.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ position: "relative", zIndex: 2, padding: "0 20px 36px" }}>
        <button onClick={handleJoin} style={{ width: "100%", height: 52, borderRadius: 999, background: "#1434CB", color: "#fff", fontWeight: 700, fontSize: 16, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
          <Icon name="video" size={18} />
          Unirme ahora
        </button>
      </div>
    </div>
  )
}

export function VideoLobbyScreen({ pet, onJoin, onCancel }: VideoLobbyScreenProps) {
  const clientRef = useRef<StreamVideoClient | null>(null)
  const [call, setCall] = useState<Call | null>(null)
  const [loading, setLoading] = useState(false)

  const init = useCallback(async () => {
    if (call) return
    setLoading(true)
    try {
      const res = await fetch(`/api/stream/token?userId=${TUTOR_USER.id}`)
      const { token } = await res.json()
      const client = new StreamVideoClient({ apiKey: API_KEY, user: TUTOR_USER, token })
      clientRef.current = client
      const c = client.call("default", CALL_ID)
      await c.camera.enable()
      await c.microphone.enable()
      setCall(c)
    } finally {
      setLoading(false)
    }
  }, [call])

  // Init on mount
  if (!call && !loading) { init() }

  if (loading || !call || !clientRef.current) {
    return (
      <div style={{ position: "fixed", inset: 0, background: "#0a0a1e", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200 }}>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14 }}>Preparando cámara…</p>
      </div>
    )
  }

  return (
    <StreamVideo client={clientRef.current}>
      <LobbyInner pet={pet} onJoin={onJoin} onCancel={onCancel} call={call} />
    </StreamVideo>
  )
}
