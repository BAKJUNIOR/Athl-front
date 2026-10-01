// Bandeau « Nos partenaires » : une rangée de logos qui défile (pause au survol).
import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, map } from 'rxjs';
import { RevealDirective } from '../reveal.directive';
import { Partner, getPartnersSection } from '../../../infrastructure/data/partners.data';
import { LanguageService } from '../../../../../core/services/language.service';

@Component({
  selector: 'app-partners',
  imports: [RouterLink, RevealDirective],
  template: `
    @if (!hidden()) {
      <section class="partners" id="partenaires">
        <div class="partners__head" appReveal>
          <div>
            <div class="about-block__eyebrow"><span></span>{{ section().eyebrow }}</div>
            <h2>{{ section().title }}</h2>
            <p class="lead">{{ section().subtitle }}</p>
          </div>
          @if (!onContactPage()) {
            <a class="btn btn--ghost" routerLink="/contact">{{ section().ctaLabel }}</a>
          }
        </div>

        <div class="marquee" [appReveal]="120">
          <div class="marquee__row">
            <div class="marquee__track">
              @for (p of loop(); track $index) {
                <div class="partner" [attr.aria-hidden]="$index >= partners().length ? true : null">
                  @if (p.logo) {
                    <span class="partner__logo" role="img" [attr.aria-label]="p.name" [style.--logo]="'url(' + p.logo + ')'"></span>
                  } @else {
                    <span class="partner__mark">{{ initial(p) }}</span>
                    <span class="partner__name">{{ p.name }}</span>
                  }
                </div>
              }
            </div>
          </div>
        </div>
      </section>
    }
  `,
})
export class PartnersComponent {
  private readonly router = inject(Router);
  private readonly languageService = inject(LanguageService);
  private readonly currentPath = toSignal(
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      map((e) => e.urlAfterRedirects.split(/[?#]/)[0]),
    ),
    { initialValue: this.router.url.split(/[?#]/)[0] },
  );

  // Bandeau masqué sur /contact (CTA "Devenir partenaire" redondante) et sur /actualites (page dédiée aux actus, pas aux partenaires).
  protected readonly onContactPage = computed(() => this.currentPath().startsWith('/contact'));
  protected readonly hidden = computed(() => this.currentPath().startsWith('/actualites'));

  protected readonly section = computed(() => getPartnersSection(this.languageService.lang()));
  protected readonly partners = computed(() => this.section().partners);
  // Un « demi-tour » du défilement = 2 copies de la liste (assez large pour remplir l'écran), affiché 2 fois pour boucler sans saut.
  private readonly half = computed(() => [...this.partners(), ...this.partners()]);
  protected readonly loop = computed(() => [...this.half(), ...this.half()]);

  protected initial(p: Partner): string {
    const n = p.name.trim().match(/\d+$/);
    return n ? n[0] : p.name.trim().charAt(0).toUpperCase();
  }
}
