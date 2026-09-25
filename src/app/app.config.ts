import { ApplicationConfig, isDevMode, provideAppInitializer, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideTransloco } from '@jsverse/transloco';
import { routes } from './app.routes';
import { TranslocoHttpLoader } from './core/services/transloco-loader';
import { resolveInitialLang } from './core/services/language.service';
import { initializeServiceCatalog, initializeJobCatalog, initializeJobDomainCatalog, initializeTeamCatalog, initializeProjectCatalog, initializeHomeStatsCatalog, initializeSiteContactCatalog, initializePopupCatalog, initializeAnalytics } from './core/initializers/initializers';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    provideAppInitializer(initializeServiceCatalog),
    provideAppInitializer(initializeJobCatalog),
    provideAppInitializer(initializeJobDomainCatalog),
    provideAppInitializer(initializeTeamCatalog),
    provideAppInitializer(initializeProjectCatalog),
    provideAppInitializer(initializeHomeStatsCatalog),
    provideAppInitializer(initializeSiteContactCatalog),
    provideAppInitializer(initializePopupCatalog),
    provideAppInitializer(initializeAnalytics),
    provideTransloco({
      config: {
        availableLangs: ['fr', 'en'],
        defaultLang: resolveInitialLang(),
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
        fallbackLang: 'fr',
      },
      loader: TranslocoHttpLoader,
    }),
  ],
};
