import { NextResponse } from 'next/server';

// 1. Obligamos a Vercel a ejecutar esto en vivo, sin usar memoria caché
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    // 2. Recibir los datos enviados por el botón de WhatsApp
    const data = await request.json();

    // 🌟 LA MAGIA: Generar la hora exacta de Colombia en este milisegundo
    // El formato "sv-SE" es un truco de programación para que salga perfecto: YYYY-MM-DD HH:MM:SS
    const colombiaTime = new Date().toLocaleString("sv-SE", { timeZone: "America/Bogota" });
    
    // Sobrescribimos la fecha congelada del navegador con la fecha real del servidor
    data.timestamp = colombiaTime;

    // 3. Enviar los datos a n8n inyectando la seguridad
    const n8nResponse = await fetch(process.env.N8N_WEBHOOK_URL as string, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-cc-token': process.env.N8N_AUTH_SECRET as string,
      },
      body: JSON.stringify(data),
    });

    if (!n8nResponse.ok) {
      throw new Error(`Fallo al enviar a n8n. Status: ${n8nResponse.status}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error en API interna de WhatsApp:', error);
    return NextResponse.json(
      { success: false, message: 'Error procesando la solicitud' },
      { status: 500 }
    );
  }
}