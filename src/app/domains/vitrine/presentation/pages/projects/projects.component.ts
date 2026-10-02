// Page "Projets" (galerie de réalisations, groupée par métier) du site vitrine ATHL.
import { Component, computed, effect, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
import { RevealDirective } from '../../components/reveal.directive';
import { CtaBannerComponent } from '../../components/cta-banner/cta-banner.component';
import { LanguageService } from '../../../../../core/services/language.service';
import { getProjectsByService, ProjectSummary } from '../../../infrastructure/data/projects.data';
import { getServices } from '../../../infrastructure/data/services.data';

@Component({
  selector: 'app-projects',
  imports: [RouterLink, RevealDirective, CtaBannerComponent, TranslocoPipe],
  templateUrl: './projects.component.html',
})
export class ProjectsComponent {
  private readonly languageService = inject(LanguageService);

  // Les 3 métiers réels (voir /api/v1/services), pas seulement ceux qui ont déjà un projet
  // publié : un onglet vide affiche "projects.empty" plutôt que de disparaître. Nom complet
  // (pas shortTitle), pour matcher le sélecteur "Métier" du formulaire Projet côté BO.
  readonly services = computed(() =>
    getServices(this.languageService.lang()).map((s) => ({ slug: s.slug, title: s.title })),
  );
  readonly activeService = signal<string>('');

  constructor() {
    effect(() => {
      const list = this.services();
      if (list.length && !list.some((s) => s.slug === this.activeService())) {
        this.activeService.set(list[0].slug);
      }
    });
  }

  readonly projects = computed(() => getProjectsByService(this.activeService(), this.languageService.lang()));

  // Regroupe les projets par 3 pour le motif de grille (2 vignettes empilées + 1 grande à droite).
  readonly rows = computed(() => {
    const list = this.projects();
    const chunks: ProjectSummary[][] = [];
    for (let i = 0; i < list.length; i += 3) chunks.push(list.slice(i, i + 3));
    return chunks;
  });

  selectService(slug: string): void {
    this.activeService.set(slug);
  }
}
