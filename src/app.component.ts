import { Component } from '@angular/core';
import { ConfigService } from './config.service';

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <h1>Welcome to {{ appName }}</h1>
      <div class="config-info">
        <h2>Configuration</h2>
        <p><strong>API URL:</strong> {{ apiUrl }}</p>
        <p><strong>App Name:</strong> {{ appName }}</p>
      </div>
      <div class="info">
        <p>This application loads its configuration at runtime from environment variables.</p>
        <a target="_blank" href="https://angular.dev/overview">
          Learn more about Angular
        </a>
      </div>
    </div>
  `,
  styles: [`
    .container {
      max-width: 800px;
      margin: 2rem auto;
      padding: 2rem;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
    
    h1 {
      color: #1976d2;
      margin-bottom: 2rem;
      font-size: 2.5rem;
    }
    
    .config-info {
      background: #f5f5f5;
      padding: 1.5rem;
      border-radius: 8px;
      margin: 2rem 0;
    }
    
    .config-info h2 {
      margin-top: 0;
      color: #333;
    }
    
    .config-info p {
      margin: 0.5rem 0;
      font-size: 1.1rem;
    }
    
    .info {
      margin-top: 2rem;
      padding: 1rem;
      border-left: 4px solid #1976d2;
      background: #e3f2fd;
    }
    
    .info p {
      margin: 0 0 1rem 0;
    }
    
    a {
      color: #1976d2;
      text-decoration: none;
      font-weight: 500;
    }
    
    a:hover {
      text-decoration: underline;
    }
  `]
})
export class AppComponent {
  constructor(private configService: ConfigService) {}
  
  get appName(): string {
    return this.configService.appName;
  }
  
  get apiUrl(): string {
    return this.configService.apiUrl;
  }
}