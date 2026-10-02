import { ApplicationConfig, isDevMode, provideAppInitializer, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideTransloco } from '@jsverse/transloco';
import { routes } from './app.routes';
import { TranslocoHttpLoader } from './core/services/transloco-loader';
import { resolveInitialLang } from './core/services/language.service';
import { initializeServiceCatalog, initializeJobCatalog, initializeJobDomainCatalog, initializeTeamCatalog, initializeProjectCatalog, initializeNewsCatalog, initializeSiteContactCatalog, initializePopupCatalog, initializeAboutPage, initializePartnersSection, initializeContactPage, initializeAnalytics } from './core/initializers/initializers';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    // Remonte en haut de page à chaque navigation (sauf retour arrière, où la position est
    // restaurée) — sans ça, le routeur garde le scroll de la page précédente.
    provideRouter(routes, withInMemoryScrolling({ scrollPositionRestoration: 'top', anchorScrolling: 'enabled' })),
    provideHttpClient(),
    provideAppInitializer(initializeServiceCatalog),
    provideAppInitializer(initializeJobCatalog),
    provideAppInitializer(initializeJobDomainCatalog),
    provideAppInitializer(initializeTeamCatalog),
    provideAppInitializer(initializeProjectCatalog),
    provideAppInitializer(initializeNewsCatalog),
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
