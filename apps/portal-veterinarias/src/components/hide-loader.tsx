"use client"

import { useEffect } from "react"
import { useLoader } from "@/components/loader-provider"

export function HideLoader() {
  const { hide } = useLoader()
  useEffect(() => { hide() }, [hide])
  return null
}
