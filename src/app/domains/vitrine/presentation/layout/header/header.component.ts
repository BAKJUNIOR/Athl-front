// En-tête du site vitrine : logo, navigation, recherche, langue, thème, bouton devis et menu mobile.
import { Component, ElementRef, HostListener, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs';
import { TranslocoPipe } from '@jsverse/transloco';
import { QuoteModalService } from '../../services/quote-modal.service';
import { ThemeService } from '../../../../../core/services/theme.service';
import { LanguageService } from '../../../../../core/services/language.service';

@Component({
  selector: 'app-header',
  host: { '[class.is-scrolled]': 'scrolled()' },
  imports: [RouterLink, RouterLinkActive, TranslocoPipe],
  template: `
    <header class="header">
      <a class="logo" routerLink="/">
        @if (themeService.theme() === 'dark') {
          <img src="images/logo/logo-full-white.png" alt="ATHL — Africa Talent Habitat &amp; Logistique" />
        } @else {
          <img src="images/logo/logo-full-color.png" alt="ATHL — Africa Talent Habitat &amp; Logistique" />
        }
      </a>


      <nav class="nav">
        <a routerLink="/" routerLinkActive="is-active" [routerLinkActiveOptions]="{ exact: true }">{{ 'common.nav.home' | transloco }}</a>
        <a routerLink="/projets" routerLinkActive="is-active">{{ 'common.nav.projects' | transloco }}</a>
        <a routerLink="/services" routerLinkActive="is-active">{{ 'common.nav.services' | transloco }}</a>
        <a routerLink="/actualites" routerLinkActive="is-active">{{ 'common.nav.news' | transloco }}</a>
        <a routerLink="/carrieres" routerLinkActive="is-active">{{ 'common.nav.careers' | transloco }}</a>

        <div class="nav-item" (mouseenter)="openCompanyMenu()" (mouseleave)="scheduleCompanyClose()">
          <button
            type="button"
            class="nav-dropdown-trigger"
            [class.is-open]="companyOpen()"
            [class.is-active]="isCompanyRoute()"
            [attr.aria-expanded]="companyOpen()"
            (click)="companyOpen.set(!companyOpen())"
          >
            {{ 'common.nav.company' | transloco }}
            <svg class="nav-dropdown-caret" [class.is-open]="companyOpen()" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
          @if (companyOpen()) {
            <div class="nav-dropdown-panel" (mouseenter)="openCompanyMenu()" (mouseleave)="scheduleCompanyClose()">
              <a class="nav-dropdown-link" routerLink="/a-propos" routerLinkActive="is-active" (click)="companyOpen.set(false)">
                <span class="nav-dropdown-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 21V9l8-5 8 5v12M9 21v-6h6v6" /></svg>
                </span>
                <span class="nav-dropdown-text">
                  <strong>{{ 'common.nav.about' | transloco }}</strong>
                  <small>{{ 'common.nav.aboutDesc' | transloco }}</small>
                </span>
              </a>
              <a class="nav-dropdown-link" routerLink="/equipe" routerLinkActive="is-active" (click)="companyOpen.set(false)">
                <span class="nav-dropdown-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 3.5-7 8-7s8 3 8 7" /></svg>
                </span>
                <span class="nav-dropdown-text">
                  <strong>{{ 'common.nav.team' | transloco }}</strong>
                  <small>{{ 'common.nav.teamDesc' | transloco }}</small>
                </span>
              </a>
            </div>
          }
        </div>

        <a routerLink="/contact" routerLinkActive="is-active">{{ 'common.nav.contact' | transloco }}</a>
      </nav>

      <div class="header__actions">
        <a class="icon-btn" routerLink="/recherche" routerLinkActive="is-active" [attr.aria-label]="'search.eyebrow' | transloco">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16.2" y2="16.2" />
          </svg>
        </a>
        <div class="lang-toggle" role="group" [attr.aria-label]="'common.chooseLanguage' | transloco">
          <button type="button" [class.is-on]="languageService.lang() === 'fr'" (click)="languageService.setLang('fr')">FR</button>
          <span aria-hidden="true">/</span>
          <button type="button" [class.is-on]="languageService.lang() === 'en'" (click)="languageService.setLang('en')">EN</button>
        </div>
        <button
          class="icon-btn"
          type="button"
          [attr.aria-label]="themeService.theme() === 'dark' ? ('common.theme.enableLight' | transloco) : ('common.theme.enableDark' | transloco)"
          (click)="themeService.toggle()"
        >
          @if (themeService.theme() === 'dark') {
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="4.2" />
              <path d="M12 2.5v2.4M12 19.1v2.4M4.6 4.6l1.7 1.7M17.7 17.7l1.7 1.7M2.5 12h2.4M19.1 12h2.4M4.6 19.4l1.7-1.7M17.7 6.3l1.7-1.7" />
            </svg>
          } @else {
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M20.5 14.2A8.5 8.5 0 1 1 9.8 3.5a6.8 6.8 0 0 0 10.7 10.7Z" />
            </svg>
          }
        </button>
        <a class="btn btn--light btn--sm" routerLink="/devis" routerLinkActive="is-active" (click)="openQuote($event)">{{ 'common.requestQuote' | transloco }}</a>
        <button
          class="burger"
          type="button"
          [attr.aria-label]="'common.menu' | transloco"
          [attr.aria-expanded]="menuOpen()"
          aria-controls="mobile-menu"
          (click)="menuOpen.set(!menuOpen())"
        >
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>

    <nav class="mobile-menu" id="mobile-menu" [hidden]="!menuOpen()">
      <a routerLink="/" routerLinkActive="is-active" [routerLinkActiveOptions]="{ exact: true }" (click)="menuOpen.set(false)">{{ 'common.nav.home' | transloco }}</a>
      <a routerLink="/projets" routerLinkActive="is-active" (click)="menuOpen.set(false)">{{ 'common.nav.projects' | transloco }}</a>
      <a routerLink="/services" routerLinkActive="is-active" (click)="menuOpen.set(false)">{{ 'common.nav.services' | transloco }}</a>
      <a routerLink="/actualites" routerLinkActive="is-active" (click)="menuOpen.set(false)">{{ 'common.nav.news' | transloco }}</a>
      <a routerLink="/carrieres" routerLinkActive="is-active" (click)="menuOpen.set(false)">{{ 'common.nav.careers' | transloco }}</a>
      <a routerLink="/a-propos" routerLinkActive="is-active" (click)="menuOpen.set(false)">{{ 'common.nav.about' | transloco }}</a>
      <a routerLink="/equipe" routerLinkActive="is-active" (click)="menuOpen.set(false)">{{ 'common.nav.team' | transloco }}</a>
      <a routerLink="/contact" (click)="menuOpen.set(false)">{{ 'common.nav.contact' | transloco }}</a>
      <a routerLink="/devis" routerLinkActive="is-active" (click)="openQuote($event); menuOpen.set(false)">{{ 'common.requestQuote' | transloco }}</a>
      <div class="theme-toggle-row">
        <span>{{ 'common.language' | transloco }}</span>
        <div class="lang-toggle" role="group" [attr.aria-label]="'common.chooseLanguage' | transloco">
          <button type="button" [class.is-on]="languageService.lang() === 'fr'" (click)="languageService.setLang('fr')">FR</button>
          <span aria-hidden="true">/</span>
          <button type="button" [class.is-on]="languageService.lang() === 'en'" (click)="languageService.setLang('en')">EN</button>
        </div>
      </div>
    </nav>
  `,
})
export class HeaderComponent {
  private readonly quoteModal = inject(QuoteModalService);
  private readonly router = inject(Router);
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  protected readonly themeService = inject(ThemeService);
  protected readonly languageService = inject(LanguageService);

  readonly menuOpen = signal(false);
  readonly scrolled = signal(typeof window !== 'undefined' && window.scrollY > 24);

  // Regroupe À propos/Équipe sous un seul item "Entreprise" (voir nav) — reste surligné quand
  // on est sur l'une de ces deux pages, même le menu refermé.
  readonly companyOpen = signal(false);
  private readonly currentUrl = toSignal(
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      map((e) => e.urlAfterRedirects),
    ),
    { initialValue: this.router.url },
  );
  readonly isCompanyRoute = () => {
    const url = this.currentUrl();
    return url.startsWith('/a-propos') || url.startsWith('/equipe');
  };

  // Fermeture différée (au lieu d'un mouseleave direct) : le panneau est positionné en absolu
  // sous le déclencheur, avec un petit espace entre les deux — un mouseleave immédiat ferme le
  // panneau dès que le curseur traverse cet espace en diagonale, avant même d'atteindre les liens
  // (c'est le bug remonté). Le délai laisse le temps au mouseenter du panneau de l'annuler.
  private companyCloseTimer: ReturnType<typeof setTimeout> | null = null;

  openCompanyMenu(): void {
    if (this.companyCloseTimer) {
      clearTimeout(this.companyCloseTimer);
      this.companyCloseTimer = null;
    }
    this.companyOpen.set(true);
  }

  scheduleCompanyClose(): void {
    this.companyCloseTimer = setTimeout(() => this.companyOpen.set(false), 200);
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set(window.scrollY > 24);
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.companyOpen.set(false);
  }

  // Filet de sécurité supplémentaire : ferme le panneau si on clique vraiment ailleurs
  // dans la page (hors du bouton et du panneau), indépendamment du survol.
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.companyOpen()) return;
    const target = event.target as Node;
    if (!this.elementRef.nativeElement.contains(target)) {
      this.companyOpen.set(false);
    }
  }

  openQuote(event: Event): void {
    event.preventDefault();
    this.quoteModal.open();
  }
}
