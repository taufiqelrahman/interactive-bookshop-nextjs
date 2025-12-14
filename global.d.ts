/// <reference types="node" />

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
  }

  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
      SENTRY_DSN?: string;
      NEXT_PUBLIC_GOOGLE_ANALYTICS?: string;
      NEXT_PUBLIC_FACEBOOK_PIXEL_ID?: string;
      [key: string]: string | undefined;
    }
  }
}

export {};
