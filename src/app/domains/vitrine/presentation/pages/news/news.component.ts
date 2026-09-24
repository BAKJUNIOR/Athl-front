// Page "Actualités" du site vitrine ATHL.
import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
import { RevealDirective } from '../../components/reveal.directive';
import { CtaBannerComponent } from '../../components/cta-banner/cta-banner.component';
import { getNews, getNewsCategories } from '../../../infrastructure/data/news.data';
import { LanguageService } from '../../../../../core/services/language.service';

const PAGE_SIZE = 4;

@Component({
  selector: 'app-news',
  imports: [RouterLink, RevealDirective, CtaBannerComponent, TranslocoPipe],
  templateUrl: './news.component.html',
})
export class NewsComponent {
  private readonly languageService = inject(LanguageService);

  readonly allNews = computed(() => getNews(this.languageService.lang()));
  readonly categories = computed(() => getNewsCategories(this.languageService.lang()));

  readonly featured = computed(() => this.allNews().filter((n) => n.featured).slice(0, 2));

  readonly selectedCategories = signal<string[]>([]);
  readonly filterOpen = signal(false);
  readonly visibleCount = signal(PAGE_SIZE);

  readonly rest = computed(() => {
    const featuredSlugs = new Set(this.featured().map((n) => n.slug));
    const selected = this.selectedCategories();
    return this.allNews()
      .filter((n) => !featuredSlugs.has(n.slug))
      .filter((n) => !selected.length || selected.includes(n.category));
  });

  readonly visibleRest = computed(() => this.rest().slice(0, this.visibleCount()));
  readonly hasMore = computed(() => this.visibleCount() < this.rest().length);

  toggleFilter(): void {
    this.filterOpen.update((v) => !v);
  }

  toggleCategory(category: string): void {
    this.selectedCategories.update((list) => (list.includes(category) ? list.filter((c) => c !== category) : [...list, category]));
    this.visibleCount.set(PAGE_SIZE);
  }

  clearFilters(): void {
    this.selectedCategories.set([]);
    this.visibleCount.set(PAGE_SIZE);
  }

  showMore(): void {
    this.visibleCount.set(this.rest().length);
  }

  formatDate(iso: string): string {
    const locale = this.languageService.lang() === 'en' ? 'en-US' : 'fr-FR';
    return new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(iso));
  }
}
