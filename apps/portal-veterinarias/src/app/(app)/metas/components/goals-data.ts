import {
  DollarSign, CalendarCheck, RefreshCcw, XCircle,
  Users, UserPlus, Syringe, Sparkles, HeartPulse, Star,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

export type GoalPeriod   = "mensual" | "semanal"
export type GoalCategory = "financiero" | "operacional" | "pacientes" | "servicios"

export type Goal = {
  id:              string
  category:        GoalCategory
  title:           string
  description:     string
  icon:            LucideIcon
  unit:            string
  prefix?:         string
  current:         number
  target:          number
  period:          GoalPeriod
  higherIsBetter:  boolean
}

export const categoryLabel: Record<GoalCategory, string> = {
  financiero:   "Financiero",
  operacional:  "Operacional",
  pacientes:    "Pacientes",
  servicios:    "Servicios",
}

export const categoryColor: Record<GoalCategory, string> = {
  financiero:  "text-indigo-700 bg-indigo-50 border-indigo-200",
  operacional: "text-violet-700 bg-violet-50 border-violet-200",
  pacientes:   "text-teal-700 bg-teal-50 border-teal-200",
  servicios:   "text-amber-700 bg-amber-50 border-amber-200",
}

export const GOALS: Goal[] = [
  // ── Financiero
  {
    id: "ingresos",
    category: "financiero",
    title: "Ingresos del mes",
    description: "Total de ingresos generados en el período seleccionado.",
    icon: DollarSign,
    unit: "MXN",
    prefix: "$",
    current: 24180,
    target: 28000,
    period: "mensual",
    higherIsBetter: true,
  },
  {
    id: "ingreso-por-cita",
    category: "financiero",
    title: "Ingreso promedio por cita",
    description: "Ticket promedio por cada consulta o servicio.",
    icon: DollarSign,
    unit: "MXN",
    prefix: "$",
    current: 975,
    target: 1100,
    period: "mensual",
    higherIsBetter: true,
  },
  {
    id: "calificacion",
    category: "financiero",
    title: "Calificación mínima",
    description: "Promedio de reseñas de clientes en el período.",
    icon: Star,
    unit: "/ 5",
    current: 4.8,
    target: 4.5,
    period: "mensual",
    higherIsBetter: true,
  },
  // ── Operacional
  {
    id: "consultas",
    category: "operacional",
    title: "Consultas realizadas",
    description: "Número de citas atendidas en el período.",
    icon: CalendarCheck,
    unit: "consultas",
    current: 248,
    target: 280,
    period: "mensual",
    higherIsBetter: true,
  },
  {
    id: "cancel-rate",
    category: "operacional",
    title: "Cancel Rate máximo",
    description: "Porcentaje de citas canceladas. Mantenerlo bajo el umbral.",
    icon: XCircle,
    unit: "%",
    current: 7.4,
    target: 10,
    period: "mensual",
    higherIsBetter: false,
  },
  {
    id: "consultas-semanales",
    category: "operacional",
    title: "Consultas por semana",
    description: "Ritmo semanal de atención para cumplir la meta mensual.",
    icon: CalendarCheck,
    unit: "consultas",
    current: 62,
    target: 70,
    period: "semanal",
    higherIsBetter: true,
  },
  // ── Pacientes
  {
    id: "retencion",
    category: "pacientes",
    title: "Tasa de retención",
    description: "Porcentaje de clientes que regresan a la clínica.",
    icon: RefreshCcw,
    unit: "%",
    current: 87.4,
    target: 90,
    period: "mensual",
    higherIsBetter: true,
  },
  {
    id: "nuevos-pacientes",
    category: "pacientes",
    title: "Nuevos pacientes",
    description: "Pacientes que visitan la clínica por primera vez.",
    icon: UserPlus,
    unit: "pacientes",
    current: 34,
    target: 50,
    period: "mensual",
    higherIsBetter: true,
  },
  {
    id: "pacientes-activos",
    category: "pacientes",
    title: "Pacientes activos",
    description: "Base total de pacientes con al menos 1 visita en los últimos 90 días.",
    icon: Users,
    unit: "pacientes",
    current: 1102,
    target: 1200,
    period: "mensual",
    higherIsBetter: true,
  },
  // ── Servicios
  {
    id: "vacunaciones",
    category: "servicios",
    title: "Vacunaciones",
    description: "Servicios de vacunación completados en el período.",
    icon: Syringe,
    unit: "servicios",
    current: 69,
    target: 80,
    period: "mensual",
    higherIsBetter: true,
  },
  {
    id: "limpieza-dental",
    category: "servicios",
    title: "Limpiezas dentales",
    description: "Cantidad de limpiezas dentales realizadas.",
    icon: Sparkles,
    unit: "servicios",
    current: 37,
    target: 50,
    period: "mensual",
    higherIsBetter: true,
  },
  {
    id: "consultas-generales",
    category: "servicios",
    title: "Consultas generales",
    description: "Consultas de diagnóstico y revisión general.",
    icon: HeartPulse,
    unit: "consultas",
    current: 104,
    target: 120,
    period: "mensual",
    higherIsBetter: true,
  },
]
