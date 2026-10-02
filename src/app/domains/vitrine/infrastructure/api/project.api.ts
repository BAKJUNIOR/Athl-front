// Appelle l'API Réalisations/Projets d'Athl_logistics-backend.
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

export interface ProjectSummaryApiDto {
  id: number;
  slug: string;
  serviceSlug: string;
  titleFr: string;
  titleEn: string;
  locationFr: string;
  locationEn: string;
  year: string;
  image: string;
  featured: boolean;
  sortOrder: number;
  status: 'draft' | 'published';
}

export interface ProjectDetailApiDto extends ProjectSummaryApiDto {
  typologyFr: string;
  typologyEn: string;
  descriptionFr: string;
  descriptionEn: string;
  gallery: string[];
  updatedAt: string;
}

@Injectable({ providedIn: 'root' })
export class ProjectApi {
  private readonly http = inject(HttpClient);
  private readonly base = environment.apiUrl;

  // Anonyme (site public) : le backend ne renvoie que les projets publiés.
  list(): Observable<ProjectSummaryApiDto[]> {
    return this.http.get<ProjectSummaryApiDto[]>(`${this.base}/${environment.endpoints.projects.list}`);
  }

  getBySlug(slug: string): Observable<ProjectDetailApiDto> {
    return this.http.get<ProjectDetailApiDto>(`${this.base}/${environment.endpoints.projects.bySlug(slug)}`);
  }
}
