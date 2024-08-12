import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, Routes  } from '@angular/router';


export const routes: Routes = [];

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes)]
};
