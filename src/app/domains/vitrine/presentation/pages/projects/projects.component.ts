// Page "Projets" (galerie de réalisations) du site vitrine ATHL.
// MOCK temporaire : données en dur (voir infrastructure/data/projects-mock.data.ts), pas d'appel
// API pour l'instant — à revoir une fois la vue validée (voir discussion tables projects/services).
import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
import { RevealDirective } from '../../components/reveal.directive';
import { CtaBannerComponent } from '../../components/cta-banner/cta-banner.component';
import { LanguageService } from '../../../../../core/services/language.service';
import { getMockProjectServices, getMockProjectsByService, ProjectItemView } from '../../../infrastructure/data/projects-mock.data';

@Component({
  selector: 'app-projects',
  imports: [RouterLink, RevealDirective, CtaBannerComponent, TranslocoPipe],
  templateUrl: './projects.component.html',
})
export class ProjectsComponent {
  private readonly languageService = inject(LanguageService);

  readonly services = computed(() => getMockProjectServices(this.languageService.lang()));
  readonly activeService = signal<string>('');

  constructor() {
    // Service actif par défaut = le premier (Construction & rénovation).
    const list = this.services();
    if (list.length) this.activeService.set(list[0].slug);
  }

  readonly projects = computed(() => getMockProjectsByService(this.activeService(), this.languageService.lang()));

  // Regroupe les projets par 3 pour le motif de grille (2 vignettes empilées + 1 grande à droite).
  readonly rows = computed(() => {
    const list = this.projects();
    const chunks: ProjectItemView[][] = [];
    for (let i = 0; i < list.length; i += 3) chunks.push(list.slice(i, i + 3));
    return chunks;
  });

  selectService(slug: string): void {
    this.activeService.set(slug);
  }
}
