"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import {
  StreamVideoClient,
  StreamVideo,
  StreamCall,
  useCallStateHooks,
  ParticipantView,
  type Call,
} from "@stream-io/video-react-sdk"
import "@stream-io/video-react-sdk/dist/css/styles.css"
import { Mic, MicOff, Video, VideoOff, PhoneOff, Users } from "lucide-react"
import { Button } from "@/components/ui/button"

const API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY!
const CALL_ID = "kd-consult-demo"

const MVZ_USER = {
  id: "mvz-mariana",
  name: "Dra. Mariana García",
}

function CallUI({ onLeave }: { onLeave: () => void }) {
  const { useLocalParticipant, useRemoteParticipants, useMicrophoneState, useCameraState } =
    useCallStateHooks()

  const localParticipant = useLocalParticipant()
  const remoteParticipants = useRemoteParticipants()
  const { microphone, isMute: micMuted } = useMicrophoneState()
  const { camera, isMute: camOff } = useCameraState()

  const toggleMic = useCallback(() => (micMuted ? microphone.enable() : microphone.disable()), [microphone, micMuted])
  const toggleCam = useCallback(() => (camOff ? camera.enable() : camera.disable()), [camera, camOff])

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] bg-[#030027] rounded-2xl overflow-hidden relative">
      {/* Remote participants */}
      <div className="flex-1 relative">
        {remoteParticipants.length > 0 ? (
          <div className="grid gap-2 p-4 h-full" style={{ gridTemplateColumns: remoteParticipants.length === 1 ? "1fr" : "1fr 1fr" }}>
            {remoteParticipants.map((p) => (
              <div key={p.sessionId} className="relative rounded-xl overflow-hidden bg-[#1a1a3e]">
                <ParticipantView participant={p} />
                <div className="absolute bottom-3 left-3 text-white text-xs font-semibold bg-black/40 backdrop-blur px-2 py-1 rounded-full">
                  {p.name ?? p.userId}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full gap-4 text-white/60">
            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
              <Users className="w-7 h-7" />
            </div>
            <p className="text-sm">Esperando al paciente…</p>
            <p className="text-xs text-white/40">Comparte el ID: <span className="font-mono text-white/70">{CALL_ID}</span></p>
          </div>
        )}
      </div>

      {/* Local pip */}
      {localParticipant && (
        <div className="absolute top-4 right-4 w-28 h-40 rounded-xl overflow-hidden border border-white/20 bg-[#1a1a3e]">
          <ParticipantView participant={localParticipant} />
        </div>
      )}

      {/* Controls */}
      <div className="flex justify-center gap-3 p-5 bg-black/30 backdrop-blur">
        <button
          onClick={toggleMic}
          className={`w-13 h-13 rounded-full flex items-center justify-center transition-colors ${micMuted ? "bg-white text-[#030027]" : "bg-white/10 text-white"}`}
          style={{ width: 52, height: 52 }}
        >
          {micMuted ? <MicOff size={20} /> : <Mic size={20} />}
        </button>
        <button
          onClick={toggleCam}
          className={`rounded-full flex items-center justify-center transition-colors ${camOff ? "bg-white text-[#030027]" : "bg-white/10 text-white"}`}
          style={{ width: 52, height: 52 }}
        >
          {camOff ? <VideoOff size={20} /> : <Video size={20} />}
        </button>
        <button
          onClick={onLeave}
          className="rounded-full flex items-center justify-center bg-red-600 text-white"
          style={{ width: 52, height: 52 }}
        >
          <PhoneOff size={20} />
        </button>
      </div>
    </div>
  )
}

export default function VideollamadasPage() {
  const clientRef = useRef<StreamVideoClient | null>(null)
  const [call, setCall] = useState<Call | null>(null)
  const [phase, setPhase] = useState<"lobby" | "call" | "ended">("lobby")

  useEffect(() => {
    return () => {
      call?.leave().catch(console.error)
      clientRef.current?.disconnectUser().catch(console.error)
    }
  }, [call])

  const startCall = useCallback(async () => {
    const res = await fetch(`/api/stream/token?userId=${MVZ_USER.id}`)
    const { token } = await res.json()

    const client = new StreamVideoClient({ apiKey: API_KEY, user: MVZ_USER, token })
    clientRef.current = client

    const c = client.call("default", CALL_ID)
    await c.join({ create: true })
    setCall(c)
    setPhase("call")
  }, [])

  const leaveCall = useCallback(async () => {
    await call?.leave()
    setCall(null)
    setPhase("ended")
  }, [call])

  if (phase === "lobby") {
    return (
      <div className="px-4 lg:px-6 flex flex-col items-center justify-center gap-6 py-20">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Videollamadas</h1>
          <p className="text-muted-foreground mt-1 text-sm">Inicia o únete a una consulta en video</p>
        </div>
        <div className="bg-muted/40 border rounded-2xl p-8 flex flex-col items-center gap-4 w-full max-w-sm">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <Video className="w-7 h-7 text-primary" />
          </div>
          <div className="text-center">
            <p className="font-semibold">Sala de consulta</p>
            <p className="text-xs text-muted-foreground font-mono mt-1">{CALL_ID}</p>
          </div>
          <Button onClick={startCall} className="w-full">
            Iniciar consulta
          </Button>
        </div>
      </div>
    )
  }

  if (phase === "ended") {
    return (
      <div className="px-4 lg:px-6 flex flex-col items-center justify-center gap-4 py-20">
        <p className="text-muted-foreground">Consulta finalizada.</p>
        <Button onClick={() => setPhase("lobby")}>Nueva consulta</Button>
      </div>
    )
  }

  if (!call || !clientRef.current) return null

  return (
    <div className="px-4 lg:px-6">
      <StreamVideo client={clientRef.current}>
        <StreamCall call={call}>
          <CallUI onLeave={leaveCall} />
        </StreamCall>
      </StreamVideo>
    </div>
  )
}
