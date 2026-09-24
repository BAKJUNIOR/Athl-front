// Page "Recherche" : recherche interne simple sur le contenu du site (pages, services, équipe, emplois).
import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
import { getSearchIndex } from '../../../infrastructure/data/search-index.data';
import { SearchCategory } from '../../../domain/search-result.entity';
import { normalizeText } from '../../../../../core/utils/text.util';
import { LanguageService } from '../../../../../core/services/language.service';

@Component({
  selector: 'app-search',
  imports: [RouterLink, TranslocoPipe],
  templateUrl: './search.component.html',
})
export class SearchComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly languageService = inject(LanguageService);

  readonly query = signal(this.route.snapshot.queryParamMap.get('q') ?? '');

  private readonly index = computed(() => getSearchIndex(this.languageService.lang()));

  readonly results = computed(() => {
    const q = normalizeText(this.query().trim());
    if (!q) return [];
    return this.index().filter((entry) => normalizeText(`${entry.title} ${entry.excerpt}`).includes(q));
  });

  readonly resultsByCategory = computed(() => {
    const groups = new Map<SearchCategory, ReturnType<typeof this.results>>();
    for (const result of this.results()) {
      const bucket = groups.get(result.category) ?? [];
      bucket.push(result);
      groups.set(result.category, bucket);
    }
    return Array.from(groups.entries()).map(([category, items]) => ({ category, items }));
  });

  readonly countKey = computed(() => (this.results().length > 1 ? 'search.resultsPlural' : 'search.resultsSingular'));

  clear(): void {
    this.query.set('');
  }
}
