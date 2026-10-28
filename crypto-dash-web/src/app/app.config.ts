import { provideHttpClient, withInterceptors, withXhr } from '@angular/common/http';
import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { provideRouter } from '@angular/router';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { routes } from './app.routes';
import { errorInterceptor } from './core/interceptors/error-interceptor';
import { httpInterceptor } from './core/interceptors/http-interceptor';
import { userInterception } from './core/interceptors/user-interceptor';
import { Language } from './utils/translations/languages';
import { provideNgxMatToast } from 'ngx-mat-toast';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withXhr(),
      withInterceptors([httpInterceptor, userInterception, errorInterceptor]),
    ),
    provideNgxMatToast({
      duration: 3000,
      progressBar: true,
      closeable: true,
      position: { horizontal: 'end', vertical: 'top' },
    }),

    provideTranslateService({
      loader: provideTranslateHttpLoader({
        prefix: '/i18n/',
        suffix: '.json',
      }),
      // missingTranslationHandler: provideMissingTranslationHandler(DefaultMissingTranslationHandler),
      fallbackLang: Language.EN,
      lang: Language.EN,
    }),
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { hideRequiredMarker: true },
    },
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
  ],
};
