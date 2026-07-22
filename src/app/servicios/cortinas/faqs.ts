// src/app/servicios/cortinas/faqs.ts
// Fuente única de las FAQ de cortinas: las consume el schema FAQPage (server) y
// la sección visible de la landing (client), para que nunca se desincronicen.
//
// Respuestas basadas en las decisiones del dueño (22-jul-2026):
//  C1 descolgado y colgado INCLUIDOS · C2 se lavan TODOS los tipos ·
//  C3 entrega en 5 días · C4 100% cotización (nunca publicar precios).

import type { FAQItem } from '@/components/SEO/FAQPageJsonLd'

export const FAQS_CORTINAS: FAQItem[] = [
  {
    question: '¿Ustedes descuelgan y vuelven a colgar las cortinas?',
    answer:
      'Sí, está incluido en el servicio. Nosotros descolgamos las cortinas, nos las llevamos a lavar y las volvemos a colgar cuando las entregamos. Tú no tienes que subirte a una escalera ni desmontar rieles: solo abrirnos la puerta.',
  },
  {
    question: '¿Cuánto cuesta lavar unas cortinas?',
    answer:
      'Depende del tipo de tela y del tamaño, por eso cotizamos cada caso: no es lo mismo un velo liviano que un blackout de piso a techo. Envíanos una foto por WhatsApp con el alto aproximado y te damos el precio exacto en minutos, sin compromiso.',
  },
  {
    question: '¿Cuántos días se demoran?',
    answer:
      'La entrega es en 5 días. Recogemos tus cortinas el día que acordemos, las lavamos según el tipo de tela con secado controlado y te las devolvemos colgadas y listas.',
  },
  {
    question: '¿Qué tipos de cortina lavan? ¿También persianas?',
    answer:
      'Lavamos todos los tipos: blackout y opacas, velos y telas sheer, lino y algodón, cortinas romanas y estores de tela, telas decorativas, cenefas y también persianas. Cada material lleva un proceso distinto, y eso se define cuando vemos la foto.',
  },
  {
    question: '¿Atienden en Rionegro y el Oriente antioqueño?',
    answer:
      'Sí. Además de Medellín y el Valle de Aburrá, atendemos Rionegro, Llanogrande, San Antonio de Pereira, La Ceja, Marinilla, El Retiro, Guarne y La Unión. Coordinamos la recogida y la entrega por WhatsApp según tu dirección.',
  },
  {
    question: '¿Las cortinas se encogen o se dañan con el lavado?',
    answer:
      'No, porque el proceso se elige según la fibra de cada cortina. Antes de llevárnoslas dejamos registrada su condición en un acta de inspección, y el servicio tiene garantía escrita de 3 meses.',
  },
]
