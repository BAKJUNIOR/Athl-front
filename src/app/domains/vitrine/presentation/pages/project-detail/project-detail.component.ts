// Fiche détail d'un projet (/projets/:slug). MOCK temporaire, voir projects.component.ts.
import { Component, computed, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslocoPipe } from '@jsverse/transloco';
import { map } from 'rxjs';
import { RevealDirective } from '../../components/reveal.directive';
import { LanguageService } from '../../../../../core/services/language.service';
import { getMockProjectBySlug, getMockProjectsByService } from '../../../infrastructure/data/projects-mock.data';

@Component({
  selector: 'app-project-detail',
  imports: [RouterLink, RevealDirective, TranslocoPipe],
  templateUrl: './project-detail.component.html',
})
export class ProjectDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly languageService = inject(LanguageService);

  private readonly slug = toSignal(this.route.paramMap.pipe(map((params) => params.get('slug') ?? '')), {
    initialValue: this.route.snapshot.paramMap.get('slug') ?? '',
  });

  readonly project = computed(() => getMockProjectBySlug(this.slug(), this.languageService.lang()));

  readonly others = computed(() => {
    const p = this.project();
    if (!p) return [];
    return getMockProjectsByService(p.serviceSlug, this.languageService.lang()).filter((o) => o.slug !== p.slug);
  });

  // ── Carrousel hero ──
  readonly activeImage = signal(0);
  readonly heroImage = computed(() => {
    const p = this.project();
    if (!p) return '';
    return p.images[this.activeImage() % p.images.length];
  });

  previousImage(): void {
    const p = this.project();
    if (!p) return;
    this.activeImage.update((i) => (i - 1 + p.images.length) % p.images.length);
  }

  nextImage(): void {
    const p = this.project();
    if (!p) return;
    this.activeImage.update((i) => (i + 1) % p.images.length);
  }

  // ── Carrousel "Autres projets" (3 visibles) ──
  readonly othersIndex = signal(0);
  readonly visibleOthers = computed(() => {
    const list = this.others();
    if (!list.length) return [];
    const i = this.othersIndex();
    return [0, 1, 2].map((offset) => list[(i + offset) % list.length]);
  });

  previousOthers(): void {
    const length = this.others().length;
    if (!length) return;
    this.othersIndex.update((i) => (i - 1 + length) % length);
  }

  nextOthers(): void {
    const length = this.others().length;
    if (!length) return;
    this.othersIndex.update((i) => (i + 1) % length);
  }

  constructor() {
    // Slug inconnu : on renvoie vers la liste plutôt que d'afficher une fiche vide.
    effect(() => {
      if (this.slug() && !this.project()) {
        this.router.navigate(['/projets']);
      }
    });

    // Changement de slug : repartir de la première image du carrousel.
    effect(() => {
      this.slug();
      this.activeImage.set(0);
      this.othersIndex.set(0);
    });
  }
}
