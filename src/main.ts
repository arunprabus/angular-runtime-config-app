import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { loadRuntimeConfig } from './config-loader';

// Load runtime configuration before bootstrapping the application
loadRuntimeConfig().then(() => {
  bootstrapApplication(AppComponent)
    .catch(err => console.error(err));
});