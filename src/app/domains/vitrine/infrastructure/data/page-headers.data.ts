// En-têtes (surtitre, titre, texte) des pages de liste, édités dans le BO (« En-têtes des pages »).
// Chargés une fois au démarrage (voir core/initializers) et mis en cache dans un signal.
// Chaque champ est optionnel : vide ou API injoignable -> la page affiche son texte par défaut
// de public/i18n (voir les templates : `header().title || ('xxx.title' | transloco)`).
import { signal } from '@angular/core';
import { PageHeaderApiDto } from '../api/page-header.api';
import { Lang } from '../../../../core/services/language.service';

export type PageHeaderKey = 'services' | 'projects' | 'news' | 'team' | 'careers' | 'quote' | 'search';

export interface PageHeader {
  eyebrow: string;
  title: string;
  subtitle: string;
}

const PAGE_HEADERS = signal<PageHeaderApiDto[]>([]);

export function setPageHeaders(list: PageHeaderApiDto[] | null): void {
  PAGE_HEADERS.set(list ?? []);
}

export function getPageHeader(key: PageHeaderKey, lang: Lang): PageHeader {
  const dto = PAGE_HEADERS().find((h) => h.pageKey === key);
  const en = lang === 'en';
  return {
    eyebrow: ((en && dto?.eyebrowEn) || dto?.eyebrowFr || '').trim(),
    title: ((en && dto?.titleEn) || dto?.titleFr || '').trim(),
    subtitle: ((en && dto?.subtitleEn) || dto?.subtitleFr || '').trim(),
  };
}
