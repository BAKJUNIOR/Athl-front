// Bandeau "Besoin de conseils ou d'un devis ?" réutilisé en bas de la plupart des pages du site vitrine.
import { Component, Input, computed, inject } from '@angular/core';
import { getSiteContact } from '../../../infrastructure/data/site-contact.data';
import { LanguageService } from '../../../../../core/services/language.service';

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
          @if (contact().phone1) { <a [href]="telHref(contact().phone1)">{{ contact().phone1 }}</a> }
          @if (contact().phone2) { <a [href]="telHref(contact().phone2)">{{ contact().phone2 }}</a> }
          @if (contact().phone3) { <a [href]="telHref(contact().phone3)">{{ contact().phone3 }}</a> }
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
  private readonly languageService = inject(LanguageService);
  protected readonly contact = computed(() => getSiteContact(this.languageService.lang()));

  @Input({ required: true }) title!: string;
  @Input() text = '';
  @Input() showPhones = false;
  @Input() showActions = true;
  @Input() mediaImage = 'images/proj-4.png';
  @Input() mediaAlt = 'Réalisation ATHL';

  protected telHref(phone: string): string {
    return `tel:${phone.replace(/\s+/g, '')}`;
  }
}
