// Page de détail d'une actualité ATHL (/actualites/:slug).
import { Component, computed, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { TranslocoPipe } from '@jsverse/transloco';
import { catchError, map, of, switchMap } from 'rxjs';
import { RevealDirective } from '../../components/reveal.directive';
import { LanguageService, Lang } from '../../../../../core/services/language.service';
import { NewsApi, NewsDetailApiDto } from '../../../infrastructure/api/news.api';

interface NewsQuoteView {
  text: string;
  name: string;
  role: string;
}

interface NewsDetailView {
  slug: string;
  image: string;
  date: string;
  category: string;
  title: string;
  body: string[];
  quote: NewsQuoteView | null;
  // Republication de CETTE actualité sur nos réseaux, saisie à la main dans le BO (pas les
  // comptes généraux du site, voir SiteContact) — affichés uniquement si renseignés.
  facebookUrl: string | null;
  linkedinUrl: string | null;
  youtubeUrl: string | null;
}

function toView(dto: NewsDetailApiDto, lang: Lang): NewsDetailView {
  const en = lang === 'en';
  const body = (en && dto.bodyEn) || dto.bodyFr;
  const quoteText = (en && dto.quoteTextEn) || dto.quoteTextFr;
  return {
    slug: dto.slug,
    image: dto.image,
    date: dto.date,
    category: (en && dto.categoryEn) || dto.categoryFr,
    title: (en && dto.titleEn) || dto.titleFr,
    body: (body ?? '').split('\n\n').filter((p) => p.trim().length > 0),
    quote: quoteText
      ? {
          text: quoteText,
          name: (en && dto.quoteNameEn) || dto.quoteNameFr,
          role: (en && dto.quoteRoleEn) || dto.quoteRoleFr,
        }
      : null,
    facebookUrl: dto.facebookUrl || null,
    linkedinUrl: dto.linkedinUrl || null,
    youtubeUrl: dto.youtubeUrl || null,
  };
}

@Component({
  selector: 'app-news-detail',
  imports: [RouterLink, RevealDirective, TranslocoPipe],
  templateUrl: './news-detail.component.html',
})
export class NewsDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly newsApi = inject(NewsApi);
  private readonly languageService = inject(LanguageService);

  private readonly slug = toSignal(this.route.paramMap.pipe(map((params) => params.get('slug') ?? '')), {
    initialValue: this.route.snapshot.paramMap.get('slug') ?? '',
  });

  // Un seul appel réseau par slug (pas par changement de langue : on garde la réponse brute
  // bilingue), même principe que project-detail.component.ts.
  private readonly rawDetail = toSignal(
    toObservable(this.slug).pipe(
      switchMap((slug) =>
        this.newsApi.getBySlug(slug).pipe(
          map((dto) => ({ dto, notFound: false })),
          catchError((err: HttpErrorResponse) => of({ dto: null as NewsDetailApiDto | null, notFound: err.status !== 0 })),
        ),
      ),
    ),
    { initialValue: null },
  );

  readonly loading = computed(() => this.rawDetail() === null);

  readonly item = computed(() => {
    const raw = this.rawDetail();
    return raw?.dto ? toView(raw.dto, this.languageService.lang()) : null;
  });

  // www.athl-logistique.com est le domaine final visé, mais son DNS ne pointe pas encore sur ce
  // serveur — site.athl-logistique.com est le domaine réellement en ligne pour l'instant (tests
  // et présentation). À remplacer par www.athl-logistique.com une fois le DNS repointé.
  private readonly siteUrl = 'https://site.athl-logistique.com';

  // Utilisé uniquement par "Copier le lien" — les icônes réseaux (Facebook/LinkedIn/YouTube)
  // pointent désormais directement vers les liens saisis dans le BO pour cette actualité,
  // pas vers une URL de partage générique.
  readonly shareUrl = computed(() => `${this.siteUrl}/actualites/${this.slug()}`);
  readonly copied = signal(false);

  constructor() {
    // Slug inconnu/dépubliée : on renvoie vers la liste plutôt que d'afficher une page vide.
    effect(() => {
      const raw = this.rawDetail();
      if (raw?.notFound) {
        this.router.navigate(['/actualites']);
      }
    });
  }

  formatDate(iso: string): string {
    const locale = this.languageService.lang() === 'en' ? 'en-US' : 'fr-FR';
    return new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(iso));
  }

  copyLink(): void {
    const url = this.shareUrl();
    const flash = () => {
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2200);
    };
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(url).then(flash).catch(flash);
    } else {
      flash();
    }
  }
}
