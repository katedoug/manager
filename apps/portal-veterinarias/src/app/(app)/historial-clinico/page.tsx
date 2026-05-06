"use client"

import { useState } from "react"
import { HideLoader } from "@/components/hide-loader"
import { TopBar } from "@/components/top-bar"
import { DataTable, type Patient } from "./components/data-table"
import { type PatientFormValues } from "./components/patient-form-dialog"
import { useDemoMode } from "@/context/demo-mode"

import initialData from "./data.json"

export default function HistorialClinicoPage() {
  const { isDemoMode } = useDemoMode()
  const [patients, setPatients] = useState<Patient[]>(initialData)

  const handleAddPatient = (data: PatientFormValues) => {
    const newPatient: Patient = {
      id:         Math.max(...patients.map(p => p.id)) + 1,
      name:       data.name,
      species:    data.species,
      breed:      data.breed,
      owner:      data.owner,
      ownerEmail: data.ownerEmail,
      status:     data.status,
      lastVisit:  new Date().toISOString().split("T")[0],
      joinedDate: new Date().toISOString().split("T")[0],
      visits:     0,
    }
    setPatients(prev => [newPatient, ...prev])
  }

  return (
    <>
      <HideLoader />
      <TopBar title="Historial Clínico" />
      <div className="flex-1 space-y-6 px-4 py-4 lg:px-6 lg:py-6">
        <div>
          <h1 className="text-2xl font-semibold">Historial Clínico</h1>
          <p className="text-sm text-muted-foreground">
            Gestiona el registro de pacientes y su historial de consultas
          </p>
        </div>

        <DataTable
          patients={isDemoMode ? patients : []}
          onAddPatient={handleAddPatient}
        />
      </div>
    </>
  )
}
