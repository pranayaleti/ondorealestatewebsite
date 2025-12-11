// Global type declarations for the application

// Google Analytics gtag function
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    reb2b?: {
      loaded: boolean;
    };
  }
}

export {};
