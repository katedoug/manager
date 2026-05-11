"use client"

import Image from "next/image"

export function LoaderScreen() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#E8EDFF",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 32,
      }}
    >
      <Image src="/logo.svg" alt="Kate&Doug" width={120} height={28} priority />
      <div className="kd-spinner" style={{ width: 40, height: 40 }} />
    </div>
  )
}
