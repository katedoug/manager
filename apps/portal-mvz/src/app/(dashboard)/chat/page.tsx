"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { StreamChat } from "stream-chat"
import {
  Chat,
  Channel,
  ChannelList,
  MessageList,
  MessageComposer,
  MessageComposerUI,
  Window,
  Thread,
  useChatContext,
  useChannelStateContext,
} from "stream-chat-react"
import "stream-chat-react/dist/css/index.css"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { CheckCircle, ChevronLeft, MessageSquare } from "lucide-react"

const API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY ?? ""
const MVZ_USER = { id: "mvz-mariana", name: "Dra. Mariana García" }

const channelFilters = { type: "messaging", members: { $in: [MVZ_USER.id] } }
const channelSort   = { last_message_at: -1 as const }
const channelOptions = { limit: 30, state: true, watch: true, presence: true }

// ─── helpers ───────────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getPatientName(channel: any): string {
  const members = Object.values(channel.state?.members ?? {}) as Array<{ user?: { id?: string; name?: string } }>
  const patient = members.find(m => m.user?.id && m.user.id !== MVZ_USER.id && m.user.name)
  if (patient?.user?.name) return patient.user.name
  const raw: string = channel.data?.name ?? ""
  if (raw.includes("·")) return raw.split("·").slice(1).join("·").trim()
  return raw || "Paciente"
}

function formatTime(date: Date): string {
  const diffDays = Math.floor((Date.now() - date.getTime()) / 86_400_000)
  if (diffDays === 0) return date.toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" })
  if (diffDays === 1) return "Ayer"
  if (diffDays < 7)  return date.toLocaleDateString("es-MX", { weekday: "short" })
  return date.toLocaleDateString("es-MX", { day: "2-digit", month: "short" })
}


function EmptyChannels() {
  return (
    <div className="flex flex-col items-center justify-center h-48 gap-2 text-muted-foreground">
      <MessageSquare className="w-8 h-8 opacity-25" />
      <p className="text-sm">Sin consultas aún</p>
    </div>
  )
}

// Syncs Stream's active channel (set by ChannelListItem click) → pickedChannel state.
// setActiveChannelOnMount={false} ensures context channel only changes on user click.
function ChannelWatcher({ onPick }: { onPick: (ch: unknown) => void }) {
  const { channel } = useChatContext()
  useEffect(() => { if (channel) onPick(channel) }, [channel, onPick])
  return null
}

// ─── header inside Channel context ─────────────────────────────────────────

function ConsultationHeader({ onClose, onBack }: { onClose: (channelId: string) => void; onBack: () => void }) {
  const { channel } = useChannelStateContext()
  const name = getPatientName(channel)

  return (
    <div className="flex items-center justify-between px-4 py-3 border-b bg-background shrink-0">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="md:hidden -ml-1" onClick={onBack}>
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <div>
          <p className="font-semibold text-sm">{name}</p>
          <p className="text-xs text-muted-foreground">Consulta en curso</p>
        </div>
      </div>
      <Button variant="destructive" size="sm" onClick={() => onClose(channel.id ?? "")}>
        Cerrar consulta
      </Button>
    </div>
  )
}

// ─── right panel ───────────────────────────────────────────────────────────

interface ChatAreaProps {
  onClose: (channelId: string) => void
  onBack: () => void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pickedChannel: any
  justClosed: boolean
}

function ChatArea({ onClose, onBack, pickedChannel, justClosed }: ChatAreaProps) {
  if (!pickedChannel) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-3 text-muted-foreground">
        {justClosed ? (
          <>
            <CheckCircle className="w-10 h-10 text-green-500 opacity-80" />
            <p className="text-sm font-medium text-foreground">Consulta cerrada</p>
            <p className="text-xs text-center max-w-[200px]">
              El transcript fue enviado al paciente. Selecciona una consulta para continuar.
            </p>
          </>
        ) : (
          <>
            <MessageSquare className="w-10 h-10 opacity-20" />
            <p className="text-sm">Selecciona una consulta</p>
          </>
        )}
      </div>
    )
  }

  return (
    <Channel channel={pickedChannel}>
      <Window>
        <ConsultationHeader onClose={onClose} onBack={onBack} />
        <MessageList />
        <MessageComposer>
          <MessageComposerUI />
        </MessageComposer>
      </Window>
      <Thread />
    </Channel>
  )
}

// ─── page ───────────────────────────────────────────────────────────────────

type Phase = "connecting" | "ready" | "error"

export default function ChatPage() {
  const clientRef = useRef<StreamChat | null>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [pickedChannel, setPickedChannel] = useState<any>(null)
  const handlePick = useCallback((ch: unknown) => setPickedChannel(ch), [])
  const [phase, setPhase]   = useState<Phase>("connecting")
  const [errMsg, setErrMsg] = useState("")
  const [justClosed, setJustClosed] = useState(false)

  const [dialogOpen, setDialogOpen]           = useState(false)
  const [targetChannelId, setTargetChannelId] = useState("")
  const [patientEmail, setPatientEmail]       = useState("rafael@katedoug.com")
  const [sending, setSending]                 = useState(false)
  const [sendResult, setSendResult]           = useState<"ok" | "error" | null>(null)
  const [sendError, setSendError]             = useState("")

  useEffect(() => {
    if (!API_KEY) { setErrMsg("NEXT_PUBLIC_STREAM_API_KEY no definida."); setPhase("error"); return }
    let cancelled = false

    async function init() {
      try {
        const res = await fetch(`/api/stream/token?userId=${MVZ_USER.id}`)
        if (!res.ok) throw new Error(`Token API ${res.status}`)
        const { token } = await res.json()
        const client = new StreamChat(API_KEY)
        clientRef.current = client
        await client.connectUser(MVZ_USER, token)
        if (!cancelled) setPhase("ready")
      } catch (e: unknown) {
        if (!cancelled) { setErrMsg(e instanceof Error ? e.message : String(e)); setPhase("error") }
      }
    }

    init()
    return () => {
      cancelled = true
      setPickedChannel(null)   // unmounts <Channel> on next render
      setPhase("connecting")
      const client = clientRef.current
      clientRef.current = null
      // Defer disconnect so Stream's <Channel> cleanup runs first
      setTimeout(() => { client?.disconnectUser().catch(() => {}) }, 0)
    }
  }, [])

  function openCloseDialog(channelId: string) {
    setTargetChannelId(channelId)
    setSendResult(null)
    setSendError("")
    setDialogOpen(true)
  }

  async function handleCloseChat() {
    setSending(true)
    setSendResult(null)
    setSendError("")
    try {
      const res = await fetch("/api/chat/transcript", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          channelId: targetChannelId,
          patientEmail,
          patientName: "Tutor",
          vetName: MVZ_USER.name,
        }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error ?? `HTTP ${res.status}`)
      setSendResult("ok")
      setTimeout(() => {
        setDialogOpen(false)
        setJustClosed(true)
        setPickedChannel(null)
      }, 1200)
    } catch (e: unknown) {
      setSendError(e instanceof Error ? e.message : String(e))
      setSendResult("error")
    } finally {
      setSending(false)
    }
  }

  if (phase === "connecting") {
    return (
      <div className="flex items-center justify-center h-[600px] gap-3 text-muted-foreground text-sm">
        <span className="animate-spin inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
        Conectando…
      </div>
    )
  }

  if (phase === "error") {
    return (
      <div className="flex flex-col items-center justify-center h-[600px] gap-2 text-destructive text-sm">
        <p className="font-semibold">Error al conectar</p>
        <p className="text-muted-foreground text-xs max-w-sm text-center">{errMsg}</p>
      </div>
    )
  }

  if (!clientRef.current) return null

  return (
    <>
      <div className="mx-0 md:mx-4 lg:mx-6 flex rounded-none md:rounded-xl border overflow-hidden"
           style={{ height: "calc(100svh - var(--header-height) - 2rem)" }}>

        <Chat client={clientRef.current} theme="str-chat__theme-light">
          {/* Syncs Stream context → pickedChannel when user clicks a channel */}
          <ChannelWatcher onPick={handlePick} />

          {/* Left: channel list — full width on mobile when no channel picked */}
          <div className={cn(
            "shrink-0 border-r flex flex-col bg-muted/20",
            "md:flex md:w-72",
            pickedChannel ? "hidden" : "flex w-full"
          )}>
            <div className="px-4 py-3 border-b shrink-0">
              <p className="text-sm font-semibold">Consultas</p>
            </div>
            <div className="flex-1 overflow-y-auto">
              <ChannelList
                filters={channelFilters}
                sort={channelSort}
                options={channelOptions}
                setActiveChannelOnMount={false}
                EmptyStateIndicator={EmptyChannels}
              />
            </div>
          </div>

          {/* Right: active consultation — full width on mobile when channel picked */}
          <div className={cn(
            "flex-1 flex-col min-w-0 bg-background",
            "md:flex",
            pickedChannel ? "flex" : "hidden"
          )}>
            <ChatArea
              onClose={openCloseDialog}
              onBack={() => setPickedChannel(null)}
              pickedChannel={pickedChannel}
              justClosed={justClosed}
            />
          </div>
        </Chat>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cerrar consulta</DialogTitle>
            <DialogDescription>
              Se enviará el transcript al paciente y se cerrará esta consulta.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 py-2">
            <div className="space-y-1.5">
              <Label htmlFor="patient-email">Correo del paciente</Label>
              <Input
                id="patient-email"
                type="email"
                value={patientEmail}
                onChange={(e) => setPatientEmail(e.target.value)}
                placeholder="paciente@ejemplo.com"
              />
            </div>
            {sendResult === "ok" && (
              <p className="text-sm text-green-600">✓ Transcript enviado correctamente</p>
            )}
            {sendResult === "error" && (
              <p className="text-sm text-destructive">{sendError || "Error al enviar."}</p>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)} disabled={sending}>
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={handleCloseChat}
              disabled={sending || !patientEmail}
            >
              {sending ? "Enviando…" : "Enviar conversación y cerrar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
