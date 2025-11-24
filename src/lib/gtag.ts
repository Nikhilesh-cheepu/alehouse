// Google Ads conversion tracking utilities

// Declare gtag function for TypeScript
declare global {
  interface Window {
    gtag?: (
      command: string,
      targetId: string,
      config?: Record<string, unknown>
    ) => void;
    dataLayer?: unknown[];
  }
}

// Track a conversion event
export const trackConversion = (conversionId: string = 'AW-17363117356/H-3GCLfqrKIbEKzKsNdA') => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      send_to: conversionId,
    });
  }
};

// Track conversion with value (optional)
export const trackConversionWithValue = (value: number, currency: string = 'INR') => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      send_to: 'AW-17363117356/H-3GCLfqrKIbEKzKsNdA',
      value: value,
      currency: currency,
    });
  }
};


