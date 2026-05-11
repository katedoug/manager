export const runtime = "nodejs"

import { StreamChat } from "stream-chat"
import { Resend } from "resend"
import { NextResponse } from "next/server"
import { generateTranscriptPDF } from "@/lib/generate-transcript-pdf"
import fs from "fs"
import path from "path"
import sharp from "sharp"

async function getWhiteLogoDataUri(): Promise<string> {
  const svgPath = path.join(process.cwd(), "public", "logo.svg")
  const raw = fs.readFileSync(svgPath, "utf-8")
  const whiteSvg = raw.replace(/fill="#1434[Cc][Bb]"/g, 'fill="#ffffff"')
  const buf = await sharp(Buffer.from(whiteSvg)).resize({ width: 280 }).png().toBuffer()
  return `data:image/png;base64,${buf.toString("base64")}`
}

const streamServer = new StreamChat(
  process.env.NEXT_PUBLIC_STREAM_API_KEY!,
  process.env.STREAM_SECRET_KEY!
)

const resend = new Resend(process.env.RESEND_API_KEY)

// Mock vet data — replace with real Supabase query when available
const VET_MOCK = {
  name:      "Dra. Mariana García",
  specialty: "Médico Veterinario Zootecnista",
  license:   "12345678",
  address:   "Clínica Kate & Doug · Ciudad de México",
  phone:     "",
}

export async function POST(request: Request) {
  const { channelId, patientEmail, patientName, vetName } = await request.json()

  if (!patientEmail) {
    return NextResponse.json({ error: "patientEmail requerido" }, { status: 400 })
  }

  try {
  // Fetch messages from Stream
  const channel = streamServer.channel("messaging", channelId)
  const { messages } = await channel.query({ messages: { limit: 300 } })

  const date = new Date().toLocaleDateString("es-MX", {
    day: "numeric", month: "long", year: "numeric",
  })

  // Build message rows
  const msgRows = messages.map((m) => ({
    time:   new Date(m.created_at as string).toLocaleTimeString("es-MX", {
      hour: "2-digit", minute: "2-digit",
    }),
    sender: m.user?.name ?? m.user?.id ?? "Desconocido",
    text:   m.text ?? "",
    isVet:  m.user?.id !== "tutor-demo",
  }))

  // Generate PDF
  const pdfBuffer = await generateTranscriptPDF({
    date,
    vetName:      vetName ?? VET_MOCK.name,
    vetSpecialty: VET_MOCK.specialty,
    vetLicense:   VET_MOCK.license,
    vetAddress:   VET_MOCK.address,
    vetPhone:     VET_MOCK.phone,
    patientName:  patientName ?? "Paciente",
    messages:     msgRows,
  })

  const logoDataUri = await getWhiteLogoDataUri()

  // Email body (simple — transcript is in the PDF)
  const html = `
    <!DOCTYPE html>
    <html lang="es">
    <head><meta charset="utf-8"/></head>
    <body style="margin:0;padding:0;background:#f1f5f9;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
      <table width="100%" cellPadding="0" cellSpacing="0" style="background:#f1f5f9;">
        <tr><td align="center" style="padding:40px 16px;">
          <table width="100%" cellPadding="0" cellSpacing="0" style="max-width:520px;">

            <tr><td style="background:#1434CB;border-radius:12px 12px 0 0;padding:28px 36px 22px;">
              <img src="${logoDataUri}" alt="Kate &amp; Doug" width="140" style="display:block;height:auto;" />
              <p style="margin:10px 0 0;font-size:12px;color:rgba(255,255,255,0.65);">Bienestar moderno</p>
            </td></tr>

            <tr><td style="background:#fff;padding:32px 36px;">
              <p style="margin:0 0 4px;font-size:18px;font-weight:700;color:#0f172a;">Tu consulta ha finalizado</p>
              <p style="margin:0 0 24px;font-size:13px;color:#64748b;">${date}</p>
              <p style="margin:0 0 16px;font-size:14px;color:#334155;line-height:1.7;">
                Hola <strong style="color:#0f172a;">${patientName ?? "tutor"}</strong>,<br/>
                Adjunto encontrarás la transcripción completa de tu consulta con la
                <strong style="color:#0f172a;">Dra. Mariana García</strong>.<br/>
                Si tienes dudas adicionales, puedes abrir una nueva consulta desde la app.
              </p>
              <p style="margin:0;padding:14px 18px;background:#f1f5f9;border-radius:8px;font-size:13px;color:#64748b;">
                📎 <strong>Transcript_consulta.pdf</strong> adjunto a este correo
              </p>
            </td></tr>

            <tr><td style="background:#f8fafc;border-top:1px solid #e2e8f0;border-radius:0 0 12px 12px;padding:16px 36px;text-align:center;">
              <p style="margin:0;font-size:12px;color:#94a3b8;">Kate&amp;Doug. 2026</p>
            </td></tr>

          </table>
        </td></tr>
      </table>
    </body></html>
  `

  const { error } = await resend.emails.send({
    from:    "Kate & Doug <noreply@katedoug.com>",
    to:      patientEmail,
    subject: `Transcript de tu consulta · ${date}`,
    html,
    attachments: [
      {
        filename: "Transcript_consulta.pdf",
        content:  pdfBuffer,
      },
    ],
  })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Post closure notice to the channel — visible in both portals
  await channel.sendMessage({
    text: "🔒 Esta consulta ha sido cerrada. El transcript fue enviado al paciente.",
    user_id: "mvz-mariana",
  })

  return NextResponse.json({ ok: true })

  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e)
    console.error("[transcript]", msg)
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
