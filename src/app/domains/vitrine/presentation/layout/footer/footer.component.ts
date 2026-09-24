// Pied de page du site vitrine, identique sur toutes les pages.
import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
import { getSiteContact } from '../../../infrastructure/data/site-contact.data';
import { ThemeService } from '../../../../../core/services/theme.service';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, RouterLinkActive, TranslocoPipe],
  template: `
    <footer class="footer">
      <div class="footer__grid">
        <div class="footer__col">
          <div class="footer__logo">
            @if (themeService.theme() === 'dark') {
              <img src="images/logo/logo-full-white.png" alt="ATHL" />
            } @else {
              <img src="images/logo/logo-full-color.png" alt="ATHL" />
            }
          </div>
          <h3>{{ 'common.footer.aboutTitle' | transloco }}</h3>
          <span class="footer__rule"></span>
          <p class="footer__about">{{ 'common.footerAbout' | transloco }}</p>
          <div class="footer__meta">
            <svg class="footer__icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
              <circle cx="12" cy="10" r="2.6" stroke="currentColor" stroke-width="1.8"/>
            </svg>
            <span>{{ 'contact.addressNote' | transloco }}</span>
          </div>
        </div>

        <div class="footer__col">
          <h3>{{ 'common.footer.companyTitle' | transloco }}</h3>
          <span class="footer__rule"></span>
          <nav class="footer__nav footer__nav--col">
            <a routerLink="/" routerLinkActive="is-active" [routerLinkActiveOptions]="{ exact: true }">{{ 'common.nav.home' | transloco }}</a>
            <a routerLink="/services" routerLinkActive="is-active">{{ 'common.nav.services' | transloco }}</a>
            <a routerLink="/projets" routerLinkActive="is-active">{{ 'common.nav.projects' | transloco }}</a>
            <a routerLink="/carrieres" routerLinkActive="is-active">{{ 'common.nav.careers' | transloco }}</a>
            <a routerLink="/a-propos" routerLinkActive="is-active">{{ 'common.nav.about' | transloco }}</a>
            <a routerLink="/contact" routerLinkActive="is-active">{{ 'common.nav.contact' | transloco }}</a>
          </nav>
        </div>

        <div class="footer__col">
          <h3>{{ 'common.footer.officeTitle' | transloco }}</h3>
          <span class="footer__rule"></span>
          <div class="footer__meta">
            <svg class="footer__icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
              <circle cx="12" cy="10" r="2.6" stroke="currentColor" stroke-width="1.8"/>
            </svg>
            <span>{{ contact().address }}</span>
          </div>
          <div class="footer__meta">
            <svg class="footer__icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M4 5.5c0-.8.7-1.5 1.5-1.5H8l2 4.8-1.9 1.5a12.7 12.7 0 0 0 5.6 5.6l1.5-1.9L20 16v2.5c0 .8-.7 1.5-1.5 1.5C10.5 20 4 13.5 4 5.5Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
            </svg>
            <div>
              @if (contact().phone1) { <div><a [href]="'tel:' + contact().phone1">{{ contact().phone1 }}</a></div> }
              @if (contact().phone2) { <div><a [href]="'tel:' + contact().phone2">{{ contact().phone2 }}</a></div> }
              @if (contact().phone3) { <div><a [href]="'tel:' + contact().phone3">{{ contact().phone3 }}</a></div> }
            </div>
          </div>
          <div class="footer__meta">
            <svg class="footer__icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="3.5" y="5.5" width="17" height="13" rx="2" stroke="currentColor" stroke-width="1.8"/>
              <path d="m4.5 7 7.5 5.5L19.5 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <a href="mailto:contact@athl.com">{{ 'common.footer.email' | transloco }}</a>
          </div>
        </div>

        <div class="footer__col">
          <h3>{{ 'common.footer.sourcingTitle' | transloco }}</h3>
          <span class="footer__rule"></span>
          <div class="sourcing-map" role="img" [attr.aria-label]="'common.footer.sourcingTitle' | transloco">
            <div class="sourcing-map__world"></div>
            <svg class="sourcing-map__overlay" viewBox="130 15 190 110">
              <path d="M176,85 Q160,72 174,58" class="sourcing-map__route" />
              <path d="M176,85 Q175,60 188,42" class="sourcing-map__route" />
              <path d="M176,85 Q195,65 213,50" class="sourcing-map__route" />
              <path d="M176,85 Q235,65 288,56" class="sourcing-map__route" />

              <circle cx="174" cy="58" r="3.2" class="sourcing-map__point" />
              <text x="174" y="50" text-anchor="middle" class="sourcing-map__label">{{ 'common.footer.sourcing.2' | transloco }}</text>

              <circle cx="188" cy="42" r="3.2" class="sourcing-map__point" />
              <text x="188" y="34" text-anchor="middle" class="sourcing-map__label">{{ 'common.footer.sourcing.3' | transloco }}</text>

              <circle cx="213" cy="50" r="3.2" class="sourcing-map__point" />
              <text x="213" y="42" text-anchor="middle" class="sourcing-map__label">{{ 'common.footer.sourcing.1' | transloco }}</text>

              <circle cx="288" cy="56" r="3.2" class="sourcing-map__point" />
              <text x="288" y="48" text-anchor="middle" class="sourcing-map__label">{{ 'common.footer.sourcing.0' | transloco }}</text>

              <circle cx="176" cy="85" r="7" class="sourcing-map__hub-ring" />
              <circle cx="176" cy="85" r="4" class="sourcing-map__hub" />
              <text x="176" y="100" text-anchor="middle" class="sourcing-map__label sourcing-map__label--home">{{ 'common.footer.hub' | transloco }}</text>
            </svg>
          </div>
        </div>
      </div>

      <div class="wordmark">ATHL</div>

      <div class="footer__bottom">
        <div class="footer__copy">{{ 'common.footer.copyright' | transloco: { year } }}</div>
        <div class="socials-group">
          <span class="socials__label">{{ 'common.footer.followUs' | transloco }}</span>
          <div class="socials">
            @if (contact().facebookUrl) {
              <a [href]="contact().facebookUrl!" target="_blank" rel="noopener" aria-label="Facebook">f</a>
            } @else {
              <a routerLink="/contact" aria-label="Facebook">f</a>
            }
            @if (contact().youtubeUrl) {
              <a [href]="contact().youtubeUrl!" target="_blank" rel="noopener" aria-label="YouTube">&#9658;</a>
            } @else {
              <a routerLink="/contact" aria-label="YouTube">&#9658;</a>
            }
            @if (contact().instagramUrl) {
              <a [href]="contact().instagramUrl!" target="_blank" rel="noopener" aria-label="Instagram">&#9906;</a>
            } @else {
              <a routerLink="/contact" aria-label="Instagram">&#9906;</a>
            }
            @if (contact().linkedinUrl) {
              <a [href]="contact().linkedinUrl!" target="_blank" rel="noopener" aria-label="LinkedIn">in</a>
            } @else {
              <a routerLink="/contact" aria-label="LinkedIn">in</a>
            }
            <a href="https://www.tiktok.com/@africatalentconsulting" target="_blank" rel="noopener" aria-label="TikTok">&#9835;</a>
          </div>
        </div>
      </div>
    </footer>
  `,
})
export class FooterComponent {
  protected readonly themeService = inject(ThemeService);
  readonly contact = computed(() => getSiteContact());
  readonly year = new Date().getFullYear();
}
