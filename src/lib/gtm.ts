// Google Tag Manager Helper Functions
export const GTM_ID = 'GTM-WG2MH57';

// Tipos para eventos de GTM
export interface GTMEvent {
  event: string;
  [key: string]: any;
}

// Push evento a dataLayer
export const pushToDataLayer = (data: GTMEvent) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push(data);
  }
};

// Eventos de conversión predefinidos
export const GTMEvents = {
  // Eventos de página
  pageView: (pagePath: string, pageTitle: string) => {
    pushToDataLayer({
      event: 'page_view',
      page_path: pagePath,
      page_title: pageTitle,
      page_location: window.location.href,
    });
  },

  // Eventos de formulario
  formStart: (formName: string) => {
    pushToDataLayer({
      event: 'form_start',
      form_name: formName,
      timestamp: new Date().toISOString(),
    });
  },

  formSubmit: (formName: string, formData?: Record<string, any>) => {
    pushToDataLayer({
      event: 'form_submit',
      form_name: formName,
      form_data: formData,
      timestamp: new Date().toISOString(),
    });
  },

  // Eventos de conversión de WhatsApp
  whatsappClick: (service: string, message: string) => {
    pushToDataLayer({
      event: 'whatsapp_click',
      conversion_event: 'contact_whatsapp',
      service_type: service,
      message_preview: message,
      value: getServiceValue(service),
      currency: 'COP',
    });
  },

  // Eventos de llamada
  phoneClick: (phoneNumber: string, location?: string) => {
    pushToDataLayer({
      event: 'phone_click',
      conversion_event: 'contact_phone',
      phone_number: phoneNumber,
      location: location,
    });
  },

  // Eventos de servicios
  serviceView: (serviceName: string, serviceId: string) => {
    pushToDataLayer({
      event: 'view_item',
      item_name: serviceName,
      item_id: serviceId,
      item_category: 'servicios',
      value: getServiceValue(serviceId),
      currency: 'COP',
    });
  },

  serviceClick: (serviceName: string, serviceId: string) => {
    pushToDataLayer({
      event: 'select_item',
      item_name: serviceName,
      item_id: serviceId,
      item_category: 'servicios',
    });
  },

  // Evento de cotización iniciada
  quotationStart: (service: string, city?: string) => {
    pushToDataLayer({
      event: 'begin_checkout',
      conversion_event: 'quotation_start',
      service_type: service,
      city: city || 'not_specified',
      value: getServiceValue(service),
      currency: 'COP',
    });
  },

  // Evento de cotización completada
  quotationComplete: (service: string, city: string, customerData: any) => {
    pushToDataLayer({
      event: 'purchase',
      conversion_event: 'quotation_complete',
      service_type: service,
      city: city,
      customer_type: customerData.tipo || 'particular',
      value: getServiceValue(service),
      currency: 'COP',
      transaction_id: generateTransactionId(),
    });
  },

  // Scroll Depth
  scrollDepth: (percentage: number) => {
    pushToDataLayer({
      event: 'scroll',
      scroll_depth: percentage,
      page_path: window.location.pathname,
    });
  },

  // Tiempo en página
  timeOnPage: (seconds: number, pagePath: string) => {
    pushToDataLayer({
      event: 'time_on_page',
      engagement_time: seconds,
      page_path: pagePath,
    });
  },

  // Video (si tienen videos)
  videoPlay: (videoTitle: string, videoId: string) => {
    pushToDataLayer({
      event: 'video_start',
      video_title: videoTitle,
      video_id: videoId,
    });
  },

  videoComplete: (videoTitle: string, videoId: string) => {
    pushToDataLayer({
      event: 'video_complete',
      video_title: videoTitle,
      video_id: videoId,
    });
  },

  // Errores
  errorTracking: (errorMessage: string, errorLocation: string) => {
    pushToDataLayer({
      event: 'exception',
      description: errorMessage,
      fatal: false,
      error_location: errorLocation,
    });
  },
};

// Helper para obtener valor estimado del servicio
function getServiceValue(service: string): number {
  const serviceValues: Record<string, number> = {
    'alfombras': 5000,
    'tapetes': 6500,
    'muebles': 6500,
    'colchones': 6500,
    'vehiculos': 5000,
    'empresarial': 8000,
    'default': 6500,
  };
  
  return serviceValues[service.toLowerCase()] || serviceValues.default;
}

// Generar ID de transacción único
function generateTransactionId(): string {
  return `TRX_${Date.now()}_${Math.random().toString(36).substring(7)}`;
}

// Enhanced Ecommerce Events para servicios
export const EnhancedEcommerce = {
  // Impresión de lista de servicios
  impressionList: (services: Array<{id: string, name: string, position: number}>) => {
    pushToDataLayer({
      event: 'view_item_list',
      ecommerce: {
        items: services.map(service => ({
          item_id: service.id,
          item_name: service.name,
          item_category: 'servicios',
          item_list_name: 'servicios_principales',
          index: service.position,
          price: getServiceValue(service.id),
        })),
      },
    });
  },

  // Click en servicio
  selectItem: (serviceId: string, serviceName: string, position: number) => {
    pushToDataLayer({
      event: 'select_item',
      ecommerce: {
        items: [{
          item_id: serviceId,
          item_name: serviceName,
          item_category: 'servicios',
          item_list_name: 'servicios_principales',
          index: position,
          price: getServiceValue(serviceId),
        }],
      },
    });
  },

  // Vista de detalle de servicio
  viewItem: (serviceId: string, serviceName: string) => {
    pushToDataLayer({
      event: 'view_item',
      ecommerce: {
        currency: 'COP',
        value: getServiceValue(serviceId),
        items: [{
          item_id: serviceId,
          item_name: serviceName,
          item_category: 'servicios',
          price: getServiceValue(serviceId),
          quantity: 1,
        }],
      },
    });
  },

  // Agregar a cotización
  addToCart: (serviceId: string, serviceName: string) => {
    pushToDataLayer({
      event: 'add_to_cart',
      ecommerce: {
        currency: 'COP',
        value: getServiceValue(serviceId),
        items: [{
          item_id: serviceId,
          item_name: serviceName,
          item_category: 'servicios',
          price: getServiceValue(serviceId),
          quantity: 1,
        }],
      },
    });
  },

  // Inicio de cotización
  beginCheckout: (services: Array<{id: string, name: string}>) => {
    const totalValue = services.reduce((sum, service) => sum + getServiceValue(service.id), 0);
    
    pushToDataLayer({
      event: 'begin_checkout',
      ecommerce: {
        currency: 'COP',
        value: totalValue,
        items: services.map(service => ({
          item_id: service.id,
          item_name: service.name,
          item_category: 'servicios',
          price: getServiceValue(service.id),
          quantity: 1,
        })),
      },
    });
  },
};

// Declaración global para TypeScript
declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}