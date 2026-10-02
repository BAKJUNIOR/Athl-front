// Source de données du domaine "Actualité" (liste /actualites), branchée sur l'API backend.
// Le résumé est chargé une fois au démarrage (voir core/initializers) et mis en cache ici dans
// un signal — même principe que projects.data.ts. Le détail complet d'une actualité (corps,
// citation) n'est pas dans ce résumé : la fiche détail /actualites/:slug le récupère à la demande
// via NewsApi.getBySlug (voir news-detail.component.ts).
//
// Pas de repli sur du contenu figé si l'API est injoignable : contrairement aux Services, une
// actualité est datée et deviendrait vite trompeuse si affichée indéfiniment en repli — voir
// isNewsApiFailed(), qui permet seulement à la page d'afficher un message d'erreur plutôt qu'une
// liste vide silencieuse.
import { signal } from '@angular/core';
import { Lang } from '../../../../core/services/language.service';
import { NewsSummaryApiDto } from '../api/news.api';

export interface NewsSummary {
  slug: string;
  image: string;
  date: string;
  featured: boolean;
  category: string;
  title: string;
  excerpt: string;
}

const NEWS = signal<NewsSummaryApiDto[]>([]);
const NEWS_API_FAILED = signal(false);

export function setNews(list: NewsSummaryApiDto[], apiFailed = false): void {
  NEWS.set(list ?? []);
  NEWS_API_FAILED.set(apiFailed);
}

function toSummary(dto: NewsSummaryApiDto, lang: Lang): NewsSummary {
  const en = lang === 'en';
  return {
    slug: dto.slug,
    image: dto.image,
    date: dto.date,
    featured: dto.featured,
    category: (en && dto.categoryEn) || dto.categoryFr,
    title: (en && dto.titleEn) || dto.titleFr,
    excerpt: (en && dto.excerptEn) || dto.excerptFr,
  };
}

export function getNews(lang: Lang): NewsSummary[] {
  return [...NEWS()]
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .map((dto) => toSummary(dto, lang));
}

export function getNewsCategories(lang: Lang): string[] {
  return Array.from(new Set(getNews(lang).map((n) => n.category)));
}

/** true si l'API actualités est injoignable/en erreur (voir core/initializers) — permet à la
 *  page de distinguer "aucune actualité publiée" (état normal) d'une vraie panne. */
export function isNewsApiFailed(): boolean {
  return NEWS_API_FAILED();
}
