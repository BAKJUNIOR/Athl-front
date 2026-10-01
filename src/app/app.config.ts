import { ApplicationConfig, isDevMode, provideAppInitializer, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideTransloco } from '@jsverse/transloco';
import { routes } from './app.routes';
import { TranslocoHttpLoader } from './core/services/transloco-loader';
import { resolveInitialLang } from './core/services/language.service';
import { initializeServiceCatalog, initializeJobCatalog, initializeJobDomainCatalog, initializeTeamCatalog, initializeTestimonialsCatalog, initializeProjectCatalog, initializeSiteContactCatalog, initializePopupCatalog, initializeAboutPage, initializePartnersSection, initializeContactPage, initializeAnalytics } from './core/initializers/initializers';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    provideAppInitializer(initializeServiceCatalog),
    provideAppInitializer(initializeJobCatalog),
    provideAppInitializer(initializeJobDomainCatalog),
    provideAppInitializer(initializeTeamCatalog),
    provideAppInitializer(initializeTestimonialsCatalog),
    provideAppInitializer(initializeProjectCatalog),
    provideAppInitializer(initializeSiteContactCatalog),
    provideAppInitializer(initializePopupCatalog),
    provideAppInitializer(initializeAboutPage),
    provideAppInitializer(initializePartnersSection),
    provideAppInitializer(initializeContactPage),
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
