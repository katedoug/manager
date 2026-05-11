import * as React from "react"

export interface TranscriptEmailProps {
  patientName?: string
  vetName?: string
  date?: string
  messages?: Array<{
    time: string
    sender: string
    text: string
    isVet: boolean
  }>
}

// Preview data — visible in the email preview server
TranscriptEmail.PreviewProps = {
  patientName: "Rafael Martínez",
  vetName: "Dra. Mariana García",
  date: "sábado, 9 de mayo de 2026",
  messages: [
    { time: "14:30", sender: "Rafael Martínez", text: "Hola, mi perro lleva dos días sin comer.", isVet: false },
    { time: "14:31", sender: "Dra. Mariana García", text: "Hola Rafael, ¿cuántos años tiene y qué raza es?", isVet: true },
    { time: "14:32", sender: "Rafael Martínez", text: "Tiene 3 años, es un Labrador.", isVet: false },
    { time: "14:35", sender: "Dra. Mariana García", text: "Te recomiendo llevarlo a revisión presencial. Mientras tanto, ofrécele agua constantemente.", isVet: true },
  ],
} satisfies TranscriptEmailProps

export default function TranscriptEmail({
  patientName = "Tutor",
  vetName = "tu veterinario",
  date = "",
  messages = [],
}: TranscriptEmailProps) {
  return (
    <html lang="es">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Transcript de consulta</title>
      </head>
      <body style={styles.body}>
        <table width="100%" cellPadding={0} cellSpacing={0} style={styles.outerTable}>
          <tbody>
            <tr>
              <td align="center" style={{ padding: "40px 16px" }}>
                <table width="100%" cellPadding={0} cellSpacing={0} style={styles.card}>
                  <tbody>

                    {/* ── Header ── */}
                    <tr>
                      <td style={styles.header}>
                        {/* Reemplaza el src con la URL pública de tu logo */}
                        <img
                          src="https://katedoug.com/logo-white.png"
                          alt="Kate &amp; Doug"
                          width={140}
                          style={{ display: "block", height: "auto" }}
                        />
                        <p style={styles.headerSubtitle}>Plataforma veterinaria</p>
                      </td>
                    </tr>

                    {/* ── Body ── */}
                    <tr>
                      <td style={styles.body2}>
                        <p style={styles.title}>Transcript de consulta</p>
                        <p style={styles.date}>{date}</p>

                        <p style={styles.greeting}>
                          Hola <strong style={{ color: "#0f172a" }}>{patientName}</strong>,
                        </p>
                        <p style={styles.bodyText}>
                          Adjunto encontrarás el transcript de tu consulta con{" "}
                          <strong style={{ color: "#0f172a" }}>{vetName}</strong>.
                          Si tienes alguna duda, no dudes en contactarnos.
                        </p>

                        {/* ── Transcript table ── */}
                        <table width="100%" cellPadding={0} cellSpacing={0} style={styles.transcriptTable}>
                          <tbody>
                            <tr style={styles.tableHeaderRow}>
                              <td style={{ ...styles.tableHeaderCell, width: 60 }}>Hora</td>
                              <td style={{ ...styles.tableHeaderCell, width: 150 }}>Participante</td>
                              <td style={styles.tableHeaderCell}>Mensaje</td>
                            </tr>
                            {messages.map((m, i) => (
                              <tr key={i} style={{ background: i % 2 === 0 ? "#f8fafc" : "#ffffff" }}>
                                <td style={styles.timeCell}>{m.time}</td>
                                <td style={{
                                  ...styles.senderCell,
                                  color: m.isVet ? "#1434CB" : "#334155",
                                  fontWeight: m.isVet ? 600 : 400,
                                }}>
                                  {m.sender}
                                </td>
                                <td style={styles.messageCell}>{m.text}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </td>
                    </tr>

                    {/* ── Footer ── */}
                    <tr>
                      <td style={styles.footer}>
                        <p style={styles.footerText}>
                          Kate &amp; Doug &nbsp;·&nbsp; Plataforma veterinaria
                        </p>
                      </td>
                    </tr>

                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </body>
    </html>
  )
}

// ── Styles ─────────────────────────────────────────────────────────────────

const styles = {
  body: {
    margin: 0,
    padding: 0,
    backgroundColor: "#f1f5f9",
    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
  } as React.CSSProperties,

  outerTable: {
    backgroundColor: "#f1f5f9",
  } as React.CSSProperties,

  card: {
    maxWidth: 560,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    overflow: "hidden",
  } as React.CSSProperties,

  header: {
    backgroundColor: "#1434CB",
    borderRadius: "12px 12px 0 0",
    padding: "28px 36px 24px",
  } as React.CSSProperties,

  headerSubtitle: {
    margin: "10px 0 0",
    color: "rgba(255,255,255,0.65)",
    fontSize: 12,
    letterSpacing: "0.3px",
  } as React.CSSProperties,

  body2: {
    padding: "32px 36px 28px",
  } as React.CSSProperties,

  title: {
    margin: "0 0 4px",
    fontSize: 20,
    fontWeight: 700,
    color: "#0f172a",
    letterSpacing: "-0.3px",
  } as React.CSSProperties,

  date: {
    margin: "0 0 24px",
    fontSize: 13,
    color: "#64748b",
  } as React.CSSProperties,

  greeting: {
    margin: "0 0 8px",
    fontSize: 14,
    color: "#334155",
    lineHeight: 1.7,
  } as React.CSSProperties,

  bodyText: {
    margin: "0 0 24px",
    fontSize: 14,
    color: "#334155",
    lineHeight: 1.7,
  } as React.CSSProperties,

  transcriptTable: {
    backgroundColor: "#f8fafc",
    borderRadius: 10,
    overflow: "hidden",
    border: "1px solid #e2e8f0",
  } as React.CSSProperties,

  tableHeaderRow: {
    backgroundColor: "#f1f5f9",
  } as React.CSSProperties,

  tableHeaderCell: {
    padding: "8px 14px",
    fontSize: 11,
    fontWeight: 600,
    color: "#94a3b8",
    textTransform: "uppercase" as const,
    letterSpacing: "0.5px",
    borderBottom: "1px solid #e2e8f0",
  } as React.CSSProperties,

  timeCell: {
    padding: "10px 14px",
    verticalAlign: "top" as const,
    fontSize: 12,
    color: "#94a3b8",
    whiteSpace: "nowrap" as const,
    fontFamily: "monospace",
    borderTop: "1px solid #e2e8f0",
  } as React.CSSProperties,

  senderCell: {
    padding: "10px 14px",
    verticalAlign: "top" as const,
    fontSize: 13,
    whiteSpace: "nowrap" as const,
    borderTop: "1px solid #e2e8f0",
  } as React.CSSProperties,

  messageCell: {
    padding: "10px 14px",
    verticalAlign: "top" as const,
    fontSize: 13,
    color: "#334155",
    wordBreak: "break-word" as const,
    borderTop: "1px solid #e2e8f0",
  } as React.CSSProperties,

  footer: {
    backgroundColor: "#f8fafc",
    borderTop: "1px solid #e2e8f0",
    borderRadius: "0 0 12px 12px",
    padding: "18px 36px",
    textAlign: "center" as const,
  } as React.CSSProperties,

  footerText: {
    margin: 0,
    fontSize: 12,
    color: "#94a3b8",
  } as React.CSSProperties,
}
