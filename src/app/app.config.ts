// app.config.ts
import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core'; 
import { provideRouter, RouterModule } from '@angular/router';
import { HttpClientModule, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    importProvidersFrom(HttpClientModule),
    provideHttpClient(), // ✅ correct maintenant
    importProvidersFrom(CommonModule, FormsModule, RouterModule)
  ]
};
