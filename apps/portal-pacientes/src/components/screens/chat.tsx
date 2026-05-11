"use client"

import { useEffect, useRef, useState } from "react"
import { StreamChat, type Channel as StreamChannel } from "stream-chat"
import {
  Chat,
  Channel,
  MessageList,
  MessageComposer,
  MessageComposerUI,
  Window,
} from "stream-chat-react"
import "stream-chat-react/dist/css/index.css"
import { Pet, VET_INFO } from "@/lib/data"
import { Icon } from "../icon"

const API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY ?? ""
const TUTOR_USER = { id: "tutor-demo", name: "Tutor" }

interface ChatScreenProps {
  pet: Pet
  onBack: () => void
}

type Phase = "connecting" | "ready" | "error"

export function ChatScreen({ pet, onBack }: ChatScreenProps) {
  const clientRef = useRef<StreamChat | null>(null)
  // Stable unique channel ID for this session — new consultation each mount
  const channelIdRef = useRef(`kd-consult-${Date.now()}`)
  const [channel, setChannel] = useState<StreamChannel | null>(null)
  const [phase, setPhase] = useState<Phase>("connecting")

  useEffect(() => {
    if (!API_KEY) { setPhase("error"); return }
    let cancelled = false

    async function init() {
      try {
        const res = await fetch(`/api/stream/token?userId=${TUTOR_USER.id}`)
        const { token } = await res.json()

        const client = new StreamChat(API_KEY)
        clientRef.current = client
        await client.connectUser(TUTOR_USER, token)

        const ch = client.channel("messaging", channelIdRef.current, {
          name: `Consulta · ${pet.name}`,
          members: ["mvz-mariana", "tutor-demo"],
        })
        await ch.watch()

        if (!cancelled) { setChannel(ch); setPhase("ready") }
      } catch {
        if (!cancelled) setPhase("error")
      }
    }

    init()

    return () => {
      cancelled = true
      setChannel(null) // unmount Stream components before disconnecting
      // Defer disconnect so Stream's internal cleanup runs first
      setTimeout(() => {
        clientRef.current?.disconnectUser().catch(() => {})
        clientRef.current = null
      }, 0)
    }
  }, [pet.name])

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "var(--bg)",
        display: "flex",
        flexDirection: "column",
        zIndex: 100,
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "12px 16px",
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
        <div className="kd-avatar" style={{ background: "var(--kd-lavender)", color: "var(--kd-persian-blue)" }}>
          {VET_INFO.avatar}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 600, fontSize: 15 }}>{VET_INFO.name}</div>
          <div style={{ fontSize: 12, color: "var(--status-success)", display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 6, height: 6, borderRadius: 999, background: "var(--status-success)", flexShrink: 0 }} />
            En línea · responde en ~3 min
          </div>
        </div>
        <button className="kd-btn kd-btn-icon kd-btn-sm kd-btn-ghost">
          <Icon name="video" size={20} />
        </button>
      </div>

      {/* Body */}
      {phase === "connecting" && (
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--fg3)", fontSize: 13 }}>
          Conectando con tu veterinaria de cabecera…
        </div>
      )}
      {phase === "error" && (
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--status-error)", fontSize: 13 }}>
          Error al conectar
        </div>
      )}
      {phase === "ready" && clientRef.current && channel && (
        <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}>
          <Chat client={clientRef.current} theme="str-chat__theme-light">
            <Channel channel={channel}>
              <Window>
                <MessageList />
                <MessageComposer>
                  <MessageComposerUI />
                </MessageComposer>
              </Window>
            </Channel>
          </Chat>
        </div>
      )}
    </div>
  )
}
