// Appelle l'API Réalisations/Projets d'Athl_logistics-backend.
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

export interface ProjectApiDto {
  id: number;
  titleFr: string;
  titleEn: string;
  captionFr: string;
  captionEn: string;
  image: string;
  featured: boolean;
  wide: boolean;
  status: 'draft' | 'published';
  updatedAt: string;
}

@Injectable({ providedIn: 'root' })
export class ProjectApi {
  private readonly http = inject(HttpClient);
  private readonly base = environment.apiUrl;

  // Anonyme (site public) : le backend ne renvoie que les projets publiés.
  list(): Observable<ProjectApiDto[]> {
    return this.http.get<ProjectApiDto[]>(`${this.base}/${environment.endpoints.projects.list}`);
  }
}
