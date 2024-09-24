import { ApplicationConfig, provideZoneChangeDetection } from "@angular/core";
import { provideRouter, Routes } from "@angular/router";

export const routes: Routes = [];
export const appConfig: ApplicationConfig = {
 providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes)],
};
export const serverconfig: configfile = {
 baseurl: "http://"+window.location.hostname+":3000",
};
export interface configfile {
 baseurl: string;
}
