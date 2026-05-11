export interface PetHistoryEntry {
  date: string
  title: string
  vet?: string
  diagnostico: string
  receta?: string
}

export interface Pet {
  id: string
  name: string
  species: string
  breed: string
  sex: string
  age: string
  weight: string
  color: string
  initial: string
  image: string
  nextVaccine: string
  chip: string
  conditions: string[]
  history: PetHistoryEntry[]
}

export const PETS_DATA: Pet[] = [
  {
    id: "bobby",
    name: "Bobby",
    species: "Perro",
    breed: "Border collie",
    sex: "Macho",
    age: "3 años",
    weight: "14.2 kg",
    color: "#1434CB",
    initial: "B",
    image: "https://images.unsplash.com/photo-1568572933382-74d440642117?w=400&q=80",
    nextVaccine: "Refuerzo séxtuple — 12 mayo",
    chip: "981 100 005 432 119",
    conditions: ["Alergia leve a pollo"],
    history: [
      {
        date: "24 abr 2026",
        title: "Receta antiparasitario",
        vet: "Dra. Mariana García",
        diagnostico: "Se detectaron signos leves de infestación parasitaria. Se prescribe tratamiento preventivo mensual.",
        receta: "Nexgard Spectra 30–60 kg · 1 tableta mensual por 3 meses",
      },
      {
        date: "12 abr 2026",
        title: "Consulta videollamada — Tos seca",
        vet: "Dra. Mariana García",
        diagnostico: "Tos seca persistente de 4 días. Descartada traqueobronquitis infecciosa. Probable irritación leve de vías respiratorias altas. Resolución espontánea esperada.",
        receta: "Antitusivo pediátrico 2.5 ml cada 8 h por 5 días. Mantener ambiente húmedo.",
      },
      {
        date: "02 abr 2026",
        title: "Examen general",
        vet: "Dr. Ramírez · Clínica San Ángel",
        diagnostico: "Revisión de rutina. Peso: 14.2 kg. BCS 4/9, condición corporal ideal. Dientes con acumulación moderada de sarro. Resto de exploración sin hallazgos relevantes.",
      },
    ],
  },
  {
    id: "tiana",
    name: "Tiana",
    species: "Perro",
    breed: "Schnauzer mini",
    sex: "Hembra",
    age: "6 años",
    weight: "8.6 kg",
    color: "#0F28A1",
    initial: "T",
    image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&q=80",
    nextVaccine: "Antirrábica — 3 junio",
    chip: "981 100 003 887 042",
    conditions: ["Sobrepeso leve", "Limpieza dental anual"],
    history: [
      {
        date: "10 abr 2026",
        title: "Control de peso",
        vet: "Dra. Mariana García",
        diagnostico: "Peso actual 8.6 kg. Meta 7.8 kg. Se ajusta dieta a 180 kcal/día. Sin otras alteraciones.",
        receta: "Royal Canin Mini Light 60 g / día dividido en 2 tomas.",
      },
    ],
  },
]

export const TUTOR_DATA = {
  name: "Rafael González",
  email: "rafael@kateanddoug.mx",
  phone: "+52 55 1234 5678",
  initial: "R",
  color: "#1434CB",
  address: {
    street: "Av. Insurgentes Sur 1234, Piso 3",
    colonia: "Del Valle",
    city: "Ciudad de México",
    cp: "03100",
  },
}

export const PLAN_INFO = {
  name: "Plan Esencial",
}

export const VET_INFO = {
  name: "Dra. Mariana García",
  role: "MVZ · Medicina general",
  avatar: "M",
  color: "#0F28A1",
}
