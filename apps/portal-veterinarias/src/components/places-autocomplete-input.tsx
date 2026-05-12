"use client"

import { useEffect, useRef, useState } from "react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

// Singleton so the script is only injected once per page
let mapsPromise: Promise<void> | null = null

function loadGoogleMaps(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if ((window as any).google?.maps?.places) return Promise.resolve()
  if (mapsPromise) return mapsPromise

  mapsPromise = new Promise((resolve, reject) => {
    const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
    if (!key) { reject(new Error("NEXT_PUBLIC_GOOGLE_MAPS_API_KEY is not set")); return }

    const script = document.createElement("script")
    script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places`
    script.async = true
    script.defer = true
    script.onload = () => resolve()
    script.onerror = () => { mapsPromise = null; reject(new Error("Failed to load Google Maps")) }
    document.head.appendChild(script)
  })

  return mapsPromise
}

interface PlacesAutocompleteInputProps extends Omit<React.ComponentProps<typeof Input>, "onChange" | "value"> {
  value?: string
  onChange?: (value: string) => void
}

export function PlacesAutocompleteInput({
  value,
  onChange,
  placeholder,
  name,
  className,
  ...props
}: PlacesAutocompleteInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [local, setLocal] = useState(value ?? "")

  // Keep in sync when parent controls the value
  useEffect(() => {
    if (value !== undefined) setLocal(value)
  }, [value])

  useEffect(() => {
    let destroyed = false

    loadGoogleMaps()
      .then(() => {
        if (destroyed || !inputRef.current) return
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const g = (window as any).google
        const ac = new g.maps.places.Autocomplete(inputRef.current, {
          componentRestrictions: { country: "mx" },
          fields: ["formatted_address"],
          types: ["address"],
        })

        ac.addListener("place_changed", () => {
          const place = ac.getPlace()
          const addr: string = place.formatted_address ?? ""
          setLocal(addr)
          onChange?.(addr)
        })
      })
      .catch(() => { /* API key missing or network error — fall back to plain input */ })

    return () => { destroyed = true }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Input
      {...props}
      ref={inputRef}
      name={name}
      value={local}
      placeholder={placeholder}
      className={cn(className)}
      onChange={(e) => {
        setLocal(e.target.value)
        onChange?.(e.target.value)
      }}
    />
  )
}
