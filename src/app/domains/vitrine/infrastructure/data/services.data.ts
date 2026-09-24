// Source de données du domaine "Service", branchée sur l'API Athl_logistics-backend.
// La liste résumée est chargée une fois au démarrage (voir core/initializers) et mise en cache
// ici dans un signal : getServices()/nextService() restent synchrones pour ne pas changer les
// pages qui les consomment déjà (accueil, page Services, recherche). Le détail complet d'un
// service (prestations, étapes, galerie) n'est en revanche pas dans ce résumé : la page
// /services/:slug le récupère à la demande via ServiceApi.getBySlug (voir service-detail.component.ts).
import { signal } from '@angular/core';
import { Service } from '../../domain/service.entity';
import { Lang } from '../../../../core/services/language.service';
import { ServiceApi, ServiceDetailApi, ServiceSummaryApi } from '../api/service.api';

const SUMMARIES = signal<ServiceSummaryApi[]>([]);

/** Appelé une seule fois au démarrage de l'app (voir core/initializers/initializers.ts). */
export function loadServices(api: ServiceApi) {
  return api.list();
}

export function setServiceSummaries(list: ServiceSummaryApi[]): void {
  SUMMARIES.set(list ?? []);
}

function summaryToService(dto: ServiceSummaryApi, lang: Lang): Service {
  const en = lang === 'en';
  return {
    slug: dto.slug,
    number: dto.number,
    title: (en && dto.titleEn) || dto.titleFr,
    shortTitle: (en && dto.shortTitleEn) || dto.shortTitleFr || dto.titleFr,
    lead: (en && dto.leadEn) || dto.leadFr,
    image: dto.image ?? '',
    // Non fournis par le résumé — seule la page détail les a réellement besoin (voir plus haut).
    heroImage: dto.image ?? '',
    prestations: [],
    process: [],
    gallery: [],
  };
}

export function mapServiceDetail(dto: ServiceDetailApi, lang: Lang): Service {
  const en = lang === 'en';
  return {
    slug: dto.slug,
    number: dto.number,
    title: (en && dto.titleEn) || dto.titleFr,
    shortTitle: (en && dto.shortTitleEn) || dto.shortTitleFr || dto.titleFr,
    lead: (en && dto.leadEn) || dto.leadFr,
    image: dto.image ?? '',
    heroImage: dto.heroImage ?? dto.image ?? '',
    prestations: dto.prestations.map((p) => ({
      title: (en && p.titleEn) || p.titleFr,
      description: (en && p.descriptionEn) || p.descriptionFr,
    })),
    process: dto.process.map((s) => ({
      number: s.number,
      title: (en && s.titleEn) || s.titleFr,
      description: (en && s.descriptionEn) || s.descriptionFr,
    })),
    gallery: dto.gallery ?? [],
  };
}

export function getServices(lang: Lang): Service[] {
  return SUMMARIES().map((dto) => summaryToService(dto, lang));
}

export function nextService(slug: string, lang: Lang): Service {
  const services = getServices(lang);
  const index = services.findIndex((service) => service.slug === slug);
  return services[(index + 1) % services.length];
}
