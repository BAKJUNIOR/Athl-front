// Appelle l'API Services d'Athl_logistics-backend. Contrairement au front, le backend garde
// le texte dupliqué par langue (titleFr/titleEn...) comme le BO — c'est services.data.ts qui
// choisit le bon champ selon la langue active et reforme la forme `Service` attendue par les pages.
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

export interface ServicePrestationApi {
  titleFr: string;
  titleEn: string;
  descriptionFr: string;
  descriptionEn: string;
}

export interface ServiceProcessStepApi {
  number: string;
  titleFr: string;
  titleEn: string;
  descriptionFr: string;
  descriptionEn: string;
}

export interface ServiceSummaryApi {
  id: number;
  slug: string;
  number: string;
  titleFr: string;
  titleEn: string;
  shortTitleFr: string;
  shortTitleEn: string;
  leadFr: string;
  leadEn: string;
  image: string | null;
  status: 'draft' | 'published';
  updatedAt: string;
}

export interface ServiceDetailApi extends ServiceSummaryApi {
  heroImage: string | null;
  gallery: string[];
  prestations: ServicePrestationApi[];
  process: ServiceProcessStepApi[];
}

@Injectable({ providedIn: 'root' })
export class ServiceApi {
  private readonly http = inject(HttpClient);
  private readonly base = environment.apiUrl;

  // Anonyme (site public) : le backend ne renvoie que les services publiés.
  list(): Observable<ServiceSummaryApi[]> {
    return this.http.get<ServiceSummaryApi[]>(`${this.base}/${environment.endpoints.services.list}`);
  }

  getBySlug(slug: string): Observable<ServiceDetailApi> {
    return this.http.get<ServiceDetailApi>(`${this.base}/${environment.endpoints.services.bySlug(slug)}`);
  }
}
