// Bandeau "Besoin de conseils ou d'un devis ?" réutilisé en bas de la plupart des pages du site vitrine.
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cta-banner',
  template: `
    <div>
      <h2>{{ title }}</h2>
      @if (text) {
        <p>{{ text }}</p>
      }
      @if (showPhones) {
        <div class="phones">
          <a href="tel:+2250778095858">+225 07 78 09 58 58</a>
          <a href="tel:+2250709993347">+225 07 09 99 33 47</a>
          <a href="tel:+2250758601627">+225 07 58 60 16 27</a>
        </div>
      }
      @if (showActions) {
        <div class="cta__actions">
          <ng-content />
        </div>
      }
    </div>
    <div class="cta__media">
      <img [src]="mediaImage" [alt]="mediaAlt" loading="lazy" />
    </div>
  `,
  host: { class: 'cta' },
})
export class CtaBannerComponent {
  @Input({ required: true }) title!: string;
  @Input() text = '';
  @Input() showPhones = false;
  @Input() showActions = true;
  @Input() mediaImage = 'images/proj-4.png';
  @Input() mediaAlt = 'Réalisation ATHL';
}
