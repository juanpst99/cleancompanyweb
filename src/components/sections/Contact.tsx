'use client'

import React, { useState } from 'react'
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter, Send } from 'lucide-react'

const Contact = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    servicio: '',
    ciudad: '',
    mensaje: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Construir mensaje de WhatsApp
    const message = `Hola, mi nombre es ${formData.nombre}. Quiero solicitar servicio de ${formData.servicio} en ${formData.ciudad}. ${formData.mensaje ? `Mensaje adicional: ${formData.mensaje}` : ''}`
    const whatsappUrl = `https://wa.me/573128052720?text=${encodeURIComponent(message)}`
    
    window.open(whatsappUrl, '_blank')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <section id="contacto" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Contáctanos</h2>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold mb-6">Información de Contacto</h3>
            
            <div className="space-y-4">
              <div className="flex items-start group">
                <div className="bg-blue-100 p-3 rounded-lg mr-4 group-hover:bg-blue-600 transition-colors">
                  <MapPin className="w-6 h-6 text-blue-600 group-hover:text-white" />
                </div>
                <div>
                  <h4 className="font-semibold">Ubicaciones</h4>
                  <p className="text-gray-600">Medellín, Antioquia</p>
                  <p className="text-gray-600">Bogotá D.C.</p>
                </div>
              </div>
              
              <div className="flex items-start group">
                <div className="bg-blue-100 p-3 rounded-lg mr-4 group-hover:bg-blue-600 transition-colors">
                  <Phone className="w-6 h-6 text-blue-600 group-hover:text-white" />
                </div>
                <div>
                  <h4 className="font-semibold">Teléfono</h4>
                  <a href="tel:+573128052720" className="text-gray-600 hover:text-blue-600">
                    +57 312 805 2720
                  </a>
                </div>
              </div>
              
              <div className="flex items-start group">
                <div className="bg-blue-100 p-3 rounded-lg mr-4 group-hover:bg-blue-600 transition-colors">
                  <Mail className="w-6 h-6 text-blue-600 group-hover:text-white" />
                </div>
                <div>
                  <h4 className="font-semibold">Email</h4>
                  <a href="mailto:cleancompanymed@gmail.com" className="text-gray-600 hover:text-blue-600">
                    cleancompanymed@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start group">
                <div className="bg-blue-100 p-3 rounded-lg mr-4 group-hover:bg-blue-600 transition-colors">
                  <Clock className="w-6 h-6 text-blue-600 group-hover:text-white" />
                </div>
                <div>
                  <h4 className="font-semibold">Horario</h4>
                  <p className="text-gray-600">Lunes a Sábado: 7:00 AM - 6:00 PM</p>
                  <p className="text-gray-600">Domingos: 8:00 AM - 2:00 PM</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-100 p-6 rounded-2xl">
              <h4 className="font-semibold mb-4">Síguenos en Redes Sociales</h4>
              <div className="flex space-x-4">
                <a href="#" className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition transform hover:scale-110">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="bg-pink-600 text-white p-3 rounded-full hover:bg-pink-700 transition transform hover:scale-110">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="bg-blue-400 text-white p-3 rounded-full hover:bg-blue-500 transition transform hover:scale-110">
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
          
          <div>
            <form onSubmit={handleSubmit} className="bg-gray-100 p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-semibold mb-6">Solicitar Servicio</h3>
              
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Nombre *</label>
                  <input 
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 transition"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Teléfono *</label>
                  <input 
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 transition"
                    required
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2 font-medium">Servicio *</label>
                <select 
                  name="servicio"
                  value={formData.servicio}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 transition"
                  required
                >
                  <option value="">Selecciona un servicio</option>
                  <option value="alfombras">Alfombras y Tapetes</option>
                  <option value="muebles">Muebles</option>
                  <option value="colchones">Colchones</option>
                  <option value="vehiculos">Vehículos</option>
                  <option value="empresarial">Servicio Empresarial</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2 font-medium">Ciudad *</label>
                <select 
                  name="ciudad"
                  value={formData.ciudad}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 transition"
                  required
                >
                  <option value="">Selecciona tu ciudad</option>
                  <option value="medellin">Medellín</option>
                  <option value="bogota">Bogotá</option>
                </select>
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 mb-2 font-medium">Mensaje (opcional)</label>
                <textarea 
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 transition"
                  placeholder="Cuéntanos más detalles sobre tu solicitud..."
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg font-semibold flex items-center justify-center"
              >
                <Send className="w-5 h-5 mr-2" />
                Enviar Solicitud por WhatsApp
              </button>
            </form>
          </div>
        </div>
        
        {/* Mapa */}
        <div className="mt-12 rounded-2xl overflow-hidden shadow-2xl h-96 bg-gray-300 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-16 h-16 text-gray-500 mx-auto mb-4" />
            <p className="text-gray-600">Mapa de ubicación</p>
            <p className="text-sm text-gray-500 mt-2">Próximamente</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact