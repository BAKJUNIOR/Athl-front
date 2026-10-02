// Appelle l'API Actualités d'Athl_logistics-backend.
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

export interface NewsSummaryApiDto {
  id: number;
  slug: string;
  image: string;
  date: string;
  featured: boolean;
  categoryFr: string;
  categoryEn: string;
  titleFr: string;
  titleEn: string;
  excerptFr: string;
  excerptEn: string;
  status: 'draft' | 'published';
}

export interface NewsDetailApiDto extends NewsSummaryApiDto {
  bodyFr: string;
  bodyEn: string;
  quoteTextFr: string;
  quoteTextEn: string;
  quoteNameFr: string;
  quoteNameEn: string;
  quoteRoleFr: string;
  quoteRoleEn: string;
  facebookUrl: string | null;
  linkedinUrl: string | null;
  youtubeUrl: string | null;
  updatedAt: string;
}

@Injectable({ providedIn: 'root' })
export class NewsApi {
  private readonly http = inject(HttpClient);
  private readonly base = environment.apiUrl;

  // Anonyme (site public) : le backend ne renvoie que les actualités publiées.
  list(): Observable<NewsSummaryApiDto[]> {
    return this.http.get<NewsSummaryApiDto[]>(`${this.base}/${environment.endpoints.news.list}`);
  }

  getBySlug(slug: string): Observable<NewsDetailApiDto> {
    return this.http.get<NewsDetailApiDto>(`${this.base}/${environment.endpoints.news.bySlug(slug)}`);
  }
}
