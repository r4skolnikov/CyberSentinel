// Copia y pega este código en tu archivo:
// app/api/wsp/route.ts (si usas App Router)
// O:
// pages/api/wsp.ts (si usas Pages Router)

import { NextResponse } from "next/server";

// Las variables de entorno se acceden a través de process.env
// Asegúrate de que estén definidas, o el código fallará.
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export async function POST(req: Request): Promise<Response> {
  console.log("Solicitud POST recibida en /api/wsp para Telegram");
  const body = await req.json();
  // Asumimos que el 'body' de la solicitud contendrá una propiedad 'message'
  const { message } = body;

  // Validaciones básicas
  if (!message) {
    return NextResponse.json(
      { success: false, error: "Falta el mensaje en el cuerpo de la solicitud." },
      { status: 400 } // Bad Request
    );
  }

  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.error("Error: Las variables de entorno TELEGRAM_BOT_TOKEN o TELEGRAM_CHAT_ID no están configuradas.");
    return NextResponse.json(
      { success: false, error: "Configuración del bot de Telegram incompleta en el servidor." },
      { status: 500 } // Internal Server Error
    );
  }

  // Construye la URL de la API de Telegram
  const telegramApiUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

  try {
    const result = await fetch(telegramApiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: message, // El contenido del mensaje que enviarás
            // Puedes añadir más opciones aquí, por ejemplo:
            // parse_mode: "MarkdownV2", // Para usar formato Markdown en tu mensaje
            // disable_notification: true, // Para enviar el mensaje sin sonido
        }),
    });

    console.log(`Respuesta de la API de Telegram - Estado: ${result.status} ${result.statusText}`);
    const resData = await result.json(); // Parsea la respuesta JSON de Telegram

    if (result.ok) { // Si la respuesta de Telegram es exitosa (código 2xx)
        console.log("Mensaje de Telegram enviado con éxito:", resData);
        return NextResponse.json({ success: true, data: resData });
    } else {
        // Si Telegram devuelve un error (ej. token inválido, chat_id incorrecto)
        console.error("Error de la API de Telegram:", resData);
        return NextResponse.json(
            { success: false, error: `Error de Telegram: ${resData.description || 'Error desconocido'}` },
            { status: result.status }
        );
    }
  } catch (error) {
    // Si hay un problema de red o alguna otra excepción
    console.error("Error al intentar enviar mensaje a Telegram:", error);
    return NextResponse.json(
      { success: false, error: "Error interno al procesar la solicitud para Telegram." },
      { status: 500 }
    );
  }
}