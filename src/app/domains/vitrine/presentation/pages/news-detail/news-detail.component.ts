// Page de détail d'une actualité ATHL (/actualites/:slug).
import { Component, computed, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslocoPipe } from '@jsverse/transloco';
import { map } from 'rxjs';
import { RevealDirective } from '../../components/reveal.directive';
import { getNewsBySlug } from '../../../infrastructure/data/news.data';
import { LanguageService } from '../../../../../core/services/language.service';

@Component({
  selector: 'app-news-detail',
  imports: [RouterLink, RevealDirective, TranslocoPipe],
  templateUrl: './news-detail.component.html',
})
export class NewsDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly languageService = inject(LanguageService);

  private readonly slug = toSignal(this.route.paramMap.pipe(map((params) => params.get('slug') ?? '')), {
    initialValue: this.route.snapshot.paramMap.get('slug') ?? '',
  });

  readonly item = computed(() => getNewsBySlug(this.slug(), this.languageService.lang()));

  private readonly siteUrl = 'https://site.athl-logistique.com';

  readonly shareUrl = computed(() => `${this.siteUrl}/actualites/${this.slug()}`);
  readonly copied = signal(false);

  readonly whatsappUrl = computed(() => `https://wa.me/?text=${encodeURIComponent(`${this.item()?.title ?? ''} — ${this.shareUrl()}`)}`);
  readonly facebookUrl = computed(() => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(this.shareUrl())}`);
  readonly linkedinUrl = computed(() => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(this.shareUrl())}`);
  readonly xUrl = computed(
    () => `https://twitter.com/intent/tweet?text=${encodeURIComponent(this.item()?.title ?? '')}&url=${encodeURIComponent(this.shareUrl())}`,
  );

  constructor() {
    // Slug inconnu : on renvoie vers la liste plutôt que d'afficher une page vide.
    effect(() => {
      if (this.slug() && !this.item()) {
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
