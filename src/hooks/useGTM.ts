'use client'

import { useEffect, useCallback } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { GTMEvents, EnhancedEcommerce } from '@/lib/gtm';

export const useGTM = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Track page views
  useEffect(() => {
    if (pathname) {
      // Obtener título de la página
      const pageTitle = document.title || 'Clean Company';
      
      // Track página vista
      GTMEvents.pageView(pathname, pageTitle);
      
      // Si es una página de servicio, track vista de servicio
      if (pathname.includes('/servicios/')) {
        const serviceId = pathname.split('/').pop() || '';
        const serviceName = serviceId.charAt(0).toUpperCase() + serviceId.slice(1);
        GTMEvents.serviceView(serviceName, serviceId);
        EnhancedEcommerce.viewItem(serviceId, serviceName);
      }

      // Track parámetros UTM si existen
      const utmSource = searchParams.get('utm_source');
      const utmMedium = searchParams.get('utm_medium');
      const utmCampaign = searchParams.get('utm_campaign');
      
      if (utmSource || utmMedium || utmCampaign) {
        window.dataLayer?.push({
          event: 'utm_parameters',
          utm_source: utmSource || 'direct',
          utm_medium: utmMedium || 'none',
          utm_campaign: utmCampaign || 'none',
          utm_term: searchParams.get('utm_term') || '',
          utm_content: searchParams.get('utm_content') || '',
        });
      }
    }
  }, [pathname, searchParams]);

  // Track scroll depth
  useEffect(() => {
    let maxScroll = 0;
    const scrollDepths = [25, 50, 75, 90, 100];
    const trackedDepths = new Set<number>();

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const scrollPercentage = Math.round((scrolled / scrollHeight) * 100);

      if (scrollPercentage > maxScroll) {
        maxScroll = scrollPercentage;

        scrollDepths.forEach(depth => {
          if (scrollPercentage >= depth && !trackedDepths.has(depth)) {
            trackedDepths.add(depth);
            GTMEvents.scrollDepth(depth);
          }
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  // Track tiempo en página
  useEffect(() => {
    const startTime = Date.now();
    const intervals = [15, 30, 60, 120, 180, 300]; // segundos
    const timers: NodeJS.Timeout[] = [];

    intervals.forEach(seconds => {
      const timer = setTimeout(() => {
        GTMEvents.timeOnPage(seconds, pathname);
      }, seconds * 1000);
      timers.push(timer);
    });

    return () => {
      // Limpiar timers
      timers.forEach(timer => clearTimeout(timer));
      
      // Track tiempo final
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      if (timeSpent > 5) {
        GTMEvents.timeOnPage(timeSpent, pathname);
      }
    };
  }, [pathname]);

  // Funciones de tracking para usar en componentes
  const trackWhatsAppClick = useCallback((service: string, message: string) => {
    GTMEvents.whatsappClick(service, message);
  }, []);

  const trackPhoneClick = useCallback((phoneNumber: string, location?: string) => {
    GTMEvents.phoneClick(phoneNumber, location);
  }, []);

  const trackServiceClick = useCallback((serviceName: string, serviceId: string, position?: number) => {
    GTMEvents.serviceClick(serviceName, serviceId);
    if (position !== undefined) {
      EnhancedEcommerce.selectItem(serviceId, serviceName, position);
    }
  }, []);

  const trackFormStart = useCallback((formName: string) => {
    GTMEvents.formStart(formName);
  }, []);

  const trackFormSubmit = useCallback((formName: string, formData?: any) => {
    GTMEvents.formSubmit(formName, formData);
  }, []);

  const trackQuotationStart = useCallback((service: string, city?: string) => {
    GTMEvents.quotationStart(service, city);
    EnhancedEcommerce.addToCart(service, service);
  }, []);

  const trackQuotationComplete = useCallback((service: string, city: string, customerData: any) => {
    GTMEvents.quotationComplete(service, city, customerData);
  }, []);

  const trackError = useCallback((errorMessage: string, errorLocation: string) => {
    GTMEvents.errorTracking(errorMessage, errorLocation);
  }, []);

  return {
    trackWhatsAppClick,
    trackPhoneClick,
    trackServiceClick,
    trackFormStart,
    trackFormSubmit,
    trackQuotationStart,
    trackQuotationComplete,
    trackError,
  };
};

// Hook para track de visibilidad (lazy loading, viewport)
export const useVisibilityTracking = (elementId: string, eventName: string) => {
  useEffect(() => {
    const element = document.getElementById(elementId);
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            window.dataLayer?.push({
              event: eventName,
              element_id: elementId,
              visibility_ratio: entry.intersectionRatio,
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 } // Trigger cuando 50% visible
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [elementId, eventName]);
};