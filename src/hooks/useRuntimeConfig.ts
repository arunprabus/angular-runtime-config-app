import { useState, useEffect } from 'react';

interface RuntimeConfig {
  apiUrl: string;
  appName: string;
  environment: string;
  features: {
    authentication: boolean;
    fileUpload: boolean;
    notifications: boolean;
  };
  version: string;
  buildTime: string;
}

const defaultConfig: RuntimeConfig = {
  apiUrl: 'http://localhost:3000/api',
  appName: 'React Runtime Config App',
  environment: 'development',
  features: {
    authentication: true,
    fileUpload: true,
    notifications: true,
  },
  version: '1.0.0',
  buildTime: new Date().toISOString(),
};

export const useRuntimeConfig = () => {
  const [config, setConfig] = useState<RuntimeConfig>(defaultConfig);

  useEffect(() => {
    // In development, we use default config
    // In Docker production, this would attempt to load from /assets/runtime-config.json
    const loadConfig = async () => {
      try {
        // Only attempt to load runtime config in production builds
        if (import.meta.env.PROD) {
          const response = await fetch('/assets/runtime-config.json', {
            cache: 'no-cache',
            headers: {
              'Cache-Control': 'no-cache',
            },
          });

          if (response.ok) {
            const runtimeConfig = await response.json();
            setConfig({ ...defaultConfig, ...runtimeConfig });
            return;
          }
        }
        
        // Use default config for development or if runtime config fails
        setConfig(defaultConfig);
      } catch (err) {
        console.warn('Using default configuration:', err);
        setConfig(defaultConfig);
      }
    };

    loadConfig();
  }, []);

  return { config };
};