// En-tête du site vitrine : logo, navigation, recherche, langue, thème, bouton devis et menu mobile.
import { Component, HostListener, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
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
        <a routerLink="/a-propos" routerLinkActive="is-active">{{ 'common.nav.about' | transloco }}</a>
        <a routerLink="/equipe" routerLinkActive="is-active">{{ 'common.nav.team' | transloco }}</a>
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
        <a class="btn btn--light btn--sm" href="/devis" (click)="openQuote($event)">{{ 'common.requestQuote' | transloco }}</a>
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
      <a href="/devis" (click)="openQuote($event); menuOpen.set(false)">{{ 'common.requestQuote' | transloco }}</a>
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
  protected readonly themeService = inject(ThemeService);
  protected readonly languageService = inject(LanguageService);

  readonly menuOpen = signal(false);
  readonly scrolled = signal(typeof window !== 'undefined' && window.scrollY > 24);

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set(window.scrollY > 24);
  }

  openQuote(event: Event): void {
    event.preventDefault();
    this.quoteModal.open();
  }
}
