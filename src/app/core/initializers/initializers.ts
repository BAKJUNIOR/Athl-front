import { inject } from '@angular/core';
import { catchError, firstValueFrom, of } from 'rxjs';
import { ServiceApi, ServiceSummaryApi } from '../../domains/vitrine/infrastructure/api/service.api';
import { setServiceSummaries } from '../../domains/vitrine/infrastructure/data/services.data';
import { JobApi, JobOfferApi } from '../../domains/vitrine/infrastructure/api/job.api';
import { JobDomainApi, JobDomainDto } from '../../domains/vitrine/infrastructure/api/job-domain.api';
import { setJobDomains, setJobOffers } from '../../domains/vitrine/infrastructure/data/jobs.data';
import { TeamApi, TeamMemberApi } from '../../domains/vitrine/infrastructure/api/team.api';
import { setTeamMembers } from '../../domains/vitrine/infrastructure/data/team.data';
import { ProjectApi, ProjectApiDto } from '../../domains/vitrine/infrastructure/api/project.api';
import { setProjects } from '../../domains/vitrine/infrastructure/data/projects.data';
import { HomeStatsApi, HomeStatApiDto } from '../../domains/vitrine/infrastructure/api/home-stats.api';
import { setHomeStats } from '../../domains/vitrine/infrastructure/data/home-stats.data';
import { SiteContactApi, SiteContactApiDto } from '../../domains/vitrine/infrastructure/api/site-contact.api';
import { setSiteContact } from '../../domains/vitrine/infrastructure/data/site-contact.data';
import { PopupApi, PopupApiDto } from '../../domains/vitrine/infrastructure/api/popup.api';
import { setPopups } from '../../domains/vitrine/infrastructure/data/popups.data';
import { AnalyticsService } from '../services/analytics.service';


export function initializeServiceCatalog(): Promise<void> {
  const api = inject(ServiceApi);
  return firstValueFrom(api.list().pipe(catchError(() => of([] as ServiceSummaryApi[])))).then((list) => {
    setServiceSummaries(list);
  });
}

/** Même principe que initializeServiceCatalog(), pour les offres d'emploi (page Carrières). */
export function initializeJobCatalog(): Promise<void> {
  const api = inject(JobApi);
  return firstValueFrom(api.list().pipe(catchError(() => of([] as JobOfferApi[])))).then((list) => {
    setJobOffers(list);
  });
}


export function initializeJobDomainCatalog(): Promise<void> {
  const api = inject(JobDomainApi);
  return firstValueFrom(api.list().pipe(catchError(() => of([] as JobDomainDto[])))).then((list) => {
    setJobDomains(list);
  });
}

/** Même principe, pour l'équipe dirigeante (page Équipe). */
export function initializeTeamCatalog(): Promise<void> {
  const api = inject(TeamApi);
  return firstValueFrom(api.list().pipe(catchError(() => of([] as TeamMemberApi[])))).then((list) => {
    setTeamMembers(list);
  });
}

/** Même principe, pour la galerie de réalisations (page Projets). */
export function initializeProjectCatalog(): Promise<void> {
  const api = inject(ProjectApi);
  return firstValueFrom(api.list().pipe(catchError(() => of([] as ProjectApiDto[])))).then((list) => {
    setProjects(list);
  });
}

/** Même principe, pour les 3 compteurs animés (accueil, À propos, Équipe). */
export function initializeHomeStatsCatalog(): Promise<void> {
  const api = inject(HomeStatsApi);
  return firstValueFrom(api.list().pipe(catchError(() => of([] as HomeStatApiDto[])))).then((list) => {
    setHomeStats(list);
  });
}

/** Même principe, pour les coordonnées du site (footer, page Contact). */
export function initializeSiteContactCatalog(): Promise<void> {
  const api = inject(SiteContactApi);
  return firstValueFrom(api.get().pipe(catchError(() => of(null as SiteContactApiDto | null)))).then((contact) => {
    setSiteContact(contact);
  });
}

/** Même principe, pour les popups marketing (une par page). */
export function initializePopupCatalog(): Promise<void> {
  const api = inject(PopupApi);
  return firstValueFrom(api.list().pipe(catchError(() => of([] as PopupApiDto[])))).then((list) => {
    setPopups(list);
  });
}

/** Démarre le suivi Google Analytics (no-op si environment.googleAnalyticsId est vide, voir AnalyticsService). */
export function initializeAnalytics(): void {
  inject(AnalyticsService).init();
}
