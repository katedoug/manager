import { anthropic } from "@ai-sdk/anthropic";
import { frontendTools } from "@assistant-ui/react-ai-sdk";
import {
  streamText,
  convertToModelMessages,
  type UIMessage,
  type JSONSchema7,
} from "ai";

const BASE_SYSTEM = `Eres Kate, la asistente veterinaria virtual de Kate & Doug.
Ayudas a los dueños de mascotas con preguntas sobre salud, comportamiento, nutrición y cuidado general.
Responde siempre en español, con un tono cálido, claro y profesional.
Si el expediente del paciente está disponible, úsalo para contextualizar tus respuestas sin preguntar información que ya conoces.
Si detectas una emergencia o síntomas graves, indica al usuario que contacte a un veterinario de inmediato.
No diagnostiques enfermedades específicas — orienta y recomienda consulta presencial cuando sea necesario.`;

export async function POST(req: Request) {
  const {
    messages,
    system,
    tools,
    petContext,
  }: {
    messages: UIMessage[];
    system?: string;
    tools?: Record<string, { description?: string; parameters: JSONSchema7 }>;
    petContext?: string;
  } = await req.json();

  const fullSystem = petContext
    ? `${BASE_SYSTEM}\n\n${petContext}`
    : (system ?? BASE_SYSTEM);

  const result = streamText({
    model: anthropic("claude-sonnet-4-5"),
    system: fullSystem,
    messages: await convertToModelMessages(messages),
    tools: {
      ...frontendTools(tools ?? {}),
    },
  });

  return result.toUIMessageStreamResponse();
}
