// Source de données du domaine "Project" (galerie /projets, groupée par métier), branchée sur
// l'API backend. Le résumé est chargé une fois au démarrage (voir core/initializers) et mis en
// cache ici dans un signal. Le détail complet d'un projet (description, galerie, typologie)
// n'est en revanche pas dans ce résumé : la page /projets/:slug le récupère à la demande via
// ProjectApi.getBySlug (voir project-detail.component.ts).
import { signal } from '@angular/core';
import { Lang } from '../../../../core/services/language.service';
import { ProjectSummaryApiDto } from '../api/project.api';

export interface Shot {
  image: string;
  alt: string;
  title: string;
  caption: string;
  wide?: boolean;
}

export interface ProjectSummary {
  slug: string;
  serviceSlug: string;
  title: string;
  location: string;
  year: string;
  thumbnail: string;
}

const PROJECTS = signal<ProjectSummaryApiDto[]>([]);
const PROJECTS_API_FAILED = signal(false);

export function setProjects(list: ProjectSummaryApiDto[], apiFailed = false): void {
  PROJECTS.set(list ?? []);
  PROJECTS_API_FAILED.set(apiFailed);
}

/** Image du projet marqué "à la une" dans le BO — utilisée pour la vignette globale du bloc
 * "Bienvenue chez ATHL" (accueil et À propos). Repli sur le premier projet publié si aucun
 * n'est marqué à la une, undefined si la galerie est vide. */
export function getFeaturedProjectImage(): string | undefined {
  const list = PROJECTS();
  return (list.find((p) => p.featured) ?? list[0])?.image;
}

/** Mosaïque "Nos réalisations" de l'accueil : UNIQUEMENT les projets marqués "à la une" dans
 *  le BO (featured=true), triés par ordre d'affichage. Vide si aucun n'est coché — pas de repli
 *  sur du contenu inventé, voir home.component.html qui masque toute la section dans ce cas. */
export function getFeaturedShots(lang: Lang): Shot[] {
  const en = lang === 'en';
  return [...PROJECTS()]
    .filter((dto) => dto.featured)
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((dto) => {
      const title = (en && dto.titleEn) || dto.titleFr;
      return {
        image: dto.image,
        alt: title,
        title,
        caption: (en && dto.locationEn) || dto.locationFr,
      };
    });
}

export function getProjectsByService(serviceSlug: string, lang: Lang): ProjectSummary[] {
  const en = lang === 'en';
  return [...PROJECTS()]
    .filter((dto) => dto.serviceSlug === serviceSlug)
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((dto) => ({
      slug: dto.slug,
      serviceSlug: dto.serviceSlug,
      title: (en && dto.titleEn) || dto.titleFr,
      location: (en && dto.locationEn) || dto.locationFr,
      year: dto.year,
      thumbnail: dto.image,
    }));
}

/** true si l'API projets est injoignable/en erreur (voir core/initializers) — permet aux pages
 * de distinguer "aucun projet publié" (état normal) d'une vraie panne. */
export function isProjectsApiFailed(): boolean {
  return PROJECTS_API_FAILED();
}
