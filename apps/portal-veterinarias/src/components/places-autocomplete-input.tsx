"use client"

import { useEffect, useRef, useState } from "react"
import { setOptions, importLibrary } from "@googlemaps/js-api-loader"
import { Input } from "@/components/ui/input"

// Configure the Maps API key once at module load
setOptions({
  key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "",
  version: "weekly",
})

interface Props extends Omit<React.ComponentProps<typeof Input>, "onChange" | "value"> {
  /** Pass field.value for react-hook-form controlled usage */
  value?: string
  /** Pass field.onChange for react-hook-form controlled usage */
  onChange?: (value: string) => void
}

export function PlacesAutocompleteInput({ value, onChange, ...props }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [local, setLocal] = useState(value ?? "")

  // Stay in sync when parent controls the value (react-hook-form)
  useEffect(() => {
    if (value !== undefined) setLocal(value)
  }, [value])

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) return

    let active = true

    importLibrary("places")
      .then((lib) => {
        if (!active || !inputRef.current) return

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { Autocomplete } = lib as any

        const ac = new Autocomplete(inputRef.current, {
          componentRestrictions: { country: "mx" },
          fields: ["formatted_address"],
          types: ["address"],
        })

        ac.addListener("place_changed", () => {
          const place = ac.getPlace()
          const addr: string = place?.formatted_address ?? ""
          setLocal(addr)
          onChange?.(addr)
        })
      })
      .catch(() => {
        // Falls back to a plain text input on API failure
      })

    return () => {
      active = false
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Input
      {...props}
      ref={inputRef}
      value={local}
      onChange={(e) => {
        setLocal(e.target.value)
        onChange?.(e.target.value)
      }}
    />
  )
}
