// src/app/garantia/page.tsx
import { Metadata } from 'next'
import Header from '@/components/Header'
import WhatsAppButton from '@/components/WhatsAppButton'
import Footer from '@/components/sections/Footer'
import Link from 'next/link'
import { FileText, ArrowLeft, Shield, Phone } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Garantía, Responsabilidad y Reclamaciones | Clean Company',
  description:
    'Política de garantía y procedimiento de reclamaciones de Clean Company para servicios de limpieza profesional.',
  keywords: [
    'garantía servicio limpieza',
    'reclamaciones clean company',
    'responsabilidad legal limpieza',
  ],
}

export default function GarantiaPage() {
  return (
    <>
      <Header />
      <WhatsAppButton />

      <section className="min-h-screen pt-20 pb-20 bg-gradient-to-br from-blue-600 to-blue-800">
        <div className="container mx-auto px-4">
          <Link
            href="/"
            className="inline-flex items-center text-white mb-6 hover:opacity-80 transition"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Volver al inicio
          </Link>

          <div className="text-center text-white max-w-3xl mx-auto">
            <FileText className="w-20 h-20 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Garantía, Responsabilidad y Reclamaciones
            </h1>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-left space-y-6">
              {/* Summary Box */}
              <div className="bg-green-500/20 border-2 border-green-400 rounded-xl p-6 mb-8">
                <div className="flex items-start space-x-3">
                  <Shield className="w-8 h-8 text-green-300 flex-shrink-0 mt-1" />
                  <div>
                    <h2 className="text-xl font-bold mb-3">
                      Nuestra Garantía en Términos Simples
                    </h2>
                    <ul className="space-y-2 text-sm">
                      <li>
                        ✓ <strong>3 meses de garantía</strong> en todos nuestros
                        servicios de limpieza
                      </li>
                      <li>
                        ✓ <strong>Inspección previa documentada</strong> con
                        fotos de alta resolución
                      </li>
                      <li>
                        ✓ <strong>5 días hábiles</strong> para reportar
                        cualquier inconformidad
                      </li>
                      <li>
                        ✓ <strong>Respuesta en 15 días</strong> y solución en 10
                        días adicionales si procede
                      </li>
                      <li>
                        ✓ <strong>Opción de seguro extendido</strong> para
                        piezas de alto valor
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <ol className="list-decimal list-inside space-y-6">
                <li>
                  <h2 className="text-2xl font-semibold mb-2">
                    Nuestro Compromiso de Calidad
                  </h2>
                  <p>
                    En Clean Company garantizamos que todos nuestros procesos de
                    limpieza se ejecutan con equipos certificados, insumos de
                    grado profesional y personal capacitado. Nuestro objetivo es
                    entregar un servicio idóneo, seguro y de calidad, tal como
                    exige la garantía legal del artículo 7 de la Ley 1480 de
                    2011 (Estatuto del Consumidor).{' '}
                    <a
                      href="https://www.funcionpublica.gov.co"
                      className="underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      funcionpublica.gov.co
                    </a>
                  </p>
                </li>

                <li>
                  <h2 className="text-2xl font-semibold mb-2">
                    Alcance de la Garantía Legal
                  </h2>
                  <ul className="list-disc list-inside space-y-2 pl-4">
                    <li>
                      <strong>Obligación de medio:</strong> La limpieza
                      profesional implica esfuerzos técnicos razonables para
                      remover suciedad y manchas; no implica la obligación de
                      obtener un resultado idéntico a un artículo nuevo.
                    </li>
                    <li>
                      <strong>Vigencia:</strong> Tres (3) meses contados a
                      partir de la entrega del tapete o mueble al cliente,
                      conforme al término supletorio previsto en la Ley 1480
                      para servicios que suponen la entrega de un bien.
                    </li>
                    <li>
                      <strong>Cobertura:</strong> Reparación (reproceso sin
                      costo) o, a elección del consumidor, devolución del valor
                      pagado por el servicio cuando se verifique
                      incumplimiento.
                    </li>
                  </ul>
                </li>

                <li>
                  <h2 className="text-2xl font-semibold mb-2">
                    Proceso de Inspección y Consentimiento
                  </h2>
                  <p>Antes de intervenir cada pieza:</p>
                  <ul className="list-disc list-inside space-y-2 pl-4">
                    <li>
                      Se levanta un acta de inspección con fotografías de alta
                      resolución que describen material, antigüedad aparente,
                      desgaste, decoloraciones previas y cualquier condición de
                      fragilidad (nudos flojos, backing debilitado, fibras
                      naturales teñidas, etc.).
                    </li>
                    <li>
                      El cliente firma la autorización reconociendo el estado
                      inicial y aceptando los riesgos inherentes al proceso de
                      lavado —especialmente en piezas antiguas, de tintes
                      naturales o con daños previos—.
                    </li>
                    <li>
                      Este registro facilita la trazabilidad y evita
                      controversias sobre defectos pre-existentes o vicios
                      ocultos.
                    </li>
                  </ul>
                </li>

                <li>
                  <h2 className="text-2xl font-semibold mb-2">
                    Cómo Realizar una Reclamación
                  </h2>
                  <p>
                    El consumidor dispone de cinco (5) días hábiles para
                    notificar cualquier inconformidad desde la recepción. Debe
                    aportar: número de orden, fotos del daño alegado y relato de
                    los hechos. Clean Company emitirá respuesta escrita en
                    máximo quince (15) días hábiles (art. 58 Ley 1480). Si
                    procede la garantía, se coordinará la solución dentro de los
                    diez (10) días siguientes.
                  </p>
                </li>

                <li>
                  <h2 className="text-2xl font-semibold mb-2">
                    Límites de Responsabilidad y Excepciones
                  </h2>
                  <p>
                    En línea con los artículos 42 y 43 del Estatuto del
                    Consumidor —que declaran ineficaces las cláusulas que
                    eliminen derechos del usuario o limiten nuestra
                    responsabilidad en caso de dolo o culpa grave— Clean Company
                    no pretende desconocer los derechos irrenunciables del
                    consumidor.{' '}
                    <a
                      href="https://www.funcionpublica.gov.co"
                      className="underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      funcionpublica.gov.co
                    </a>
                  </p>
                  <p className="mt-4">
                    Sin embargo, para equilibrar el riesgo comercial y siempre
                    que no medie culpa grave o dolo de nuestra parte, aplican
                    los siguientes criterios indemnizatorios:
                  </p>

                  <div className="overflow-x-auto">
                    <table className="table-auto w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="px-4 py-2 text-left">Escenario</th>
                          <th className="px-4 py-2 text-left">
                            Compensación máxima
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        <tr>
                          <td className="px-4 py-2">
                            Bien sin daños previos y método estándar
                          </td>
                          <td className="px-4 py-2">
                            Valor total del servicio pagado por el consumidor
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2">
                            Bien catalogado como “alta sensibilidad” (fibra
                            natural antigua, tintes vegetales, backing
                            descompuesto) y riesgo aceptado por el cliente en el
                            acta de inspección
                          </td>
                          <td className="px-4 py-2">
                            El menor valor entre: 1) el total pagado por el
                            servicio o 2) el 10 % del avalúo comercial del
                            tapete, determinado por un perito certificado
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <p className="text-xs mt-2">
                    * Si se comprobara culpa grave o dolo, Clean Company
                    responderá por los daños efectivamente demostrados conforme
                    al régimen general de responsabilidad civil.
                  </p>

                  <p className="mt-4">
                    Causales de exoneración (cuando sean la causa directa del
                    daño):
                  </p>
                  <ul className="list-disc list-inside space-y-2 pl-4">
                    <li>
                      Vicios ocultos, deterioro estructural o tintes inestables
                      pre-existentes.
                    </li>
                    <li>Intervenciones posteriores del cliente o de terceros.</li>
                    <li>
                      Fuerza mayor o caso fortuito (inundaciones, incendios,
                      cortes eléctricos súbitos que afecten el ciclo de lavado,
                      etc.).
                    </li>
                  </ul>
                </li>

                <li>
                  <h2 className="text-2xl font-semibold mb-2">
                    Seguro de Protección Adicional (Opcional)
                  </h2>
                  <p>
                    El cliente puede adquirir, antes de iniciar el servicio, un
                    Seguro de Valor Extendido que cubre hasta el 100 % del
                    avalúo del tapete en caso de deterioro atribuible al proceso
                    de limpieza, administrado por una aseguradora aliada. Esta
                    oferta complementa la garantía legal y es totalmente
                    opcional.
                  </p>
                </li>

                <li>
                  <h2 className="text-2xl font-semibold mb-2">
                    Marco Legal y Resolución de Conflictos
                  </h2>
                  <p>
                    Estas políticas se interpretan de acuerdo con la Ley 1480 de
                    2011, sus decretos reglamentarios y la Ley 2439 de 2024 en
                    materia de comercio electrónico.{' '}
                    <a
                      href="https://www.hklaw.com"
                      className="underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      hklaw.com
                    </a>
                  </p>
                  <p>
                    Cualquier controversia que no se resuelva mediante
                    reclamación directa podrá ser sometida a la
                    Superintendencia de Industria y Comercio (SIC) o a los
                    mecanismos de solución alternativa de conflictos previstos en
                    la ley.{' '}
                    <a
                      href="https://www.sic.gov.co"
                      className="underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      sic.gov.co
                    </a>
                  </p>
                </li>

                <li>
                  <h2 className="text-2xl font-semibold mb-2">
                    Aceptación de Términos
                  </h2>
                  <p>
                    Al contratar nuestros servicios, el consumidor declara haber
                    leído y aceptado la presente política, sin perjuicio de los
                    derechos irrenunciables que le otorgan las normas de
                    protección al consumidor.
                  </p>
                </li>
              </ol>

              {/* Call to Action */}
              <div className="bg-blue-900/30 border-2 border-blue-400 rounded-xl p-6 mt-8">
                <div className="flex items-center space-x-3">
                  <Phone className="w-8 h-8 text-blue-300 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">
                      ¿Tienes Preguntas sobre Nuestra Garantía?
                    </h3>
                    <p className="text-sm mb-3">
                      Nuestro equipo está disponible para aclarar cualquier duda
                      sobre nuestras políticas de garantía y responsabilidad.
                    </p>
                    <a
                      href="https://wa.me/573128052720?text=Hola,%20tengo%20una%20pregunta%20sobre%20la%20garant%C3%ADa%20de%20Clean%20Company"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition"
                    >
                      Contactar por WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

