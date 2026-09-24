// Source de données du domaine "Project" (galerie /projets), branchée sur l'API backend.
// Chargée une fois au démarrage (voir core/initializers) et mise en cache dans un signal.
import { signal } from '@angular/core';
import { Lang } from '../../../../core/services/language.service';
import { ProjectApiDto } from '../api/project.api';

export interface Shot {
  image: string;
  alt: string;
  title: string;
  caption: string;
  wide?: boolean;
}

const PROJECTS = signal<ProjectApiDto[]>([]);

export function setProjects(list: ProjectApiDto[]): void {
  PROJECTS.set(list ?? []);
}

export function getShots(lang: Lang): Shot[] {
  const en = lang === 'en';
  return PROJECTS().map((dto) => {
    const title = (en && dto.titleEn) || dto.titleFr;
    return {
      image: dto.image,
      alt: title,
      title,
      caption: (en && dto.captionEn) || dto.captionFr,
      wide: dto.wide,
    };
  });
}
