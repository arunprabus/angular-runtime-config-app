import { Injectable } from '@angular/core';

interface RuntimeConfig {
  apiUrl: string;
  appName: string;
}

declare global {
  interface Window {
    __RUNTIME_CONFIG__: RuntimeConfig;
  }
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private config: RuntimeConfig;

  constructor() {
    this.config = window.__RUNTIME_CONFIG__ || {
      apiUrl: 'http://localhost:3000',
      appName: 'Angular App'
    };
  }

  get apiUrl(): string {
    return this.config.apiUrl;
  }

  get appName(): string {
    return this.config.appName;
  }

  getConfig(): RuntimeConfig {
    return this.config;
  }
}