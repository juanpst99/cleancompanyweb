'use client'

import React from 'react'
import Script from 'next/script'

const StructuredData = () => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "CleaningService",
    "name": "Clean Company",
    "image": "https://cleancompany.com.co/logo.png",
    "@id": "https://cleancompany.com.co",
    "url": "https://cleancompany.com.co",
    "email": "cleancompanymed@gmail.com",
    "telephone": "+573128052720",
    "priceRange": "$$",
    "address": [
      {
        "@type": "PostalAddress",
        "streetAddress": "Calle 30 #78-54",
        "addressLocality": "Medellín",
        "addressRegion": "Antioquia",
        "postalCode": "050001",
        "addressCountry": "CO"
      },
      {
        "@type": "PostalAddress",
        "streetAddress": "Calle 22J #104-30",
        "addressLocality": "Bogotá",
        "addressRegion": "Bogotá D.C.",
        "postalCode": "110111",
        "addressCountry": "CO"
      }
    ],
    "geo": [
      {
        "@type": "GeoCoordinates",
        "latitude": 6.25184,
        "longitude": -75.56359
      },
      {
        "@type": "GeoCoordinates",
        "latitude": 4.71099,
        "longitude": -74.07209
      }
    ],
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ],
        "opens": "08:00",
        "closes": "17:00"
      }
    ],
    "areaServed": [
      {
        "@type": "City",
        "name": "Bogotá"
      },
      {
        "@type": "City",
        "name": "Medellín"
      }
    ],
    "serviceType": [
      "Lavado de alfombras",
      "Lavado de colchones",
      "Lavado de muebles",
      "Limpieza de tapetes",
      "Lavado a domicilio",
      "Limpieza profesional"
    ],
    "sameAs": [
      "https://www.facebook.com/profile.php?id=100092972695790",
      "https://www.instagram.com/cleancompany_colombia/"
    ],
    "review": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "reviewCount": "5000"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Servicios de limpieza",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Lavado de Alfombras y Tapetes",
            "description": "Limpieza profunda y desinfección de alfombras y tapetes con técnicas especializadas"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Lavado de Muebles",
            "description": "Lavado profesional de muebles y tapicería con productos especializados"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Lavado de Colchones",
            "description": "Desinfección y limpieza profunda de colchones para eliminar ácaros y bacterias"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Limpieza Interior de Vehículos",
            "description": "Lavado detallado de interiores de vehículos incluyendo tapicería y paneles"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Servicio Empresarial",
            "description": "Soluciones de limpieza integral para oficinas y espacios comerciales"
          }
        }
      ]
    }
  }

  const localBusinessSchema = [
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Clean Company Medellín",
      "image": "https://cleancompany.com.co/logo.png",
      "telephone": "+573128052720",
      "email": "cleancompanymed@gmail.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Calle 30 #78-54",
        "addressLocality": "Medellín",
        "addressRegion": "Antioquia",
        "postalCode": "050001",
        "addressCountry": "CO"
      },
      "priceRange": "$$",
      "paymentAccepted": "Cash, Credit Card, Debit Card",
      "openingHours": "Mo-Sa 08:00-17:00",
      "url": "https://cleancompany.com.co"
    },
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Clean Company Bogotá",
      "image": "https://cleancompany.com.co/logo.png",
      "telephone": "+573128052720",
      "email": "cleancompanymed@gmail.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Calle 22J #104-30",
        "addressLocality": "Bogotá",
        "addressRegion": "Bogotá D.C.",
        "postalCode": "110111",
        "addressCountry": "CO"
      },
      "priceRange": "$$",
      "paymentAccepted": "Cash, Credit Card, Debit Card",
      "openingHours": "Mo-Sa 08:00-17:00",
      "url": "https://cleancompany.com.co"
    }
  ]

  return (
    <>
      <Script
        id="structured-data-main"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <Script
        id="structured-data-local"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
    </>
  )
}

export default StructuredData
