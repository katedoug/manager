import { google } from "googleapis"

export function getCalendarClientWithRefreshToken(refreshToken: string) {
  const clientId     = process.env.GOOGLE_CLIENT_ID!
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET!
  const oauth2 = new google.auth.OAuth2(clientId, clientSecret)
  oauth2.setCredentials({ refresh_token: refreshToken })
  return google.calendar({ version: "v3", auth: oauth2 })
}

export const CALENDAR_ID = "primary"
