import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // 1. Recibir los datos enviados por el botón de WhatsApp
    const data = await request.json();

    // 2. Enviar los datos a n8n inyectando la seguridad
    const n8nResponse = await fetch(process.env.N8N_WEBHOOK_URL as string, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Aquí usamos exactamente el Header name que definiste
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