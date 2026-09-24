// Page de détail d'un service (une route générique /services/:slug pour les 4 prestations).
import { Component, computed, effect, inject } from '@angular/core';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
import { catchError, map, of, switchMap } from 'rxjs';
import { RevealDirective } from '../../components/reveal.directive';
import { CtaBannerComponent } from '../../components/cta-banner/cta-banner.component';
import { nextService, mapServiceDetail } from '../../../infrastructure/data/services.data';
import { ServiceApi, ServiceDetailApi } from '../../../infrastructure/api/service.api';
import { LanguageService } from '../../../../../core/services/language.service';

@Component({
  selector: 'app-service-detail',
  imports: [RouterLink, RevealDirective, CtaBannerComponent, TranslocoPipe],
  templateUrl: './service-detail.component.html',
})
export class ServiceDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly serviceApi = inject(ServiceApi);
  private readonly languageService = inject(LanguageService);

  private readonly slug = toSignal(this.route.paramMap.pipe(map((params) => params.get('slug') ?? '')), {
    initialValue: this.route.snapshot.paramMap.get('slug') ?? '',
  });

  // Un seul appel réseau par slug (pas par changement de langue : on garde la réponse brute
  // bilingue et mapServiceDetail() choisit le bon champ à l'affichage selon la langue active).
  private readonly rawDetail = toSignal(
    toObservable(this.slug).pipe(
      switchMap((slug) =>
        this.serviceApi.getBySlug(slug).pipe(
          map((dto) => ({ dto, notFound: false })),
          catchError(() => of({ dto: null as ServiceDetailApi | null, notFound: true })),
        ),
      ),
    ),
    { initialValue: null },
  );

  readonly loading = computed(() => this.rawDetail() === null);

  readonly service = computed(() => {
    const raw = this.rawDetail();
    return raw?.dto ? mapServiceDetail(raw.dto, this.languageService.lang()) : null;
  });

  readonly next = computed(() => nextService(this.slug(), this.languageService.lang()));

  constructor() {
    // Slug inconnu ou service dépublié : on renvoie vers la liste plutôt que d'afficher une page vide.
    effect(() => {
      const raw = this.rawDetail();
      if (raw?.notFound) {
        this.router.navigate(['/services']);
      }
    });
  }
}
