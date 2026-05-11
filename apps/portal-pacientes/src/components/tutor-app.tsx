"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import { PETS_DATA } from "@/lib/data"
import { MobileBar } from "./mobile-bar"
import { BottomNav } from "./bottom-nav"
import { LoginScreen } from "./screens/login"
import { LoaderScreen } from "./screens/loader"
import { HomeScreen } from "./screens/home"
import { PetsScreen } from "./screens/pets"
import { BookScreen } from "./screens/book"
import { HistoryScreen } from "./screens/history"
import { PlanScreen } from "./screens/plan"
import { VideoCallScreen } from "./screens/video-call"
import { VideoLobbyScreen } from "./screens/video-lobby"
import type { StreamVideoClient } from "@stream-io/video-react-sdk"
import type { Call } from "@stream-io/video-react-sdk"
import { VideoBookingScreen } from "./screens/video-booking"
import { ChatScreen } from "./screens/chat"
import { ChatLobbyScreen } from "./screens/chat-lobby"
import { OnboardingScreen } from "./screens/onboarding"
import { BookingSuccessModal } from "./modals/booking-success"
import { BookingRejectedModal } from "./modals/booking-rejected"
import { BookingCancelledModal } from "./modals/booking-cancelled"
import { SearchingClinicModal } from "./modals/searching-clinic"
import { AppointmentConfirmedModal, type ConfirmedAppointment } from "./modals/appointment-confirmed"
import { NotificationsScreen } from "./screens/notifications"
import { AccountScreen } from "./screens/account"
import { KateAIScreen } from "./screens/kate-ai"
import { KateLobbyScreen } from "./screens/kate-lobby"
import { AnimatedOverlay } from "./animated-overlay"
import { AppointmentBanner, type ActiveAppointment } from "./appointment-banner"
import { Icon } from "./icon"

const CLINIC_DETAILS: Record<string, { addr: string; phone: string; stars: number }> = {
  "Kate & Doug San Ángel":    { addr: "Insurgentes Sur 1900, San Ángel",       phone: "+52 55 5550 1900", stars: 4.9 },
  "Kate & Doug Roma Norte":   { addr: "Álvaro Obregón 12, Roma Norte",          phone: "+52 55 5550 0012", stars: 4.8 },
  "Kate & Doug Condesa":      { addr: "Av. Tamaulipas 88, Condesa",             phone: "+52 55 5550 0088", stars: 4.7 },
  "Kate & Doug Coyoacán":     { addr: "Av. Universidad 1823, Coyoacán",         phone: "+52 55 5550 1823", stars: 4.6 },
  "Kate & Doug San Pedro":    { addr: "Av. Vasconcelos 150, San Pedro Garza G.", phone: "+52 81 8550 0150", stars: 4.9 },
  "Kate & Doug Centro MTY":   { addr: "Padre Mier 825, Centro, Monterrey",      phone: "+52 81 8550 0825", stars: 4.6 },
  "Kate & Doug Cumbres":      { addr: "Av. Lázaro Cárdenas 2400, Cumbres",      phone: "+52 81 8550 2400", stars: 4.8 },
  "Clínica Veterinaria Condesa": { addr: "Av. Tamaulipas 88, Condesa",          phone: "+52 55 5550 0088", stars: 4.7 },
}

type View = "home" | "pets" | "book" | "history" | "plan"
type Overlay = "lobby" | "video" | "book-video" | "chat-lobby" | "chat" | "onboarding" | "success" | "notifications" | "kate-lobby" | "kate-ai" | "account" | null

export function TutorApp() {
  const [status, setStatus] = useState<"guest" | "loading" | "ready">("guest")
  const [activePetId, setActivePetId] = useState("bobby")
  const [view, setView] = useState<View>("home")
  const [overlay, setOverlay] = useState<Overlay>(null)
  const [activeAppointment, setActiveAppointment] = useState<ActiveAppointment | null>(null)
  const [showRejected, setShowRejected] = useState(false)
  const [showSearching, setShowSearching] = useState(false)
  const [showCancelled, setShowCancelled] = useState(false)
  const [confirmedAppt, setConfirmedAppt] = useState<ConfirmedAppointment | null>(null)
  const statusTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [streamCall, setStreamCall] = useState<Call | null>(null)
  const [streamClient, setStreamClient] = useState<StreamVideoClient | null>(null)

  const pet = PETS_DATA.find((p) => p.id === activePetId) || PETS_DATA[0]

  useEffect(() => () => { if (statusTimerRef.current) clearTimeout(statusTimerRef.current) }, [])

  const handleBookingDone = useCallback(() => {
    setOverlay(null)
    const appt: ActiveAppointment = {
      clinic: "Clínica Veterinaria Condesa",
      pet: pet.name,
      date: "hoy",
      time: "15:30",
      status: "pending",
    }
    setActiveAppointment(appt)
    statusTimerRef.current = setTimeout(() => {
      setActiveAppointment((a) => a ? { ...a, status: "confirmed" } : a)
    }, 8000)
  }, [pet.name])

  const handleLogin = useCallback(() => {
    setStatus("loading")
    // TODO: replace setTimeout with real Supabase data fetch
    setTimeout(() => setStatus("ready"), 3000)
  }, [])

  if (status === "guest") return <LoginScreen onLogin={handleLogin} />
  if (status === "loading") return <LoaderScreen />

  return (
    <div
      style={{
        background: "var(--bg)",
        minHeight: "100vh",
        maxWidth: 540,
        margin: "0 auto",
        position: "relative",
        boxShadow: "0 0 80px rgba(3,0,39,0.06)",
      }}
    >
      <MobileBar
        pets={PETS_DATA}
        activePetId={activePetId}
        onSelect={setActivePetId}
        onAddPet={() => setOverlay("onboarding")}
        onNotifications={() => setOverlay("notifications")}
        onAccount={() => setOverlay("account")}
      />

      {activeAppointment && (
        <AppointmentBanner
          appointment={activeAppointment}
          onPress={() => setView("history")}
          onDismiss={() => setActiveAppointment(null)}
        />
      )}

      <div key={view} className="kd-screen">
        {view === "home" && (
          <HomeScreen
            pet={pet}
            onNav={setView}
            onOpenChat={() => setOverlay("chat-lobby")}
            onOpenVideo={() => setOverlay("lobby")}
            onBookVideo={() => setOverlay("book-video")}
          onOpenKate={() => setOverlay("kate-lobby")}
          />
        )}
        {view === "pets" && (
          <PetsScreen
            pet={pet}
            allPets={PETS_DATA}
            onSelectPet={setActivePetId}
            onAddPet={() => setOverlay("onboarding")}
          />
        )}
        {view === "book" && (
          <BookScreen
            pet={pet}
            onComplete={() => { setView("home"); setOverlay("success") }}
            onBack={() => setView("home")}
          />
        )}
        {view === "history" && <HistoryScreen pet={pet} />}
        {view === "plan" && <PlanScreen />}
      </div>

      <BottomNav active={view} onChange={setView} />

      {/* Overlays */}
      {overlay === "lobby" && (
        <VideoLobbyScreen
          pet={pet}
          onJoin={(call, client) => { setStreamCall(call); setStreamClient(client); setOverlay("video") }}
          onCancel={() => setOverlay(null)}
        />
      )}
      {overlay === "book-video" && (
        <VideoBookingScreen
          onClose={() => setOverlay(null)}
          onDone={(goTo) => {
            setOverlay(null)
            if (goTo === "history") setView("history")
          }}
        />
      )}
      {overlay === "video" && streamCall && streamClient && (
        <VideoCallScreen
          pet={pet}
          call={streamCall}
          client={streamClient}
          onEnd={() => { setOverlay(null); setStreamCall(null); setStreamClient(null) }}
        />
      )}
      {overlay === "chat-lobby" && (
        <ChatLobbyScreen onJoin={() => setOverlay("chat")} onCancel={() => setOverlay(null)} />
      )}
      {overlay === "chat" && (
        <ChatScreen pet={pet} onBack={() => setOverlay(null)} />
      )}
      <AnimatedOverlay open={overlay === "onboarding"}>
        <OnboardingScreen onClose={() => setOverlay(null)} />
      </AnimatedOverlay>
      {overlay === "success" && (
        <BookingSuccessModal onClose={handleBookingDone} />
      )}
      {showRejected && activeAppointment && (
        <BookingRejectedModal
          clinicName={activeAppointment.clinic}
          onFindNearby={() => {
            setShowRejected(false)
            setShowSearching(true)
          }}
          onDismiss={() => {
            setShowRejected(false)
            setActiveAppointment(null)
            setShowCancelled(true)
          }}
        />
      )}
      {showSearching && activeAppointment && (
        <SearchingClinicModal
          rejectedClinic={activeAppointment.clinic}
          onAccepted={(newClinic) => {
            setShowSearching(false)
            const details = CLINIC_DETAILS[newClinic] ?? { addr: "", phone: "", stars: 4.8 }
            const updated = { ...activeAppointment, clinic: newClinic, status: "confirmed" as const }
            setActiveAppointment(updated)
            setConfirmedAppt({
              clinic: newClinic,
              clinicAddr: details.addr,
              clinicPhone: details.phone,
              clinicStars: details.stars,
              pet: activeAppointment.pet,
              date: activeAppointment.date,
              time: activeAppointment.time,
            })
          }}
          onCancel={() => {
            setShowSearching(false)
            setActiveAppointment(null)
            setShowCancelled(true)
          }}
        />
      )}
      {confirmedAppt && (
        <AppointmentConfirmedModal
          appointment={confirmedAppt}
          onClose={() => setConfirmedAppt(null)}
        />
      )}
      {showCancelled && (
        <BookingCancelledModal onClose={() => setShowCancelled(false)} />
      )}
      {overlay === "notifications" && (
        <NotificationsScreen onClose={() => setOverlay(null)} />
      )}
      <AnimatedOverlay open={overlay === "account"}>
        <AccountScreen
          onClose={() => setOverlay(null)}
          onGoToPlan={() => setView("plan")}
        />
      </AnimatedOverlay>
      <AnimatedOverlay open={overlay === "kate-lobby"}>
        <KateLobbyScreen
          onAccept={() => setOverlay("kate-ai")}
          onCancel={() => setOverlay(null)}
        />
      </AnimatedOverlay>
      <AnimatedOverlay open={overlay === "kate-ai"}>
        <KateAIScreen pet={pet} onClose={() => setOverlay(null)} />
      </AnimatedOverlay>

      {/* Dev quick-nav (only in dev) */}
      {process.env.NODE_ENV === "development" && (
        <DevPanel
          onLogin={() => setStatus("guest")}
          onVideo={() => setOverlay("video")}
          onChat={() => setOverlay("chat")}
          onOnboarding={() => setOverlay("onboarding")}
          onRejectAppt={() => {
            setActiveAppointment((a) => a
              ? { ...a, status: "rejected" }
              : { clinic: "Clínica Veterinaria Condesa", pet: pet.name, date: "hoy", time: "15:30", status: "rejected" }
            )
            setShowRejected(true)
          }}
          onMarkArrived={() => setActiveAppointment((a) => a ? { ...a, status: "in-progress" } : a)}
          onMarkNoShow={() => setActiveAppointment(null)}
        />
      )}
    </div>
  )
}

function DevPanel({
  onLogin,
  onVideo,
  onChat,
  onOnboarding,
  onRejectAppt,
  onMarkArrived,
  onMarkNoShow,
}: {
  onLogin: () => void
  onVideo: () => void
  onChat: () => void
  onOnboarding: () => void
  onRejectAppt: () => void
  onMarkArrived: () => void
  onMarkNoShow: () => void
}) {
  const [open, setOpen] = useState(false)
  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        style={{
          position: "fixed",
          bottom: 88,
          right: 16,
          width: 36,
          height: 36,
          borderRadius: 999,
          background: "var(--kd-prussian-blue)",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 300,
          boxShadow: "var(--shadow-md)",
          opacity: 0.5,
        }}
      >
        <Icon name="edit" size={16} />
      </button>
    )
  }
  return (
    <div
      style={{
        position: "fixed",
        bottom: 88,
        right: 16,
        width: 200,
        zIndex: 300,
        background: "var(--kd-white)",
        borderRadius: 16,
        boxShadow: "var(--shadow-lg)",
        border: "1px solid var(--border)",
        padding: 12,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <strong style={{ fontSize: 13 }}>Dev panel</strong>
        <button onClick={() => setOpen(false)} className="kd-btn kd-btn-icon kd-btn-sm kd-btn-ghost">
          <Icon name="x" size={16} />
        </button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {[
          ["Login", onLogin],
          ["Videollamada", onVideo],
          ["Chat", onChat],
          ["Onboarding", onOnboarding],
          ["Rechazar cita", onRejectAppt],
          ["Vet: llegó", onMarkArrived],
          ["Vet: no asistió", onMarkNoShow],
        ].map(([label, fn]) => (
          <button
            key={label as string}
            className="kd-btn kd-btn-sm kd-btn-secondary"
            onClick={fn as () => void}
            style={{ fontSize: 12, justifyContent: "flex-start" }}
          >
            {label as string}
          </button>
        ))}
      </div>
    </div>
  )
}
