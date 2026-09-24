// Carrousel de témoignages (2 cartes visibles, défilement circulaire) affiché sur la page d'accueil.
import { Component, computed, inject, signal } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { getTestimonials } from '../../../infrastructure/data/testimonials.data';
import { LanguageService } from '../../../../../core/services/language.service';
import { RevealDirective } from '../reveal.directive';

@Component({
  selector: 'app-testimonial-carousel',
  imports: [RevealDirective, TranslocoPipe],
  template: `
    <div class="quotes__head" appReveal>
      <h2>{{ 'home.testimonials.title' | transloco }}</h2>
      <div class="arrows">
        <button class="arrow" type="button" [attr.aria-label]="'home.testimonials.previous' | transloco" (click)="previous()">&larr;</button>
        <button class="arrow arrow--solid" type="button" [attr.aria-label]="'home.testimonials.next' | transloco" (click)="next()">&rarr;</button>
      </div>
    </div>

    <div class="quote-grid">
      @for (quote of visible(); track quote.name) {
        <article class="quote">
          <div class="quote__media"><img [src]="quote.photo" alt="" loading="lazy" /></div>
          <div class="quote__body">
            <p class="quote__text">{{ quote.text }}</p>
            <div class="quote__who">
              <div class="quote__avatar" aria-hidden="true">{{ quote.initials }}</div>
              <div>
                <div class="quote__name">{{ quote.name }}</div>
                <div class="quote__role">{{ quote.role }}</div>
              </div>
            </div>
          </div>
        </article>
      }
    </div>
  `,
  host: { class: 'quotes' },
})
export class TestimonialCarouselComponent {
  private readonly languageService = inject(LanguageService);
  private readonly quotes = computed(() => getTestimonials(this.languageService.lang()));
  private readonly index = signal(0);

  readonly visible = computed(() => {
    const list = this.quotes();
    const i = this.index();
    return [list[i % list.length], list[(i + 1) % list.length]];
  });

  previous(): void {
    const length = this.quotes().length;
    this.index.update((i) => (i - 1 + length) % length);
  }

  next(): void {
    this.index.update((i) => (i + 1) % this.quotes().length);
  }
}
