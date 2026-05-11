"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Icon } from "../icon"

interface OnboardingScreenProps {
  onClose: () => void
}

type Species = "perro" | "gato"
type Sex = "macho" | "hembra"

const DOG_BREEDS = [
  // Más comunes en México / LATAM
  "Mestizo",
  "Xoloitzcuintli / Xolo",
  "Chihuahua",
  "Golden Retriever",
  "Labrador Retriever",
  "Pastor Alemán",
  "Bulldog Francés",
  "Poodle / Caniche Toy",
  "Poodle / Caniche Miniatura",
  "Poodle / Caniche Estándar",
  "Yorkshire Terrier",
  "Beagle",
  "Rottweiler",
  "Husky Siberiano",
  "Pomerania",
  "Shih Tzu",
  "Boxer",
  "Dachshund / Salchicha",
  "Schnauzer Miniatura",
  "Schnauzer Estándar",
  "Schnauzer Gigante",
  "Cocker Spaniel Inglés",
  "Cocker Spaniel Americano",
  "Pug / Carlino",
  "Maltés",
  "Doberman Pinscher",
  "Gran Danés",
  "Dálmata",
  "Border Collie",
  // Pastores y de trabajo
  "Australian Shepherd / Pastor Australiano",
  "Belgian Malinois / Pastor Belga",
  "Pastor Belga Tervuren",
  "Pastor Belga Groenendael",
  "Collie de pelo largo",
  "Collie de pelo corto",
  "Shetland Sheepdog / Sheltie",
  "Old English Sheepdog / Bobtail",
  "Welsh Corgi Pembroke",
  "Welsh Corgi Cardigan",
  "Australian Cattle Dog",
  "Australian Kelpie",
  "Bearded Collie",
  "Bouvier des Flandres",
  "Briard",
  "Puli",
  "Komondor",
  "Mudi",
  // Terriers
  "American Staffordshire Terrier",
  "Pit Bull Terrier",
  "Bull Terrier",
  "Staffordshire Bull Terrier",
  "Jack Russell Terrier",
  "Parson Russell Terrier",
  "West Highland White Terrier",
  "Scottish Terrier",
  "Cairn Terrier",
  "Airedale Terrier",
  "Fox Terrier de pelo liso",
  "Fox Terrier de pelo duro",
  "Bedlington Terrier",
  "Border Terrier",
  "Norfolk Terrier",
  "Norwich Terrier",
  "Miniature Bull Terrier",
  "Manchester Terrier",
  "Welsh Terrier",
  "Lakeland Terrier",
  "Kerry Blue Terrier",
  "Irish Terrier",
  "Soft Coated Wheaten Terrier",
  // Sabuesos y rastreadores
  "Basset Hound",
  "Bloodhound",
  "Beagle Harrier",
  "Rhodesian Ridgeback",
  "Dogo Argentino",
  "Cane Corso",
  "Bullmastiff",
  "Mastín Inglés",
  "Mastín Napolitano",
  "Dogo de Burdeos",
  "Fila Brasileiro",
  // Nórdicos / Spitz
  "Alaskan Malamute",
  "Samoyedo",
  "Akita Inu",
  "Akita Americano",
  "Shiba Inu",
  "Chow Chow",
  "Keeshond",
  "Spitz Alemán",
  "Schipperke",
  "Finnish Spitz",
  "Norwegian Elkhound",
  "Karelian Bear Dog",
  // Montaña y de guarda
  "Boyero de Berna / Bernés",
  "San Bernardo",
  "Terranova",
  "Leonberger",
  "Mastín Tibetano",
  "Kangal",
  "Montaña de los Pirineos",
  "Landseer",
  "Greater Swiss Mountain Dog",
  // Galgos y vista
  "Greyhound",
  "Whippet",
  "Galgo Español",
  "Galgo Italiano",
  "Afghan Hound / Lebrel Afgano",
  "Irish Wolfhound",
  "Borzoi / Galgo Ruso",
  "Saluki",
  "Basenji",
  "Pharaoh Hound",
  // Cobradores y de caza
  "Weimaraner",
  "Vizsla",
  "Braco Alemán de pelo corto",
  "Braco Alemán de pelo duro",
  "Pointer Inglés",
  "Setter Inglés",
  "Setter Irlandés",
  "Setter Gordon",
  "Springer Spaniel Inglés",
  "Springer Spaniel Galés",
  "Cavalier King Charles Spaniel",
  "Flat-Coated Retriever",
  "Nova Scotia Duck Tolling Retriever",
  "Chesapeake Bay Retriever",
  "Curly-Coated Retriever",
  "Épagneul Breton",
  // Compañía / Toy
  "Bichón Frisé",
  "Havanese",
  "Bolognese",
  "Coton de Tulear",
  "Maltipoo",
  "Goldendoodle",
  "Labradoodle",
  "Cockapoo",
  "Shar Pei",
  "Pekingés",
  "Japanese Chin",
  "Lhasa Apso",
  "Tibetan Spaniel",
  "Papillon",
  "Miniature Pinscher",
  "Affenpinscher",
  "Brussels Griffon",
  "Chinese Crested",
  "Russian Toy",
  "Löwchen",
  "Biewer Terrier",
  // Bulldogs
  "Bulldog Inglés",
  "Bulldog Americano",
  "Boston Terrier",
  // Agua
  "Portuguese Water Dog",
  "Spanish Water Dog / Perro de Agua Español",
  "Lagotto Romagnolo",
  "Irish Water Spaniel",
  // Otros notables
  "Akbash",
  "Anatolian Shepherd",
  "Canaan Dog",
  "Eurasier",
  "Estrela Mountain Dog",
  "Kuvasz",
  "Black Russian Terrier",
]

const CAT_BREEDS = [
  // Domésticos / sin pedigree
  "Mestizo",
  "Doméstico de pelo corto",
  "Doméstico de pelo largo",
  "Doméstico de pelo medio",
  // Razas populares
  "Persa",
  "Siamés",
  "Maine Coon",
  "Ragdoll",
  "Bengalí",
  "Abisinio",
  "Sphynx / Esfinge",
  "Birmano",
  "Azul Ruso",
  "Scottish Fold",
  "Scottish Straight",
  "Angora Turco",
  "Bosque de Noruega",
  "Burmés",
  "Devon Rex",
  "Cornish Rex",
  "Chartreux",
  "Somali",
  "Tonkinés",
  "Manx",
  "Himalayo",
  "Ocicat",
  // British / American
  "British Shorthair",
  "British Longhair",
  "American Shorthair",
  "American Curl",
  "American Bobtail",
  "Exotic Shorthair / Exótico",
  // Rex y sin pelo
  "Selkirk Rex",
  "LaPerm",
  "Peterbald",
  "Donskoy / Don Sphynx",
  "Ukrainian Levkoy",
  // Orientales
  "Oriental de pelo corto",
  "Oriental de pelo largo",
  "Balinés",
  "Javanés",
  "Colorpoint Shorthair",
  // Pequeños / mini
  "Munchkin",
  "Singapura",
  "Napoleon / Minuet",
  // Otros
  "Ragamuffin",
  "Savannah",
  "Lykoi",
  "Khao Manee",
  "Korat",
  "Burmilla",
  "Bombay",
  "Egyptian Mau",
  "Pixiebob",
  "Kurilian Bobtail",
  "Japanese Bobtail",
  "Snowshoe",
  "Havana Brown",
  "Chantilly / Tiffany",
  "Australian Mist",
  "Cymric",
  "Sokoke",
]

const CONDITIONS = [
  "Alergia alimentaria",
  "Sobrepeso",
  "Diabetes",
  "Cardiopatía",
  "Problema articular",
  "Enfermedad renal",
]

const TOTAL_STEPS = 9

export function OnboardingScreen({ onClose }: OnboardingScreenProps) {
  const [step, setStep] = useState(0)
  const [dir, setDir] = useState<"right" | "left">("right")
  const [isLoading, setIsLoading] = useState(false)
  const [loadingMsg, setLoadingMsg] = useState(0)

  const [name, setName] = useState("")
  const [species, setSpecies] = useState<Species | null>(null)
  const [sex, setSex] = useState<Sex | null>(null)
  const [breed, setBreed] = useState("")
  const [ageYears, setAgeYears] = useState("")
  const [ageMonths, setAgeMonths] = useState("")
  const [weight, setWeight] = useState("")
  const [conditions, setConditions] = useState<string[]>([])
  const [otroCondicion, setOtroCondicion] = useState("")

  const inputRef = useRef<HTMLInputElement>(null)

  const goNext = useCallback(() => {
    if (step === 7) {
      setIsLoading(true)
      setLoadingMsg(0)
      const t1 = setTimeout(() => setLoadingMsg(1), 800)
      const t2 = setTimeout(() => setLoadingMsg(2), 1600)
      const t3 = setTimeout(() => {
        setIsLoading(false)
        setDir("right")
        setStep(8)
      }, 2400)
      return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
    }
    setDir("right")
    setStep((s) => s + 1)
  }, [step])

  const goBack = useCallback(() => {
    if (step === 0) { onClose(); return }
    setDir("left")
    setStep((s) => s - 1)
  }, [step, onClose])

  const canContinue = [
    name.trim().length > 0,   // 0 nombre
    true,                      // 1 especie (auto)
    true,                      // 2 sexo (auto)
    true,                      // 3 raza (optional)
    ageYears.trim().length > 0, // 4 años
    true,                      // 5 meses (optional, 0 valid)
    weight.trim().length > 0,  // 6 peso
    true,                      // 7 condiciones (optional)
    false,                     // 8 success
  ][step] ?? false

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" && canContinue && step < TOTAL_STEPS - 1) goNext()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [step, canContinue, goNext])

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 320)
  }, [step])

  const toggleCondition = (c: string) => {
    setConditions((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]
    )
  }

  const breeds = species === "gato" ? CAT_BREEDS : DOG_BREEDS
  const progress = step / (TOTAL_STEPS - 1)

  const ageLabel = [
    ageYears ? `${ageYears} año${ageYears === "1" ? "" : "s"}` : "",
    ageMonths && ageMonths !== "0" ? `${ageMonths} mes${ageMonths === "1" ? "" : "es"}` : "",
  ].filter(Boolean).join(", ") || "—"

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", background: "var(--bg)" }}>
      {/* Top bar */}
      <div style={{ padding: "14px 16px 0", display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
        <button className="kd-btn kd-btn-icon kd-btn-sm kd-btn-ghost" onClick={goBack}>
          <Icon name="chevronLeft" size={20} />
        </button>
        <div style={{ flex: 1, height: 3, borderRadius: 99, background: "var(--border)", overflow: "hidden" }}>
          <div
            style={{
              height: "100%", borderRadius: 99,
              background: "var(--kd-persian-blue)",
              width: `${progress * 100}%`,
              transition: "width 400ms var(--ease-soft)",
            }}
          />
        </div>
        <span style={{ fontSize: 12, color: "var(--fg3)", fontWeight: 600, minWidth: 32, textAlign: "right" }}>
          {step + 1}/{TOTAL_STEPS}
        </span>
      </div>

      {/* Loader */}
      {isLoading && (
        <div style={{
          flex: 1, display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", gap: 28, padding: 32,
        }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/kate-avatar.png" alt="" style={{ width: 72, height: 72, borderRadius: 20, boxShadow: "0 8px 32px rgba(3,0,39,0.18)" }} />
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 8, letterSpacing: "-0.01em" }}>
              {name ? `Creando el expediente de ${name}` : "Creando expediente"}
            </div>
            <div key={loadingMsg} className="ob-enter-right" style={{ fontSize: 14, color: "var(--fg2)", minHeight: 20 }}>
              {["Guardando información…", "Verificando datos…", "Preparando expediente…"][loadingMsg]}
            </div>
          </div>
          <div style={{ width: 180, height: 4, borderRadius: 99, background: "var(--border)", overflow: "hidden" }}>
            <div style={{
              height: "100%", borderRadius: 99,
              background: "var(--kd-persian-blue)",
              width: `${(loadingMsg + 1) * 33}%`,
              transition: "width 700ms var(--ease-soft)",
            }} />
          </div>
        </div>
      )}

      {/* Step content */}
      {!isLoading && <div
        key={step}
        className={dir === "right" ? "ob-enter-right" : "ob-enter-left"}
        style={{ flex: 1, display: "flex", flexDirection: "column", padding: "40px 24px 24px", overflowY: "auto" }}
      >

        {step === 0 && (
          <TextStep
            question="¿Cómo se llama tu mascota?"
            hint="El nombre como lo usas tú en casa."
            value={name} onChange={setName}
            placeholder="Ej. Luna, Rocco, Frida…"
            inputRef={inputRef}
          />
        )}

        {step === 1 && (
          <ChoiceStep
            question={`${name || "Tu mascota"} es…`}
            options={[
              { key: "A", label: "Perro", value: "perro" },
              { key: "B", label: "Gato",  value: "gato"  },
            ]}
            value={species}
            onSelect={(v) => { setSpecies(v as Species); setTimeout(goNext, 280) }}
          />
        )}

        {step === 2 && (
          <ChoiceStep
            question={`¿${name || "Tu mascota"} es macho o hembra?`}
            options={[
              { key: "A", label: "Macho",  value: "macho"  },
              { key: "B", label: "Hembra", value: "hembra" },
            ]}
            value={sex}
            onSelect={(v) => { setSex(v as Sex); setTimeout(goNext, 280) }}
          />
        )}

        {step === 3 && (
          <BreedStep
            name={name}
            breeds={breeds}
            value={breed}
            onChange={setBreed}
            inputRef={inputRef}
          />
        )}

        {step === 4 && (
          <NumberStep
            question={`¿Cuántos años tiene ${name || "tu mascota"}?`}
            value={ageYears} onChange={setAgeYears}
            placeholder="0"
            inputRef={inputRef}
          />
        )}

        {step === 5 && (
          <NumberStep
            question={`¿Y cuántos meses?`}
            hint="Si cumplió exactamente años, escribe 0."
            value={ageMonths} onChange={setAgeMonths}
            placeholder="0" max={11}
            inputRef={inputRef}
          />
        )}

        {step === 6 && (
          <NumberStep
            question={`¿Cuánto pesa ${name || "tu mascota"}?`}
            hint="Aproximado está bien."
            suffix="kg"
            value={weight} onChange={setWeight}
            placeholder="0"
            inputRef={inputRef}
          />
        )}

        {step === 7 && (
          <ConditionsStep
            conditions={conditions}
            onToggle={toggleCondition}
            otroText={otroCondicion}
            onOtroChange={setOtroCondicion}
          />
        )}

        {step === 8 && (
          <SuccessStep
            name={name}
            species={species}
            sex={sex}
            breed={breed}
            ageLabel={ageLabel}
            weight={weight}
            conditions={conditions}
            otroCondicion={otroCondicion}
          />
        )}
      </div>}

      {/* Bottom */}
      {!isLoading && <div style={{ padding: "12px 24px 32px", flexShrink: 0 }}>
        {step < TOTAL_STEPS - 1 ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <button
              className="kd-btn kd-btn-primary kd-btn-lg kd-btn-block"
              onClick={goNext}
              disabled={!canContinue}
              style={{ opacity: canContinue ? 1 : 0.38, transition: "opacity 150ms ease" }}
            >
              Continuar <Icon name="arrowRight" size={18} />
            </button>
            {(step === 3 || step === 5 || step === 7) && (
              <button className="kd-btn kd-btn-ghost kd-btn-block" onClick={goNext} style={{ fontSize: 14 }}>
                Saltar por ahora
              </button>
            )}
            {step !== 1 && step !== 2 && (
              <p style={{ textAlign: "center", fontSize: 12, color: "var(--fg3)", margin: 0 }}>
                o presiona <strong>Enter ↵</strong>
              </p>
            )}
          </div>
        ) : (
          <button className="kd-btn kd-btn-primary kd-btn-lg kd-btn-block" onClick={onClose}>
            <Icon name="checkCircle" size={18} /> Ir a inicio
          </button>
        )}
      </div>}
    </div>
  )
}

/* ── Sub-components ──────────────────────────────────────────────────────── */

function QHeader({ question, hint, optional }: { question: string; hint?: string; optional?: boolean }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <h2 style={{ fontSize: 28, fontWeight: 700, margin: "0 0 10px", lineHeight: 1.2, letterSpacing: "-0.02em" }}>
        {question}
      </h2>
      {hint && <p style={{ fontSize: 15, color: "var(--fg2)", margin: 0 }}>{hint}</p>}
      {optional && <p style={{ fontSize: 13, color: "var(--fg3)", margin: "4px 0 0" }}>Opcional</p>}
    </div>
  )
}

function UnderlineInput({
  value, onChange, placeholder, inputRef, type = "text",
}: {
  value: string
  onChange: (v: string) => void
  placeholder?: string
  inputRef?: React.RefObject<HTMLInputElement | null>
  type?: string
}) {
  return (
    <input
      ref={inputRef}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      style={{
        width: "100%", fontSize: 22, fontWeight: 600,
        color: "var(--fg1)", background: "transparent",
        border: "none", borderBottom: "2px solid var(--border)",
        borderRadius: 0, padding: "12px 0", outline: "none",
        fontFamily: "var(--font-sans)", transition: "border-color 150ms ease",
        boxSizing: "border-box",
      }}
      onFocus={(e) => (e.target.style.borderBottomColor = "var(--kd-persian-blue)")}
      onBlur={(e) => (e.target.style.borderBottomColor = "var(--border)")}
    />
  )
}

function TextStep({ question, hint, value, onChange, placeholder, inputRef, optional }: {
  question: string; hint?: string; value: string; onChange: (v: string) => void
  placeholder?: string; inputRef: React.RefObject<HTMLInputElement | null>; optional?: boolean
}) {
  return (
    <>
      <QHeader question={question} hint={hint} optional={optional} />
      <UnderlineInput value={value} onChange={onChange} placeholder={placeholder} inputRef={inputRef} />
    </>
  )
}

function NumberStep({ question, hint, value, onChange, placeholder, suffix, max, inputRef }: {
  question: string; hint?: string; value: string; onChange: (v: string) => void
  placeholder?: string; suffix?: string; max?: number
  inputRef: React.RefObject<HTMLInputElement | null>
}) {
  const handleChange = (raw: string) => {
    const digits = raw.replace(/\D/g, "")
    if (max !== undefined && digits !== "" && parseInt(digits) > max) return
    onChange(digits)
  }
  return (
    <>
      <QHeader question={question} hint={hint} />
      <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
        <input
          ref={inputRef}
          type="tel"
          inputMode="numeric"
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          placeholder={placeholder}
          style={{
            flex: 1, fontSize: 40, fontWeight: 700,
            color: "var(--fg1)", background: "transparent",
            border: "none", borderBottom: "2px solid var(--border)",
            borderRadius: 0, padding: "12px 0", outline: "none",
            fontFamily: "var(--font-display)", transition: "border-color 150ms ease",
            letterSpacing: "-0.02em",
          }}
          onFocus={(e) => (e.target.style.borderBottomColor = "var(--kd-persian-blue)")}
          onBlur={(e) => (e.target.style.borderBottomColor = "var(--border)")}
        />
        {suffix && (
          <span style={{ fontSize: 28, fontWeight: 600, color: "var(--fg2)" }}>{suffix}</span>
        )}
      </div>
    </>
  )
}

function ChoiceStep({ question, options, value, onSelect }: {
  question: string
  options: { key: string; label: string; value: string }[]
  value: string | null
  onSelect: (v: string) => void
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const opt = options.find((o) => o.key.toLowerCase() === e.key.toLowerCase())
      if (opt) onSelect(opt.value)
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [options, onSelect])

  return (
    <>
      <QHeader question={question} />
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {options.map((opt) => {
          const active = value === opt.value
          return (
            <button
              key={opt.value}
              onClick={() => onSelect(opt.value)}
              style={{
                display: "flex", alignItems: "center", gap: 16,
                padding: "20px 20px", borderRadius: 18,
                border: `2px solid ${active ? "var(--kd-persian-blue)" : "var(--border)"}`,
                background: active ? "var(--kd-lavender)" : "var(--kd-white)",
                cursor: "pointer", transition: "all 150ms ease", textAlign: "left",
              }}
            >
              <span style={{
                width: 32, height: 32, borderRadius: 8, flexShrink: 0,
                background: active ? "var(--kd-persian-blue)" : "var(--kd-lavender)",
                color: active ? "#fff" : "var(--kd-persian-blue)",
                fontSize: 13, fontWeight: 700,
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 150ms ease",
              }}>
                {opt.key}
              </span>
              <span style={{ fontSize: 17, fontWeight: 600, color: active ? "var(--kd-persian-blue)" : "var(--fg1)", transition: "color 150ms ease" }}>
                {opt.label}
              </span>
              {active && <span style={{ marginLeft: "auto" }}><Icon name="check" size={18} color="var(--kd-persian-blue)" /></span>}
            </button>
          )
        })}
      </div>
    </>
  )
}

function BreedStep({ name, breeds, value, onChange, inputRef }: {
  name: string; breeds: string[]; value: string
  onChange: (v: string) => void; inputRef: React.RefObject<HTMLInputElement | null>
}) {
  const [open, setOpen] = useState(false)
  const filtered = value.trim().length > 0
    ? breeds.filter((b) => b.toLowerCase().includes(value.toLowerCase())).slice(0, 7)
    : []

  return (
    <>
      <QHeader
        question={`¿Cuál es la raza de ${name || "tu mascota"}?`}
        hint="Si no conoces la raza exacta, escribe Mestizo."
        optional
      />
      <div style={{ position: "relative" }}>
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => { onChange(e.target.value); setOpen(true) }}
          placeholder="Empieza a escribir…"
          style={{
            width: "100%", fontSize: 22, fontWeight: 600,
            color: "var(--fg1)", background: "transparent",
            border: "none", borderBottom: "2px solid var(--border)",
            borderRadius: 0, padding: "12px 0", outline: "none",
            fontFamily: "var(--font-sans)", transition: "border-color 150ms ease",
            boxSizing: "border-box",
          }}
          onFocus={(e) => { e.target.style.borderBottomColor = "var(--kd-persian-blue)"; setOpen(true) }}
          onBlur={(e) => {
            e.target.style.borderBottomColor = "var(--border)"
            setTimeout(() => setOpen(false), 150)
          }}
        />
        {open && filtered.length > 0 && (
          <div style={{
            position: "absolute", top: "calc(100% + 6px)", left: 0, right: 0,
            background: "var(--kd-white)", border: "1px solid var(--border)",
            borderRadius: 14, overflow: "hidden",
            boxShadow: "0 8px 24px rgba(3,0,39,0.10)",
            zIndex: 20,
          }}>
            {filtered.map((b, i) => (
              <button
                key={b}
                onMouseDown={() => { onChange(b); setOpen(false) }}
                style={{
                  width: "100%", padding: "13px 18px", textAlign: "left",
                  background: "none", border: "none",
                  borderTop: i > 0 ? "1px solid var(--border)" : "none",
                  fontSize: 15, fontWeight: 500, color: "var(--fg1)",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--kd-lavender)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
              >
                {b}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

function ConditionsStep({ conditions, onToggle, otroText, onOtroChange }: {
  conditions: string[]; onToggle: (c: string) => void
  otroText: string; onOtroChange: (v: string) => void
}) {
  const allOptions = [...CONDITIONS, "Otro"]
  return (
    <>
      <QHeader
        question="¿Tiene alguna condición médica?"
        hint="Puedes seleccionar más de una. Se puede editar después."
      />
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {allOptions.map((c) => {
          const active = conditions.includes(c)
          return (
            <div key={c}>
              <button
                onClick={() => onToggle(c)}
                style={{
                  width: "100%", display: "flex", alignItems: "center", gap: 14,
                  padding: "16px 18px", borderRadius: 16,
                  border: `2px solid ${active ? "var(--kd-persian-blue)" : "var(--border)"}`,
                  background: active ? "var(--kd-lavender)" : "var(--kd-white)",
                  cursor: "pointer", textAlign: "left", transition: "all 150ms ease",
                }}
              >
                <div style={{
                  width: 22, height: 22, borderRadius: 6, flexShrink: 0,
                  border: `2px solid ${active ? "var(--kd-persian-blue)" : "var(--border)"}`,
                  background: active ? "var(--kd-persian-blue)" : "transparent",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "all 150ms ease",
                }}>
                  {active && <Icon name="check" size={12} color="#fff" />}
                </div>
                <span style={{ fontSize: 15, fontWeight: 500, color: active ? "var(--kd-persian-blue)" : "var(--fg1)" }}>
                  {c}
                </span>
              </button>
              {c === "Otro" && active && (
                <textarea
                  autoFocus
                  value={otroText}
                  onChange={(e) => onOtroChange(e.target.value)}
                  placeholder="Describe la condición…"
                  rows={3}
                  style={{
                    width: "100%", marginTop: 8, borderRadius: 12,
                    border: "1.5px solid var(--kd-persian-blue)",
                    padding: "12px 14px", fontSize: 14,
                    background: "var(--kd-white)", color: "var(--fg1)",
                    outline: "none", resize: "none",
                    fontFamily: "var(--font-sans)", lineHeight: 1.5,
                    boxSizing: "border-box",
                  }}
                />
              )}
            </div>
          )
        })}
      </div>
    </>
  )
}

function SuccessStep({ name, species, sex, breed, ageLabel, weight, conditions, otroCondicion }: {
  name: string; species: Species | null; sex: Sex | null; breed: string
  ageLabel: string; weight: string; conditions: string[]; otroCondicion: string
}) {
  const condicionesLabel = conditions.length === 0
    ? "Ninguna"
    : conditions.map((c) => c === "Otro" ? otroCondicion || "Otro" : c).join(", ")

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flex: 1, gap: 24, textAlign: "center" }}>
      <div style={{ fontSize: 56 }}>🎉</div>
      <div>
        <h2 style={{ fontSize: 30, fontWeight: 700, margin: "0 0 10px", letterSpacing: "-0.02em" }}>
          ¡{name || "Tu mascota"} ya está en tu familia!
        </h2>
        <p style={{ fontSize: 15, color: "var(--fg2)", margin: 0, lineHeight: 1.6 }}>
          Su expediente está listo. Puedes editarlo desde el perfil de tu mascota.
        </p>
      </div>
      <div style={{
        background: "var(--kd-white)", border: "1px solid var(--border)",
        borderRadius: 20, padding: "20px 24px", width: "100%",
        textAlign: "left", display: "flex", flexDirection: "column", gap: 12,
      }}>
        {[
          ["Nombre",    name || "—"],
          ["Especie",   species === "perro" ? "Perro" : species === "gato" ? "Gato" : "—"],
          ["Sexo",      sex === "macho" ? "Macho" : sex === "hembra" ? "Hembra" : "—"],
          ["Raza",      breed || "Sin especificar"],
          ["Edad",      ageLabel],
          ["Peso",      weight ? `${weight} kg` : "—"],
          ["Condición", condicionesLabel],
        ].map(([label, value]) => (
          <div key={label} style={{ display: "flex", justifyContent: "space-between", gap: 12, fontSize: 14 }}>
            <span style={{ color: "var(--fg2)", flexShrink: 0 }}>{label}</span>
            <span style={{ fontWeight: 600, textAlign: "right" }}>{value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
