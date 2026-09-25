// Envoie les pages vues à Google Analytics (GA4). N'agit que si environment.googleAnalyticsId
// est renseigné (uniquement en prod — voir environment.prod.ts) pour ne jamais polluer les
// statistiques avec du trafic de développement ou de prévisualisation locale.
import { Injectable, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { environment } from '../../../environments/environment';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  private readonly router = inject(Router);

  init(): void {
    const id = environment.googleAnalyticsId;
    if (!id || typeof document === 'undefined') return;

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag(...args: unknown[]): void {
      window.dataLayer.push(args);
    };
    window.gtag('js', new Date());
    // send_page_view désactivé : en SPA il n'y a pas de rechargement entre les routes, donc
    // c'est l'abonnement router ci-dessous (déclenché aussi sur la toute première navigation)
    // qui envoie chaque page vue — sinon la page d'accueil serait comptée deux fois.
    window.gtag('config', id, { send_page_view: false });

    this.router.events.pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd)).subscribe((event) => {
      window.gtag('event', 'page_view', {
        page_path: event.urlAfterRedirects,
        page_location: window.location.href,
      });
    });
  }
}
