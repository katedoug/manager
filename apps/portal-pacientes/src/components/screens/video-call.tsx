"use client"

import { useState, useCallback, useEffect } from "react"
import {
  StreamVideoClient,
  StreamVideo,
  StreamCall,
  useCallStateHooks,
  ParticipantView,
  type Call,
} from "@stream-io/video-react-sdk"
import "@stream-io/video-react-sdk/dist/css/styles.css"
import { Pet, VET_INFO } from "@/lib/data"
import { Icon } from "../icon"

interface VideoCallScreenProps {
  pet: Pet
  call: Call
  client: StreamVideoClient
  onEnd: () => void
}

function CallUI({ pet, onEnd }: { pet: Pet; onEnd: () => void }) {
  const { useLocalParticipant, useRemoteParticipants, useMicrophoneState, useCameraState } =
    useCallStateHooks()

  const localParticipant = useLocalParticipant()
  const remoteParticipants = useRemoteParticipants()
  const { microphone, isMute: micMuted } = useMicrophoneState()
  const { camera, isMute: camOff } = useCameraState()

  const [seconds, setSeconds] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setSeconds((s) => s + 1), 1000)
    return () => clearInterval(t)
  }, [])
  const fmt = (s: number) =>
    String(Math.floor(s / 60)).padStart(2, "0") + ":" + String(s % 60).padStart(2, "0")

  const toggleMic = useCallback(() => (micMuted ? microphone.enable() : microphone.disable()), [microphone, micMuted])
  const toggleCam = useCallback(() => (camOff ? camera.enable() : camera.disable()), [camera, camOff])

  return (
    <div style={{ position: "fixed", inset: 0, background: "#000", color: "#fff", zIndex: 200, display: "flex", flexDirection: "column" }}>
      {/* Remote video (vet) */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #1a1a3e 0%, #030027 100%)" }}>
        {remoteParticipants[0] ? (
          <div style={{ width: "100%", height: "100%" }}>
            <ParticipantView participant={remoteParticipants[0]} />
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: 16 }}>
            <div style={{ width: 120, height: 120, borderRadius: 999, background: "linear-gradient(135deg, #1434CB, #6F84E2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 44, fontWeight: 700, border: "4px solid rgba(255,255,255,0.1)" }}>
              {VET_INFO.avatar}
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 20, fontWeight: 700 }}>{VET_INFO.name}</div>
              <div style={{ fontSize: 14, color: "rgba(255,255,255,0.6)" }}>Conectando…</div>
            </div>
          </div>
        )}
      </div>

      {/* Top bar */}
      <div style={{ position: "relative", zIndex: 2, padding: "20px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ padding: "6px 12px", borderRadius: 999, background: "rgba(0,0,0,0.4)", backdropFilter: "blur(12px)", display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 600 }}>
          <span style={{ width: 8, height: 8, borderRadius: 999, background: "#22c55e", boxShadow: "0 0 0 4px rgba(34,197,94,0.2)" }} />
          {fmt(seconds)}
        </div>
        <div style={{ padding: "6px 12px", borderRadius: 999, background: "rgba(0,0,0,0.4)", backdropFilter: "blur(12px)", fontSize: 12, fontWeight: 500, color: "rgba(255,255,255,0.85)" }}>
          Consultando · {pet.name}
        </div>
      </div>

      {/* Local pip */}
      {localParticipant && (
        <div style={{ position: "absolute", top: 80, right: 16, zIndex: 3, width: 100, height: 140, borderRadius: 16, overflow: "hidden", border: "2px solid rgba(255,255,255,0.15)", background: "#1a1a1a" }}>
          <ParticipantView participant={localParticipant} />
        </div>
      )}

      {/* Controls */}
      <div style={{ marginTop: "auto", padding: "0 16px 32px", position: "relative", zIndex: 2 }}>
        <div style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(20px)", borderRadius: 24, padding: 14, display: "flex", justifyContent: "space-around", alignItems: "center", border: "1px solid rgba(255,255,255,0.08)" }}>
          <button onClick={toggleMic} style={{ width: 52, height: 52, borderRadius: 999, background: micMuted ? "#fff" : "rgba(255,255,255,0.1)", color: micMuted ? "#030027" : "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", border: "none" }}>
            <Icon name={micMuted ? "micOff" : "mic"} size={22} />
          </button>
          <button onClick={toggleCam} style={{ width: 52, height: 52, borderRadius: 999, background: camOff ? "#fff" : "rgba(255,255,255,0.1)", color: camOff ? "#030027" : "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", border: "none" }}>
            <Icon name={camOff ? "videoOff" : "video"} size={22} />
          </button>
          <button style={{ width: 52, height: 52, borderRadius: 999, background: "rgba(255,255,255,0.1)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", border: "none" }}>
            <Icon name="message" size={22} />
          </button>
          <button onClick={onEnd} style={{ width: 64, height: 52, borderRadius: 999, background: "#dc2626", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", border: "none" }}>
            <Icon name="phoneOff" size={24} />
          </button>
        </div>
      </div>
    </div>
  )
}

export function VideoCallScreen({ pet, call, client, onEnd }: VideoCallScreenProps) {
  const handleEnd = useCallback(async () => {
    await call.leave()
    await client.disconnectUser()
    onEnd()
  }, [call, client, onEnd])

  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <CallUI pet={pet} onEnd={handleEnd} />
      </StreamCall>
    </StreamVideo>
  )
}
