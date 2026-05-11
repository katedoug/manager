"use client"

import { useEffect } from "react"
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

export interface ClinicPin {
  id: string
  name: string
  addr: string
  dist: string
  stars: number
  lat: number
  lng: number
  city: "CDMX" | "MTY"
  especialidad: "perros" | "gatos" | "ambos"
}

interface ClinicMapPickerProps {
  clinics: ClinicPin[]
  selectedId: string
  center: [number, number]
  zoom: number
  onSelect: (id: string) => void
}

function MapRecenter({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap()
  useEffect(() => {
    map.flyTo(center, zoom, { duration: 1 })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [center[0], center[1]])
  return null
}

function makeIcon(selected: boolean) {
  const bg = selected ? "#030027" : "#1434CB"
  const svg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`
  return L.divIcon({
    className: "",
    html: `<div style="width:44px;height:44px;border-radius:999px;background:${bg};display:flex;align-items:center;justify-content:center;border:3px solid white;box-shadow:0 4px 12px rgba(0,0,0,0.3);transition:all 200ms">${svg}</div>`,
    iconSize: [44, 44],
    iconAnchor: [22, 44],
    popupAnchor: [0, -48],
  })
}

export function ClinicMapPicker({ clinics, selectedId, center, zoom, onSelect }: ClinicMapPickerProps) {
  useEffect(() => {
    // Fix Leaflet default icon resolution in Next.js bundler
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (L.Icon.Default.prototype as any)._getIconUrl
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
      iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    })
  }, [])

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{ width: "100%", height: "100%" }}
      zoomControl={false}
      attributionControl={false}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://carto.com">CARTO</a>'
      />
      <MapRecenter center={center} zoom={zoom} />
      {clinics.map((c) => (
        <Marker
          key={c.id}
          position={[c.lat, c.lng]}
          icon={makeIcon(c.id === selectedId)}
          eventHandlers={{ click: () => onSelect(c.id) }}
        />
      ))}
    </MapContainer>
  )
}
