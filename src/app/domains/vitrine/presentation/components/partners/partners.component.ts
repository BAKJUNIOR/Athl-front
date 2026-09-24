// Bandeau « Nos partenaires » : deux rangées de logos qui défilent en sens inverse (pause au survol).
import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, map } from 'rxjs';
import { TranslocoPipe } from '@jsverse/transloco';
import { RevealDirective } from '../reveal.directive';
import { PARTNERS, Partner } from '../../../infrastructure/data/partners.data';

@Component({
  selector: 'app-partners',
  imports: [RouterLink, TranslocoPipe, RevealDirective],
  template: `
    @if (!hidden()) {
      <section class="partners" id="partenaires">
        <div class="partners__head" appReveal>
          <div>
            <div class="about-block__eyebrow"><span></span>{{ 'partners.eyebrow' | transloco }}</div>
            <h2>{{ 'partners.title' | transloco }}</h2>
            <p class="lead">{{ 'partners.subtitle' | transloco }}</p>
          </div>
          @if (!onContactPage()) {
            <a class="btn btn--ghost" routerLink="/contact">{{ 'partners.cta' | transloco }}</a>
          }
        </div>

        <div class="marquee" [appReveal]="120">
          <div class="marquee__row">
            <div class="marquee__track">
              @for (p of loop; track $index) {
                <div class="partner" [attr.aria-hidden]="$index >= partners.length ? true : null">
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
          <div class="marquee__row marquee__row--rev">
            <div class="marquee__track">
              @for (p of reversedLoop; track $index) {
                <div class="partner" [attr.aria-hidden]="$index >= partners.length ? true : null">
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

  protected readonly partners: Partner[] = PARTNERS;
  // Un « demi-tour » du défilement = 2 copies de la liste (assez large pour remplir l'écran), affiché 2 fois pour boucler sans saut.
  private readonly half: Partner[] = [...PARTNERS, ...PARTNERS];
  protected readonly loop: Partner[] = [...this.half, ...this.half];
  protected readonly reversedLoop: Partner[] = [...this.half].reverse().concat([...this.half].reverse());

  protected initial(p: Partner): string {
    const n = p.name.trim().match(/\d+$/);
    return n ? n[0] : p.name.trim().charAt(0).toUpperCase();
  }
}
