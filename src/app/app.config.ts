import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { LOCALE_ID } from '@angular/core';
import { routes } from './app.routes';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {appInterceptor} from "./app.interceptor";
import { provideAnimations } from '@angular/platform-browser/animations';

registerLocaleData(localeRu, 'ru');
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient(withInterceptors([
        appInterceptor
    ])), { provide: LOCALE_ID, useValue: 'ru' }, provideAnimations()]
};
