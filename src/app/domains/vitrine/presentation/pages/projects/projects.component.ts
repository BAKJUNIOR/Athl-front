// Page "Projets" (galerie de réalisations) du site vitrine ATHL.
import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
import { RevealDirective } from '../../components/reveal.directive';
import { CtaBannerComponent } from '../../components/cta-banner/cta-banner.component';
import { LanguageService } from '../../../../../core/services/language.service';
import { getShots } from '../../../infrastructure/data/projects.data';

@Component({
  selector: 'app-projects',
  imports: [RouterLink, RevealDirective, CtaBannerComponent, TranslocoPipe],
  templateUrl: './projects.component.html',
})
export class ProjectsComponent {
  private readonly languageService = inject(LanguageService);

  readonly shots = computed(() => getShots(this.languageService.lang()));
}
