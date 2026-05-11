import PDFDocument from "pdfkit"
import SVGtoPDF from "svg-to-pdfkit"
import fs from "fs"
import path from "path"

export interface TranscriptMessage {
  time: string
  sender: string
  text: string
  isVet: boolean
}

export interface TranscriptPDFData {
  date: string
  // Vet — swap for real DB data later
  vetName: string
  vetSpecialty: string
  vetLicense: string  // cédula profesional
  vetAddress: string
  vetPhone: string
  // Patient
  patientName: string
  // Messages
  messages: TranscriptMessage[]
}

const BLUE   = "#1434CB"
const GRAY   = "#64748b"
const LGRAY  = "#f1f5f9"
const BLACK  = "#0f172a"
const BORDER = "#e2e8f0"

export function generateTranscriptPDF(data: TranscriptPDFData): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      size: "LETTER",
      margins: { top: 48, bottom: 48, left: 56, right: 56 },
      info: { Title: "Transcript de consulta · Kate & Doug" },
    })

    const chunks: Buffer[] = []
    doc.on("data", (c: Buffer) => chunks.push(c))
    doc.on("end",  () => resolve(Buffer.concat(chunks)))
    doc.on("error", reject)

    const L = doc.page.margins.left       // 56
    const R = doc.page.width - doc.page.margins.right  // ~756
    const W = R - L                        // content width

    // ── 1. Header: logo + date ───────────────────────────────────────────

    const svgPath = path.join(process.cwd(), "public", "logo.svg")
    const svgContent = fs.readFileSync(svgPath, "utf-8")
    SVGtoPDF(doc, svgContent, L, 44, { width: 130, height: 22, preserveAspectRatio: "xMinYMid meet" })

    doc.fontSize(9).font("Helvetica").fillColor(GRAY)
       .text(data.date, L, 54, { width: W, align: "right" })

    const headerBottom = 80

    // ── 2. Info box ───────────────────────────────────────────────────────

    const boxTop    = headerBottom + 10
    const boxHeight = 88
    const midX      = L + W / 2

    // Background
    doc.rect(L, boxTop, W, boxHeight).fillColor(LGRAY).fill()
    // Border
    doc.rect(L, boxTop, W, boxHeight).strokeColor(BORDER).lineWidth(0.5).stroke()
    // Vertical divider
    doc.moveTo(midX, boxTop).lineTo(midX, boxTop + boxHeight)
       .strokeColor(BORDER).lineWidth(0.5).stroke()

    const pad = 12
    const col1 = L + pad
    const col2 = midX + pad

    // Left: vet
    let y = boxTop + pad
    doc.fontSize(7).font("Helvetica-Bold").fillColor(BLUE).text("MVZ", col1, y)
    y += 12
    doc.fontSize(10).font("Helvetica-Bold").fillColor(BLACK)
       .text(data.vetName, col1, y, { width: midX - col1 - pad })
    y += 14
    doc.fontSize(8).font("Helvetica").fillColor(GRAY)
       .text(
         `${data.vetSpecialty} | Cédula ${data.vetLicense}`,
         col1, y, { width: midX - col1 - pad }
       )
    y += 12
    doc.fontSize(8).fillColor(GRAY).text(data.vetAddress, col1, y, { width: midX - col1 - pad })
    y += 10
    doc.fontSize(8).fillColor(GRAY).text(data.vetPhone, col1, y)

    // Right: patient
    let py = boxTop + pad
    doc.fontSize(7).font("Helvetica-Bold").fillColor(BLUE).text("Paciente", col2, py)
    py += 12
    doc.fontSize(10).font("Helvetica-Bold").fillColor(BLACK)
       .text(data.patientName, col2, py, { width: R - col2 - pad })

    // ── 3. Section title ─────────────────────────────────────────────────

    const titleY = boxTop + boxHeight + 22
    doc.fontSize(16).font("Helvetica-Bold").fillColor(BLACK)
       .text("Transcript de consulta", L, titleY)

    // Divider line under title
    doc.moveTo(L, titleY + 22).lineTo(R, titleY + 22)
       .strokeColor(BORDER).lineWidth(0.5).stroke()

    // ── 4. Messages ───────────────────────────────────────────────────────

    const msgStartY = titleY + 34
    const timeW     = 45
    const senderW   = 130
    const msgW      = W - timeW - senderW - 20
    const rowH      = 18

    // Column headers
    doc.fontSize(7).font("Helvetica-Bold").fillColor(GRAY)
    doc.text("HORA",         L,               msgStartY)
    doc.text("PARTICIPANTE", L + timeW + 8,   msgStartY)
    doc.text("MENSAJE",      L + timeW + senderW + 16, msgStartY)

    doc.moveTo(L, msgStartY + 11).lineTo(R, msgStartY + 11)
       .strokeColor(BORDER).lineWidth(0.4).stroke()

    let rowY = msgStartY + 16

    for (const msg of data.messages) {
      // Measure text height for multi-line messages
      const textHeight = doc.heightOfString(msg.text, { width: msgW, fontSize: 8 })
      const rh = Math.max(rowH, textHeight + 8)

      // Alternate background
      if (data.messages.indexOf(msg) % 2 === 0) {
        doc.rect(L, rowY - 2, W, rh + 2).fillColor("#f8fafc").fill()
      }

      doc.fontSize(8).font("Helvetica").fillColor(GRAY)
         .text(msg.time, L, rowY, { width: timeW, lineBreak: false })

      doc.fontSize(8)
         .font(msg.isVet ? "Helvetica-Bold" : "Helvetica")
         .fillColor(msg.isVet ? BLUE : BLACK)
         .text(msg.sender, L + timeW + 8, rowY, { width: senderW, lineBreak: false })

      doc.fontSize(8).font("Helvetica").fillColor(BLACK)
         .text(msg.text, L + timeW + senderW + 16, rowY, { width: msgW })

      doc.moveTo(L, rowY + rh).lineTo(R, rowY + rh)
         .strokeColor(BORDER).lineWidth(0.3).stroke()

      rowY += rh + 4

      // Page break if needed
      if (rowY > doc.page.height - doc.page.margins.bottom - 80) {
        doc.addPage()
        rowY = doc.page.margins.top
      }
    }

    // ── 5. Footer ─────────────────────────────────────────────────────────

    const footerY = doc.page.height - doc.page.margins.bottom - 50

    doc.moveTo(L, footerY).lineTo(R, footerY)
       .strokeColor(BORDER).lineWidth(0.5).stroke()

    doc.fontSize(10).font("Helvetica-Bold").fillColor(BLACK)
       .text(data.vetName, L, footerY + 10)
    doc.fontSize(8).font("Helvetica").fillColor(GRAY)
       .text(`${data.vetSpecialty} | Cédula ${data.vetLicense}`, L, footerY + 23)

    doc.fontSize(8).font("Helvetica-Bold").fillColor(BLUE)
       .text("katedoug.com", L, footerY + 10, { width: W, align: "right" })
    doc.fontSize(8).font("Helvetica").fillColor(GRAY)
       .text("Bienestar Moderno", L, footerY + 23, { width: W, align: "right" })

    doc.end()
  })
}
