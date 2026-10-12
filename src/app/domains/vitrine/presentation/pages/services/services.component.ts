// Page "Services" (liste des 4 prestations) du site vitrine ATHL.
import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
import { RevealDirective } from '../../components/reveal.directive';
import { CtaBannerComponent } from '../../components/cta-banner/cta-banner.component';
import { getServices } from '../../../infrastructure/data/services.data';
import { LanguageService } from '../../../../../core/services/language.service';
import { getPageHeader } from '../../../infrastructure/data/page-headers.data';

@Component({
  selector: 'app-services',
  imports: [RouterLink, RevealDirective, CtaBannerComponent, TranslocoPipe],
  templateUrl: './services.component.html',
})
export class ServicesComponent {
  private readonly languageService = inject(LanguageService);

  // En-tête de page éditable dans le BO ; champ vide -> texte par défaut i18n (voir le template).
  readonly header = computed(() => getPageHeader('services', this.languageService.lang()));

  readonly services = computed(() => getServices(this.languageService.lang()));
}
