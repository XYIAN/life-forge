// Environment configuration for Life Forge
export const environment = {
  // Base URL configuration
  baseUrl:
    process.env.NODE_ENV === 'production'
      ? 'https://life-forge.netlify.app'
      : 'http://localhost:3000',

  // API configuration
  apiUrl: process.env.NEXT_PUBLIC_API_URL || '',

  // Feature flags
  features: {
    analytics: true,
    particles: true,
    animations: true,
    themeSwitching: true,
  },

  // App configuration
  app: {
    name: 'Life Forge',
    version: '1.2.0',
    description: 'Your Personal Daily Dashboard',
  },

  // Development settings
  development: {
    debugMode: process.env.NODE_ENV === 'development',
    enableLogging: process.env.NODE_ENV === 'development',
  },

  // Production settings
  production: {
    enableAnalytics: true,
    enableErrorReporting: true,
  },
};

// Helper function to get current environment
export const getEnvironment = () => {
  return {
    isDevelopment: process.env.NODE_ENV === 'development',
    isProduction: process.env.NODE_ENV === 'production',
    isTest: process.env.NODE_ENV === 'test',
  };
};

// Helper function to get base URL
export const getBaseUrl = () => {
  return environment.baseUrl;
};

// Helper function to check if running on Netlify
export const isNetlify = () => {
  return (
    process.env.NETLIFY === 'true' ||
    process.env.VERCEL === 'true' ||
    process.env.NODE_ENV === 'production'
  );
};

// Helper function to check if running locally
export const isLocalhost = () => {
  return (
    process.env.NODE_ENV === 'development' ||
    (typeof window !== 'undefined' &&
      (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'))
  );
};
