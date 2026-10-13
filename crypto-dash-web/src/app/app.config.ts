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
import { AvatarModule } from 'ngx-avatar-2';
import { provideToastr } from 'ngx-toastr';
import { routes } from './app.routes';
import { errorInterceptor } from './core/interceptors/error-interceptor';
import { httpInterceptor } from './core/interceptors/http-interceptor';
import { userInterception } from './core/interceptors/user-interceptor';
import { Language } from './utils/translations/languages';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withXhr(),
      withInterceptors([httpInterceptor, userInterception, errorInterceptor]),
    ),
    provideToastr({
      progressBar: true,
      closeButton: false,
    }),
    importProvidersFrom(AvatarModule.forRoot()),
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
