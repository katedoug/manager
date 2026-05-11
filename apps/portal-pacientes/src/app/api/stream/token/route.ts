import { StreamChat } from "stream-chat"
import { NextResponse } from "next/server"

const serverClient = new StreamChat(
  process.env.NEXT_PUBLIC_STREAM_API_KEY!,
  process.env.STREAM_SECRET_KEY!
)

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get("userId") ?? "tutor-demo"

  // Ensure both users exist in Stream before any channel operation
  await serverClient.upsertUsers([
    { id: "mvz-mariana", name: "Dra. Mariana García", role: "user" },
    { id: "tutor-demo",  name: "Tutor",               role: "user" },
  ])

  const token = serverClient.createToken(userId)
  return NextResponse.json({ token, userId })
}
