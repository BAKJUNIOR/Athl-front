// Fiche détail d'un projet (/projets/:slug).
import { Component, computed, effect, HostListener, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { TranslocoPipe } from '@jsverse/transloco';
import { catchError, map, of, switchMap } from 'rxjs';
import { RevealDirective } from '../../components/reveal.directive';
import { LanguageService, Lang } from '../../../../../core/services/language.service';
import { ProjectApi, ProjectDetailApiDto } from '../../../infrastructure/api/project.api';
import { getProjectsByService, ProjectSummary } from '../../../infrastructure/data/projects.data';

interface ProjectDetailView {
  slug: string;
  serviceSlug: string;
  title: string;
  location: string;
  typology: string;
  year: string;
  images: string[];
  description: [string, string];
}

function splitDescription(text: string): [string, string] {
  const parts = (text ?? '').split('\n\n');
  return [parts[0] ?? '', parts[1] ?? ''];
}

function toView(dto: ProjectDetailApiDto, lang: Lang): ProjectDetailView {
  const en = lang === 'en';
  const images = dto.gallery?.length ? dto.gallery : [dto.image];
  return {
    slug: dto.slug,
    serviceSlug: dto.serviceSlug,
    title: (en && dto.titleEn) || dto.titleFr,
    location: (en && dto.locationEn) || dto.locationFr,
    typology: (en && dto.typologyEn) || dto.typologyFr,
    year: dto.year,
    images,
    description: splitDescription((en && dto.descriptionEn) || dto.descriptionFr),
  };
}

@Component({
  selector: 'app-project-detail',
  imports: [RouterLink, RevealDirective, TranslocoPipe],
  templateUrl: './project-detail.component.html',
})
export class ProjectDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly projectApi = inject(ProjectApi);
  private readonly languageService = inject(LanguageService);

  private readonly slug = toSignal(this.route.paramMap.pipe(map((params) => params.get('slug') ?? '')), {
    initialValue: this.route.snapshot.paramMap.get('slug') ?? '',
  });

  // Un seul appel réseau par slug (pas par changement de langue : on garde la réponse brute
  // bilingue, comme service-detail.component.ts).
  private readonly rawDetail = toSignal(
    toObservable(this.slug).pipe(
      switchMap((slug) =>
        this.projectApi.getBySlug(slug).pipe(
          map((dto) => ({ dto, notFound: false })),
          catchError((err: HttpErrorResponse) => of({ dto: null as ProjectDetailApiDto | null, notFound: err.status !== 0 })),
        ),
      ),
    ),
    { initialValue: null },
  );

  readonly loading = computed(() => this.rawDetail() === null);

  readonly project = computed(() => {
    const raw = this.rawDetail();
    return raw?.dto ? toView(raw.dto, this.languageService.lang()) : null;
  });

  readonly others = computed((): ProjectSummary[] => {
    const p = this.project();
    if (!p) return [];
    return getProjectsByService(p.serviceSlug, this.languageService.lang()).filter((o) => o.slug !== p.slug);
  });

  // ── Carrousel hero ──
  readonly activeImage = signal(0);
  readonly heroImage = computed(() => {
    const p = this.project();
    if (!p || !p.images.length) return '';
    return p.images[this.activeImage() % p.images.length];
  });

  // ── Agrandissement plein écran (clic sur la photo) ──
  readonly lightboxOpen = signal(false);

  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if (!this.lightboxOpen()) return;
    if (event.key === 'Escape') this.lightboxOpen.set(false);
    else if (event.key === 'ArrowLeft') this.previousImage();
    else if (event.key === 'ArrowRight') this.nextImage();
  }

  previousImage(): void {
    const p = this.project();
    if (!p || !p.images.length) return;
    this.activeImage.update((i) => (i - 1 + p.images.length) % p.images.length);
  }

  nextImage(): void {
    const p = this.project();
    if (!p || !p.images.length) return;
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
    // Slug inconnu/dépublié : on renvoie vers la liste plutôt que d'afficher une fiche vide.
    effect(() => {
      const raw = this.rawDetail();
      if (raw?.notFound) {
        this.router.navigate(['/projets']);
      }
    });

    // Changement de slug : repartir de la première image du carrousel.
    effect(() => {
      this.slug();
      this.activeImage.set(0);
      this.othersIndex.set(0);
      this.lightboxOpen.set(false);
    });
  }
}
