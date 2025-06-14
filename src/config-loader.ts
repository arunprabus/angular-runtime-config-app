export function loadRuntimeConfig(): Promise<void> {
  return new Promise((resolve, reject) => {
    fetch('/assets/runtime-config.json')
      .then(response => response.json())
      .then(config => {
        window.__RUNTIME_CONFIG__ = config;
        resolve();
      })
      .catch(error => {
        console.error('Failed to load runtime config:', error);
        // Fallback to default config
        window.__RUNTIME_CONFIG__ = {
          apiUrl: 'http://localhost:3000',
          appName: 'Angular App'
        };
        resolve();
      });
  });
}