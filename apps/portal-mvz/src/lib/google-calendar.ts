import { google } from "googleapis"

export function getCalendarClientWithToken(accessToken: string) {
  const oauth2 = new google.auth.OAuth2()
  oauth2.setCredentials({ access_token: accessToken })
  return google.calendar({ version: "v3", auth: oauth2 })
}

export const CALENDAR_ID = "primary"
