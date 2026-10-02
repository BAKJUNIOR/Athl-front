// Appelle l'API du contenu de la page d'accueil (voir Athl_back HomePageContentController).
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

export interface HomePageApiDto {
  heroTitleLine1Fr: string | null;
  heroTitleLine1En: string | null;
  heroTitleLine2Fr: string | null;
  heroTitleLine2En: string | null;
  heroSubtitleFr: string | null;
  heroSubtitleEn: string | null;
  heroImages: string[];

  pillarConstructionLeadFr: string | null;
  pillarConstructionLeadEn: string | null;
  pillarConstructionImage: string | null;

  pillarMobilityLeadFr: string | null;
  pillarMobilityLeadEn: string | null;
  pillarMobilityImage: string | null;

  pillarImportLeadFr: string | null;
  pillarImportLeadEn: string | null;
  pillarImportImage: string | null;
}

@Injectable({ providedIn: 'root' })
export class HomePageApi {
  private readonly http = inject(HttpClient);
  private readonly base = environment.apiUrl;

  get(): Observable<HomePageApiDto> {
    return this.http.get<HomePageApiDto>(`${this.base}/${environment.endpoints.homePage.get}`);
  }
}
