import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

export interface JobBulletApi {
  fr: string;
  en: string;
}

export interface JobDomainApi {
  id: number;
  labelFr: string;
  labelEn: string;
}

export interface JobOfferApi {
  id: number;
  domain: JobDomainApi;
  titleFr: string;
  titleEn: string;
  descriptionFr: string;
  descriptionEn: string;
  metaFr: string;
  metaEn: string;
  publishedAt: string | null;
  deadline: string;
  missions: JobBulletApi[];
  profile: JobBulletApi[];
  contactPhone: string;
  status: 'draft' | 'published';
  updatedAt: string;
}

@Injectable({ providedIn: 'root' })
export class JobApi {
  private readonly http = inject(HttpClient);
  private readonly base = environment.apiUrl;

  // Anonyme (site public) : le backend ne renvoie que les offres publiées.
  list(): Observable<JobOfferApi[]> {
    return this.http.get<JobOfferApi[]>(`${this.base}/${environment.endpoints.jobs.list}`);
  }
}
