"use client"

import React, { useState, useEffect } from "react"
import { AssistantRuntimeProvider } from "@assistant-ui/react"
import { useChatRuntime, AssistantChatTransport } from "@assistant-ui/react-ai-sdk"
import { lastAssistantMessageIsCompleteWithToolCalls } from "ai"
import { Thread } from "@/components/assistant-ui/thread"
import { ThreadListSidebar } from "@/components/assistant-ui/threadlist-sidebar"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Icon } from "../icon"
import type { Pet } from "@/lib/data"

interface KateAIScreenProps {
  pet: Pet
  onClose: () => void
}

function buildPetContext(pet: Pet): string {
  const conditions = pet.conditions.length
    ? pet.conditions.join(", ")
    : "Ninguna registrada"

  const historyText = pet.history
    .map((h) =>
      [
        `• ${h.date} — ${h.title}${h.vet ? ` (${h.vet})` : ""}`,
        `  Diagnóstico: ${h.diagnostico}`,
        h.receta ? `  Tratamiento: ${h.receta}` : "",
      ]
        .filter(Boolean)
        .join("\n")
    )
    .join("\n\n")

  return `## Expediente del paciente

Nombre: ${pet.name}
Especie: ${pet.species}
Raza: ${pet.breed}
Sexo: ${pet.sex}
Edad: ${pet.age}
Peso: ${pet.weight}
Condiciones médicas: ${conditions}
Próxima vacuna: ${pet.nextVaccine}

## Historial clínico reciente

${historyText || "Sin registros previos."}

---
Usa esta información para responder sin preguntar datos que ya conoces. Si el tutor menciona síntomas ya registrados en el historial, refiérete a ellos con contexto clínico.`
}

function KateRuntime({ pet, onClose }: KateAIScreenProps) {
  const runtime = useChatRuntime({
    sendAutomaticallyWhen: lastAssistantMessageIsCompleteWithToolCalls,
    transport: new AssistantChatTransport({
      api: "/api/chat",
      body: { petContext: buildPetContext(pet) },
    }),
  })

  const [ready, setReady] = useState(false)
  const [loaderMounted, setLoaderMounted] = useState(true)
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 900)
    return () => clearTimeout(t)
  }, [])

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {loaderMounted && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              background: "var(--bg)",
              gap: 16,
              opacity: ready ? 0 : 1,
              transition: "opacity 300ms ease",
              pointerEvents: ready ? "none" : "auto",
            }}
            onTransitionEnd={() => { if (ready) setLoaderMounted(false) }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/kate-avatar.png" alt="Kate" style={{ width: 64, height: 64, borderRadius: 18, display: "block" }} />
            <div className="kd-spinner" style={{ width: 28, height: 28 }} />
          </div>
        )}
        <SidebarProvider defaultOpen={false} style={{ flex: 1, minHeight: 0, "--sidebar-z-index": 110 } as React.CSSProperties}>
          <ThreadListSidebar />
          <SidebarInset className="flex flex-col overflow-hidden">
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
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/kate-avatar.png" alt="Kate" style={{ width: 36, height: 36, borderRadius: 10, display: "block", flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 15, lineHeight: 1.2 }}>Kate</div>
                <div style={{ fontSize: 12, color: "var(--fg2)" }}>
                  Consultando expediente de {pet.name}
                </div>
              </div>
              <SidebarTrigger className="kd-btn kd-btn-icon kd-btn-sm kd-btn-ghost" />
            </div>

            {/* Thread */}
            <div style={{ flex: 1, overflow: "hidden" }}>
              <Thread />
            </div>
          </SidebarInset>
        </SidebarProvider>
      </div>
    </AssistantRuntimeProvider>
  )
}

export function KateAIScreen({ pet, onClose }: KateAIScreenProps) {
  return <KateRuntime pet={pet} onClose={onClose} />
}
